window.Game = window.Game || {};

document.addEventListener('DOMContentLoaded', function() {
  Game.Loop.phase = 'title';
  Game.UI.render();
});
