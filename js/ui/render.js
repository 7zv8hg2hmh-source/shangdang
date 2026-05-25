window.Game = window.Game || {};

Game.UI = {
  onResultDismiss: null,

  render: function() {
    var s = Game.state;
    if (Game.Loop.phase === "title") {
      this.renderTitle();
      return;
    }
    if (Game.Loop.phase === "talent") {
      this.renderTalentDraw();
      return;
    }
    if (Game.Loop.phase === "intro") {
      this.renderIntro();
      return;
    }
    if (Game.Loop.phase === "ending") return;

    document.querySelector('.game-container').classList.remove('fullscreen-main');
    document.getElementById('status-panel').style.display = '';
    document.getElementById('log-panel').style.display = '';
    document.getElementById('timeline').style.display = '';
    this.renderStatus();
    this.renderTimeline();
    this.renderLog();
  },

  renderTitle: function() {
    var main = document.getElementById('main-content');
    main.innerHTML = '<div class="title-screen">' +
      '<h1 class="game-title">防骗模拟器</h1>' +
      '<div class="title-buttons">' +
        '<button class="btn btn-primary" onclick="Game.Loop.start()">开启新人生</button>' +
        (Game.Storage.hasSave() ? '<button class="btn btn-secondary" onclick="Game.Loop.loadGame()">继续人生</button>' : '') +
      '</div>' +
      '<p class="title-note">一个关于信任、贪念、恐惧和清醒的人生模拟器</p>' +
    '</div>';
    document.getElementById('status-panel').innerHTML = '';
    document.getElementById('status-panel').style.display = 'none';
    document.getElementById('log-panel').innerHTML = '';
    document.getElementById('log-panel').style.display = 'none';
    document.getElementById('timeline').innerHTML = '';
    document.getElementById('timeline').style.display = 'none';
    document.querySelector('.game-container').classList.add('fullscreen-main');
  },

  renderTalentDraw: function() {
    document.querySelector('.game-container').classList.add('fullscreen-main');
    document.getElementById('status-panel').style.display = 'none';
    document.getElementById('log-panel').style.display = 'none';
    document.getElementById('timeline').style.display = 'none';

    var choices = (Game.state.talentChoices || []).map(function(id) {
      return Game.getTalent(id);
    }).filter(Boolean);
    var main = document.getElementById('main-content');
    var html = '<div class="talent-screen">' +
      '<div class="talent-kicker">人生种子 #' + Game.state.lifeSeed + '</div>' +
      '<h2>抽取天赋</h2>' +
      '<p class="talent-lead">三张卡任选一张。它会影响你的初始属性，也会悄悄改变之后的人生随机性。</p>' +
      '<div class="talent-grid">';

    choices.forEach(function(t, i) {
      html += '<button class="talent-card" onclick="Game.Loop.chooseTalent(' + i + ')">' +
        '<span class="talent-index">0' + (i + 1) + '</span>' +
        '<strong>' + t.name + '</strong>' +
        '<em>' + t.subtitle + '</em>' +
        '<span>' + t.desc + '</span>' +
        '<div class="talent-effects">';
      for (var key in t.effects) {
        if (!t.effects.hasOwnProperty(key)) continue;
        var val = t.effects[key];
        var sign = val > 0 ? '+' : '';
        html += '<small>' + Game.Attributes.labelFor(key) + sign + val + '</small>';
      }
      html += '</div></button>';
    });

    html += '</div></div>';
    main.innerHTML = html;
  },

  renderIntro: function() {
    document.querySelector('.game-container').classList.add('fullscreen-main');
    document.getElementById('status-panel').style.display = 'none';
    document.getElementById('log-panel').style.display = 'none';
    document.getElementById('timeline').style.display = 'none';
    var main = document.getElementById('main-content');
    var talent = Game.getTalent ? Game.getTalent(Game.state.talentId) : null;
    main.innerHTML = '<div class="intro-screen">' +
      '<h2>你的人生即将开始</h2>' +
      (talent ? '<p><strong>天赋：</strong>' + talent.name + ' · ' + talent.subtitle + '</p>' : '') +
      '<p>从7岁到80岁，你将经历无数选择。</p>' +
      '<p>每一回合你可以选择<strong>做什么</strong>来经营自己的人生。</p>' +
      '<p>但生活不会按剧本走——<strong>意外事件</strong>随时可能发生。</p>' +
      '<p>有些人会用善意包装谎言，有些链接会用贪念钓你上钩。</p>' +
      '<p>你的目标不是赢——是<strong>走到对岸</strong>。</p>' +
      '<br>' +
      '<div class="intro-stats">' +
        '<div class="intro-stat">💰 初始资产：' + Game.MoneySystem.formatMoney(Game.state.money) + '</div>' +
        '<div class="intro-stat">🧠 识骗能力：' + Game.state.awareness + '/20</div>' +
        '<div class="intro-stat">🤝 信任：' + Game.state.trust + '/20</div>' +
        '<div class="intro-stat">💪 心态：' + Game.state.mental + '/20</div>' +
      '</div>' +
      '<br>' +
      '<button class="btn btn-primary" onclick="Game.Loop.beginGame()">踏上冰面</button>' +
    '</div>';
  },

  // === ACTION PANEL ===
  showActionPanel: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var actions = Game.Loop.getCurrentActionChoices(stage.id);
    var main = document.getElementById('main-content');

    var html = '<div class="action-panel">' +
      '<div class="action-header">' +
        '<span class="action-stage">' + stage.name + ' · ' + s.age + '岁 · 第' + (s.yearActionCount + 1) + '次行动</span>' +
        '<span class="action-fatigue">体力：' + this.energyBar(s.yearEnergy, s.maxYearEnergy) + '</span>' +
      '</div>' +
      '<h2 class="action-title">这一年随机遇到的三件事</h2>' +
      '<div class="action-grid">';

    actions.forEach(function(action, i) {
      var locked = action.unlockCondition && !action.unlockCondition(s);
      var cls = locked ? 'action-card action-locked' : 'action-card';
      var onclick = locked ? '' : ' onclick="Game.Loop.handleAction(' + i + ')"';

      html += '<div class="' + cls + '"' + onclick + '>' +
        '<div class="action-icon">' + action.icon + '</div>' +
        '<div class="action-name">' + action.name + '</div>' +
        '<div class="action-desc">' + action.desc + '</div>' +
        '<div class="action-effects">';

      // Show effect hints
      for (var key in action.effects) {
        if (!action.effects.hasOwnProperty(key)) continue;
        var val = action.effects[key];
        var label = Game.Attributes.labelFor(key);
        var sign = val > 0 ? '+' : '';
        var cls2 = val > 0 ? 'effect-pos' : 'effect-neg';
        // For "bad" stats, positive is bad
        if (key === 'greed' || key === 'loneliness' || key === 'risk' || key === 'shame' || key === 'debt') {
          cls2 = val > 0 ? 'effect-neg' : 'effect-pos';
        }
        html += '<span class="action-effect ' + cls2 + '">' + label + sign + val + '</span>';
      }

      if (action.fatigue && action.fatigue !== 0) {
        var fCls = action.fatigue > 0 ? 'effect-neg' : 'effect-pos';
        var fSign = action.fatigue > 0 ? '+' : '';
        html += '<span class="action-effect ' + fCls + '">疲劳' + fSign + action.fatigue + '</span>';
      }
      html += '<span class="action-effect effect-cost">体力-' + Game.Loop.getActionEnergyCost(action) + '</span>';

      html += '</div>';
      if (locked) {
        html += '<div class="action-lock-msg">🔒 条件未满足</div>';
      }
      html += '</div>';
    });

    html += '</div></div>';
    main.innerHTML = html;
  },

  fatigueBar: function(fatigue) {
    var filled = Math.round(fatigue);
    var empty = 10 - filled;
    var color = fatigue >= 7 ? 'var(--color-danger)' : fatigue >= 4 ? 'var(--color-warning)' : 'var(--color-success)';
    return '<span class="fatigue-display" style="color:' + color + '">' +
      '█'.repeat(filled) + '░'.repeat(empty) + ' ' + fatigue + '/10</span>';
  },

  energyBar: function(energy, maxEnergy) {
    var max = maxEnergy || 8;
    var filled = Math.max(0, Math.min(max, Math.round(energy)));
    var empty = Math.max(0, max - filled);
    var color = energy <= 2 ? 'var(--color-danger)' : energy <= 4 ? 'var(--color-warning)' : 'var(--color-success)';
    return '<span class="fatigue-display" style="color:' + color + '">' +
      '█'.repeat(filled) + '░'.repeat(empty) + ' ' + energy + '/' + max + '</span>';
  },

  // Show result of player's action
  showActionResult: function(action, log) {
    var s = Game.state;
    var html = '<div class="result-card result-action">' +
      '<div class="action-result-header">' +
        '<span class="action-result-icon">' + action.icon + '</span>' +
        '<span class="action-result-name">' + action.name + '</span>' +
      '</div>' +
      '<div class="result-text">' + this.getActionFlavorText(action, s) + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.afterAction(); });
  },

  showForcedRest: function(reason, before, after) {
    this.render();
    var main = document.getElementById('main-content');
    main.innerHTML = '<div class="action-panel forced-rest-panel">' +
      '<div class="action-header">' +
        '<span class="action-stage">' + Game.getStage(Game.state.age).name + ' · ' + Game.state.age + '岁</span>' +
        '<span class="action-fatigue">疲劳：' + this.fatigueBar(Game.state.fatigue) + '</span>' +
      '</div>' +
      '<h2 class="action-title">这一年只能休息</h2>' +
      '<p class="forced-rest-text">' + reason + '</p>' +
    '</div>';

    var html = '<div class="result-card result-random forced-rest-card">' +
      '<div class="random-result-header">强制休息</div>' +
      '<div class="result-text">' + reason + '</div>' +
      '<div class="result-effects">' +
        '<span class="effect-tag">疲劳度 ' + before + ' → ' + after + '</span>' +
        '<span class="effect-tag">本年行动跳过</span>' +
      '</div>' +
      '<div class="continue-hint">点击任意位置进入下一年</div>' +
    '</div>';
    this.showContinueOverlay(html, function() { Game.Loop.startRound(); });
  },

  getActionFlavorText: function(action, s) {
    // Generate flavor text based on context
    var texts = {
      study: ["你坐下来认真学了一阵。知识在脑子里沉淀着。", "今天的学习效率不错，感觉脑子清醒了一些。", "书本上的知识和现实之间，总有些差距。但学了总比不学好。"],
      chores: ["你帮家里干了些活，妈妈偷偷多给了你零花钱。", "虽然累，但看到家里干净了，心里挺踏实的。"],
      play: ["又是快乐的一天。虽然什么正事也没干。", "游戏打赢了，心情很好。但时间也没了。"],
      social: ["和朋友待在一起的时光总是过得特别快。", "聊了很多，笑了很多。有朋友真好。"],
      exercise: ["出了一身汗，感觉整个人都轻松了。", "坚持锻炼，身体是革命的本钱。"],
      rest: ["什么也没干。有时候，休息也是一种需要。", "躺了一天，刷了一天手机。时间就这样溜走了。"],
      parttime: ["辛苦了一阵，但看到钱到账的那一刻，觉得值了。", "打工的日子很累，但也学到了不少社会经验。"],
      love: ["和对象待在一起的时光很甜。虽然花了点钱。", "经营感情是一门学问。你还在学。"],
      work_hard: ["加班到很晚。升职加薪的路上，谁不辛苦呢。", "又是忙碌的一年。钱赚到了，但也错过了一些东西。"],
      sidejob: ["副业搞起来了，虽然不稳定，但多了一份收入。", "斜杠青年的生活：白天上班，晚上搞副业。累并快乐着。"],
      family: ["陪家人的时光总是温暖的。", "和家人在一起，什么烦恼都会变淡一些。"],
      invest: ["研究了一阵投资。看了很多分析，但真到下手的时候还是会犹豫。", "理财的世界很深，你还在摸索。"],
      hobby: ["做自己喜欢的事情，时间过得特别快。", "生活不只有赚钱，还有诗和远方（虽然远方也要钱）。"],
      work: ["继续做着熟悉的工作。稳定，但也有些无聊。"],
      learn_phone: ["学了一些手机操作。这个时代，不懂手机真的很不方便。", "子女教了你怎么发视频、怎么网购。你觉得自己跟上了时代。"],
      family_antifraud_drill: ["你和爸妈聊了聊陌生链接、验证码和游戏充值。说得不多，但他们认真听了。"],
      coding_class: ["你学会了保存文件、分辨网页按钮。屏幕背后不再全是魔法。"],
      school_fair: ["你第一次认真算进价和找零，发现钱这件事比想象中复杂。"],
      contest: ["备赛很累，但你开始知道，捷径通常没有宣传里那么便宜。"],
      ai_homework: ["AI给了你答案，你又自己核了一遍。工具很好，但脑子还得自己带着。"],
      stream_watch: ["直播间很热闹，抽奖和限时优惠一波接一波。你关掉时还有点意犹未尽。"],
      internship: ["你投了简历、问了前辈，也顺手拉黑了几个收费内推。社会课开讲了。"],
      content_creator: ["数据涨跌牵动心情。你第一次感到，流量和诱惑常常住在同一栋楼。"],
      campus_antifraud: ["你把案例讲给同学听。讲着讲着，你自己也更清醒了。"],
      certificate_exam: ["你查了发证机构和招聘要求，没被那些夸张广告带跑。"],
      ai_tool_learning: ["你把重复工作交给工具，也学会了对陌生链接多停两秒。"],
      emergency_fund: ["钱先放进安全账户。它暂时不会让你兴奋，但会让你睡得稳一点。"],
      career_switch: ["你查了工商信息、问了行业朋友，跳槽这件事变得没那么玄。"],
      dating_app: ["你认真聊了几个人，也学会了不把孤独立刻兑换成信任。"],
      child_digital_rules: ["家里开了个小会：游戏充值、陌生链接、验证码，规则都写清了。"],
      elder_phone_guard: ["你给父母清掉一堆陌生群和弹窗。父母嘴上嫌麻烦，心里是踏实的。"],
      mortgage_review: ["你把合同和账单翻了一遍，省下的钱不多，但少了很多含糊。"],
      deepfake_drill: ["你和家人聊到AI冒充亲友的新闻。最后说定：大额转账先打电话确认。"],
      asset_checkup: ["你把钱、债、保险排成一张表。数字摊开后，焦虑也变得具体。"],
      medical_check: ["报告有几项小问题，好在发现得早。身体也需要定期审计。"],
      community_antifraud: ["社区里有人讲亲身经历。那些数字背后都是一家的夜不能寐。"],
      retirement_docs: ["你把材料分门别类放好。未来的自己大概会感谢今天的耐心。"],
      phone_cleanup: ["陌生APP少了，弹窗少了，手机终于安静了一点。"],
      hospital_followup: ["你按正规流程复诊配药，没有被'内部专家'和'特效药'带偏。"],
      neighborhood_watch: ["邻居们互相提醒。人情有时候也是一种防火墙。"],
      video_family: ["视频那头很吵，但你听见家人的声音，屋子里也没那么空了。"],
      reading_habit: ["你读了一会儿书。世界没有立刻变大，但边界往外松了一点。"],
      labor_practice: ["你把手弄脏，也把事情做完。劳动不是口号，是把一块地方变干净。"],
      science_fair: ["小实验不一定成功，但你学会了先观察、再下结论。"],
      class_duty: ["你帮班里处理了一些琐事。小责任会让人长出一点秩序感。"],
      zhongkao_review: ["你把错题重新翻了一遍。不会的题没有消失，但变得可面对。"],
      library_study: ["图书馆很安静，安静到你能听见自己重新进入状态。"],
      volunteer_service: ["你帮了别人一点忙。善意落到具体事情上，才真的站得住。"],
      law_class: ["你学了些合同、隐私和消费者权益。规则不浪漫，但能保护普通人。"],
      skills_training: ["你练了一项实用技能。手上多一点本事，心里就多一点底。"],
      career_planning: ["你查了专业、行业和城市。未来仍然模糊，但不再只是一团雾。"],
      gaokao_review: ["你按计划复习、睡觉、订正。高考很大，今天只能一页一页来。"],
      psychology_counseling: ["你把憋着的话说出来一点。问题还在，但不再全压在胸口。"],
      major_research: ["你认真研究了专业方向。热爱、就业和现实第一次坐到同一张桌上。"],
      scholarship_apply: ["你整理材料申请资助。争取正当机会，不丢人。"],
      student_union: ["活动很琐碎，人也很多。你在协调中学会了怎么把话说明白。"],
      research_project: ["项目推进得磕磕绊绊，但你第一次摸到真正解决问题的感觉。"],
      exam_postgraduate: ["你开始系统备考。提升自己这件事，常常朴素又枯燥。"],
      campus_job_fair: ["你在人群里投简历、问待遇。社会的大门不是一扇，是很多扇小门。"],
      certification_exam: ["你为职业资格考试复习。证书不是万能，但规范本身有价值。"],
      community_service_adult: ["你参加社区公益。成年人的公共生活，也需要有人愿意伸手。"],
      parent_school_meeting: ["你认真听老师讲孩子的情况。教育不是只看分数，也要看人。"],
      lifelong_learning: ["你重新坐进课堂或读书会。人只要还在学，就没有完全老去。"],
      mentor_young_people: ["你把自己的经验讲给年轻人听。吃过的亏，终于有了一点用处。"],
      learn_guitar: ["你练到手指发疼，终于把一段和弦按顺了。歌还不稳，但心情有了拍子。"],
      learn_piano: ["一遍遍音阶听起来枯燥，可手指慢慢知道该往哪里落。"],
      learn_erhu: ["弓一拉，邻居先沉默。练久了以后，那声音终于有了人味。"],
      choir_singing: ["你站在人群里唱同一个声部，发现不抢拍也是一种修养。"],
      basketball_training: ["球场上有人传球，有人喊战术。你跑得很累，但心里很亮。"],
      badminton_training: ["几个回合下来，汗出来了，话也聊开了。"],
      swimming_training: ["水把杂念托住了一会儿。你练会了换气，也练会了不慌。"],
      martial_arts: ["你练的是动作，更是分寸。真正有力量的人，不急着证明自己。"],
      calligraphy: ["墨落到纸上，急不得。你难得把一天过慢了一点。"],
      photography: ["你举起镜头，开始注意光、表情和别人是否愿意被拍。"],
      cooking_skill: ["锅铲翻起来，生活突然变得很具体。好吃不好吃，家里人最诚实。"],
      history_reading: ["你读到一段旧事，发现人心、钱和权力的套路其实很少换壳。"],
      math_logic: ["概率和统计把很多'包赚'故事拆开了。数字有时很冷，但很管用。"],
      astronomy_watch: ["你抬头看了很久。宇宙没有回答你，但它让一些烦恼显得小了点。"],
      short_drama_scroll: ["三分钟一集，反转很密。你看得上头，也开始分辨哪些情绪在被刻意点燃。"],
      short_drama_create: ["你写脚本、找场地、剪节奏。爽点要准，价值观也不能歪。"],
      career_deep_work: ["你把一个项目复盘到底。职业成长很少轰轰烈烈，更多时候是把细节做扎实。"],
      job_switch_plan: ["你看岗位、比薪资、查社保和合同。跳槽不是赌气，是认真计算下一步。"],
      house_viewing: ["中介话术很多，你把通勤、月供、物业和未来现金流一项项写下来。"],
      mortgage_calculation: ["数字摊开以后，房子不再只是梦想，也是一份长期责任。"],
      stock_index_invest: ["你把钱分散投进去，没期待一夜暴富，只想让时间慢慢工作。"],
      stock_speculation: ["红绿数字跳得人心痒。你越看越想操作，也越该提醒自己别上头。"],
      antique_market: ["摊主故事讲得真，东西未必真。你边看边学，也把钱包握紧了一点。"],
      museum_study: ["展柜里的器物安静得很。懂一点来龙去脉后，旧东西不再只是旧。"],
      buy_spicy_strips: ["校门口那包辣条很便宜，红油却把整个下午染得很热闹。你擦干净嘴，也记住了零花钱少一截的感觉。"],
      buy_card_pack: ["卡包撕开的声音比上课铃更刺激。稀有卡没来，期待倒是结结实实花掉了五块钱。"],
      save_pocket_money: ["你把小钱塞进储蓄罐，听见硬币落下去的一声响。那不是发财，是第一次认真延迟满足。"],
      school_clinic: ["医务室的药味有点苦，但比硬撑舒服。小病及时处理，钱包也少挨一刀。"],
      canteen_meal: ["你端着热饭坐下，胃终于不用靠零食糊弄。食堂不浪漫，但很实在。"],
      night_snack: ["烧烤摊的烟火气把理智熏软了。吃完很满足，回去看余额时又清醒了一点。"],
      regular_physical_exam: ["体检表一项项走完，身体像一家公司被查了账。花钱不快乐，但早发现问题很值。"],
      clinic_visit: ["门诊排队很慢，叫号声很冷静。你把小毛病说清楚，也把一笔可能变大的账按住了。"],
      home_cooking_budget: ["菜洗好、锅烧热，饭香慢慢出来。自己做饭不炫，但能同时照顾胃和钱包。"],
      repair_lock: ["你检查门锁、密码和账户安全，把几个旧漏洞补上。安全感有时候就是一把新锁和一个新密码。"],
      coin_capsule_toy: ["扭蛋转出来的一刻，你像在买一个迷你命运。玩具很小，随机感很会让人上头。"],
      comic_rental: ["漫画书翻得飞快，纸页边角有很多人的指纹。你用几块钱租来一个放学后的异世界。"],
      stationery_upgrade: ["新笔写起来很顺，作业好像也没那么硬了。文具不贵，但会让人短暂相信自己能重新开始。"],
      snack_share_pack: ["零食袋一打开，同学立刻围过来。你花掉一点小钱，也买到一小圈热闹。"],
      child_movie_ticket: ["电影院灯暗下去，爆米花香得过分。你看了一场电影，也见识了快乐可以被标价。"],
      school_trip_fee: ["春游费交出去后，通知单终于不再压在书包里。那天的大巴、零食和合照，都开始有了成本。"],
      sports_shoes_student: ["新运动鞋踩在地上有点硬，也有点神气。你跑得更快一点，钱包慢了一拍。"],
      phone_case_student: ["旧手机换上新壳，像给日常生活贴了一张小贴纸。新鲜感不贵，但也不是免费。"],
      idol_merch: ["周边拿到手时你很开心，包装袋都舍不得扔。喜欢是真的，价格也是真的。"],
      exam_materials: ["资料买回来堆在桌上，焦虑暂时有了形状。真正有用的不是买下它，而是翻开它。"],
      private_tutor_hour: ["补课老师把卡住的知识点拆开讲，你终于听懂了一点。那一小时很贵，也确实有重量。"],
      student_group_meal: ["同学聚餐的笑声盖过了账单。散场后你发现，关系会变熟，余额也会变薄。"],
      campus_laundry_card: ["洗衣卡充好后，脏衣篓终于不再像一座小山。生活费就是这样被一件件小事吃掉的。"],
      dorm_decoration: ["小台灯亮起来，床帘拉上，宿舍突然像是你的地方。空间舒服了，钱包也空出一块。"],
      secondhand_laptop: ["二手电脑开机那一刻你先听风扇，再看保修。便宜不是问题，来路和稳定才是重点。"],
      online_course_paid: ["线上课加入了学习清单。你提醒自己：买课只是开始，别让课程躺在收藏夹里吃灰。"],
      campus_short_trip: ["短途车票把你带出熟悉的校门。风景很好，回来后生活费也变得很有存在感。"],
      job_interview_outfit: ["面试衣服穿上身，你站得更直了一点。体面不是虚荣，是给机会一个认真开场。"],
      rent_better_room: ["新房间通勤短一点，窗户也亮一点。你用更高房租买回一些睡眠和呼吸。"],
      commute_month_card: ["月卡办好后，每天出门少想一次零钱。稳定的小支出，也是在给生活铺轨道。"],
      noise_cancel_headphones: ["降噪一开，世界像被拧小了音量。你买到的不只是耳机，还有一块安静。"],
      fitness_membership: ["健身卡刷出去时很有仪式感。真正困难的是下周、下个月、以及每一个不想去的晚上。"],
      therapy_session: ["咨询室里没有人急着评判你。那些乱成团的话被慢慢放到桌面上，心里松了一点。"],
      dating_dinner: ["这顿饭你没有只顾表现，也没有乱花到失控。认真相处这件事，本来就该有预算。"],
      gift_parents: ["礼物递过去时，父母嘴上说浪费钱，手却接得很仔细。你花掉的是钱，补上的是具体的关心。"],
      annual_vacation: ["你离开熟悉的城市几天，身体终于慢下来。旅行很治愈，账单也很诚实。"],
      house_cleaning_service: ["家政打扫完，地面亮得像换了个家。你用钱买回半天体力，也买回一点秩序。"],
      small_appliance: ["小家电搬进厨房后，做饭多了一点期待。生活被调顺一点，支出也多了一项。"],
      family_portrait: ["全家福拍下来的瞬间，大家都努力笑得自然。照片会留下，付款记录也会留下。"],
      child_interest_class: ["兴趣班报名表填完，你比孩子还紧张。培养兴趣很好，前提是别把家庭预算练到变形。"],
      parent_medical_exam: ["你陪父母做完体检，排队时听了很多家常话。钱花得心疼，但少一点后悔更重要。"],
      car_maintenance: ["保养单上的项目一长串，车像一个会吞钱的铁朋友。修在小问题时，比坏在路上便宜。"],
      home_repair: ["灯、锁、水龙头被逐个处理掉，家里少了几个烦人的小噪音。小维修也是守钱包。"],
      better_mattress: ["新床垫躺下去那一刻，腰先替你点了头。睡眠很贵，但长期硬扛更贵。"],
      dental_cleaning: ["洗牙时你盯着灯，认真反思每一次偷懒。牙齿不会说话，只会直接开账单。"],
      new_year_red_packet: ["红包发出去时，年味一下子变得很具体。成年人过年，笑容和现金常常一起递出去。"],
      friend_wedding_gift: ["份子钱写进礼金簿，你的名字也写进一段关系里。祝福是真的，支出也是真的。"],
      pet_supplies: ["猫粮狗粮、玩具驱虫一项项加起来，陪伴忽然有了月度预算。它看着你，你又觉得值。"],
      community_group_buy: ["团购群里满减很热闹，你下单前多看了一眼冰箱。省钱和囤货之间，只差一次冲动。"],
      tea_house_afternoon: ["茶馆里时间走得慢，闲话一杯接一杯。你花了一点钱，换来半天不被催促。"],
      senior_university_fee: ["老年大学缴费成功，课表重新出现。生活没有只剩回忆，还能继续上新课。"],
      hearing_glasses_check: ["配镜和听力检查做完，世界清楚了一点，也近了一点。年纪上来后，清楚本身就值钱。"],
      grandchild_gift: ["给晚辈挑礼物时，你反复比较价格和实用。爱很想大方，钱包提醒你适量。"],
      short_drama_topup: ["你只想解锁几集，平台却把下一集放得刚刚好。爽点很密，扣费也很密。"],
      premium_membership: ["会员开通后广告少了，自动续费也多了。舒服是真的，记得取消也是真的。"]
    };
    var pool = texts[action.id];
    if (!pool) return this.buildUniqueActionFeedback(action, s);
    return pool[Math.floor(Game.random() * pool.length)];
  },

  buildUniqueActionFeedback: function(action, s) {
    var stage = Game.getStage(s.age);
    var effect = action.effects || {};
    var moneyText = "";
    if (typeof effect.money === "number") {
      if (effect.money < 0) moneyText = "这次花掉了" + Game.MoneySystem.formatMoney(Math.abs(effect.money)) + "，钱包立刻有了反应。";
      if (effect.money > 0) moneyText = "这次挣到" + Game.MoneySystem.formatMoney(effect.money) + "，钱来得不算轻松。";
    }
    var bodyText = "";
    if (typeof effect.health === "number" && effect.health > 0) bodyText = "身体也收到了一点正向回报。";
    if (typeof effect.health === "number" && effect.health < 0) bodyText = "身体替这次选择记了一笔账。";
    var fatigueText = "";
    if ((action.fatigue || 0) > 0) fatigueText = "做完以后，你能感觉到疲劳往上冒。";
    if ((action.fatigue || 0) < 0) fatigueText = "难得的是，疲劳被往下压了一点。";
    var detail = action.desc ? action.desc : action.name;
    return stage.name + "的这一年，你选择了「" + action.name + "」。" + detail + "不是背景板，而是这一年具体发生过的事。" +
      (moneyText ? " " + moneyText : "") +
      (bodyText ? " " + bodyText : "") +
      (fatigueText ? " " + fatigueText : "");
  },

  // === LIFE DECISION ===
  showLifeDecision: function(decision) {
    var main = document.getElementById('main-content');
    var html = '<div class="event-card decision-card">' +
      '<div class="event-header">' +
        '<span class="decision-badge">🔔 人生抉择</span>' +
        '<span class="event-stage">' + Game.getStage(Game.state.age).name + ' · ' + Game.state.age + '岁</span>' +
      '</div>' +
      '<h2 class="event-title">' + decision.title + '</h2>' +
      '<div class="event-text">' + decision.text + '</div>' +
      '<div class="event-options">';
    var options = Game.Loop.getDecisionOptions(decision);
    options.forEach(function(opt, i) {
      html += '<button class="btn btn-option" onclick="Game.Loop.handleDecision(' + i + ')">' + opt.text + '</button>';
    });
    html += '</div></div>';
    main.innerHTML = html;
  },

  showDecisionResult: function(decision, option, log) {
    var html = '<div class="result-card result-decision">' +
      '<div class="result-text">' + option.result + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.finishActionCycle(); });
  },

  // === RANDOM EVENTS ===
  showRandomEventChoice: function(re) {
    var main = document.getElementById('main-content');
    var html = '<div class="event-card random-event-card">' +
      '<div class="event-header">' +
        '<span class="random-badge">⚡ 意外事件</span>' +
        '<span class="event-stage">' + Game.getStage(Game.state.age).name + ' · ' + Game.state.age + '岁</span>' +
      '</div>' +
      '<h2 class="event-title">' + re.title + '</h2>' +
      '<div class="event-text">' + re.text + '</div>' +
      '<div class="event-options">';
    re.options.forEach(function(opt, i) {
      html += '<button class="btn btn-option" onclick="Game.Loop.handleRandomChoice(' + i + ')">' + opt.text + '</button>';
    });
    html += '</div></div>';
    main.innerHTML = html;
  },

  showRandomEventResult: function(re, log) {
    var html = '<div class="result-card result-random">' +
      '<div class="random-result-header">⚡ ' + re.title + '</div>' +
      '<div class="result-text">' + re.text + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';

    Game.state.eventHistory.push({
      age: Game.state.age, title: re.title, choice: '(意外)',
      isScam: false, loss: 0
    });
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.finishActionCycle(); });
  },

  showRandomChoiceResult: function(re, option, log) {
    var html = '<div class="result-card result-random">' +
      '<div class="result-text">' + option.result + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.finishActionCycle(); });
  },

  // === ACTION EVENTS ===
  showActionEventChoice: function(ae) {
    var main = document.getElementById('main-content');
    var html = '<div class="event-card action-event-card">' +
      '<div class="event-header">' +
        '<span class="action-event-badge">行动后续</span>' +
        '<span class="event-stage">' + Game.getStage(Game.state.age).name + ' · ' + Game.state.age + '岁</span>' +
      '</div>' +
      '<h2 class="event-title">' + ae.title + '</h2>' +
      '<div class="event-text">' + ae.text + '</div>' +
      '<div class="event-options">';
    ae.options.forEach(function(opt, i) {
      html += '<button class="btn btn-option" onclick="Game.Loop.handleActionEventChoice(' + i + ')">' + opt.text + '</button>';
    });
    html += '</div></div>';
    main.innerHTML = html;
  },

  showActionEventResult: function(ae, log) {
    var html = '<div class="result-card result-action-event">' +
      '<div class="action-event-result-header">行动后续 · ' + ae.title + '</div>' +
      '<div class="result-text">' + ae.text + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';

    Game.state.eventHistory.push({
      age: Game.state.age, title: ae.title, choice: '(行动后续)',
      isScam: false, loss: 0, isActionEvent: true
    });
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.finishActionCycle(); });
  },

  showActionEventChoiceResult: function(ae, option, log) {
    var html = '<div class="result-card result-action-event">' +
      '<div class="result-text">' + option.result + '</div>';

    if (log && log.length > 0) {
      html += '<div class="result-effects">';
      log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';
    this.render();
    this.showContinueOverlay(html, function() { Game.Loop.finishActionCycle(); });
  },

  // === STATUS PANEL ===
  renderStatus: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var panel = document.getElementById('status-panel');

    var header = '<div class="status-header">' +
      '<span class="age-badge">' + s.age + '岁</span>' +
      '<span class="stage-name">' + stage.name + '</span>' +
    '</div>';

    var bars = [
      this.statBar('💰 资产', Game.MoneySystem.formatMoney(s.money), null, 'money'),
      this.statBar('🔴 债务', Game.MoneySystem.formatDebtWithInterest(s.debt), null, 'debt'),
      this.statBar('💸 累计被骗', Game.MoneySystem.formatMoney(s.fraudLoss), null, 'loss'),
      this.statBarNum('❤️ 健康', s.health, 20),
      this.statBarNum('🌞 幸福感', s.happiness, 20),
      this.statBarNum('🧠 识骗力', s.awareness, 20),
      this.statBarNum('📱 数字素养', s.digitalSkill, 20),
      this.statBarNum('🤝 信任', s.trust, 20),
      this.statBarNum('👨‍👩‍👧 家庭支持', s.familyTrust, 20),
      this.statBarNum('💪 心态', s.mental, 20),
      this.statBarNum('🌐 社会经验', s.socialExp, 20),
      this.statBarNum('🌙 孤独感', s.loneliness, 20),
      this.statBarNum('🎰 贪念', s.greed, 20),
      this.statBarNum('🍬 零食依赖', s.snackHabit || 0, 10),
      this.statBarNum('⚠️ 风险暴露', s.risk, 20),
      this.statBarNum('😶 羞耻感', s.shame, 20),
      this.statBarNum('⚡ 年度体力', s.yearEnergy, s.maxYearEnergy || 8),
      this.statBarNum('😫 疲劳度', s.fatigue, 10)
    ];

    // Life flags summary
    var lifeInfo = this.renderLifeFlags(s);

    panel.innerHTML = header + '<div class="stat-list">' + bars.join('') + '</div>' +
      lifeInfo +
      '<div class="status-actions">' +
        '<button class="btn btn-sm" onclick="Game.UI.showToolShop()">🛡 反诈工具</button>' +
        '<button class="btn btn-sm" onclick="Game.UI.showAchievements()">🏆 成就</button>' +
        '<button class="btn btn-sm" onclick="Game.Storage.save() && Game.UI.showNotification(\'存档成功\')">💾 存档</button>' +
        '<button class="btn btn-sm" onclick="Game.UI.confirmRestart()">🔄 重开</button>' +
      '</div>';
  },

  renderLifeFlags: function(s) {
    var flags = [];
    if (s.lifeFlags.in_relationship) flags.push('💑 恋爱中');
    if (s.lifeFlags.married) flags.push('💍 已婚');
    if (s.lifeFlags.divorced) flags.push('💔 离异');
    if (s.lifeFlags.has_child) flags.push('👶 有孩子');
    if (s.lifeFlags.has_second_child) flags.push('👶👶 二胎');
    if (s.lifeFlags.has_house) flags.push('🏠 有房');
    if (s.lifeFlags.has_car) flags.push('🚗 有车');
    if (s.lifeFlags.has_pet) flags.push('🐱 有宠物');
    if (s.lifeFlags.dink) flags.push('🆓 丁克');
    if (s.health <= 6) flags.push('🏥 健康告急');
    else if (s.health >= 18) flags.push('❤️ 身体很好');
    if (s.happiness <= 5) flags.push('🌧 幸福感低');
    else if (s.happiness >= 16) flags.push('🌞 生活有光');
    if ((s.snackHabit || 0) >= 6) flags.push('🍬 零食成瘾');
    if (s.talentName) flags.push('🃏 ' + s.talentName);
    var career = Game.getCareer ? Game.getCareer(s.careerId) : null;
    if (career) flags.push('💼 ' + career.name + 'Lv' + Math.min(6, s.careerLevel || 1));
    if (s.stockPosition > 0) flags.push('📊 股票仓位' + s.stockPosition);
    if (s.antiqueCollection > 0) flags.push('🏺 古玩收藏' + s.antiqueCollection);
    if (s.houseMarketHeat > 0 && !s.lifeFlags.has_house) flags.push('🏠 关注楼市');
    if (s.hobbyTags && s.hobbyTags.length > 0) {
      var hobbyNames = {
        guitar: '吉他',
        piano: '钢琴',
        erhu: '二胡',
        singing: '唱歌',
        basketball: '篮球',
        badminton: '羽毛球',
        swimming: '游泳',
        martial_arts: '武术',
        calligraphy: '书法',
        photography: '摄影',
        cooking: '做饭',
        history: '历史',
        math: '数学',
        astronomy: '天文',
        short_drama: '短剧',
        short_drama_create: '拍短剧',
        antiques: '古玩',
        museum: '博物馆'
      };
      flags.push('🎨 爱好：' + s.hobbyTags.slice(-4).map(function(tag) {
        return hobbyNames[tag] || tag;
      }).join('、'));
    }
    if (s.lifeFlags.high_school_key) flags.push('🏫 重点高中');
    else if (s.lifeFlags.high_school_regular) flags.push('🏫 普通高中');
    else if (s.lifeFlags.vocational_school) flags.push('🛠 中职技校');
    else if (s.lifeFlags.five_year_college) flags.push('🛠 五年制高职');
    if (s.lifeFlags.college_985) flags.push('🎓 985');
    else if (s.lifeFlags.college_211) flags.push('🎓 211');
    else if (s.lifeFlags.college_1ben) flags.push('🎓 一本');
    else if (s.lifeFlags.college_bachelor) flags.push('🎓 本科');
    else if (s.lifeFlags.college_zhuanke) flags.push('🎓 高职专科');
    else if (s.lifeFlags.work_then_adult_education) flags.push('📚 边工作边学习');
    else if (s.lifeFlags.education_dropout) flags.push('🧳 早早工作');
    if (flags.length === 0) return '';
    return '<div class="life-flags">' + flags.map(function(f) {
      return '<span class="life-flag">' + f + '</span>';
    }).join('') + '</div>';
  },

  statBar: function(label, value, max, cls) {
    return '<div class="stat-item ' + (cls || '') + '">' +
      '<span class="stat-label">' + label + '</span>' +
      '<span class="stat-value">' + value + '</span>' +
    '</div>';
  },

  statBarNum: function(label, value, max) {
    value = typeof value === "number" ? value : 0;
    max = max || 20;
    var pct = Math.max(0, Math.min(Math.round(value / max * 100), 100));
    var visualPct = value === 0 ? 2 : pct;
    // Negative stats: higher = worse (yellow → red)
    var isNegStat = label.indexOf('贪念') !== -1 || label.indexOf('孤独') !== -1 ||
      label.indexOf('风险') !== -1 || label.indexOf('羞耻') !== -1 ||
      label.indexOf('疲劳') !== -1 || label.indexOf('零食依赖') !== -1;
    var color, barClass;
    if (isNegStat) {
      // High is bad: green → yellow → red
      if (pct >= 70) { color = '#ef4444'; barClass = 'bar-danger'; }
      else if (pct >= 40) { color = '#f59e0b'; barClass = 'bar-warning'; }
      else { color = '#10b981'; barClass = 'bar-safe'; }
    } else {
      // Low is bad: red → yellow → green
      if (pct <= 20) { color = '#ef4444'; barClass = 'bar-danger'; }
      else if (pct <= 40) { color = '#f59e0b'; barClass = 'bar-warning'; }
      else { color = '#3b82f6'; barClass = 'bar-safe'; }
    }
    return '<div class="stat-item ' + barClass + '">' +
      '<span class="stat-label">' + label + '</span>' +
      '<div class="stat-bar-wrap">' +
        '<div class="stat-bar-fill" style="width:' + visualPct + '%;background:' + color + '"></div>' +
      '</div>' +
      '<span class="stat-num">' + value + '/' + max + '</span>' +
    '</div>';
  },

  renderTimeline: function() {
    var s = Game.state;
    var pct = Math.round((s.age / s.maxAge) * 100);
    var tl = document.getElementById('timeline');
    var stages = Game.LifeStages;
    var markers = '';
    stages.forEach(function(st) {
      var pos = Math.round(st.minAge / 80 * 100);
      markers += '<div class="tl-marker" style="left:' + pos + '%"><span>' + st.minAge + '</span></div>';
    });
    tl.innerHTML = '<div class="timeline-wrap">' +
      '<div class="tl-bar"><div class="tl-fill" style="width:' + pct + '%"></div></div>' +
      markers +
      '<div class="tl-current" style="left:' + pct + '%">▼</div>' +
      '<div class="tl-labels"><span>0岁</span><span>' + s.age + '岁 / ' + Game.getStage(s.age).name + '</span><span>80岁</span></div>' +
    '</div>';
  },

  renderLog: function() {
    var s = Game.state;
    var panel = document.getElementById('log-panel');
    var html = '<h3>人生账本</h3>';
    html += '<div class="log-summary">' +
      '<div>遭遇诈骗：' + s.scamEncountered + '次</div>' +
      '<div>实际被骗：' + s.scamVictimCount + '次</div>' +
      '<div>成功止损：' + s.stoppedLossCount + '次</div>' +
      '<div>报警举报：' + s.reportedCount + '次</div>' +
    '</div>';

    var recent = s.eventHistory.slice(-10).reverse();
    html += '<div class="log-entries">';
    recent.forEach(function(e) {
      var cls = e.isScam ? 'log-scam' : (e.isDecision ? 'log-decision' : 'log-safe');
      html += '<div class="log-entry ' + cls + '">' +
        '<span class="log-age">' + e.age + '岁</span> ' +
        '<span class="log-title">' + e.title + '</span>' +
        (e.loss > 0 ? '<span class="log-loss">-' + Game.MoneySystem.formatMoney(e.loss) + '</span>' : '') +
      '</div>';
    });
    html += '</div>';

    if (s.lossHistory.length > 0) {
      html += '<h4>损失记录</h4><div class="log-entries">';
      s.lossHistory.slice(-5).reverse().forEach(function(l) {
        html += '<div class="log-entry log-scam">' +
          '<span class="log-age">' + l.age + '岁</span> ' +
          l.type + ' <span class="log-loss">-' + Game.MoneySystem.formatMoney(l.loss) + '</span>' +
        '</div>';
      });
      html += '</div>';
    }

    panel.innerHTML = html;
  },

  // === FRAUD EVENTS (existing) ===
  showEvent: function(event) {
    var main = document.getElementById('main-content');
    var stage = Game.getStage(Game.state.age);
    var html = '<div class="event-card">' +
      '<div class="event-header">' +
        '<span class="event-trigger">' + (event.trigger || '') + '</span>' +
        '<span class="event-stage">' + stage.name + ' · ' + Game.state.age + '岁</span>' +
      '</div>' +
      '<h2 class="event-title">' + event.title + '</h2>' +
      '<div class="event-text">' + event.text + '</div>' +
      '<div class="event-options">';
    event.options.forEach(function(opt, i) {
      html += '<button class="btn btn-option" onclick="Game.Loop.handleChoice(' + i + ')">' + opt.text + '</button>';
    });
    html += '</div></div>';
    main.innerHTML = html;
  },

  showChainEvent: function(chainStep) {
    var main = document.getElementById('main-content');
    var html = '<div class="event-card chain-event">' +
      '<div class="chain-header">' +
        '<span class="chain-badge">⛓ 连环诈骗</span>' +
        '<span class="chain-name">' + chainStep.chainName + '</span>' +
        '<span class="chain-progress">第 ' + (chainStep.stepIndex + 1) + ' / ' + chainStep.totalSteps + ' 步</span>' +
      '</div>' +
      '<h2 class="event-title">' + chainStep.title + '</h2>' +
      '<div class="event-text">' + chainStep.text + '</div>' +
      '<div class="event-options">';
    chainStep.options.forEach(function(opt, i) {
      html += '<button class="btn btn-option" onclick="Game.Loop.handleChoice(' + i + ')">' + opt.text + '</button>';
    });
    html += '</div></div>';
    main.innerHTML = html;
  },

  showResult: function(result) {
    var cls = result.isLife ? 'result-life' : (result.isScam ? 'result-scam' : 'result-safe');
    var html = '<div class="result-card ' + cls + '">' +
      '<div class="result-text">' + result.result.replace(/\n/g, '<br>') + '</div>';

    if (result.log && result.log.length > 0) {
      html += '<div class="result-effects">';
      result.log.forEach(function(l) { html += '<span class="effect-tag">' + l + '</span>'; });
      html += '</div>';
    }

    if (result.review) {
      html += '<div class="result-review">' + result.review + '</div>';
    }

    if (result.breakChain) {
      html += '<div class="chain-break-notice">连环诈骗链"' + result.chainName + '"已结束</div>';
    }

    html += '<div class="continue-hint">点击任意位置继续</div>';
    html += '</div>';
    this.showContinueOverlay(html, function() { Game.UI.dismissResult(); });
  },

  showContinueOverlay: function(html, callback) {
    var existing = document.querySelector('.continue-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'continue-overlay';
    overlay.innerHTML = '<div class="continue-modal">' + html + '</div>';
    var done = false;
    overlay.addEventListener('click', function() {
      if (done) return;
      done = true;
      overlay.remove();
      if (callback) callback();
    });
    document.body.appendChild(overlay);
  },

  showYearSummary: function(summary) {
    if (!summary) return;
    var existing = document.querySelector('.year-summary-overlay');
    if (existing) existing.remove();
    var income = summary.income || {};
    var money = Game.MoneySystem.formatMoney;
    var rows = [
      '<div><span>今年来源</span><strong>' + (income.source || '年度收入') + '</strong></div>',
      '<div><span>到账收入</span><strong class="money-pos">+' + money(income.amount || 0) + '</strong></div>'
    ];
    if (income.taken > 0) {
      rows.push('<div><span>被爸妈收走的压岁钱</span><strong class="money-neg">-' + money(income.taken) + '</strong></div>');
    }
    if (income.expense > 0) {
      rows.push('<div><span>' + (income.expenseLabel || '年度生活开销') + '</span><strong class="money-neg">-' + money(income.expense) + '</strong></div>');
    }
    if (income.debtSettlement && income.debtSettlement.openingDebt > 0) {
      var ds = income.debtSettlement;
      rows.push('<div><span>本年还债</span><strong class="money-neg">-' + money(ds.paid || 0) + '</strong></div>');
      if (ds.interest > 0) {
        rows.push('<div><span>未清债务利息 ' + Math.round((ds.rate || 0) * 100) + '%</span><strong class="money-neg">+' + money(ds.interest) + '</strong></div>');
      }
    }
    if (!summary.isFirstYear) {
      rows.push('<div><span>上一年行动净变化</span><strong class="' + (summary.activityNetChange >= 0 ? 'money-pos' : 'money-neg') + '">' + this.signedMoney(summary.activityNetChange) + '</strong></div>');
      if (summary.activityFraudLoss > 0) {
        rows.push('<div><span>上一年被骗损失</span><strong class="money-neg">-' + money(summary.activityFraudLoss) + '</strong></div>');
      }
    }
    rows.push('<div><span>当前资产</span><strong>' + money(summary.currentMoney) + '</strong></div>');
    if (summary.currentDebt > 0) {
      rows.push('<div><span>当前债务</span><strong class="money-neg">' + money(summary.currentDebt) + '</strong></div>');
    }

    var overlay = document.createElement('div');
    overlay.className = 'year-summary-overlay';
    overlay.innerHTML = '<div class="year-summary-modal">' +
      '<div class="year-summary-kicker">' + summary.stageName + ' · ' + summary.age + '岁</div>' +
      '<h3>年度收支小结</h3>' +
      '<div class="year-summary-rows">' + rows.join('') + '</div>' +
      (income.note ? '<p class="year-summary-note">' + income.note + '</p>' : '') +
      (income.expenseNote ? '<p class="year-summary-note">' + income.expenseNote + '</p>' : '') +
      (income.debtSettlement && income.debtSettlement.note ? '<p class="year-summary-note">' + income.debtSettlement.note + '</p>' : '') +
      '<div class="continue-hint">点击任意位置关闭</div>' +
    '</div>';
    overlay.addEventListener('click', function() { overlay.remove(); });
    document.body.appendChild(overlay);
  },

  signedMoney: function(n) {
    var sign = n >= 0 ? '+' : '-';
    return sign + Game.MoneySystem.formatMoney(Math.abs(n));
  },

  dismissResult: function() {
    if (this.onResultDismiss) {
      var fn = this.onResultDismiss;
      this.onResultDismiss = null;
      fn();
      return;
    }

    var ending = Game.EndingSystem.check();
    if (ending) {
      Game.EndingSystem.triggerEnding(ending);
      Game.Loop.phase = "ending";
      this.renderEnding(ending);
      return;
    }

    // After fraud/chain event, keep playing the current year if stamina remains.
    Game.Loop.finishActionCycle();
  },

  // === ENDING ===
  renderEnding: function(ending) {
    var report = Game.ReportSystem.generate();
    var main = document.getElementById('main-content');
    var html = '<div class="ending-screen">' +
      '<h1 class="ending-title">' + ending.title + '</h1>' +
      '<div class="ending-text">' + ending.text + '</div>' +
      '<div class="ending-flavor">"' + ending.flavor + '"</div>' +
      '<div class="report-card">' +
        '<h2>人生防骗报告</h2>' +
        '<div class="report-grid">' +
          this.reportItem('终局年龄', report.finalAge + '岁') +
          this.reportItem('剩余资产', Game.MoneySystem.formatMoney(report.money)) +
          this.reportItem('累计债务', Game.MoneySystem.formatDebtWithInterest(report.debt)) +
          this.reportItem('净资产', Game.MoneySystem.formatMoney(report.netWorth)) +
          this.reportItem('累计收入', Game.MoneySystem.formatMoney(report.totalIncome)) +
          this.reportItem('累计被骗', Game.MoneySystem.formatMoney(report.fraudLoss) + ' (' + report.fraudLossPercent + '%)') +
          this.reportItem('医疗支出', Game.MoneySystem.formatMoney(report.medicalSpend)) +
          this.reportItem('失窃损失', Game.MoneySystem.formatMoney(report.theftLoss)) +
          this.reportItem('遭遇诈骗', report.scamEncountered + '次') +
          this.reportItem('实际被骗', report.scamVictimCount + '次') +
          this.reportItem('成功止损', report.stoppedLossCount + '次') +
          this.reportItem('报警举报', report.reportedCount + '次') +
          this.reportItem('最危险阶段', report.dangerousStage) +
          this.reportItem('最常遭遇', report.commonFraud) +
          (report.maxLossEvent ? this.reportItem('最大单笔损失', report.maxLossEvent.type + ' (-' + Game.MoneySystem.formatMoney(report.maxLossEvent.loss) + ', ' + report.maxLossEvent.age + '岁)') : '') +
          this.reportItem('识骗能力', report.awareness + '/20') +
          this.reportItem('健康状态', report.health + '/20') +
          this.reportItem('幸福感', report.happiness + '/20') +
          this.reportItem('零食依赖', report.snackHabit + '/10') +
          this.reportItem('信任值', report.trust + '/20') +
          this.reportItem('心态值', report.mental + '/20') +
          this.reportItem('反诈工具', report.tools + '个') +
          this.reportItem('成就解锁', report.achievements + '/' + Game.Achievements.length) +
          this.reportItem('人生状态', report.lifeStatus) +
        '</div>' +
      '</div>' +
      '<div class="ending-actions">' +
        '<button class="btn btn-primary" onclick="Game.Loop.phase=\'title\';Game.UI.render()">回到首页</button>' +
        '<button class="btn btn-secondary" onclick="Game.Storage.clear();Game.Loop.phase=\'title\';Game.resetState();Game.UI.render()">重开人生</button>' +
      '</div>' +
    '</div>';
    main.innerHTML = html;
    document.querySelector('.game-container').classList.add('fullscreen-main');
    document.getElementById('status-panel').style.display = 'none';
    document.getElementById('log-panel').style.display = 'none';
    document.getElementById('timeline').style.display = 'none';
  },

  reportItem: function(label, value) {
    return '<div class="report-item"><span class="report-label">' + label + '</span><span class="report-value">' + value + '</span></div>';
  },

  // === TOOL SHOP ===
  showToolShop: function() {
    var owned = Game.ToolSystem.getOwned();
    var available = Game.ToolSystem.getAvailable();
    var main = document.getElementById('main-content');
    var html = '<div class="tool-shop">' +
      '<h2>🛡 反诈工具箱</h2>';

    if (owned.length > 0) {
      html += '<h3>已获得</h3><div class="tool-list">';
      owned.forEach(function(t) {
        html += '<div class="tool-card tool-owned"><div class="tool-name">' + t.name + '</div>' +
          '<div class="tool-desc">' + t.desc + '</div>' +
          '<div class="tool-passive">' + t.passive + '</div></div>';
      });
      html += '</div>';
    }

    if (available.length > 0) {
      html += '<h3>可解锁</h3><div class="tool-list">';
      available.forEach(function(t) {
        html += '<div class="tool-card tool-available" onclick="Game.ToolSystem.acquire(\'' + t.id + '\');Game.UI.showToolShop()">' +
          '<div class="tool-name">' + t.name + ' <span class="tool-unlock">点击获取</span></div>' +
          '<div class="tool-desc">' + t.desc + '</div>' +
          '<div class="tool-passive">' + t.passive + '</div></div>';
      });
      html += '</div>';
    }

    var locked = Game.Tools.filter(function(t) {
      return Game.state.tools.indexOf(t.id) === -1 && !available.some(function(a) { return a.id === t.id; });
    });
    if (locked.length > 0) {
      html += '<h3>未解锁</h3><div class="tool-list">';
      locked.forEach(function(t) {
        html += '<div class="tool-card tool-locked"><div class="tool-name">🔒 ' + t.name + '</div>' +
          '<div class="tool-desc">' + t.desc + '</div>' +
          '<div class="tool-unlock-cond">需要：' + t.unlockAge + '岁以上，满足特定属性条件</div></div>';
      });
      html += '</div>';
    }

    html += '<button class="btn btn-secondary" onclick="Game.UI.render();Game.UI.showActionPanel()">关闭</button>';
    html += '</div>';
    main.innerHTML = html;
  },

  // === ACHIEVEMENTS ===
  showAchievements: function() {
    var all = Game.AchievementSystem.getAll();
    var main = document.getElementById('main-content');
    var html = '<div class="tool-shop"><h2>🏆 成就</h2><div class="tool-list">';
    all.forEach(function(a) {
      var cls = a.unlocked ? 'tool-card tool-owned' : 'tool-card tool-locked';
      html += '<div class="' + cls + '">' +
        '<div class="tool-name">' + (a.unlocked ? '✅ ' : '🔒 ') + a.name + '</div>' +
        '<div class="tool-desc">' + a.desc + '</div></div>';
    });
    html += '</div>';
    html += '<button class="btn btn-secondary" onclick="Game.UI.render();Game.UI.showActionPanel()">关闭</button>';
    html += '</div>';
    main.innerHTML = html;
  },

  showNotification: function(msg) {
    var existing = document.querySelector('.notification');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'notification';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(function() {
      div.classList.add('fade-out');
      setTimeout(function() { div.remove(); }, 500);
    }, 2000);
  },

  confirmRestart: function() {
    if (confirm('确定要重新开始吗？当前进度将丢失。')) {
      Game.Storage.clear();
      Game.resetState();
      Game.Loop.phase = 'title';
      Game.UI.render();
    }
  }
};
