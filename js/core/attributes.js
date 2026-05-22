window.Game = window.Game || {};

Game.Attributes = {
  bounded: ['awareness','trust','familyTrust','mental','socialExp','digitalSkill','greed','loneliness','risk','shame','health','happiness'],
  bounded10: ['fatigue','snackHabit'],
  min: 0,
  max: 20,

  clamp: function(val, lo, hi) {
    return Math.max(lo || this.min, Math.min(hi || this.max, val));
  },

  apply: function(changes) {
    var s = Game.state;
    var log = [];
    for (var key in changes) {
      if (!changes.hasOwnProperty(key)) continue;
      var delta = changes[key];
      if (delta === 0) continue;
      var old = s[key] || 0;
      if (this.bounded.indexOf(key) !== -1) {
        s[key] = this.clamp(old + delta);
      } else if (this.bounded10.indexOf(key) !== -1) {
        s[key] = this.clamp(old + delta, 0, 10);
      } else if (key === 'money') {
        s[key] = old + delta;
        if (delta > 0) s.totalIncome += delta;
        if (s[key] < 0) {
          s.debt += Math.abs(s[key]);
          s[key] = 0;
        }
      } else if (key === 'debt') {
        s[key] = Math.max(0, old + delta);
      } else if (key === 'fraudLoss' || key === 'debtInterest') {
        s[key] = Math.max(0, old + delta);
      } else if (key === 'medicalSpend' || key === 'theftLoss') {
        s[key] = Math.max(0, old + delta);
      } else {
        s[key] = old + delta;
      }
      if (delta !== 0) {
        var sign = delta > 0 ? '+' : '';
        log.push(Game.Attributes.labelFor(key) + ' ' + sign + delta);
      }
    }
    Game.Attributes.checkDebtPressure();
    return log;
  },

  checkDebtPressure: function() {
    var s = Game.state;
    if (s.debt > 5000) {
      if (s.mental > 3) s.mental = this.clamp(s.mental - 1);
      if (s.shame < 18) s.shame = this.clamp(s.shame + 1);
      if (s.happiness > 3) s.happiness = this.clamp(s.happiness - 1);
    }
    if (s.debt > 20000) {
      if (s.risk < 18) s.risk = this.clamp(s.risk + 1);
    }
    if (s.health <= 5) {
      if (s.mental > 3) s.mental = this.clamp(s.mental - 1);
      if (s.fatigue < 10) s.fatigue = this.clamp(s.fatigue + 1, 0, 10);
      if (s.happiness > 2) s.happiness = this.clamp(s.happiness - 1);
    }
    if (s.happiness <= 4) {
      if (s.mental > 3) s.mental = this.clamp(s.mental - 1);
      if (s.loneliness < 18) s.loneliness = this.clamp(s.loneliness + 1);
    }
  },

  labelFor: function(key) {
    var labels = {
      money: '💰资产', debt: '🔴债务', fraudLoss: '被骗金额', debtInterest: '📉债务利息',
      awareness: '🧠识骗力', trust: '🤝信任', familyTrust: '👨‍👩‍👧家庭支持',
      mental: '💪心态', socialExp: '🌐社会经验', digitalSkill: '📱数字素养',
      greed: '🎰贪念', loneliness: '🌙孤独感', risk: '⚠️风险暴露',
      shame: '😶羞耻感', health: '❤️健康', happiness: '🌞幸福感', snackHabit: '🍬零食依赖',
      fatigue: '😫疲劳度', medicalSpend: '🏥医疗支出', theftLoss: '🧾失窃损失',
      reportedCount: '报警次数', stoppedLossCount: '止损次数'
    };
    return labels[key] || key;
  },

  riskScore: function() {
    var s = Game.state;
    return Math.round((s.greed * 2 + s.loneliness * 1.5 + s.risk * 2 - s.awareness * 2 - s.digitalSkill - s.socialExp * 0.5) / 3);
  }
};
