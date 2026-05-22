window.Game = window.Game || {};

(function() {
  var S = {
    all: ["childhood", "middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"],
    young: ["childhood", "middle_school", "college"],
    teen: ["middle_school", "college"],
    adult: ["college", "early_career", "family_career", "midlife_asset"],
    work: ["early_career", "family_career", "midlife_asset"],
    family: ["early_career", "family_career", "midlife_asset", "elderly"],
    old: ["midlife_asset", "elderly"]
  };

  function r(id, title, text, effects, stage, condition, probability) {
    Game.RandomEvents.push({
      id: "re_x_" + id,
      title: title,
      text: text,
      condition: condition || function() { return true; },
      probability: probability || 0.075,
      effects: effects || {},
      stage: stage || S.all
    });
  }

  function rc(id, title, text, options, stage, condition, probability) {
    Game.RandomEvents.push({
      id: "re_x_" + id,
      title: title,
      text: text,
      condition: condition || function() { return true; },
      probability: probability || 0.075,
      isChoice: true,
      options: options,
      stage: stage || S.all
    });
  }

  function ae(id, title, text, actions, effects, stage, condition, probability) {
    Game.ActionEvents.push({
      id: "ae_x_" + id,
      title: title,
      text: text,
      actions: actions,
      stage: stage || S.all,
      condition: condition,
      probability: probability || 0.11,
      effects: effects || {}
    });
  }

  function aec(id, title, text, actions, options, stage, condition, probability) {
    Game.ActionEvents.push({
      id: "ae_x_" + id,
      title: title,
      text: text,
      actions: actions,
      stage: stage || S.all,
      condition: condition,
      probability: probability || 0.11,
      isChoice: true,
      options: options
    });
  }

  // City, objects, weather, and public space.
  r("elevator_pause", "电梯突然停顿", "电梯在两层之间顿了一下，所有人同时抬头。几秒钟里，陌生人共享了一点轻微的恐惧。", { awareness: 1, trust: 1 }, S.adult);
  r("metro_last_seat", "地铁最后一个座位", "车厢里只剩一个座位。你坐下后看见一个更累的人站在门边。", { shame: 1, socialExp: 1 }, S.adult);
  r("bus_route_changed", "公交改线", "熟悉的公交突然改线，你被带到一条从没走过的街。城市像把背面翻给你看。", { socialExp: 1, mental: 1 }, S.all);
  r("streetlight_out", "路灯坏了", "回家的路上有一段路灯坏了。你突然意识到安全感有时只是一圈黄色的光。", { risk: 1, awareness: 1 }, S.adult);
  r("public_clock_wrong", "公共钟慢了七分钟", "广场上的钟慢了七分钟，只有你发现。世界继续按错的时间走，没有人着急。", { awareness: 1, mental: 1 }, S.all);
  r("receipt_found", "地上的小票", "你捡到一张购物小票，上面是牛奶、药、玩具和一包烟。一个陌生人的一天被压缩成几行字。", { trust: 1, loneliness: -1 }, S.adult);
  r("broken_umbrella", "坏掉的伞", "风把伞骨吹折，你撑着一朵歪斜的铁花走完半条街。狼狈，但还能走。", { mental: 1, fatigue: 1 }, S.all);
  r("wrong_floor", "走错楼层", "你走到一层极像自己家的楼道，钥匙插不进去才发现错了。生活偶尔会复制一份假入口。", { awareness: 1 }, S.adult);
  r("night_vendor", "夜里的摊贩", "很晚了，路边还有人在卖热粥。蒸汽升起来，你忽然觉得城市并没有完全睡着。", { mental: 1, loneliness: -1, money: -12 }, S.adult);
  r("square_music", "广场上的歌", "一首很老的歌从广场传来。你明明不喜欢，却能跟着哼出两句。", { mental: 1, loneliness: -1 }, S.family);

  rc("seat_or_not", "要不要让座", "车上上来一个拎着重物的人。你不确定TA是否需要座位，也不确定自己是否站得动。", [
    { text: "主动让座", effects: { trust: 1, fatigue: 1 }, result: "对方道了谢。你站得有点累，但心里平了一点。" },
    { text: "假装没看见", effects: { shame: 1 }, result: "你看向窗外。玻璃里的人也在看你。" },
    { text: "先问一句需不需要", effects: { socialExp: 1, awareness: 1 }, result: "一句话化解了尴尬。对方说不用，你也不必猜。" }
  ], S.all);
  rc("neon_shop", "霓虹招牌", "一家新店招牌写着'今天不快乐免费退'，你知道这是营销，却还是被逗了一下。", [
    { text: "进去看看", effects: { money: -60, mental: 1, socialExp: 1 }, result: "东西普通，店员倒是很会聊天。你买走了一点轻松。" },
    { text: "拍照发给朋友", effects: { socialExp: 1, loneliness: -1 }, result: "朋友回了一个笑。城市的荒诞被你们共享了一秒。" }
  ], S.adult);
  rc("pay_it_forward", "前一个人帮你付了零钱", "排队结账时，前一个人顺手替你补了几块零钱。你甚至没来得及看清TA的脸。", [
    { text: "把善意传给下一个人", effects: { money: -20, trust: 2, mental: 1 }, result: "你也替别人补了一点。善意像接力棒，不需要解释太多。" },
    { text: "收下这份好运", effects: { trust: 1, mental: 1 }, result: "你道了谢。小事让这天突然变得没那么硬。" }
  ], S.all);
  rc("cashier_mistake", "收银员少算了钱", "收银员忙中出错，少算了一件商品。你已经走出几步才发现。", [
    { text: "回去补钱", effects: { trust: 1, mental: 1 }, result: "收银员连声道谢。你把一件很小的事做完整了。" },
    { text: "算了，当没发现", effects: { money: 30, shame: 1 }, result: "你省了三十块，也把这三十块记得格外清楚。" }
  ], S.all);
  rc("city_siren", "远处的警笛", "夜里传来警笛声，越来越近又越来越远。你不知道发生了什么，却开始检查门窗。", [
    { text: "顺手确认家里安全", effects: { awareness: 1, mental: 1 }, result: "门锁好好的。你不再继续想象。" },
    { text: "刷本地群打听", effects: { risk: 1, fatigue: 1 }, result: "群里说法很多，真相很少。你越看越清醒不了。" }
  ], S.family);

  // Memory, dreams, and private inner life.
  r("name_on_cup", "杯子上的旧名字", "你翻出一个写着旧名字的杯子，那是别人曾经叫你的方式。", { mental: 1, loneliness: 1 }, S.adult);
  r("childhood_song", "童年动画片片尾曲", "短视频里刷到一段童年动画片尾曲，你突然记起很多早就不重要的事情。", { mental: 1, loneliness: -1 }, S.adult);
  r("forgotten_password_hint", "密码提示问题", "一个老账号问你'你最好的朋友是谁'。你盯着问题看了很久。", { awareness: 1, loneliness: 1 }, S.adult);
  r("old_calendar", "过期的日历", "抽屉里有一本几年前的日历，上面圈着一些你已经忘记为什么重要的日期。", { mental: 1, awareness: 1 }, S.family);
  r("dream_exam", "又梦见考试", "你梦见自己坐在考场里，卷子上的字全都认识，却一道也不会做。醒来后仍然心慌。", { mental: -1, awareness: 1 }, S.teen.concat(S.work));
  r("voice_message_saved", "没舍得删的语音", "你清理聊天记录时，发现一条一直没舍得删的语音。声音比照片更像一个人还在。", { loneliness: 1, mental: 1 }, S.family);
  r("smell_of_detergent", "洗衣粉味道", "某种洗衣粉味道让你想起小时候晾在阳台上的校服。记忆突然很干净。", { mental: 1 }, S.all);
  r("old_game_save", "老游戏存档", "你打开一个很久没玩的游戏，角色还站在当年你退出的地方。它等你的耐心比很多人都久。", { mental: 1, loneliness: -1 }, S.young.concat(S.adult));
  r("future_self_glimpse", "看见未来的影子", "你在公交玻璃里看到一个疲惫的中年人，下一秒意识到那也可能是未来的自己。", { awareness: 1, mental: -1 }, S.teen.concat(S.adult));
  r("borrowed_sentence", "一句借来的话", "别人随口说的一句话，被你在心里反复咀嚼。它像是不小心递给你的钥匙。", { awareness: 1, mental: 1 }, S.all);

  rc("delete_old_chat", "要不要删旧聊天", "聊天记录占了很多空间。有一段对话你很久没打开，但也一直没删。", [
    { text: "删掉它", effects: { mental: 1, loneliness: 1 }, result: "空间释放了。心里也空出一点地方，只是不知道该放什么。" },
    { text: "备份后留着", effects: { awareness: 1, mental: 1 }, result: "你没有被过去拖住，也没有粗暴地扔掉它。" },
    { text: "重新看一遍", effects: { fatigue: 1, mental: -1 }, result: "你看到了很多当时没听懂的话。迟来的理解有点疼。" }
  ], S.adult);
  rc("memory_box", "一个旧盒子", "你翻出一个旧盒子，里面有票根、奖状、坏掉的挂件和一张已经褪色的照片。", [
    { text: "整理成纪念盒", effects: { mental: 1, awareness: 1 }, result: "你没有留住时间，只是给它找了个体面的角落。" },
    { text: "只留下最重要的一件", effects: { mental: 1, greed: -1 }, result: "减少不是背叛。有些东西留下一个代表就够了。" },
    { text: "全部扔掉", effects: { mental: -1, awareness: 1 }, result: "垃圾袋很轻，你的手却沉了一下。" }
  ], S.family);
  rc("birthday_nobody", "生日快结束了", "生日这天快结束时，你发现有些期待并没有发生。", [
    { text: "自己买个小蛋糕", effects: { money: -80, mental: 1 }, result: "蛋糕很小，但蜡烛是真的。你没有把庆祝权交给别人。" },
    { text: "主动约朋友补过", effects: { loneliness: -2, socialExp: 1, money: -200 }, result: "朋友说怎么不早说。你突然发现自己也常常不给别人机会。" },
    { text: "假装不在意", effects: { loneliness: 1, mental: -1 }, result: "你确实没说什么，只是睡得晚了一点。" }
  ], S.teen.concat(S.adult));
  rc("old_teacher_message", "老师突然发来消息", "很久没联系的老师/前辈突然问你近况。你一时不知道怎么概括这些年。", [
    { text: "认真回复", effects: { socialExp: 1, mental: 1, awareness: 1 }, result: "你写了很多又删掉一些。最后发出去的，是一个还算诚实的版本。" },
    { text: "简单客套", effects: { socialExp: 1 }, result: "你礼貌地回了几句。成年人好像很擅长把复杂活成客套。" }
  ], S.adult);
  rc("dream_lost_phone", "梦见手机丢了", "你梦见手机丢了，醒来第一件事就是摸枕边。它还在，电量只剩百分之七。", [
    { text: "顺手备份和改密码", effects: { awareness: 2, digitalSkill: 1 }, result: "恐惧变成了一个待办，待办被你处理掉了。" },
    { text: "充上电继续睡", effects: { fatigue: -1 }, result: "你把手机插上电。梦里的慌张慢慢退潮。" }
  ], S.adult);

  // Digital oddities and platform life.
  r("app_red_dot", "消不掉的小红点", "一个APP的小红点怎么都消不掉。它像一枚微型警报，在屏幕角落坚持工作。", { fatigue: 1, risk: 1 }, S.teen.concat(S.adult));
  r("auto_caption_wrong", "自动字幕认错了话", "视频字幕把一句普通话识别成完全相反的意思。你第一次认真想：误解也可以自动化。", { awareness: 1, digitalSkill: 1 }, S.adult);
  r("map_wrong_turn", "导航带错路", "导航把你带进一条窄路。机器很自信，你很尴尬。", { fatigue: 1, awareness: 1 }, S.adult);
  r("old_post_like", "旧动态突然被点赞", "很多年前的一条动态突然被人点赞。你像被迫和过去的自己同框。", { shame: 1, socialExp: 1 }, S.adult);
  r("terms_update", "用户协议又更新了", "APP弹出一大段协议更新。你知道没人真的读完，但里面可能真的有重要东西。", { awareness: 1, risk: 1 }, S.teen.concat(S.adult));
  r("ai_summary_wrong", "AI总结跑偏", "AI把一段长消息总结错了重点。你差点按它的总结去回复。", { digitalSkill: 1, awareness: 1 }, S.adult);
  r("photo_filter_face", "滤镜里的陌生脸", "滤镜把你的脸修得很陌生。你看着屏幕，突然不知道哪个版本更像自己。", { shame: 1, mental: -1 }, S.teen.concat(S.adult));
  r("cloud_memory_full", "云端记忆满了", "云空间满了。系统让你购买更多空间，也让你第一次意识到回忆正在按月收费。", { awareness: 1, money: -100 }, S.adult);
  r("silent_update", "系统悄悄更新", "手机一觉醒来换了几个图标的位置。你找不到常用功能，像家里家具被人挪了。", { fatigue: 1, digitalSkill: 1 }, S.family);
  r("typing_deleted", "打了又删", "你打了一长段话，又一个字一个字删掉。最后只发了'没事'。", { mental: -1, loneliness: 1 }, S.teen.concat(S.adult));

  rc("privacy_popup", "权限弹窗", "一个普通APP请求访问通讯录、相册、定位和麦克风。它的胃口比功能大得多。", [
    { text: "只给必要权限", effects: { awareness: 2, digitalSkill: 1, risk: -1 }, result: "功能照常能用。你发现很多权限只是想要，不是需要。" },
    { text: "全都允许", effects: { risk: 2, fatigue: -1 }, result: "弹窗消失了。省事是真的，失控也是真的。" },
    { text: "卸载换一个", effects: { awareness: 1, mental: 1 }, result: "你少了一个APP，也少了一点被打扰。" }
  ], S.teen.concat(S.adult));
  rc("message_recall", "对方撤回了一条消息", "聊天框显示'对方撤回了一条消息'。这几个字比消息本身更让人想知道。", [
    { text: "不追问", effects: { trust: 1, awareness: 1 }, result: "你把好奇心留在原地。关系里也需要一点不追究。" },
    { text: "问TA撤回了什么", effects: { socialExp: 1, trust: -1 }, result: "对方说没什么。气氛变得有点薄。" }
  ], S.teen.concat(S.adult));
  rc("online_argument", "评论区吵起来了", "你只是看个帖子，评论区却吵成一片。你发现自己已经想好怎么反驳陌生人。", [
    { text: "关掉页面", effects: { mental: 1, fatigue: -1 }, result: "你没有赢得争论，但赢回了一点时间。" },
    { text: "认真回复", effects: { fatigue: 1, shame: 1 }, result: "你写得很有道理。对方回了一个表情包。" },
    { text: "只看不说", effects: { awareness: 1 }, result: "你像站在玻璃后面看一场雨。湿不到你，但也不算轻松。" }
  ], S.teen.concat(S.adult));
  rc("group_silence", "群聊突然冷场", "一个热闹的群突然没人说话。最后一条消息停在那里，像一只没落地的球。", [
    { text: "发个轻松话题", effects: { socialExp: 1, trust: 1 }, result: "有人接住了。群又活了一小会儿。" },
    { text: "不打破沉默", effects: { awareness: 1 }, result: "你看着沉默自然沉下去。不是每个空白都需要填。" }
  ], S.teen.concat(S.adult));
  rc("strange_recommendation", "奇怪的推荐", "平台给你推荐了一个完全不像你会喜欢的东西。你点开后却看了很久。", [
    { text: "顺着好奇看完", effects: { awareness: 1, mental: 1 }, result: "偶尔跑偏也不错。算法缝隙里漏进一点陌生空气。" },
    { text: "点不感兴趣", effects: { digitalSkill: 1 }, result: "你修剪了一下自己的信息花园。它很快又长出别的东西。" }
  ], S.all);

  // Money, paperwork, tiny moral pressure.
  r("coin_in_drawer", "抽屉里的硬币", "你翻出一把很久不用的硬币。它们还算钱，只是时代不太需要它们了。", { awareness: 1, mental: 1 }, S.family);
  r("invoice_faded", "褪色的发票", "一张发票上的字快看不清了。你突然理解为什么有些证据需要及时保存。", { awareness: 1 }, S.adult);
  r("price_tag_left", "没撕掉的价签", "你发现某件衣服价签还在。不是忘了穿，而是忘了自己为什么买。", { greed: -1, awareness: 1 }, S.adult);
  r("subscription_trial", "试用期最后一天", "一个免费试用明天开始扣费。它没有骗你，只是赌你会忘。", { awareness: 1, money: 100 }, S.adult);
  r("bank_queue_number", "银行叫号", "银行屏幕上的号码慢慢跳。等待让钱从数字重新变成一件很具体的事。", { awareness: 1, fatigue: 1 }, S.family);
  r("wallet_too_thick", "钱包太厚", "钱包里塞满会员卡、旧票据和几张没用的优惠券。你意识到混乱也会占利息。", { awareness: 1, fatigue: -1 }, S.adult);
  r("discount_math", "优惠算不明白", "满减、券包、返现叠在一起，你算了半天，突然不确定自己是在省钱还是被困住。", { awareness: 1, fatigue: 1, greed: 1 }, S.adult);
  r("small_debt_remembered", "想起一笔小欠款", "你突然想起很久以前欠别人一杯奶茶钱。对方可能早忘了，你却记起来了。", { shame: 1, awareness: 1 }, S.teen.concat(S.adult));

  rc("split_bill", "AA账单差几块", "聚餐AA时账单差了几块钱。没人说话，但每个人都看见了。", [
    { text: "你补上", effects: { money: -20, trust: 1 }, result: "事情过去了。你不确定这是大方，还是怕尴尬。" },
    { text: "重新算清楚", effects: { awareness: 1, socialExp: 1 }, result: "算账有点扫兴，但模糊更容易留下小刺。" },
    { text: "装作没看见", effects: { shame: 1 }, result: "几块钱不多，沉默有时更贵。" }
  ], S.adult);
  rc("borrowed_item", "借出去的东西", "你借出去一本书/工具/设备，对方一直没还。它不贵，但你开始惦记。", [
    { text: "直接提醒", effects: { socialExp: 1, trust: 1 }, result: "对方说抱歉，马上还。很多尴尬只存在于开口前。" },
    { text: "算了不要了", effects: { mental: -1, trust: -1 }, result: "东西没了，关系表面还在。你把不舒服咽了下去。" },
    { text: "开玩笑提起", effects: { socialExp: 1 }, result: "笑着说出来，台阶也留住了。" }
  ], S.teen.concat(S.adult));
  rc("warranty_card", "保修卡还在吗", "东西坏了，你隐约记得还在保修期，却找不到凭证。", [
    { text: "翻记录和订单", effects: { awareness: 1, fatigue: 1, money: 500 }, result: "你找到了电子订单。混乱被你从手机深处挖出来。" },
    { text: "自认倒霉重买", effects: { money: -800, mental: -1 }, result: "你买了新的，也买了一次教训。" }
  ], S.adult);
  rc("friend_pays_first", "朋友先垫了钱", "朋友抢先付了账，说下次你请。你知道'下次'有时会变成一笔人情债。", [
    { text: "马上转回去", effects: { awareness: 1, trust: 1 }, result: "账清了，关系也轻了。" },
    { text: "记着下次请", effects: { trust: 1, mental: 1 }, result: "你把它记在心里。人情账不总是坏事，只要别糊涂。" }
  ], S.adult);
  rc("found_coupon", "快过期的券", "你发现一张大额优惠券今晚过期。为了用它，你得买一些本来没打算买的东西。", [
    { text: "不用了", effects: { awareness: 1, greed: -1 }, result: "你失去了一张券，保住了一笔钱。" },
    { text: "凑单用掉", effects: { money: -300, greed: 1 }, result: "优惠是真的，多买也是真的。" }
  ], S.teen.concat(S.adult));

  // Family, neighbors, relationships.
  r("neighbor_cooking_smell", "邻居家的饭香", "楼道里飘来饭香。你不知道是哪一家，却突然觉得这栋楼有人认真生活。", { loneliness: -1, trust: 1 }, S.family);
  r("family_old_joke", "家里老笑话", "家人又讲起一个讲过很多遍的笑话。你本来想吐槽，最后还是笑了。", { familyTrust: 1, mental: 1 }, S.family);
  r("child_question_time", "孩子问时间是什么", "孩子问你时间是什么。你想了半天，最后只说：'就是你慢慢长大，我慢慢变老。'", { familyTrust: 1, mental: -1 }, S.family, function(s) { return s.lifeFlags && s.lifeFlags.has_child; });
  r("parent_old_song", "父母哼老歌", "父母哼起一首你没听过的老歌。你突然意识到TA也曾经年轻得很具体。", { familyTrust: 1, awareness: 1 }, S.family);
  r("relative_nickname", "亲戚叫错称呼", "亲戚还用小时候的外号叫你。你已经长大很久了，那个名字却还没退休。", { mental: 1, loneliness: -1 }, S.adult);
  r("neighbor_package_stack", "门口堆满快递", "邻居门口堆满快递，好几天没人拿。你开始有点担心。", { awareness: 1, trust: 1 }, S.family);
  r("family_remote_mute", "视频通话忘开麦", "家人视频通话说了半天，你这边一直没开麦。大家笑成一团。", { familyTrust: 1, digitalSkill: 1, mental: 1 }, S.family);
  r("old_friend_typing", "对方正在输入", "很久没联系的人聊天框显示'正在输入'，然后消失了。你们之间只剩这几个字动过。", { loneliness: 1, mental: -1 }, S.adult);
  r("doorbell_wrong", "按错门铃", "有人按错门铃。你们隔着门解释了半天，最后都笑了。", { trust: 1, socialExp: 1 }, S.family);
  r("shared_wall_music", "隔壁的音乐", "隔壁循环播放同一首歌。你从烦躁到会唱，只用了三天。", { fatigue: 1, mental: -1 }, S.adult);

  rc("family_group_rumor", "家族群里的传闻", "家族群里转来一条耸人听闻的消息，长辈们开始认真讨论。", [
    { text: "查证后温和提醒", effects: { awareness: 1, familyTrust: 1, fatigue: 1 }, result: "有人听进去了，也有人说你太较真。你尽量不把提醒变成批评。" },
    { text: "直接说假的", effects: { awareness: 1, familyTrust: -1 }, result: "判断没错，方式太硬。群里安静了一会儿。" },
    { text: "不参与", effects: { risk: 1 }, result: "你不想吵。谣言继续在群里走了一圈。" }
  ], S.family);
  rc("neighbor_help_key", "邻居忘带钥匙", "邻居忘带钥匙，想借你手机联系家人。", [
    { text: "借手机但不离手", effects: { trust: 1, awareness: 1 }, result: "忙帮上了，边界也守住了。" },
    { text: "直接把手机递过去", effects: { trust: 1, risk: 1 }, result: "对方只是打了个电话。你松了口气，也记住了这次侥幸。" },
    { text: "婉拒并建议找物业", effects: { awareness: 1, trust: -1 }, result: "你没有错，只是楼道里的气氛冷了一点。" }
  ], S.family);
  rc("friend_bad_news", "朋友带来坏消息", "朋友告诉你TA最近过得很糟。你一时不知道该安慰，还是该给建议。", [
    { text: "先认真听", effects: { trust: 2, socialExp: 1 }, result: "你没有急着解决TA的人生。很多时候，被听见已经很难得。" },
    { text: "马上给方案", effects: { awareness: 1, trust: -1 }, result: "你说得都对，但对方只是更沉默了。" },
    { text: "转移话题", effects: { shame: 1 }, result: "气氛轻了一点，你心里重了一点。" }
  ], S.adult);
  rc("apology_late", "迟来的道歉", "一个曾经让你难受的人突然道歉。时间过去太久，你已经不知道该把它放在哪里。", [
    { text: "接受但不重启关系", effects: { mental: 1, awareness: 1 }, result: "你没有继续恨，也没有假装一切如初。" },
    { text: "重新联系", effects: { trust: 1, risk: 1, loneliness: -1 }, result: "旧门又开了一条缝。里面有光，也有灰。" },
    { text: "不回复", effects: { mental: -1, awareness: 1 }, result: "沉默也是回答，只是余震会久一点。" }
  ], S.adult);
  rc("child_secret", "孩子的小秘密", "孩子藏起一张小纸条。你看得出TA有秘密，也看得出TA很紧张。", [
    { text: "尊重隐私，等TA说", effects: { familyTrust: 2, awareness: 1 }, result: "你没有抢走TA的小世界。信任慢慢长了一点。" },
    { text: "偷偷看", effects: { familyTrust: -2, shame: 1 }, result: "你知道了内容，也破坏了某种看不见的东西。" }
  ], S.family, function(s) { return s.lifeFlags && s.lifeFlags.has_child; });

  // Work, school, institutions.
  r("office_plant", "办公室绿植活了", "你以为会死掉的绿植竟然冒出新叶。它比部门计划更有生命力。", { mental: 1 }, S.work);
  r("meeting_echo", "会议里的回音", "会议上大家说了很多话，最后决定下次再讨论。你感觉时间被折成纸飞机扔了。", { fatigue: 1, mental: -1 }, S.work);
  r("school_bell_memory", "铃声响起", "听到学校铃声的一瞬间，你身体先于大脑紧张了一下。", { awareness: 1, mental: -1 }, S.young.concat(S.adult));
  r("printer_jam", "打印机卡纸", "打印机在最急的时候卡纸。你和机器僵持三分钟，像两个都不想上班的人。", { fatigue: 1, mental: -1 }, S.work);
  r("classroom_chalk", "粉笔灰", "教室里一阵粉笔灰飘起来。你打了个喷嚏，也想起某个很凶但负责的老师。", { mental: 1 }, S.young);
  r("canteen_dish", "食堂菜变了", "食堂熟悉的窗口换了师傅。味道变了，你才知道自己依赖过它。", { mental: -1, awareness: 1 }, S.young.concat(S.work));
  r("exam_pencil_break", "考试铅笔断了", "考试或填表时笔尖断了。小故障把大紧张照得更亮。", { fatigue: 1, awareness: 1 }, S.young);
  r("file_name_final", "最终版真的最终吗", "你看见文件名从'最终版'改到'最终版2修改后新版'。人类对确定性的追求很感人。", { mental: 1, fatigue: 1 }, S.work);

  rc("coworker_credit", "功劳算谁的", "你做的一部分工作被同事在汇报里轻轻带过，像本来就属于TA。", [
    { text: "私下沟通", effects: { socialExp: 1, awareness: 1 }, result: "你说得尽量平静。对方补了一句致谢，虽然有点迟。" },
    { text: "当场打断", effects: { socialExp: 1, trust: -1, shame: 1 }, result: "场面有点僵，但你的名字回到了它该在的地方。" },
    { text: "忍了", effects: { mental: -1, shame: 1 }, result: "事情过去了，不舒服没过去。" }
  ], S.work);
  rc("teacher_misread", "老师/领导误会你", "一件事被误会了。对方已经形成判断，你要不要解释？", [
    { text: "拿事实解释", effects: { awareness: 1, socialExp: 1 }, result: "解释不一定立刻有用，但事实至少站了出来。" },
    { text: "算了不说", effects: { mental: -1, shame: 1 }, result: "你省下了一场对话，也留下了一点委屈。" }
  ], S.young.concat(S.work));
  rc("deadline_kindness", "有人帮你赶截止", "截止前，一个同学/同事默默帮你补了一块漏洞。", [
    { text: "认真道谢并补回人情", effects: { trust: 1, socialExp: 1 }, result: "关系因为一次互相兜底变得更真实。" },
    { text: "默认这是应该的", effects: { trust: -1, shame: 1 }, result: "对方没说什么，但下次可能不会再伸手。" }
  ], S.teen.concat(S.work));
  rc("institution_window", "窗口说材料不齐", "办事窗口告诉你少一份材料。你明明查过清单，还是少了。", [
    { text: "耐心问清楚补齐", effects: { fatigue: 1, awareness: 1 }, result: "你多跑了一趟，但终于知道问题在哪里。" },
    { text: "当场发火", effects: { mental: -1, shame: 1 }, result: "火发出去了，材料还是没多出来。" }
  ], S.adult);
  rc("group_project_slack", "小组作业有人摆烂", "小组任务里有人一直不交东西。你们的聊天记录越来越客气，也越来越危险。", [
    { text: "明确分工和截止", effects: { socialExp: 1, awareness: 1 }, result: "话说清楚后，至少责任不会继续漂浮。" },
    { text: "你全做了", effects: { fatigue: 2, mental: -1 }, result: "任务完成了，你也对'合作'两个字有了新理解。" },
    { text: "一起摆烂", effects: { mental: 1, shame: 2 }, result: "短暂轻松，长期翻车。" }
  ], S.teen);

  // Body and age.
  r("knee_sound", "膝盖响了一下", "起身时膝盖响了一下。声音不大，却像身体发来的系统提示。", { awareness: 1, mental: -1 }, S.family);
  r("hair_in_sink", "水池里的头发", "洗漱时看到几根头发。它们轻得几乎没有重量，却让你沉默了几秒。", { mental: -1, awareness: 1 }, S.adult);
  r("unexpected_energy", "难得精神好", "今天身体意外轻快。你没有变年轻，只是身体偶尔愿意和你和解。", { mental: 1, fatigue: -1 }, S.all);
  r("taste_changed", "口味变了", "以前爱吃的东西突然觉得太甜或太咸。人变化时，舌头常常先知道。", { awareness: 1, mental: 1 }, S.adult);
  r("new_glasses", "新眼镜", "换了新眼镜后，世界清楚得有点过分。你看见灰尘，也看见细节。", { digitalSkill: 1, awareness: 1, money: -600 }, S.family);
  r("hospital_corridor", "医院走廊", "医院走廊里每个人都拿着不同的单子。健康在这里不再抽象。", { awareness: 1, mental: -1 }, S.family);
  r("stomach_noise", "肚子突然叫", "安静场合里肚子响了一声。你的脸比身体先反应。", { shame: 1, mental: 1 }, S.all);
  r("sleep_good", "一夜好睡", "你久违地睡了个完整觉。醒来时，世界还没好，但你有力气面对它。", { mental: 2, fatigue: -2 }, S.all);
  r("minor_cut", "一道小口子", "手指划了个小口子，贴上创可贴后你忽然变得小心。脆弱有时很具体。", { awareness: 1, fatigue: 1 }, S.all);
  r("old_scar", "旧疤痕发痒", "旧伤疤突然发痒。身体记得一些你以为早忘了的事。", { awareness: 1, mental: -1 }, S.adult);

  rc("health_advice_conflict", "两种养生建议打架", "一个说早起好，一个说睡够好；一个说少吃，一个说补充。建议太多，身体只有一个。", [
    { text: "听医生和体检结果", effects: { awareness: 2 }, result: "你把建议从热闹里捞出来，放回证据上。" },
    { text: "跟风试热门方法", effects: { money: -500, risk: 1, fatigue: 1 }, result: "你坚持了三天。第四天开始怀疑人生。" },
    { text: "保持原样", effects: { mental: 1 }, result: "至少你没有把身体当实验田。" }
  ], S.family);
  rc("stairs_or_elevator", "走楼梯还是坐电梯", "电梯很慢，楼梯就在旁边。一个小选择突然变得像人生隐喻。", [
    { text: "走楼梯", effects: { fatigue: 1, mental: 1 }, result: "爬到一半后悔，爬完又有点得意。" },
    { text: "等电梯", effects: { fatigue: -1 }, result: "你等到了电梯，也等到了几个沉默的邻居。" }
  ], S.adult);
  rc("doctor_tone", "医生说话太快", "医生说了很多专业词，你点头，其实只听懂一半。", [
    { text: "请TA再解释一遍", effects: { awareness: 2, shame: -1 }, result: "医生放慢了。你发现提问不是丢脸，是保护自己。" },
    { text: "回家自己搜", effects: { risk: 1, digitalSkill: 1 }, result: "搜索结果从轻微炎症跳到严重疾病，你越看越慌。" }
  ], S.family);
  rc("mirror_morning", "早晨的镜子", "早晨照镜子，你觉得自己像没加载完。", [
    { text: "认真收拾一下", effects: { mental: 1, shame: -1 }, result: "人没有焕然一新，但至少愿意出门。" },
    { text: "算了就这样", effects: { mental: 1 }, result: "你接受了一个低清晰度的自己。" }
  ], S.adult);
  rc("body_warning_ignore", "身体发出小警告", "身体有一点不舒服，不严重，但持续了几天。", [
    { text: "预约检查", effects: { money: -500, awareness: 1, mental: 1 }, result: "花了钱，也买到一点确定性。" },
    { text: "先扛着", effects: { fatigue: 1, risk: 1 }, result: "你很会扛。身体未必喜欢这个优点。" }
  ], S.family);

  // Youth, school, small growing pains.
  r("toy_battery", "玩具没电了", "最喜欢的玩具突然没电。你第一次意识到快乐也需要维护。", { awareness: 1, mental: -1 }, ["childhood"]);
  r("desk_carving", "课桌上的刻字", "课桌上刻着一个陌生名字和一句狠话。上一任使用者留下了小小的宇宙。", { socialExp: 1, awareness: 1 }, S.young);
  r("class_photo_day", "拍集体照", "拍集体照时你不知道手该放哪。多年后，可能没人记得这份局促。", { shame: 1, mental: 1 }, S.young);
  r("lost_eraser", "橡皮总是不见", "你的橡皮又不见了。它像一件有自己人生规划的小物品。", { mental: 1, awareness: 1 }, ["childhood", "middle_school"]);
  r("friend_moves_school", "朋友转学", "一个朋友突然转学。课桌空出来的位置，比告别更像告别。", { loneliness: 1, mental: -1 }, S.young);
  r("first_public_speech", "第一次上台", "你站到台上，台下的脸糊成一片。声音发抖，但真的发出来了。", { socialExp: 1, shame: -1, mental: 1 }, S.young);
  r("library_card", "借书证", "你办了一张借书证。它看起来普通，却像一张进入别人脑子的门票。", { awareness: 1, digitalSkill: 1 }, S.young);
  r("exam_rank_wall", "成绩榜", "成绩被贴在墙上。你看见自己的名字，也看见别人看名字的眼神。", { shame: 1, mental: -1, awareness: 1 }, S.teen);
  r("secret_base", "秘密基地", "你和朋友发现一个没人注意的角落。那里什么都没有，所以什么都可以是。", { loneliness: -2, socialExp: 1 }, ["childhood", "middle_school"]);
  r("first_bank_card", "第一张银行卡", "你拥有了第一张银行卡。它薄薄一片，却让钱这件事突然正式起来。", { awareness: 1, digitalSkill: 1 }, S.teen);

  rc("toy_trade", "交换玩具", "同学想用一个看起来很酷的小玩具换你的旧玩具。你不确定值不值。", [
    { text: "问清楚再换", effects: { awareness: 1, socialExp: 1 }, result: "你们谈了半天，像两个小商人。" },
    { text: "直接换", effects: { trust: 1, greed: 1 }, result: "新玩具到手很开心，直到你发现它少了一个零件。" },
    { text: "不换", effects: { awareness: 1 }, result: "你保住了旧玩具，也保住了选择权。" }
  ], ["childhood"]);
  rc("secret_shared", "朋友告诉你秘密", "朋友告诉你一个秘密，并说千万别告诉别人。这个秘密突然变成一件很重的东西。", [
    { text: "认真保密", effects: { trust: 2, socialExp: 1 }, result: "你守住了它。信任不是说出来的，是这样一点点攒的。" },
    { text: "告诉另一个朋友", effects: { shame: 2, trust: -2 }, result: "秘密跑出去后，就再也不是秘密了。" }
  ], S.young);
  rc("club_choice", "社团招新", "操场上摆满社团摊位，每个摊位都说自己很有意思。", [
    { text: "选真正感兴趣的", effects: { socialExp: 1, mental: 1 }, result: "热情比海报更可靠。" },
    { text: "选看起来最有用的", effects: { awareness: 1, fatigue: 1 }, result: "有用是真的，累也是真的。" },
    { text: "什么都不选", effects: { loneliness: 1 }, result: "自由保住了，可能性也少了一点。" }
  ], S.teen);
  rc("first_salary_parttime", "第一笔兼职钱", "第一笔兼职钱到账，你第一次感到时间可以直接变成数字。", [
    { text: "存一半", effects: { awareness: 1, greed: -1 }, result: "钱没有马上变快乐，但变成了底气。" },
    { text: "全花掉庆祝", effects: { mental: 1, greed: 1, money: -300 }, result: "快乐很真，余额也很真。" }
  ], S.teen);
  rc("peer_pressure_brand", "大家都有的牌子", "班里突然流行一个牌子。你没有，别人也许没在意，你自己先在意了。", [
    { text: "买一个跟上", effects: { money: -500, shame: -1, greed: 1 }, result: "拥有后你发现，它只是一个东西，不是一张通行证。" },
    { text: "不买", effects: { awareness: 1, shame: 1 }, result: "有点别扭，但你撑住了。" }
  ], S.young);

  // Work and adult decisions.
  r("offer_email_draft", "录用邮件草稿", "你看到一封录用邮件草稿，想象自己离开当前生活。想象很轻，决定很重。", { awareness: 1, mental: 1 }, S.work);
  r("colleague_resigns", "同事离职", "一个熟悉的同事突然离职。工位空了，你的日常也缺了一个注脚。", { loneliness: 1, socialExp: 1 }, S.work);
  r("business_card_old", "旧名片", "钱包里有一张旧名片，上面的职位已经不属于你。纸比人更固执。", { awareness: 1, mental: 1 }, S.work);
  r("boss_sigh", "领导叹气", "领导在走廊里叹了口气。你突然意识到，每一层人都有自己的夹缝。", { socialExp: 1, trust: 1 }, S.work);
  r("office_snack", "办公室零食", "有人在茶水间放了一袋零食，没有署名。大家都拿一点，像一种低成本和平。", { trust: 1, mental: 1 }, S.work);
  r("resume_update", "更新简历", "你更新简历时发现，很多辛苦只能写成短短一行。", { awareness: 1, mental: -1 }, S.work);
  r("commute_window", "通勤窗外", "通勤路上你看见一栋楼每天多高一层。你的生活也在不知不觉施工。", { awareness: 1, mental: 1 }, S.work);
  r("payday_quiet", "发薪日很安静", "工资到账，没有烟花，只有短信。成年人很多快乐都很安静。", { money: 2000, mental: 1 }, S.work);
  r("calendar_full", "日程格子满了", "日历上每个格子都有安排。你忽然怀念没有安排的日子。", { fatigue: 1, mental: -1 }, S.work);
  r("work_chat_late", "深夜工作群亮了", "深夜工作群突然亮起。你看了一眼，心脏像被轻轻戳了一下。", { fatigue: 1, mental: -1 }, S.work);

  rc("promotion_party", "升职请客", "你升职或被认可后，同事起哄让你请客。快乐突然有了价格。", [
    { text: "请一顿适中的", effects: { money: -800, socialExp: 1, trust: 1 }, result: "花了钱，也接住了气氛。" },
    { text: "明确说预算有限", effects: { awareness: 1, socialExp: 1 }, result: "有点扫兴，但你没有用面子透支自己。" },
    { text: "豪气请大的", effects: { money: -3000, trust: 1, shame: -1 }, result: "大家很开心，你回家看余额时很清醒。" }
  ], S.work);
  rc("work_mistake", "工作出了错", "一个不算小的失误暴露了。你第一反应是解释，第二反应是害怕。", [
    { text: "承认并补救", effects: { awareness: 1, socialExp: 1, mental: -1 }, result: "不好受，但事情开始往解决方向走。" },
    { text: "先甩锅", effects: { trust: -2, shame: 1 }, result: "短暂安全，长期危险。" },
    { text: "沉默等别人发现", effects: { mental: -2, risk: 1 }, result: "等待比错误本身更折磨。" }
  ], S.work);
  rc("salary_secret", "工资秘密", "同事无意间透露了薪资，你发现差距比想象大。", [
    { text: "准备谈薪材料", effects: { awareness: 1, socialExp: 1 }, result: "情绪变成证据，你开始有了筹码。" },
    { text: "生闷气", effects: { mental: -1, shame: 1 }, result: "你没有行动，只是把不公平嚼了一晚上。" },
    { text: "冲动提离职", effects: { risk: 2, mental: -1 }, result: "话说出口很爽，后续开始变复杂。" }
  ], S.work);
  rc("client_gift", "客户送礼", "客户送来一份不轻不重的礼物。收下不舒服，拒绝也不容易。", [
    { text: "按公司规定处理", effects: { awareness: 2, trust: 1 }, result: "流程有点硬，但帮你挡住了暧昧。" },
    { text: "私下收下", effects: { money: 500, risk: 2, shame: 1 }, result: "礼物放在桌上，像一个小小的把柄。" },
    { text: "婉拒", effects: { socialExp: 1, mental: 1 }, result: "对方有点尴尬，但事情清楚了。" }
  ], S.work);
  rc("team_dinner_escape", "团建要不要去", "周末团建通知来了。你想休息，又怕显得不合群。", [
    { text: "去一半就走", effects: { socialExp: 1, fatigue: 1 }, result: "你露了面，也保住了一点周末。" },
    { text: "不去", effects: { mental: 1, trust: -1 }, result: "你休息好了，也错过了几句闲话里的信息。" },
    { text: "全程参加", effects: { socialExp: 1, fatigue: 2 }, result: "你笑了一天，回家像手机低电量。" }
  ], S.work);

  // Family stages, home, care.
  r("baby_old_clothes", "收起小衣服", "你收起孩子穿不下的小衣服。布料很轻，时间很重。", { familyTrust: 1, mental: 1 }, S.family, function(s) { return s.lifeFlags && s.lifeFlags.has_child; });
  r("parents_glasses", "父母找眼镜", "父母到处找眼镜，最后发现就在头上。你笑了，又有点心酸。", { familyTrust: 1, mental: -1 }, S.family);
  r("home_light_left_on", "家里留着灯", "你很晚回家，发现家里给你留了一盏灯。它比很多话都直接。", { familyTrust: 1, loneliness: -1 }, S.family);
  r("child_growth_mark", "墙上的身高线", "墙上孩子的身高线一格格往上。你才发现变化一直没有停。", { familyTrust: 1, awareness: 1 }, S.family, function(s) { return s.lifeFlags && s.lifeFlags.has_child; });
  r("old_remote_control", "遥控器胶带", "父母的遥控器背面贴着胶带，电池盖早没了。很多东西靠凑合撑了很久。", { familyTrust: 1, awareness: 1 }, S.family);
  r("family_photo_frame", "相框落灰", "相框里的全家福落了灰。照片里每个人都笑得像未来会更简单。", { mental: 1, loneliness: 1 }, S.family);
  r("medicine_box_sorted", "药盒分格", "你把药盒分好格子。照顾一个人，有时就是把一天切成几小格。", { familyTrust: 1, fatigue: 1 }, S.old);
  r("door_lock_changed", "换门锁", "家里换了新门锁。安全感变成一个冰冷的金属声音。", { awareness: 1, money: -800 }, S.family);
  r("sofa_sagging", "沙发塌了一角", "沙发塌了一角，大家还是习惯坐那里。家里的旧东西会参与家庭分工。", { mental: 1 }, S.family);
  r("kitchen_clock", "厨房钟声", "厨房的钟每小时响一次。你以前嫌吵，现在觉得它像家还在运转。", { mental: 1, loneliness: -1 }, S.old);

  rc("family_budget_meeting", "家庭预算小会", "账单越堆越多，你们终于坐下来谈这个月怎么花钱。", [
    { text: "摊开账本认真算", effects: { familyTrust: 1, awareness: 2 }, result: "数字有点冷，但比互相猜测温和。" },
    { text: "谁赚钱谁决定", effects: { familyTrust: -2, shame: 1 }, result: "话很硬，饭桌也硬了。" },
    { text: "先避开不谈", effects: { risk: 1, mental: -1 }, result: "账单暂时沉下去，像水底的石头。" }
  ], S.family);
  rc("parents_repeat_story", "父母反复讲同一件事", "父母又讲起同一个往事。你已经听过很多遍。", [
    { text: "这次认真听完", effects: { familyTrust: 1, mental: 1 }, result: "细节里多出一点以前没听见的东西。" },
    { text: "打断说听过了", effects: { familyTrust: -1, fatigue: -1 }, result: "TA笑了笑不讲了。屋里安静得有点快。" }
  ], S.family);
  rc("child_wants_pet", "孩子想养宠物", "孩子认真说想养一只宠物，并承诺会负责。你知道承诺常常由大人执行。", [
    { text: "一起制定照顾规则", effects: { familyTrust: 1, awareness: 1, money: -800 }, result: "宠物还没来，责任先来了。" },
    { text: "直接拒绝", effects: { familyTrust: -1, mental: 1 }, result: "你省下了麻烦，也收获了一张失望的小脸。" },
    { text: "先去救助站看看", effects: { socialExp: 1, familyTrust: 1 }, result: "孩子第一次知道喜欢不只是拥有。" }
  ], S.family, function(s) { return s.lifeFlags && s.lifeFlags.has_child; });
  rc("home_guest", "客人突然来访", "家里有点乱，客人突然说要来。生活的真实度来不及藏起来。", [
    { text: "简单收拾接待", effects: { socialExp: 1, fatigue: 1 }, result: "客人没那么在意。你在意的常常比别人多。" },
    { text: "找理由推掉", effects: { loneliness: 1, mental: 1 }, result: "家里安静了，你也松了一口气。" }
  ], S.family);
  rc("caregiver_tired", "照顾者也会累", "你照顾家人很久，忽然发现自己耐心变薄了。", [
    { text: "请别人分担一点", effects: { familyTrust: 1, fatigue: -1, socialExp: 1 }, result: "开口不容易，但你不必一个人扛完所有。" },
    { text: "继续硬扛", effects: { fatigue: 2, mental: -1 }, result: "你撑住了今天，也透支了明天。" }
  ], S.family);

  // Aging, community, late life.
  r("park_empty_bench", "公园空长椅", "常坐的长椅今天空着。你不知道那个总坐在那里的人去哪了。", { loneliness: 1, awareness: 1 }, S.old);
  r("old_radio_static", "收音机杂音", "收音机里有一段杂音，像很远的年代正在调频。", { mental: 1, loneliness: -1 }, S.old);
  r("grandchild_drawing", "晚辈画的画", "晚辈画了一张看不太懂的画送你。你看了很久，决定它很像幸福。", { familyTrust: 1, mental: 1 }, S.old);
  r("community_notice_board", "公告栏换了纸", "社区公告栏贴了新通知，旧通知被撕下时留下一层白边。日子也这样覆盖日子。", { awareness: 1, mental: 1 }, S.old);
  r("hearing_missed", "没听清一句话", "别人说了句话，你没听清，又不好意思问第三遍。", { shame: 1, loneliness: 1 }, S.old);
  r("old_phone_font", "手机字体调大", "你把手机字体调大。字变清楚了，承认变化却有点难。", { digitalSkill: 1, awareness: 1, mental: -1 }, S.old);
  r("pension_line", "养老金队伍", "排队办理养老金业务时，你看见很多和你一样认真保存单据的人。", { awareness: 1, trust: 1 }, S.old);
  r("old_friend_absent", "老友缺席", "固定聚会少了一个人。大家没有多说，但茶杯的位置空着。", { loneliness: 2, mental: -1 }, S.old);
  r("slow_walk", "走得慢一点", "你发现自己走路慢了。世界没有加速，是身体开始要求你认真经过它。", { awareness: 1, fatigue: 1 }, S.old);
  r("window_sun", "窗台上的太阳", "下午的太阳落在窗台上。你什么也没做，却觉得这几分钟不算浪费。", { mental: 1, fatigue: -1 }, S.old);

  rc("community_dance_invite", "有人邀你去跳舞", "邻居邀你去参加社区活动。你有点想去，也有点怕不自在。", [
    { text: "去试一次", effects: { loneliness: -2, socialExp: 1, fatigue: 1 }, result: "你跟不上节奏，但笑得比想象中多。" },
    { text: "婉拒", effects: { mental: 1, loneliness: 1 }, result: "家里很安静。安静有时舒服，有时太大。" }
  ], S.old);
  rc("medicine_sales_call", "保健电话", "有人打电话关心你的身体，语气亲切得像认识很久。最后TA开始推荐产品。", [
    { text: "挂断并拉黑", effects: { awareness: 2, risk: -1 }, result: "关心如果通向付款，就要先停下来。" },
    { text: "听TA说完", effects: { risk: 1, loneliness: -1 }, result: "你知道不该信，但被人耐心说话的感觉也是真的。" }
  ], S.old);
  rc("old_album_label", "给老照片写名字", "你发现很多老照片里的年轻人，晚辈已经叫不出名字。", [
    { text: "慢慢写上名字", effects: { familyTrust: 1, awareness: 1 }, result: "你不是在整理照片，是在给记忆留门牌号。" },
    { text: "算了，没人看", effects: { loneliness: 1, mental: -1 }, result: "你合上相册。灰尘很轻，遗忘很重。" }
  ], S.old);
  rc("hospital_new_machine", "医院换了自助机", "医院挂号缴费全换成自助机。队伍移动很快，你却有点跟不上。", [
    { text: "请工作人员教一下", effects: { digitalSkill: 1, awareness: 1, shame: -1 }, result: "问出口后，事情比想象中简单。" },
    { text: "让旁边陌生人帮忙", effects: { trust: 1, risk: 1 }, result: "对方帮了你。你感谢TA，也提醒自己别把支付密码交出去。" },
    { text: "改天再来", effects: { fatigue: 1, mental: -1 }, result: "你躲开了机器，也把问题留到了下一次。" }
  ], S.old);
  rc("funeral_words", "白事上的寒暄", "参加白事时，大家说着保重、节哀、以后常联系。你知道很多话说完就散了。", [
    { text: "真的联系一个人", effects: { loneliness: -1, familyTrust: 1 }, result: "消息很短，但把一句客套从空中接了下来。" },
    { text: "沉默回家", effects: { mental: -1, awareness: 1 }, result: "你一路没怎么说话。生命的有限不需要大道理。" }
  ], S.old);

  // Festivals, seasons, travel, thresholds.
  r("first_snow_feed", "朋友圈第一场雪", "朋友圈都在发雪。你所在的地方没下，但你像隔着屏幕也冷了一点。", { loneliness: 1, mental: 1 }, S.all);
  r("spring_first_leaf", "第一片新叶", "树枝上冒出第一片新叶。它小得几乎可笑，却坚持宣布春天来了。", { mental: 1, fatigue: -1 }, S.all);
  r("summer_power_cut", "夏夜停电", "夏夜突然停电，空调停下，楼里传来很多扇窗被打开的声音。", { fatigue: 1, socialExp: 1 }, S.all);
  r("autumn_clothes", "换季衣服", "你翻出去年秋天的外套，口袋里还有一张皱巴巴的纸。", { mental: 1, awareness: 1 }, S.all);
  r("new_year_first_message", "新年第一条消息", "新年第一条消息来自一个系统通知。仪式感被机器抢跑了。", { mental: 1, digitalSkill: 1 }, S.all);
  r("train_station_smell", "火车站味道", "火车站有一种混合着泡面、雨水和行李箱轮子的味道。你一闻就知道有人要离开。", { loneliness: 1, socialExp: 1 }, S.adult);
  r("hotel_card_lost", "房卡找不到", "出门前你找不到房卡，越急越找不到。最后它在手机下面。", { fatigue: 1, mental: -1 }, S.adult);
  r("roadside_flower", "路边开花", "一块施工围挡旁边竟然开了几朵花。世界的缝里也会长东西。", { mental: 1 }, S.all);
  r("festival_leftovers", "节后剩菜", "节日过后，冰箱里全是剩菜。热闹退场时，总要留下具体的证据。", { familyTrust: 1, mental: 1 }, S.family);
  r("suitcase_wheel", "行李箱轮子坏了", "行李箱轮子在路上坏了。你拖着它走，像拖着一段不肯配合的计划。", { fatigue: 2, mental: -1 }, S.adult);

  rc("holiday_money", "压岁钱/红包", "节日里收到或发出红包。钱不只是钱，也是一种被包装过的关系。", [
    { text: "按能力来", effects: { awareness: 1, familyTrust: 1 }, result: "面子没有无限膨胀，关系也没有塌。" },
    { text: "咬牙多给", effects: { money: -2000, shame: -1, familyTrust: 1 }, result: "大家都说你大方，你自己知道这个月会紧。" },
    { text: "能省就省", effects: { money: 500, familyTrust: -1 }, result: "钱省下了，一些眼神也记下了。" }
  ], S.family);
  rc("trip_delay", "旅途延误", "车晚点了，计划被迫空出一块。你突然拥有一段不知道怎么用的时间。", [
    { text: "随便走走", effects: { socialExp: 1, mental: 1 }, result: "你发现一个小店，一条小路，和计划外的一点快乐。" },
    { text: "焦虑地刷新信息", effects: { fatigue: 1, mental: -1 }, result: "信息没有更快，心跳倒是更勤。" },
    { text: "坐下来休息", effects: { fatigue: -1, awareness: 1 }, result: "延误没有变好，但你没有继续损耗自己。" }
  ], S.adult);
  rc("family_trip_photo", "旅行合照", "旅行合照里总有人闭眼、有人不耐烦、有人负责拍照所以不在里面。", [
    { text: "接受不完美", effects: { mental: 1, familyTrust: 1 }, result: "照片不完美，旅行也不完美，但它们都发生过。" },
    { text: "重拍到满意", effects: { fatigue: 1, familyTrust: -1 }, result: "照片好看了，大家笑得累了。" }
  ], S.family);
  rc("season_sale", "换季大促", "换季大促开始了。页面提醒你'错过再等一年'，像一年只有这一扇门。", [
    { text: "列清单再买", effects: { awareness: 1, greed: -1 }, result: "你买了需要的东西，而不是买了被提醒的焦虑。" },
    { text: "冲动下单", effects: { money: -800, greed: 1, mental: 1 }, result: "快递很多，真正需要的不多。" }
  ], S.adult);
  rc("new_place_lonely", "陌生城市的夜", "到陌生城市的第一晚，窗外灯很多，你认识的人很少。", [
    { text: "出去走一圈", effects: { socialExp: 1, loneliness: -1, fatigue: 1 }, result: "城市还陌生，但不再只是地图上的名字。" },
    { text: "点外卖躲在房间", effects: { money: -60, loneliness: 1, mental: 1 }, result: "房间很安全，也很小。" }
  ], S.adult);

  // Pets, plants, objects with personality.
  r("plant_dying", "植物蔫了", "窗台上的植物蔫了。你想不起上次浇水是什么时候。", { shame: 1, awareness: 1 }, S.adult);
  r("plant_new_leaf", "植物长新叶", "你以为快死的植物长出新叶。它没有责怪你，只是继续活。", { mental: 1, fatigue: -1 }, S.adult);
  r("cat_in_window", "窗里的猫", "路过一扇窗，里面的猫看了你一眼，像掌握了某种你不知道的事实。", { mental: 1 }, S.all);
  r("old_bike", "生锈的自行车", "楼下有辆生锈的自行车，车筐里积了叶子。它曾经也带人去过地方。", { awareness: 1, mental: 1 }, S.all);
  r("mug_crack", "杯子裂纹", "常用杯子出现一道细裂纹。你继续用它，但每次倒热水都更小心。", { awareness: 1, mental: -1 }, S.adult);
  r("keychain_break", "钥匙扣断了", "用了很久的钥匙扣断了。钥匙散开的一瞬间，很多门都变得具体。", { fatigue: 1, awareness: 1 }, S.adult);
  r("watch_stopped", "表停了", "一块旧表停在某个时间。它不走了，世界替它继续。", { mental: 1, awareness: 1 }, S.family);
  r("pen_runs_out", "笔没墨了", "你正要写下重要东西，笔没墨了。表达有时候也会卡在物理层面。", { fatigue: 1 }, S.all);
  r("shoe_lace", "鞋带散了", "鞋带在路上散开。你蹲下来系，世界从膝盖高度看起来很不一样。", { awareness: 1 }, S.all);
  r("fridge_hum", "冰箱嗡嗡响", "夜里冰箱的声音特别明显。你意识到家的安静其实由很多机器维持。", { mental: 1, awareness: 1 }, S.family);

  rc("stray_follow", "路上的流浪动物跟着你", "一只流浪动物跟了你半条街。你不知道它是饿了，还是只是顺路。", [
    { text: "买点吃的给它", effects: { money: -20, trust: 1, mental: 1 }, result: "它吃得很认真，然后继续走自己的路。" },
    { text: "联系救助信息", effects: { socialExp: 1, fatigue: 1 }, result: "过程不轻松，但你让善意多走了一步。" },
    { text: "装作没看见", effects: { shame: 1 }, result: "你走快了些。它没有继续跟上来。" }
  ], S.all);
  rc("plant_choice", "要不要买植物", "花店门口有一盆不贵的植物，看起来很适合你的窗台。", [
    { text: "买回去养", effects: { money: -60, mental: 1, awareness: 1 }, result: "你多了一个需要浇水的小责任。" },
    { text: "看看就走", effects: { mental: 1 }, result: "绿色留在店门口，也在你眼睛里留了一会儿。" }
  ], S.adult);
  rc("object_repair", "修还是扔", "一个旧东西坏了。修它不划算，扔它又有点舍不得。", [
    { text: "试着修好", effects: { awareness: 1, fatigue: 1, mental: 1 }, result: "修得不完美，但它又能用了。你也像赢回一点耐心。" },
    { text: "买新的", effects: { money: -500, mental: 1 }, result: "新东西很好。旧东西进垃圾桶时还是轻轻响了一下。" },
    { text: "先放着", effects: { fatigue: 1 }, result: "它加入了家里'以后再说'的队伍。" }
  ], S.adult);
  rc("pet_vet_bill", "宠物看病", "宠物突然不舒服。宠物医院的账单比你想象中更像人类医院。", [
    { text: "正规检查治疗", effects: { money: -1500, mental: -1, trust: 1 }, result: "花了钱，也换来它慢慢恢复精神。" },
    { text: "网上搜偏方", effects: { risk: 1, money: -200 }, result: "建议很多，确定性很少。你越搜越慌。" }
  ], S.adult, function(s) { return s.lifeFlags && s.lifeFlags.has_pet; });
  rc("borrowed_charger", "借充电器", "手机快没电了，你向陌生人借充电器。", [
    { text: "借线不借手机", effects: { awareness: 1, trust: 1 }, result: "电量回来了，边界也在。" },
    { text: "把手机交给对方帮充", effects: { risk: 1, trust: 1 }, result: "对方没做什么。你却意识到自己刚才有多放心。" }
  ], S.adult);

  // Strangers, public morality, tiny absurdities.
  r("street_argument", "街头争吵", "两个人在路边吵架，围观的人越来越多。你不知道真相，只看见情绪在扩散。", { awareness: 1, trust: -1 }, S.all);
  r("child_waves", "小孩向你挥手", "电梯里的小孩突然向你挥手。你愣了一下，也挥了回去。", { mental: 1, trust: 1 }, S.all);
  r("security_nod", "保安点头", "小区保安像往常一样点头。你忽然觉得日常秩序是很多人一起撑住的。", { trust: 1, mental: 1 }, S.family);
  r("street_performer", "街头表演", "路边有人拉琴，琴盒里零散放着几枚硬币。城市给TA留了一小块舞台。", { mental: 1, money: -10 }, S.adult);
  r("lost_child_cry", "走失小孩哭了", "商场里一个小孩哭着找家长。周围大人同时变得紧张起来。", { awareness: 1, trust: 1 }, S.adult);
  r("public_toilet_line", "厕所排队", "一条队伍缓慢向前。人在排队时很容易看清自己的耐心库存。", { fatigue: 1, awareness: 1 }, S.all);
  r("small_fireworks", "远处烟花", "远处突然有几朵烟花。你不知道谁在庆祝，但借到了一点光。", { mental: 1, loneliness: -1 }, S.all);
  r("wrong_name_called", "被叫错名字", "有人叫错你的名字。你纠正了，或没纠正。名字轻轻歪了一下。", { awareness: 1 }, S.all);
  r("public_piano", "商场里的钢琴", "商场角落有人弹公共钢琴，弹得不完美，但很认真。", { mental: 1, trust: 1 }, S.all);
  r("queue_cut", "有人插队", "有人插队，队伍里出现一阵微妙的沉默。每个人都在等别人先说。", { shame: 1, awareness: 1 }, S.all);

  rc("help_carry", "要不要帮人搬一下", "有人搬重物卡在门口，看起来需要帮忙。", [
    { text: "上前搭把手", effects: { trust: 1, fatigue: 1, socialExp: 1 }, result: "东西过去了，对方的谢谢也过去了。小忙很小，但是真的。" },
    { text: "保持距离", effects: { awareness: 1 }, result: "你没有义务帮每一个人。只是这次你记住了。" }
  ], S.all);
  rc("public_mistake", "别人当众出错", "有人在公共场合出了糗。笑声已经快冒出来了。", [
    { text: "忍住不笑，帮TA解围", effects: { trust: 1, socialExp: 1 }, result: "对方感激地看了你一眼。体面有时靠陌生人维护。" },
    { text: "跟着笑", effects: { shame: 1, trust: -1 }, result: "你笑了。后来想起时，不觉得多好笑。" }
  ], S.all);
  rc("line_argument", "队伍里的争执", "排队时两个人因为先后顺序争起来，火气越来越大。", [
    { text: "提醒按号码来", effects: { awareness: 1, socialExp: 1 }, result: "规则把情绪按住了一点。" },
    { text: "离远一点", effects: { risk: -1 }, result: "你保住了清净，也保住了距离。" },
    { text: "加入争论", effects: { fatigue: 1, mental: -1 }, result: "你说得有理，但这一天被吵脏了一块。" }
  ], S.adult);
  rc("street_survey", "街头问卷", "有人拦你做问卷，说只要一分钟，还送小礼物。", [
    { text: "拒绝离开", effects: { awareness: 1 }, result: "一分钟通常不止一分钟。你走得很稳。" },
    { text: "填但不留敏感信息", effects: { socialExp: 1, awareness: 1 }, result: "你配合了一点，也保留了一点。" },
    { text: "全都认真填写", effects: { risk: 2, money: 20 }, result: "礼物很小，信息给得很多。" }
  ], S.adult);
  rc("beggar_sign", "求助牌子", "路边有人举着求助牌。你无法判断真假，也无法完全无动于衷。", [
    { text: "给一点吃的", effects: { money: -20, trust: 1 }, result: "你没有解决一个人的困境，只给了此刻一点具体帮助。" },
    { text: "联系救助站信息", effects: { awareness: 1, socialExp: 1 }, result: "帮助变得麻烦，但也更接近长期。" },
    { text: "走开", effects: { mental: -1 }, result: "你走开了。城市继续把问题摆在路边。" }
  ], S.adult);

  // Fraud-adjacent but not same old scam beats.
  r("receipt_qr", "小票上的二维码", "小票底部印着一个抽奖二维码。它看起来无害，像所有想要你扫码的东西一样。", { awareness: 1, risk: 1 }, S.adult);
  r("unknown_calendar_invite", "陌生日历邀请", "手机日历突然多出一个陌生会议邀请，标题写着'重要通知'。", { digitalSkill: 1, awareness: 1, risk: 1 }, S.adult);
  r("fake_wifi_name", "相似的WiFi名", "公共场所里有两个很像的WiFi名。一个多了个免费后缀。", { awareness: 1, digitalSkill: 1 }, S.adult);
  r("qr_sticker_overlap", "二维码被贴住了", "公告上的二维码被另一张贴纸覆盖了一半。你突然意识到线下也可以被篡改。", { awareness: 2 }, S.all);
  r("courier_code", "快递取件码", "有人站在快递柜前打电话大声念取件码。你听见了，却假装没听见。", { awareness: 1, shame: 1 }, S.adult);
  r("shared_power_bank", "共享充电宝没还", "共享充电宝忘了还，扣费一点点往上跳。机器很安静，账单很勤快。", { money: -60, awareness: 1 }, S.adult);
  r("trial_class_call", "体验课回访", "你只是领过一次资料，对方却持续打电话邀请体验课。热情像没有刹车。", { fatigue: 1, awareness: 1 }, S.family);
  r("warranty_expiring_call", "保修到期电话", "有人准确说出你买过的电器型号，提醒你购买延保。准确让人放松，也让人警觉。", { awareness: 1, risk: 1 }, S.family);
  r("parking_ticket_sms", "停车缴费短信", "一条停车缴费短信发来，金额很小，链接很短。小钱最容易让人不检查。", { awareness: 1, risk: 1 }, S.adult);
  r("parcel_photo", "快递照片", "快递员发来门口照片，里面拍到了你家门牌和门口物品。方便和暴露只隔一张图。", { awareness: 1, risk: 1 }, S.family);

  rc("scan_or_not", "扫码点餐", "餐厅只能扫码点餐。页面要求手机号授权，还默认勾选会员通知。", [
    { text: "取消勾选再点", effects: { awareness: 1, digitalSkill: 1 }, result: "饭还是点到了，营销少了一点。" },
    { text: "直接授权", effects: { risk: 1, fatigue: -1 }, result: "省了几秒，之后多了几条短信。" },
    { text: "请店员帮忙", effects: { socialExp: 1, shame: -1 }, result: "问人没有那么丢脸。店员很快帮你处理了。" }
  ], S.adult);
  rc("unknown_airdrop", "陌生蓝牙投送", "地铁里弹出一个陌生蓝牙投送请求，文件名写着'看看这个'。", [
    { text: "拒绝", effects: { awareness: 1, risk: -1 }, result: "好奇心被你按住了。它没有损失什么，只是没吃到糖。" },
    { text: "点开看看", effects: { risk: 2, shame: 1 }, result: "内容很怪。你立刻关掉，却已经后悔点开。" }
  ], S.teen.concat(S.adult));
  rc("free_gift_table", "免费小礼品", "商场摆着免费礼品台，只要登记姓名电话。", [
    { text: "不登记", effects: { awareness: 1 }, result: "你没有得到杯子，也没有得到后续推销。" },
    { text: "登记领取", effects: { risk: 1, greed: 1, money: 20 }, result: "礼品很轻，信息给得很重。" }
  ], S.adult);
  rc("password_on_paper", "别人桌上的密码纸", "你无意看见别人把密码写在便签上贴着。", [
    { text: "提醒TA收好", effects: { awareness: 1, trust: 1 }, result: "TA有点不好意思，但把便签撕了。" },
    { text: "装作没看见", effects: { awareness: 1 }, result: "你没越界，但也知道这个风险还在那里。" }
  ], S.adult);
  rc("photo_id_send", "对方让你拍证件", "一个流程要求你拍证件上传。页面看起来正规，但你仍然犹豫。", [
    { text: "核对官方入口", effects: { awareness: 2, digitalSkill: 1 }, result: "入口是真的，你也只传了必要信息。" },
    { text: "直接上传", effects: { risk: 2, fatigue: -1 }, result: "事情办快了，但你不知道照片会流向哪里。" },
    { text: "放弃办理", effects: { mental: -1, risk: -1 }, result: "安全了，也麻烦了。" }
  ], S.adult);

  // Money-weather, economy, household shocks.
  r("vegetable_price", "菜价涨了", "菜市场价格比上周贵了一点。宏观经济最后落在一把青菜上。", { awareness: 1, money: -80 }, S.family);
  r("electricity_bill", "电费异常", "这个月电费突然高了。你开始排查每一个插座，像侦探也像管家。", { awareness: 1, money: -300 }, S.family);
  r("repairman_late", "维修师傅迟到", "维修师傅迟到两个小时。你的时间被一种很家常的方式消耗了。", { fatigue: 1, mental: -1 }, S.family);
  r("water_pressure_low", "水压变小", "洗澡时水压突然变小。生活质量有时就是这么一股水。", { fatigue: 1 }, S.family);
  r("rent_neighbor_move", "隔壁搬走", "隔壁搬家，楼道里堆着纸箱。你看见一个家庭被打包成几十个方块。", { awareness: 1, loneliness: 1 }, S.adult);
  r("salary_arrives_late", "工资晚到一天", "工资比平时晚到一天。只是一天，却足够让你重新认识现金流。", { awareness: 1, mental: -1 }, S.work);
  r("atm_no_cash", "ATM没钱了", "ATM提示暂时无法取款。一个机器的空，让你突然想起现金仍然是实物。", { awareness: 1, fatigue: 1 }, S.adult);
  r("old_deposit_book", "旧存折", "你翻出一本旧存折。上面的数字不大，却写着一段很慢的时代。", { awareness: 1, mental: 1 }, S.old);

  rc("raise_price_or_quality", "熟食店涨价", "常买的熟食店涨价了，老板说成本高。你知道TA可能没骗你，但钱包也是真的。", [
    { text: "继续买少一点", effects: { money: -40, trust: 1 }, result: "生活没有断，只是份量变小。" },
    { text: "换一家", effects: { socialExp: 1, awareness: 1 }, result: "新店不一定更好，但你重新有了选择。" }
  ], S.family);
  rc("used_item_sale", "卖闲置", "你准备卖掉闲置物品。买家问能不能脱离平台交易，便宜一点。", [
    { text: "坚持平台交易", effects: { awareness: 2 }, result: "麻烦一点，但保障还在。" },
    { text: "私下交易", effects: { risk: 2, money: 100 }, result: "你多收了一点，也多承担了一截不确定。" },
    { text: "不卖了", effects: { mental: 1 }, result: "东西继续占地方，但风险也停在门外。" }
  ], S.adult);
  rc("refund_delay", "退款迟迟不到账", "一笔退款迟迟没到账。客服话术很柔软，时间很硬。", [
    { text: "保存记录继续催", effects: { awareness: 1, fatigue: 1 }, result: "你把截图整理好。事情终于有了推进。" },
    { text: "放弃这笔小钱", effects: { money: -200, mental: 1 }, result: "你买回一点清净，也让对方赢得很轻松。" }
  ], S.adult);
  rc("home_budget_cut", "这个月要省一点", "预算突然紧了。你需要从一些小快乐里剪掉几块。", [
    { text: "保留一个最重要的", effects: { awareness: 1, mental: 1 }, result: "节省不是惩罚。留一个小快乐，日子才不会太硬。" },
    { text: "全部砍掉", effects: { money: 500, mental: -1 }, result: "账面好看了，心情薄了。" },
    { text: "先刷信用卡顶上", effects: { debt: 1000, risk: 1 }, result: "这个月过去了，下个月提前来了。" }
  ], S.adult);
  rc("charity_receipt", "公益捐赠回执", "你收到一张很正式的公益捐赠回执。善意变成编号和公章。", [
    { text: "保存记录", effects: { awareness: 1, trust: 1 }, result: "透明让善意更稳。" },
    { text: "转发给朋友", effects: { socialExp: 1, trust: 1 }, result: "不是炫耀，只是让可信渠道多一点。" }
  ], S.adult);

  // Purely odd, comic, but stateful.
  r("sock_missing", "袜子少了一只", "洗完衣服，袜子少了一只。家里可能存在一个专吃单只袜子的黑洞。", { mental: 1, fatigue: 1 }, S.all);
  r("phone_under_pillow", "手机在枕头下", "你找手机找了十分钟，最后发现它在枕头下，安静得像卧底。", { fatigue: 1, mental: 1 }, S.all);
  r("auto_door_refuse", "自动门不认你", "自动门对前后的人都开，唯独到你这里没反应。你短暂怀疑自己是否存在。", { mental: 1, shame: 1 }, S.all);
  r("voice_assistant_mishear", "语音助手听岔了", "你让语音助手定闹钟，它给你播放了一首悲伤情歌。机器也有自己的理解。", { mental: 1, digitalSkill: 1 }, S.all);
  r("rice_cooker_song", "电饭煲唱歌", "电饭煲完成时响起一段过分欢快的提示音。饭好了，生活突然有了配乐。", { mental: 1 }, S.family);
  r("pocket_treasure", "口袋里的意外收获", "你在旧外套口袋里摸到一张零钱和一颗糖。过去的你给现在留了小费。", { money: 50, mental: 1 }, S.all);
  r("wrong_weather", "天气预报失准", "预报说晴，你被雨淋成证据。科学也偶尔让人狼狈。", { fatigue: 1, mental: -1 }, S.all);
  r("bag_zip_open", "包拉链开着", "路人提醒你包拉链开着。你一边道谢，一边迅速清点人生。", { awareness: 1, trust: 1 }, S.all);

  rc("mystery_food", "冰箱里的神秘盒子", "冰箱里有个不知道什么时候放进去的盒子。它已经拥有了自己的气场。", [
    { text: "勇敢打开", effects: { awareness: 1, fatigue: 1 }, result: "你立刻决定丢掉。勇敢有时就是确认该放弃。" },
    { text: "直接丢掉", effects: { awareness: 1 }, result: "你没有给它解释机会。家里空气都轻了一点。" }
  ], S.family);
  rc("captcha_fail", "验证码总是错", "你输入验证码，系统说错。你看着那几条扭曲的线，开始怀疑人类文明。", [
    { text: "刷新重来", effects: { fatigue: 1, digitalSkill: 1 }, result: "新的更难。你和机器互相不信任。" },
    { text: "改用短信验证", effects: { awareness: 1 }, result: "路绕开了，尊严保住一点。" }
  ], S.adult);
  rc("unexpected_free_time", "突然空出半天", "一个安排取消了，你突然多出半天自由。自由来得太突然，反而不知道怎么用。", [
    { text: "补觉", effects: { fatigue: -2, mental: 1 }, result: "你睡醒时，世界还在，但温柔了一点。" },
    { text: "处理拖延小事", effects: { awareness: 1, mental: 1 }, result: "几件小事清掉后，脑子像擦过桌面。" },
    { text: "刷手机刷过去", effects: { fatigue: 1, mental: -1 }, result: "半天没有痛苦地消失，也没有真正被你拥有。" }
  ], S.adult);
  rc("accidental_nap", "不小心睡着", "你只是想躺五分钟，醒来时天色已经变了。", [
    { text: "接受身体需要休息", effects: { fatigue: -2, mental: 1 }, result: "你没有责怪自己。身体终于抢回一次话语权。" },
    { text: "懊恼浪费时间", effects: { mental: -1, shame: 1 }, result: "你休息了，又用内疚把休息抵消了一半。" }
  ], S.all);
  rc("tiny_lie", "一个很小的谎", "你为了省事说了一个小谎。它太小了，小到只有你自己知道。", [
    { text: "找机会补正", effects: { trust: 1, shame: -1 }, result: "事情没有变大。你把它按回了小事。" },
    { text: "让它过去", effects: { shame: 1 }, result: "它确实过去了，只是偶尔回头看你。" }
  ], S.teen.concat(S.adult));

  // Education path events shaped by mainland schooling and skill-development routes.
  r("key_high_school_pressure", "重点高中的第一次月考", "重点高中的第一次月考把你打醒了。以前能靠聪明，现在只能靠稳定和方法。", { awareness: 1, mental: -1, fatigue: 1 }, ["middle_school"], function(s) { return s.lifeFlags.high_school_key; }, 0.18);
  r("regular_high_school_teacher", "普通高中的班主任", "班主任说：'学校只是平台，真正决定你走多远的，是每天怎么过。'这话不酷，但很实在。", { awareness: 1, familyTrust: 1 }, ["middle_school"], function(s) { return s.lifeFlags.high_school_regular; }, 0.16);
  r("vocational_first_workbench", "实训台前", "你第一次站到实训台前。工具、图纸、材料摆开后，学习变得很具体。", { socialExp: 1, digitalSkill: 1, mental: 1 }, ["middle_school", "college"], function(s) { return s.lifeFlags.vocational_school || s.lifeFlags.five_year_college || s.lifeFlags.college_zhuanke; }, 0.16);
  r("dropout_factory_gate", "厂门口的早晨", "你很早站在厂门口，身边都是赶早班的人。劳动值得尊重，但你也第一次想念教室的灯。", { socialExp: 1, awareness: 1, mental: -1 }, ["middle_school", "college", "early_career"], function(s) { return s.lifeFlags.education_dropout || s.lifeFlags.early_work_after_middle_school; }, 0.16);
  r("gaokao_parent_silence", "高考前夜", "高考前夜，家里反而很安静。饭菜比平时清淡，话也比平时少。", { familyTrust: 1, mental: 1, fatigue: -1 }, ["middle_school"], function(s) { return s.age >= 17 && s.age <= 18 && s.lifeFlags.education_high_school; }, 0.18);
  r("admission_letter_photo", "录取通知书照片", "录取通知书摊在桌上，家里人轮流拍照。那张纸不仅属于你，也属于一家人的盼头。", { familyTrust: 2, mental: 1 }, ["college"], function(s) { return s.lifeFlags.college_bachelor || s.lifeFlags.college_zhuanke || s.lifeFlags.college_1ben || s.lifeFlags.college_211 || s.lifeFlags.college_985; }, 0.16);
  r("985_roommates", "强者如云的宿舍", "你发现室友都很厉害。有人竞赛保送，有人英语流利。短暂自卑后，你开始重新校准自己。", { awareness: 2, shame: 1, socialExp: 1 }, ["college"], function(s) { return s.lifeFlags.college_985; }, 0.18);
  r("211_platform", "平台带来的窗口", "学院请来行业老师做讲座。你第一次近距离听见一个行业如何运转。", { awareness: 2, socialExp: 1 }, ["college"], function(s) { return s.lifeFlags.college_211; }, 0.18);
  r("bachelor_room_for_growth", "本科四年的余地", "课程、社团、实习、考证一起涌来。普通本科没有替你铺好路，但给了你试错的空间。", { awareness: 1, socialExp: 1, mental: 1 }, ["college"], function(s) { return s.lifeFlags.college_bachelor && !s.lifeFlags.college_1ben; }, 0.16);
  r("junior_college_internship", "专科第一次跟岗", "你跟着师傅去现场。课本上的词变成机器声、工单和客户需求。", { socialExp: 2, digitalSkill: 1, fatigue: 1 }, ["college"], function(s) { return s.lifeFlags.college_zhuanke; }, 0.18);
  r("first_party_class", "一堂公共课", "课堂讲到诚信、法治、劳动和责任。你不一定每句话都记住，但知道这些词最终会落到每个选择里。", { awareness: 1, trust: 1 }, ["middle_school", "college"], function(s) { return s.age >= 15 && s.age <= 24; }, 0.12);
  r("national_scholarship_wall", "奖学金公示栏", "奖学金名单贴出来了。你看见别人的名字，也看见了那些看不见的日日夜夜。", { awareness: 1, shame: 1 }, ["college"], function(s) { return s.lifeFlags.college_bachelor || s.lifeFlags.college_zhuanke; }, 0.12);
  r("adult_education_night", "夜校的灯", "下班后你去上课。教室里有人穿工装，有人拎电脑包。大家都很累，也都没放弃。", { awareness: 2, fatigue: 1, mental: 1 }, ["early_career", "family_career"], function(s) { return s.lifeFlags.work_then_adult_education; }, 0.18);
  r("skill_competition", "技能大赛报名表", "老师建议你报名技能大赛。你以前觉得比赛离自己很远，现在表格就在手里。", { digitalSkill: 1, socialExp: 1, mental: 1 }, ["middle_school", "college"], function(s) { return s.lifeFlags.vocational_school || s.lifeFlags.college_zhuanke || s.lifeFlags.five_year_college; }, 0.16);
  r("campus_graduation_photo", "毕业照那天", "毕业照那天，大家都笑得很用力。你知道有些人以后很难再见。", { loneliness: 1, socialExp: 1, mental: 1 }, ["college"], function(s) { return s.age >= 22 && (s.lifeFlags.college_bachelor || s.lifeFlags.college_zhuanke); }, 0.14);

  rc("gaokao_volunteer_form", "填志愿表", "志愿表像一张很小的地图，学校、城市、专业、学费都挤在几行格子里。", [
    { text: "按兴趣和就业认真平衡", effects: { awareness: 2, familyTrust: 1 }, result: "你没有只看名气，也没有只看热门。选择仍然难，但它开始像你的选择。" },
    { text: "全听亲戚建议", effects: { familyTrust: 1, awareness: -1 }, result: "亲戚很热心，但TA不用替你上四年课。" },
    { text: "只冲最热门专业", effects: { greed: 1, risk: 1 }, result: "热门不是错，只是你还没问自己适不适合。" }
  ], ["middle_school"], function(s) { return s.age >= 17 && s.age <= 18 && s.lifeFlags.education_high_school; }, 0.18);
  rc("college_major_change", "要不要转专业", "开学后你发现专业和想象不太一样。转专业有机会，但名额少、要求高。", [
    { text: "认真准备转专业", effects: { awareness: 2, fatigue: 1 }, result: "你查规则、补课程、问老师。哪怕最后不成，你也更清楚自己想要什么。" },
    { text: "先把本专业学扎实", effects: { awareness: 1, mental: 1 }, result: "你没有马上逃离，而是先把手里的牌打明白。" },
    { text: "摆一阵再说", effects: { fatigue: -1, shame: 1 }, result: "轻松了一阵，焦虑也在后面排队。" }
  ], ["college"], function(s) { return s.lifeFlags.college_bachelor || s.lifeFlags.college_zhuanke; }, 0.16);
  rc("scholarship_or_parttime", "奖学金还是兼职", "这个学期你时间有限：是冲奖学金，还是多做兼职缓解生活费？", [
    { text: "冲奖学金", effects: { awareness: 2, money: 1000, fatigue: 1 }, result: "你把精力放到学习上。结果未必稳，但能力在涨。" },
    { text: "多做兼职", effects: { money: 2500, socialExp: 1, fatigue: 1 }, result: "钱来得更实在，也挤压了学习时间。" },
    { text: "两边都保一点", effects: { awareness: 1, money: 1000, fatigue: 2 }, result: "成年人式平衡提前上场：都要一点，也都累一点。" }
  ], ["college"], function(s) { return s.lifeFlags.college_bachelor || s.lifeFlags.college_zhuanke; }, 0.16);
  rc("dropout_second_chance", "重新学习的机会", "工作后，你看到成人教育、技能培训或开放大学的招生信息。你心里动了一下。", [
    { text: "报名继续学习", effects: { money: -2000, awareness: 2, fatigue: 1 }, result: "你重新坐回课桌前。路绕远了，但还在向前。" },
    { text: "先把工作做好", effects: { socialExp: 1, money: 1000 }, result: "你没有马上报名，但开始留意下一次机会。" },
    { text: "算了，太晚了", effects: { mental: -1, shame: 1 }, result: "其实不晚，只是你太累了。" }
  ], ["early_career", "family_career"], function(s) { return s.lifeFlags.education_dropout || s.lifeFlags.no_college || s.lifeFlags.work_then_adult_education; }, 0.18);

  aec("education_parent_talk", "和家里谈升学", "升学选择摆在眼前，家里人比你还紧张。每个人都想你好，只是理解的'好'不完全一样。", ["career_planning", "gaokao_review", "zhongkao_review"], [
    { text: "把想法和现实都摊开说", effects: { familyTrust: 2, awareness: 1 }, result: "谈得不轻松，但你们终于不是各自焦虑。" },
    { text: "先顺着家里说", effects: { familyTrust: 1, mental: -1 }, result: "家里放心了一点，你心里却还悬着。" },
    { text: "赌气不沟通", effects: { familyTrust: -2, shame: 1 }, result: "你保住了态度，也失去了支持。" }
  ], ["middle_school", "college"], function(s) { return s.age >= 15 && s.age <= 20; }, 0.18);
  ae("volunteer_growth_record", "志愿服务记录", "志愿服务结束后，老师让你写一段记录。你写到最后发现，帮助别人也在整理自己。", ["volunteer_service", "community_service_adult"], { socialExp: 1, trust: 1, awareness: 1 }, ["middle_school", "college", "early_career", "family_career"], null, 0.16);
  ae("law_class_receipt", "法治课后的收据", "上完法治课，你回去看了一眼自己的购物记录和会员协议。规则突然不再遥远。", ["law_class"], { awareness: 2, digitalSkill: 1 }, ["middle_school", "college"], null, 0.18);
  ae("skills_teacher_praise", "师傅点了点头", "技能训练时，师傅看了看你的作品，说：'这次像样了。'这句话比夸奖更像通行证。", ["skills_training"], { digitalSkill: 1, socialExp: 1, mental: 1 }, ["middle_school", "college", "early_career"], null, 0.16);
  ae("library_choice_quiet", "图书馆里的选择", "图书馆里有人刷题，有人睡觉，有人低头打游戏。你突然意识到，同一个地方也会通向不同人生。", ["library_study", "reading_habit"], { awareness: 1, mental: 1 }, ["childhood", "middle_school", "college"], null, 0.16);

  // Childhood nostalgia: tiny money, big memory.
  r("latiao_after_school", "放学后的辣条", "放学路上，你攥着一块钱在小卖部门口犹豫很久，最后买了一包辣条。塑料袋一撕开，整个下午都有味道了。", { money: -1, mental: 1, greed: 1 }, ["childhood"], null, 0.18);
  r("crisp_noodle_card", "干脆面里的卡片", "你买了一包干脆面，不完全是为了吃，主要是为了里面那张卡。卡片抽出来的瞬间，比面还香。", { money: -2, mental: 1, greed: 1 }, ["childhood"], null, 0.16);
  r("school_gate_popsicle", "校门口的冰棍", "夏天放学，校门口的小冰柜冒着白气。你买了一根五毛钱的冰棍，舌头被冻得发麻。", { money: -1, mental: 1, fatigue: -1 }, ["childhood"], null, 0.16);
  r("marble_trade", "玻璃弹珠交换", "你用两颗普通弹珠换来一颗带花纹的。回家路上你一直把它举到阳光底下看。", { socialExp: 1, mental: 1 }, ["childhood"], null, 0.15);
  r("sticker_album_gap", "贴纸本缺一张", "贴纸本快集齐了，只差一张。你明知道再买一包也未必有，但那种差一点的感觉很抓人。", { greed: 1, awareness: 1, money: -2 }, ["childhood"], null, 0.15);
  r("pencil_box_treasure", "铁皮文具盒", "你打开铁皮文具盒，里面有削短的铅笔、香味橡皮和一张皱巴巴的课程表。那是你的小仓库。", { mental: 1, awareness: 1 }, ["childhood"], null, 0.15);
  r("red_scarf_lost", "红领巾不见了", "早上快迟到了，你怎么也找不到红领巾。最后在书包最底下摸出来，像从海底捞上来一样。", { fatigue: 1, mental: 1 }, ["childhood"], null, 0.14);
  r("tv_animation_time", "守着动画片时间", "你算准动画片开播时间，提前坐在电视机前。广告很长，但你一点也不敢离开。", { mental: 1, loneliness: -1 }, ["childhood"], null, 0.14);
  rc("two_yuan_shop_choice", "两块钱的小卖部选择", "你口袋里只有两块钱。小卖部里有辣条、泡泡糖、干脆面和贴纸包，每一样都像在叫你。", [
    { text: "买辣条和泡泡糖", effects: { money: -2, mental: 1, greed: 1 }, result: "你和同学分着吃。嘴巴辣，心里很满足。" },
    { text: "买干脆面抽卡", effects: { money: -2, greed: 1, mental: 1 }, result: "卡片不是你想要的那张，但你还是把它夹进了书里。" },
    { text: "忍住，留到明天", effects: { awareness: 1, greed: -1 }, result: "你把两块钱重新塞回口袋。小小的克制，也是一种本事。" }
  ], ["childhood"], null, 0.17);
  rc("parents_keep_lucky_money", "压岁钱上交", "亲戚给你的红包还没捂热，爸妈就说：'来，先帮你存着。'", [
    { text: "乖乖上交", effects: { familyTrust: 1, mental: -1 }, result: "你点点头。你不知道钱到底存到哪里去了，但这句话你记了很多年。" },
    { text: "商量留十块", effects: { money: 10, awareness: 1 }, result: "你争取到十块钱。那一刻，你觉得自己像个会谈判的大人。" },
    { text: "偷偷藏一张", effects: { money: 20, shame: 1, familyTrust: -1 }, result: "你把一张小面额纸币夹进书里。后来每次翻书都心跳一下。" }
  ], ["childhood"], null, 0.16);

  // Hobbies, careers, speculative assets, short dramas, and tiny impossible things.
  r("guitar_stairwell_song", "楼梯间的吉他声", "你在楼梯间练吉他，回声把错音放大，也把那点少年气放大。", { mental: 1, socialExp: 1 }, ["middle_school", "college", "early_career"], function(s) { return s.hobbyTags.indexOf("guitar") !== -1; }, 0.16);
  r("piano_neighbor_note", "隔壁递来的纸条", "隔壁邻居递来纸条：'弹得比上个月顺了。'你本来以为TA只是在忍耐。", { mental: 1, trust: 1 }, S.young.concat(["early_career"]), function(s) { return s.hobbyTags.indexOf("piano") !== -1; }, 0.15);
  r("erhu_park_duet", "公园二胡合奏", "公园里一位老人听你拉二胡，默默跟上另一段旋律。你们没说话，却合奏了半首曲子。", { mental: 2, loneliness: -1 }, S.old, function(s) { return s.hobbyTags.indexOf("erhu") !== -1; }, 0.18);
  r("choir_wrong_part", "合唱跑到别的声部", "合唱排练时你一激动唱进了别的声部。大家笑了一下，又把你带回节奏里。", { shame: 1, socialExp: 1, mental: 1 }, S.family, function(s) { return s.hobbyTags.indexOf("singing") !== -1; }, 0.15);
  r("basketball_last_assist", "最后一球选择传球", "篮球场最后一球，你没有硬投，而是传给空位队友。球进了，大家击掌。", { socialExp: 2, trust: 1 }, ["middle_school", "college", "early_career"], function(s) { return s.hobbyTags.indexOf("basketball") !== -1; }, 0.16);
  r("badminton_court_friend", "羽毛球场的固定搭子", "你和一个总在同一时段打球的人熟了起来。成年人交朋友，有时从订场开始。", { socialExp: 1, loneliness: -1, mental: 1 }, S.adult, function(s) { return s.hobbyTags.indexOf("badminton") !== -1; }, 0.16);
  r("swimming_lane_rule", "泳道里的规矩", "游泳馆里你学会了靠右、避让、观察水况。运动也有公共秩序。", { awareness: 1, trust: 1, fatigue: -1 }, S.adult.concat(["middle_school"]), function(s) { return s.hobbyTags.indexOf("swimming") !== -1; }, 0.16);
  r("martial_arts_restraint", "收住的一拳", "练搏击时你本能地想赢，但教练提醒你先学会收住。力量和克制是一体的。", { mental: 1, shame: -1, awareness: 1 }, S.young.concat(["early_career"]), function(s) { return s.hobbyTags.indexOf("martial_arts") !== -1; }, 0.16);
  r("calligraphy_red_paper", "春联写歪了", "你帮家里写春联，第一个字略歪。家人说有手写味，你决定相信这个说法。", { familyTrust: 1, mental: 1 }, S.all, function(s) { return s.hobbyTags.indexOf("calligraphy") !== -1; }, 0.15);
  r("photography_permission", "被拍摄者的点头", "你想拍一个街头瞬间，先征得对方同意。照片少了一点偷来的戏剧性，多了一点尊重。", { awareness: 1, trust: 1 }, S.adult, function(s) { return s.hobbyTags.indexOf("photography") !== -1; }, 0.15);
  r("cooking_first_table", "第一次做一桌菜", "你第一次独立做出一桌菜。味道不完全统一，但所有人都吃得很认真。", { familyTrust: 2, mental: 1, money: -120 }, S.family, function(s) { return s.hobbyTags.indexOf("cooking") !== -1; }, 0.17);
  r("history_antique_sober", "历史书里的古玩热", "你读到某个朝代的收藏风潮，忽然明白：故事越漂亮，越要问来源。", { awareness: 2, greed: -1 }, S.adult, function(s) { return s.hobbyTags.indexOf("history") !== -1 || s.antiqueCollection > 0; }, 0.17);
  r("math_probability_flash", "概率救了你一下", "朋友说某个玩法'十拿九稳'，你脑子里突然冒出期望值三个字。冲动就这样被按住了。", { awareness: 2, greed: -1, risk: -1 }, S.adult, function(s) { return s.hobbyTags.indexOf("math") !== -1; }, 0.17);
  r("astronomy_meteor_quiet", "一颗流星", "你看见一颗流星划过。愿望还没想好，它已经消失，像一条不等人的消息。", { mental: 2, loneliness: -1 }, S.all, function(s) { return s.hobbyTags.indexOf("astronomy") !== -1; }, 0.16);

  rc("sports_minor_injury", "运动后的轻伤", "一次运动后，你的脚踝有点不舒服。还要不要继续硬撑？", [
    { text: "休息并处理", effects: { fatigue: -1, awareness: 1, money: -80 }, result: "你停下来冰敷。少打一场球，少养一个大伤。" },
    { text: "硬撑打完", effects: { fatigue: 2, mental: -1 }, result: "你赢了面子，输给了脚踝。" }
  ], S.adult.concat(["middle_school", "college"]), function(s) { return s.hobbyTags.indexOf("basketball") !== -1 || s.hobbyTags.indexOf("badminton") !== -1 || s.hobbyTags.indexOf("swimming") !== -1 || s.hobbyTags.indexOf("martial_arts") !== -1; }, 0.14);

  r("short_drama_reality_topic", "现实题材短剧", "你刷到一部讲外卖员、照护老人和小城青年处境的短剧。它没有硬反转，却让你停了很久。", { mental: 1, socialExp: 1, awareness: 1 }, S.adult, function(s) { return s.hobbyTags.indexOf("short_drama") !== -1; }, 0.16);
  r("short_drama_ai_scene", "AI生成的片头", "一部短剧片头明显用了AI生成画面。效果很炫，但你也开始留意版权和标注。", { digitalSkill: 1, awareness: 1 }, S.adult.concat(["middle_school"]), function(s) { return s.hobbyTags.indexOf("short_drama") !== -1 || s.hobbyTags.indexOf("short_drama_create") !== -1; }, 0.15);
  r("short_drama_culture_tour", "文旅短剧爆了", "一个小城因为短剧取景地火了一阵。你第一次认真看见镜头如何改变一条街的人流。", { socialExp: 1, awareness: 1 }, S.adult, function(s) { return s.hobbyTags.indexOf("short_drama") !== -1 || s.careerId === "media_creator"; }, 0.14);
  r("short_drama_three_minute_hook", "三分钟的钩子", "短剧前三分钟安排了误会、反转和悬念。你知道它在钩你，但还是想看下一集。", { mental: 1, fatigue: 1, greed: 1 }, S.all, function(s) { return s.hobbyTags.indexOf("short_drama") !== -1; }, 0.16);
  rc("short_drama_paid_unlock", "付费解锁全集", "短剧看到关键处弹出付费解锁。价格不高，但情绪已经被架起来了。", [
    { text: "理性只买几集", effects: { money: -30, mental: 1, awareness: 1 }, result: "你承认自己想看，但没有被情绪拖着走。" },
    { text: "一口气解锁", effects: { money: -180, fatigue: 1, greed: 1 }, result: "爽是爽了，账单也很真实。" },
    { text: "去找同类免费内容", effects: { digitalSkill: 1, risk: 1 }, result: "你找到了更多内容，也撞见不少诱导下载。" }
  ], S.all, function(s) { return s.hobbyTags.indexOf("short_drama") !== -1; }, 0.16);
  rc("short_drama_casting_notice", "短剧招募群", "有人拉你进短剧拍摄招募群，说日结、包红、还有机会签约。", [
    { text: "先核实公司和合同", effects: { awareness: 2, socialExp: 1 }, result: "你查了主体、片酬、肖像权和违约条款。热闹归热闹，合同不能糊涂。" },
    { text: "直接交报名费", effects: { money: -1200, shame: 1, risk: 2 }, result: "对方收完钱后，群公告突然安静得很专业。" },
    { text: "婉拒但留意正规机会", effects: { awareness: 1, mental: 1 }, result: "你没有否定兴趣，只是把机会和套路分开。" }
  ], ["college", "early_career", "family_career"], function(s) { return s.hobbyTags.indexOf("short_drama_create") !== -1 || s.careerId === "media_creator"; }, 0.17);

  r("career_first_raise", "第一次调薪", "年度沟通后，你的工资涨了一点。不是暴富，但你知道自己的积累被看见了。", { money: 3500, mental: 1 }, S.work, function(s) { return !!s.careerId && s.careerLevel <= 3; }, 0.14);
  r("career_salary_freeze", "薪资冻结", "单位通知今年薪资冻结。你有点失落，也开始重新审视现金流和能力储备。", { mental: -1, awareness: 1, greed: -1 }, S.work, function(s) { return !!s.careerId; }, 0.12);
  r("public_service_order", "规范流程的一天", "你在公共服务岗处理了一堆材料。慢、细、不能错，这也是一种责任。", { trust: 1, fatigue: 1, awareness: 1 }, S.work, function(s) { return s.careerId === "public_service"; }, 0.18);
  r("tech_product_reorg", "项目方向调整", "技术/产品线突然调整方向。你熬夜迁移方案，也看见了变化行业里的不确定。", { digitalSkill: 1, fatigue: 2, risk: 1 }, S.work, function(s) { return s.careerId === "tech_product"; }, 0.18);
  r("education_health_thank_you", "一句谢谢", "教育/医疗岗位里，一句真诚的谢谢让你顶住了一整天的疲惫。", { trust: 1, mental: 1, fatigue: 1 }, S.work, function(s) { return s.careerId === "education_health"; }, 0.18);
  r("skilled_worker_masterpiece", "一次漂亮的返工", "你把一个问题返工到位。师傅看了看，说以后这种活可以交给你。", { digitalSkill: 1, socialExp: 1, mental: 1 }, S.work, function(s) { return s.careerId === "skilled_worker"; }, 0.18);
  r("sales_business_big_order", "一笔大单", "一笔大单谈成了，饭局和电话都没白熬。你高兴，也知道不能把运气当能力。", { money: 6000, socialExp: 1, greed: 1 }, S.work, function(s) { return s.careerId === "sales_business"; }, 0.16);
  r("media_creator_copyright", "版权提醒", "你剪的视频被平台提醒版权问题。流量再急，也得尊重别人的作品。", { awareness: 2, digitalSkill: 1, mental: -1 }, S.work, function(s) { return s.careerId === "media_creator"; }, 0.18);
  r("flexible_work_social_security", "社保缴费提醒", "灵活就业的缴费提醒来了。自由很真，账单也很真。", { awareness: 1, money: -1200, mental: 1 }, S.work, function(s) { return s.careerId === "flexible_work"; }, 0.18);
  r("office_staff_meeting_minutes", "会议纪要", "你写了一份清楚的会议纪要，领导没夸，但后续推进顺了很多。", { awareness: 1, socialExp: 1 }, S.work, function(s) { return s.careerId === "office_staff"; }, 0.18);
  ae("career_deep_work_breakthrough", "职业上的小突破", "深耕一阵后，你终于把一个卡住很久的问题解决了。能力像地基，平时看不见，关键时刻撑得住。", ["career_deep_work"], { money: 2500, mental: 1, socialExp: 1 }, S.work, function(s) { return !!s.careerId; }, 0.18);
  aec("job_switch_offer", "新机会来了", "跳槽计划推进后，一个新机会找上门。薪资更高，但节奏也更猛。", ["job_switch_plan"], [
    { text: "认真评估后接受", effects: { money: 5000, fatigue: 1, risk: 1 }, stateEffects: { careerLevel: 1 }, result: "你没有只看涨薪，也看了合同、社保和发展空间。新阶段开始了。" },
    { text: "留在当前岗位深挖", effects: { mental: 1, awareness: 1 }, result: "你放弃了眼前涨幅，把确定性和积累放在更前面。" },
    { text: "被高薪冲昏头", effects: { greed: 2, risk: 2, fatigue: 1 }, result: "你答应得很快，后面才发现岗位描述里的省略号很多。" }
  ], S.work, function(s) { return !!s.careerId; }, 0.18);

  r("house_market_cools", "楼市降温", "你关注的片区挂牌价松动。焦虑没有消失，但你终于不用追着中介跑。", { awareness: 1, mental: 1, greed: -1 }, S.adult, function(s) { return s.houseMarketHeat > 0 || s.lifeFlags.has_house; }, 0.16);
  r("house_property_fee", "物业费账单", "物业费、维修基金、车位费一项项出现。买房不是结局，是长期运营。", { awareness: 1, money: -900 }, S.adult, function(s) { return s.lifeFlags.has_house; }, 0.16);
  r("house_school_district_hype", "学区房热帖", "有人在群里疯狂转发学区房消息。你看完很焦虑，又去查了官方招生政策。", { awareness: 2, fatigue: 1 }, S.family, function(s) { return s.lifeFlags.has_child || s.houseMarketHeat > 0; }, 0.15);
  r("house_secondhand_leak", "二手房漏水痕迹", "看房时你在墙角发现旧水痕。中介说'小问题'，你决定找专业验房。", { awareness: 2, money: -300 }, S.adult, function(s) { return s.houseMarketHeat > 0 && !s.lifeFlags.has_house; }, 0.16);
  rc("house_or_rent", "买还是租", "你手里有些积蓄，也看了不少房。是上车，还是继续租房保持灵活？", [
    { text: "量力而行买小房", effects: { money: -30000, debt: 60000, mental: 1 }, setFlag: "has_house", stateEffects: { houseMarketHeat: -2 }, result: "房子不大，但月供在可承受范围内。你没有让面子替你签合同。" },
    { text: "继续租住攒现金", effects: { money: 2000, awareness: 1, mental: 1 }, result: "你保留了流动性。房子以后再看，生活先稳住。" },
    { text: "冲动追热门盘", effects: { money: -20000, debt: 90000, greed: 2, risk: 2 }, setFlag: "has_house", stateEffects: { houseMarketHeat: 1 }, result: "你挤上了车，也把未来几年绑紧了。" }
  ], S.adult, function(s) { return !s.lifeFlags.has_house && s.money >= 30000 && s.houseMarketHeat > 0; }, 0.14);

  r("stock_dividend_message", "分红到账", "你持有的一点股票分红到账。数字不大，却提醒你投资不只有涨跌。", { money: 600, mental: 1 }, S.adult, function(s) { return s.stockPosition > 0; }, 0.15);
  r("stock_bear_day", "一根大阴线", "市场突然大跌，群里一片沉默。你盯着账户，终于知道风险不是课本词。", { mental: -1, fatigue: 1, awareness: 1 }, S.adult, function(s) { return s.stockPosition > 0; }, 0.16);
  r("stock_bull_noise", "牛市传闻", "身边人都在聊翻倍机会。你看着热闹，提醒自己别把别人的盈利当自己的本金。", { greed: 1, awareness: 1 }, S.adult, function(s) { return s.stockPosition > 0 || s.money >= 5000; }, 0.16);
  rc("stock_hot_tip", "朋友的内幕消息", "朋友神秘地说有个'内部消息'，让你赶紧买入。", [
    { text: "拒绝内幕，查公开信息", effects: { awareness: 2, trust: 1, greed: -1 }, result: "你没有把友情变成赌注。公开信息已经足够你判断不该冲动。" },
    { text: "小仓位试试", effects: { money: -800, greed: 1, risk: 1 }, stateEffects: { stockPosition: 1 }, result: "你买得不多，但也清楚这是投机，不是投资。" },
    { text: "重仓梭哈", effects: { money: -5000, greed: 3, risk: 3, mental: -1 }, stateEffects: { stockPosition: 2 }, result: "你把刺激感误认为确定性。账户开始替你上课。" }
  ], S.adult, function(s) { return s.money >= 5000; }, 0.15);
  ae("index_invest_discipline", "定投日", "到了定投日，市场不热闹，账户也没什么戏剧性。你按计划买入，像给未来投一张安静的票。", ["stock_index_invest"], { awareness: 1, greed: -1, mental: 1 }, S.adult, null, 0.18);
  ae("speculation_drawdown", "短线回撤", "短线操作遇到回撤，你突然很想加倍追回来。屏幕上的红绿，正在指挥你的情绪。", ["stock_speculation"], { money: -1200, fatigue: 1, awareness: 1 }, S.adult, null, 0.2);

  r("antique_appraisal_line", "排队鉴定", "你带着一件小物件去公益鉴定。专家说：'东西普通，但故事是真的。'你反而松了口气。", { awareness: 1, mental: 1 }, S.family, function(s) { return s.antiqueCollection > 0; }, 0.18);
  r("antique_fake_patina", "过分均匀的包浆", "摊上一件器物包浆漂亮得像滤镜。你多问了来源，对方开始绕圈子。", { awareness: 2, greed: -1 }, S.family, function(s) { return s.antiqueCollection > 0 || s.hobbyTags.indexOf("antiques") !== -1; }, 0.18);
  r("antique_inherited_bowl", "家里旧碗", "亲戚说家里旧碗可能值钱。你查了一圈，发现它值不了大钱，但值几代人的饭桌。", { familyTrust: 1, mental: 1, greed: -1 }, S.family, function(s) { return s.age >= 35; }, 0.13);
  rc("antique_live_auction", "直播间拍古玩", "直播间里主播喊着'捡漏'，倒计时压得人心跳加快。", [
    { text: "只看不买，记下术语", effects: { awareness: 2, digitalSkill: 1 }, result: "你把热闹当教材，没有把钱包当学费。" },
    { text: "买一件小物", effects: { money: -600, greed: 1 }, stateEffects: { antiqueCollection: 1 }, result: "你买了个喜欢的小物件。真假先不说，至少价格还在承受范围内。" },
    { text: "跟着竞价上头", effects: { money: -4000, shame: 1, greed: 2, risk: 2 }, stateEffects: { antiqueCollection: 1 }, result: "锤子落下那刻你醒了：你不是在捡漏，是在被气氛推着走。" }
  ], S.family, function(s) { return s.money >= 3000; }, 0.15);
  ae("museum_docent_question", "讲解员的问题", "博物馆讲解员问：'你觉得这件器物为什么会被保存下来？'你突然发现历史不是答案，是追问。", ["museum_study", "history_reading"], { awareness: 1, mental: 1 }, S.all, null, 0.18);
  ae("antique_market_source_check", "问清来路", "古玩市场里你没有急着掏钱，而是问来源、看细节、查资料。摊主的故事不再能直接推着你走。", ["antique_market"], { awareness: 2, greed: -1 }, S.family, null, 0.2);

  r("ufo_over_rooftop", "楼顶上空的三角光", "夜里你在楼顶看见三个光点排成三角。它们安静地划过去，像有人把天空调试了一下。第二天新闻说是无人机编队，你仍然保留一点怀疑。", { mental: 2, awareness: 1 }, S.all, function(s) { return Game.random() < 0.08 && (s.hobbyTags.indexOf("astronomy") !== -1 || s.digitalSkill >= 8); }, 0.02);
  r("alien_wrong_number", "陌生来电的奇怪语言", "一个陌生号码打来，里面传来像电流又像语言的声音。你礼貌地说'打错了'，对方也礼貌地挂了。", { mental: 1, digitalSkill: 1 }, S.all, function(s) { return Game.random() < 0.06 && s.age >= 13; }, 0.018);
  r("time_slip_bus_stop", "公交站的时间缝", "你在公交站眨了下眼，广告牌上的日期跳回十年前。再眨一下，一切恢复正常，只剩你记得那一秒。", { mental: 1, awareness: 2 }, S.adult, function(s) { return Game.random() < 0.05 && s.fatigue >= 4; }, 0.018);
  r("future_self_note", "未来的便签", "你在旧书里翻到一张写着'别急着相信高收益'的便签，字迹很像你自己，但日期是明年。", { awareness: 3, greed: -1 }, S.adult, function(s) { return Game.random() < 0.05 && s.awareness >= 8; }, 0.018);
  rc("elevator_wormhole", "电梯多出一层", "电梯面板上突然多出一个没有标号的楼层。门开了一条缝，里面像是你从没选择过的生活。", [
    { text: "不进去，按关门", effects: { awareness: 2, mental: 1 }, result: "门合上后，那个按钮消失了。你很庆幸自己尊重了未知。" },
    { text: "探头看一眼", effects: { mental: 2, fatigue: 1 }, result: "你看见另一个自己在很远处回头。门关上，你们都没有追问。" }
  ], S.adult, function(s) { return Game.random() < 0.04 && s.fatigue >= 5; }, 0.018);
  r("parallel_life_receipt", "平行人生的小票", "你捡到一张小票，上面的会员名是你，购买地点却是一个你从没去过的城市。", { awareness: 1, mental: 2 }, S.adult, function(s) { return Game.random() < 0.05; }, 0.018);

  // Wallet-first life pressure: illness, theft, snacks, and small daily expenses.
  rc("childhood_spicy_strips_temptation", "校门口的辣条摊", "放学路上，校门口的小摊摆着辣条、魔法士干脆面和五毛钱糖。你的零花钱正在口袋里发热。", [
    { text: "买一包辣条", effects: { money: -2, mental: 1, health: -1, snackHabit: 1 }, result: "红油沾到手指上，很香。回家前你认真擦了擦嘴。" },
    { text: "和同学合买", effects: { money: -1, socialExp: 1, snackHabit: 1 }, result: "一包分着吃，快乐被撕成几小条。" },
    { text: "忍住，存起来", effects: { awareness: 1, greed: -1 }, result: "你没有变富，但第一次发现忍住也是一种小小的能力。" }
  ], ["childhood"], null, 0.24);

  rc("childhood_parent_finds_snack", "书包里的零食包装", "爸妈在你书包夹层里翻出一堆零食包装，问你这个月零花钱都去哪了。", [
    { text: "老实承认", effects: { familyTrust: 1, shame: 1, snackHabit: -1 }, result: "你挨了几句唠叨，但家里决定以后给你留一点可以自由支配的钱。" },
    { text: "说是同学塞的", effects: { trust: -1, shame: 2 }, result: "这个理由太薄了，薄得像包装袋。" },
    { text: "一起做零花钱账本", effects: { awareness: 2, familyTrust: 1, greed: -1 }, result: "数字写下来后，辣条突然没有那么便宜了。" }
  ], ["childhood"], function(s) { return (s.snackHabit || 0) >= 2; }, 0.18);

  r("milk_tea_receipt_stack", "奶茶小票一叠", "你整理桌面时发现一叠奶茶小票。每张都不贵，加起来像一记轻轻的巴掌。", { money: -88, awareness: 1, snackHabit: 1 }, ["middle_school", "college", "early_career"], null, 0.18);
  r("late_snack_stomachache", "夜宵后的胃疼", "宵夜吃得很满足，半夜胃开始抗议。快乐是短的，胃疼是长的。", { health: -2, fatigue: 2, money: -35, medicalSpend: 35 }, ["middle_school", "college", "early_career"], function(s) { return (s.snackHabit || 0) >= 3; }, 0.2);

  rc("seasonal_cold", "换季感冒", "天气忽冷忽热，你嗓子发紧，鼻子也开始堵。小病不大，但会偷走时间和钱。", [
    { text: "早睡喝水，买常用药", effects: { money: -60, health: 1, fatigue: -1, medicalSpend: 60 }, result: "你把小病压在小范围里，第二天人清醒了些。" },
    { text: "去门诊看一下", effects: { money: -180, health: 2, fatigue: -1, medicalSpend: 180 }, result: "挂号、排队、拿药都花时间，但你安心不少。" },
    { text: "硬扛继续忙", effects: { health: -2, fatigue: 2, mental: -1 }, result: "你省下了钱，也把身体当成了透支账户。" }
  ], S.all, null, 0.22);

  rc("toothache_bill", "牙疼不是小事", "牙齿忽然疼起来，疼到你开始反思每一次偷懒刷牙。", [
    { text: "及时看牙", effects: { money: -680, health: 2, fatigue: -1, medicalSpend: 680 }, result: "补牙时你盯着灯，明白了预防为什么比治疗便宜。" },
    { text: "先买止痛药", effects: { money: -48, health: -1, fatigue: 1, medicalSpend: 48 }, result: "药效退去后，疼痛很守信用地回来了。" },
    { text: "定期洁牙", effects: { money: -260, health: 1, awareness: 1, medicalSpend: 260 }, result: "账单不算小，但比拖到根管治疗温柔多了。" }
  ], S.adult.concat(["middle_school"]), null, 0.16);

  rc("sprained_ankle", "脚踝扭了一下", "下楼梯时你踩空半格，脚踝一阵刺痛。生活有时候会用半格台阶收费。", [
    { text: "休息并处理", effects: { money: -120, health: 1, fatigue: -1, medicalSpend: 120 }, result: "冰敷、休息、少走路，你把小伤留在小伤。" },
    { text: "继续赶路", effects: { health: -2, fatigue: 2 }, result: "你没有迟到，但脚踝记了仇。" }
  ], S.all, null, 0.14);

  rc("low_health_hospitalization", "一次住院", "身体拖了太久，检查后医生建议住院观察。病房里的时间慢得像账单。", [
    { text: "配合治疗", effects: { money: -9000, health: 5, fatigue: -3, medicalSpend: 9000, familyTrust: 1 }, result: "钱花得心疼，但人缓过来了。你开始把健康当成资产。" },
    { text: "先保守治疗", effects: { money: -2800, health: 2, fatigue: -1, medicalSpend: 2800, risk: 1 }, result: "暂时稳住了，但你知道这不是可以一直拖的事。" },
    { text: "怕花钱拒绝住院", effects: { health: -4, fatigue: 3, mental: -2 }, result: "钱包暂时没动，身体替你承担了利息。" }
  ], S.adult.concat(["elderly"]), function(s) { return s.health <= 8; }, 0.16);

  r("insurance_reimbursement", "医保报销到账", "一笔医保报销到账。数字不算浪漫，却像生活给你递回一只手。", { money: 1200, mental: 1, trust: 1 }, S.family, function(s) { return (s.medicalSpend || 0) >= 1000; }, 0.14);

  rc("bus_pickpocket", "公交上钱包不见了", "下车摸口袋时，你发现钱包不见了。车流继续往前，心里却突然空了一块。", [
    { text: "立刻报警并冻结卡", effects: { money: -300, awareness: 2, fatigue: 1, theftLoss: 300, reportedCount: 1 }, result: "钱未必追回，但损失被锁住了。你把身份证、银行卡逐项处理。" },
    { text: "先自己到处找", effects: { money: -600, fatigue: 2, shame: 1, theftLoss: 600 }, result: "你绕回原路，时间也跟着丢了一段。" },
    { text: "吃一堑长一智", effects: { money: -500, awareness: 1, theftLoss: 500 }, result: "补卡、补证件、补心态。每一步都要花钱。" }
  ], S.all, function(s) { return s.age >= 13; }, 0.16);

  rc("phone_stolen_market", "手机被顺走", "热闹的市场里，你一摸口袋，手机没了。验证码、支付、联系人，瞬间都变成风险。", [
    { text: "马上挂失和报警", effects: { money: -1800, awareness: 2, digitalSkill: 1, theftLoss: 1800, reportedCount: 1 }, result: "新手机很贵，但账号冻结得及时。你第一次觉得锁屏密码很有尊严。" },
    { text: "先借电话定位", effects: { money: -800, fatigue: 1, awareness: 1, theftLoss: 800 }, result: "定位没有奇迹，但你至少没让支付账户裸奔。" },
    { text: "慌到只会自责", effects: { money: -2400, shame: 2, risk: 1, theftLoss: 2400 }, result: "补设备花钱，补安全习惯更花精力。" }
  ], S.adult.concat(["middle_school"]), null, 0.12);

  r("bike_battery_stolen", "电动车电瓶没了", "早上出门，电动车只剩一个沉默的壳。你站在楼下，突然理解了什么叫固定资产折旧。", { money: -620, fatigue: 1, awareness: 1, theftLoss: 620 }, S.adult, function(s) { return s.age >= 18; }, 0.14);

  rc("package_missing", "快递不翼而飞", "取件架上没有你的快递，系统却显示已签收。几十块的小东西，足够毁掉一个下午。", [
    { text: "联系驿站和平台", effects: { money: -20, awareness: 1, fatigue: 1, theftLoss: 20 }, result: "你把流程走完，追回了一部分，也学会截图留证。" },
    { text: "算了，重新买", effects: { money: -120, shame: 1, theftLoss: 120 }, result: "你买回东西，也把不舒服吞了下去。" }
  ], S.all, function(s) { return s.age >= 13; }, 0.16);

  rc("home_cash_missing", "家里少了现金", "抽屉里的现金少了一些。你不确定是记错、被拿走，还是生活自己长了腿。", [
    { text: "整理家庭账本", effects: { awareness: 2, familyTrust: 1, fatigue: 1 }, result: "事情没有闹大，但家里的钱开始有了记录和边界。" },
    { text: "直接怀疑家人", effects: { familyTrust: -2, shame: 1, mental: -1 }, result: "钱还没找回，关系先被划了一道。" },
    { text: "换锁并少放现金", effects: { money: -260, awareness: 1, risk: -1, theftLoss: 260 }, result: "安全感也要成本，幸好这笔钱花得明白。" }
  ], S.family, null, 0.12);

  aec("snack_after_play", "玩完想买点吃的", "玩了一阵，你路过小卖部，玻璃柜里都是便宜而确定的快乐。", ["play", "social"], [
    { text: "买辣条汽水", effects: { money: -8, mental: 1, health: -1, snackHabit: 1 }, result: "味道很熟悉，钱包也很真实地瘦了一点。" },
    { text: "买瓶水就走", effects: { money: -2, health: 1, awareness: 1 }, result: "你没有亏待自己，也没有把小钱漏成小洞。" },
    { text: "蹭同学一口", effects: { socialExp: 1, shame: 1 }, result: "你省了钱，也欠下一点说不清的人情。" }
  ], ["childhood", "middle_school"], null, 0.24);

  ae("physical_exam_finds_issue", "体检报告上的箭头", "体检报告出现几个向上的箭头。它没有吓唬你，只是提醒你身体也会记账。", ["regular_physical_exam", "medical_check"], { health: 1, awareness: 2, mental: -1 }, S.family, null, 0.2);
  ae("clinic_queue", "门诊长队", "门诊队伍比你想象得长。你花了半天时间，终于把小问题说清楚。", ["clinic_visit", "hospital_followup", "school_clinic"], { fatigue: 1, health: 1, medicalSpend: 30, money: -30 }, S.all, null, 0.18);
  ae("home_cooking_saves_money", "一顿家常饭", "你自己做了一顿饭。没有多高级，但比外卖便宜，也比零食顶用。", ["home_cooking_budget", "cooking_skill"], { health: 1, mental: 1, snackHabit: -1 }, S.adult, null, 0.2);
  ae("lock_check_prevents_loss", "门锁账户都还好", "你检查了门锁和账户，发现一个旧密码还在复用。改掉它之后，心里踏实了一点。", ["repair_lock", "phone_cleanup"], { awareness: 2, risk: -1 }, S.family, null, 0.18);
})();
