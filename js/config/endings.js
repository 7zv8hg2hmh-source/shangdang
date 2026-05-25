window.Game = window.Game || {};

Game.Endings = [
  {
    id: "childhood_wallet_taken_over",
    title: "童年小金库被接管",
    condition: function(s) {
      return s.age <= 12 && s.lifeFlags && s.lifeFlags.childhood_wallet_taken_over;
    },
    priority: 0,
    text: "你的零花钱、压岁钱和小卖部计划被家里全面接管。人生没有失败，只是太早遇到财务监管。你还会长大，但这条童年线提前停在一句熟悉的话里：'先帮你存着。'",
    flavor: "有些钱包不是被偷走的，是被爱和担心一起收走的。"
  },
  {
    id: "childhood_snack_debt",
    title: "辣条账本翻车",
    condition: function(s) {
      return s.age <= 12 && s.lifeFlags && s.lifeFlags.childhood_snack_debt && s.familyTrust <= 7;
    },
    priority: 0,
    text: "几块钱、几包辣条、几次撒谎，最后变成一本你解释不清的小账本。大人没有真的因为钱崩溃，而是因为你学会了躲。你的童年提前进入重建信任模式。",
    flavor: "最早的财商课，有时写在辣条包装背面。"
  },
  {
    id: "middle_school_recommendation",
    title: "少年提前上岸",
    condition: function(s) {
      return s.age <= 18 && s.lifeFlags && s.lifeFlags.middle_school_recommendation && s.awareness >= 10;
    },
    priority: 0,
    text: "竞赛、面试、老师推荐和家里支持在某一年突然对齐。你提前拿到一张通往更好平台的入场券。钱包暂时没有被撕开，人生却已经被重新分流。",
    flavor: "不是开挂，是长期认真在某一刻显影。"
  },
  {
    id: "college_lottery_detour",
    title: "大学那张彩票",
    condition: function(s) {
      return s.age <= 24 && s.lifeFlags && s.lifeFlags.college_lottery_jackpot && s.money >= 300000;
    },
    priority: 0,
    text: "你刚进入大学，就被一张小小的彩票改写了现金流。钱突然多到不像生活费，亲戚、同学、机会和诱惑也同时涌来。你没有因此变成另一个人，但这条普通人生线已经被提前改道。",
    flavor: "天降横财不是终点，是另一套更难的考卷。"
  },
  {
    id: "middle_school_bankrupt",
    title: "中学钱包破产",
    condition: function(s) {
      return s.age <= 18 && s.lifeFlags && (s.lifeFlags.middle_school_bankrupt || (s.lifeFlags.student_wallet_collapse && s.debt >= 4500 && s.familyTrust <= 6));
    },
    priority: 0,
    text: "你还没真正进入社会，账单就先一步长成了大人的样子。游戏充值、培训分期、同学借款和瞒着家里的恐慌滚在一起，终于超过了一个中学生能独自处理的范围。人生被迫暂停，先清账、认错、重建边界。",
    flavor: "小钱包也会破产，尤其在它假装自己是成年人钱包的时候。"
  },
  {
    id: "young_debt_collapse",
    title: "年轻人的债务急刹",
    condition: function(s) {
      return s.age <= 30 && s.lifeFlags && s.lifeFlags.young_debt_collapse && s.debt >= 30000;
    },
    priority: 0,
    text: "培训贷、分期、房租、人情和生活费缺口叠在一起，终于把你逼到必须停下来的地方。你没有走到80岁才得到结局，因为债务提前替你按下了暂停键。接下来的人生不是结束，而是从还清第一笔开始。",
    flavor: "不是所有结局都发生在老年，有些发生在还款日。"
  },
  {
    id: "college_dropout_reset",
    title: "大学提前退场",
    condition: function(s) {
      return s.age <= 24 && s.lifeFlags && s.lifeFlags.college_dropout_reset;
    },
    priority: 0,
    text: "学费、生活费、情绪和债务一起压下来，你决定先离开校园。不是所有离开都是输，但这条大学线确实提前结束了。接下来你要面对的不是试卷，而是工资、房租和重新开始的勇气。",
    flavor: "人生不是只认一张课表，但离开课表之后，账单会亲自点名。"
  },
  {
    id: "campus_creator_burst",
    title: "校园短剧爆了",
    condition: function(s) {
      return s.age <= 24 && s.lifeFlags && s.lifeFlags.campus_creator_burst && s.money >= 50000;
    },
    priority: 0,
    text: "你拍的一条短剧突然爆了。广告、邀约、合同、同学的羡慕和平台的规则一起涌来。大学还没毕业，人生就提前被流量推到岔路口。",
    flavor: "流量像一阵大风，吹得起人，也吹得乱账本。"
  },
  {
    id: "early_career_layoff_cliff",
    title: "第一份工作后的悬崖",
    condition: function(s) {
      return s.age >= 22 && s.age <= 35 && s.lifeFlags && s.lifeFlags.early_career_layoff_cliff && s.debt >= 20000;
    },
    priority: 0,
    text: "裁员邮件来的那天，房租、分期、社保和生活费没有跟着暂停。你不是不努力，只是现金流太薄。人生提前被迫进入求生模式：先活下来，再谈体面。",
    flavor: "有些悬崖不是在山上，而是在下个月一号。"
  },
  {
    id: "startup_buyout",
    title: "年轻创业被收购",
    condition: function(s) {
      return s.age >= 22 && s.age <= 35 && s.lifeFlags && s.lifeFlags.startup_buyout && s.money >= 120000;
    },
    priority: 0,
    text: "你做的小项目被一家更大的公司买走。合同签完，银行卡里的数字不像工资，倒像命运突然改口。普通打工线提前结束，新的问题变成：这笔钱怎么守住。",
    flavor: "暴富不是通关，它只是把难度菜单展开了。"
  },
  {
    id: "viral_short_drama_contract",
    title: "短剧合同改道人生",
    condition: function(s) {
      return s.age >= 19 && s.age <= 45 && s.lifeFlags && s.lifeFlags.viral_short_drama_contract;
    },
    priority: 0,
    text: "一部短剧让你忽然站到镜头和合同中间。钱、版权、分成、违约金、舆论一起出现，生活不再按年推进，而是按热搜刷新。你的旧人生线提前断在一次爆量之后。",
    flavor: "爽点很快，合同很长。"
  },
  {
    id: "mortgage_foreclosure",
    title: "房贷断供",
    condition: function(s) {
      return s.age >= 30 && s.age <= 55 && s.lifeFlags && s.lifeFlags.mortgage_foreclosure && s.debt >= 80000;
    },
    priority: 0,
    text: "房子还在，月供却撑不住了。催缴、协商、亲戚电话和家庭争吵挤成一团。你曾以为买房是稳定结局，后来才知道它也可能成为提前结局。",
    flavor: "房本很厚，现金流很薄。"
  },
  {
    id: "demolition_windfall",
    title: "一纸拆迁通知",
    condition: function(s) {
      return s.age >= 30 && s.age <= 60 && s.lifeFlags && s.lifeFlags.demolition_windfall && s.money >= 300000;
    },
    priority: 0,
    text: "一纸通知把老房子、亲戚关系、城市规划和账户余额全都搅动起来。补偿款到账那天，你的人生路线突然换了底盘。守住钱袋子变成新的主线。",
    flavor: "命运有时不是敲门，是贴公告。"
  },
  {
    id: "family_medical_bankruptcy",
    title: "家庭医疗清算",
    condition: function(s) {
      return s.age >= 35 && s.age <= 65 && s.lifeFlags && s.lifeFlags.family_medical_bankruptcy && s.debt >= 50000;
    },
    priority: 0,
    text: "一场病把存款、保险、亲情和选择题同时摆到桌上。你没有做错什么，但家庭资产还是被迫清算。人生提前进入照护、还债和重新分配责任的章节。",
    flavor: "病历上的字不多，每一行都很贵。"
  },
  {
    id: "stock_margin_call",
    title: "账户强平",
    condition: function(s) {
      return s.age >= 35 && s.age <= 65 && s.lifeFlags && s.lifeFlags.stock_margin_call;
    },
    priority: 0,
    text: "市场没有给你解释机会。强平短信来的时候，你才明白高杠杆不是放大收益，而是放大命运的手。中年资产线提前碎在一根大阴线里。",
    flavor: "屏幕红的时候，人的脸也会发白。"
  },
  {
    id: "antique_ruin",
    title: "古玩局里醒来",
    condition: function(s) {
      return s.age >= 45 && s.age <= 75 && s.lifeFlags && s.lifeFlags.antique_ruin && s.debt >= 30000;
    },
    priority: 0,
    text: "故事、证书、专家、拍卖和面子把你一步步推深。等你醒来，柜子里多了几件讲不清来历的东西，账户里少了多年积蓄。收藏线提前变成清债线。",
    flavor: "最贵的不是假货，是相信自己一定能捡漏。"
  },
  {
    id: "retirement_money_guarded",
    title: "养老钱守住了",
    condition: function(s) {
      return s.age >= 66 && s.age < 80 && s.lifeFlags && s.lifeFlags.retirement_money_guarded && s.money >= 80000 && s.awareness >= 12;
    },
    priority: 0,
    text: "你在最容易被盯上的年纪守住了养老钱。孩子、社区、银行工作人员和你自己的谨慎共同拦下了一次大坑。人生没有走到80岁才给答案，因为这一刻已经足够像结局。",
    flavor: "晚年的胜利，有时就是一次没有转出去的钱。"
  },
  {
    id: "elderly_savings_wiped",
    title: "养老钱清零",
    condition: function(s) {
      return s.age >= 66 && s.lifeFlags && s.lifeFlags.elderly_savings_wiped && (s.money <= 1000 || s.fraudLoss >= 90000);
    },
    priority: 0,
    text: "养老钱被一场精心设计的局掏空。你坐在银行大厅里，手里攥着回执，忽然觉得很多年的节省都变得很轻。人生提前停在这一刻，不是为了惩罚你，而是提醒后来的人。",
    flavor: "孤独会被报价，信任也会被收割。"
  },
  {
    id: "true_shore",
    title: "真正走到对岸",
    condition: function(s) {
      return s.age >= 80 && s.money >= 50000 && s.trust >= 8 && s.mental >= 8 && s.awareness >= 12 && s.fraudLoss < s.totalIncome * 0.1;
    },
    priority: 1,
    text: "你没有识破所有骗局。你也曾在贪念、恐惧、孤独和侥幸里停留。但你学会了，在转账之前，先停一下。你这一生如履薄冰，但你真的走到了对岸。",
    flavor: "冰面上有你的脚印，但冰没有碎。"
  },
  {
    id: "money_shore",
    title: "带着钱走到对岸",
    condition: function(s) {
      return s.age >= 80 && s.money >= 200000 && s.awareness >= 10 && s.trust >= 5;
    },
    priority: 2,
    text: "你的账户里还有不少钱，你的脑子里还有足够的清醒。这一辈子你躲过了大多数的坑，不是因为你运气好，而是因为你每一次都选择了不急着决定。",
    flavor: "对岸有你的房子、你的积蓄、和你完整的信任。"
  },
  {
    id: "link_no_click",
    title: "人间值得，但链接不点",
    condition: function(s) {
      return s.age >= 80 && s.awareness >= 14 && (s.familyTrust >= 8 || s.trust >= 8) && s.stoppedLossCount >= 3;
    },
    priority: 3,
    text: "你成了朋友圈里'最不好骗的人'。逢年过节，晚辈们遇到可疑链接都会先问你。你用一辈子的经验告诉他们：'不确定的事，先别急。'",
    flavor: "你不是没有被骗过，你只是学会了在被骗之前停下来。"
  },
  {
    id: "anti_fraud_volunteer",
    title: "反诈志愿者",
    condition: function(s) {
      return s.age >= 80 && s.scamVictimCount >= 2 && s.reportedCount >= 3 && s.awareness >= 12;
    },
    priority: 4,
    text: "你被骗过，但你没有沉默。你举报、报警、把经历讲给别人听。你的亲身经历比任何宣传都有力量。你这一生如履薄冰，但你也在冰面上插了很多警示牌。",
    flavor: "被骗不可耻，沉默才危险。"
  },
  {
    id: "modest_safe",
    title: "一生没有大富，但也没被收割",
    condition: function(s) {
      return s.age >= 80 && s.money >= 10000 && s.fraudLoss < 10000 && s.risk <= 5;
    },
    priority: 5,
    text: "你没赚过大钱，也没亏过大钱。你的一生平平淡淡，但这份平淡在骗子横行的年代，已经是一种胜利。",
    flavor: "你的冰面很薄，但你走得很轻。"
  },
  {
    id: "money_numb",
    title: "钱还在，人麻了",
    condition: function(s) {
      return s.age >= 80 && s.money >= 50000 && (s.trust <= 3 || s.mental <= 3);
    },
    priority: 6,
    text: "你的钱没被骗走。但你也不相信任何人了。你关掉了所有社交软件，不接陌生电话，不扫任何码。钱在，但温度没了。",
    flavor: "你守住了账户余额，却透支了信任。"
  },
  {
    id: "no_one_shore",
    title: "对岸无人",
    condition: function(s) {
      return s.age >= 80 && s.money >= 10000 && s.loneliness >= 15 && s.familyTrust <= 3;
    },
    priority: 7,
    text: "你走到了80岁，钱还有一些。但是身边没什么人了。不是因为被骗了，是因为你为了不被骗，把所有人都推远了。",
    flavor: "冰面上只有你一个人的脚印。"
  },
  {
    id: "brush_life",
    title: "被刷单改变的一生",
    condition: function(s) {
      return s.flags.indexOf("brush_chain_entry") !== -1 && s.fraudLoss >= 3000 && s.age <= 30;
    },
    priority: 8,
    text: "大学时那次刷单，不只是损失了几千块钱。它让你在很长一段时间里不敢相信任何'好事'。也许这种警惕保护了你，也许它让你错过了一些真正的机会。",
    flavor: "第一单的8块钱返利，是你人生中最贵的甜头。"
  },
  {
    id: "invest_silent",
    title: "投资群里的沉默者",
    condition: function(s) {
      return (s.flags.indexOf("invest_scam_victim") !== -1 || s.flags.indexOf("ponzi_victim") !== -1) && s.fraudLoss >= s.totalIncome * 0.3;
    },
    priority: 8,
    text: "你在投资群里亏掉了人生中最重要的积蓄。你退了群，删了APP，但那个数字一直刻在你心里。你再也没跟任何人提起这件事。",
    flavor: "群散了，群里的钱也散了。只有教训留了下来。"
  },
  {
    id: "twilight_lesson",
    title: "黄昏恋里的最后一课",
    condition: function(s) {
      return s.flags.indexOf("elder_romance_victim") !== -1 && s.age >= 66;
    },
    priority: 8,
    text: "你在晚年遇到了一个'懂你的人'。你把积蓄交给了TA，也把信任交给了TA。TA离开后，你在公园的长椅上坐了一个下午。你不恨TA，你只是想不通，为什么陪伴也要被明码标价。",
    flavor: "孤独不是你的错。利用孤独的人才是。"
  },
  {
    id: "health_crash",
    title: "身体先替你停下",
    condition: function(s) {
      return s.health <= 0;
    },
    priority: 9,
    text: "你一直在省钱、赶路、硬扛，以为只要钱包还在，生活就还能继续。可身体也有自己的账本，拖欠太久，它会直接停机。",
    flavor: "守住钱包之前，先守住这个人。"
  },
  {
    id: "trust_bankrupt",
    title: "信任破产",
    condition: function(s) {
      return s.trust <= 0;
    },
    priority: 9,
    text: "你再也不相信任何人了。电话不接、链接不点、红包不领、门不开。你把世界关在了外面，也把自己锁在了里面。",
    flavor: "你赢了所有的骗子，也输了所有的关系。"
  },
  {
    id: "debt_spiral",
    title: "债务漩涡",
    condition: function(s) {
      return s.debt >= 100000 && s.mental <= 5;
    },
    priority: 9,
    text: "债务像雪球一样越滚越大。你借了新债还旧债，每天睁开眼就是催收电话。你知道这一切是从那一次'点击'开始的。",
    flavor: "冰面碎了，你还在水里挣扎。请拨打12345或寻求法律援助。"
  }
];
