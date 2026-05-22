window.Game = window.Game || {};

Game.LifeStages = [
  {
    id: "baby",
    name: "家庭启蒙期",
    minAge: 0, maxAge: 6,
    baseIncome: 100,
    commonFrauds: ["二维码引流", "虚假购物"],
    description: "你还小，但爸妈的手机已经是骗子的战场。",
    riskMod: -2
  },
  {
    id: "childhood",
    name: "儿童期",
    minAge: 7, maxAge: 12,
    baseIncome: 60,
    commonFrauds: ["网络游戏产品虚假交易", "中奖诈骗", "二维码引流", "冒充领导熟人"],
    description: "你有了自己的零花钱，也第一次有了可以被骗走的东西。",
    riskMod: -1
  },
  {
    id: "middle_school",
    name: "中学期",
    minAge: 13, maxAge: 18,
    baseIncome: 500,
    commonFrauds: ["刷单返利", "虚假购物", "网络游戏产品虚假交易", "虚假招聘", "中奖诈骗", "校园贷"],
    description: "你开始有社交账号、有攀比心、有秘密。骗子也开始认真对待你了。",
    riskMod: 0
  },
  {
    id: "college",
    name: "大学期",
    minAge: 19, maxAge: 24,
    baseIncome: 10000,
    commonFrauds: ["刷单返利", "校园贷", "培训贷", "虚假购物", "冒充领导熟人", "网恋诈骗", "机票退改签", "虚假招聘"],
    description: "你离开家，拥有了更多自由，也第一次拥有了可被收割的账户余额。",
    riskMod: 1
  },
  {
    id: "early_career",
    name: "初入社会期",
    minAge: 25, maxAge: 35,
    baseIncome: 48000,
    commonFrauds: ["虚假投资理财", "冒充电商物流客服", "贷款征信诈骗", "冒充领导熟人", "冒充公检法", "网恋诈骗", "屏幕共享诈骗", "虚假招聘"],
    description: "你有了工资卡、信用卡、房贷。你以为自己不会被骗，骗子也是这么想的。",
    riskMod: 2
  },
  {
    id: "family_career",
    name: "家庭事业期",
    minAge: 36, maxAge: 50,
    baseIncome: 72000,
    commonFrauds: ["虚假投资理财", "冒充公检法", "贷款征信诈骗", "冒充领导熟人", "AI换脸诈骗", "屏幕共享诈骗"],
    description: "上有老下有小，你的焦虑和资产一样多。骗子看中的不是你的钱，是你的怕。",
    riskMod: 2
  },
  {
    id: "midlife_asset",
    name: "中年资产期",
    minAge: 51, maxAge: 65,
    baseIncome: 62000,
    commonFrauds: ["虚假投资理财", "收藏品骗局", "养老保健品诈骗", "冒充公检法", "AI换脸诈骗", "医疗养生骗局"],
    description: "你积累了一辈子的钱，正是骗子眼里最肥的猎物。",
    riskMod: 3
  },
  {
    id: "elderly",
    name: "养老期",
    minAge: 66, maxAge: 80,
    baseIncome: 30000,
    commonFrauds: ["养老保健品诈骗", "收藏品骗局", "冒充子女家属", "网恋诈骗", "医疗养生骗局", "AI换脸诈骗", "中奖诈骗"],
    description: "你老了，孩子不常回来，手机是你最亲的陪伴。骗子知道你寂寞。",
    riskMod: 2
  }
];

Game.getStage = function(age) {
  for (var i = 0; i < Game.LifeStages.length; i++) {
    var s = Game.LifeStages[i];
    if (age >= s.minAge && age <= s.maxAge) return s;
  }
  return Game.LifeStages[Game.LifeStages.length - 1];
};
