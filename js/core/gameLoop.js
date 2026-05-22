window.Game = window.Game || {};

Game.Loop = {
  currentEvent: null,
  currentChainStep: null,
  currentRandomEvent: null,
  currentActionEvent: null,
  currentActionChoices: null,
  currentActionChoiceKey: null,
  currentDecision: null,
  phase: "title",
  // Turn phases: "action" -> "event" -> "decision" -> continue year / next round
  turnPhase: "action",

  start: function() {
    Game.resetState();
    Game.initLifeSeed();
    Game.drawTalentChoices();
    this.phase = "talent";
    Game.UI.render();
  },

  chooseTalent: function(index) {
    var s = Game.state;
    var talentId = s.talentChoices[index];
    var talent = Game.getTalent ? Game.getTalent(talentId) : null;
    if (!talent) return;

    s.talentId = talent.id;
    s.talentName = talent.name;
    s.talentDesc = talent.desc;
    s.rngState = ((s.rngState || s.lifeSeed || 1) ^ ((index + 1) * 2654435761)) >>> 0;

    Game.Attributes.apply(talent.effects || {});
    var direct = talent.direct || {};
    for (var key in direct) {
      if (!direct.hasOwnProperty(key)) continue;
      if (typeof direct[key] === "number") {
        if (key === "incomeMultiplier") {
          s[key] = (s[key] || 1) * direct[key];
        } else if (key === "childhoodMoneyBonus") {
          s.money += direct[key];
        } else {
          s[key] = (s[key] || 0) + direct[key];
        }
      } else {
        s[key] = direct[key];
      }
    }

    this.phase = "intro";
    Game.Storage.save();
    Game.UI.render();
  },

  beginGame: function() {
    this.phase = "playing";
    this.turnPhase = "action";
    Game.UI.render();
    this.startRound();
  },

  loadGame: function() {
    if (Game.Storage.load()) {
      if (!Game.state.lifeSeed || !Game.state.rngState) Game.initLifeSeed();
      this.phase = "playing";
      this.turnPhase = "action";
      Game.UI.render();
      this.showStatusUpdate("读档成功，你现在 " + Game.state.age + " 岁。");
      this.startRound();
    }
  },

  // Start a new round: advance age, add income, refresh yearly energy, show action panel
  startRound: function() {
    var s = Game.state;
    if (s.gameOver) return;

    // Check early endings
    var ending = Game.EndingSystem.check();
    if (ending) {
      Game.EndingSystem.triggerEnding(ending);
      this.phase = "ending";
      Game.UI.renderEnding(ending);
      return;
    }

    s.round++;
    var ageStep = this.getAgeStep();
    s.age += ageStep;
    if (s.age > s.maxAge) s.age = s.maxAge;
    s.stage = Game.getStage(s.age).id;
    s.yearActionCount = 0;
    this.currentActionChoices = null;
    this.currentActionChoiceKey = null;

    if (s.chainCooldown > 0) s.chainCooldown--;

    var yearOpen = {
      money: s.money,
      debt: s.debt,
      debtInterest: s.debtInterest || 0,
      fraudLoss: s.fraudLoss,
      totalIncome: s.totalIncome
    };

    // Add passive income, then pay unavoidable living costs.
    var incomeInfo = Game.MoneySystem.addIncome();
    var livingCostInfo = Game.MoneySystem.applyLivingCost();
    if (livingCostInfo && livingCostInfo.amount) {
      incomeInfo.expense = livingCostInfo.amount;
      incomeInfo.expenseLabel = livingCostInfo.label;
      incomeInfo.expenseNote = livingCostInfo.note;
    }
    var debtInfo = Game.MoneySystem.settleDebtYearly();
    if (debtInfo && debtInfo.openingDebt > 0) {
      incomeInfo.debtSettlement = debtInfo;
    }
    s.lastYearFinanceSummary = this.buildYearFinanceSummary(yearOpen, incomeInfo);
    var toolsUnlocked = Game.ToolSystem.checkAutoUnlocks();

    Game.Attributes.checkDebtPressure();
    this.ageEffects();

    // Check early endings again after age effects
    var ending2 = Game.EndingSystem.check();
    if (ending2) {
      Game.EndingSystem.triggerEnding(ending2);
      this.phase = "ending";
      Game.UI.renderEnding(ending2);
      return;
    }

    if (s.fatigue >= 10) {
      this.forceRestYear("疲劳值满了，你这一年只能强制休息。");
      return;
    }
    // Fatigue decays each year, then the year's stamina is refreshed.
    if (s.fatigue > 0) s.fatigue = Math.max(0, s.fatigue - 1);
    s.maxYearEnergy = this.getYearEnergyMax();
    s.yearEnergy = s.maxYearEnergy;

    // Show action panel
    this.turnPhase = "action";
    Game.UI.render();
    Game.UI.showActionPanel();
    Game.UI.showYearSummary(s.lastYearFinanceSummary);

    if (toolsUnlocked.length > 0) {
      var names = toolsUnlocked.map(function(t) { return t.name; }).join('、');
      this.showStatusUpdate('解锁反诈工具：' + names);
    }
  },

  // Player chose an action
  handleAction: function(actionIndex) {
    var s = Game.state;
    if (s.fatigue >= 10) {
      this.forceRestYear("疲劳值满了，你已经撑不住了，只能休息。");
      return;
    }
    if (s.yearEnergy <= 0) {
      this.finishActionCycle();
      return;
    }
    var stage = Game.getStage(s.age);
    var actions = this.getCurrentActionChoices(stage.id);
    var action = actions[actionIndex];
    if (!action) return;

    // Apply action effects
    var effects = Object.assign({}, action.effects);

    // Consecutive action bonus/penalty
    if (s.lastAction === action.id) {
      s.consecutiveActionCount++;
      if (s.consecutiveActionCount >= 3) {
        // Diminishing returns after 3x same action
        for (var key in effects) {
          if (effects[key] > 0 && key !== 'money') effects[key] = Math.max(0, effects[key] - 1);
        }
      }
    } else {
      s.consecutiveActionCount = 1;
    }
    s.lastAction = action.id;
    this.applyActionState(action);

    // Apply fatigue
    s.fatigue = Math.max(0, Math.min(10, s.fatigue + (action.fatigue || 0)));
    s.yearEnergy = Math.max(0, s.yearEnergy - this.getActionEnergyCost(action));
    s.yearActionCount++;

    var log = Game.Attributes.apply(effects);

    s.actionHistory.push({
      age: s.age, action: action.id, name: action.name
    });

    Game.AchievementSystem.check();
    Game.Storage.save();

    // Show action result briefly, then move to event phase
    Game.UI.showActionResult(action, log);
    this.currentActionChoices = null;
    this.currentActionChoiceKey = null;
  },

  getCurrentActionChoices: function(stageId) {
    var s = Game.state;
    var key = [s.age, s.yearActionCount, s.yearEnergy, stageId].join(":");
    if (this.currentActionChoices && this.currentActionChoiceKey === key) {
      return this.currentActionChoices;
    }

    var pool = Game.getActions(stageId, s).filter(function(action) {
      return !action.unlockCondition || action.unlockCondition(s);
    });
    var picked = this.pickFreshActions(pool, 3);
    this.currentActionChoices = picked;
    this.currentActionChoiceKey = key;
    return picked;
  },

  pickFreshActions: function(pool, count) {
    var s = Game.state;
    if (!pool || pool.length === 0) return [];
    s.usedActionOfferIds = s.usedActionOfferIds || [];
    var selected = [];
    var used = s.usedActionOfferIds;

    function shuffled(list) {
      var arr = list.slice();
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Game.randomInt(0, i);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }

    var fresh = shuffled(pool.filter(function(action) {
      return used.indexOf(action.id) === -1;
    }));
    var fallback = shuffled(pool.filter(function(action) {
      return fresh.indexOf(action) === -1;
    }));
    var source = fresh.concat(fallback);

    for (var i = 0; i < source.length && selected.length < count; i++) {
      if (!selected.some(function(a) { return a.id === source[i].id; })) {
        selected.push(source[i]);
      }
    }

    selected.forEach(function(action) {
      if (used.indexOf(action.id) === -1) used.push(action.id);
    });
    if (used.length > 260) s.usedActionOfferIds = used.slice(used.length - 180);
    return selected;
  },

  applyActionState: function(action) {
    var s = Game.state;
    if (action.flag) s.lifeFlags[action.flag] = true;
    if (action.flags) {
      action.flags.forEach(function(flag) { s.lifeFlags[flag] = true; });
    }
    if (action.hobbyTag && s.hobbyTags.indexOf(action.hobbyTag) === -1) {
      s.hobbyTags.push(action.hobbyTag);
    }
    if (action.hobbyTags) {
      action.hobbyTags.forEach(function(tag) {
        if (s.hobbyTags.indexOf(tag) === -1) s.hobbyTags.push(tag);
      });
    }
    if (action.stateEffects) {
      for (var key in action.stateEffects) {
        if (!action.stateEffects.hasOwnProperty(key)) continue;
        var old = s[key] || 0;
        s[key] = old + action.stateEffects[key];
        if (key === "stockPosition" || key === "houseMarketHeat" || key === "antiqueCollection") {
          s[key] = Math.max(0, s[key]);
        }
        if (key === "careerLevel") {
          s[key] = Math.max(1, Math.min(6, s[key]));
        }
        if (key === "snackHabit") {
          s[key] = Math.max(0, Math.min(10, s[key]));
        }
        if (key === "health") {
          s[key] = Math.max(0, Math.min(20, s[key]));
        }
        if (key === "happiness") {
          s[key] = Math.max(0, Math.min(20, s[key]));
        }
      }
    }
  },

  applyEventState: function(item) {
    if (!item || !item.stateEffects) return;
    var s = Game.state;
    for (var key in item.stateEffects) {
      if (!item.stateEffects.hasOwnProperty(key)) continue;
      var old = typeof s[key] === "number" ? s[key] : 0;
      s[key] = old + item.stateEffects[key];
      if (key === "stockPosition" || key === "houseMarketHeat" || key === "antiqueCollection") {
        s[key] = Math.max(0, s[key]);
      }
      if (key === "careerLevel") {
        s[key] = Math.max(1, Math.min(6, s[key]));
      }
      if (key === "snackHabit") {
        s[key] = Math.max(0, Math.min(10, s[key]));
      }
      if (key === "health") {
        s[key] = Math.max(0, Math.min(20, s[key]));
      }
      if (key === "happiness") {
        s[key] = Math.max(0, Math.min(20, s[key]));
      }
    }
  },

  buildYearFinanceSummary: function(yearOpen, incomeInfo) {
    var s = Game.state;
    var previous = s.yearFinanceBaseline;
    var openNet = yearOpen.money - yearOpen.debt;
    var currentNet = s.money - s.debt;
    var activityNetChange = previous ? openNet - (previous.money - previous.debt) : 0;
    var activityIncome = previous ? yearOpen.totalIncome - previous.totalIncome : 0;
    var activityFraudLoss = previous ? yearOpen.fraudLoss - previous.fraudLoss : 0;
    var summary = {
      age: s.age,
      stageName: Game.getStage(s.age).name,
      income: incomeInfo || { amount: 0, source: "年度收入", gross: 0, taken: 0, note: "" },
      activityNetChange: activityNetChange,
      activityIncome: activityIncome,
      activityFraudLoss: activityFraudLoss,
      netChangeAfterIncome: currentNet - openNet,
      currentMoney: s.money,
      currentDebt: s.debt,
      isFirstYear: !previous
    };
    s.yearFinanceBaseline = {
      age: s.age,
      money: s.money,
      debt: s.debt,
      debtInterest: s.debtInterest || 0,
      fraudLoss: s.fraudLoss,
      totalIncome: s.totalIncome
    };
    return summary;
  },

  // After action result is dismissed, check for events
  afterAction: function() {
    var s = Game.state;

    var actionEvent = this.checkActionEvent();
    if (actionEvent) {
      this.turnPhase = "event";
      this.currentActionEvent = actionEvent;
      if (actionEvent.isChoice) {
        Game.UI.showActionEventChoice(actionEvent);
      } else {
        var actionLog = Game.Attributes.apply(actionEvent.effects || {});
        this.applyEventState(actionEvent);
        this.consumeTemporaryEventEnergy(actionLog);
        Game.UI.showActionEventResult(actionEvent, actionLog);
      }
      return;
    }

    // Check for life decisions first
    var decision = this.checkLifeDecision();
    if (decision) {
      this.currentDecision = decision;
      this.turnPhase = "decision";
      Game.UI.showLifeDecision(decision);
      return;
    }

    // Then check for chains
    if (s.currentChain) {
      this.currentChainStep = Game.FraudChainSystem.getCurrentStep();
      if (this.currentChainStep) {
        this.turnPhase = "event";
        this.currentEvent = null;
        Game.UI.render();
        Game.UI.showChainEvent(this.currentChainStep);
        return;
      } else {
        s.currentChain = null;
      }
    }

    if (Game.FraudChainSystem.canTriggerChain()) {
      this.currentChainStep = Game.FraudChainSystem.startChain();
      if (this.currentChainStep) {
        this.turnPhase = "event";
        this.currentEvent = null;
        Game.UI.render();
        Game.UI.showChainEvent(this.currentChainStep);
        return;
      }
    }

    // Check for random events (50% chance)
    var randomEvent = this.checkRandomEvent();
    if (randomEvent) {
      this.turnPhase = "event";
      this.currentRandomEvent = randomEvent;
      if (randomEvent.isChoice) {
        Game.UI.showRandomEventChoice(randomEvent);
      } else {
        // Auto-apply and show
        var log = Game.Attributes.apply(randomEvent.effects || {});
        this.applyEventState(randomEvent);
        this.applyRandomEventBurden(randomEvent, null, log);
        Game.UI.showRandomEventResult(randomEvent, log);
      }
      return;
    }

    // Fraud event (based on probability weighted by stats)
    var fraudChance = this.getFraudChance();
    if (Game.random() < fraudChance) {
      this.currentEvent = Game.EventSystem.pickEvent();
      this.currentChainStep = null;
      this.currentRandomEvent = null;
      if (this.currentEvent) {
        this.turnPhase = "event";
        Game.UI.render();
        Game.UI.showEvent(this.currentEvent);
        return;
      }
    }

    // No event after this action, keep spending this year's energy or advance.
    this.finishActionCycle();
  },

  // Get fraud event probability based on stats
  getFraudChance: function() {
    var s = Game.state;
    var base = 0.5; // 50% base chance
    if (s.risk >= 10) base += 0.15;
    if (s.greed >= 10) base += 0.1;
    if (s.loneliness >= 10) base += 0.1;
    if (s.awareness >= 15) base -= 0.15;
    if (s.digitalSkill >= 12) base -= 0.1;
    base += s.fraudChanceMod || 0;
    return Math.max(0.2, Math.min(0.85, base));
  },

  consumeTemporaryEventEnergy: function(log, cost) {
    var s = Game.state;
    cost = Math.max(1, cost || 1);
    if (s.yearEnergy > 0) {
      var actual = Math.min(cost, s.yearEnergy);
      s.yearEnergy = Math.max(0, s.yearEnergy - actual);
      if (log) log.push('⚡体力 -' + actual);
    }
  },

  applyRandomEventBurden: function(event, option, log) {
    var item = option || event || {};
    var s = Game.state;
    var energyCost = 2;
    if (s.fatigue >= 7 || s.health <= 6) energyCost = 3;
    this.consumeTemporaryEventEnergy(log, energyCost);

    var cost = Game.MoneySystem.getRandomEventHandlingCost(item);
    if (cost > 0) {
      var costLog = Game.Attributes.apply({ money: -cost });
      if (log) {
        log.push('🧾随机事件开销 -' + Game.MoneySystem.formatMoney(cost));
        costLog.forEach(function(l) { log.push(l); });
      }
    }
  },

  // Check for life decisions
  checkLifeDecision: function() {
    var s = Game.state;
    for (var i = 0; i < Game.LifeDecisions.length; i++) {
      var d = Game.LifeDecisions[i];
      if (s.usedDecisionIds.indexOf(d.id) !== -1) continue;

      var ageOk = false;
      if (d.triggerAge && s.age >= d.triggerAge) ageOk = true;
      if (d.minAge && d.maxAge && s.age >= d.minAge && s.age <= d.maxAge) ageOk = true;
      if (!ageOk) continue;

      if (d.condition && !d.condition(s)) continue;
      if (this.getDecisionOptions(d).length === 0) continue;

      return d;
    }
    return null;
  },

  getDecisionOptions: function(decision) {
    var s = Game.state;
    return decision.options.filter(function(option) {
      return !option.condition || option.condition(s);
    });
  },

  // Handle life decision choice
  handleDecision: function(index) {
    var s = Game.state;
    var d = this.currentDecision;
    if (!d) return;

    var option = this.getDecisionOptions(d)[index];
    if (!option) return;
    var log = Game.Attributes.apply(option.effects || {});

    if (option.flag) {
      s.lifeFlags[option.flag] = true;
    }
    if (option.flags) {
      option.flags.forEach(function(flag) { s.lifeFlags[flag] = true; });
    }
    if (option.clearFlag) {
      delete s.lifeFlags[option.clearFlag];
    }
    if (d.setFlag) {
      s.lifeFlags[d.setFlag] = true;
    }
    if (option.setCareer) {
      s.careerId = option.setCareer;
      s.careerLevel = option.careerLevel || s.careerLevel || 1;
      s.careerStability = option.careerStability || s.careerStability || 1;
    }

    s.usedDecisionIds.push(d.id);

    s.eventHistory.push({
      age: s.age, title: d.title, choice: option.text,
      isScam: false, loss: 0, isDecision: true
    });

    Game.AchievementSystem.check();
    Game.Storage.save();

    Game.UI.showDecisionResult(d, option, log);
    this.currentDecision = null;
  },

  // Handle random event choice
  handleRandomChoice: function(index) {
    var re = this.currentRandomEvent;
    if (!re || !re.options) return;
    var option = re.options[index];
    var log = Game.Attributes.apply(option.effects || {});

    var s = Game.state;
    if (option.setFlag) s.lifeFlags[option.setFlag] = true;
    if (option.clearFlag) delete s.lifeFlags[option.clearFlag];
    this.applyEventState(option);
    this.applyRandomEventBurden(re, option, log);

    s.eventHistory.push({
      age: s.age, title: re.title, choice: option.text,
      isScam: false, loss: 0
    });

    Game.AchievementSystem.check();
    Game.Storage.save();

    Game.UI.showRandomChoiceResult(re, option, log);
    this.currentRandomEvent = null;
  },

  // Handle action event choice
  handleActionEventChoice: function(index) {
    var ae = this.currentActionEvent;
    if (!ae || !ae.options) return;
    var option = ae.options[index];
    var log = Game.Attributes.apply(option.effects || {});

    var s = Game.state;
    if (option.setFlag) s.lifeFlags[option.setFlag] = true;
    if (option.clearFlag) delete s.lifeFlags[option.clearFlag];
    this.applyEventState(option);
    this.consumeTemporaryEventEnergy(log);

    s.eventHistory.push({
      age: s.age, title: ae.title, choice: option.text,
      isScam: false, loss: 0, isActionEvent: true
    });

    Game.AchievementSystem.check();
    Game.Storage.save();

    Game.UI.showActionEventChoiceResult(ae, option, log);
    this.currentActionEvent = null;
  },

  // Check for events that are tied to the action just taken
  checkActionEvent: function() {
    var s = Game.state;
    if (!Game.ActionEvents || !s.lastAction) return null;
    var stage = Game.getStage(s.age);
    var eligible = Game.ActionEvents.filter(function(ae) {
      if (s.usedActionEventIds.indexOf(ae.id) !== -1) return false;
      if (ae.stage && ae.stage.indexOf(stage.id) === -1) return false;
      if (ae.actions && ae.actions.indexOf(s.lastAction) === -1) return false;
      if (ae.minAge && s.age < ae.minAge) return false;
      if (ae.maxAge && s.age > ae.maxAge) return false;
      if (ae.condition && !ae.condition(s)) return false;
      return true;
    });
    if (eligible.length === 0) return null;

    var chance = 0.16 + Math.min(0.14, s.yearActionCount * 0.02);
    if (s.consecutiveActionCount >= 2) chance += 0.08;
    if (s.fatigue >= 6) chance += 0.05;
    chance += s.actionEventChanceMod || 0;
    chance = Math.max(0.08, Math.min(0.55, chance));
    if (Game.random() > chance) return null;

    var totalWeight = eligible.reduce(function(sum, ae) {
      return sum + Math.max(1, Math.round((ae.probability || 0.1) * 100));
    }, 0);
    var roll = Game.random() * totalWeight;
    var picked = eligible[eligible.length - 1];
    for (var i = 0; i < eligible.length; i++) {
      roll -= Math.max(1, Math.round((eligible[i].probability || 0.1) * 100));
      if (roll <= 0) {
        picked = eligible[i];
        break;
      }
    }
    s.usedActionEventIds.push(picked.id);
    return picked;
  },

  // Check for random events
  checkRandomEvent: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var eligible = Game.RandomEvents.filter(function(re) {
      if (re.stage.indexOf(stage.id) === -1) return false;
      if (re.condition && !re.condition(s)) return false;
      return true;
    });

    var available = eligible.filter(function(re) {
      return s.usedRandomEventIds.indexOf(re.id) === -1;
    });

    if (available.length === 0) {
      // Reset used IDs only after all currently eligible events for this stage were seen.
      s.usedRandomEventIds = s.usedRandomEventIds.filter(function(id) {
        return !eligible.some(function(re) { return re.id === id; });
      });
      available = eligible.slice();
      if (available.length === 0) return null;
    }

    var eventChance = 0.25 + Math.min(0.15, s.yearActionCount * 0.03);
    if (s.fatigue >= 6) eventChance += 0.08;
    if (s.risk >= 8) eventChance += 0.08;
    if (s.awareness >= 14) eventChance -= 0.05;
    eventChance += s.randomEventChanceMod || 0;
    eventChance = Math.max(0.1, Math.min(0.7, eventChance));
    if (Game.random() > eventChance) return null;

    var totalWeight = available.reduce(function(sum, re) {
      return sum + Math.max(1, Math.round((re.probability || 0.1) * 100));
    }, 0);
    var roll = Game.random() * totalWeight;
    var picked = available[available.length - 1];
    for (var i = 0; i < available.length; i++) {
      roll -= Math.max(1, Math.round((available[i].probability || 0.1) * 100));
      if (roll <= 0) {
        picked = available[i];
        break;
      }
    }
    s.usedRandomEventIds.push(picked.id);
    return picked;
  },

  finishActionCycle: function() {
    var s = Game.state;
    var ending = Game.EndingSystem.check();
    if (ending) {
      Game.EndingSystem.triggerEnding(ending);
      this.phase = "ending";
      Game.UI.renderEnding(ending);
      return;
    }

    this.currentEvent = null;
    this.currentChainStep = null;
    this.currentRandomEvent = null;
    this.currentActionEvent = null;
    this.currentActionChoices = null;
    this.currentActionChoiceKey = null;
    this.currentDecision = null;
    Game.Storage.save();

    if (s.yearEnergy > 0 && s.age < s.maxAge) {
      if (s.fatigue >= 10) {
        this.forceRestYear("疲劳值满了，你这一年剩下的时间被迫用来休息。");
        return;
      }
      this.turnPhase = "action";
      Game.UI.render();
      Game.UI.showActionPanel();
      return;
    }

    if (s.yearActionCount > 1) {
      this.showStatusUpdate(s.age + "岁这一年你完成了 " + s.yearActionCount + " 次行动，体力耗尽，进入下一年。");
    }
    this.startRound();
  },

  getYearEnergyMax: function() {
    var s = Game.state;
    var base = 6 + (s.energyBonus || 0);
    if (s.fatigue >= 7) base -= 2;
    else if (s.fatigue >= 4) base -= 1;
    if (s.age >= 70) base -= 1;

    return Math.max(3, Math.min(6, base));
  },

  forceRestYear: function(reason) {
    var s = Game.state;
    var before = s.fatigue;
    s.fatigue = Math.max(0, s.fatigue - 4);
    s.yearEnergy = 0;
    s.maxYearEnergy = 6;
    s.yearActionCount = Math.max(1, s.yearActionCount);
    Game.Storage.save();
    Game.UI.showForcedRest(reason || "疲劳太高，你被迫休息了一年。", before, s.fatigue);
  },

  getActionEnergyCost: function(action) {
    if (typeof action.energyCost === "number") return Math.max(1, action.energyCost);
    if ((action.fatigue || 0) >= 2) return 3;
    if ((action.fatigue || 0) >= 1) return 2;
    return 1;
  },

  getAgeStep: function() {
    return 1;
  },

  ageEffects: function() {
    var s = Game.state;
    if (s.age >= 60) {
      if (s.loneliness < 18 && Game.random() < 0.3) s.loneliness++;
      if (s.mental > 2 && Game.random() < 0.2) s.mental--;
      if (s.health > 4 && Game.random() < 0.25) s.health--;
    }
    if (s.age >= 40 && s.age < 60) {
      if (s.socialExp < 18 && Game.random() < 0.3) s.socialExp++;
      if (s.health > 5 && Game.random() < 0.12) s.health--;
    }
    if (s.age >= 20 && s.age < 40) {
      if (s.digitalSkill < 18 && Game.random() < 0.2) s.digitalSkill++;
    }
    if ((s.snackHabit || 0) >= 6 && s.health > 3 && Game.random() < 0.18) {
      s.health--;
      s.fatigue = Math.min(10, s.fatigue + 1);
    }
    if (s.health <= 6 && s.yearEnergy > 0 && Game.random() < 0.25) {
      s.yearEnergy = Math.max(0, s.yearEnergy - 1);
    }
  },

  // Handle fraud event or chain event choice
  handleChoice: function(index) {
    if (this.currentChainStep) {
      var chainResult = Game.FraudChainSystem.processChainChoice(index);
      this.consumeTemporaryEventEnergy(chainResult.log || (chainResult.log = []));
      Game.UI.showResult(chainResult);
      if (chainResult.continueChain) {
        Game.UI.onResultDismiss = function() {
          Game.Loop.currentChainStep = Game.FraudChainSystem.getCurrentStep();
          if (Game.Loop.currentChainStep) {
            Game.UI.showChainEvent(Game.Loop.currentChainStep);
          } else {
            Game.Loop.showStatusUpdate("连环诈骗链已结束。");
          }
          Game.UI.render();
        };
      }
    } else if (this.currentEvent) {
      var result = Game.EventSystem.processChoice(this.currentEvent, index);
      this.consumeTemporaryEventEnergy(result.log || (result.log = []));
      Game.UI.showResult(result);
    }
    Game.UI.render();
    Game.Storage.save();
  },

  showStatusUpdate: function(msg) {
    Game.UI.showNotification(msg);
  }
};
