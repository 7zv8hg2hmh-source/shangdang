window.Game = window.Game || {};

Game.educationScore = function(s) {
  var studyCount = (s.actionHistory || []).filter(function(a) {
    return ["study", "contest", "ai_homework", "certificate_exam", "library_study", "gaokao_review", "skills_training"].indexOf(a.action) !== -1;
  }).length;
  var score = s.awareness + s.digitalSkill + Math.floor(s.mental / 2) + Math.floor(s.familyTrust / 3) + Math.min(8, studyCount);
  score += Math.floor(s.socialExp / 4);
  score -= Math.floor(s.fatigue / 2);
  score -= Math.floor(s.shame / 3);
  return score;
};

// Major life decisions that appear at certain ages / conditions
Game.LifeDecisions = [
  {
    id: "zhongkao_path",
    title: "中考分流，下一步怎么走？",
    triggerAge: 15,
    condition: function(s) { return !s.lifeFlags.zhongkao_decided; },
    text: "中考成绩出来了。班主任说，路不止一条：普通高中、职业学校、五年一贯制，每条路都需要认真走。家里希望你继续读书，也尊重你的实际情况。",
    options: [
      {
        text: "进入重点高中，继续冲刺高考",
        condition: function(s) { return Game.educationScore(s) >= 18 && s.familyTrust >= 6; },
        effects: { awareness: 2, digitalSkill: 1, familyTrust: 1, fatigue: 1 },
        result: "你进了重点高中。节奏很快，压力也大，但身边同学都在往前跑。你知道这不是终点，只是更长的一段上坡。",
        flags: ["high_school_key", "education_high_school"]
      },
      {
        text: "进入普通高中，稳扎稳打",
        condition: function(s) { return Game.educationScore(s) >= 12; },
        effects: { awareness: 1, digitalSkill: 1, mental: 1 },
        result: "你进了普通高中。没有那么耀眼，但日子扎实。老师说，三年时间足够改变很多事。",
        flags: ["high_school_regular", "education_high_school"]
      },
      {
        text: "读中职/技校，学一门实用技能",
        effects: { socialExp: 2, money: -1000, awareness: 1 },
        result: "你选择了中职/技校。实训课比想象中辛苦，师傅常说：手艺不骗人，偷懒也不骗人。",
        flags: ["vocational_school", "education_vocational"]
      },
      {
        text: "五年一贯制高职，早一点确定方向",
        condition: function(s) { return Game.educationScore(s) >= 10 && s.digitalSkill >= 4; },
        effects: { socialExp: 1, digitalSkill: 1, awareness: 1, money: -1500 },
        result: "你选了五年一贯制高职。路径更早确定，也更考验自律。你开始学着把兴趣变成可以吃饭的本事。",
        flags: ["five_year_college", "education_vocational"]
      },
      {
        text: "暂时不读了，先出去打零工",
        condition: function(s) { return Game.educationScore(s) < 10 && (s.familyTrust <= 5 || s.mental <= 8); },
        effects: { money: 2000, socialExp: 2, awareness: -1, shame: 1, risk: 1 },
        result: "你离开了学校。挣钱来得更早，辛苦也来得更早。后来你慢慢明白，劳动光荣，但过早失去学习机会，代价也很实在。",
        flags: ["early_work_after_middle_school", "education_dropout"]
      }
    ],
    setFlag: "zhongkao_decided"
  },
  {
    id: "college_choice",
    title: "高考结束，录取结果出来了",
    triggerAge: 18,
    condition: function(s) { return !s.lifeFlags.education_decided && !s.lifeFlags.college_decided && !s.lifeFlags.education_dropout; },
    text: "高考成绩和志愿结果陆续出来。分数、家庭条件、专业兴趣、城市选择都摆在桌面上。无论去哪，接下来都要靠自己把路走实。",
    options: [
      {
        text: "被985高校录取，去更大的平台看看",
        condition: function(s) { return Game.educationScore(s) >= 30 && s.lifeFlags.high_school_key; },
        effects: { money: -9000, awareness: 3, digitalSkill: 2, socialExp: 1, fatigue: 1 },
        result: "你收到了985高校录取通知书。家里把通知书看了好几遍。你知道平台很重要，但更重要的是别把平台当终点。",
        flags: ["college_985", "college_211", "college_1ben", "college_bachelor"]
      },
      {
        text: "被211高校录取，稳稳向前",
        condition: function(s) { return Game.educationScore(s) >= 26; },
        effects: { money: -8000, awareness: 2, digitalSkill: 2, socialExp: 1 },
        result: "你去了211高校。城市、同学、课程都打开了新窗口。你开始明白，视野也是一种资源。",
        flags: ["college_211", "college_1ben", "college_bachelor"]
      },
      {
        text: "上一所一本大学，认真选专业",
        condition: function(s) { return Game.educationScore(s) >= 21; },
        effects: { money: -6000, awareness: 2, digitalSkill: 1 },
        result: "你去了一本大学。学校不完美，但老师、图书馆、社团和同学都是真的机会。",
        flags: ["college_1ben", "college_bachelor"]
      },
      {
        text: "读普通本科，四年好好积累",
        condition: function(s) { return Game.educationScore(s) >= 16; },
        effects: { money: -5000, awareness: 1, digitalSkill: 1, socialExp: 1 },
        result: "你进了普通本科。没有光环，但也没有封顶。你知道大学不是自动改变命运的机器，得自己动手。",
        flags: ["college_bachelor"]
      },
      {
        text: "读高职专科，把技能学扎实",
        condition: function(s) { return Game.educationScore(s) >= 9 || s.lifeFlags.vocational_school || s.lifeFlags.five_year_college; },
        effects: { money: -3500, socialExp: 2, awareness: 1 },
        result: "你选了高职专科。实训、证书、实习排得很满。你不再只问学校名气，也开始问自己能解决什么问题。",
        flags: ["college_zhuanke"]
      },
      {
        text: "复读一年，再给自己一次机会",
        condition: function(s) { return Game.educationScore(s) >= 13 && s.familyTrust >= 6 && s.mental >= 8; },
        effects: { money: -4000, awareness: 2, fatigue: 2, mental: -1 },
        result: "你选择复读。那一年很苦，但你不是逃避，而是在为下一次认真准备。",
        flags: ["gaokao_repeat"]
      },
      {
        text: "先就业，再通过成考/自考继续学",
        condition: function(s) { return Game.educationScore(s) < 16 || s.money <= 2000; },
        effects: { money: 4000, socialExp: 2, awareness: 1, fatigue: 1 },
        result: "你先去工作，也给自己留了继续学习的口子。路绕了一点，但只要还学，就没有完全停下。",
        flags: ["work_then_adult_education"]
      },
      {
        text: "不继续读了，直接打工",
        condition: function(s) { return Game.educationScore(s) < 12 && s.familyTrust <= 6; },
        effects: { money: 6000, socialExp: 2, awareness: -1, risk: 1, shame: 1 },
        result: "你直接进入社会。挣钱和压力一起来。你慢慢知道，劳动值得尊重，但学习机会也要尽量给自己留住。",
        flags: ["no_college", "education_dropout"]
      }
    ],
    setFlag: "education_decided"
  },
  {
    id: "repeat_gaokao_result",
    title: "复读这一年，结果出来了",
    triggerAge: 19,
    condition: function(s) { return s.lifeFlags.gaokao_repeat && !s.lifeFlags.repeat_result_decided; },
    text: "复读这一年，你比以前更清楚自己为什么坐在教室里。成绩出来后，路还是要自己选。",
    options: [
      {
        text: "成绩明显提升，去一本大学",
        condition: function(s) { return Game.educationScore(s) >= 22; },
        effects: { money: -6000, awareness: 2, digitalSkill: 1, mental: 1 },
        result: "这一年没有白熬。你去了更理想的学校，也更懂得珍惜稳定学习的机会。",
        flags: ["college_1ben", "college_bachelor"]
      },
      {
        text: "去普通本科，不再和自己较劲",
        condition: function(s) { return Game.educationScore(s) >= 16; },
        effects: { money: -5000, awareness: 1, socialExp: 1, mental: 1 },
        result: "你接受了这个结果。不是所有努力都通向传奇，但它会让你更踏实地走下一段。",
        flags: ["college_bachelor"]
      },
      {
        text: "读高职专科，尽快把技能练出来",
        condition: function(s) { return Game.educationScore(s) >= 10; },
        effects: { money: -3000, socialExp: 2, awareness: 1 },
        result: "你换了方向，把注意力放到技能和就业上。路不一样，但认真走也能走出样子。",
        flags: ["college_zhuanke"]
      },
      {
        text: "结束复读，先就业再继续学习",
        effects: { money: 5000, socialExp: 2, awareness: 1, fatigue: 1 },
        result: "你不想再耗在同一张卷子上。你去工作，也把继续学习的念头留在心里。",
        flags: ["work_then_adult_education"]
      }
    ],
    setFlag: "repeat_result_decided"
  },
  {
    id: "first_love",
    title: "有人对你表白了",
    triggerAge: 20,
    minAge: 18, maxAge: 28,
    condition: function(s) { return !s.lifeFlags.in_relationship && s.socialExp >= 4; },
    text: "有个人对你挺好的，经常约你出去，昨天正式跟你表白了。你心里其实也有点感觉。",
    options: [
      { text: "答应，试试看", effects: { loneliness: -3, mental: 1 }, result: "你谈恋爱了。生活突然变得有色彩了——虽然每个月多了不少开销。", flag: "in_relationship" },
      { text: "拒绝，现在不想谈", effects: { loneliness: 1, awareness: 1 }, result: "你觉得现在不是时候。对方很失落，但你觉得这是正确的选择。" },
      { text: "暧昧着，不确定关系", effects: { socialExp: 1, loneliness: -1 }, result: "你们保持着暧昧的距离。说不清是什么关系，但确实不孤单了。" }
    ],
    setFlag: "love_decided_once"
  },
  {
    id: "career_start",
    title: "第一份长期职业怎么选？",
    triggerAge: 22,
    minAge: 18, maxAge: 30,
    condition: function(s) { return !s.careerId && (s.lifeFlags.education_decided || s.lifeFlags.repeat_result_decided || s.lifeFlags.work_then_adult_education || s.lifeFlags.education_dropout || s.age >= 22); },
    text: "你开始认真面对职业选择。收入、稳定、成长、尊严、家庭期待都挤在一张桌上。第一份职业未必决定一生，但会影响你的收入曲线和风险暴露。",
    options: [
      {
        text: "进技术/产品岗，跟着新产业往前跑",
        condition: function(s) { return s.digitalSkill >= 8 || s.lifeFlags.college_985 || s.lifeFlags.college_211 || s.lifeFlags.college_bachelor; },
        effects: { money: 3000, digitalSkill: 1, fatigue: 1, risk: 1 },
        result: "你进入技术/产品岗。机会不少，迭代很快。收入上限高，但也得持续学习。",
        setCareer: "tech_product",
        careerLevel: 1,
        flags: ["career_tech_product"]
      },
      {
        text: "做职场白领，先在公司体系里站稳",
        condition: function(s) { return s.lifeFlags.college_bachelor || s.lifeFlags.college_1ben || s.lifeFlags.college_211 || s.lifeFlags.college_985 || s.socialExp >= 6; },
        effects: { money: 2500, socialExp: 1, awareness: 1 },
        result: "你进了公司。制度、流程、KPI都来了。你开始学会在组织里做事。",
        setCareer: "office_staff",
        flags: ["career_office_staff"]
      },
      {
        text: "走公共服务岗位，稳定踏实",
        condition: function(s) { return s.awareness >= 8 && s.shame <= 8; },
        effects: { money: 1500, trust: 1, awareness: 1 },
        result: "你选择公共服务相关岗位。收入不算激进，但规则清晰，稳定感强。",
        setCareer: "public_service",
        flags: ["career_public_service"]
      },
      {
        text: "从事教育/医疗相关工作",
        condition: function(s) { return s.awareness >= 9 || s.lifeFlags.college_bachelor || s.lifeFlags.college_1ben; },
        effects: { money: 2000, trust: 1, fatigue: 1 },
        result: "你进入教育/医疗相关行业。它需要专业，也需要耐心。被需要是一种价值，也是一种压力。",
        setCareer: "education_health",
        flags: ["career_education_health"]
      },
      {
        text: "做技术工人，靠手艺吃饭",
        condition: function(s) { return s.lifeFlags.vocational_school || s.lifeFlags.college_zhuanke || s.digitalSkill >= 5; },
        effects: { money: 2200, digitalSkill: 1, socialExp: 1 },
        result: "你走上技能岗位。设备、工单、现场经验都会变成你的饭碗。",
        setCareer: "skilled_worker",
        flags: ["career_skilled_worker"]
      },
      {
        text: "做销售/个体经营，收入靠自己闯",
        condition: function(s) { return s.socialExp >= 6 || s.greed >= 6; },
        effects: { money: 3000, socialExp: 2, risk: 1 },
        result: "你选择销售或个体经营。上限和波动都摆在眼前，识人和守信变得特别重要。",
        setCareer: "sales_business",
        flags: ["career_sales_business"]
      },
      {
        text: "做内容/传媒，追着流量跑",
        condition: function(s) { return s.digitalSkill >= 6 && s.socialExp >= 5; },
        effects: { money: 1800, digitalSkill: 1, greed: 1, risk: 1 },
        result: "你进入内容/传媒行业。选题、剪辑、热点、甲方都很现实，流量有光，也有噪音。",
        setCareer: "media_creator",
        flags: ["career_media_creator"]
      },
      {
        text: "灵活就业，先把眼前日子撑起来",
        effects: { money: 2000, socialExp: 1, risk: 1, fatigue: 1 },
        result: "你选择灵活就业。自由是真的，不稳定也是真的。你得自己管理收入、保险和节奏。",
        setCareer: "flexible_work",
        flags: ["career_flexible_work"]
      }
    ],
    setFlag: "career_started"
  },
  {
    id: "marriage",
    title: "要不要结婚？",
    triggerAge: 28,
    minAge: 25, maxAge: 38,
    condition: function(s) { return s.lifeFlags.in_relationship && !s.lifeFlags.married && s.socialExp >= 6; },
    text: "你和另一半在一起好几年了。双方父母开始催婚。你们也聊过这事，但一想到婚礼、房子、彩礼……",
    options: [
      { text: "结婚，组建家庭", effects: { money: -15000, familyTrust: 3, loneliness: -3, mental: 1 }, result: "你结婚了。婚礼不算奢华但很温馨。你的人生进入了一个新阶段。", flag: "married" },
      { text: "再等等，不着急", effects: { loneliness: 1, familyTrust: -1 }, result: "你说再等等。父母有点失望，但也没说什么。另一半的态度有些微妙。" },
      { text: "分手，不想被绑住", effects: { loneliness: 3, mental: -1, familyTrust: -1 }, result: "你选择了自由，但自由的另一面是空荡荡的房间和没人说话的夜晚。", clearFlag: "in_relationship" }
    ],
    setFlag: "marriage_decided"
  },
  {
    id: "buy_house",
    title: "要不要买房？",
    triggerAge: 28,
    minAge: 25, maxAge: 45,
    condition: function(s) { return !s.lifeFlags.has_house && s.money >= 30000; },
    text: "房价一直在涨，身边的同事都开始看房了。你手里有点存款，但买房意味着背上几十年的贷款。中介说'再不买就晚了'。",
    options: [
      { text: "咬牙买了，首付掏空积蓄", effects: { money: -40000, debt: 30000, mental: -1, familyTrust: 1, shame: -1 }, result: "你买了人生第一套房。签字的时候手在抖。但至少有个家了。", flag: "has_house" },
      { text: "先不买，继续攒钱", effects: { money: 0, greed: 1 }, result: "你决定再等等。也许房价会降呢。也许不会。" },
      { text: "回老家买，便宜点", effects: { money: -15000, debt: 5000, familyTrust: 2 }, result: "你在老家买了房。虽然自己住不上，但爸妈很高兴。", flag: "has_house" }
    ],
    setFlag: "house_decided"
  },
  {
    id: "buy_car",
    title: "要不要买辆车？",
    triggerAge: 30,
    minAge: 25, maxAge: 50,
    condition: function(s) { return !s.lifeFlags.has_car && s.money >= 20000; },
    text: "上班通勤太累了，挤地铁挤得怀疑人生。同事开着车来上班，你有点心动。手里的钱买个入门款勉强够。",
    options: [
      { text: "买！生活品质要提升", effects: { money: -30000, mental: 1, shame: -1, socialExp: 1 }, result: "你有车了！第一次坐进驾驶座的感觉真好。虽然油钱、保险、停车费都不便宜。", flag: "has_car" },
      { text: "买个二手的先凑合", effects: { money: -8000, mental: 1 }, result: "你买了辆二手车。虽然有点旧，但终于不用挤地铁了。", flag: "has_car" },
      { text: "不买，省钱要紧", effects: { greed: -1, mental: -1 }, result: "你继续挤地铁。每天早起一小时，钱省下来了，但人更累了。" }
    ],
    setFlag: "car_decided"
  },
  {
    id: "have_baby",
    title: "要不要生孩子？",
    triggerAge: 30,
    minAge: 26, maxAge: 40,
    condition: function(s) { return s.lifeFlags.married && !s.lifeFlags.has_child; },
    text: "结婚后，父母催孩子催得越来越紧了。另一半也开始聊这个话题。你的事业正在上升期，但年龄也不小了。",
    options: [
      { text: "生，顺其自然", effects: { money: -10000, familyTrust: 3, loneliness: -2, mental: -1 }, result: "孩子来了。你的生活被彻底改写——睡不好觉，钱不够花，但看到那张小脸的时候，什么都值了。", flag: "has_child" },
      { text: "再缓缓，还没准备好", effects: { familyTrust: -1, loneliness: 1 }, result: "你说再等等。妈妈在电话那头沉默了很久。" },
      { text: "不生，享受二人世界", effects: { familyTrust: -2, mental: 1, money: 5000 }, result: "你们决定做丁克。父母不理解，但你觉得人生是自己的。", flag: "dink" }
    ],
    setFlag: "child_decided"
  },
  {
    id: "second_child",
    title: "要不要生二胎？",
    triggerAge: 35,
    minAge: 32, maxAge: 42,
    condition: function(s) { return s.lifeFlags.has_child && !s.lifeFlags.second_child_decided; },
    text: "老大上幼儿园了，身边好多朋友都在生二胎。你妈说'一个太孤单了'。你和另一半算了算经济账，有点吃力。",
    options: [
      { text: "生！给老大一个伴", effects: { money: -15000, familyTrust: 2, loneliness: -1, mental: -2 }, result: "二宝来了。家里更热闹了，钱更紧了，你和另一半都累得不行。但看两个孩子一起玩的时候，你觉得值。", flag: "has_second_child" },
      { text: "不生了，一个够了", effects: { mental: 1 }, result: "你觉得把所有的爱给一个孩子就好。父母虽然唠叨，但也慢慢接受了。" }
    ],
    setFlag: "second_child_decided"
  },
  {
    id: "sell_house",
    title: "要不要卖房？",
    triggerAge: 45,
    minAge: 35, maxAge: 60,
    condition: function(s) { return s.lifeFlags.has_house && !s.lifeFlags.sold_house && (s.debt >= 30000 || s.money <= 5000); },
    text: "经济压力越来越大。你的房子涨了不少，有人出高价要买。卖了能解决很多问题，但也意味着没有自己的房子了。",
    options: [
      { text: "卖了，先渡过难关", effects: { money: 80000, debt: -30000, mental: 1, shame: 1 }, result: "你卖了房子。银行卡上的数字让你松了口气，但搬家那天你站在空房间里站了很久。", clearFlag: "has_house" },
      { text: "不卖，咬牙撑着", effects: { mental: -1, debt: 5000 }, result: "你选择留着房子。每个月还贷的时候都在心里算账，但至少还有个家。" }
    ],
    setFlag: "sold_house"
  },
  {
    id: "change_car",
    title: "要不要换辆车？",
    triggerAge: 40,
    minAge: 35, maxAge: 55,
    condition: function(s) { return s.lifeFlags.has_car && !s.lifeFlags.changed_car && s.money >= 50000; },
    text: "你的车开了好几年了，毛病越来越多。4S店说修不如换。你的同事最近换了辆BBA，你有点心动。",
    options: [
      { text: "换辆好的，犒赏自己", effects: { money: -50000, shame: -2, greed: 1, mental: 1 }, result: "新车开出4S店的那一刻，你觉得这些年没白干。虽然余额少了不少。" },
      { text: "换辆经济实惠的", effects: { money: -15000, mental: 1 }, result: "你换了辆性价比高的车。够用就行，没必要打肿脸充胖子。" },
      { text: "修修继续开", effects: { money: -3000 }, result: "你去修了修，又能开了。虽然有点旧，但省下的钱是实在的。" }
    ],
    setFlag: "changed_car"
  },
  {
    id: "retirement_plan",
    title: "退休了，怎么过？",
    triggerAge: 60,
    condition: function(s) { return !s.lifeFlags.retirement_decided; },
    text: "你正式退休了。退休金到账，突然多出了大把时间。你得想想接下来的日子怎么过。",
    options: [
      { text: "帮子女带孩子", effects: { familyTrust: 3, loneliness: -3, mental: -1 }, result: "你成了全职带娃。虽然累，但每天都很充实，孙子的笑声就是最好的退休金。" },
      { text: "发展兴趣爱好", effects: { mental: 2, loneliness: -2, socialExp: 1, money: -2000 }, result: "你报了老年大学，学书法、学跳舞。认识了一帮新朋友，退休生活比想象中精彩。" },
      { text: "安安静静过日子", effects: { loneliness: 2, mental: 1 }, result: "你选择清静。每天早起散步，回家看新闻联播。日子平淡但安稳。" },
      { text: "找点事做，发挥余热", effects: { money: 3000, socialExp: 1, risk: 1 }, result: "你在小区门口开了个小卖部，或者帮人看店。闲不住的人，停不下来。" }
    ],
    setFlag: "retirement_decided"
  }
];
