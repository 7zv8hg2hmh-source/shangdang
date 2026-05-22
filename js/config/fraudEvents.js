window.Game = window.Game || {};

Game.FraudEvents = [

  // ==========================================
  // 儿童期 (7-12) — 10 events
  // ==========================================

  {
    id: "child_ipad_game",
    stage: ["childhood"],
    type: "life",
    title: "妈妈的iPad",
    trigger: "便利",
    text: "妈妈在做饭，你拿了她的iPad玩游戏。游戏里弹出来一个金光闪闪的宝箱：'只需6元解锁超级英雄！'妈妈的支付宝没设密码，你的手指悬在'确认支付'上面。",
    options: [
      { text: "6块钱而已，点了", effects: { money: -6, greed: 1 }, result: "解锁了超级英雄，打了一下午。晚上妈妈看到账单，没说什么。但第二天iPad设了密码。你觉得有什么东西不一样了。" },
      { text: "忍住了，关掉弹窗", effects: { mental: 1 }, result: "你没点。继续用免费角色打了一下午。其实也挺好玩的。" },
      { text: "跑去问妈妈能不能买", effects: { familyTrust: 1 }, result: "妈妈擦着手说'可以，但一个月只能买一次'。你觉得这6块钱花得特别香。" }
    ],
    review: null
  },
  {
    id: "child_classmate_card",
    stage: ["childhood"],
    title: "同桌的奥特曼卡",
    trigger: "面子",
    type: "life",
    text: "同桌带了一整本闪卡来学校，全班都围着他看。你也想要，但一包要15块。校门口有个大哥哥说：'我这有散卡，5块钱随便挑三张，保证有闪的。'",
    options: [
      { text: "买大哥哥的散卡", effects: { money: -5, trust: -1 }, result: "你挑了三张'闪卡'。回家用手机一照，反光不对——是贴了锡纸的普通卡。你没告诉任何人，把卡藏在了书包最里面。", isScam: true, loss: 5 },
      { text: "攒钱买正版卡包", effects: { money: -15, mental: 1 }, result: "你攒了三天零花钱，买了一包正版的。拆包的时候手都在抖。抽到一张普通卡。但它是真的。" },
      { text: "算了不买了", effects: { loneliness: 1, mental: -1 }, result: "你假装不在意，但午休时同桌们交换卡片时，你只能在旁边看着。" }
    ],
    review: "复盘：校门口的'便宜货'往往有问题。但更重要的是——你已经开始在意别人有而你没有的东西了。"
  },
  {
    id: "child_game_friend",
    stage: ["childhood"],
    title: "游戏里的大神",
    trigger: "孤独",
    text: "你在游戏里遇到一个超厉害的玩家。他天天带你打副本、送你装备，你叫他'哥'。有一天他说：'我送你一个绝版坐骑，你把账号借我登一下，我帮你领。'",
    options: [
      { text: "他对我这么好，借吧", effects: { money: -200, trust: -2, loneliness: 1 }, result: "他登了你的号，把你攒了三个月的游戏币全部转走了。你站在空荡荡的游戏仓库前，第一次体验了什么叫'被信任的人伤害'。", isScam: true, loss: 200 },
      { text: "说不用了谢谢", effects: { awareness: 1, loneliness: 1 }, result: "他说'随便你'，之后就很少上线了。你才明白，所有的带你打本、送你装备，都是在等这一刻。但你也想了很久——也许他真的只是想帮忙？" },
      { text: "告诉妈妈有人要我的账号", effects: { familyTrust: 1, awareness: 1, loneliness: 1 }, result: "妈妈帮你改了密码，还说'网上的人不一定是坏人，但你的东西不能随便给别人'。你觉得妈妈说得对，但心里还是有点难过——你以为他是朋友。" }
    ],
    review: "复盘：这不是一个关于密码的故事。这是一个关于'你愿意为了被喜欢而付出多少'的故事。"
  },
  {
    id: "child_grandpa_phone",
    stage: ["childhood"],
    title: "爷爷的手机",
    trigger: "亲情",
    type: "life",
    text: "爷爷让你帮他看手机上的一条短信：'您的医保卡异常，请拨打以下电话处理。'爷爷说：'这是不是要去处理一下？'",
    options: [
      { text: "帮爷爷打那个电话", effects: { money: -300, familyTrust: -1 }, result: "电话那头让爷爷报了身份证号和银行卡号。两天后爷爷的卡被刷了300块。你一直觉得是自己害了爷爷。", isScam: true, loss: 300 },
      { text: "说这个可能是骗子", effects: { awareness: 1, familyTrust: 1 }, result: "爷爷不太信：'人家都知道我名字呢。'你坚持说是假的。爷爷嘟嘟囔囔的，但听了你的。你不确定自己是不是对的，但你做了选择。" },
      { text: "让妈妈来看看", effects: { familyTrust: 1 }, result: "妈妈一看就说是诈骗短信。爷爷有点不好意思。你发现大人也会被骗，这让你对世界的看法发生了一点变化。" }
    ],
    review: null
  },
  {
    id: "child_bully_money",
    stage: ["childhood"],
    title: "高年级的孩子",
    trigger: "恐惧",
    type: "life",
    text: "放学路上，两个六年级的男生拦住你：'借10块钱，明天还你20。'你知道他们不会还。但他们比你高一个头。",
    options: [
      { text: "给了", effects: { money: -10, mental: -1, shame: 1 }, result: "你给了10块钱。第二天他们当然没还。第三天他们又来了——'再借10块'。你开始绕路回家。" },
      { text: "说没带钱", effects: { mental: 1, risk: 1 }, result: "他们翻了你的书包，搜出5块钱拿走了。你没哭。回家后你把零花钱藏在了袜子里。你开始学会保护自己的东西。" },
      { text: "转身跑向老师", effects: { socialExp: 1, shame: 1 }, result: "你跑了。他们在后面骂你。老师处理了，但你在班里被叫了一阵子'告状精'。你做了对的事，但'对的事'有时候也有代价。" }
    ],
    review: null
  },
  {
    id: "child_red_packet",
    stage: ["childhood"],
    title: "群里的红包",
    trigger: "贪念",
    text: "表姐在家族群发了个红包，你抢到了8块8。紧接着弹出一个'链接红包'：'恭喜获得二次翻倍机会，点击领取17.6元！'",
    options: [
      { text: "手快，点了", effects: { money: -50, digitalSkill: -1 }, result: "点进去要填手机号。你填了妈妈的。第二天妈妈问你为什么手机一直收到贷款短信。你说不知道。这是你第一次对妈妈说谎。", isScam: true, loss: 50 },
      { text: "问表姐这个是不是她发的", effects: { awareness: 1, familyTrust: 1 }, result: "表姐说'我就发了一个红包啊，那个链接不是我的'。你学到了一件事：坏东西会跟在好东西后面出现。" },
      { text: "犹豫了一下，没点", effects: { awareness: 1, greed: -1 }, result: "你看了看那个链接，总觉得哪里不对。你关掉了页面。8块8已经很开心了。" }
    ],
    review: "复盘：真正的红包不需要你再点一次链接。但8岁的你能忍住不点——这件事比17.6元值钱得多。"
  },
  {
    id: "child_fake_teacher_sms",
    stage: ["childhood"],
    title: "班主任发来的短信",
    trigger: "权威",
    text: "妈妈在洗碗，手机响了。你看了一眼：'XX家长您好，我是李老师，学校要交380元材料费，今天截止。'妈妈前两天确实说老师要收什么费。",
    options: [
      { text: "催妈妈赶紧转，怕来不及", effects: { money: -380, awareness: -1 }, result: "妈妈着急转了380。第二天去学校，老师说没这回事。妈妈叹了口气，没怪你。但你难受了很久——是你催的。", isScam: true, loss: 380 },
      { text: "让妈妈自己看", effects: { familyTrust: 1 }, result: "妈妈看了看号码，打给了老师确认。老师说不是她发的。妈妈说'多亏没急着转'。你第一次觉得'慢一点'是对的。" },
      { text: "你觉得好像不对劲但不确定", effects: { awareness: 1, mental: -1 }, result: "你犹豫了，没说话。妈妈自己看到了短信，差点就转。最后打了个电话确认是假的。你后悔没有早说出来。" }
    ],
    review: "复盘：你当时不确定——这很正常。学会在'不确定'的时候说出来，比'确定'更需要勇气。"
  },
  {
    id: "child_live_stream",
    stage: ["childhood"],
    title: "第一次看直播",
    trigger: "孤独",
    type: "life",
    text: "晚上爸妈加班，你一个人在家看直播。主播说'宝贝们刷个火箭，姐姐给你们唱首歌'。你用妈妈的账号登的，里面有零钱。弹幕里全是'666'和火箭。你也想被主播念到名字。",
    options: [
      { text: "刷了一个小火箭（6元）", effects: { money: -6, loneliness: -1, greed: 1 }, result: "主播念了你的名字：'谢谢小宝贝～'你的心砰砰跳。那6秒钟你觉得自己被看到了。直到你关掉直播，房间又安静下来。" },
      { text: "连刷了三个（18元）", effects: { money: -18, loneliness: -1, greed: 2, mental: -1 }, result: "主播说了一句'大佬来了！'你非常开心。但关掉手机后你看着黑屏上自己的脸，觉得有什么地方不对。这钱是妈妈的。" },
      { text: "只看不刷", effects: { loneliness: 1, mental: 1 }, result: "你看到别人刷礼物被表扬，你只是安安静静地看着。没人知道你在。十点钟你关了直播，去睡觉了。一个人。" }
    ],
    review: null
  },
  {
    id: "child_scan_toy",
    stage: ["childhood"],
    title: "扫码送奥特曼",
    trigger: "贪念",
    text: "学校门口有人摆摊：'小朋友，帮叔叔用妈妈手机扫个码，送你一张奥特曼闪卡！'好多小朋友已经在排队了。",
    options: [
      { text: "回家拿妈妈手机来扫", effects: { risk: 2, money: -30 }, result: "你拿了妈妈手机去扫。卡拿到了，但妈妈的手机开始不停收广告短信。更严重的是——妈妈因为信息泄露接到了'客服'诈骗电话。不过她没上当。", isScam: true, loss: 30 },
      { text: "看看别人扫完怎么样", effects: { awareness: 1, socialExp: 1 }, result: "你站在旁边看。有个小朋友扫完说'怎么要下载东西'。那个叔叔说'下了就有卡'。你决定不扫了。" },
      { text: "直接拒绝了", effects: { awareness: 1, loneliness: 1 }, result: "你走了。其他小朋友举着奥特曼卡跑过你身边。你空着手，但你不知道你做了最对的事。" }
    ],
    review: "复盘：一张卡片换你妈妈的手机信息——世界上最不划算的交易。但当时你怎么可能知道呢。"
  },
  {
    id: "child_first_secret",
    stage: ["childhood"],
    title: "不能说的秘密",
    trigger: "恐惧",
    type: "life",
    text: "你在玩妈妈手机时不小心点了一个广告，跳转到一个奇怪的页面，然后自动下载了什么东西。你慌了——妈妈说过不许乱下载。",
    options: [
      { text: "偷偷删掉假装没发生", effects: { shame: 1, digitalSkill: -1, risk: 1 }, result: "你删了那个APP。但你不确定它有没有做什么。之后好几天你都心虚，不敢碰妈妈的手机。你学到了一件事：秘密是一种负担。" },
      { text: "告诉妈妈", effects: { familyTrust: 2, shame: -1 }, result: "妈妈检查了手机，卸载了那个东西，又清理了一遍。她说'以后遇到这种事告诉我就行，不怪你'。你松了一口气——原来坦白也可以是一种选择。" },
      { text: "关掉手机不管了", effects: { risk: 1, mental: -1 }, result: "你关了手机，假装什么都没发生。但晚上睡觉时你一直在想那个奇怪的页面。你不知道这算不算一个大问题。" }
    ],
    review: null
  },

  // ==========================================
  // 中学期 (13-18) — 12 events
  // ==========================================

  {
    id: "teen_first_love",
    stage: ["middle_school"],
    type: "life",
    title: "暗恋的人",
    trigger: "孤独",
    text: "你暗恋隔壁班的一个人。你们在QQ上聊了一个月，每天晚上聊到凌晨。TA说想要一副蓝牙耳机，生日快到了。一副要299。你一个月零花钱300。",
    options: [
      { text: "买了送TA", effects: { money: -299, loneliness: -2, mental: -1 }, result: "你把整个月的零花钱都花了。TA收到时说了句'谢谢'。两周后你听说TA和别人在一起了。你后悔了。但你不确定后悔的是花了钱，还是喜欢了这个人。" },
      { text: "送个便宜但用心的礼物", effects: { money: -50, loneliness: -1, socialExp: 1 }, result: "你买了TA喜欢的乐队的明信片和手写信。TA笑着说'你好用心'。你们没有在一起，但你觉得你做了自己。" },
      { text: "什么也不送", effects: { loneliness: 1, mental: 1 }, result: "TA的生日过去了。你在聊天里说了'生日快乐'。你告诉自己省钱是对的，但那天晚上你翻了很久TA的朋友圈。" }
    ],
    review: null
  },
  {
    id: "teen_brush_order",
    stage: ["middle_school"],
    title: "班级群里的兼职",
    trigger: "贪念",
    text: "班级QQ群里有人发：'高薪兼职，动动手指日赚200。'你知道这大概是骗人的——但你的好朋友小林说他试了，真的收到了5块钱。他说'你不试试怎么知道？'",
    options: [
      { text: "小林都赚到了，我也试试", effects: { money: -500, greed: 2, trust: -1 }, result: "第一单返了5块。第二单要你垫98，你犹豫了一下还是垫了。第三单要298。你垫了。然后对方消失了。小林也亏了。你们都不太想提这件事。", isScam: true, loss: 500 },
      { text: "跟小林说别做了", effects: { awareness: 1, trust: 1, socialExp: 1 }, result: "小林说'你太胆小了'。三天后小林亏了800块。他没来找你，但你知道他后悔了。你没有说'我说过了吧'。这是对的。" },
      { text: "不做，但也没劝小林", effects: { awareness: 1, loneliness: 1 }, result: "你没做。小林后来亏了钱。你觉得自己应该劝他的，但当时你怕被说'多管闲事'。你学到了——有时候沉默也有代价。" }
    ],
    review: "复盘：这不是你蠢不蠢的问题。当你最好的朋友说'我试了没问题'，你的防线会降低80%。骗子也知道这一点。"
  },
  {
    id: "teen_game_trade",
    stage: ["middle_school"],
    title: "游戏账号",
    trigger: "贪念",
    text: "你花了两年时间练的游戏账号，有人出1500买。你心动了——1500块对一个初中生来说是巨款。对方说'走平台交易要扣手续费200，咱们直接转账，我先付你500定金，你先把账号密码给我验货'。",
    options: [
      { text: "先给密码，等500定金", effects: { money: -1500, trust: -2, mental: -2 }, result: "你给了密码。对方立刻改了绑定手机，然后拉黑了你。你的账号没了，1500也没有。你花两年练的东西，在三分钟里消失了。", isScam: true, loss: 1500 },
      { text: "坚持走平台", effects: { money: 1300, awareness: 1, socialExp: 1 }, result: "对方嫌麻烦，出价降到1300。走平台扣了手续费，你到手1100。少了400，但钱是实实在在到了你的口袋。" },
      { text: "算了不卖了", effects: { mental: 1 }, result: "你舍不得。这个号上有你和老朋友们的记忆。有些东西不应该用钱来衡量——虽然你15岁的时候不太懂这个道理。" }
    ],
    review: "复盘：'先给密码验货'是所有虚拟物品交易骗局的标准开头。但真正的教训是——急着拿钱的人最容易被骗。"
  },
  {
    id: "teen_cheap_shoes",
    stage: ["middle_school"],
    title: "那双AJ",
    trigger: "面子",
    text: "班上男生都穿AJ。你家条件一般，穿的是普通运动鞋。有个网站AJ只要199，同学说'可能是莆田的，但穿脚上谁看得出来？'正品要1299。",
    options: [
      { text: "买199的莆田鞋", effects: { money: -199, shame: 1, socialExp: 1 }, result: "鞋到了，穿着还行。直到有一天下雨，鞋底开胶了。有人笑你'穿假鞋'。你红着脸说'不是假的'。其实你们都知道是假的。" },
      { text: "攒几个月钱买正品", effects: { money: -1299, mental: 1, greed: -1 }, result: "你攒了四个月。穿上正品的那天你特别开心。但一个月后发现没人在意你的鞋——他们在意的是谁的成绩好。你花了1299学到了这件事。" },
      { text: "继续穿自己的鞋", effects: { mental: 1, loneliness: 1, shame: 1 }, result: "你没买。体育课上你跑得最快——穿什么鞋不影响速度。但午休时大家讨论球鞋，你插不上话。你告诉自己不在乎，但你在乎。" }
    ],
    review: null
  },
  {
    id: "teen_exam_answers",
    stage: ["middle_school"],
    title: "期末考试前一天",
    trigger: "焦虑",
    text: "明天就考数学了，你什么都不会。有人在群里卖'提前泄露的真题答案'，200块一科。你很害怕考砸了妈妈会失望。",
    options: [
      { text: "咬牙买了", effects: { money: -200, shame: 2, awareness: -1 }, result: "你买了。答案发过来你一看——跟网上免费的模拟题一模一样。200块买了一堆废纸。考试的时候你一个题也不会。你亏了200块，还是考砸了。", isScam: true, loss: 200 },
      { text: "通宵复习", effects: { mental: -1, awareness: 1 }, result: "你复习到凌晨三点。考了62分——刚及格。妈妈看了看分数，说了句'下次早点复习'。没有你想象中的暴风雨。你发现自己害怕的事情，往往没有那么可怕。" },
      { text: "认了，考多少是多少", effects: { mental: 1, shame: 1 }, result: "你考了48分。妈妈沉默了很久。你也沉默了很久。那个暑假你没有出去玩，一直在补习。这是一种代价，但至少是诚实的代价。" }
    ],
    review: "复盘：考试答案100%是骗局。但你买答案不是因为你蠢——是因为你害怕妈妈失望。骗子从来不是在骗你的智商，是在骗你的恐惧。"
  },
  {
    id: "teen_part_time_real",
    stage: ["middle_school"],
    title: "暑假想赚钱",
    trigger: "便利",
    type: "false_alarm",
    text: "你想暑假打工赚钱。找到两个机会：一个是超市收银员，月薪2000，要先去面试；另一个是网上的'打字员'，在家工作，日薪300，但要先交200块'入会费'。你的同学阿伟说他做打字员赚到钱了。",
    options: [
      { text: "去超市面试", effects: { money: 4000, socialExp: 2, mental: 1 }, result: "面试通过了。那个暑假你站了两个月收银台，腿酸得不行。但你赚到了自己人生中第一笔钱——4000块。你用它请全家吃了一顿饭。" },
      { text: "做网上打字员", effects: { money: -200, awareness: -1, shame: 1 }, result: "你交了200块，对方发来一个'任务系统'。第一个任务做完没给钱。第二个任务需要你再交300。你这才明白——阿伟大概也被骗了，只是不好意思说。", isScam: true, loss: 200 },
      { text: "两个都算了", effects: { loneliness: 1 }, result: "你在家躺了一个暑假。看着同学们晒打工经历和新买的东西，你觉得自己浪费了整个夏天。" }
    ],
    review: "复盘：需要先交钱才能上班的工作不是工作，是你在付费。但真正的好工作确实存在——只是它需要你出门、面试、站一整天。"
  },
  {
    id: "teen_naked_loan",
    stage: ["middle_school"],
    title: "好朋友的秘密",
    trigger: "亲情",
    text: "你最好的朋友小雨悄悄告诉你：TA在网上借了3000块买手机，对方要求拍了隐私照做'担保'。现在对方让TA还5000。TA哭了。TA说：'千万别告诉别人。'",
    options: [
      { text: "帮TA凑钱还了", effects: { money: -1000, trust: -1, mental: -1, familyTrust: -1 }, result: "你把攒的钱给了TA。但对方收了钱又加码要8000。这是一个无底洞。小雨崩溃了，你也慌了。你花了钱但什么也没解决。" },
      { text: "陪TA告诉家长", effects: { familyTrust: 2, awareness: 1, socialExp: 1 }, result: "你陪小雨告诉了TA爸妈。TA爸妈哭了，但马上报了警。警察介入后对方不敢再威胁了。小雨说谢谢你。这件事改变了你们俩的一生。" },
      { text: "不知道怎么办，什么都没做", effects: { shame: 2, mental: -2, loneliness: 1 }, result: "你每天都在想这件事但不敢跟任何人说。小雨越来越沉默。一个月后事情被老师发现了。你一直在想——如果你当时说了，是不是会更早解决。" }
    ],
    review: "复盘：'别告诉任何人'是控制受害者的第一步。当有人让你保密，特别是涉及金钱和威胁——那恰恰是你最该开口说话的时候。"
  },
  {
    id: "teen_love_trap",
    stage: ["middle_school"],
    title: "网上的温柔",
    trigger: "孤独",
    text: "你最近跟爸妈吵了一架。一个陌生人加了你微信，说'在附近的人里看到你，觉得你头像很好看'。TA很温柔，每天关心你吃了没、开不开心。你觉得终于有人懂你了。一个月后TA说：'我在做一个小投资，收益特别好。'",
    options: [
      { text: "TA这么好，我相信TA", effects: { money: -500, greed: 1, loneliness: -2, trust: -2 }, result: "你投了500。平台显示赚了200。你想提现时发现要充值1000才能提。你充了。然后TA不回消息了。你失去了1500块，和一个你以为的'朋友'。", isScam: true, loss: 1500 },
      { text: "只聊天不转钱", effects: { awareness: 1, loneliness: -1 }, result: "你拒绝了。TA说'你不信任我吗？'语气不再温柔了。你开始怀疑之前的关心是不是都是假的。但你更怀疑的是——为什么你这么需要一个陌生人的关心。" },
      { text: "一谈钱就拉黑", effects: { awareness: 2, trust: -1 }, result: "你拉黑了。但那天晚上你看着TA之前发的那些关心的话——'今天开心吗？''多穿点别感冒'——你分不清那些是真心还是话术。你觉得很累。" }
    ],
    review: "复盘：骗子不是先谈钱的。他们先谈感情、谈关心、谈理解。当你最孤独的时候出现的人，不一定是天使——也可能是猎人。"
  },
  {
    id: "teen_idol_ticket",
    stage: ["middle_school"],
    title: "演唱会",
    trigger: "贪念",
    text: "你最喜欢的歌手来你的城市开演唱会。官方票秒没。闲鱼上有人出票580，但要先转账。你身边的同学都说想去，有个同学已经从这个人那买到了。",
    options: [
      { text: "同学买到了，应该靠谱", effects: { money: -580, trust: -2, mental: -2 }, result: "你转了580。对方说'正在出票'。三天后你被拉黑了。最荒谬的是你后来发现——那个'买到票的同学'也被骗了，只是不好意思说。", isScam: true, loss: 580 },
      { text: "要求见面交易或走平台", effects: { awareness: 1, socialExp: 1, money: -800 }, result: "那个人不肯。你在另一个群里找到了可以见面交易的票，但贵了200。你花了800买到了真票。演唱会那天你哭了——因为太值了。" },
      { text: "算了，不去了", effects: { mental: -1, loneliness: 1, greed: -1 }, result: "朋友圈刷屏都是演唱会的视频。你在家里戴着耳机听同样的歌。你告诉自己以后有机会的。这种话你信了一半。" }
    ],
    review: "复盘：'我同学买到了'是最强的信任催化剂。但骗子会用'拖'——你同学可能也在等票，等到拉黑的那天才知道被骗。"
  },
  {
    id: "teen_charity_dilema",
    stage: ["middle_school"],
    title: "水滴筹",
    trigger: "亲情",
    text: "朋友圈有人转发一个水滴筹链接：一个同龄的孩子得了白血病，需要60万手术费。照片很真实，筹款平台也是正规的。你查了查，确实是真的。但你只有200块零花钱。",
    options: [
      { text: "捐了100", effects: { money: -100, trust: 1, mental: 1 }, result: "你捐了100。那一刻你觉得自己做了一件好事。两个月后你看到后续——那个孩子手术成功了。你高兴了一整天。" },
      { text: "捐了20意思一下", effects: { money: -20, mental: 1 }, result: "你捐了20。你觉得太少了有点不好意思，但这确实是你能承受的。善良不需要倾家荡产。" },
      { text: "没有捐", effects: { shame: 1, mental: -1 }, result: "你犹豫了一会儿，划走了。你告诉自己你也没钱。但那天晚上你又想到了那个孩子的照片。你不知道这算不算'冷漠'。" }
    ],
    review: null
  },
  {
    id: "teen_parent_fight",
    stage: ["middle_school"],
    type: "life",
    title: "爸妈吵架了",
    trigger: "恐惧",
    text: "你放学回家听到爸妈在吵架，关于钱的事。妈妈说'你又瞎投了多少'，爸爸说'这次不一样'。你站在门口，书包还背着。",
    options: [
      { text: "回房间关上门", effects: { loneliness: 2, mental: -1 }, result: "你锁了门，戴上耳机。外面的争吵声变成了模糊的嗡嗡声。你开始做作业，但一个字也看不进去。你想——等我长大了，绝对不会为钱吵架。" },
      { text: "走出去让他们别吵了", effects: { familyTrust: 1, mental: -1, socialExp: 1 }, result: "你推开门说了句'你们能不能别吵了'。他们都愣了。吵架停了，但空气更凝重了。那天晚饭谁都没说话。" },
      { text: "问妈妈发生了什么", effects: { familyTrust: 1, awareness: 1 }, result: "妈妈叹了口气：'你爸又买了那什么保健品。'你第一次知道——大人也会被骗。而且被骗的大人不会消失，TA还是你爸爸。" }
    ],
    review: null
  },
  {
    id: "teen_group_pressure",
    stage: ["middle_school"],
    title: "AA还是请客",
    trigger: "面子",
    type: "life",
    text: "你的小团体要去KTV唱歌。团里最有钱的阿凯说'我请'。你上次也被请了。这次大家都看着你——轮到你请了。一次KTV大概要500。你月零花钱300。",
    options: [
      { text: "咬牙请了，面子要紧", effects: { money: -500, shame: -1, mental: -1, debt: 200 }, result: "你请了。花呗借了200。大家玩得很开心，但你之后一个月只能吃食堂最便宜的饭。你开始觉得维持友谊很贵。" },
      { text: "提议AA", effects: { socialExp: 1, shame: 1 }, result: "'AA吧'。阿凯笑了一下说'行'。回去路上有人小声说'真小气'。你听到了。你知道AA没什么错，但你的脸还是烫的。" },
      { text: "找理由说去不了", effects: { loneliness: 2, mental: 1 }, result: "你说'家里有事'。他们去了。你刷着他们发的唱歌视频，感觉自己被世界关在了外面。但你的钱还在。" }
    ],
    review: null
  },

  // ==========================================
  // 大学期 (19-24) — 18 events
  // ==========================================

  {
    id: "col_first_salary",
    stage: ["college"],
    type: "life",
    title: "第一份实习工资",
    trigger: "贪念",
    text: "你拿到了人生第一份实习工资——3500块。你想给妈妈买个礼物，也想买一直想要的耳机，还想请好朋友吃饭。但3500不够做完所有事。",
    options: [
      { text: "全给妈妈", effects: { money: -3500, familyTrust: 2, loneliness: 1 }, result: "妈妈收到转账后给你回了句'傻孩子，自己留着花'。她还是收了。你吃了一个月泡面，但心里暖暖的。" },
      { text: "给自己买耳机，剩下的存着", effects: { money: -800, mental: 1 }, result: "你戴着新耳机走在校园里，觉得整个世界都好听了。你学会了一件事：偶尔对自己好一点，不需要内疚。" },
      { text: "三样都做一点", effects: { money: -3200, familyTrust: 1, trust: 1 }, result: "你给妈妈买了丝巾（200），买了平价耳机（150），请朋友吃了馆子（300），剩下的存起来。钱虽然不够做最好的版本，但够做一个不错的版本。" }
    ],
    review: null
  },
  {
    id: "col_training_loan",
    stage: ["college"],
    title: "大厂直通车",
    trigger: "焦虑",
    text: "秋招焦虑。一个'IT培训机构'在学校做宣讲：'包就业，进不了大厂全额退款。学费2万，可以签培训贷，工作后再还。'现场很多人签了。你室友老张说：'要不一起报？'",
    options: [
      { text: "跟老张一起签了", effects: { debt: 20000, mental: -2, risk: 2, shame: 1 }, result: "课程质量极差，老师照着PPT念。'包就业'的意思是推荐你去外包公司。你背上了2万培训贷，老张也是。你们在宿舍里互相骂自己傻。", isScam: true, loss: 20000 },
      { text: "说回去考虑考虑", effects: { awareness: 1, mental: 1 }, result: "回去搜了搜，满屏差评。你犹豫了三天，最终没去。老张去了。半年后老张跟你说那是他'大学最后悔的事'。" },
      { text: "自己学，不报班", effects: { digitalSkill: 2, mental: 1 }, result: "你开始自学，在B站上找免费教程。学得慢，但你学到的每一行代码都是你自己的。秋招的时候你没进大厂，但进了一家还不错的公司。" }
    ],
    review: "复盘：'包就业'和'先学后付'——培训贷的两个魔术关键词。合同里的字比宣讲会上的承诺重要一万倍。但更深层的问题是：焦虑让你把判断力交给了别人。"
  },
  {
    id: "col_roommate_borrow",
    stage: ["college"],
    type: "life",
    title: "室友借钱",
    trigger: "亲情",
    text: "室友阿杰跟你借2000块，说家里出了点事，月底就还。你们关系不错。你有2000，但那是你下个月的生活费。",
    options: [
      { text: "借了", effects: { money: -2000, familyTrust: 1, trust: -1 }, result: "你借了。月底阿杰没还，说'再等等'。又过了两个月才还。那两个月你吃了很多泡面。你没催他——但你们之间多了一层说不清的东西。" },
      { text: "只借1000", effects: { money: -1000, trust: 1, socialExp: 1 }, result: "你说'我手头也紧，只能借1000'。阿杰说谢谢。一个月后他准时还了。你觉得这个数字刚好——帮了忙也没把自己搭进去。" },
      { text: "说最近自己也没钱", effects: { trust: -1, shame: 1, loneliness: 1 }, result: "阿杰说'哦，那没事'。之后几天你们说话都有点尴尬。你不确定自己是不是做错了——你确实有钱，你只是不想借。这算自私吗？" }
    ],
    review: null
  },
  {
    id: "col_online_love",
    stage: ["college"],
    title: "完美恋人",
    trigger: "孤独",
    text: "你在社交平台上认识了一个人。TA说在新加坡做金融，照片好看，声音好听。每天早安晚安，比你前任用心多了。三个月了，你还没见过面。TA说：'我做的这个投资平台收益特好，带你一起赚点零花钱？'",
    options: [
      { text: "TA对我这么好，投5000试试", effects: { money: -5000, trust: -3, loneliness: 2, mental: -2, greed: 1 }, result: "你投了5000，平台显示赚了2000。你想提现时说要'充值解锁'。你又充了3000。然后平台打不开了。TA还在安慰你'很快修好的'——直到TA也消失了。你丢了钱。但更疼的是——你相信了三个月的人，从头到尾不存在。", isScam: true, loss: 8000, flag: "romance_scam_victim" },
      { text: "只谈感情不谈钱", effects: { awareness: 1, loneliness: -1, trust: -1 }, result: "你拒绝了。TA说'我只是想让你过得好'。你信了。但TA提钱的频率越来越高。直到有一天你发现TA的照片在另一个骗局曝光帖里。你对着手机屏幕看了很久。" },
      { text: "以图搜图TA的照片", effects: { awareness: 2, digitalSkill: 1, loneliness: 1 }, result: "你搜了TA的照片——一个新加坡模特的公开图。你盯着搜索结果看了十分钟。然后你一条条删掉了你们的聊天记录。你没有哭。但你很久没有再相信网上的'偶遇'了。" }
    ],
    review: "复盘：杀猪盘不是骗你一天。它花三个月养你的感情，让你自愿把钱交出来。TA的每一句'早安'都是一笔投资——投在你的信任上。"
  },
  {
    id: "col_fake_customer",
    stage: ["college"],
    title: "你的快递出了问题",
    trigger: "恐惧",
    text: "你收到电话：'你在XX平台买的化妆品质量抽检不合格，我们赔偿你双倍金额。'你确实前两天买了化妆品。对方能报出你的订单号和收货地址。你想——这也太巧了吧？但也许是真的？",
    options: [
      { text: "配合理赔，下载了TA发的APP", effects: { money: -3000, digitalSkill: -1, trust: -2, awareness: -1 }, result: "APP里让你填银行卡信息'接收退款'。你填了。卡里3000块被转走了。你看着余额从3200变成200的那一刻，手都在发抖。", isScam: true, loss: 3000 },
      { text: "说我自己去APP上看看", effects: { awareness: 2, digitalSkill: 1 }, result: "你打开购物APP，订单状态一切正常。你回拨那个号码——关机了。你松了一口气，但你在想：他怎么知道我的订单号？你开始怀疑自己的信息到处在被卖。" },
      { text: "将信将疑地听着，但不给任何信息", effects: { awareness: 1, mental: 1 }, result: "你说'我先核实一下再说'。对方急了：'超过24小时就不能赔了。'——越急越有问题。你挂了电话。你不确定它是不是假的，但你的犹豫救了你。" }
    ],
    review: "复盘：骗子知道你的订单信息——这不代表他们是真客服。你的数据在灰色产业链里只值几毛钱。任何让你'下载APP'的退款都是假的。"
  },
  {
    id: "col_campus_loan",
    stage: ["college"],
    title: "iPhone的代价",
    trigger: "面子",
    text: "室友们都换了新iPhone。一个学长说他有'渠道'，0首付分期，什么平台都能过。你的手机还能用，但屏幕有裂痕。每次拍照都有一道缝。",
    options: [
      { text: "0首付拿了新手机", effects: { money: 5000, debt: 12000, greed: 1, risk: 2, mental: -1 }, result: "你拿到了新手机，拍照终于清晰了。但分期利率是你没仔细看的——年化36%。到毕业你还了1万8。用一台手机的价格买了三台手机的债。", isScam: true, loss: 13000 },
      { text: "买一台二手的", effects: { money: -2000, digitalSkill: 1, mental: 1 }, result: "你在闲鱼上找了一台9成新的，便宜了一半。有几道使用痕迹，但你贴上手机壳谁也看不出来。你学会了一件事：面子和里子之间，差着一个手机壳的距离。" },
      { text: "不换了，凑合用", effects: { mental: 1, loneliness: 1, shame: 1 }, result: "你继续用那台裂屏手机。有人问你怎么不换，你说'还能用'。其实你知道——不是不想换，是不想为了一台手机欠债。这个决定在当时看起来有点寒酸，但它是你做过的最聪明的事之一。" }
    ],
    review: "复盘：0首付不是'免费'——是'把你不敢看的利息藏在合同第8页'。校园贷的利率，是正规银行的10倍。"
  },
  {
    id: "col_ticket_refund",
    stage: ["college"],
    title: "航班取消",
    trigger: "恐惧",
    text: "回家的机票刚买好，你就收到短信：'您的航班因故取消，请拨打400-XXXX办理退改签。赔偿300元。'你查了下短信里的航班号——确实是你买的那班。是真的取消了还是诈骗？你不确定。",
    options: [
      { text: "拨打短信里的400电话", effects: { money: -2000, trust: -2, mental: -1, awareness: -1 }, result: "'客服'让你转一笔'验证金'才能退款。你觉得不对但已经操作到一半了。你转了2000。然后你在航空公司官方APP上看到——航班没有取消。你呆住了。", isScam: true, loss: 2000 },
      { text: "打航空公司官方电话", effects: { awareness: 2, digitalSkill: 1 }, result: "官方说航班正常。你问那个400号码是什么，客服说'我们不会用那个号码联系旅客'。你庆幸自己多打了一个电话。但你在想：如果航班真的取消了呢？你还是会先慌。" },
      { text: "去APP上自己查", effects: { awareness: 1, digitalSkill: 1 }, result: "APP上显示航班正常。你把那条短信截图保存，标记了诈骗号码。你没有慌——不是因为你聪明，是因为你养成了'先查再信'的习惯。" }
    ],
    review: "复盘：骗子可以精确知道你的航班信息。这意味着你的购票数据被泄露了。但比数据泄露更危险的是——你在慌张时会忘记核实。"
  },
  {
    id: "col_scholarship",
    stage: ["college"],
    title: "你配得上好事吗",
    trigger: "权威",
    type: "false_alarm",
    text: "辅导员在群里通知你获得了国家励志奖学金——5000元。你高兴得不行。第二天你收到一个电话说是'教育局'的：'你的奖学金需要填写银行信息才能发放。'你不确定这是真的流程还是骗子。",
    options: [
      { text: "在电话里提供银行卡信息", effects: { money: -3000, awareness: -1, trust: -2, shame: 2 }, result: "你给了卡号和验证码。卡里3000块被转走了。奖学金还是正常发的——通过学校账户，根本不需要你提供信息。你哭了一晚上：好事被坏人利用来骗你。", isScam: true, loss: 3000 },
      { text: "问辅导员怎么领奖学金", effects: { awareness: 2, socialExp: 1 }, result: "辅导员说奖学金直接打到学校登记的银行卡里，不需要任何额外操作。你心里的石头落了地。5000块到账的那天你请室友吃了顿烧烤。" },
      { text: "不相信，什么都不做", effects: { awareness: 1, trust: -1, money: 5000 }, result: "你无视了那个电话。奖学金正常到账了。但你有一瞬间犹豫过——万一是真的流程，我不配合怎么办？你开始意识到，当好事发生的时候，你会怀疑自己是否配得上。" }
    ],
    review: "复盘：骗子利用的不只是你的恐惧——也利用你的喜悦和不确定感。当好事降临时保持清醒，和当坏事来临时保持冷静一样重要。"
  },
  {
    id: "col_boss_wechat",
    stage: ["college"],
    title: "导师的微信",
    trigger: "权威",
    text: "晚上11点，你收到导师的微信消息：'我在开会不方便打电话，你帮我买2000元的超市购物卡，明天课题经费给你报销。急。'头像和名字都是你导师的。你导师确实经常临时交代事情。",
    options: [
      { text: "导师的话，赶紧办", effects: { money: -2000, shame: 2, trust: -1, awareness: -1 }, result: "你买了购物卡把卡号发过去了。第二天问导师，导师说'我没发过这个消息'。你看着聊天记录——头像一模一样，名字一模一样。2000块没了。你不敢跟任何人说。", isScam: true, loss: 2000 },
      { text: "打导师电话确认", effects: { awareness: 2, socialExp: 1 }, result: "导师接了电话，语气迷糊——刚睡醒。'我没发过这个消息。'你回头看那个微信号——头像是复制的，但微信ID不对。你背后冒了一身冷汗。但你打了那个电话。这是值得的。" },
      { text: "先答应再说，明天当面给", effects: { awareness: 1, socialExp: 1 }, result: "你回了句'好的老师，明天当面给您'。对方没有再回。第二天导师说没发过消息。你庆幸自己'拖'了一下。'不着急'是你最好的武器。" }
    ],
    review: "复盘：你不是因为蠢才差点被骗——而是因为尊敬导师。骗子利用的恰恰是你的好品质：服从权威、雷厉风行、信任师长。"
  },
  {
    id: "col_crypto_group",
    stage: ["college"],
    title: "财富自由群",
    trigger: "贪念",
    text: "你被拉进一个'区块链交流群'。群里每天有人晒收益截图，日赚几千。一个'学长'私信你：'我大四就靠这个赚了20万。你先投1000体验一下。'你刚实习赚了点钱。",
    options: [
      { text: "1000块试试水", effects: { money: -1000, greed: 2, risk: 1 }, result: "你投了1000。APP上显示赚了500。你兴奋了一整天。想提现时被告知要'升级VIP'再充2000。你充了。然后APP打不开了。你损失了3000块和一整周的心情。", isScam: true, loss: 3000 },
      { text: "潜水观察一阵子", effects: { awareness: 1, socialExp: 1 }, result: "你看了两周。发现晒收益的永远是那几个人，新人提问就被引导'先投了再说'。你退了群。那个'学长'后来在朋友圈卖的东西从区块链换成了面膜——他什么都卖，因为他本身就是'产品'的一部分。" },
      { text: "直接退群", effects: { awareness: 1, trust: -1 }, result: "你退了。但你不确定自己是'聪明'还是'胆小'。同学小王投了，说赚了。你有点酸。——三个月后小王亏了8000，你酸不起来了。" }
    ],
    review: "复盘：投资群里的'收益截图'制造成本为零。'先投1000试试'不是让你体验，是让你上钩。真正赚钱的人不会在群里拉人头。"
  },
  {
    id: "col_resume_screen",
    stage: ["college"],
    title: "视频面试",
    trigger: "焦虑",
    text: "你投了很多简历，终于有一个不错的公司回复了。HR说需要视频面试，但要求你开屏幕共享'测试网络连接'。你紧张得要命，不想搞砸这次机会。",
    options: [
      { text: "开吧，不能让人觉得不配合", effects: { money: -5000, digitalSkill: -1, trust: -2, shame: 2 }, result: "屏幕共享期间，对方引导你打开银行APP'验证身份'。你的验证码被看到了，5000块被转走。你不敢相信——你是怕失去一个工作机会，结果失去了比工资更多的钱。", isScam: true, loss: 5000 },
      { text: "拒绝屏幕共享，说不方便", effects: { awareness: 2, digitalSkill: 1, mental: -1 }, result: "对方说'那面试无法进行'。你很慌——如果这是真公司呢？你搜了搜公司名字，发现根本不存在。松了口气的同时你有点后怕：如果你更着急一点，你会不会就妥协了？" },
      { text: "说可以面试但不共享屏幕", effects: { awareness: 1, socialExp: 1 }, result: "你说'可以视频但不开共享'。对方挂了电话。你查了那个公司——注册两天前的空壳。你学到了：真正想招你的公司，不会要求看你的屏幕。" }
    ],
    review: "复盘：面试从不需要屏幕共享。但这不是一个关于'共享屏幕'的故事——是一个关于'你有多害怕失去机会'的故事。越焦虑的人，越容易被'机会'绑架。"
  },
  {
    id: "col_breakup_money",
    stage: ["college"],
    title: "前任的账",
    trigger: "亲情",
    type: "life",
    text: "分手三个月了。前任突然发来消息：'你还记得你欠我那2000块吗？我现在急用。'你记得——在一起的时候确实花了TA的钱。但你觉得恋爱里的花费不该算这么清。",
    options: [
      { text: "转了2000", effects: { money: -2000, mental: -1 }, result: "你转了。对方收了钱，什么也没说。你也什么都没说。你不知道这2000块买断的是亏欠还是关系。但你不想欠任何人了。" },
      { text: "说恋爱中花的钱不该这样算", effects: { trust: -1, mental: -1, socialExp: 1 }, result: "你说了你的想法。对方说'果然就是这种人'。你们大吵了一架然后互删了。你不确定谁对谁错。也许答案不是'谁对'而是'你想成为什么样的人'。" },
      { text: "转1000，说这是自己能力范围", effects: { money: -1000, mental: 1, socialExp: 1 }, result: "你转了1000并说'多的我确实没有了'。对方没有再说什么。你觉得这个数字不完美，但你不完美。这就是生活。" }
    ],
    review: null
  },
  {
    id: "col_wechat_scan",
    stage: ["college"],
    title: "帮个忙呗",
    trigger: "面子",
    text: "食堂门口有人说：'同学帮个忙，微信扫一下这个码，我在做毕设需要数据。扫了送瓶水。'你赶着去上课。",
    options: [
      { text: "扫了，顺手的事", effects: { risk: 2, awareness: -1 }, result: "你扫了。不知不觉授权了一个APP登录你的微信。一周后你的微信给所有好友群发了赌博广告。你花了一个下午跟朋友解释'不是我发的'。", isScam: true, loss: 0 },
      { text: "笑着说'不好意思来不及了'", effects: { socialExp: 1 }, result: "你走了。那瓶水你不需要。但你犹豫了一秒——'帮个忙'这三个字真的很有力量。你只是刚好在赶时间。" },
      { text: "问了句'扫什么码'", effects: { awareness: 1, digitalSkill: 1 }, result: "对方说不清楚。你说'那我不扫了'。TA的表情变了。你发现真正需要帮助的人会解释清楚——而骗子不会。" }
    ],
    review: "复盘：扫码三秒，后果三天。但最值得想的是——'帮个忙'为什么这么难拒绝。因为我们被教育要做一个'好人'。骗子就是利用这一点。"
  },
  {
    id: "col_credit_first",
    stage: ["college"],
    title: "第一张信用卡",
    trigger: "便利",
    type: "life",
    text: "银行在学校设了摊位，办信用卡送行李箱。额度1万。你从来没用过信用卡。室友说：'办一个又不一定用，行李箱不要白不要。'",
    options: [
      { text: "办了，拿了行李箱", effects: { money: 0, risk: 1, greed: 1 }, result: "你办了。第一个月消费了200。第二个月500。第三个月你开始分期了。一年后你欠了8000。那个行李箱你只用了一次。——它是'免费'的，但你的消费习惯从此改变了。" },
      { text: "不办了，我还不需要", effects: { mental: 1, greed: -1 }, result: "室友拿着新行李箱炫耀。你看了看自己的旧书包，觉得还能用。你不知道你躲过了什么——因为你不需要信用额度来制造购买力。至少现在不需要。" },
      { text: "办了但冻结不用", effects: { digitalSkill: 1, socialExp: 1 }, result: "你拿了行李箱，但信用卡放在抽屉里从来没用。毕业的时候你注销了它。你学会了一件事：不是所有'免费'的东西都需要打开。" }
    ],
    review: null
  },
  {
    id: "col_real_opportunity",
    stage: ["college"],
    title: "看起来像骗局的机会",
    trigger: "焦虑",
    type: "false_alarm",
    text: "你收到一封邮件，说你投的某个创业比赛入围了决赛，邀请你去深圳参加。机票和酒店自费，大概要3000。你不记得投过什么创业比赛。但你确实几个月前随手填了一个报名表。",
    options: [
      { text: "肯定是骗子，不去", effects: { awareness: 1, trust: -1, socialExp: -1 }, result: "你没去。两周后你在新闻上看到那个比赛的报道——是真的。获奖的团队拿了10万种子基金。你不知道你会不会赢，但你失去了知道的机会。有时候太谨慎也有代价。" },
      { text: "花时间核实后决定去", effects: { money: -3000, socialExp: 2, awareness: 1, digitalSkill: 1 }, result: "你查了主办方、查了官网、打了组委会电话。全部核实是真的。你去了深圳。没拿到大奖，但认识了三个后来成为你创业伙伴的人。那3000块是你大学里最值的投资。" },
      { text: "回邮件要求更多证明材料", effects: { awareness: 2, socialExp: 1 }, result: "对方很快回了组委会盖章的文件和联系方式。你核实后确认了是真的。你决定去。——你学到了：谨慎不是拒绝一切，而是在行动之前多确认一步。" }
    ],
    review: "复盘：世界上确实有真正的好机会。'一律不信'和'什么都信'一样危险。关键不是信不信——而是你有没有花十分钟去核实。"
  },
  {
    id: "col_fake_refund",
    stage: ["college"],
    title: "双十一退款",
    trigger: "恐惧",
    text: "双十一刚过。你收到电话说你买的羽绒服甲醛超标要召回，双倍退款。你确实买了件便宜的羽绒服，收到后味道确实有点大。你想——难道真超标了？",
    options: [
      { text: "按对方说的操作退款", effects: { money: -2000, awareness: -1, trust: -2 }, result: "对方说退款要先'验证银行卡'。你输入了卡号和密码。2000块被转走了。你的羽绒服没有问题——但你的钱有问题了。", isScam: true, loss: 2000 },
      { text: "去购物平台上查", effects: { awareness: 2, digitalSkill: 1 }, result: "平台上没有任何召回通知。你在平台上投诉了那个电话号码。羽绒服洗了一次就没味了。" },
      { text: "犹豫着没操作", effects: { awareness: 1 }, result: "你挂了电话后犹豫了很久。'万一真超标呢？'你去平台查了——没事。但你发现自己犹豫了这么久本身就说明：骗子选了一个让你'合理怀疑'的角度。这比明显的骗局可怕多了。" }
    ],
    review: "复盘：最高级的骗术不是让你完全相信——而是让你'有点信'。当你55开的时候，恰恰是最危险的时候。"
  },
  {
    id: "col_grad_photo",
    stage: ["college"],
    type: "life",
    title: "毕业季",
    trigger: "焦虑",
    text: "大四了。室友们拿到了offer，你还在海投。有人在群里发：'简历优化服务，大厂前HR亲自改，599一次。保证面试率提升200%。'你不确定有没有用，但你真的很焦虑。",
    options: [
      { text: "花599试试", effects: { money: -599, mental: -1, socialExp: 1 }, result: "对方改了你的简历。确实比原来好看了。但面试率没什么变化——因为问题从来不在简历上，在于市场。599不算被骗，但你花了599学到了一个道理：焦虑不是用钱能解决的。" },
      { text: "找已经拿到offer的朋友帮忙看", effects: { trust: 1, socialExp: 1 }, result: "朋友帮你改了简历，还帮你内推了一个岗位。你请他吃了顿饭。最后你没拿到那个offer，但你拿到了另一个。你学到了：人脉比服务有用。" },
      { text: "自己研究怎么写", effects: { digitalSkill: 1, mental: 1 }, result: "你在网上研究了一周，把简历改了五版。最后一版被一个你没抱期望的公司看上了。你学会了一件事：焦虑的时候做具体的事——比付钱给别人管用。" }
    ],
    review: null
  },
  {
    id: "col_part_time_real",
    stage: ["college"],
    title: "家教还是外卖",
    trigger: "便利",
    type: "life",
    text: "你需要赚生活费。找到两个机会：家教，150一小时但每周只有3小时；送外卖，时间自由但风吹日晒。还有同学说可以做'网络兼职'——帮人刷信誉，一单5块。",
    options: [
      { text: "做家教", effects: { money: 1800, socialExp: 1, mental: 1 }, result: "你每周六教一个初中生数学。孩子不爱学，你也经常崩溃。但每月1800块是干净的钱。家长过年还给你包了个红包。" },
      { text: "送外卖", effects: { money: 3000, mental: -1, socialExp: 2 }, result: "你送了两个月外卖。淋过三场雨，被投诉过两次，摔过一跤。赚了6000块。你开始理解为什么外卖员在电梯里总是按关门键——因为每一秒都是钱。" },
      { text: "试试网络刷信誉", effects: { money: -300, awareness: 1, shame: 1 }, result: "你做了几单，确实收到了20块钱。然后对方说'有大单，先垫付300'。你垫了。然后你被拉黑了。你亏了280块和三天的时间。你知道了：赚钱没有捷径，有捷径的都是坑。", isScam: true, loss: 300 }
    ],
    review: null
  },

  // ==========================================
  // 初入社会期 (25-35) — 16 events
  // ==========================================

  {
    id: "work_rent_trap",
    stage: ["early_career"],
    title: "租房",
    trigger: "焦虑",
    text: "你刚到一个新城市，急着找房。看中了一套月租2000的，远低于周围房价。房东说在国外，可以先转定金3000锁定，快递钥匙。图片很真实，小区也确实存在。",
    options: [
      { text: "先转定金锁住房子", effects: { money: -3000, trust: -2, mental: -1 }, result: "你转了3000。房东说'明天寄钥匙'。然后失联了。你去那个小区问了物业——根本没有这个房东。照片是从别的平台盗的。你站在小区门口，行李箱在脚边，不知道该去哪。", isScam: true, loss: 3000 },
      { text: "坚持要实地看房", effects: { awareness: 1, socialExp: 1, money: -2500 }, result: "'房东'各种理由推脱见面。你果断放弃了。最后租了个贵500的——但你亲手接过了钥匙，打开了一扇真实的门。多花的500，买的是安心。" },
      { text: "先住青旅慢慢找", effects: { mental: 1, socialExp: 1 }, result: "你在青旅住了一周。每天下班后看房，比对价格。第八天你找到了合适的。室友说'你好有耐心'。你说'是因为我没钱交学费了'。" }
    ],
    review: "复盘：远低于市价的房源 + 不能见面的房东 = 红灯。但这不是一个智商问题——是一个'你有多着急'的问题。越着急越容易被便宜货骗。"
  },
  {
    id: "work_invest_group",
    stage: ["early_career"],
    title: "同事的'老师'",
    trigger: "贪念",
    text: "同事小周说最近跟一个'老师'学炒股，赚了2万。他说'老师'建了一个VIP群，进群费500，每天盯盘带操作。你刚工作存了点钱，想钱生钱。小周是你信得过的人。",
    options: [
      { text: "交500进群跟着操作", effects: { money: -30000, greed: 2, trust: -3, mental: -3, risk: 2 }, result: "你进了群，跟着投了3万。头两次小赚。第三次'老师'让你全仓买入——暴跌。你割肉亏了大半。小周也亏了。你们在天台抽烟，谁也不说话。'老师'退了群。", isScam: true, loss: 30000 },
      { text: "不投，但没有劝小周", effects: { awareness: 1, loneliness: 1 }, result: "你没进群。小周后来亏了5万。他来找你借钱。你借了他5000，你知道他不一定还得上。但他是你同事，你觉得这时候不能不帮。" },
      { text: "拉着小周一起分析一下这个群", effects: { awareness: 2, socialExp: 1, trust: 1 }, result: "你们查了那个'老师'——在三个平台用不同名字做'导师'。小周说'操，我差点投10万'。那天下班你们去吃了火锅。500块的入群费他当打了水漂。" }
    ],
    review: "复盘：骗你的不是群里的'老师'——是你信任的同事。不是因为同事坏，而是因为同事也被骗了。信任链是骗术最好的管道。"
  },
  {
    id: "work_fake_police",
    stage: ["early_career"],
    title: "你涉嫌洗钱",
    trigger: "恐惧",
    text: "下午三点，你在办公室接到电话：'你名下的一张银行卡涉嫌洗钱。'对方报了你的全名和身份证号。你的手心开始冒汗。你确实在网上买过东西、转过钱——万一真的出了什么问题？",
    options: [
      { text: "配合调查，按对方说的做", effects: { money: -80000, trust: -4, mental: -4, shame: 4, risk: 2 }, result: "你被'引导'了三天。对方让你保密，让你转钱到'安全账户'。你转了8万——全部积蓄。第四天你清醒了。你请了一天假，去派出所报案。民警说'你不是第一个'。你没有因此好受一点。", isScam: true, loss: 80000, flag: "police_scam_victim" },
      { text: "挂掉打110确认", effects: { awareness: 3, socialExp: 1, mental: 1 }, result: "110说这是冒充公检法诈骗。你松了口气。但你在想——如果你那天更慌一点、更累一点、刚好跟人吵了架——你可能就信了。你给你妈打了个电话讲了这件事。" },
      { text: "慌了，但先告诉了旁边的同事", effects: { familyTrust: 1, awareness: 2, socialExp: 1 }, result: "同事说'这百分百是骗子，我上周也接到了'。你挂了电话。那天晚上你查了冒充公检法诈骗的案例，看了两个小时。你在害怕的不是骗子——是你差一点就信了。" }
    ],
    review: "复盘：公安不会电话办案，不会要求转账到'安全账户'。但真正需要记住的是：骗子利用的不是你的无知，是你的恐惧。恐惧会让最聪明的人做出最蠢的决定。"
  },
  {
    id: "work_side_hustle",
    stage: ["early_career"],
    title: "副业焦虑",
    trigger: "焦虑",
    type: "life",
    text: "你的工资是8000。房租3000，吃饭2000，剩下的所剩无几。朋友圈有人晒副业月入过万。你的同事开始做微商、炒基金、写公众号。你觉得只靠工资是不是不够了。",
    options: [
      { text: "花3800加入一个'副业训练营'", effects: { money: -3800, greed: 1, mental: -1 }, result: "训练营教你'引流、变现、私域运营'。你认真学了两个月，发了50条朋友圈，成交0单。你发现：大部分教你赚钱的人，都是靠教你赚钱来赚钱的。" },
      { text: "用下班时间做自己擅长的事", effects: { money: 2000, digitalSkill: 1, mental: 1 }, result: "你开始用晚上时间帮人做PPT和设计。第一个月赚了500。第六个月赚了3000。不是暴富，但是稳定的。你学到了：副业不是另一份工作，是你已有技能的延伸。" },
      { text: "不搞副业，专注主业", effects: { mental: 1, socialExp: 1 }, result: "你把精力放在了工作上。年底升了一级，工资涨到了1万。涨幅比大多数副业赚的还多。你悟了——在一个地方深挖往往比到处浅刨更有效。" }
    ],
    review: null
  },
  {
    id: "work_ai_face_call",
    stage: ["early_career"],
    title: "视频那头真的是TA吗",
    trigger: "权威",
    text: "合作伙伴突然发来视频通话。画面里是TA的脸、TA的声音：'项目急用一笔周转资金，你先帮我转10万，明天转回来。'你们确实有合作项目。但TA从来没跟你借过钱。",
    options: [
      { text: "视频看得清清楚楚，转了", effects: { money: -100000, trust: -4, mental: -3, awareness: -2 }, result: "你转了10万。打电话给对方——'我没打过视频给你啊'。AI换脸。你的10万块交给了一段你分不清真假的视频。你开始怀疑所有'看到的'东西。", isScam: true, loss: 100000 },
      { text: "说'这么大金额我们见面聊'", effects: { awareness: 2, socialExp: 1 }, result: "对方说'来不及了'。你坚持。对方挂了。你打给合伙人——他说没打过视频。你愣住了：一个你亲眼'看到'的人，不是真的。这件事改变了你对'眼见为实'的理解。" },
      { text: "挂掉视频打电话确认", effects: { awareness: 3, digitalSkill: 2 }, result: "合伙人接了电话：'我没找你转钱。'你把视频通话的截图发给了他。你们都被吓到了——AI可以在实时视频里变成任何人。从此你们约定：涉及钱的事只线下谈。" }
    ],
    review: "复盘：AI换脸不是科幻——它现在就能在实时视频里把任何人变成另一个人。'我亲眼看到了'不再是证据。从今以后，大额转账只认线下见面。"
  },
  {
    id: "work_wedding",
    stage: ["early_career"],
    type: "life",
    title: "红色炸弹",
    trigger: "面子",
    text: "这个月你收到了三份请帖。两个大学同学结婚，一个同事生孩子。每个礼金至少500。你这个月信用卡已经花了不少。",
    options: [
      { text: "全去，每个包600", effects: { money: -1800, trust: 1, mental: -1, debt: 500 }, result: "你去了三场。喝了很多酒，说了很多'百年好合'。信用卡又多了500的分期。你在想：什么时候人情变成了负债？" },
      { text: "只去最好的朋友那个，其他转账", effects: { money: -1300, socialExp: 1, mental: 1 }, result: "你去了一场，另外两个微信转了礼金。有人说你'不给面子'。你很在意，但你告诉自己：我去了我最重要的那场。" },
      { text: "都发红包意思一下", effects: { money: -600, shame: 1, trust: -1 }, result: "你每个发了200红包。省了钱，但你总觉得少了什么。你知道人情社会的规则——但你也知道，你现在的钱，一分一毫都是自己赚的。" }
    ],
    review: null
  },
  {
    id: "work_screen_share",
    stage: ["early_career"],
    title: "银行来电",
    trigger: "恐惧",
    text: "'银行客服'打来电话：你的信用卡被盗刷了3000元，需要配合处理。你查了一下——信用卡确实在上个月有一笔不记得的消费。对方说：'请下载我们的安全软件进行屏幕共享，我来帮您操作冻结。'",
    options: [
      { text: "配合共享屏幕", effects: { money: -15000, digitalSkill: -1, trust: -2, shame: 2 }, result: "你共享了屏幕。对方让你打开银行APP'验证身份'。你输入密码的时候对方全都看到了。15000被转走了——比那笔'盗刷'多了5倍。", isScam: true, loss: 15000 },
      { text: "挂掉自己打银行客服电话", effects: { awareness: 2, digitalSkill: 1 }, result: "你打了银行卡背面的客服电话。客服说那笔消费是你自己买的一个APP订阅——你忘了。虚惊一场。但如果你没有自己打这个电话..." },
      { text: "先拒绝屏幕共享", effects: { awareness: 2, digitalSkill: 1 }, result: "你说'我不会共享屏幕'。对方说'那没办法帮你冻结'。你说'那我去柜台'。对方挂了。——如果真是银行，他们不会挂你电话。" }
    ],
    review: "复盘：这次骗子用了一个'真实的疑点'来钓你——你卡上确实有不明消费。当你对自己的账户有疑问时，更容易相信'来帮你的人'。但帮你的人不需要看你的屏幕。"
  },
  {
    id: "work_parents_visit",
    stage: ["early_career"],
    type: "life",
    title: "爸妈来了",
    trigger: "亲情",
    text: "爸妈第一次来你工作的城市看你。你租的房子很小，家具都是二手的。妈妈看了看你的冰箱——几乎是空的。爸爸什么都没说。你想请他们去好一点的餐厅吃饭，但你的卡里只剩4000块。",
    options: [
      { text: "带他们去好餐厅，花了1500", effects: { money: -1500, familyTrust: 1, mental: -1 }, result: "你们吃得很好。妈妈说'你在这过得不错嘛'。你笑着说是的。送他们走的时候，你在地铁里算——这个月要省着点了。但看到妈妈发朋友圈说'闺女/儿子请吃饭啦'，你觉得值了。" },
      { text: "在家做饭", effects: { money: -200, familyTrust: 2, mental: 1 }, result: "你去超市买了菜，做了四菜一汤。厨艺一般，但爸妈吃得很认真。妈妈洗碗的时候说'你长大了'。你站在厨房门口，眼眶有点热。" },
      { text: "实话实说你最近比较紧", effects: { money: -300, familyTrust: 1, shame: 1 }, result: "爸爸沉默了一会儿，从口袋里掏出3000块塞给你。你不想收。推来推去最后收了。你不知道该高兴还是难过——你想让他们放心，但你还在让他们操心。" }
    ],
    review: null
  },
  {
    id: "work_loan_sms",
    stage: ["early_career"],
    title: "低息贷款",
    trigger: "焦虑",
    text: "你想买车。银行利率5%。你收到短信：'恭喜获得白金客户专享低息贷款，年化3.2%，额度50万。'你知道有些银行确实有VIP通道。这个3.2%如果是真的，能省不少钱。",
    options: [
      { text: "点链接申请", effects: { money: -8000, risk: 2, trust: -1 }, result: "填了资料后'客服'说要交8000保证金才能放款。你交了。然后——没有然后了。你损失了8000块和两天的希望。", isScam: true, loss: 8000 },
      { text: "去银行柜台问", effects: { awareness: 1, socialExp: 1 }, result: "银行说你没有专属额度。但大堂经理帮你算了一下，说你符合一个4.1%的优惠方案。你用正规渠道贷了款，利率虽然不是3.2%，但你的钱是安全的。" },
      { text: "不管它，按原计划来", effects: { awareness: 1, mental: 1 }, result: "你删了短信，按5%贷了款。多付的利息你算了一下——一年也就多2000。你愿意为'确定性'付费。" }
    ],
    review: "复盘：3.2%和5%的差距能让你犹豫——这就够了。骗子不需要你确信，只需要你'觉得有可能'。差价越诱人，越值得验证。"
  },
  {
    id: "work_marriage_pressure",
    stage: ["early_career"],
    type: "life",
    title: "相亲",
    trigger: "孤独",
    text: "妈妈又催你相亲了。你在APP上认识了一个人，聊得不错。第一次见面TA说'我觉得咱俩挺合适的，下次一起去看个电影？'你已经单身三年了。",
    options: [
      { text: "去，开心就好", effects: { loneliness: -2, trust: 1, money: -200 }, result: "你们一起看了电影，吃了饭。TA真的不错。你走在回家的路上，觉得这个城市好像没那么冷了。不是每次放下防备都会受伤的。" },
      { text: "再多了解一段时间", effects: { loneliness: -1, awareness: 1 }, result: "你说'不着急，再聊聊'。TA说'好'。你们又聊了一个月。有时候慢一点的开始，反而走得更远。" },
      { text: "算了，我还是喜欢一个人", effects: { loneliness: 2, mental: 1 }, result: "你拒绝了。TA说'好吧，祝你顺利'。你躺在床上看天花板，觉得自由很好。但自由有时候也很安静。" }
    ],
    review: null
  },
  {
    id: "work_tax_refund",
    stage: ["early_career"],
    title: "退税短信",
    trigger: "贪念",
    text: "你收到短信：'您有一笔3842元个税退税待领取，请在24小时内点击链接申请。'你上个月确实在个税APP上看到过退税相关的提示。3842跟你估算的数字差不多。",
    options: [
      { text: "点链接填信息", effects: { money: -5000, awareness: -1, trust: -2 }, result: "网站跟官方的长得一模一样。你填了银行卡和密码。5000块被转走了——比那笔退税还多。你对着手机屏幕发了五分钟呆。", isScam: true, loss: 5000 },
      { text: "去个税APP上自己操作", effects: { awareness: 2, digitalSkill: 1 }, result: "你打开了官方个税APP。退税确实有——3842块。你在官方渠道提交了申请。钱几天后到账了。你删了那条短信。" },
      { text: "先不急，等等看", effects: { awareness: 1 }, result: "你没点链接。第二天你在个税APP上操作了退税。3842块到了你的卡上。你心想：如果昨天急着点了链接，现在少的不是3842，是5000甚至更多。" }
    ],
    review: "复盘：这次骗子用了一个精准的数字——3842。这说明你的税务信息可能被泄露了。但更值得想的是：退税是好事，骗子把好事变成了陷阱。"
  },
  {
    id: "work_express_cod",
    stage: ["early_career"],
    title: "到付快递",
    trigger: "便利",
    text: "你收到一个到付快递，58元。你最近网购确实买了不少东西，但不记得有到付的。快递员在门口等着。",
    options: [
      { text: "付了吧，也许是忘了的", effects: { money: -58, awareness: -1 }, result: "打开是一个一块钱的手机支架。你把它扔进了垃圾桶。58块是小钱，但你不喜欢这种被占便宜的感觉。" },
      { text: "查一下订单再说", effects: { awareness: 1, digitalSkill: 1 }, result: "你跟快递员说等一下。查了所有平台——没有这个快递。你拒收了。快递员说'最近这种挺多的'。" },
      { text: "拒收", effects: { awareness: 1 }, result: "你直接拒收了。也许里面真有你的东西，但到付不认识的——风险不值。" }
    ],
    review: null
  },
  {
    id: "work_dating_invest",
    stage: ["early_career"],
    title: "对象推荐理财",
    trigger: "孤独",
    text: "你在相亲软件上认识了一个人。TA各方面都不错，你见了三次面，感觉很好。TA说最近在做的一个投资收益不错，问你要不要一起看看。你心想——TA是正经工作的人，不像骗子。但你也听过'杀猪盘'。",
    options: [
      { text: "TA不像骗子，跟着投", effects: { money: -30000, trust: -3, loneliness: 3, mental: -3 }, result: "你投了3万。前两个月正常返息。第三个月平台'维护'。TA说'我也提不出来'——然后TA的微信变成了一条横线。你不是被一个'骗子'骗了。你是被一段'关系'骗了。", isScam: true, loss: 30000, flag: "romance_scam_deep" },
      { text: "感情归感情钱归钱", effects: { awareness: 1, trust: 1 }, result: "你说'投资的事我自己打算'。TA的态度微妙地变了。第四次约会TA没再提钱。第五次TA消失了。你松了口气又觉得难过——你不知道TA是骗子还是只是不合适。" },
      { text: "先查查这个'投资平台'", effects: { awareness: 2, digitalSkill: 1, trust: -1 }, result: "你搜了那个平台——没有任何金融牌照。你把截图发给TA。TA解释了半天。你没有再回消息。你可能冤枉了一个好人，也可能识破了一个骗子。你选择保护自己。" }
    ],
    review: "复盘：杀猪盘已经从网上搬到了线下。见了面、吃了饭、聊了感情——这些都不能证明对方是好人。'TA不像骗子'——这句话本身就是最大的风险信号。"
  },
  {
    id: "work_promotion",
    stage: ["early_career"],
    type: "life",
    title: "升职还是跳槽",
    trigger: "焦虑",
    text: "你在公司干了三年。老板暗示年底可能给你升职加薪，但没确认。另一家公司开了高30%的offer。你不知道该走还是留。",
    options: [
      { text: "拿着offer去找老板谈", effects: { money: 5000, socialExp: 2, risk: 1 }, result: "老板match了对方的offer。你留下了，钱多了。但老板心里记了一笔——以后每次有好事你都在想：如果我当时走了呢？" },
      { text: "跳了", effects: { money: 8000, socialExp: 1, trust: -1, loneliness: 1 }, result: "新公司钱多但文化不一样。你花了半年适应。你学到了：跳槽的代价不只是离开原来的人，还有重新证明自己。" },
      { text: "等老板确认", effects: { mental: -1, trust: 1 }, result: "你等了。年底老板升了你，加薪15%。比那个offer少了一半。你没有后悔的理由，但你确实想过'如果'。" }
    ],
    review: null
  },
  {
    id: "work_boss_transfer",
    stage: ["early_career"],
    title: "老板急转账",
    trigger: "权威",
    text: "周五晚上九点。微信收到'总监'的消息：'我在招待客户，你先帮我转3万到这个账户，周一报销。会议中不方便打电话。'你的总监确实经常加班招待客户。",
    options: [
      { text: "总监的话，照办", effects: { money: -30000, shame: 3, trust: -2, mental: -2 }, result: "你转了3万。周一去问总监——他一脸茫然。微信号是假的。你在卫生间里蹲了半个小时，不知道怎么跟家里人说。", isScam: true, loss: 30000 },
      { text: "打总监电话确认", effects: { awareness: 2, socialExp: 1 }, result: "总监接了：'我没发过消息。'你看了看那个微信号——头像一样，名字一样，但ID差了一个字母。你一身冷汗。——你跟总监的关系反而因为这个事变好了。" },
      { text: "回复说'好的，明天当面给您'", effects: { awareness: 1, socialExp: 1 }, result: "'总监'说'来不及了'。你说'那我实在没办法'。对方不回了。你学到了：不着急是最好的防骗工具。" }
    ],
    review: "复盘：你之所以差点被骗，不是因为你傻——是因为你尊重你的领导。'不方便打电话'是骗子最爱用的四个字，因为它切断了你唯一的验证渠道。"
  },
  {
    id: "work_friend_mlm",
    stage: ["early_career"],
    title: "老同学的饭局",
    trigger: "亲情",
    text: "失联多年的大学同学突然请你吃饭，说'叙叙旧'。吃到一半TA开始讲一个'健康产品'的事业机会——投资3万，发展下线返利。TA眼睛发光，说已经赚了20万。",
    options: [
      { text: "信了TA，投3万", effects: { money: -30000, greed: 2, trust: -2, shame: 2 }, result: "你投了3万，成了'代理'。你开始在朋友圈发广告——没人买。三个月后你明白了：你不是在做生意，你就是产品本身。你的3万块养活了你上面的人。", isScam: true, loss: 30000 },
      { text: "说你考虑一下", effects: { socialExp: 1, trust: -1 }, result: "你说考虑一下。回去搜了那个品牌——传销。你没回复TA的消息。TA又发了好几次，你都没理。一段友谊就这样结束了。你不知道该气TA骗你还是心疼TA也被骗了。" },
      { text: "当面说这像传销", effects: { awareness: 1, trust: -1, socialExp: 1 }, result: "你说了。TA脸色变了：'你不了解就别瞎说。'饭局不欢而散。你们再也没联系。——半年后你在新闻里看到那个品牌被查了。你没有打电话给TA。" }
    ],
    review: "复盘：传销的可怕不在于陌生人——在于它通过你最信任的人传播。你的老同学不是坏人，TA只是比你先被骗了。"
  },

  // ==========================================
  // 家庭事业期 (36-50) — 12 events
  // ==========================================

  {
    id: "family_child_game",
    stage: ["family_career"],
    title: "孩子的3000块",
    trigger: "亲情",
    type: "life",
    text: "你发现信用卡多了3000块游戏充值。问孩子，孩子吓得不敢说话。又问了才知道——有个'网友'教TA说是'帮家长测试退款流程'。",
    options: [
      { text: "发了一顿火", effects: { money: -3000, familyTrust: -2, mental: -1 }, result: "你骂了孩子。孩子哭了一晚上。3000块追不回来了。更糟的是——以后孩子遇到问题再也不敢跟你说了。你花了3000块，买了孩子对你的恐惧。" },
      { text: "没发火，帮孩子处理", effects: { money: -1500, familyTrust: 2, awareness: 1 }, result: "你帮孩子联系平台，退了一半。你没骂TA，而是跟TA讲了什么是社工攻击。孩子听得很认真。你知道——TA以后还会遇到骗子，但TA会先来找你。" },
      { text: "让孩子自己去找平台退款", effects: { money: -2000, familyTrust: 1, socialExp: 1 }, result: "你说'你自己的事你自己处理'。孩子研究了一天，退回了1000块。TA学到了两件事：钱是会丢的，以及丢了的钱有时候是可以找回来的。" }
    ],
    review: null
  },
  {
    id: "family_invest_platform",
    stage: ["family_career"],
    title: "稳定年化12%",
    trigger: "贪念",
    text: "朋友推荐了一个理财平台，'稳定年化12%'。你观察了三个月——朋友每月都正常提现。你有30万存款。银行理财只有3%。你心想：如果12%是真的，一年能多赚2万7。",
    options: [
      { text: "投20万", effects: { money: -200000, greed: 2, trust: -3, mental: -4, risk: 2 }, result: "前三个月正常返息。你甚至追加了一些。第五个月平台跑路。20万没了。你朋友也亏了。你们一起报了案。你晚上睡不着，一遍遍算那20万——是孩子的教育金、是还房贷的底气、是你攒了5年的安全感。", isScam: true, loss: 200000, flag: "ponzi_victim" },
      { text: "只投1万试试", effects: { money: -10000, greed: 1, awareness: 1 }, result: "你投了1万。提了两次利息。你想加仓的那天——平台跑了。你庆幸自己只投了1万。但你知道：如果平台再多活一个月，你一定会加仓。你的理性只是比贪念领先了一步。" },
      { text: "12%太高了，不投", effects: { awareness: 2, trust: 1 }, result: "你没投。朋友赚了几个月利息，有点得意。你心里有点不平衡。——直到平台跑路那天。你庆幸自己相信了一条简单的道理：高回报意味着高风险，没有例外。" }
    ],
    review: "复盘：庞氏骗局的可怕之处在于——它前期是真的给你钱。你的朋友不是在骗你，TA也是受害者。但TA的'提现成功'成了说服你的最好证据。"
  },
  {
    id: "family_child_kidnap",
    stage: ["family_career"],
    title: "你的孩子出事了",
    trigger: "亲情",
    text: "你在上班。手机响了：'你的孩子在学校摔伤了！现在在XX医院急救！需要马上转5万手术押金！'背景里有哭声和救护车的声音。你的心跳到了嗓子眼。",
    options: [
      { text: "立刻转钱", effects: { money: -50000, mental: -4, trust: -3, shame: 2 }, result: "你颤抖着转了5万。然后你打给学校——老师说孩子正在教室上课。你呆坐在办公室椅子上十分钟，什么话都说不出来。", isScam: true, loss: 50000 },
      { text: "先打学校电话确认", effects: { awareness: 2, familyTrust: 1, mental: 1 }, result: "你拨了学校的号码。老师说孩子好好的。你的手还在抖。你挂掉了骗子的电话。——但你之后花了一个小时才平静下来。因为你知道：如果孩子真的出事了，你会不假思索地转的。" },
      { text: "一边打学校电话一边往医院赶", effects: { awareness: 1, familyTrust: 1, mental: -1 }, result: "你跑出公司，一边打学校电话一边打车。老师说孩子在教室。你站在马路边，大口喘气。你没有被骗——但恐惧是真的。那天晚上你抱了孩子很久。" }
    ],
    review: "复盘：冒充'孩子出事'是最残忍的骗术——它利用的是你最无法控制的恐惧。但你只需要一个动作：先打学校电话。60秒可以验证一切。"
  },
  {
    id: "family_parent_health",
    stage: ["family_career"],
    title: "爸妈的保健品",
    trigger: "亲情",
    type: "life",
    text: "过年回家，你发现爸妈买了一柜子保健品——'健康讲座'上买的，一套8800元。他们说这个胶囊能降血压。你查了——没有任何药效认证。但爸妈很认真地说：'讲座上的教授说的。'",
    options: [
      { text: "发了脾气让他们退货", effects: { familyTrust: -2, mental: -1 }, result: "你说'这就是骗人的！'爸妈不高兴了。爸爸说'你管不着'。那顿年夜饭气氛很差。你知道你是对的——但你的方式是错的。" },
      { text: "耐心地跟他们解释", effects: { familyTrust: 1, awareness: 1, mental: -1 }, result: "你在手机上查了食药监的信息给他们看。妈妈半信半疑。爸爸嘟嘟囔囔的。你知道一次谈话不够——但至少你种了一颗种子。你答应以后每周打一次电话。" },
      { text: "帮他们装反诈APP，带去做正规体检", effects: { familyTrust: 2, digitalSkill: 1, money: -2000 }, result: "你花了2000带他们去三甲医院做了全面体检。医生说他们身体还行，不需要这些保健品。回家后你帮他们装了国家反诈中心APP。妈妈说'你比那些推销员关心我们多了'。你鼻子酸了一下。" }
    ],
    review: "复盘：爸妈买保健品，不是因为他们傻——而是因为你不常回家。那些推销员每天陪他们聊天、量血压、叫他们'叔叔阿姨'。你能做到吗？"
  },
  {
    id: "family_school_fee",
    stage: ["family_career"],
    title: "家长群里的班主任",
    trigger: "权威",
    text: "你在孩子的班级家长群里看到'班主任'发了一条消息：'各位家长，学校要缴纳课外辅导材料费1280元，请扫码支付。'你看了看——头像和名字跟真的班主任一模一样。已经有3个家长说'转了'。",
    options: [
      { text: "赶紧转了，别漏了", effects: { money: -1280, awareness: -1 }, result: "你是第四个转的。半小时后真正的班主任出来说'群里有骗子'。6个家长被骗了。你去看那个'班主任'——头像一样但微信号不同。你想起来自己刷消息时太快了，根本没注意。", isScam: true, loss: 1280 },
      { text: "私信真正的班主任确认", effects: { awareness: 2, familyTrust: 1, socialExp: 1 }, result: "你私信了班主任。班主任说没有这个费用。你在群里说了一声'大家先别转，我跟老师确认了没有这个收费'。骗子被踢出了群。有家长感谢你。" },
      { text: "等等看其他家长怎么说", effects: { awareness: 1 }, result: "你看到3个人已经转了，犹豫了。正要转的时候，有家长问了一句'能不能到学校交'。这一问打破了节奏——真班主任出来辟谣了。你没转。但你知道：如果没人问那一句，你就转了。" }
    ],
    review: "复盘：群里已经有3个人'转了'——这是最致命的。我们天生相信'别人已经做了的事是安全的'。骗子需要做的，只是先搞定前三个人。"
  },
  {
    id: "family_ai_boss",
    stage: ["family_career"],
    title: "老板的视频电话",
    trigger: "权威",
    text: "你收到老板的视频电话。画面声音都是TA：'有笔紧急款需要你处理，先从你的账户转20万到供应商，下午给你报销。'你们公司确实有这种紧急情况。但20万不是小数目。",
    options: [
      { text: "老板亲自打的视频，照办", effects: { money: -200000, trust: -4, mental: -4, shame: 4 }, result: "你转了20万。去办公室找老板——TA在开会，根本没打过视频。这是AI换脸。你20万没了。你崩溃了——你亲眼看到了TA的脸，听到了TA的声音，但那不是TA。", isScam: true, loss: 200000 },
      { text: "说我走公司流程，不能个人转", effects: { awareness: 2, socialExp: 2 }, result: "'老板'说'来不及了'。你说'那也得走流程'。对方挂了。你打给老板——'我没打视频给你'。你后来跟公司提议：所有涉及转账的指令必须双人确认。" },
      { text: "挂掉视频去找老板当面确认", effects: { awareness: 3, digitalSkill: 1 }, result: "老板在办公室说'什么视频？'你们都被吓到了。你给公司做了一次AI换脸的科普分享。同事们半信半疑——直到你播放了一段AI生成的老板讲话。会议室安静了。" }
    ],
    review: "复盘：2026年了，'我亲眼看到'不再是证据。AI换脸可以实时伪造任何人的面孔和声音。你能做的只有一件事：涉及大额转账，永远当面确认。"
  },
  {
    id: "family_midlife",
    stage: ["family_career"],
    type: "life",
    title: "中年困局",
    trigger: "焦虑",
    text: "房贷还有15年。孩子上学花钱越来越多。你和配偶最近总是为钱吵架。你刷到一个广告：'国际认证理财师课程，学了之后自己打理资产。报名费12800。'你觉得也许该学学理财了。",
    options: [
      { text: "报了名", effects: { money: -12800, digitalSkill: 1, mental: -1 }, result: "课上了。内容一半是常识一半是推销。最后让你开个交易账户'实操'。你没开。但那12800的课——你本来可以拿它还一个月房贷。" },
      { text: "自学理财基础", effects: { digitalSkill: 2, mental: 1 }, result: "你在网上找了免费的理财课。学了基本的资产配置。你调整了家庭的保险和基金配比。没花一分钱，但你的钱开始按你理解的方式运转了。" },
      { text: "和配偶坐下来认真聊一次", effects: { familyTrust: 2, mental: 1 }, result: "你们摊开了所有账目。你才发现：问题不是钱不够，而是你们从来没对过账。你们列了一张表，第一次像合伙人一样管理家庭财务。" }
    ],
    review: null
  },
  {
    id: "family_crypto",
    stage: ["family_career"],
    title: "朋友的币",
    trigger: "贪念",
    text: "多年好友说他买的XX币翻了10倍：'你也快买，还能再涨！'他确实买了新车。你有20万闲钱。配偶说'不要碰那些东西'。但10倍啊。",
    options: [
      { text: "瞒着配偶投10万", effects: { money: -60000, trust: -2, familyTrust: -2, mental: -2 }, result: "你投了。前两个月涨了。第三个月暴跌——你亏了6万。你不敢告诉配偶。你开始失眠。一个月后配偶发现了。那一周比亏钱更难受。", isScam: true, loss: 60000 },
      { text: "跟配偶商量后投2万", effects: { money: -8000, familyTrust: 1, awareness: 1 }, result: "你们商量后投了2万——亏得起的数字。结果亏了8000。你难过了两天。但你们没吵架，因为这是一起做的决定。你学到了：投资最重要的不是赚多少——是你能承受亏多少。" },
      { text: "不投", effects: { awareness: 1, loneliness: 1, greed: -1 }, result: "你没投。朋友赚了的时候你酸了一阵子。朋友后来亏了的时候你没有幸灾乐祸——因为你知道，在另一个平行宇宙里，亏的那个人是你。" }
    ],
    review: "复盘：朋友的建议不等于安全的投资。但更重要的教训是：任何瞒着家人做的财务决定，最后的代价都会翻倍。"
  },
  {
    id: "family_insurance_call",
    stage: ["family_career"],
    title: "保险升级",
    trigger: "恐惧",
    text: "'保险公司'打来电话：你的保单可以升级，现在确认只需补3800。对方报出了你的保单号和投保时间——全对。你确实有一份保险快到期了。",
    options: [
      { text: "转了3800升级", effects: { money: -3800, awareness: -1, trust: -1 }, result: "打给保险公司核实——没有这个升级活动。你的保单信息被泄露了。3800没了。你盯着手机想：他们怎么什么都知道？", isScam: true, loss: 3800 },
      { text: "打保险公司官方电话核实", effects: { awareness: 2, digitalSkill: 1 }, result: "官方说没有这个活动。你怒了——你的个人信息在谁手里？你投诉了，但你知道投诉大概率没用。你开始用一个专用手机号来绑定所有金融服务。" },
      { text: "说等我收到纸质通知再说", effects: { awareness: 1, socialExp: 1 }, result: "你说等纸质材料。对方催你'今天是最后一天'。越催你越不信。你挂了电话。你发现'最后一天'是骗子最爱用的截止日期——因为它不给你思考的时间。" }
    ],
    review: "复盘：对方知道你的保单信息——这不代表TA是保险公司的人。你的数据在地下市场里只值几块钱。记住：知道你信息的人不一定是你的人。"
  },
  {
    id: "family_renovation",
    stage: ["family_career"],
    type: "life",
    title: "装修",
    trigger: "便利",
    text: "你买了新房要装修。一个装修公司说付全款20万打7折——相当于省6万。另一个公司说按进度付款但没有折扣。你的邻居用了第一家，说'挺好的'。",
    options: [
      { text: "付全款省6万", effects: { money: -200000, trust: -2, mental: -3 }, result: "装修到一半公司跑路了。工地一片狼藉。你又花了10万找人收尾。你'省'的6万变成了多花的10万。邻居也被坑了——原来那个'挺好的'还没完工。" },
      { text: "按进度付款", effects: { money: -260000, mental: 1, socialExp: 1 }, result: "你多花了6万，但每一步都在你的掌控中。工人偷工的时候你扣了款。最终效果很好。你学到了：控制感比折扣更值钱。" },
      { text: "找三家比价再决定", effects: { money: -240000, awareness: 1, socialExp: 1 }, result: "你花了一个月比价。选了一家中间价位的，按进度付款。装修中有小问题，但都在可控范围内。你老婆说'你这次做得对'。" }
    ],
    review: null
  },
  {
    id: "family_loan_cancel",
    stage: ["family_career"],
    title: "注销校园贷",
    trigger: "恐惧",
    text: "你接到电话：'你名下有一个大学时期的贷款账户没注销，会影响征信。请配合注销操作。'你大学时确实用过某个借贷平台。你不记得有没有注销。",
    options: [
      { text: "配合操作注销", effects: { money: -30000, awareness: -1, trust: -2, mental: -2 }, result: "对方引导你在几个平台借款然后转到'注销账户'。你转了3万。——然后你意识到：你刚刚不是在注销贷款，你是在借新贷款。3万变成了新的债。", isScam: true, loss: 30000 },
      { text: "自己去查征信", effects: { awareness: 3, digitalSkill: 1 }, result: "你去人民银行打了征信报告——干干净净，什么问题都没有。根本不存在'注销贷款账户'这个操作。你把那个号码标记了。" },
      { text: "上网搜搜这种电话", effects: { awareness: 2, digitalSkill: 1 }, result: "你搜了'注销校园贷'——全是诈骗报道。你差点就中招了。你发现：骗子特别喜欢利用你'不确定'的事。你不记得有没有注销——这个'不确定'本身就是钩子。" }
    ],
    review: "复盘：不存在'注销贷款账户'这个操作。让你先借钱再转给对方的——无论理由多么'合理'——都是骗局。"
  },
  {
    id: "family_elder_call",
    stage: ["family_career"],
    title: "爸爸打来电话",
    trigger: "亲情",
    type: "life",
    text: "爸爸突然打来电话，支支吾吾的：'有个人说我的社保有问题，要我配合处理。我拿不准...你帮我看看？'",
    options: [
      { text: "告诉爸爸这是骗子", effects: { familyTrust: 2, awareness: 1 }, result: "你说'爸，这是骗子，别理他。'爸爸松了口气。你挂了电话后想——还好爸爸会打给你。很多老人不会。你决定每周给爸妈打个电话，聊聊这些事。" },
      { text: "帮爸爸回拨那个号码确认", effects: { awareness: 1, familyTrust: 1, socialExp: 1 }, result: "你打过去——对方一听说是家属就挂了。你帮爸爸在手机上标记了这个号码。你教爸爸：'以后凡是电话里说要处理钱的事，先打给我。'" },
      { text: "让爸爸去社保局柜台问", effects: { familyTrust: 1, awareness: 1 }, result: "爸爸去了社保局。工作人员说一切正常，还帮他做了反诈宣传。爸爸回家后说'多亏你让我去问了'。你觉得——有时候做子女最重要的事，就是接电话。" }
    ],
    review: null
  },

  // ==========================================
  // 中年资产期 (51-65) — 8 events
  // ==========================================

  {
    id: "mid_collect_coin",
    stage: ["midlife_asset"],
    title: "纪念币",
    trigger: "贪念",
    text: "电话推销：'央行授权限量纪念币，现在买5套5年后保证回收翻3倍。'你退休前攒了一些钱，想做点投资。你知道纪念币确实有升值的——但不确定这个是不是真的。",
    options: [
      { text: "买5套", effects: { money: -50000, greed: 2, trust: -2 }, result: "花了5万买了5套。拿到手你拿去银行问——'这是镀金的纪念章，不是央行纪念币。'成本不到500块。你的5万买了500块的东西。你气得手抖。", isScam: true, loss: 50000 },
      { text: "去银行问问纪念币怎么买", effects: { awareness: 2, socialExp: 1 }, result: "银行说央行纪念币只在银行预约购买，面值发行，不会电话推销。你想——如果你没来银行问这一句，你真的可能买了。" },
      { text: "不买，你不懂的投资不碰", effects: { awareness: 1, mental: 1, greed: -1 }, result: "你挂了电话。你告诉自己一条原则：不懂的东西不投。这条原则从来不会让你暴富——但它让你的钱一直在。" }
    ],
    review: "复盘：电话推销的'纪念币'基本都是骗局。真正有价值的纪念币在银行排队都未必买得到——怎么可能主动打电话给你？"
  },
  {
    id: "mid_pension_project",
    stage: ["midlife_asset"],
    title: "养老社区",
    trigger: "焦虑",
    text: "有人邀请你考察一个'养老社区'项目：投20万拥有入住权，每年返8%，退休后免费入住。他们带你去看了样板房——很漂亮。几十个人一起参观，气氛很热烈。",
    options: [
      { text: "投了，为养老做准备", effects: { money: -200000, greed: 1, trust: -3, mental: -3 }, result: "你投了20万。两年后公司跑路。那个漂亮的样板房是租的。几百个老人的养老钱全没了。你在维权群里看到有人说'我把棺材本都投了'。你彻夜难眠。", isScam: true, loss: 200000 },
      { text: "让子女帮忙看看", effects: { familyTrust: 2, awareness: 1 }, result: "你儿子查了那家公司：注册资本50万，没有养老机构备案。你说'但是样板房很好啊'。儿子说'爸/妈，好看的房子可以租'。你没投。你跟儿子的关系好像近了一点。" },
      { text: "先去民政局核实", effects: { awareness: 2, digitalSkill: 1 }, result: "民政局说这个项目没有备案。你回去告诉了同行参观的老朋友们。有人不信——'人家都带我们看了房子了'。你说不动他们。三个月后你的担心成了现实。" }
    ],
    review: "复盘：样板房、参观团、热烈气氛——这些都是精心设计的'场'。当你和一群人一起做决定时，你的独立判断会被群体情绪淹没。越是'现场就要签'的机会，越需要你回家想一想。"
  },
  {
    id: "mid_health_scare",
    stage: ["midlife_asset"],
    title: "体检异常",
    trigger: "恐惧",
    text: "你做完体检，有一项指标偏高。你还没来得及看医生复查，就接到电话说是'XX医院'的：'你的指标很危险，需要马上做进一步检查，我们这里有特效疗法，2万元。'",
    options: [
      { text: "赶紧去", effects: { money: -20000, mental: -2, awareness: -1, risk: 1 }, result: "去了一个'专科门诊'。做了一堆检查，开了一堆保健品。回来去正规医院复查——那个指标在正常波动范围内，什么事都没有。2万块变成了一袋子没用的药。", isScam: true, loss: 20000 },
      { text: "去三甲医院复查", effects: { awareness: 2, socialExp: 1, money: -500 }, result: "三甲医院的医生说那个指标波动是正常的，完全不需要治疗。你花了500块挂号检查费买了安心。那2万块——还好你没花。" },
      { text: "问问做医生的朋友", effects: { familyTrust: 1, awareness: 1 }, result: "朋友说'那个指标我也偏高，正常人的正常波动'。你放心了。你发现：有一个懂行的朋友，比任何反诈APP都管用。" }
    ],
    review: "复盘：骗子利用的不是你的病——是你对病的恐惧。当你害怕的时候，20000块不像是钱，像是救命稻草。所以正规医院永远应该是你的第一站，而不是电话里的'专家'。"
  },
  {
    id: "mid_stock_tip",
    stage: ["midlife_asset"],
    title: "内幕消息",
    trigger: "贪念",
    text: "一个认识多年的生意朋友跟你说：'有只股票下周重组，绝对涨。我都已经买了50万了。'你信任这个人。你有30万闲钱。",
    options: [
      { text: "投30万", effects: { money: -200000, greed: 2, mental: -4, trust: -3, risk: 2 }, result: "股票暴跌——你亏了20万。朋友也亏了，说'我也不知道会这样'。你们的友谊没有断，但每次见面你都会想到那20万。——你花了20万学到了：没有人真的有'内幕'。", isScam: true, loss: 200000 },
      { text: "投5万试试", effects: { money: -20000, greed: 1, awareness: 1 }, result: "你投了5万。亏了2万。你心疼了几天。但你庆幸自己没有全部压上去。你学到了：即使你相信一个人，也不要把所有鸡蛋放在TA推荐的篮子里。" },
      { text: "不投，哪怕真的涨了", effects: { awareness: 1, mental: 1, greed: -1 }, result: "你没投。一个月后股票确实跌了。朋友亏了钱来找你喝酒。你没说'我说了吧'。你只是给他倒了杯酒。" }
    ],
    review: "复盘：主动送到你面前的'内幕消息'不是内幕——是噪音。如果一个消息传到了你耳朵里，它已经传到了一万个人耳朵里了。"
  },
  {
    id: "mid_antique",
    stage: ["midlife_asset"],
    title: "祖传花瓶",
    trigger: "贪念",
    text: "你在朋友介绍下见了一个'鉴宝专家'。他看了你家的一个老花瓶说：'这是清代官窑，至少值300万。我可以帮你拍卖，先交5万鉴定费。'你心跳加速——如果是真的呢？",
    options: [
      { text: "交5万安排拍卖", effects: { money: -120000, greed: 2, trust: -2 }, result: "交了5万，又要保险费、图录费、展示费...前前后后花了12万。花瓶没卖出去。你拿去博物馆鉴定——'现代仿品，值200块'。你把花瓶摔了。", isScam: true, loss: 120000 },
      { text: "先去正规博物馆鉴定", effects: { awareness: 2, socialExp: 1 }, result: "博物馆专家笑着说'这是80年代的旅游纪念品'。你谢了专家。回家看着花瓶——它不值300万，但它一直在你家里。你没有因为它'不值钱'就不喜欢它了。" },
      { text: "不信300万这个数字", effects: { awareness: 1, greed: -1 }, result: "你说'300万太夸张了'。那个'专家'立刻降到'至少50万'。你更不信了——真正的鉴定不会随口砍价。你走了。" }
    ],
    review: "复盘：鉴宝骗局的核心是先吹高估价让你激动——激动了你就算不出账了。记住：如果你真有值300万的东西，不需要你先掏钱。"
  },
  {
    id: "mid_retirement_plan",
    stage: ["midlife_asset"],
    type: "life",
    title: "退休倒计时",
    trigger: "焦虑",
    text: "你还有5年退休。存款80万，房贷还了大半，孩子工作了但还没完全独立。你想让退休后的生活好一点。朋友们有的买了商铺，有的买了养老保险，有的买了理财。你不知道怎么做最好。",
    options: [
      { text: "买一个商铺出租", effects: { money: -500000, risk: 2, socialExp: 1 }, result: "你花了50万买了个小商铺。前两年还行，第三年电商冲击——租不出去了。你的钱被锁在了一个没人要的铺子里。不是骗局，但不是好投资。" },
      { text: "分散投资低风险理财", effects: { money: 20000, digitalSkill: 1, mental: 1 }, result: "你把钱分成几份：银行定期、国债、低风险基金。收益不高，每年3-4%。但你每天睡得着觉。退休后你发现：睡得着觉比多赚2%重要太多了。" },
      { text: "什么也不做，钱放银行", effects: { mental: 1, greed: -1 }, result: "你把钱放在了银行定期。利率很低，但你不需要它长多快——你需要它在。退休的时候你的钱还是你的钱。这在今天已经是一种成就了。" }
    ],
    review: null
  },
  {
    id: "mid_phone_leak",
    stage: ["midlife_asset"],
    title: "精准推销",
    trigger: "恐惧",
    text: "最近你每天接到七八个推销电话。他们知道你的名字、住址、车型。有一个说你的车险快到期了，通过他们续保打7折。你确实该续保了，而且7折是真便宜。",
    options: [
      { text: "电话里直接办了", effects: { money: -5000, awareness: -1, risk: 1 }, result: "你交了5000元。后来发现保单是假的。你出了一次小事故——保险赔不了。你花了5000买了一张废纸。", isScam: true, loss: 5000 },
      { text: "打保险公司官方电话", effects: { awareness: 2, digitalSkill: 1 }, result: "官方说你的车险还有一个月才到期，也没有7折活动。但他们帮你算了一个续保方案——比去年便宜了800。你在官方渠道续了保。" },
      { text: "标记所有推销电话", effects: { awareness: 1, digitalSkill: 1 }, result: "你开始用手机拦截推销电话。世界安静了不少。你在想：你的信息是怎么泄露的？答案是——到处都在泄露。你能做的只是不在电话里做任何决定。" }
    ],
    review: "复盘：他们知道你的车型不代表他们是保险公司。你的信息在灰色产业链里被打包出售——一条几毛钱。但因此你可能付出几千几万。"
  },
  {
    id: "mid_inheritance",
    stage: ["midlife_asset"],
    title: "海外遗产",
    trigger: "贪念",
    text: "你收到一封正式的邮件——律师函格式，说你有一位海外远亲去世，留下500万遗产。需要支付5万元律师费和公证费才能继承。你确实有海外亲戚——虽然你从没见过。",
    options: [
      { text: "万一是真的呢？付了", effects: { money: -50000, greed: 2, trust: -2 }, result: "付了5万后又要各种税费。总共花了10万。'遗产'当然不存在。你的海外亲戚也不存在。你坐在电脑前想：500万让你失去了理性。", isScam: true, loss: 50000 },
      { text: "让律师朋友看看", effects: { awareness: 2, socialExp: 1 }, result: "律师朋友一看就笑了：'经典419骗局，上世纪就有了。'你觉得有点丢人。但你的钱还在——这比面子重要。" },
      { text: "500万？不可能轮到我", effects: { awareness: 1, greed: -1 }, result: "你把邮件扔进了垃圾箱。你知道：天上不会掉500万。如果会，也不会掉到你的邮箱里。" }
    ],
    review: "复盘：419骗局是互联网上最古老的骗术之一。但每一代人都有人上当——因为'也许是真的'这五个字有魔力。"
  },

  // ==========================================
  // 养老期 (66-80) — 8 events
  // ==========================================

  {
    id: "elder_egg_lecture",
    stage: ["elderly"],
    title: "免费鸡蛋",
    trigger: "孤独",
    text: "小区门口有人发传单：'免费健康讲座，到场送鸡蛋。'你老伴走了两年了。平时一个人在家，没人说话。去听听也好——至少有人跟你聊天。",
    options: [
      { text: "去了，还买了推荐的保健品", effects: { money: -3800, mental: -1, loneliness: -1 }, result: "讲座上'教授'推荐了一款3800元的保健品。你买了——不全是因为相信它有用。是因为那些推销员叫你'阿姨/叔叔'，帮你量血压，问你吃得好不好。你已经很久没有人这样关心你了。", isScam: true, loss: 3800 },
      { text: "去了，领了鸡蛋就走", effects: { awareness: 1, loneliness: -1 }, result: "你去了。听了一会儿觉得不对，拿了鸡蛋就走了。回家的路上你想——那些人确实挺热情的。你理解了为什么其他老人会买。不是因为他们傻。" },
      { text: "没去", effects: { awareness: 1, loneliness: 1 }, result: "你没去。在家看了一天电视。窗外传来小区讲座的扩音器声。你不知道自己是'清醒'还是'孤独'。也许两者之间没有那么大的区别。" }
    ],
    review: "复盘：保健品骗局卖的不是药——卖的是陪伴。那些推销员每天来看你、跟你聊天、记住你的名字。你的子女上一次这样做是什么时候？"
  },
  {
    id: "elder_fake_child",
    stage: ["elderly"],
    title: "儿子出事了",
    trigger: "亲情",
    text: "夜里十一点，你接到电话。一个哭腔的声音：'妈/爸，我出车祸了，对方要10万私了，你赶紧转给我...别告诉其他人...'声音像你的孩子——又好像不太像。你的心跳到了200。",
    options: [
      { text: "赶紧转钱", effects: { money: -100000, mental: -4, trust: -3, shame: 3 }, result: "你颤抖着转了10万。打给儿子——儿子在加班，好好的。你一个人坐在黑暗的客厅里，手机屏幕的光照着你的脸。10万块没了。但比钱更疼的是——你花了10万买了一场恐惧。", isScam: true, loss: 100000 },
      { text: "先打儿子电话确认", effects: { awareness: 2, familyTrust: 2 }, result: "你拨了儿子的号码。响了三声——他接了：'妈/爸怎么了？我在加班。'你的眼泪掉下来了。不是因为害怕，是因为庆幸。你跟儿子说了情况，他说'以后遇到这种电话先打给我'。" },
      { text: "问了一个只有孩子知道的问题", effects: { awareness: 2, socialExp: 1 }, result: "你问：'你小时候最怕什么？'对方愣了，答不上来。你挂了电话。你不知道这是第几次有人冒充你的孩子。但你知道——真正的孩子会回答'怕黑'。" }
    ],
    review: "复盘：AI可以模仿任何人的声音。但它回答不了只有你和孩子之间才知道的生活细节。遇到借钱、转账，先挂断，再用原来的号码打回去确认。"
  },
  {
    id: "elder_romance",
    stage: ["elderly"],
    title: "公园里的TA",
    trigger: "孤独",
    text: "你在公园遛弯认识了一个同龄人。TA每天来找你聊天、散步。你笑的次数比过去一年都多。三个月后TA说：'我有个理财项目很稳，你存30万进来，咱们的养老就不用愁了。'",
    options: [
      { text: "为了我们的将来，投了", effects: { money: -300000, trust: -4, loneliness: 4, mental: -5, shame: 4 }, result: "你投了30万养老钱。一个月后TA消失了。你去公园的长椅上坐了一个下午。你知道你被骗了。但你不恨TA——你恨的是你的寂寞。你恨的是你需要一个人需要到了这种程度。", isScam: true, loss: 300000, flag: "elder_romance_victim" },
      { text: "钱的事我跟孩子商量", effects: { familyTrust: 2, awareness: 1, loneliness: -1 }, result: "你告诉了儿子。儿子调查了那个人——同时跟三个老人'交往'。你的心碎了。但碎的不是被骗的心——是你以为终于不孤独了的心。儿子说'妈/爸我以后多回来看你'。你说好。" },
      { text: "感情归感情，钱自己管", effects: { awareness: 2, mental: 1, loneliness: -1 }, result: "你说'我的钱我自己管'。TA态度渐渐冷了。你明白了：TA是冲着你的钱来的。你很难过。但你没有失去30万。你走在公园里，一个人。但至少是一个有钱的一个人。" }
    ],
    review: "复盘：黄昏恋诈骗利用的不是你的贪——而是你的孤独。骗子用三个月的陪伴换你30万的积蓄。但陪伴的需求是真实的。骗子是假的，你的寂寞是真的。"
  },
  {
    id: "elder_medicine_tv",
    stage: ["elderly"],
    title: "电视上的神药",
    trigger: "恐惧",
    text: "你有糖尿病，每天要打针。电视购物推一款'特效降糖胶囊'——'患者'说吃了三个月停了胰岛素。一个疗程2980。你每天打针好烦。万一真的有用呢？",
    options: [
      { text: "打电话订购", effects: { money: -2980, mental: -1, risk: 2 }, result: "你停了药开始吃胶囊。一个月后血糖飙升——你差点住院。医生说'你怎么擅自停药！'那些胶囊的成分就是淀粉和糖。你花2980块差点害了自己。", isScam: true, loss: 2980 },
      { text: "问主治医生", effects: { awareness: 2, familyTrust: 1 }, result: "医生说：'如果真有能治好糖尿病的药，发明者应该拿诺贝尔奖，不是上电视购物。'你笑了。继续打针。打针是烦，但它是有用的烦。" },
      { text: "虽然想买但忍住了", effects: { awareness: 1, mental: 1 }, result: "你没买。每天打针的时候你还是会想到那个广告。但你知道：如果一种药真能治好糖尿病，你的医生一定会告诉你。他没说——那就是没有。" }
    ],
    review: "复盘：慢性病没有'特效药'。但骗子知道你打针打烦了——这种疲倦感才是他们的突破口。"
  },
  {
    id: "elder_grandchild",
    stage: ["elderly"],
    title: "孙子要充钱",
    trigger: "亲情",
    text: "你收到微信消息，显示是孙子的头像：'奶奶/爷爷，帮我充500块游戏点卡，别告诉我爸妈。'你的孙子确实爱玩游戏。但'别告诉爸妈'让你有一丝犹豫。",
    options: [
      { text: "转了，宠孙子嘛", effects: { money: -500, awareness: -1 }, result: "你转了500。打电话给孙子——'我没发过呀奶奶/爷爷'。微信被盗了。500不多，但你一整天都不舒服——不是心疼钱，是心疼你对孙子的感情被人利用了。", isScam: true, loss: 500 },
      { text: "打电话给孙子确认", effects: { awareness: 2, familyTrust: 1 }, result: "孙子说没发过消息。你帮孙子报告了微信异常。孙子说'奶奶/爷爷你好厉害'。你被表扬了一天。" },
      { text: "觉得不对，问了孩子", effects: { familyTrust: 2, awareness: 1 }, result: "你打给儿子/女儿。他们帮孙子处理了微信安全问题，也教了你怎么看微信号是不是真的。一家人因为这件事聊了一个小时。你觉得这个电话比500块值钱多了。" }
    ],
    review: "复盘：'别告诉爸妈'——这句话在正常情况下是孩子的小秘密。但在骗局中，这是隔离你和验证渠道的手段。"
  },
  {
    id: "elder_loneliness_care",
    stage: ["elderly"],
    title: "热心的客服小妹",
    trigger: "孤独",
    text: "你买了个血压计，客服小妹加了你微信。她每天问你血压多少、吃得好不好、睡得好不好。半年了。你叫她小林。她叫你阿姨/叔叔。上周她说：'我们公司有个养老理财，保本保息12%，特别适合您。'",
    options: [
      { text: "小林对我这么好，投了5万", effects: { money: -50000, trust: -3, loneliness: 3, mental: -3, shame: 2 }, result: "你投了5万。三个月后小林的微信换了人。你的钱提不出来。你失去了5万块和一个你以为的'亲人'。你对着微信聊天记录看了很久——那些'今天血压怎么样'全是复制粘贴的。", isScam: true, loss: 50000 },
      { text: "和子女商量", effects: { familyTrust: 2, awareness: 1 }, result: "你告诉了孩子。他们查了之后说这是'养老诈骗'。你没有生气——因为你知道小林对你好不是因为钱。但你的孩子说'妈/爸以后有人对你特别好的时候告诉我们'。你说好。你没说的是——你希望对你好的那个人是他们。" },
      { text: "只聊天不花钱", effects: { awareness: 1, loneliness: -1 }, result: "你说'我没有多余的钱'。小林还是每天问你血压。但推销的频率越来越高。你开始觉得每一句'阿姨/叔叔今天怎么样'后面都藏着一个价格标签。有一天你不再回消息了。" }
    ],
    review: "复盘：小林的工作就是每天跟200个老人聊天，然后等其中20个愿意投钱。她的'关心'不是感情——是KPI。但你对陪伴的渴望是真的。这个矛盾没有简单的答案。"
  },
  {
    id: "elder_social_security",
    stage: ["elderly"],
    title: "社保卡异常",
    trigger: "恐惧",
    text: "你接到电话说是社保中心的：'您的社保卡涉嫌违规使用，养老金可能被冻结。请提供卡号和密码配合核查。'你靠养老金生活。如果真被冻结了...你不敢想。",
    options: [
      { text: "给了卡号和密码", effects: { money: -8000, trust: -2, mental: -2 }, result: "社保卡和关联的银行账户被盗刷了8000块。你的养老金差点断了。你在银行排了一整天队才处理好。你晚上一个人坐在床上想——我老了，我的钱也不安全了。", isScam: true, loss: 8000 },
      { text: "去社保中心柜台问", effects: { awareness: 2, socialExp: 1 }, result: "你穿好衣服去了社保中心。工作人员说一切正常，提醒你不要在电话里给任何人卡号密码。你松了口气。路上你买了一斤桃子——你觉得你值得庆祝一下。" },
      { text: "让子女陪你去处理", effects: { familyTrust: 2, awareness: 1 }, result: "你打给了孩子。周末他们陪你去社保中心确认了一切正常。那天中午你们一起吃了饭。你觉得——让孩子陪你做这些'小事'，比自己硬撑着好。" }
    ],
    review: "复盘：社保中心永远不会在电话里要你的密码。但你害怕的不是骗子——你害怕的是养老金没了以后的日子。这种恐惧是真实的。"
  },
  {
    id: "elder_last_walk",
    stage: ["elderly"],
    type: "life",
    title: "冰面上的最后一段路",
    trigger: "孤独",
    text: "你78岁了。账户里还有一些钱。身体还行。你坐在阳台上看夕阳，想起这一辈子——有些钱丢了，有些人骗了你，有些时候你做对了，有些时候你后悔了。你在想一件事。",
    options: [
      { text: "把经历写下来告诉后人", effects: { awareness: 2, mental: 2, loneliness: -1 }, result: "你在笔记本上写了你被骗的每一次经历。写完之后你觉得——它们不只是'被骗'。它们是你的贪念、恐惧、孤独和善良。你让孙子读了。孙子说'奶奶/爷爷你好勇敢'。你觉得这辈子没有白走。" },
      { text: "什么也不想了，明天晒晒太阳", effects: { mental: 2, loneliness: -1 }, result: "你关上了窗户，去泡了杯茶。明天公园里有邻居约你下棋。你还有一些钱，还有一些朋友，还有一些明天。这就够了。" },
      { text: "给孩子打个电话", effects: { familyTrust: 2, loneliness: -2, mental: 1 }, result: "你拨了号码。电话响了两声就接了：'妈/爸？怎么了？'你说'没什么，就是想听你说说话。'你们聊了四十分钟。挂了电话你看着夕阳，觉得冰面上的路，也许还能再走几步。" }
    ],
    review: null
  }
];
