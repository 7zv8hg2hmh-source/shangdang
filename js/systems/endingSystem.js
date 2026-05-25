window.Game = window.Game || {};

Game.EndingSystem = {
  check: function() {
    var s = Game.state;
    if (s.ending) return s.ending;

    if (s.trust <= 0) return this.findEnding("trust_bankrupt");
    if (s.health <= 0) return this.findEnding("health_crash");
    if (s.debt >= 100000 && s.mental <= 5) return this.findEnding("debt_spiral");

    var early = Game.Endings.slice().sort(function(a, b) { return a.priority - b.priority; });
    for (var j = 0; j < early.length; j++) {
      if (early[j].priority <= 0 && early[j].condition && early[j].condition(s)) {
        return early[j];
      }
    }

    if (s.age >= 80) {
      var sorted = Game.Endings.slice().sort(function(a, b) { return a.priority - b.priority; });
      for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].condition(s)) {
          return sorted[i];
        }
      }
      return {
        id: "default",
        title: "冰面上的脚印",
        text: "你走完了这一生。有些坑你踩了，有些坑你绕过了。你不是英雄，只是一个在复杂世界里努力生活的普通人。",
        flavor: "每一步都算数。"
      };
    }

    if (s.flags.indexOf("brush_chain_entry") !== -1 && s.fraudLoss >= 3000 && s.age <= 30) {
      var e = this.findEnding("brush_life");
      if (e && e.condition(s)) return e;
    }
    if ((s.flags.indexOf("invest_scam_victim") !== -1 || s.flags.indexOf("ponzi_victim") !== -1) && s.fraudLoss >= s.totalIncome * 0.3) {
      var e2 = this.findEnding("invest_silent");
      if (e2 && e2.condition(s)) return e2;
    }

    return null;
  },

  findEnding: function(id) {
    for (var i = 0; i < Game.Endings.length; i++) {
      if (Game.Endings[i].id === id) return Game.Endings[i];
    }
    return null;
  },

  triggerEnding: function(ending) {
    Game.state.ending = ending;
    Game.state.gameOver = true;
  }
};
