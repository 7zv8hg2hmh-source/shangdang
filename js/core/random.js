window.Game = window.Game || {};

Game.initLifeSeed = function(seed) {
  var value = seed || (Date.now() ^ Math.floor(Math.random() * 0xffffffff));
  value = value >>> 0;
  if (value === 0) value = 2463534242;
  Game.state.lifeSeed = value;
  Game.state.rngState = value;
  return value;
};

Game.random = function() {
  var s = Game.state;
  if (!s || !s.rngState) return Math.random();
  s.rngState = (s.rngState * 1664525 + 1013904223) >>> 0;
  return s.rngState / 4294967296;
};

Game.randomInt = function(min, max) {
  return min + Math.floor(Game.random() * (max - min + 1));
};

Game.pickRandom = function(list) {
  if (!list || list.length === 0) return null;
  return list[Math.floor(Game.random() * list.length)];
};
