window.Game = window.Game || {};

// Random/surprise events triggered by stats, age, and life conditions
// These fire AFTER the player's action, based on probability and conditions
Game.RandomEvents = [
  // === Health Events ===
  {
    id: "re_cold",
    title: "生病了",
    text: "你感冒了，发高烧在床上躺了好几天。",
    condition: function(s) { return s.fatigue >= 3; },
    probability: 0.3,
    effects: { money: -500, mental: -1 },
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_hospitalize",
    title: "住院了",
    text: "你突然身体不舒服，去医院一查，需要住院观察。医药费不便宜。",
    condition: function(s) { return s.fatigue >= 5 || (s.age >= 50 && Game.random() < 0.3); },
    probability: 0.15,
    effects: { money: -8000, mental: -2 },
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_major_illness",
    title: "大病一场",
    text: "体检查出了问题，需要手术。医药费像一座山。",
    condition: function(s) { return s.age >= 45 && s.fatigue >= 4; },
    probability: 0.1,
    effects: { money: -30000, mental: -3, debt: 10000 },
    stage: ["midlife_asset", "elderly"]
  },

  // === Financial Events ===
  {
    id: "re_bonus",
    title: "发奖金了！",
    text: "公司今年效益不错，年终奖比预期多了不少。",
    condition: function(s) { return s.age >= 22 && s.age <= 60; },
    probability: 0.2,
    effects: { money: 8000, mental: 1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_layoff",
    title: "被裁员了",
    text: "公司业务调整，你的部门被裁撤。HR递来了一份N+1的协议。",
    condition: function(s) { return s.age >= 30 && s.age <= 55; },
    probability: 0.1,
    effects: { money: 15000, mental: -3, loneliness: 2, shame: 2 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_promotion",
    title: "升职了！",
    text: "领导找你谈话，恭喜你升职加薪了！",
    condition: function(s) { return s.socialExp >= 8 && s.awareness >= 6; },
    probability: 0.15,
    effects: { money: 10000, mental: 2, shame: -1 },
    stage: ["early_career", "family_career"]
  },
  {
    id: "re_stock_crash",
    title: "股市暴跌",
    text: "你关注的基金/股票突然暴跌，亏了不少。新闻里都在说经济下行。",
    condition: function(s) { return s.greed >= 6 && s.money >= 10000; },
    probability: 0.15,
    effects: { money: -8000, mental: -2, greed: -1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_stock_up",
    title: "投资赚了一笔",
    text: "你买的理财产品涨了不少，账户里多出了一笔钱。你开始觉得自己有投资天赋。",
    condition: function(s) { return s.greed >= 4 && s.money >= 5000; },
    probability: 0.12,
    effects: { money: 8000, greed: 2 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_inheritance",
    title: "亲人留下了遗产",
    text: "远房亲戚去世了，留下了一笔遗产分给你。",
    condition: function(s) { return s.age >= 35; },
    probability: 0.05,
    effects: { money: 30000, mental: -1 },
    stage: ["family_career", "midlife_asset", "elderly"]
  },

  // === Social Events ===
  {
    id: "re_friend_borrow",
    title: "朋友找你借钱",
    text: "一个老朋友突然联系你，说急需用钱，问你能不能借5000。",
    condition: function(s) { return s.socialExp >= 5 && s.money >= 5000; },
    probability: 0.15,
    isChoice: true,
    options: [
      { text: "借，朋友有难当然帮", effects: { money: -5000, trust: 1, socialExp: 1 }, result: "你转了钱过去。对方千恩万谢。至于还不还……那是后面的事了。" },
      { text: "不借，怕还不了", effects: { trust: -1, socialExp: -1 }, result: "你委婉拒绝了。对方语气明显变了。你挂了电话，心里不太舒服。" },
      { text: "借一半，2500", effects: { money: -2500, trust: 1 }, result: "你借了一半，说手头也紧。对方表示理解。这大概是最体面的选择了。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_neighbor_help",
    title: "邻居请你帮忙",
    text: "邻居阿姨说她手机收到一条短信看不懂，让你帮忙看看。是一条'中奖通知'。",
    condition: function(s) { return s.age >= 30; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "帮她看，告诉她这是诈骗", effects: { awareness: 1, socialExp: 1, trust: 1 }, result: "你帮阿姨删了短信，教她怎么识别诈骗信息。阿姨直夸你懂得多。" },
      { text: "随便看看，不想管太多", effects: {}, result: "你扫了一眼说'可能是假的'就走了。阿姨好像没太放在心上。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_classmate_reunion",
    title: "同学聚会",
    text: "老同学组织了一场聚会。有人开着豪车，有人还在打工。饭桌上觥筹交错，话里话外都在比。",
    condition: function(s) { return s.age >= 25 && s.socialExp >= 4; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "去，老同学难得见面", effects: { loneliness: -2, shame: 1, money: -300, socialExp: 1 }, result: "你去了。有人混得好，有人混得一般。你喝了点酒，说了些场面话。散场的时候有点空虚。" },
      { text: "不去了，没什么好比的", effects: { loneliness: 1 }, result: "你没去。群里发了一堆合照。你翻了翻就退出了。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },

  // === Family Events ===
  {
    id: "re_parents_sick",
    title: "父母生病了",
    text: "妈妈/爸爸身体不太好，需要去大医院检查。你得请假陪着去。",
    condition: function(s) { return s.age >= 30; },
    probability: 0.15,
    effects: { money: -5000, familyTrust: 1, mental: -1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_child_school",
    title: "孩子要上学了",
    text: "孩子到了入学年龄，学区房、补习班、兴趣班……每一项都是钱。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_child && s.age >= 33; },
    probability: 0.2,
    effects: { money: -15000, familyTrust: 1 },
    stage: ["family_career"]
  },
  {
    id: "re_family_fight",
    title: "家庭矛盾",
    text: "因为钱的问题，家里吵了一架。说了一些伤人的话。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.married && (s.debt >= 20000 || s.money <= 3000); },
    probability: 0.2,
    effects: { familyTrust: -2, mental: -1, loneliness: 1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_divorce",
    title: "婚姻危机",
    text: "你和另一半的关系越来越差。冷战、争吵、沉默。有一天TA说'我们谈谈吧'。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.married && s.familyTrust <= 4 && s.loneliness >= 10; },
    probability: 0.15,
    isChoice: true,
    options: [
      { text: "离婚，各自解脱", effects: { familyTrust: -3, loneliness: 3, mental: -2, money: -10000 }, result: "你签了离婚协议。走出民政局的时候天很蓝，你却什么都感觉不到。", clearFlag: "married", setFlag: "divorced" },
      { text: "好好谈谈，试着挽回", effects: { familyTrust: 2, mental: -1, money: -3000 }, result: "你们去做了婚姻咨询。有些话说出来了，虽然痛，但比闷在心里好。" },
      { text: "冷处理，先这样吧", effects: { loneliness: 2, mental: -1 }, result: "你们继续住在同一个屋檐下，但像两个室友。孩子问你们'为什么不说话了'。" }
    ],
    stage: ["family_career", "midlife_asset"]
  },

  // === Life Quality Events ===
  {
    id: "re_leak",
    title: "信息泄露",
    text: "你收到一个精准的推销电话，对方知道你的名字、地址、最近买过什么。你的个人信息被泄露了。",
    condition: function(s) { return s.risk >= 5; },
    probability: 0.2,
    effects: { risk: 2, awareness: 1, trust: -1 },
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_phone_lost",
    title: "手机丢了",
    text: "你的手机丢了！里面有微信、支付宝、银行APP……你慌了。",
    condition: function(s) { return true; },
    probability: 0.08,
    effects: { money: -3000, risk: 3, mental: -1, awareness: 1 },
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_good_news",
    title: "好事临门",
    text: "今天运气不错——可能是中了个小奖，可能是路上捡到了钱，可能只是天气很好心情很好。",
    condition: function(s) { return true; },
    probability: 0.15,
    effects: { mental: 1 },
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_scam_news",
    title: "看到反诈新闻",
    text: "刷手机看到一条新闻：某人被骗了几十万，骗术跟你之前遇到的很像……",
    condition: function(s) { return s.scamEncountered >= 1; },
    probability: 0.15,
    effects: { awareness: 1 },
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_elder_lonely",
    title: "子女不常来",
    text: "孩子打了个电话说这周忙不回来了。你说没关系。挂了电话后你在沙发上坐了很久。",
    condition: function(s) { return s.age >= 60 && s.lifeFlags && s.lifeFlags.has_child; },
    probability: 0.25,
    effects: { loneliness: 2, mental: -1, familyTrust: -1 },
    stage: ["elderly"]
  },
  {
    id: "re_natural_disaster",
    title: "天灾人祸",
    text: "暴雨/台风来了，你家进水了/停电了。折腾了好几天才恢复正常。",
    condition: function(s) { return true; },
    probability: 0.05,
    effects: { money: -5000, mental: -1 },
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_car_accident",
    title: "交通事故",
    text: "出了个小事故，人没事但修车花了不少钱。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_car; },
    probability: 0.12,
    effects: { money: -5000, mental: -1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_help_elder",
    title: "遇到老人求助",
    text: "路上遇到一个老人说走丢了，请你帮忙用手机联系他家人。",
    condition: function(s) { return true; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "帮忙打电话", effects: { trust: 1, socialExp: 1, awareness: 1 }, result: "你帮老人联系到了家人。家人赶来的时候一个劲道谢。这让你对人性多了一点信心。" },
      { text: "警惕，报警让警察处理", effects: { awareness: 1 }, result: "你选择了最安全的方式——叫了警察。老人后来被家人接走了。" },
      { text: "装没看见走过去", effects: { trust: -1 }, result: "你低头走过去了。回头看了一眼，老人还站在原地。你心里有点不舒服。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_pet",
    title: "要不要养只宠物？",
    text: "路上遇到一只流浪猫/狗，可怜巴巴地看着你。朋友说养宠物可以缓解孤独。",
    condition: function(s) { return s.loneliness >= 8 && !s.lifeFlags.has_pet; },
    probability: 0.15,
    isChoice: true,
    options: [
      { text: "带回家养", effects: { loneliness: -3, mental: 1, money: -1000 }, result: "你有了一个毛茸茸的室友。每天回家都有人在门口等你了。", setFlag: "has_pet" },
      { text: "不养，太麻烦了", effects: {}, result: "你犹豫了一下，最终还是走了。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },

  // === School & Growth Events ===
  {
    id: "re_teacher_warning",
    title: "老师的提醒",
    text: "班主任在课上讲了一个同学被游戏交易骗钱的案例。你发现那套路和你最近看到的广告很像。",
    condition: function(s) { return s.age >= 7 && s.age <= 18; },
    probability: 0.18,
    effects: { awareness: 1, digitalSkill: 1 },
    stage: ["childhood", "middle_school"]
  },
  {
    id: "re_lost_card",
    title: "学生卡丢了",
    text: "你的学生卡不见了，里面还有饭卡余额。你第一次意识到，小钱也需要管理。",
    condition: function(s) { return s.age >= 10 && s.age <= 22; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "马上挂失补办", effects: { money: -50, awareness: 1 }, result: "你花了点补办费，但余额保住了。流程有点麻烦，不过你记住了。" },
      { text: "等等看，说不定能找到", effects: { money: -200, mental: -1 }, result: "三天后卡找到了，余额没了。你看着消费记录沉默了一会。" }
    ],
    stage: ["childhood", "middle_school", "college"]
  },
  {
    id: "re_friend_group_split",
    title: "朋友小圈子散了",
    text: "原来每天一起玩的朋友突然分成了几个小圈子。你被夹在中间，怎么说都像站队。",
    condition: function(s) { return s.age >= 12 && s.age <= 24 && s.socialExp >= 4; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "两边都劝劝", effects: { socialExp: 1, mental: -1, trust: 1 }, result: "你试着调和，但大家都在气头上。你有点累，也更懂人情了。" },
      { text: "暂时保持距离", effects: { loneliness: 1, awareness: 1 }, result: "你少说话，多观察。关系冷了一点，麻烦也少了一点。" }
    ],
    stage: ["middle_school", "college"]
  },
  {
    id: "re_exam_slump",
    title: "考试失利",
    text: "一次重要考试没考好。你听到有人说'有内部资料，包提分'，也听到老师说先把错题整理完。",
    condition: function(s) { return s.age >= 13 && s.age <= 24; },
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "买内部资料试试", effects: { money: -600, greed: 1, shame: 1, awareness: -1 }, result: "资料粗糙得像临时拼出来的。你越看越烦，最后还是回去刷错题。" },
      { text: "复盘错题和方法", effects: { awareness: 1, mental: 1 }, result: "慢一点，但扎实。你发现很多焦虑其实来自不敢面对错在哪里。" }
    ],
    stage: ["middle_school", "college"]
  },

  // === Digital Era Events ===
  {
    id: "re_password_leak",
    title: "密码泄露提醒",
    text: "浏览器提醒你某个常用密码出现在泄露库里。这个密码你用了很多年。",
    condition: function(s) { return s.digitalSkill >= 3; },
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "立刻改密码并开双重验证", effects: { digitalSkill: 1, awareness: 2, risk: -1 }, result: "花了半小时，但账号安全多了。你顺手把几个旧密码也换了。" },
      { text: "先不管，太麻烦", effects: { risk: 2, mental: -1 }, result: "你关掉提醒。几周后又收到异地登录短信，心里一紧。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_cloud_album",
    title: "云相册满了",
    text: "手机提示云空间不足。你翻照片时发现身份证、银行卡、合同截图都混在相册里。",
    condition: function(s) { return s.age >= 18; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "整理敏感照片", effects: { awareness: 1, digitalSkill: 1, risk: -1 }, result: "你删掉了很多不该长期存着的截图。手机没变快，但心里清爽了。" },
      { text: "买更多空间", effects: { money: -200, risk: 1 }, result: "空间是够了，混乱也被一起保存下来了。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_ai_hot_wave",
    title: "AI热潮来了",
    text: "身边的人都在讨论AI：有人提高效率，有人花钱报课，有人转发'十天变现'。",
    condition: function(s) { return s.age >= 16 && s.age <= 65; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "先学免费基础课", effects: { digitalSkill: 2, awareness: 1 }, result: "你学会了几个实用方法，也看清了很多夸张宣传。" },
      { text: "报名高价变现营", effects: { money: -4999, greed: 2, risk: 1, mental: -1 }, result: "群里每天都很热闹，但真正有用的内容很少。你开始怀疑自己是不是冲动了。" },
      { text: "暂时观望", effects: { awareness: 1 }, result: "你没急着跟风。热潮散去一点后，真正有价值的东西反而更清楚了。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_group_qr_cleanup",
    title: "群二维码失控",
    text: "你发现一个旧群的二维码被到处转发，陌生人不断进来发广告。",
    condition: function(s) { return s.socialExp >= 5; },
    probability: 0.1,
    effects: { awareness: 1, risk: 1 },
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },

  // === Work & Money Events ===
  {
    id: "re_probation_review",
    title: "试用期复盘",
    text: "主管说你表现还行，但需要再主动一点。你开始意识到，职场里沉默也有成本。",
    condition: function(s) { return s.age >= 22 && s.age <= 30; },
    probability: 0.16,
    effects: { socialExp: 1, mental: -1, awareness: 1 },
    stage: ["college", "early_career"]
  },
  {
    id: "re_rent_increase",
    title: "房租涨了",
    text: "房东通知你下个月涨租。搬家麻烦，不搬又肉疼。",
    condition: function(s) { return s.age >= 22 && s.age <= 45 && !s.lifeFlags.has_house; },
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "接受涨租", effects: { money: -3000, mental: -1 }, result: "你留下了。熟悉的通勤路线没有变，只是每月余额更薄了。" },
      { text: "重新找房", effects: { money: -1500, fatigue: 2, socialExp: 1 }, result: "看房、搬家、改地址，折腾得够呛。但新房租便宜一些。" },
      { text: "和房东谈条件", effects: { socialExp: 1, money: -1000 }, result: "你拿周边价格谈了谈，房东少涨了一点。不是大胜，但也不是被动挨打。" }
    ],
    stage: ["college", "early_career", "family_career"]
  },
  {
    id: "re_side_income_tax",
    title: "副业收入报税",
    text: "你收到平台提醒：副业收入需要规范申报。你以前从没认真看过这些规则。",
    condition: function(s) { return s.age >= 22 && s.age <= 55 && s.money >= 3000; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "查规则，规范处理", effects: { awareness: 1, money: -800, mental: 1 }, result: "补了一些税，也补了一课。规则清楚以后，心里反而踏实。" },
      { text: "先拖着", effects: { risk: 2, shame: 1 }, result: "你把提醒划走了。它没消失，只是换了个时间回来。" }
    ],
    stage: ["college", "early_career", "family_career"]
  },
  {
    id: "re_big_purchase",
    title: "大件消费",
    text: "你想换一台电脑/家电。平台有免息分期，销售说'今天不买明天涨价'。",
    condition: function(s) { return s.age >= 19 && s.money >= 2000; },
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "直接分期买高配", effects: { money: -1000, debt: 6000, greed: 1, mental: 1 }, result: "新东西很好用，账单也准时来。快乐被分成了十二期。" },
      { text: "按预算买够用的", effects: { money: -3500, awareness: 1 }, result: "没有顶配的兴奋，但需求满足了。你保住了现金流。" },
      { text: "再等一次促销", effects: { mental: -1, greed: -1 }, result: "你把商品放进收藏夹。几天后冲动淡了，需求也变清楚了。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_market_boom",
    title: "市场大涨",
    text: "新闻里全是上涨，群里全是收益截图。你感觉自己错过了一个时代。",
    condition: function(s) { return s.age >= 25 && s.money >= 10000; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "追进去一把", effects: { money: -5000, greed: 2, risk: 2, mental: 1 }, result: "刚买时确实涨了两天。你开始频繁打开账户，心跳跟着曲线走。" },
      { text: "只拿小钱试水", effects: { money: -1000, awareness: 1, greed: 1 }, result: "你用能承受损失的钱体验了一下。涨跌都真实，贪念也真实。" },
      { text: "按原计划不追高", effects: { awareness: 2, greed: -1 }, result: "你错过了热闹，也躲开了很多噪音。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },

  // === Family & Relationship Events ===
  {
    id: "re_parent_phone_upgrade",
    title: "父母换智能机",
    text: "父母换了新手机，什么权限都点允许，桌面很快多出一堆陌生图标。",
    condition: function(s) { return s.age >= 28 && s.age <= 60; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "耐心教一遍", effects: { familyTrust: 2, awareness: 1, fatigue: 1 }, result: "你讲得口干舌燥，父母也记住了一些关键步骤。" },
      { text: "直接帮他们全设置好", effects: { familyTrust: 1, digitalSkill: 1 }, result: "效率很高，但下次遇到新问题，他们还是第一时间找你。" },
      { text: "太忙了，下次再说", effects: { familyTrust: -1, risk: 1 }, result: "你确实忙。只是手机里的弹窗不会等你有空。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_child_game_charge",
    title: "孩子游戏充值",
    text: "账单里出现几笔游戏充值。孩子说只是买皮肤，班里很多人都有。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_child && s.age >= 35 && s.age <= 55; },
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "发火没收手机", effects: { familyTrust: -2, mental: -1 }, result: "钱止住了，沟通也关上了。孩子之后更少跟你说实话。" },
      { text: "一起查账，设支付规则", effects: { familyTrust: 2, awareness: 1, digitalSkill: 1 }, result: "你们把自动扣款关掉，也讲清楚了为什么不能随便付款。" },
      { text: "觉得小钱算了", effects: { money: -1000, risk: 1 }, result: "这次不多，但边界模糊了。下一次可能就没这么轻。" }
    ],
    stage: ["family_career", "midlife_asset"]
  },
  {
    id: "re_anniversary",
    title: "一个纪念日",
    text: "你差点忘了一个重要纪念日。对方没说什么，但你看得出TA有点失望。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.married; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "补一个认真安排", effects: { familyTrust: 2, money: -1200, mental: 1 }, result: "不算完美，但心意到了。日子就是靠这些小修小补撑起来的。" },
      { text: "装作没事", effects: { familyTrust: -1, loneliness: 1 }, result: "事情过去了，气氛却留下了一点灰。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_elder_care_rotation",
    title: "照护分工",
    text: "父母需要更多照顾，兄弟姐妹开始讨论怎么分担。钱、时间、情绪都摆上了桌面。",
    condition: function(s) { return s.age >= 40 && s.age <= 65; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "主动多承担一些", effects: { familyTrust: 2, fatigue: 2, mental: -1 }, result: "家里人轻松了一点，你累了很多。成年人的孝顺常常是排班表。" },
      { text: "把规则说清楚", effects: { awareness: 1, socialExp: 1, familyTrust: 1 }, result: "一开始有点尴尬，但说清楚之后，长期反而少了怨气。" },
      { text: "能躲就躲", effects: { familyTrust: -2, shame: 1 }, result: "短期轻松了，心里却多了一根刺。" }
    ],
    stage: ["family_career", "midlife_asset"]
  },

  // === Health & Aging Events ===
  {
    id: "re_sleep_debt",
    title: "长期缺觉",
    text: "你连续一阵睡得很差。白天脑子发木，看到任何'立刻处理'的消息都更容易慌。",
    condition: function(s) { return s.fatigue >= 4 || s.mental <= 8; },
    probability: 0.18,
    effects: { mental: -1, awareness: -1, risk: 1 },
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_sports_injury",
    title: "运动拉伤",
    text: "你锻炼时有点逞强，结果拉伤了。休息几天，计划全被打乱。",
    condition: function(s) { return s.yearActionCount >= 2; },
    probability: 0.08,
    effects: { fatigue: 2, mental: -1, money: -500 },
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_regular_check_ok",
    title: "体检指标不错",
    text: "体检报告比你预想的好。医生说继续保持，少熬夜。",
    condition: function(s) { return s.fatigue <= 3 && s.age >= 30; },
    probability: 0.1,
    effects: { mental: 1, fatigue: -1 },
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_memory_slip",
    title: "记性变差",
    text: "你忘了一个缴费日期，又找不到写着密码的纸。你突然有点不安。",
    condition: function(s) { return s.age >= 58; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "整理账户和联系人", effects: { awareness: 2, familyTrust: 1, mental: 1 }, result: "你把重要信息整理好，也告诉了可信任的家人。" },
      { text: "继续凭记忆来", effects: { risk: 2, mental: -1 }, result: "你不想承认自己会忘。但生活开始用小失误提醒你。" }
    ],
    stage: ["midlife_asset", "elderly"]
  },

  // === Community & Society Events ===
  {
    id: "re_policy_change",
    title: "新规出台",
    text: "支付、平台、个人信息相关的新规上了新闻。很多人嫌麻烦，你却发现里面有些保护自己的细节。",
    condition: function(s) { return s.age >= 18; },
    probability: 0.1,
    effects: { awareness: 1, digitalSkill: 1 },
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_community_warning",
    title: "社区预警",
    text: "社区群里发了提醒：附近有人冒充客服、维修、熟人借钱。案例很近，近到有点吓人。",
    condition: function(s) { return s.age >= 25; },
    probability: 0.14,
    effects: { awareness: 1, trust: -1 },
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_help_relative_verify",
    title: "亲戚让你帮忙核实",
    text: "亲戚转来一个链接，说点进去能领补贴，问你是不是真的。",
    condition: function(s) { return s.awareness >= 7 && s.age >= 20; },
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "认真核实并解释", effects: { awareness: 1, familyTrust: 1, socialExp: 1 }, result: "你查了官方渠道，确认是假的。亲戚嘴上说麻烦，还是把群里的链接撤了。" },
      { text: "只回一句假的", effects: { awareness: 1 }, result: "判断没错，但对方未必真的听懂。下次可能还会问。" },
      { text: "懒得管", effects: { familyTrust: -1, shame: 1 }, result: "你没有回复。晚上又想起这事，心里有点挂着。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_public_service",
    title: "一次公益服务",
    text: "你参加了社区/学校组织的公益活动，帮别人填表、讲流程、处理手机问题。",
    condition: function(s) { return s.socialExp >= 6; },
    probability: 0.1,
    effects: { socialExp: 1, trust: 1, awareness: 1, fatigue: 1 },
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },

  // === Late Life Events ===
  {
    id: "re_old_friend_reconnect",
    title: "老朋友重新联系",
    text: "多年没见的老朋友突然发来消息。聊起从前，你心里暖了一下。",
    condition: function(s) { return s.age >= 55 && s.loneliness >= 6; },
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "约出来见面", effects: { loneliness: -2, socialExp: 1, trust: 1, money: -300 }, result: "你们聊了很久。很多事过去了，但人还在。" },
      { text: "线上聊聊就好", effects: { loneliness: -1, digitalSkill: 1 }, result: "隔着屏幕也不错。至少这一天，你没有那么孤单。" },
      { text: "保持警惕，不多聊", effects: { awareness: 1, trust: -1 }, result: "你没有错，只是心门又关紧了一点。" }
    ],
    stage: ["midlife_asset", "elderly"]
  },
  {
    id: "re_pension_arrival",
    title: "养老金到账",
    text: "养老金准时到账。金额不算多，但稳定两个字在晚年特别珍贵。",
    condition: function(s) { return s.age >= 60; },
    probability: 0.16,
    effects: { money: 3000, mental: 1 },
    stage: ["midlife_asset", "elderly"]
  },
  {
    id: "re_funeral_expense",
    title: "参加白事",
    text: "一位熟人离世。你去送别，也随了礼。回家路上，你想了很多。",
    condition: function(s) { return s.age >= 50; },
    probability: 0.1,
    effects: { money: -1000, mental: -1, loneliness: 1 },
    stage: ["midlife_asset", "elderly"]
  },
  {
    id: "re_grandchild_question",
    title: "孩子问你问题",
    text: "晚辈问你：'为什么不能把验证码告诉别人？'你忽然发现，自己也能成为别人的保护伞。",
    condition: function(s) { return s.age >= 55 && s.familyTrust >= 8; },
    probability: 0.12,
    effects: { awareness: 1, familyTrust: 1, loneliness: -1 },
    stage: ["midlife_asset", "elderly"]
  }
];

Game.RandomEvents = Game.RandomEvents.concat([
  // === More Conditional Events ===
  {
    id: "re_savings_goal_locked",
    title: "存钱计划见效",
    text: "你给自己设了一个小目标：每月先存一笔钱，再考虑消费。几个月后，账户里第一次有了真正的缓冲。",
    condition: function(s) { return s.age >= 22 && s.money >= 8000 && s.greed <= 8; },
    probability: 0.12,
    effects: { mental: 1, awareness: 1, greed: -1 },
    stage: ["college", "early_career", "family_career"]
  },
  {
    id: "re_debt_collection_call",
    title: "催收电话",
    text: "一个陌生号码打来，自称法务部，说你的欠款必须今天处理，不然会影响家人。你手心发凉。",
    condition: function(s) { return s.debt >= 10000; },
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "查官方账单再处理", effects: { awareness: 2, mental: 1 }, result: "你挂断电话，登录官方渠道核对。确实有账单，但对方夸大了后果。你没有被情绪推着走。" },
      { text: "按对方要求先转一笔", effects: { money: -3000, risk: 2, shame: 1, mental: -1 }, result: "转完后对方又要第二笔。你终于反应过来：真正的债务没有解决，新的坑先来了。" },
      { text: "不接任何电话", effects: { mental: -1, shame: 1 }, result: "你躲开了骗子，也躲开了问题。账单不会因为沉默消失。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_credit_limit_raise",
    title: "额度提升通知",
    text: "银行APP提示你的信用额度提升了。它看起来像一种认可，也像一扇更大的消费门。",
    condition: function(s) { return s.age >= 20 && s.age <= 55 && s.debt <= 20000; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "接受额度，但不开分期", effects: { awareness: 1, risk: 1 }, result: "额度在那里，但你没急着用。真正的自控不是没有诱惑，而是看见诱惑还慢一点。" },
      { text: "顺手买点想买的", effects: { debt: 5000, mental: 1, greed: 1 }, result: "快乐到账很快，账单也很准时。" },
      { text: "主动调低额度", effects: { awareness: 2, greed: -1 }, result: "你少了一点虚假的安全感，多了一点真实的边界。" }
    ],
    stage: ["college", "early_career", "family_career"]
  },
  {
    id: "re_insurance_gap",
    title: "保险缺口",
    text: "一次聊天里你发现，自己以为买过的保障其实并不覆盖当前最担心的风险。",
    condition: function(s) { return s.age >= 30 && s.money >= 5000; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "找正规渠道重新梳理", effects: { awareness: 2, money: -2000, mental: 1 }, result: "条款很枯燥，但你终于知道自己买了什么、没买什么。" },
      { text: "听熟人代理推荐", effects: { money: -6000, trust: 1, awareness: -1 }, result: "你买得很快，也不好意思问太细。熟人的面子有时比条款还贵。" },
      { text: "暂时不处理", effects: { risk: 1 }, result: "你把这事放下了。只是风险不会因为没看见就离开。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_company_data_breach",
    title: "公司数据泄露",
    text: "公司通知员工：部分个人信息可能泄露。你的邮箱、手机号、身份证后几位都在其中。",
    condition: function(s) { return s.age >= 22 && s.age <= 60; },
    probability: 0.1,
    effects: { risk: 2, awareness: 1, trust: -1 },
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_short_video_sink",
    title: "短视频刷过头",
    text: "你只是想放松十分钟，结果一抬头已经凌晨。第二天整个人都慢半拍。",
    condition: function(s) { return s.digitalSkill >= 4 && s.mental <= 15; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "设置使用时长限制", effects: { digitalSkill: 1, mental: 1, fatigue: -1 }, result: "提醒响起时有点烦，但它把你从信息流里拉了出来。" },
      { text: "继续随缘刷", effects: { fatigue: 1, mental: -1, risk: 1 }, result: "快乐很碎，睡眠也很碎。你知道这不是最好的状态。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_relative_invest_loss",
    title: "亲戚投资亏了",
    text: "亲戚在家族群里说自己投的项目爆雷了，开始问大家能不能帮帮忙。群里一片沉默。",
    condition: function(s) { return s.age >= 30 && s.familyTrust >= 6; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "帮忙整理证据报警", effects: { awareness: 1, familyTrust: 1, fatigue: 1 }, result: "你没法把钱追回来，但至少帮TA把事情从混乱里理出头绪。" },
      { text: "借一笔应急钱", effects: { money: -8000, familyTrust: 1, mental: -1 }, result: "钱转出去后，你心里也悬着。救急和填坑之间，只隔着后续。" },
      { text: "明确不参与", effects: { familyTrust: -1, awareness: 1 }, result: "你保住了边界，也承受了几句难听话。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_child_parent_meeting",
    title: "家长会",
    text: "老师提到孩子最近有点沉迷手机，也有同学在群里私下交易游戏账号。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_child && s.age >= 34 && s.age <= 55; },
    probability: 0.13,
    effects: { familyTrust: 1, awareness: 1, fatigue: 1 },
    stage: ["family_career", "midlife_asset"]
  },
  {
    id: "re_spouse_job_change",
    title: "伴侣工作变化",
    text: "另一半的工作突然变化，收入不稳定了。你们第一次认真坐下来算家庭现金流。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.married && s.age >= 28 && s.age <= 55; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "一起调整预算", effects: { familyTrust: 2, awareness: 1, greed: -1 }, result: "数字不好看，但你们站在同一边。压力因此小了一点。" },
      { text: "各管各的钱", effects: { familyTrust: -1, loneliness: 1 }, result: "表面轻松，心里各自有账。亲密关系里也开始有了看不见的墙。" }
    ],
    stage: ["early_career", "family_career"]
  },
  {
    id: "re_home_repair",
    title: "家里突然要维修",
    text: "水管漏了、墙皮掉了、家电坏了。生活总会在你没准备的时候伸手要钱。",
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_house; },
    probability: 0.14,
    isChoice: true,
    options: [
      { text: "找正规维修报价", effects: { money: -2500, awareness: 1 }, result: "贵是贵，但明码标价。师傅走后，你拍照保存了维修记录。" },
      { text: "找小广告便宜修", effects: { money: -1000, risk: 2 }, result: "当天是便宜了，三周后同一个地方又开始漏。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_medical_second_opinion",
    title: "第二诊疗意见",
    text: "一次检查结果让你有些担心。有人推荐偏方，也有人建议去三甲医院再看一次。",
    condition: function(s) { return s.age >= 40 || s.fatigue >= 5; },
    probability: 0.11,
    isChoice: true,
    options: [
      { text: "去正规医院复查", effects: { money: -1200, awareness: 1, mental: 1 }, result: "折腾了一天，但结论清楚了。你没有把身体交给朋友圈。" },
      { text: "先试试偏方", effects: { money: -3000, risk: 2, mental: -1 }, result: "药包寄来了，说明书写得玄乎。你越吃越没底。" },
      { text: "先拖一拖", effects: { mental: -1, fatigue: 1 }, result: "你假装没事，但身体不会配合演戏。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_retirement_policy_adjust",
    title: "退休政策调整",
    text: "你看到退休、医保或养老金相关政策调整的消息。评论区吵成一团。",
    condition: function(s) { return s.age >= 45; },
    probability: 0.09,
    isChoice: true,
    options: [
      { text: "查官方解读", effects: { awareness: 2, mental: 1 }, result: "看懂不容易，但至少你没有被标题带着跑。" },
      { text: "相信群里转发", effects: { risk: 1, trust: -1 }, result: "群消息情绪很足，细节很少。你越看越焦虑。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_elder_remote_support",
    title: "远程帮忙操作",
    text: "父母/子女让你远程帮忙操作手机。屏幕共享很方便，也很危险。",
    condition: function(s) { return s.age >= 35 && s.digitalSkill >= 5; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "只指导，不接管支付", effects: { awareness: 2, familyTrust: 1 }, result: "慢是慢，但对方学会了一点。你也守住了支付边界。" },
      { text: "直接远程接管", effects: { familyTrust: 1, risk: 1 }, result: "问题解决很快，但这个习惯一旦形成，谁都可能成为'帮忙的人'。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_empty_nest_festival",
    title: "一个冷清的节日",
    text: "节日到了，家里很安静。朋友圈很热闹，你却突然不太想说话。",
    condition: function(s) { return s.age >= 55 && s.loneliness >= 7; },
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "主动约人吃顿饭", effects: { loneliness: -2, socialExp: 1, money: -500 }, result: "饭菜普通，但有人一起吃就不一样。" },
      { text: "给家人打视频", effects: { loneliness: -1, familyTrust: 1, digitalSkill: 1 }, result: "屏幕不等于陪伴，但至少声音是真的。" },
      { text: "一个人熬过去", effects: { loneliness: 2, mental: -1 }, result: "这一天过去了，空落落的感觉却没有完全过去。" }
    ],
    stage: ["midlife_asset", "elderly"]
  },
  {
    id: "re_neighborhood_mediation",
    title: "邻里纠纷",
    text: "邻居因为噪音、停车或漏水吵起来，你被夹在中间。每个人都觉得自己有理。",
    condition: function(s) { return s.age >= 25 && s.socialExp >= 4; },
    probability: 0.09,
    isChoice: true,
    options: [
      { text: "帮忙沟通协调", effects: { socialExp: 1, trust: 1, fatigue: 1 }, result: "你费了不少口舌，事情缓和了一点。人和人之间，最难修的是情绪。" },
      { text: "不掺和", effects: { awareness: 1 }, result: "你保持距离。楼道里还是有点尴尬，但你没把自己卷进去。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_legal_notice",
    title: "收到法律通知",
    text: "你收到一封措辞严厉的通知，说你涉及合同、欠款或账号违规。它看起来很正式。",
    condition: function(s) { return s.age >= 22 && (s.risk >= 4 || s.debt >= 5000); },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "找官方渠道核验", effects: { awareness: 2, mental: 1 }, result: "你核对了编号和来源。虚惊一场，但这场虚惊很值得。" },
      { text: "按邮件链接处理", effects: { risk: 2, money: -2000, mental: -1 }, result: "链接页面很像真的。等你反应过来，信息已经填出去了。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_disaster_donation",
    title: "灾后捐助",
    text: "一场灾害上了热搜，很多人在转发捐款链接。你也想做点什么。",
    condition: function(s) { return s.age >= 18 && s.money >= 1000; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "走官方公益渠道", effects: { money: -500, trust: 1, awareness: 1 }, result: "钱不多，但去向清楚。善意也需要通道。" },
      { text: "转给私人募捐号", effects: { money: -500, risk: 1 }, result: "你转了。后来链接删了，你也不知道钱去了哪里。" },
      { text: "只转发不捐款", effects: { socialExp: 1 }, result: "你转发了核实过的信息。不是所有帮助都必须是钱。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_online_reputation",
    title: "网上被误解",
    text: "你在群里或平台上说了一句话，被别人截取传播。你第一次感到网络语境的锋利。",
    condition: function(s) { return s.digitalSkill >= 5 && s.socialExp >= 5; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "冷静澄清并留证据", effects: { awareness: 1, mental: -1, socialExp: 1 }, result: "你没有吵赢所有人，但把事实留住了。" },
      { text: "上头对线", effects: { mental: -2, shame: 1, risk: 1 }, result: "越解释越乱。你关掉手机，心跳还很快。" },
      { text: "直接退群/注销", effects: { loneliness: 1, mental: 1 }, result: "世界清静了些，关系也断了一截。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_certificate_expiring",
    title: "证件快过期",
    text: "身份证、驾照、护照或银行卡证件信息快过期了。系统提醒你尽快更新。",
    condition: function(s) { return s.age >= 18; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "走官方流程更新", effects: { awareness: 1, fatigue: 1 }, result: "流程有点烦，但事情办完了。很多风险都藏在'下次再说'里。" },
      { text: "找代办省事", effects: { money: -800, risk: 2 }, result: "对方要了很多材料。你忽然意识到，省事有时是在把控制权交出去。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_bank_rate_cut",
    title: "利率下调",
    text: "银行存款利率又降了。你身边有人开始抱怨'钱放银行就是亏'。",
    condition: function(s) { return s.age >= 30 && s.money >= 20000; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "重新配置低风险资产", effects: { awareness: 1, money: 1000, greed: -1 }, result: "收益不惊艳，但你知道每一笔钱承担了什么风险。" },
      { text: "寻找高收益替代", effects: { greed: 2, risk: 2 }, result: "你开始频繁看各种项目。收益越高，话术越甜。" },
      { text: "继续存定期", effects: { mental: 1, greed: -1 }, result: "你没有跑赢所有人，但睡得着。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_success_story_pressure",
    title: "别人的成功故事",
    text: "一个朋友突然赚到钱、买房、创业成功。你替TA高兴，也隐隐有点急。",
    condition: function(s) { return s.age >= 20 && s.socialExp >= 5; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "问清楚真实成本", effects: { awareness: 1, socialExp: 1 }, result: "聊完你才知道，故事里省略了很多失败和代价。" },
      { text: "立刻跟着试试", effects: { greed: 2, risk: 1, mental: -1 }, result: "你不是没有能力，只是被比较心推得太快。" },
      { text: "关掉朋友圈冷静一下", effects: { mental: 1, greed: -1 }, result: "别人有别人的节奏。你把注意力拉回了自己的账本。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_family_password_book",
    title: "家庭应急清单",
    text: "你发现家里没人说得清重要证件、账户、紧急联系人分别在哪。万一出事会很麻烦。",
    condition: function(s) { return s.age >= 35 && s.familyTrust >= 6; },
    probability: 0.09,
    isChoice: true,
    options: [
      { text: "整理一份应急清单", effects: { familyTrust: 1, awareness: 2, fatigue: 1 }, result: "你没有把密码乱写一堆，而是整理了联系人、渠道和必要提示。家里踏实了很多。" },
      { text: "觉得不吉利，先算了", effects: { risk: 1 }, result: "你把这事放下了。很多家庭就是在'别说这个'里失去准备。" }
    ],
    stage: ["family_career", "midlife_asset", "elderly"]
  }
]);

Game.RandomEvents = Game.RandomEvents.concat([
  // === Abstract Slice-of-Life Events ===
  {
    id: "re_dream_future_bill",
    title: "梦见未来账单",
    text: "你梦见自己八十岁，坐在桌前翻一摞账单。醒来后天还没亮，手机屏幕上只有一条未读广告。",
    condition: function(s) { return s.age >= 16 && (s.debt >= 5000 || s.greed >= 8 || s.fatigue >= 4); },
    probability: 0.11,
    isChoice: true,
    options: [
      { text: "起床把账算清楚", effects: { awareness: 1, mental: 1, greed: -1 }, result: "数字不一定好看，但它们终于从梦里回到了纸上。" },
      { text: "继续睡，当没发生", effects: { mental: -1 }, result: "你睡着了。梦没有继续，但那种发空的感觉留到了上午。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_wrong_message",
    title: "一条错发的消息",
    text: "有人把一条很私人的消息错发给你。你看到了开头几个字，意识到这不是给你的。",
    condition: function(s) { return s.age >= 13 && s.digitalSkill >= 3; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "提醒对方发错了", effects: { trust: 1, socialExp: 1 }, result: "对方很尴尬，也很感谢。你把好奇心按住了。" },
      { text: "忍不住看完", effects: { shame: 1, trust: -1 }, result: "你知道了不该知道的事。秘密像一枚小石子，硌在心里。" },
      { text: "直接删除不回复", effects: { awareness: 1 }, result: "你没有介入。生活里有些门，关上比推开更好。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_old_photo",
    title: "相册突然提醒",
    text: "手机相册推送'多年前的今天'。照片里的人都很年轻，连烦恼都像旧款式。",
    condition: function(s) { return s.age >= 25; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "发给照片里的人", effects: { loneliness: -1, socialExp: 1, trust: 1 }, result: "有人秒回，有人没回。回忆像投出去的小纸船，不一定都能漂回来。" },
      { text: "一个人看一会儿", effects: { mental: 1, loneliness: 1 }, result: "你笑了一下，也沉默了一下。时间没有恶意，它只是走得很准。" },
      { text: "立刻关掉", effects: { mental: -1 }, result: "你关掉了提醒，但那张照片已经在脑子里亮了一会儿。" }
    ],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_queue_story",
    title: "排队听来的故事",
    text: "排队时，前面两个人聊起一个被骗的亲戚。故事说得很乱，但几个细节让你背后一凉。",
    condition: function(s) { return s.age >= 18; },
    probability: 0.1,
    effects: { awareness: 1, trust: -1 },
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_rain_convenience_store",
    title: "雨困便利店",
    text: "暴雨把你困在便利店。陌生人们站在同一片屋檐下，谁也不认识谁，却短暂地像一个临时社区。",
    condition: function(s) { return true; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "和旁边的人聊两句", effects: { socialExp: 1, loneliness: -1, trust: 1 }, result: "你们聊了天气、交通和一点点生活。雨停后，各自回到各自的人生。" },
      { text: "低头刷手机等雨停", effects: { digitalSkill: 1, loneliness: 1 }, result: "雨声很大，手机里的声音更大。你没有无聊，也没有真正休息。" },
      { text: "买把伞冲出去", effects: { money: -50, mental: 1 }, result: "你踩进几个水坑，但终于重新移动起来。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_algorithm_knows",
    title: "算法好像懂你",
    text: "你只是随口提过一次某个东西，手机很快开始连续推荐。它不一定在偷听，但它确实很会猜。",
    condition: function(s) { return s.digitalSkill >= 4; },
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "检查隐私和广告设置", effects: { digitalSkill: 1, awareness: 1, risk: -1 }, result: "你关掉了一些权限。世界没有清静很多，但你夺回了一点方向盘。" },
      { text: "顺着推荐看下去", effects: { greed: 1, risk: 1, fatigue: 1 }, result: "推荐越来越准，也越来越窄。你像走进一条铺满镜子的巷子。" },
      { text: "不纠结，继续用", effects: { mental: 1 }, result: "你选择不把每件事都想透。轻松了一点，也模糊了一点。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_same_name_news",
    title: "同名同姓的人",
    text: "新闻里出现一个和你同名同姓的人。TA的经历和你毫不相干，却让你盯着那个名字看了很久。",
    condition: function(s) { return s.age >= 18; },
    probability: 0.06,
    isChoice: true,
    options: [
      { text: "顺手查查自己的公开信息", effects: { awareness: 1, digitalSkill: 1 }, result: "你发现网上确实留着一些旧痕迹。名字像一扇门，最好知道门外有什么。" },
      { text: "转给朋友开玩笑", effects: { socialExp: 1, mental: 1 }, result: "朋友笑了两句。你也笑，但心里还是有点微妙。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_lost_and_found",
    title: "失物招领",
    text: "你捡到一个钱包/证件夹。里面没有多少钱，却有很多能证明一个人生活轨迹的东西。",
    condition: function(s) { return true; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "交到派出所或服务台", effects: { trust: 1, socialExp: 1, mental: 1 }, result: "你没有见到失主，但能想象TA松一口气的样子。" },
      { text: "试着自己联系失主", effects: { socialExp: 1, fatigue: 1 }, result: "过程有点折腾，幸好最后联系上了。做好事也需要流程感。" },
      { text: "拿走现金再丢掉", effects: { money: 300, shame: 2, trust: -2 }, result: "钱不多，却让你低头看了好几次自己的手。" }
    ],
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_wrong_delivery",
    title: "送错的快递",
    text: "门口多了一个不属于你的包裹。收件人住址只差一个数字，里面是什么你并不知道。",
    condition: function(s) { return s.age >= 16; },
    probability: 0.09,
    isChoice: true,
    options: [
      { text: "联系快递员拿走", effects: { awareness: 1, trust: 1 }, result: "事情很小，但你把边界处理得很干净。" },
      { text: "帮忙送到邻居家", effects: { socialExp: 1, trust: 1 }, result: "邻居连声道谢。你们终于不只是电梯里点头的人。" },
      { text: "拆开看看", effects: { shame: 2, risk: 1 }, result: "拆开的一瞬间，你就知道这事不该这样发展。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_city_changes",
    title: "熟悉的店关了",
    text: "你常去的一家店突然关门。门上贴着转租，玻璃里还剩半张褪色的菜单。",
    condition: function(s) { return s.age >= 20; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "拍张照留念", effects: { mental: 1, loneliness: 1 }, result: "照片不值钱，但它替你留住了一个小地点。" },
      { text: "找一家新店", effects: { socialExp: 1, mental: 1 }, result: "新店味道不一样。生活也是这样，用替代品慢慢缝起来。" },
      { text: "感慨一下就走", effects: { mental: -1 }, result: "你走得很快，像怕被旧地方认出来。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_odd_lucky_day",
    title: "奇怪的好运日",
    text: "今天小事都很顺：赶上车、没排队、想买的东西刚好降价。顺到你有点不习惯。",
    condition: function(s) { return true; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "把好运当普通日子过", effects: { mental: 1 }, result: "你没有加码下注，也没有许大愿。好日子只是好日子。" },
      { text: "趁运气好买点彩票", effects: { money: -100, greed: 1 }, result: "彩票没中。好运像猫，不能叫来表演。" },
      { text: "请朋友喝杯东西", effects: { money: -80, trust: 1, loneliness: -1 }, result: "好运被你分出去一点，反而更像真的。" }
    ],
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_bad_luck_chain",
    title: "倒霉连锁",
    text: "钥匙找不到，杯子打翻，出门又下雨。没有大灾大难，就是每件小事都卡你一下。",
    condition: function(s) { return s.fatigue >= 2 || s.mental <= 12; },
    probability: 0.1,
    isChoice: true,
    options: [
      { text: "暂停一下，少做决定", effects: { awareness: 1, fatigue: -1 }, result: "你把节奏放慢。不是所有日子都适合硬冲。" },
      { text: "硬顶着继续干", effects: { fatigue: 1, mental: -1 }, result: "事情做完了，你也被磨薄了一层。" },
      { text: "找人吐槽", effects: { loneliness: -1, socialExp: 1 }, result: "对方笑你倒霉，也安慰你。坏日子被说出来就小了一点。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_book_note",
    title: "旧书里的纸条",
    text: "你翻到一本旧书，里面夹着一张很久以前写的纸条。字迹幼稚，愿望认真。",
    condition: function(s) { return s.age >= 13; },
    probability: 0.08,
    isChoice: true,
    options: [
      { text: "把纸条收起来", effects: { mental: 1, loneliness: -1 }, result: "过去的你像隔着很远向你点头。你突然没那么想苛责自己了。" },
      { text: "笑笑扔掉", effects: { awareness: 1 }, result: "你把它扔了。不是不珍惜，只是不想让每个过去都变成纪念品。" },
      { text: "拍照发动态", effects: { socialExp: 1, trust: 1 }, result: "有人留言说也想起了自己。旧纸条短暂地变成了公共回忆。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_silence_day",
    title: "沉默的一天",
    text: "这一天几乎没人找你。没有坏消息，也没有好消息。安静本身变得有点明显。",
    condition: function(s) { return s.loneliness >= 6 || s.age >= 55; },
    probability: 0.11,
    isChoice: true,
    options: [
      { text: "主动联系一个人", effects: { loneliness: -2, socialExp: 1 }, result: "消息发出去后，你意识到关系有时候要靠先伸手。" },
      { text: "享受安静", effects: { mental: 1, awareness: 1 }, result: "安静没有吞掉你。它只是给你留了一点空间。" },
      { text: "不停刷新消息", effects: { fatigue: 1, loneliness: 1 }, result: "每次刷新都像敲一扇没人开的门。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_time_capsule",
    title: "给未来的自己",
    text: "你突然想给未来的自己留一句话。不是鸡汤，只是此刻真实想说的一句。",
    condition: function(s) { return s.age >= 13 && s.age <= 65; },
    probability: 0.07,
    isChoice: true,
    options: [
      { text: "写下来存好", effects: { mental: 1, awareness: 1 }, result: "字不多，但像在时间里钉了一颗小钉子。" },
      { text: "觉得矫情，算了", effects: { mental: -1 }, result: "你没有写。那句话很快散掉了，像没保存的草稿。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_machine_error",
    title: "机器多找了钱",
    text: "自助机或收银系统好像多退了你一笔钱。金额不大，但你很确定它算错了。",
    condition: function(s) { return s.age >= 12; },
    probability: 0.07,
    isChoice: true,
    options: [
      { text: "告诉工作人员", effects: { trust: 1, mental: 1 }, result: "工作人员愣了一下，然后认真道谢。你把一件小事放回了正轨。" },
      { text: "装作没发现", effects: { money: 100, shame: 1 }, result: "钱进了口袋，事情也进了心里一个很小的角落。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_public_screen",
    title: "公共屏幕上的自己",
    text: "商场屏幕、监控回放或活动照片里突然出现你的身影。你从第三人称看见了自己。",
    condition: function(s) { return s.age >= 16; },
    probability: 0.06,
    isChoice: true,
    options: [
      { text: "一笑而过", effects: { mental: 1 }, result: "你看起来没有想象中那么糟，也没有想象中那么重要。" },
      { text: "开始在意形象", effects: { shame: 1, socialExp: 1 }, result: "你整理了一下衣服。人总是在被看见时重新认识自己。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset"]
  },
  {
    id: "re_stranger_kindness",
    title: "陌生人的小善意",
    text: "有人帮你扶住门、提醒你东西掉了、给你指路。小到几乎不值得记录，却让这天软了一点。",
    condition: function(s) { return true; },
    probability: 0.09,
    effects: { trust: 1, mental: 1, loneliness: -1 },
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_stranger_rudeness",
    title: "陌生人的冒犯",
    text: "一个陌生人莫名其妙地冲你发火。事情很小，但坏情绪像被泼到衣服上的水。",
    condition: function(s) { return true; },
    probability: 0.09,
    isChoice: true,
    options: [
      { text: "不接这份情绪", effects: { awareness: 1, mental: 1 }, result: "你没有把别人的火接回自己家里。" },
      { text: "当场吵回去", effects: { mental: -1, shame: 1 }, result: "你赢了几句嘴，输了半天心情。" },
      { text: "回去跟朋友吐槽", effects: { loneliness: -1, socialExp: 1 }, result: "朋友说'这人有病吧'。这句话朴素但有效。" }
    ],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_childhood_smell",
    title: "一种童年的味道",
    text: "路过某个摊位或楼道，你闻到一种很像小时候的味道。记忆比人先回了家。",
    condition: function(s) { return s.age >= 20; },
    probability: 0.07,
    isChoice: true,
    options: [
      { text: "买一点尝尝", effects: { money: -30, mental: 1, loneliness: -1 }, result: "味道不完全一样，但足够把你送回去几秒。" },
      { text: "站一会儿就走", effects: { mental: 1 }, result: "你没有买。不是所有回忆都需要带走。" }
    ],
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  },
  {
    id: "re_a_small_win",
    title: "一个微小胜利",
    text: "你解决了一个拖了很久的小问题：退订、修好、说清楚、归档。世界没有变好很多，但确实轻了一点。",
    condition: function(s) { return s.fatigue <= 5; },
    probability: 0.09,
    effects: { mental: 1, awareness: 1, fatigue: -1 },
    stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"]
  }
]);

Game.ActionEvents = [
  // === Study / Learning ===
  {
    id: "ae_study_good_note",
    title: "一本笔记本",
    text: "你把最近学到的东西整理成一本笔记。翻回去看时，很多零散的判断终于连成了线。",
    actions: ["study", "ai_homework", "certificate_exam"],
    stage: ["childhood", "middle_school", "college"],
    probability: 0.18,
    effects: { awareness: 1, mental: 1 }
  },
  {
    id: "ae_study_fake_course_ad",
    title: "学习群里的广告",
    text: "你刚学完一阵，学习群里有人发'内部提分/保过资料'。它正好戳中你的焦虑。",
    actions: ["study", "contest", "certificate_exam"],
    stage: ["middle_school", "college", "early_career"],
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "先查机构和评价", effects: { awareness: 2 }, result: "你搜到一堆投诉。焦虑还在，但钱保住了。" },
      { text: "买一份试试", effects: { money: -799, greed: 1, shame: 1 }, result: "资料水得离谱。你发现'保过'这两个字，保的通常不是你。" },
      { text: "问老师/前辈", effects: { socialExp: 1, awareness: 1 }, result: "前辈说得很直接：真有用的资料不会靠群广告卖。" }
    ]
  },
  {
    id: "ae_ai_tool_source_check",
    title: "AI给错答案",
    text: "AI工具给了一个看起来很顺的答案，但你核对来源时发现关键细节是错的。",
    actions: ["ai_homework", "ai_tool_learning", "content_creator"],
    stage: ["middle_school", "college", "early_career", "family_career"],
    probability: 0.2,
    effects: { awareness: 2, digitalSkill: 1, mental: -1 }
  },

  // === Work / Money ===
  {
    id: "ae_work_boss_private_msg",
    title: "领导私信",
    text: "你刚忙完工作，'领导'突然在聊天软件上说有急事，让你先垫一笔款。",
    actions: ["work_hard", "work", "career_switch"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.18,
    isChoice: true,
    options: [
      { text: "打电话当面确认", effects: { awareness: 2, socialExp: 1 }, result: "真正的领导一脸懵。你顺手提醒了同事，群里安静了三秒。" },
      { text: "先转小额试探", effects: { money: -2000, risk: 1, shame: 1 }, result: "对方收了钱，立刻要更多。你知道自己踩进去了。" },
      { text: "假装没看见", effects: { mental: -1, awareness: 1 }, result: "你没被骗，但也被这条消息扰乱了一下午。" }
    ]
  },
  {
    id: "ae_work_overtime_reward",
    title: "忙完后的认可",
    text: "这次努力没有白费。领导在会上点名表扬了你，虽然奖金不多，但你感觉被看见了。",
    actions: ["work_hard", "work"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.12,
    condition: function(s) { return s.fatigue <= 6; },
    effects: { money: 2000, mental: 1, socialExp: 1 }
  },
  {
    id: "ae_sidejob_platform_rule",
    title: "平台规则变了",
    text: "副业平台突然调整规则，提现门槛变高了。你才发现自己太依赖一个渠道。",
    actions: ["sidejob", "content_creator", "parttime"],
    stage: ["college", "early_career", "family_career"],
    probability: 0.17,
    isChoice: true,
    options: [
      { text: "分散渠道，保留证据", effects: { awareness: 1, digitalSkill: 1, fatigue: 1 }, result: "你把合同、聊天和流水都保存好，也开始找第二个渠道。" },
      { text: "继续加码做这个平台", effects: { money: 1000, risk: 2, fatigue: 1 }, result: "短期收入还在，但你心里知道，方向盘不在自己手里。" }
    ]
  },
  {
    id: "ae_parttime_black_agent",
    title: "兼职中介费",
    text: "你找兼职时，对方说岗位很好，但要先交服装费、押金或建档费。",
    actions: ["parttime", "internship"],
    stage: ["middle_school", "college", "early_career"],
    probability: 0.2,
    isChoice: true,
    options: [
      { text: "拒绝先交钱", effects: { awareness: 2 }, result: "对方马上换了语气。真正的工作不会先从你口袋里拿钱。" },
      { text: "交钱占名额", effects: { money: -600, shame: 1, risk: 1 }, result: "钱转过去，对方说再等等。后来头像灰了。" },
      { text: "找学校/正规平台确认", effects: { awareness: 1, socialExp: 1 }, result: "你绕了一点路，但绕开了坑。" }
    ]
  },
  {
    id: "ae_emergency_fund_temptation",
    title: "应急金的诱惑",
    text: "你刚存下一笔应急金，购物平台就推来一个'限时大促'。它像是在测试你的边界。",
    actions: ["emergency_fund"],
    stage: ["early_career"],
    probability: 0.18,
    isChoice: true,
    options: [
      { text: "坚持不动应急金", effects: { awareness: 1, greed: -1, mental: 1 }, result: "你没有获得新东西，但获得了一个更可靠的自己。" },
      { text: "先用一点再补回去", effects: { money: -1200, greed: 1 }, result: "你当然打算补回去。只是很多缺口一开始都叫'一点点'。" }
    ]
  },

  // === Investment / Assets ===
  {
    id: "ae_invest_hot_tip",
    title: "朋友的内幕消息",
    text: "你刚研究完投资，一个朋友神秘兮兮地说：'这个消息别外传，马上要涨。'",
    actions: ["invest", "asset_checkup"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.2,
    isChoice: true,
    options: [
      { text: "只当信息，不重仓", effects: { awareness: 1, greed: -1 }, result: "你把它放进观察列表，没有让一句话决定一大笔钱。" },
      { text: "跟一笔大的", effects: { money: -10000, greed: 2, risk: 2 }, result: "你买下去之后，开始每隔十分钟看一次行情。投资变成了焦虑。" },
      { text: "反问风险和来源", effects: { awareness: 2, socialExp: 1 }, result: "朋友说不清楚。你听懂了沉默里的答案。" }
    ]
  },
  {
    id: "ae_asset_check_old_product",
    title: "沉睡的理财产品",
    text: "资产体检时，你翻出一个很久没看的理财产品。收益低、条款复杂，还快到期了。",
    actions: ["asset_checkup", "invest", "retirement_docs"],
    stage: ["family_career", "midlife_asset", "elderly"],
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "到期后转低风险配置", effects: { awareness: 1, money: 2000, mental: 1 }, result: "收益普通，但你终于知道它去了哪里。" },
      { text: "被经理劝着续投升级版", effects: { money: -5000, greed: 1, risk: 1 }, result: "名字升级了，风险也升级了。只是销售不会把重点放在后半句。" }
    ]
  },
  {
    id: "ae_mortgage_hidden_fee",
    title: "账单里的小尾巴",
    text: "你复盘房贷/保险时，发现有几项自动续费的小项目，金额不大但年年扣。",
    actions: ["mortgage_review"],
    stage: ["family_career"],
    probability: 0.2,
    effects: { money: 1500, awareness: 1, mental: 1 }
  },
  {
    id: "ae_retirement_docs_family_talk",
    title: "一场难聊的家庭会议",
    text: "整理退休材料时，你顺便和家人聊了医疗、账户、紧急联系人。话题沉重，但必要。",
    actions: ["retirement_docs"],
    stage: ["midlife_asset", "elderly"],
    probability: 0.18,
    effects: { familyTrust: 2, awareness: 1, mental: -1 }
  },

  // === Social / Relationships ===
  {
    id: "ae_social_old_friend_pitch",
    title: "饭局后的项目",
    text: "你刚参加完社交聚会，一个聊得很热络的人私下发来项目资料，说'只带自己人'。",
    actions: ["social", "community_antifraud", "neighborhood_watch"],
    stage: ["college", "early_career", "family_career", "midlife_asset"],
    probability: 0.18,
    isChoice: true,
    options: [
      { text: "礼貌拒绝", effects: { awareness: 1, trust: -1 }, result: "气氛冷了一点，但边界清楚了。" },
      { text: "先听听说明会", effects: { greed: 1, risk: 1, fatigue: 1 }, result: "会场热烈得不像投资，更像一场情绪动员。" },
      { text: "让TA提供监管和合同信息", effects: { awareness: 2, socialExp: 1 }, result: "对方开始转移话题。你也不需要更多证据了。" }
    ]
  },
  {
    id: "ae_love_money_boundary",
    title: "感情里的钱",
    text: "一次约会后，对方提到最近手头紧，语气很轻，却把问题放到了你面前。",
    actions: ["love", "dating_app"],
    stage: ["college", "early_career"],
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "关心情况，但不直接转钱", effects: { awareness: 1, socialExp: 1 }, result: "你表达了关心，也守住了边界。真诚不是立刻付款。" },
      { text: "先转一笔表示心意", effects: { money: -2000, trust: 1, risk: 1 }, result: "对方很感动。你也希望这份感动不会变成习惯。" },
      { text: "直接质疑TA骗钱", effects: { trust: -2, loneliness: 1 }, result: "也许你是对的，也许你太硬了。关系里的防备很难拿捏。" }
    ]
  },
  {
    id: "ae_classmate_compare",
    title: "比较心冒头",
    text: "社交之后，你忍不住比较别人的收入、房子和生活。心里有点不是滋味。",
    actions: ["social"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.15,
    effects: { shame: 1, greed: 1, mental: -1 }
  },
  {
    id: "ae_public_service_followup",
    title: "被人记住了",
    text: "你刚帮过别人，几天后对方又来问问题。你发现善意也需要边界和方法。",
    actions: ["community_antifraud", "neighborhood_watch", "family_antifraud_drill"],
    stage: ["childhood", "family_career", "midlife_asset", "elderly"],
    probability: 0.16,
    effects: { socialExp: 1, awareness: 1, fatigue: 1 }
  },

  // === Family ===
  {
    id: "ae_family_child_truth",
    title: "孩子说了实话",
    text: "你刚陪完家人，孩子犹豫半天，说自己被同学拉进了一个充值返利群。",
    actions: ["family", "child_digital_rules"],
    stage: ["family_career", "midlife_asset"],
    probability: 0.18,
    condition: function(s) { return s.lifeFlags && s.lifeFlags.has_child; },
    isChoice: true,
    options: [
      { text: "先听完，再一起处理", effects: { familyTrust: 2, awareness: 1 }, result: "孩子松了一口气。你们一起退群、举报，也补了一次重要的信任。" },
      { text: "立刻训一顿", effects: { familyTrust: -2, risk: -1 }, result: "群是退了，孩子以后可能不会第一时间告诉你了。" }
    ]
  },
  {
    id: "ae_family_parent_stubborn",
    title: "父母不服气",
    text: "你刚帮父母清理手机，父母却说你管太多：'人家群里都说是真的。'",
    actions: ["elder_phone_guard", "phone_cleanup", "learn_phone"],
    stage: ["family_career", "midlife_asset", "elderly"],
    probability: 0.2,
    isChoice: true,
    options: [
      { text: "拿真实案例慢慢讲", effects: { familyTrust: 1, awareness: 1, fatigue: 1 }, result: "讲到第三个案例，父母终于没再反驳。耐心很贵，但有用。" },
      { text: "直接退群拉黑", effects: { familyTrust: -1, risk: -1 }, result: "风险暂时少了，父母心里却觉得你不尊重TA。" },
      { text: "先放一放", effects: { risk: 1, mental: -1 }, result: "你不想吵。但那些群消息还在继续发。" }
    ]
  },
  {
    id: "ae_family_small_warmth",
    title: "家里的一点暖意",
    text: "你花时间陪了家人。没有大事发生，只是饭桌上多了一点笑声。",
    actions: ["family", "video_family"],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.14,
    effects: { familyTrust: 1, loneliness: -1, mental: 1 }
  },
  {
    id: "ae_deepfake_family_code",
    title: "一通确认电话",
    text: "你们前阵子聊过AI冒充亲友的事。不久后家人收到一条像是你发来的借钱语音，还是先给你打了电话。",
    actions: ["deepfake_drill", "family_antifraud_drill", "video_family"],
    stage: ["childhood", "family_career", "midlife_asset", "elderly"],
    probability: 0.18,
    effects: { awareness: 2, stoppedLossCount: 1, familyTrust: 1 }
  },

  // === Health / Rest / Exercise ===
  {
    id: "ae_exercise_friend",
    title: "运动搭子",
    text: "你锻炼时认识了一个经常出现的人。有人一起坚持，运动就没那么难了。",
    actions: ["exercise", "medical_check", "hospital_followup"],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.14,
    effects: { socialExp: 1, loneliness: -1, mental: 1 }
  },
  {
    id: "ae_exercise_overdo",
    title: "用力过猛",
    text: "你想把锻炼效果拉满，结果第二天浑身酸痛，连正常安排都受影响。",
    actions: ["exercise"],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.12,
    condition: function(s) { return s.fatigue >= 2; },
    effects: { fatigue: 1, mental: -1 }
  },
  {
    id: "ae_rest_recover",
    title: "休息真的有用",
    text: "你认真休息了一次。没有追求效率，没有补偿性熬夜，身体慢慢松下来。",
    actions: ["rest", "hobby"],
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.15,
    effects: { mental: 1, fatigue: -1, awareness: 1 }
  },
  {
    id: "ae_rest_scrolling",
    title: "越休越累",
    text: "你说是休息，结果一直刷手机。躺是躺了，脑子却没停。",
    actions: ["rest", "play", "stream_watch"],
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.16,
    effects: { fatigue: 1, mental: -1, risk: 1 }
  },

  // === Digital / Phone ===
  {
    id: "ae_phone_cleanup_subscription",
    title: "藏起来的自动续费",
    text: "清理手机时，你发现几个几乎不用的会员还在自动扣费。",
    actions: ["phone_cleanup", "learn_phone"],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.18,
    effects: { money: 600, awareness: 1, digitalSkill: 1 }
  },
  {
    id: "ae_learn_phone_payment_lock",
    title: "支付锁",
    text: "学手机时，你顺手打开了支付验证和转账延迟到账。操作不难，但很关键。",
    actions: ["learn_phone", "phone_cleanup", "elder_phone_guard"],
    stage: ["elderly", "midlife_asset", "family_career"],
    probability: 0.18,
    effects: { awareness: 2, digitalSkill: 1, risk: -1 }
  },
  {
    id: "ae_content_sponsor_offer",
    title: "接推广的诱惑",
    text: "你做内容号后，有商家来找你推广'高收益工具'。报价比平时高很多。",
    actions: ["content_creator", "sidejob"],
    stage: ["college", "early_career"],
    probability: 0.17,
    isChoice: true,
    options: [
      { text: "拒绝不明产品", effects: { awareness: 1, trust: 1, money: -500 }, result: "少赚了一笔，但你没有把自己的信用卖给陌生产品。" },
      { text: "接，标注广告就行", effects: { money: 3000, risk: 2, shame: 1 }, result: "钱到账很快，评论区的质疑也来得很快。" },
      { text: "要求资质和合同", effects: { awareness: 2, socialExp: 1 }, result: "对方说'这么麻烦就算了'。你笑了笑，知道自己问对了。" }
    ]
  },

  // === Childhood / Youth ===
  {
    id: "ae_play_lottery_box",
    title: "游戏抽盒子",
    text: "你刚玩完游戏，弹窗提示限时抽奖。只要再充一点，就可能出稀有皮肤。",
    actions: ["play", "stream_watch"],
    stage: ["childhood", "middle_school", "college"],
    probability: 0.2,
    isChoice: true,
    options: [
      { text: "忍住不充", effects: { awareness: 1, greed: -1 }, result: "你关掉弹窗。稀有皮肤没有来，后悔也没有来。" },
      { text: "充一点试试", effects: { money: -300, greed: 1, mental: -1 }, result: "你没抽到。系统又说'再十连概率提升'。" },
      { text: "问爸妈/朋友怎么看", effects: { familyTrust: 1, awareness: 1 }, result: "别人一提醒，你就清醒多了。" }
    ]
  },
  {
    id: "ae_chores_money_lesson",
    title: "零花钱账本",
    text: "做家务赚了点钱后，你第一次把收入和支出写下来。数字很小，但感觉很认真。",
    actions: ["chores", "school_fair"],
    stage: ["childhood"],
    probability: 0.18,
    effects: { awareness: 1, familyTrust: 1, greed: -1 }
  },
  {
    id: "ae_school_fair_counterfeit",
    title: "义卖里的假货",
    text: "校园义卖时，有人拿来一堆'正版周边'。价格很低，大家都围了过去。",
    actions: ["school_fair"],
    stage: ["childhood"],
    probability: 0.18,
    isChoice: true,
    options: [
      { text: "提醒老师看看", effects: { awareness: 1, socialExp: 1 }, result: "老师一查，果然有问题。你有点紧张，也有点骄傲。" },
      { text: "自己买一个", effects: { money: -80, greed: 1 }, result: "回家后你发现做工很差。便宜有时候只是另一种贵。" }
    ]
  },

  // === Elderly / Community ===
  {
    id: "ae_hobby_sales_circle",
    title: "兴趣班里的推销",
    text: "兴趣活动结束后，有人开始卖器材、课程和'内部名额'。气氛很熟络。",
    actions: ["hobby", "community_antifraud", "neighborhood_watch"],
    stage: ["midlife_asset", "elderly"],
    probability: 0.17,
    isChoice: true,
    options: [
      { text: "只买明确需要的东西", effects: { awareness: 1, money: -300 }, result: "你买了真正会用的东西，没有被气氛推着走。" },
      { text: "支持朋友，多买几套", effects: { money: -3000, trust: 1, risk: 1 }, result: "东西堆在家里，热情散得比包装还快。" },
      { text: "提醒大家别冲动", effects: { awareness: 1, socialExp: 1, trust: -1 }, result: "有人感谢你，也有人嫌你扫兴。你习惯了。" }
    ]
  },
  {
    id: "ae_hospital_followup_drug_offer",
    title: "病友推荐药",
    text: "复诊排队时，病友悄悄推荐一种'不用挂号也能买到的特效药'。",
    actions: ["hospital_followup", "medical_check"],
    stage: ["midlife_asset", "elderly"],
    probability: 0.16,
    isChoice: true,
    options: [
      { text: "问医生能不能用", effects: { awareness: 2 }, result: "医生听完摇头。你把病友的话留在了诊室外。" },
      { text: "买一点试试", effects: { money: -1800, risk: 2, mental: -1 }, result: "药瓶很精致，疗效很含糊。你心里越来越没底。" }
    ]
  },
  {
    id: "ae_video_family_transfer_check",
    title: "视频里的确认",
    text: "和家人视频时，TA提到最近有人冒充亲属借钱。你们顺手把转账确认流程又说了一遍。",
    actions: ["video_family", "family"],
    stage: ["elderly", "midlife_asset"],
    probability: 0.18,
    effects: { awareness: 1, familyTrust: 1, loneliness: -1 }
  },
  {
    id: "ae_neighborhood_watch_case",
    title: "邻居差点被骗",
    text: "邻里互助群里，有人说刚才差点给'客服'转保证金。大家七嘴八舌帮TA稳住了。",
    actions: ["neighborhood_watch", "community_antifraud"],
    stage: ["midlife_asset", "elderly"],
    probability: 0.18,
    effects: { awareness: 1, trust: 1, stoppedLossCount: 1 }
  },

  // === Abstract Action Echoes ===
  {
    id: "ae_study_old_margin_note",
    title: "书页边上的旧字",
    text: "学习时，你翻到以前写在书页边上的一句话。那时的你以为自己会很快变成另一个人。",
    actions: ["study", "certificate_exam", "ai_tool_learning"],
    stage: ["middle_school", "college", "early_career", "family_career"],
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "继续写一行新的", effects: { awareness: 1, mental: 1 }, result: "新字和旧字挨在一起，像两个版本的你短暂见面。" },
      { text: "合上书，不多想", effects: { mental: -1 }, result: "你没有多想，但那句话在脑子里多留了一会儿。" }
    ]
  },
  {
    id: "ae_work_empty_office",
    title: "空办公室",
    text: "你忙完抬头，办公室只剩几盏灯。那一刻你分不清自己是在努力，还是只是在惯性里发亮。",
    actions: ["work_hard", "work", "sidejob"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "收拾东西回家", effects: { fatigue: -1, mental: 1, familyTrust: 1 }, result: "工作没有做完，今天结束了。你保住了一点生活。" },
      { text: "再干一会儿", effects: { money: 1000, fatigue: 1, loneliness: 1 }, result: "进度往前挪了，夜也往前深了一点。" }
    ]
  },
  {
    id: "ae_social_aftertaste",
    title: "热闹后的余味",
    text: "社交结束后，手机安静下来。刚才那么多人说话，现在只剩你和回家的路。",
    actions: ["social", "love", "dating_app"],
    stage: ["college", "early_career", "family_career", "midlife_asset"],
    probability: 0.13,
    isChoice: true,
    options: [
      { text: "给一个人发句真心话", effects: { trust: 1, loneliness: -1 }, result: "对方回了一个很普通的表情。但普通也能让人落地。" },
      { text: "沉默回家", effects: { awareness: 1, loneliness: 1 }, result: "你没有不开心，只是热闹退潮以后，人会听见自己的脚步声。" }
    ]
  },
  {
    id: "ae_invest_line_chart_dream",
    title: "曲线变成山路",
    text: "研究投资太久后，你看着收益曲线发呆。它一会儿像机会，一会儿像悬崖边的小路。",
    actions: ["invest", "asset_checkup"],
    stage: ["early_career", "family_career", "midlife_asset"],
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "写下最大能亏多少", effects: { awareness: 2, greed: -1 }, result: "一旦写出'最多亏多少'，很多幻想就自动安静了。" },
      { text: "继续盯盘", effects: { fatigue: 1, greed: 1, mental: -1 }, result: "曲线没怎么变，你的心情倒是涨跌了好几轮。" }
    ]
  },
  {
    id: "ae_rest_strange_dream",
    title: "一个怪梦",
    text: "你休息时做了个怪梦：自己在一座没有出口的商场里找童年的书包。",
    actions: ["rest", "hobby"],
    stage: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "醒来后记下来", effects: { mental: 1, awareness: 1 }, result: "梦写出来就没那么怪了。它像一封没署名的信。" },
      { text: "翻个身忘掉", effects: { fatigue: -1 }, result: "你很快又睡着了。梦留在了枕头背面。" }
    ]
  },
  {
    id: "ae_family_table_silence",
    title: "饭桌上的停顿",
    text: "陪家人吃饭时，话题突然停住。碗筷声变得很清楚，你意识到有些关心一直没说出口。",
    actions: ["family", "video_family", "elder_phone_guard"],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.12,
    isChoice: true,
    options: [
      { text: "问一句最近怎么样", effects: { familyTrust: 1, loneliness: -1 }, result: "问题很普通，但对方真的开始说了。" },
      { text: "夹菜带过去", effects: { mental: 1 }, result: "你没有说出口。好在有些关心也能被筷子表达一点。" }
    ]
  },
  {
    id: "ae_phone_black_mirror",
    title: "黑屏里的脸",
    text: "学手机或清理手机时，屏幕忽然黑了一下。你在反光里看见自己的脸，像被这个时代截了个屏。",
    actions: ["learn_phone", "phone_cleanup", "ai_tool_learning"],
    stage: ["early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.11,
    effects: { awareness: 1, digitalSkill: 1, mental: -1 }
  },
  {
    id: "ae_exercise_city_sound",
    title: "跑步时听见城市",
    text: "运动时，你突然注意到城市的声音：车轮、风、远处的叫卖。它们一直都在，只是你很少慢下来听。",
    actions: ["exercise", "hobby"],
    stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    probability: 0.12,
    effects: { mental: 1, loneliness: -1, fatigue: -1 }
  }
];
