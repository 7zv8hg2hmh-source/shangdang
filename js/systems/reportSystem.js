window.Game = window.Game || {};

Game.ReportSystem = {
  generate: function() {
    var s = Game.state;

    var maxLossEvent = null;
    var maxLoss = 0;
    s.lossHistory.forEach(function(l) {
      if (l.loss > maxLoss) { maxLoss = l.loss; maxLossEvent = l; }
    });

    var stageEncounters = {};
    s.eventHistory.forEach(function(e) {
      var st = Game.getStage(e.age);
      if (!stageEncounters[st.name]) stageEncounters[st.name] = { count: 0, loss: 0 };
      stageEncounters[st.name].count++;
      stageEncounters[st.name].loss += e.loss || 0;
    });

    var dangerousStage = null;
    var maxStageLoss = 0;
    for (var name in stageEncounters) {
      if (stageEncounters[name].loss > maxStageLoss) {
        maxStageLoss = stageEncounters[name].loss;
        dangerousStage = name;
      }
    }

    var fraudTypes = {};
    s.eventHistory.forEach(function(e) {
      if (e.isScam) {
        fraudTypes[e.title] = (fraudTypes[e.title] || 0) + 1;
      }
    });
    var commonFraud = null;
    var maxCount = 0;
    for (var type in fraudTypes) {
      if (fraudTypes[type] > maxCount) {
        maxCount = fraudTypes[type];
        commonFraud = type;
      }
    }

    return {
      finalAge: s.age,
      money: s.money,
      debt: s.debt,
      debtInterest: s.debtInterest || 0,
      netWorth: s.money - s.debt,
      totalIncome: s.totalIncome,
      fraudLoss: s.fraudLoss,
      medicalSpend: s.medicalSpend || 0,
      theftLoss: s.theftLoss || 0,
      fraudLossPercent: s.totalIncome > 0 ? Math.round(s.fraudLoss / s.totalIncome * 100) : 0,
      scamEncountered: s.scamEncountered,
      scamVictimCount: s.scamVictimCount,
      stoppedLossCount: s.stoppedLossCount,
      reportedCount: s.reportedCount,
      maxLossEvent: maxLossEvent,
      dangerousStage: dangerousStage || "无",
      commonFraud: commonFraud || "无",
      awareness: s.awareness,
      health: s.health,
      happiness: s.happiness,
      snackHabit: s.snackHabit || 0,
      trust: s.trust,
      mental: s.mental,
      tools: s.tools.length,
      achievements: s.achievementUnlocked.length,
      lifeStatus: Game.ReportSystem.getLifeStatus(s)
    };
  },

  getLifeStatus: function(s) {
    var parts = [];
    if (s.lifeFlags.married) parts.push('已婚');
    if (s.lifeFlags.divorced) parts.push('离异');
    if (s.lifeFlags.has_child) parts.push('有子女');
    if (s.lifeFlags.has_house) parts.push('有房');
    if (s.lifeFlags.has_car) parts.push('有车');
    if (s.lifeFlags.dink) parts.push('丁克');
    if (s.lifeFlags.has_pet) parts.push('有宠物');
    if (s.talentName) parts.push('天赋：' + s.talentName);
    var career = Game.getCareer ? Game.getCareer(s.careerId) : null;
    if (career) parts.push(career.name + 'Lv' + Math.min(6, s.careerLevel || 1));
    if (s.stockPosition > 0) parts.push('股票仓位' + s.stockPosition);
    if (s.antiqueCollection > 0) parts.push('古玩收藏' + s.antiqueCollection);
    if (s.hobbyTags && s.hobbyTags.length > 0) parts.push('爱好' + Math.min(4, s.hobbyTags.length) + '项');
    if (s.lifeFlags.college_985) parts.push('985高校');
    else if (s.lifeFlags.college_211) parts.push('211高校');
    else if (s.lifeFlags.college_1ben) parts.push('一本');
    else if (s.lifeFlags.college_bachelor) parts.push('本科');
    else if (s.lifeFlags.college_zhuanke) parts.push('高职专科');
    else if (s.lifeFlags.work_then_adult_education) parts.push('边工作边学习');
    else if (s.lifeFlags.education_dropout) parts.push('早早工作');
    return parts.length > 0 ? parts.join('、') : '单身自由人';
  }
};
