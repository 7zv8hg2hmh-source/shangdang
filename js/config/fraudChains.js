window.Game = window.Game || {};

Game.FraudChains = [
  {
    id: "brush_order_chain",
    name: "大学刷单返利链",
    stage: ["college","early_career"],
    triggerCondition: function(s) { return s.greed >= 5 || s.flags.indexOf("brush_chain_entry") !== -1; },
    steps: [
      {
        title: "第一单：甜头",
        text: "你下载了对方发的APP，做了第一单点赞任务。5分钟后，8元到账了。对方说：'你做得很好，升级为VIP任务，单价更高。'",
        options: [
          { text: "升级做VIP任务", effects: { greed: 1, risk: 1 }, result: "你接了VIP任务，需要先垫付98元。", continueChain: true },
          { text: "够了，不做了", effects: { awareness: 1, money: 8 }, result: "你收了8块钱就跑了。后来听说继续做的人全赔了。", breakChain: true },
          { text: "拨打96110咨询", effects: { awareness: 2, socialExp: 1 }, result: "96110明确告诉你这是刷单诈骗。你卸载了APP。", breakChain: true }
        ]
      },
      {
        title: "第二单：垫付",
        text: "VIP任务需要你先垫付98元'刷单本金'。你垫了，很快返了106元。对方发来更大的任务：'这单垫付298元，返利50元。'",
        options: [
          { text: "继续垫付298元", effects: { money: -298, greed: 2, risk: 2 }, result: "你垫了298，这次返利延迟了。对方说'系统结算中，继续做下一单就能一起提现'。", continueChain: true },
          { text: "提现走人", effects: { awareness: 1, money: -98 }, result: "你想提现，发现APP提示'未完成任务组不能提现'。你赶紧止损不再投入。", breakChain: true },
          { text: "求助家人/朋友", effects: { awareness: 2, familyTrust: 1 }, result: "朋友一看就说：'这是刷单骗局！'帮你截图保存了证据。", breakChain: true }
        ]
      },
      {
        title: "第三单：深陷",
        text: "你已经垫了近400元没有提现。对方说：'你的任务组差最后一单就能全部结算了。这单需要垫付998元。完成后连本带利一起返。'",
        options: [
          { text: "咬牙垫付998元", effects: { money: -998, greed: 2, mental: -2, risk: 3 }, result: "你又投了998。提现还是失败，对方说'系统检测到异常，需要再充值解锁'。", continueChain: true },
          { text: "意识到不对，停手", effects: { awareness: 2, mental: -1, shame: 1, money: -400 }, result: "你亏了快1400但终于醒了。你截图保存了所有证据。", breakChain: true },
          { text: "报警", effects: { awareness: 3, socialExp: 1, money: -400 }, result: "你报了警。警察说这种案子很多，保留证据有助于后续追回。你做了对的事。", breakChain: true }
        ]
      },
      {
        title: "最后通牒：保证金",
        text: "你的'账户余额'显示有2800元，但提现时显示'账户冻结'。对方说：'系统检测到你的账户异常，需要缴纳2000元保证金解冻。解冻后所有钱一起返。'",
        options: [
          { text: "交保证金解冻", effects: { money: -2000, mental: -3, shame: 3, trust: -2, greed: -1 }, result: "你又转了2000。然后对方把你拉黑了。APP打不开了。你呆坐了一个下午。累计损失近4000元。", breakChain: true, isScam: true, totalLoss: 4000 },
          { text: "终于清醒，不再投入", effects: { awareness: 3, mental: -1, shame: 2, money: -1400 }, result: "你终于停了。虽然亏了1400多，但如果交了保证金会亏更多。你开始学会及时止损。", breakChain: true },
          { text: "带着证据去报警", effects: { awareness: 3, socialExp: 2, mental: 1, money: -1400 }, result: "你去派出所做了笔录，交了所有截图。虽然钱可能追不回来，但你帮警方增加了一个案件线索。", breakChain: true }
        ]
      }
    ]
  },
  {
    id: "romance_scam_chain",
    name: "网恋杀猪盘链",
    stage: ["college","early_career","family_career"],
    triggerCondition: function(s) { return s.loneliness >= 6 || s.flags.indexOf("romance_scam_victim") !== -1; },
    steps: [
      {
        title: "相遇：完美对象",
        text: "TA每天早安晚安，记住你喜欢的歌和爱吃的东西。你觉得终于遇到了一个真正懂你的人。两个月后TA说：'我在做一个理财项目，收益很好，想带你一起赚钱。'",
        options: [
          { text: "试试吧，TA不会骗我", effects: { loneliness: -2, greed: 1, trust: -1 }, result: "你在TA推荐的平台注册了账号，投了2000元试水。", continueChain: true },
          { text: "谈感情可以，钱就算了", effects: { awareness: 1, loneliness: -1 }, result: "你拒绝了。TA没有生气，但开始更频繁地提起赚钱的事。", continueChain: true },
          { text: "要求先线下见面", effects: { awareness: 2, socialExp: 1 }, result: "TA总有理由不见面。你开始警觉了。", breakChain: true }
        ]
      },
      {
        title: "小赚：建立信心",
        text: "平台上显示你的2000元已经变成了2800元。TA说：'看吧，我没骗你。趁行情好多投一些，我自己投了20万。'TA还发了收益截图。",
        options: [
          { text: "追加投入2万", effects: { money: -20000, greed: 2, risk: 2 }, result: "你投了2万。账户余额确实在涨。你开始幻想财务自由。", continueChain: true },
          { text: "先把2800提现", effects: { awareness: 1, greed: 1 }, result: "你提了2800，真的到账了。但这让你更相信了平台，也更容易在下一步加大投入。", continueChain: true },
          { text: "和朋友/家人讨论这个平台", effects: { awareness: 2, familyTrust: 1 }, result: "朋友查了平台，发现没有任何金融牌照。你清醒了。", breakChain: true }
        ]
      },
      {
        title: "加仓：all in",
        text: "TA说有一个'大行情'即将到来：'这次投10万，一周翻倍。我把养老钱都投了。我们一起赚一笔大的，以后的生活就不用愁了。'",
        options: [
          { text: "投10万搏一搏", effects: { money: -100000, greed: 3, mental: -2, risk: 3 }, result: "你投了10万。当天账户显示赚了3万。你欣喜若狂。但你不知道这只是屏幕上的数字。", continueChain: true },
          { text: "犹豫，先投3万", effects: { money: -30000, greed: 2, risk: 2 }, result: "你投了3万。小心翼翼地看着数字跳动。TA催你加仓。", continueChain: true },
          { text: "拒绝，开始怀疑", effects: { awareness: 2, trust: 1, loneliness: 1 }, result: "你拒绝了。TA的态度变了，开始指责你不信任TA。你心里很难受，但理智告诉你这不对。", breakChain: true }
        ]
      },
      {
        title: "收网：无法提现",
        text: "你想提现时，平台显示'系统维护中'。你联系TA，TA说'很快就好，我也在等'。三天后，平台无法登录。TA的消息越来越少。",
        options: [
          { text: "再转5万帮助'解冻'", effects: { money: -50000, mental: -4, trust: -4, shame: 4, greed: -2 }, result: "你最后的挣扎。5万转出去后，TA彻底消失了。平台也消失了。你失去的不只是钱。", breakChain: true, isScam: true, totalLoss: 150000 },
          { text: "接受现实，报警", effects: { awareness: 3, mental: -2, shame: 2, trust: -2 }, result: "你去报了警。警察说这是典型的杀猪盘。TA的身份、照片、故事全是假的。你哭了很久。", breakChain: true },
          { text: "告诉家人", effects: { familyTrust: 1, awareness: 2, shame: 3, mental: -2 }, result: "你鼓起勇气告诉了家人。他们没有责怪你，陪你去报了警。你知道以后不再是一个人面对。", breakChain: true }
        ]
      }
    ]
  },
  {
    id: "invest_scam_chain",
    name: "虚假投资理财链",
    stage: ["early_career","family_career","midlife_asset"],
    triggerCondition: function(s) { return s.greed >= 7 || s.flags.indexOf("invest_scam_victim") !== -1; },
    steps: [
      {
        title: "入群：围猎开始",
        text: "你被拉进一个'高端理财交流群'。群里有'导师'每天分析行情，还有学员不断发收益截图。导师说：'新学员先小额跟单体验。'",
        options: [
          { text: "跟着投5000试试", effects: { money: -5000, greed: 1, risk: 1 }, result: "你在导师推荐的平台投了5000。两天后显示赚了1200。你开始相信导师了。", continueChain: true },
          { text: "只看不投", effects: { awareness: 1 }, result: "你观察了一周。群里气氛很嗨，但你总觉得太整齐了，像排练过的。", continueChain: true },
          { text: "查平台资质", effects: { awareness: 2, digitalSkill: 1 }, result: "你查了这个平台，没有任何金融牌照。你退了群。", breakChain: true }
        ]
      },
      {
        title: "小赚：温水煮蛙",
        text: "导师的推荐连续三次盈利。群里有人说已经赚了5万。导师说：'大行情要来了，建议仓位提升到10万以上。'",
        options: [
          { text: "加仓到10万", effects: { money: -100000, greed: 2, risk: 2 }, result: "你追加到10万。导师说'跟紧操作就行'。你开始每天盯盘。", continueChain: true },
          { text: "提现落袋为安", effects: { awareness: 1, money: -3000, greed: 1 }, result: "你提了现，扣了各种手续费到手少了不少。但至少一部分钱出来了。", continueChain: true },
          { text: "咨询专业人士", effects: { awareness: 2, socialExp: 1 }, result: "你的银行理财经理说这种平台90%是骗子盘。你赶紧撤了能撤的钱。", breakChain: true }
        ]
      },
      {
        title: "爆仓：平台维护",
        text: "一天晚上，导师发了一条紧急消息：'今晚有超级行情！全仓买入！'你照做了。第二天平台显示'系统维护，暂停交易'。",
        options: [
          { text: "等平台恢复", effects: { mental: -2, risk: 2 }, result: "你等了三天。群里开始有人说提不了现了。导师说'正在协调'。", continueChain: true },
          { text: "尝试联系平台客服", effects: { awareness: 1, mental: -1 }, result: "客服说'系统升级中，48小时后恢复'。然后客服也联系不上了。", continueChain: true },
          { text: "立即报警", effects: { awareness: 3, socialExp: 1 }, result: "你第一时间报了警。警方已经接到了多起报案。你的行动可能帮助了案件侦破。", breakChain: true }
        ]
      },
      {
        title: "崩盘：血本无归",
        text: "平台彻底无法登录。导师的微信变成'该用户不存在'。群里最后一条消息是'系统永久关闭'。你的10万块只剩下屏幕截图。",
        options: [
          { text: "去报警", effects: { awareness: 2, socialExp: 1, mental: -2, shame: 2, trust: -3 }, result: "你带着截图去了派出所。警察说类似案件越来越多。你的报案材料会成为追逃的一部分。", breakChain: true, isScam: true, totalLoss: 100000 },
          { text: "告诉家人", effects: { familyTrust: 1, mental: -3, shame: 3 }, result: "你告诉了家人。他们心疼你，帮你一起整理证据报案。", breakChain: true },
          { text: "独自承受", effects: { mental: -4, shame: 4, loneliness: 2, trust: -2 }, result: "你没有告诉任何人。每天假装没事。但失眠和焦虑越来越严重。", breakChain: true }
        ]
      }
    ]
  },
  {
    id: "customer_service_chain",
    name: "冒充客服理赔链",
    stage: ["college","early_career","family_career"],
    triggerCondition: function(s) { return s.digitalSkill <= 8; },
    steps: [
      {
        title: "来电：快递异常",
        text: "你接到电话：'你好，你在XX平台购买的商品出现质量问题，我们现在进行双倍理赔。'你确实在那个平台买过东西。对方能报出你的订单号和姓名。",
        options: [
          { text: "听起来正规，配合理赔", effects: { risk: 1 }, result: "对方说需要你下载一个'理赔专用'APP来进行操作。", continueChain: true },
          { text: "自己去平台查看", effects: { awareness: 2, digitalSkill: 1 }, result: "你在平台上查了订单，一切正常。你知道这是假客服。", breakChain: true },
          { text: "挂掉电话不理", effects: { awareness: 1 }, result: "你记得：官方理赔不会主动打电话。挂了就安全了。", breakChain: true }
        ]
      },
      {
        title: "下载：远程控制",
        text: "你下载了对方发来的APP。'客服'说：'为了安全验证，请打开屏幕共享功能，我来指导您操作理赔。'",
        options: [
          { text: "开启屏幕共享", effects: { risk: 2, digitalSkill: -1 }, result: "对方看到了你手机上的所有操作。TA开始引导你打开银行APP。", continueChain: true },
          { text: "拒绝共享屏幕", effects: { awareness: 2, digitalSkill: 1 }, result: "你说'不共享屏幕'。对方开始催促和施压。你更确定了这是骗局。", breakChain: true },
          { text: "打96110求证", effects: { awareness: 3, socialExp: 1 }, result: "96110告诉你这是冒充客服的诈骗。让你立即卸载那个APP并修改密码。", breakChain: true }
        ]
      },
      {
        title: "操作：银行验证",
        text: "对方通过屏幕共享看着你操作，引导你打开银行APP：'现在需要验证您的银行卡信息以完成退款，请输入密码...'",
        options: [
          { text: "输入银行密码", effects: { money: -15000, digitalSkill: -2, trust: -2, awareness: -1 }, result: "你输入了密码。对方在你的屏幕上看到了所有信息。几分钟后你的账户少了15000元。", continueChain: true },
          { text: "突然醒悟关掉APP", effects: { awareness: 2, mental: 1 }, result: "你在最后一刻关掉了APP。虽然对方看到了一些信息，但你赶紧改了密码。", breakChain: true },
          { text: "关机", effects: { awareness: 1, digitalSkill: 1 }, result: "你直接关了手机。重新开机后卸载了APP，修改了所有密码。", breakChain: true }
        ]
      },
      {
        title: "追损：二次诈骗",
        text: "你发现钱被转走了，非常着急。这时你收到'平台安全中心'的消息：'检测到您的账户被盗，请转入保证金到安全账户以冻结并追回损失。'",
        options: [
          { text: "转保证金追回损失", effects: { money: -10000, mental: -4, shame: 4, trust: -3 }, result: "你在恐慌中又转了1万。然后你意识到...这又是一个骗局。你累计损失了25000元。", breakChain: true, isScam: true, totalLoss: 25000 },
          { text: "冷静下来，直接报警", effects: { awareness: 3, socialExp: 1, mental: -1 }, result: "你去派出所报案。警察说很多人在被骗后会遇到'追损'二次诈骗。你没有掉进第二个坑。", breakChain: true },
          { text: "打银行客服冻结账户", effects: { awareness: 2, digitalSkill: 1, mental: -1 }, result: "你第一时间打银行电话冻结了账户。虽然15000追回希望不大，但至少没有更多损失。", breakChain: true }
        ]
      }
    ]
  },
  {
    id: "police_scam_chain",
    name: "冒充公检法安全账户链",
    stage: ["early_career","family_career","midlife_asset"],
    triggerCondition: function(s) { return s.awareness <= 8 && s.socialExp <= 8; },
    steps: [
      {
        title: "来电：你涉案了",
        text: "你接到一个电话，号码显示是某市公安局的。对方自称是民警，声音很严肃：'你的身份信息被人冒用，涉嫌一起洗钱案，案件编号XX。你需要配合调查。'",
        options: [
          { text: "很害怕，配合调查", effects: { mental: -1, risk: 1 }, result: "对方要求你不要挂电话，保持通话。TA说会把你转接到'办案检察官'。", continueChain: true },
          { text: "我要挂掉打110确认", effects: { awareness: 3, socialExp: 1 }, result: "你打了110。110说公安不会通过电话办案，这是诈骗。你清醒了。", breakChain: true },
          { text: "让对方报出自己的警员编号", effects: { awareness: 2, socialExp: 1 }, result: "对方胡扯了一个编号。你说要去派出所当面核实。对方挂了电话。", breakChain: true }
        ]
      },
      {
        title: "恐吓：假检察官",
        text: "'检察官'接线了，声音很威严：'你的银行卡已被法院冻结令覆盖。如果不配合调查，将执行逮捕令。'对方还发来了一份'逮捕令'的图片。",
        options: [
          { text: "看到逮捕令吓坏了", effects: { mental: -2, shame: 1, risk: 2 }, result: "'检察官'要求你下载一个'安全检查'APP进行视频笔录。你照做了。", continueChain: true },
          { text: "截图问律师朋友", effects: { awareness: 2, socialExp: 1 }, result: "朋友一看就说逮捕令是假的。格式不对、公章是P的。你松了一口气。", breakChain: true },
          { text: "告诉家人", effects: { familyTrust: 2, awareness: 2 }, result: "家人帮你分析后一致认为是诈骗。你们一起报了警。", breakChain: true }
        ]
      },
      {
        title: "隔离：保密协议",
        text: "'检察官'让你签了一份'保密协议'：'案件属于国家机密，不得告知任何人包括家属，否则视为包庇罪。'你被恐惧笼罩了。",
        options: [
          { text: "遵守保密不告诉任何人", effects: { mental: -3, loneliness: 2, risk: 3, trust: -1 }, result: "你被隔绝了。接下来几天你几乎不和任何人说话，全部精力都在应付这个'案件'。", continueChain: true },
          { text: "不管保密了，打给家人", effects: { familyTrust: 2, awareness: 3, mental: 1 }, result: "你拨通了家人的电话。听到他们的声音你就哭了。他们说'这是骗子！快挂掉！'", breakChain: true },
          { text: "去最近的派出所求证", effects: { awareness: 3, socialExp: 2 }, result: "你走进派出所说了情况。民警当场确认这是诈骗，帮你记录了对方号码。", breakChain: true }
        ]
      },
      {
        title: "收割：安全账户",
        text: "'检察官'说：'为了证明你的资产来源合法，你需要把所有存款转入公安部的安全监管账户。查证清白后48小时返还。'",
        options: [
          { text: "把积蓄转到'安全账户'", effects: { money: -200000, mental: -5, trust: -4, shame: 5, risk: -3 }, result: "你转了20万积蓄。48小时后，没有返还，电话也打不通了。你站在银行门口，世界崩塌了。", breakChain: true, isScam: true, totalLoss: 200000 },
          { text: "不转，去银行问", effects: { awareness: 3, socialExp: 1, mental: 1 }, result: "银行工作人员说不存在'安全账户'。公安冻结资产会出示法律文书，不会让你自己转。", breakChain: true },
          { text: "最后一刻清醒，报警", effects: { awareness: 3, socialExp: 2, mental: -1 }, result: "你差一步就转了。你拨了110，民警说'安全账户'是诈骗中最后一道陷阱。你逃过了最大的劫。", breakChain: true }
        ]
      }
    ]
  }
];
