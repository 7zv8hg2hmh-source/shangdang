window.Game = window.Game || {};

Game.FraudChainSystem = {
  canTriggerChain: function() {
    var s = Game.state;
    if (s.currentChain) return false;
    if (s.chainCooldown > 0) return false;
    var stage = Game.getStage(s.age);
    var available = Game.FraudChains.filter(function(c) {
      return c.stage.indexOf(stage.id) !== -1 && c.triggerCondition(s);
    });
    return available.length > 0 && Game.random() < 0.25;
  },

  startChain: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var available = Game.FraudChains.filter(function(c) {
      return c.stage.indexOf(stage.id) !== -1 && c.triggerCondition(s);
    });
    if (available.length === 0) return null;
    var chain = available[Math.floor(Game.random() * available.length)];
    s.currentChain = {
      chainId: chain.id,
      step: 0,
      invested: 0,
      pressure: 0
    };
    return this.getCurrentStep();
  },

  getCurrentStep: function() {
    var s = Game.state;
    if (!s.currentChain) return null;
    var chain = this.getChainById(s.currentChain.chainId);
    if (!chain) return null;
    var step = chain.steps[s.currentChain.step];
    if (!step) return null;
    return {
      chainName: chain.name,
      stepIndex: s.currentChain.step,
      totalSteps: chain.steps.length,
      title: step.title,
      text: step.text,
      options: step.options
    };
  },

  processChainChoice: function(optionIndex) {
    var s = Game.state;
    if (!s.currentChain) return null;
    var chain = this.getChainById(s.currentChain.chainId);
    var step = chain.steps[s.currentChain.step];
    var option = step.options[optionIndex];
    var effects = Object.assign({}, option.effects);

    if (option.isScam && option.totalLoss) {
      s.scamVictimCount++;
      effects.fraudLoss = (effects.fraudLoss || 0) + option.totalLoss;
      s.lossHistory.push({
        age: s.age, type: chain.name + '(连环)', loss: option.totalLoss,
        reported: option.text.indexOf('报警') !== -1, stopped: false
      });
      if (option.totalLoss >= 50000) {
        if (s.flags.indexOf("big_loss_50k") === -1) s.flags.push("big_loss_50k");
      }
    }

    var log = Game.Attributes.apply(effects);

    if (option.breakChain) {
      if (!option.isScam || option.text.indexOf('报警') !== -1 || option.text.indexOf('清醒') !== -1 || option.text.indexOf('停手') !== -1) {
        s.stoppedLossCount++;
        if (s.flags.indexOf("chain_broken") === -1) s.flags.push("chain_broken");
      }
      if (option.text.indexOf('报警') !== -1 || option.text.indexOf('举报') !== -1) {
        s.reportedCount++;
      }
      s.eventHistory.push({
        age: s.age, title: chain.name + ' - ' + step.title,
        choice: option.text, isScam: !!option.isScam, loss: option.totalLoss || 0
      });
      s.currentChain = null;
      s.chainCooldown = 3;
      Game.AchievementSystem.check();
      return { result: option.result, log: log, breakChain: true, chainName: chain.name };
    }

    if (option.continueChain) {
      s.currentChain.step++;
      s.currentChain.pressure++;
      if (option.effects && option.effects.money) {
        s.currentChain.invested += Math.abs(option.effects.money);
      }
      s.eventHistory.push({
        age: s.age, title: chain.name + ' - ' + step.title,
        choice: option.text, isScam: false, loss: 0
      });
      return { result: option.result, log: log, continueChain: true, chainName: chain.name };
    }

    return { result: option.result, log: log };
  },

  getChainById: function(id) {
    for (var i = 0; i < Game.FraudChains.length; i++) {
      if (Game.FraudChains[i].id === id) return Game.FraudChains[i];
    }
    return null;
  }
};
