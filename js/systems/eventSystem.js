window.Game = window.Game || {};

Game.EventSystem = {
  getEventsForStage: function(stageId) {
    return Game.FraudEvents.filter(function(e) {
      return e.stage.indexOf(stageId) !== -1;
    });
  },

  pickEvent: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var available = this.getEventsForStage(stage.id);

    available = available.filter(function(e) {
      return s.usedEventIds.indexOf(e.id) === -1;
    });

    if (available.length === 0) {
      s.usedEventIds = s.usedEventIds.filter(function(id) {
        return !Game.FraudEvents.some(function(e) { return e.id === id && e.stage.indexOf(stage.id) !== -1; });
      });
      available = this.getEventsForStage(stage.id);
    }

    if (available.length === 0) return null;

    var weighted = available.map(function(e) {
      var w = 10;
      if (e.type === "life") w += 3;
      if (s.greed >= 8 && e.trigger === "贪念") w += 5;
      if (s.loneliness >= 8 && e.trigger === "孤独") w += 5;
      if (s.mental <= 5 && e.trigger === "恐惧") w += 4;
      if (s.familyTrust <= 5 && e.trigger === "亲情") w += 4;
      if (s.shame >= 10 && e.trigger === "面子") w += 3;
      if (s.awareness >= 15 && e.type !== "life" && e.type !== "false_alarm") w -= 3;
      return { event: e, weight: Math.max(1, w) };
    });

    var totalWeight = weighted.reduce(function(sum, w) { return sum + w.weight; }, 0);
    var roll = Game.random() * totalWeight;
    var cumulative = 0;
    for (var i = 0; i < weighted.length; i++) {
      cumulative += weighted[i].weight;
      if (roll <= cumulative) {
        s.usedEventIds.push(weighted[i].event.id);
        return weighted[i].event;
      }
    }
    return weighted[weighted.length - 1].event;
  },

  processChoice: function(event, optionIndex) {
    var s = Game.state;
    var option = event.options[optionIndex];
    var effects = Object.assign({}, option.effects);

    var isLifeEvent = event.type === "life" || event.type === "false_alarm";

    if (option.isScam) {
      s.scamVictimCount++;
      if (option.loss) {
        effects.fraudLoss = (effects.fraudLoss || 0) + option.loss;
        if (option.loss >= 50000) {
          if (s.flags.indexOf("big_loss_50k") === -1) s.flags.push("big_loss_50k");
        }
        s.lossHistory.push({
          age: s.age, type: event.title, loss: option.loss,
          reported: false, stopped: false
        });
      }
    }

    if (!isLifeEvent) {
      s.scamEncountered++;
    }

    if (!option.isScam && !isLifeEvent && event.options.some(function(o) { return o.isScam; })) {
      s.stoppedLossCount++;
    }

    if (option.flag) {
      if (s.flags.indexOf(option.flag) === -1) s.flags.push(option.flag);
    }

    var hasTool = function(toolId) { return s.tools.indexOf(toolId) !== -1; };
    if (hasTool("family_help") && option.isScam && option.loss > 5000 && Game.random() < 0.3) {
      effects.money = Math.round((effects.money || 0) * 0.5);
      if (effects.fraudLoss) effects.fraudLoss = Math.round(effects.fraudLoss * 0.5);
      option.result += "\n\n【家庭求助卡生效】家人及时阻止了部分转账，损失减半。";
    }
    if (hasTool("screen_share_alert") && event.id && event.id.indexOf("screen") !== -1 && option.isScam) {
      effects.money = Math.round((effects.money || 0) * 0.5);
      option.result += "\n\n【屏幕共享警戒生效】你提前关闭了共享，减少了损失。";
    }

    var log = Game.Attributes.apply(effects);

    s.eventHistory.push({
      age: s.age, title: event.title, choice: option.text,
      isScam: !!option.isScam, loss: option.loss || 0
    });

    Game.AchievementSystem.check();

    return { result: option.result, log: log, review: event.review, isScam: option.isScam, isLife: isLifeEvent };
  }
};
