window.Game = window.Game || {};

Game.createInitialState = function() {
  return {
    age: 6,
    maxAge: 80,
    stage: "childhood",
    round: 0,
    started: false,
    paused: false,
    gameOver: false,

    // Core resources
    money: (function() {
      var roll = Math.random();
      if (roll < 0.001) return 800 + Math.floor(Math.random() * 700); // 0.1% 800-1500
      if (roll < 0.01) return 500 + Math.floor(Math.random() * 300);   // 0.9% 500-800
      if (roll < 0.05) return 300 + Math.floor(Math.random() * 200);   // 4% 300-500
      if (roll < 0.15) return 150 + Math.floor(Math.random() * 150);   // 10% 150-300
      return 50 + Math.floor(Math.random() * 100);                      // 85% 50-150
    })(),
    totalIncome: 0,
    fraudLoss: 0,
    debt: 0,
    debtInterest: 0,
    careerId: null,
    careerLevel: 1,
    careerStability: 1,
    stockPosition: 0,
    houseMarketHeat: 0,
    antiqueCollection: 0,
    hobbyTags: [],
    lifeSeed: null,
    rngState: null,
    talentChoices: [],
    talentId: null,
    talentName: null,
    talentDesc: null,
    incomeMultiplier: 1,
    fraudChanceMod: 0,
    randomEventChanceMod: 0,
    actionEventChanceMod: 0,
    energyBonus: 0,
    childhoodMoneyBonus: 0,
    careerGrowthBonus: 0,

    // Attributes (0-20)
    awareness: 3,
    trust: 10,
    familyTrust: 10,
    mental: 15,
    socialExp: 2,
    digitalSkill: 2,
    greed: 5,
    loneliness: 3,
    risk: 0,
    shame: 0,
    health: 16,
    happiness: 10,
    snackHabit: 0,
    medicalSpend: 0,
    theftLoss: 0,

    // New: fatigue system (0-10)
    fatigue: 0,
    yearEnergy: 0,
    maxYearEnergy: 6,
    yearActionCount: 0,
    yearFinanceBaseline: null,
    lastYearFinanceSummary: null,

    // New: life flags for major decisions
    lifeFlags: {},

    // Tracking
    reportedCount: 0,
    stoppedLossCount: 0,
    scamEncountered: 0,
    scamVictimCount: 0,

    // Collections
    tools: [],
    flags: [],
    eventHistory: [],
    lossHistory: [],
    achievementUnlocked: [],
    currentChain: null,
    chainCooldown: 0,
    ending: null,
    usedEventIds: [],
    usedRandomEventIds: [],
    usedActionEventIds: [],
    usedDecisionIds: [],
    usedActionOfferIds: [],

    // New: action history for stats
    actionHistory: [],
    lastAction: null,
    consecutiveActionCount: 0
  };
};

Game.state = Game.createInitialState();

Game.resetState = function() {
  Game.state = Game.createInitialState();
};
