window.Game = window.Game || {};

(function() {
  var S = {
    all: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    student: ["middle_school", "college"],
    adult: ["college", "early_career", "family_career", "midlife_asset"],
    work: ["early_career", "family_career", "midlife_asset"],
    family: ["family_career", "midlife_asset", "elderly"]
  };

  function r(id, title, text, effects, stage, condition, probability, extra) {
    var event = {
      id: "re_drama_" + id,
      title: title,
      text: text,
      condition: condition || function() { return true; },
      probability: probability || 0.12,
      effects: effects || {},
      stage: stage || S.all
    };
    if (extra) Object.assign(event, extra);
    Game.RandomEvents.push(event);
  }

  function rc(id, title, text, options, stage, condition, probability) {
    Game.RandomEvents.push({
      id: "re_drama_" + id,
      title: title,
      text: text,
      condition: condition || function() { return true; },
      probability: probability || 0.12,
      isChoice: true,
      options: options,
      stage: stage || S.all
    });
  }

  function ae(id, title, text, actions, effects, stage, condition, probability, extra) {
    var event = {
      id: "ae_drama_" + id,
      title: title,
      text: text,
      actions: actions,
      stage: stage || S.all,
      condition: condition || null,
      probability: probability || 0.16,
      effects: effects || {}
    };
    if (extra) Object.assign(event, extra);
    Game.ActionEvents.push(event);
  }

  function aec(id, title, text, actions, options, stage, condition, probability) {
    Game.ActionEvents.push({
      id: "ae_drama_" + id,
      title: title,
      text: text,
      actions: actions,
      stage: stage || S.all,
      condition: condition || null,
      probability: probability || 0.16,
      isChoice: true,
      options: options
    });
  }

  // School years: tiny wallets can still collapse under embarrassment, comparison, and impulse.
  rc("game_skin_refund", "游戏皮肤账单", "你发现自己偷偷充的游戏皮肤已经花到一个吓人的数字。账单躺在手机里，像一张会发光的处分单。", [
    { text: "主动和家里说清楚", effects: { familyTrust: 1, shame: 1, awareness: 2, greed: -1 }, result: "家里很生气，但你们一起申请退款、改支付密码。钱没全回来，坑至少停住了。" },
    { text: "继续瞒着，借同学周转", effects: { debt: 3800, familyTrust: -3, shame: 2, risk: 2 }, setFlag: "student_wallet_collapse", result: "你用新的窟窿盖旧的窟窿。第二天上课时，你看着黑板，却一直在算钱怎么还。" },
    { text: "卖掉闲置设备补洞", effects: { money: 500, mental: -1, awareness: 1 }, result: "东西卖掉了，心里空了一块。你第一次明白虚拟消费也会变成真实重量。" }
  ], ["middle_school"], function(s) { return s.age >= 13 && s.greed >= 5; }, 0.18);

  rc("class_trip_money_lost", "研学路上钱不见了", "班级研学途中，你装在外套口袋里的钱不见了。老师在点名，同学在催，你突然不知道该先找钱还是先保面子。", [
    { text: "马上告诉老师", effects: { awareness: 1, shame: -1, trust: 1, money: -80 }, result: "老师帮你调监控、联系家长。钱只追回一部分，但你没有让慌乱扩大。" },
    { text: "自己硬扛，借钱吃饭", effects: { debt: 300, shame: 1, mental: -1 }, result: "你借了几笔小钱，回家后才发现小账也会咬人。" },
    { text: "怀疑同学，直接吵起来", effects: { socialExp: -1, trust: -2, shame: 2 }, result: "钱没找到，关系先裂了。后来发现可能只是掉在车座缝里。" }
  ], ["middle_school"], null, 0.16);

  rc("phone_screen_crack", "手机屏幕碎了", "手机从课桌边滑下去，屏幕裂成一张细密的网。它还能亮，但每次点开都像在提醒你：意外很贵。", [
    { text: "换普通屏，先能用", effects: { money: -260, awareness: 1 }, result: "不完美，但够用。你把手机壳也装上了。" },
    { text: "换原装屏", effects: { money: -880, happiness: 1, familyTrust: -1 }, result: "屏幕焕然一新，钱包也干净得很彻底。" },
    { text: "先不修，继续用", effects: { risk: 1, shame: 1 }, result: "裂纹每天都在你眼前。省钱是真的，不方便也是真的。" }
  ], ["middle_school", "college"], function(s) { return s.age >= 13; }, 0.15);

  rc("training_fee_pressure", "突然冒出来的培训费", "群里都在说某个冲刺班很有用，名额有限，今晚截止。你知道焦虑正在替别人推销。", [
    { text: "查老师资质和合同", effects: { awareness: 2, familyTrust: 1 }, result: "你发现宣传和合同完全不是一回事。省下的钱比课程更有用。" },
    { text: "咬牙报名", effects: { money: -2600, fatigue: 1, shame: 1 }, result: "课上得很满，但效果没有宣传那么神。你学到最多的是看合同。" },
    { text: "分期报名", effects: { debt: 5200, greed: 1, risk: 2, mental: -1 }, setFlag: "student_wallet_collapse", result: "每月还款提醒比老师更准时。你还没升学，先学会了负债。" }
  ], ["middle_school"], function(s) { return s.age >= 15 && s.age <= 18; }, 0.16);

  r("scholarship_public_notice", "助学金公示", "班里公示助学金名单。你看到自己的名字，松了一口气，也知道这笔钱不能乱花。", { money: 1200, familyTrust: 1, awareness: 1, shame: -1 }, ["middle_school", "college"], function(s) { return s.money <= 2000 || s.familyTrust >= 12; }, 0.12);

  r("middle_school_wallet_break", "中学钱包崩盘", "几笔分期、借款和瞒着家里的消费叠在一起，终于超过了你能处理的范围。你的人生被迫提前进入清算。", { mental: -3, familyTrust: -3, shame: 3 }, ["middle_school"], function(s) { return s.debt >= 4500 && s.familyTrust <= 6 && s.age <= 18; }, 0.2, { setFlag: "middle_school_bankrupt" });

  // College: windfalls, traps, roommates, and the first adult-sized bills.
  r("college_lottery_jackpot", "录取路上的一张彩票", "去学校报到的路上，你顺手买了一张十元公益彩票。几天后，号码对上了。世界突然把一条完全不同的路塞进你手里。", { money: 500000, happiness: 6, greed: 2, awareness: 1 }, ["college"], function(s) { return s.age >= 19 && s.age <= 24 && !s.lifeFlags.college_lottery_jackpot && Game.random() < 0.012; }, 0.02, { setFlag: "college_lottery_jackpot" });

  r("college_small_lottery", "小奖到账", "你买饮料顺手扫码抽奖，中了三百块。好运很轻，轻到你差点把它误认为规律。", { money: 300, happiness: 1, greed: 1 }, ["college"], function(s) { return s.age >= 19 && s.age <= 24; }, 0.08);

  rc("roommate_laptop_water", "室友电脑进水", "宿舍里一杯水倒了，室友的电脑黑屏。没人能完全说清是谁碰到的杯子，空气像拧紧的毛巾。", [
    { text: "一起协商维修费", effects: { money: -1200, socialExp: 1, trust: 1 }, result: "你们把责任和费用摊开说。尴尬没有消失，但没有变成仇。" },
    { text: "先认下来赔一台", effects: { money: -4500, shame: -1, trust: 1 }, result: "你赔得很体面，也疼得很具体。这个月生活费直接塌了。" },
    { text: "拒不承认", effects: { trust: -2, loneliness: 2, shame: 1 }, result: "钱暂时保住了，宿舍关系开始低温运行。" }
  ], ["college"], null, 0.16);

  rc("campus_love_budget", "恋爱纪念日预算", "纪念日快到了，社交平台上全是鲜花、餐厅和礼物。你很想认真对待，也不想被消费模板绑架。", [
    { text: "亲手准备低预算惊喜", effects: { money: -120, happiness: 2, trust: 1, awareness: 1 }, result: "东西不贵，但很用心。对方笑了，你也松了口气。" },
    { text: "订网红餐厅和礼物", effects: { money: -1600, happiness: 2, greed: 1 }, result: "照片很好看，账单也很醒目。快乐需要回宿舍后慢慢还。" },
    { text: "装忘了", effects: { money: 0, trust: -2, loneliness: 1 }, result: "钱没花出去，关系里的小裂缝却开始收费。" }
  ], ["college", "early_career"], function(s) { return s.socialExp >= 5 || s.lifeFlags.married; }, 0.14);

  rc("internship_deposit", "实习要押金", "一个实习机会看起来很体面，对方却说入职前要交服装押金、培训费和保密保证金。", [
    { text: "拒绝并举报", effects: { awareness: 2, reportedCount: 1, socialExp: 1 }, result: "正规实习不会靠押金筛人。你把截图发给辅导员，后来群里撤掉了那条招聘。" },
    { text: "交一半占名额", effects: { money: -1500, shame: 1, risk: 2 }, result: "对方收钱后回复越来越慢。你意识到自己买到的不是机会，是教训。" },
    { text: "找学长核实", effects: { awareness: 1, socialExp: 1 }, result: "学长说这个公司换过好几个名字。你退出来时手心有汗。" }
  ], ["college"], function(s) { return s.age >= 20; }, 0.17);

  r("young_debt_collapse", "年轻时债务失控", "花呗、培训贷、朋友借款和生活费缺口挤到同一天。你的手机不断弹出提醒，像一场没有铃声的考试。", { mental: -3, shame: 3, risk: 2 }, ["college", "early_career"], function(s) { return s.age <= 30 && s.debt >= 30000 && s.mental <= 8; }, 0.18, { setFlag: "young_debt_collapse" });

  // Everyday wallet blockers: the money is guarded, then life knocks on the door.
  rc("rent_deposit_dispute", "房东不退押金", "退租那天，房东拿着一张清单说墙面、地板、门锁都有问题，押金先不退。", [
    { text: "拿入住照片和合同沟通", effects: { awareness: 2, money: -300, fatigue: 1 }, result: "你有证据，追回了大半押金。拍照留证这件事终于回本了。" },
    { text: "嫌麻烦算了", effects: { money: -2000, shame: 1, mental: -1 }, result: "你走得很快，心里却一直慢不下来。" },
    { text: "找社区调解", effects: { money: -600, socialExp: 1, awareness: 1, fatigue: 1 }, result: "流程有点烦，但比硬吵有效。你学会了用规则保护钱包。" }
  ], ["college", "early_career", "family_career"], function(s) { return s.age >= 20 && s.age <= 45; }, 0.15);

  rc("relative_borrow_for_house", "亲戚买房借钱", "亲戚说首付差一点，开口向你借钱。饭桌上的目光都落在你身上，亲情和余额开始拔河。", [
    { text: "写借条，量力借小额", effects: { money: -3000, familyTrust: 1, awareness: 1 }, result: "你帮了忙，也把边界写清楚。好人不等于糊涂人。" },
    { text: "不好意思，借一大笔", effects: { money: -20000, familyTrust: 1, mental: -1 }, result: "你保住了场面，丢掉了安全垫。夜里你开始反复看余额。" },
    { text: "坦诚拒绝", effects: { familyTrust: -1, shame: 1, awareness: 1 }, result: "话不好听，但是真话。你知道自己的生活也需要被负责。" }
  ], S.adult, function(s) { return s.age >= 25 && s.money >= 8000; }, 0.14);

  rc("emergency_room_night", "半夜急诊", "半夜突然疼得睡不着。急诊大厅灯火通明，每个人都在用钱包和耐心排队。", [
    { text: "去急诊检查", effects: { money: -900, health: 2, fatigue: 1, medicalSpend: 900, awareness: 1 }, result: "检查结果问题不大。钱花了，但恐惧落地了。" },
    { text: "先忍到天亮", effects: { health: -2, fatigue: 2, mental: -1 }, result: "你省下挂号费，也把风险留到身体里过夜。" },
    { text: "线上问诊后处理", effects: { money: -120, health: 1, digitalSkill: 1, medicalSpend: 120 }, result: "不替代医院，但帮你判断了轻重缓急。" }
  ], S.all, function(s) { return s.fatigue >= 4 || s.health <= 10; }, 0.17);

  rc("wedding_month", "一个月三场婚礼", "这个月连着三场婚礼。请帖像雪片一样飞来，每一张都温柔地写着一个数字。", [
    { text: "都去，关系要紧", effects: { money: -2400, socialExp: 1, trust: 1, fatigue: 1 }, result: "你跑完三场，祝福是真，钱包空也是真。" },
    { text: "只去最亲近的", effects: { money: -800, awareness: 1, socialExp: 1 }, result: "你认真解释，关系没有想象中脆弱。" },
    { text: "人不到礼到", effects: { money: -1200, fatigue: -1, trust: 1 }, result: "你保留了体力，也没有让礼数断掉。" }
  ], ["college", "early_career", "family_career"], function(s) { return s.age >= 22 && s.socialExp >= 5; }, 0.14);

  rc("short_drama_cliffhanger", "短剧卡在最刺激一集", "短剧正好卡在反转处，按钮写着'9.9解锁全集'。你知道这是设计好的，但手指已经悬在屏幕上。", [
    { text: "关掉，明天再说", effects: { awareness: 1, fatigue: -1, greed: -1 }, result: "第二天你发现也没那么想看。冲动过期了。" },
    { text: "充9.9看完", effects: { money: -10, happiness: 1, greed: 1 }, result: "看完了，也就那样。便宜的钩子也是钩子。" },
    { text: "连续解锁到凌晨", effects: { money: -198, fatigue: 2, health: -1, greed: 2 }, result: "剧情一路反转，你的作息和钱包一路下坡。" }
  ], ["middle_school", "college", "early_career", "family_career", "midlife_asset"], function(s) { return s.hobbyTags.indexOf("short_drama") !== -1 || s.age >= 13; }, 0.16);

  rc("stock_limit_down", "持仓跌停", "你买的股票突然跌停，群里从热闹变成安静。卖不出去的那一刻，你才知道流动性也是钱。", [
    { text: "承认风险，减仓学习", effects: { money: -3000, awareness: 2, greed: -1, mental: -1 }, stateEffects: { stockPosition: -1 }, result: "你亏了钱，但没有把错误扩大成信仰。" },
    { text: "继续补仓摊平", effects: { money: -8000, greed: 2, risk: 2, fatigue: 1 }, stateEffects: { stockPosition: 1 }, result: "你把不服气也投了进去。账户开始替情绪付费。" },
    { text: "卸载软件不看", effects: { mental: -1, shame: 1 }, result: "数字不会因为你不看就消失，但你终于能睡一会儿。" }
  ], S.adult, function(s) { return s.stockPosition > 0; }, 0.16);

  rc("antique_family_story", "传家宝估价", "家里翻出一件'祖上传下来的东西'，亲戚越说越值钱。你被故事推着，差点把现金拿去'补配证书'。", [
    { text: "找正规机构鉴定", effects: { money: -500, awareness: 2, familyTrust: 1 }, result: "东西普通，故事珍贵。你们没有再被证书费牵着走。" },
    { text: "交钱办证书", effects: { money: -5000, greed: 2, shame: 1, risk: 1 }, result: "证书很漂亮，价值很空。你买到的是一张自我安慰。" },
    { text: "当家庭纪念留下", effects: { familyTrust: 1, mental: 1, greed: -1 }, result: "不卖，也不幻想。它回到柜子里，继续当一件有温度的旧物。" }
  ], S.family, function(s) { return s.age >= 40; }, 0.14);

  rc("ufo_collectors_offer", "奇怪收藏家出价", "有人说你拍到的夜空光点很稀有，愿意高价买原片，但要你先交一笔'版权认证费'。", [
    { text: "不交钱，保留原片", effects: { awareness: 2, digitalSkill: 1 }, result: "真正买版权的人不会先让卖家交钱。你的宇宙浪漫没有变成钱包漏洞。" },
    { text: "交认证费试试", effects: { money: -1200, greed: 1, shame: 1, risk: 2 }, result: "对方消失得像夜空里的光点。小概率奇遇，也可能接上高概率套路。" }
  ], S.adult, function(s) { return s.hobbyTags.indexOf("astronomy") !== -1 || s.lifeFlags.seen_ufo; }, 0.05);

  // Action follow-ups that make even sensible actions produce drama.
  aec("save_money_interrupted", "刚想存钱，账单来了", "你刚下定决心守住钱包，手机就弹出一串待缴费：水电、话费、会员、维修、班费。", ["emergency_fund", "asset_checkup", "mortgage_calculation"], [
    { text: "逐项取消不必要支出", effects: { awareness: 2, fatigue: 1, money: -300 }, result: "还是花了钱，但你剪掉了几个长期漏水的小口。" },
    { text: "一键全付，眼不见心不烦", effects: { money: -1800, mental: -1 }, result: "账单清空了，余额也轻得像刚洗过。" },
    { text: "拖到下个月", effects: { debt: 1200, shame: 1, risk: 1 }, result: "延期不是消失，只是把小账单养大一点。" }
  ], S.adult, null, 0.2);

  ae("exercise_injury_bill", "运动伤账单", "你本来是为了健康，结果膝盖/肩膀先抗议了。康复、护具和检查一项项跳出来。", ["exercise", "basketball", "badminton", "swimming", "martial_arts"], { money: -480, health: -1, medicalSpend: 480, awareness: 1 }, S.all, function(s) { return s.age >= 13 && s.fatigue >= 3; }, 0.18);

  aec("social_face_bill", "面子账单", "社交局散场前，有人轻轻一句'这次你来安排吧'。你突然站在面子和预算中间。", ["social", "student_union", "dating_dinner"], [
    { text: "提前说好预算", effects: { awareness: 1, socialExp: 1, money: -260 }, result: "有点不好意思，但大家接受了。成年人的体面也可以明码标价。" },
    { text: "硬着头皮买单", effects: { money: -1800, shame: -1, mental: -1 }, result: "当晚很热闹，回家后余额很安静。" },
    { text: "找理由先走", effects: { money: -80, trust: -1, loneliness: 1 }, result: "钱保住了，关系里的温度降了一点。" }
  ], ["college", "early_career", "family_career"], null, 0.18);

  aec("parttime_wage_delay", "兼职工资拖了", "你做完兼职，对方说财务流程慢，下周再结。生活费却不会等流程。", ["parttime", "internship", "sidejob", "content_creator"], [
    { text: "留证据催款", effects: { awareness: 2, socialExp: 1, fatigue: 1 }, result: "你把聊天、工时和约定整理好。钱晚点来，但你没有只靠求情。" },
    { text: "先借钱过渡", effects: { debt: 1000, mental: -1 }, result: "饭能吃上，债也记上了。" },
    { text: "忍着不说", effects: { money: -600, shame: 1, trust: -1 }, result: "你省了一次冲突，也让对方省了一次守信。" }
  ], ["middle_school", "college", "early_career", "family_career"], null, 0.2);
})();
