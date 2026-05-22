window.Game = window.Game || {};

Game.AchievementSystem = {
  check: function() {
    var s = Game.state;
    var newlyUnlocked = [];
    Game.Achievements.forEach(function(a) {
      if (s.achievementUnlocked.indexOf(a.id) === -1 && a.condition(s)) {
        s.achievementUnlocked.push(a.id);
        newlyUnlocked.push(a);
      }
    });
    return newlyUnlocked;
  },

  getAll: function() {
    var s = Game.state;
    return Game.Achievements.map(function(a) {
      return {
        id: a.id,
        name: a.name,
        desc: a.desc,
        unlocked: s.achievementUnlocked.indexOf(a.id) !== -1
      };
    });
  }
};
