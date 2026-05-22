window.Game = window.Game || {};

Game.ToolSystem = {
  getAvailable: function() {
    var s = Game.state;
    return Game.Tools.filter(function(t) {
      return s.age >= t.unlockAge && t.unlockCondition(s) && s.tools.indexOf(t.id) === -1;
    });
  },

  getOwned: function() {
    var s = Game.state;
    return Game.Tools.filter(function(t) {
      return s.tools.indexOf(t.id) !== -1;
    });
  },

  acquire: function(toolId) {
    var s = Game.state;
    if (s.tools.indexOf(toolId) !== -1) return false;
    var tool = Game.Tools.find(function(t) { return t.id === toolId; });
    if (!tool) return false;
    if (s.age < tool.unlockAge || !tool.unlockCondition(s)) return false;
    s.tools.push(toolId);
    if (tool.effect) {
      Game.Attributes.apply(tool.effect);
    }
    return true;
  },

  checkAutoUnlocks: function() {
    var s = Game.state;
    var unlocked = [];
    Game.Tools.forEach(function(t) {
      if (s.tools.indexOf(t.id) === -1 && s.age >= t.unlockAge && t.unlockCondition(s)) {
        if (Game.random() < 0.3) {
          s.tools.push(t.id);
          if (t.effect) Game.Attributes.apply(t.effect);
          unlocked.push(t);
        }
      }
    });
    return unlocked;
  },

  hasTool: function(toolId) {
    return Game.state.tools.indexOf(toolId) !== -1;
  }
};
