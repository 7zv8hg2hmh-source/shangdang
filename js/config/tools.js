window.Game = window.Game || {};

Game.Tools = [
  {
    id: "anti_fraud_app",
    name: "国家反诈中心 APP",
    desc: "降低陌生来电、陌生链接、诈骗APP相关事件的风险。",
    unlockAge: 16,
    unlockCondition: function(s) { return s.digitalSkill >= 5; },
    effect: { risk: -2, digitalSkill: 1 },
    passive: "陌生号码事件触发概率-15%"
  },
  {
    id: "hotline_96110",
    name: "96110 预警意识",
    desc: "高危转账前有概率触发强提醒弹窗。",
    unlockAge: 18,
    unlockCondition: function(s) { return s.awareness >= 6; },
    effect: { awareness: 1 },
    passive: "大额转账事件增加'冷静确认'选项"
  },
  {
    id: "sms_12381",
    name: "12381 短信警觉",
    desc: "遇到短信/电话预警类事件时可直接中断。",
    unlockAge: 18,
    unlockCondition: function(s) { return s.awareness >= 5 && s.digitalSkill >= 4; },
    effect: { awareness: 1, digitalSkill: 1 },
    passive: "电话诈骗事件中增加'挂断'选项权重"
  },
  {
    id: "family_help",
    name: "家庭求助卡",
    desc: "大额转账前触发家人提醒。",
    unlockAge: 7,
    unlockCondition: function(s) { return s.familyTrust >= 8; },
    effect: { familyTrust: 1 },
    passive: "损失>5000的事件有30%概率触发家人阻止"
  },
  {
    id: "cool_24h",
    name: "冷静24小时",
    desc: "暂停转账，降低贪念和风险。",
    unlockAge: 20,
    unlockCondition: function(s) { return s.mental >= 8 && s.awareness >= 6; },
    effect: { greed: -1, risk: -1 },
    passive: "连环诈骗链中增加'暂停24小时'选项"
  },
  {
    id: "reverse_search",
    name: "反向搜索能力",
    desc: "虚假购物、招聘、投资导师类事件识别率提升。",
    unlockAge: 16,
    unlockCondition: function(s) { return s.digitalSkill >= 8; },
    effect: { digitalSkill: 1, awareness: 1 },
    passive: "虚假身份类事件识破概率+20%"
  },
  {
    id: "screen_share_alert",
    name: "屏幕共享警戒",
    desc: "冒充客服、公检法类事件损失降低。",
    unlockAge: 20,
    unlockCondition: function(s) { return s.digitalSkill >= 6; },
    effect: { digitalSkill: 1 },
    passive: "屏幕共享类诈骗损失-50%"
  },
  {
    id: "evidence_habit",
    name: "证据留存习惯",
    desc: "被骗后追回概率小幅提升，举报记录增加。",
    unlockAge: 18,
    unlockCondition: function(s) { return s.socialExp >= 6; },
    effect: { socialExp: 1 },
    passive: "被骗事件后自动增加举报记录"
  },
  {
    id: "no_password_free",
    name: "免密支付关闭",
    desc: "儿童期和网购类小额损失降低。",
    unlockAge: 7,
    unlockCondition: function(s) { return s.digitalSkill >= 3; },
    effect: { risk: -1 },
    passive: "小额自动扣费类损失-60%"
  },
  {
    id: "family_pact",
    name: "家人确认习惯",
    desc: "老人期/亲属借钱类诈骗更容易先打电话确认。",
    unlockAge: 36,
    unlockCondition: function(s) { return s.familyTrust >= 10; },
    effect: { familyTrust: 2 },
    passive: "冒充亲属类诈骗增加'打电话确认'选项权重"
  }
];
