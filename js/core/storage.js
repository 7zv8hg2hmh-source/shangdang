window.Game = window.Game || {};

Game.Storage = {
  KEY: 'antifraud_save',

  save: function() {
    try {
      var data = JSON.stringify(Game.state);
      localStorage.setItem(this.KEY, data);
      return true;
    } catch(e) {
      console.warn('存档失败', e);
      return false;
    }
  },

  load: function() {
    try {
      var data = localStorage.getItem(this.KEY);
      if (!data) return false;
      var saved = JSON.parse(data);
      var fresh = Game.createInitialState();
      for (var key in fresh) {
        if (saved.hasOwnProperty(key)) {
          Game.state[key] = saved[key];
        } else {
          Game.state[key] = fresh[key];
        }
      }
      return true;
    } catch(e) {
      console.warn('读档失败', e);
      return false;
    }
  },

  hasSave: function() {
    return !!localStorage.getItem(this.KEY);
  },

  clear: function() {
    localStorage.removeItem(this.KEY);
  }
};
