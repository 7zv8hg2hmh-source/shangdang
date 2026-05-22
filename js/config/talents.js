window.Game = window.Game || {};

Game.Talents = [
  {
    id: "early_wisdom",
    name: "早慧",
    subtitle: "看得早，也容易想得多",
    desc: "你从小更会观察大人的表情，也更早学会分辨真假。",
    effects: { awareness: 2, digitalSkill: 1, mental: -1 },
    direct: { fraudChanceMod: -0.04, randomEventChanceMod: 0.02 }
  },
  {
    id: "warm_family",
    name: "家庭托举",
    subtitle: "有人兜底，胆子会稳一点",
    desc: "家里未必富裕，但愿意听你说话，也会在关键时刻拉你一把。",
    effects: { familyTrust: 3, mental: 1, loneliness: -1 },
    direct: { childhoodMoneyBonus: 12, fraudChanceMod: -0.03 }
  },
  {
    id: "social_spark",
    name: "人缘好",
    subtitle: "消息多，机会也多",
    desc: "你容易和人熟起来，朋友会带来帮助，也会带来一些热闹的风险。",
    effects: { socialExp: 2, trust: 2, loneliness: -2 },
    direct: { actionEventChanceMod: 0.04, fraudChanceMod: 0.02 }
  },
  {
    id: "steady_temper",
    name: "稳健性格",
    subtitle: "慢一点，但不容易上头",
    desc: "你不太相信天上掉馅饼，面对诱惑时更愿意多等一晚。",
    effects: { greed: -2, risk: -1, mental: 1 },
    direct: { fraudChanceMod: -0.05, incomeMultiplier: 0.98 }
  },
  {
    id: "restless_curiosity",
    name: "好奇心过剩",
    subtitle: "什么都想试试",
    desc: "你总想点开看看、拆开看看、问到底。它会让你学得快，也会让你撞见怪事。",
    effects: { digitalSkill: 2, awareness: 1, risk: 1 },
    direct: { randomEventChanceMod: 0.05, actionEventChanceMod: 0.03 }
  },
  {
    id: "sports_body",
    name: "运动底子",
    subtitle: "体力比同龄人厚一点",
    desc: "你恢复得快，跑得动，也更愿意用出汗解决一部分烦恼。",
    effects: { mental: 2, shame: -1 },
    direct: { energyBonus: 1, randomEventChanceMod: -0.01 }
  },
  {
    id: "craft_hands",
    name: "手巧",
    subtitle: "很多事要摸过才懂",
    desc: "你更擅长把抽象的事变成手里的东西，技能路线会更顺。",
    effects: { digitalSkill: 1, socialExp: 1, awareness: 1 },
    direct: { careerGrowthBonus: 0.03, incomeMultiplier: 1.01 }
  },
  {
    id: "literary_sense",
    name: "文艺细胞",
    subtitle: "敏感，也有表达欲",
    desc: "你更容易被音乐、故事和画面击中，孤独时也能给自己找一点光。",
    effects: { mental: 2, loneliness: -1, socialExp: 1 },
    direct: { actionEventChanceMod: 0.03 }
  },
  {
    id: "money_nose",
    name: "钱味敏感",
    subtitle: "会算账，也容易心动",
    desc: "你对价格、收益和机会很敏锐，但也更容易被高回报故事勾住。",
    effects: { awareness: 1, greed: 2, risk: 1 },
    direct: { incomeMultiplier: 1.04, fraudChanceMod: 0.03 }
  },
  {
    id: "quiet_observer",
    name: "安静观察者",
    subtitle: "不抢话，但记得细",
    desc: "你社交慢热，却能记住很多别人忽略的小细节。",
    effects: { awareness: 2, trust: -1, loneliness: 1 },
    direct: { fraudChanceMod: -0.04, randomEventChanceMod: -0.01 }
  },
  {
    id: "lucky_miss",
    name: "差点运",
    subtitle: "总能差一点躲开坑",
    desc: "你不是特别聪明，但一些关键时刻总会因为小意外停下来。",
    effects: { mental: 1, risk: -1 },
    direct: { fraudChanceMod: -0.03, randomEventChanceMod: 0.04 }
  },
  {
    id: "wild_imagination",
    name: "想象力旺盛",
    subtitle: "现实旁边总有暗门",
    desc: "你经常把普通日子想得很奇妙，小概率怪事也更容易撞到你。",
    effects: { mental: 1, digitalSkill: 1, awareness: 1 },
    direct: { randomEventChanceMod: 0.06, actionEventChanceMod: 0.02 }
  }
];

Game.drawTalentChoices = function() {
  var pool = Game.Talents.slice();
  var result = [];
  while (result.length < 3 && pool.length > 0) {
    var index = Game.randomInt(0, pool.length - 1);
    result.push(pool.splice(index, 1)[0]);
  }
  Game.state.talentChoices = result.map(function(t) { return t.id; });
  return result;
};

Game.getTalent = function(id) {
  return Game.Talents.find(function(t) { return t.id === id; }) || null;
};
