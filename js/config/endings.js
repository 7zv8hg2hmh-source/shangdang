window.Game = window.Game || {};

Game.Endings = [
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
