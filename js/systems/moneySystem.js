window.Game = window.Game || {};

Game.MoneySystem = {
  addIncome: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var income = stage.baseIncome;
    var detail = {
      amount: 0,
      source: stage.name + "年度收入",
      gross: 0,
      taken: 0,
      note: ""
    };

    if (s.age >= 7 && s.age <= 12) {
      var allowance = 36 + Game.randomInt(0, 64) + (s.childhoodMoneyBonus || 0);
      var luckyMoney = 120 + Game.randomInt(0, 380);
      var keepLuckyMoney = Math.min(luckyMoney, 10 + Game.randomInt(0, 50) + (s.childhoodMoneyBonus || 0));
      var takeChance = 0.88 - Math.max(0, s.familyTrust - 10) * 0.01;
      var taken = Game.random() < takeChance ? luckyMoney - keepLuckyMoney : Math.max(0, luckyMoney - keepLuckyMoney - 40);
      income = allowance + luckyMoney - taken;
      detail = {
        amount: income,
        source: "零花钱和压岁钱",
        gross: allowance + luckyMoney,
        taken: taken,
        note: taken > 0 ? "压岁钱大多被爸妈收走，说是先帮你存着。你真正能支配的，还是那点零花钱。" : "今年压岁钱少见地留了一大半在你手里。"
      };
      s.money += income;
      s.totalIncome += income;
      return detail;
    }

    var studentIncome = this.getStudentIncome(stage.id);
    if (studentIncome) {
      s.money += studentIncome.amount;
      s.totalIncome += studentIncome.amount;
      return studentIncome;
    }

    var career = Game.getCareer ? Game.getCareer(s.careerId) : null;
    if (career && s.age >= 18 && s.age <= 65) {
      var level = Math.max(1, Math.min(6, s.careerLevel || 1));
      var growthFactor = 1 + (level - 1) * 0.12;
      var stability = career.stability || 1;
      var educationFactor = this.getEducationIncomeFactor();
      income = Math.round(career.baseIncome * growthFactor * stability * educationFactor);

      var raiseChance = (career.growth || 0.1) + (s.careerGrowthBonus || 0) + s.socialExp * 0.005 + s.awareness * 0.003 - s.fatigue * 0.006;
      if (Game.random() < Math.max(0.03, Math.min(0.32, raiseChance))) {
        s.careerLevel = Math.min(6, level + 1);
        income = Math.round(income * 1.05);
        detail.note = "今年有一次小幅涨薪。";
      }
      detail.source = career.name + "职业收入";
    }
    income = Math.round(income * (s.incomeMultiplier || 1) * (0.9 + Game.random() * 0.2));
    detail.amount = income;
    detail.gross = income;
    s.money += income;
    s.totalIncome += income;
    return detail;
  },

  getStudentIncome: function(stageId) {
    var s = Game.state;
    if (stageId !== "college" || s.careerId || s.lifeFlags.education_dropout || s.lifeFlags.no_college) return null;

    var history = s.actionHistory || [];
    var hasPostgraduatePrep = history.some(function(a) { return a.action === "exam_postgraduate"; });
    var isBachelor = s.lifeFlags.college_bachelor || s.lifeFlags.college_1ben || s.lifeFlags.college_211 || s.lifeFlags.college_985;
    var isPostgraduate = s.lifeFlags.postgraduate_student || (s.age >= 22 && isBachelor && hasPostgraduatePrep);
    if (isPostgraduate) s.lifeFlags.postgraduate_student = true;

    var amount;
    var source;
    var note;
    if (isPostgraduate) {
      amount = 18000 + Game.randomInt(0, 4000);
      source = "研究生补助和家里支持";
      note = "研究生阶段有补助，也可能有家里支持或助研助教，一年可支配现金大约两万元上下。";
    } else if (s.lifeFlags.college_zhuanke || s.lifeFlags.five_year_college) {
      amount = 7000 + Game.randomInt(0, 3000);
      source = "专科生活费";
      note = "专科阶段生活费不宽裕，兼职能补一点，但不能当成稳定工资。";
    } else {
      amount = 9000 + Game.randomInt(0, 2500);
      source = "大学生活费";
      note = "普通大学生一年可支配生活费大约一万元上下，真正能攒下来的很少。";
    }

    return {
      amount: amount,
      source: source,
      gross: amount,
      taken: 0,
      note: note
    };
  },

  getEducationIncomeFactor: function() {
    var s = Game.state;
    if (s.lifeFlags.postgraduate_student) return 1.15;
    if (s.lifeFlags.college_985) return 1.18;
    if (s.lifeFlags.college_211) return 1.12;
    if (s.lifeFlags.college_1ben) return 1.06;
    if (s.lifeFlags.college_bachelor) return 1;
    if (s.lifeFlags.college_zhuanke || s.lifeFlags.five_year_college) return 0.9;
    if (s.lifeFlags.vocational_school) return 0.86;
    if (s.lifeFlags.education_dropout || s.lifeFlags.no_college) return 0.78;
    return 0.92;
  },

  getLivingCostFactor: function(stageId) {
    var s = Game.state;
    if (stageId === "early_career" || (stageId === "college" && s.careerId)) {
      if (s.careerId === "flexible_work" || s.lifeFlags.education_dropout || s.lifeFlags.no_college) return 0.82;
      if (s.careerId === "skilled_worker" || s.lifeFlags.college_zhuanke || s.lifeFlags.vocational_school) return 0.95;
      if (s.careerId === "tech_product" || s.lifeFlags.college_985) return 1.12;
      return 1;
    }
    if (stageId === "family_career" || stageId === "midlife_asset") {
      if (s.careerId === "flexible_work" || s.lifeFlags.education_dropout || s.lifeFlags.no_college) return 0.9;
      if (s.careerId === "tech_product" || s.lifeFlags.college_985) return 1.12;
    }
    return 1;
  },

  applyLivingCost: function() {
    var s = Game.state;
    var stage = Game.getStage(s.age);
    var cost = 0;
    var label = "年度生活开销";
    var note = "";
    var snackTax = Math.max(0, s.snackHabit || 0);

    if (stage.id === "childhood") {
      cost = 20 + Game.randomInt(0, 45) + snackTax * 5;
      label = "文具、零食和小玩具";
      note = "小时候钱不多，辣条、贴纸、卡包和文具盒也会一点点吃掉余额。";
    } else if (stage.id === "middle_school") {
      cost = 300 + Game.randomInt(0, 700) + snackTax * 20;
      label = "校内外日常开销";
      note = "公交、资料、小吃、同学聚会，青春期的账单开始有了存在感。";
    } else if (stage.id === "college") {
      if (s.careerId) {
        cost = 36000 + Game.randomInt(0, 24000) + snackTax * 120;
        label = "毕业初期租房通勤";
        note = "刚工作时看似开始拿工资，但房租、押金、通勤和置办生活用品会迅速吃掉现金。";
      } else if (s.lifeFlags.postgraduate_student) {
        cost = 17000 + Game.randomInt(0, 8000) + snackTax * 100;
        label = "研究生住宿餐饮与通勤";
        note = "研究生补助看着比本科多，但房租、餐饮、通勤和论文期间的杂费也更实在。";
      } else {
        cost = 9800 + Game.randomInt(0, 3800) + snackTax * 80;
        label = "大学住宿餐饮与校园生活";
        note = "大学生活费大多花在饭卡、日用品、交通、快递和社交上，稍微放松就会透支。";
      }
    } else if (stage.id === "early_career") {
      cost = 48000 + Game.randomInt(0, 30000) + snackTax * 160;
      label = "租房通勤和生活成本";
      note = "工资到账前很像胜利，房租、水电、通勤和人情往来到账后很像现实。";
    } else if (stage.id === "family_career") {
      cost = 68000 + Game.randomInt(0, 38000) + snackTax * 160;
      if (s.lifeFlags.has_child) cost += 22000 + Game.randomInt(0, 18000);
      if (s.lifeFlags.has_house) cost += 18000 + Game.randomInt(0, 22000);
      label = "家庭固定开销";
      note = "一个家庭要运转起来，水电燃气、教育、房贷周边和老人孩子都会排队刷存在感。";
    } else if (stage.id === "midlife_asset") {
      cost = 56000 + Game.randomInt(0, 34000) + snackTax * 130;
      if (s.lifeFlags.has_house) cost += 12000 + Game.randomInt(0, 18000);
      label = "资产维护与家庭支出";
      note = "有资产不等于没有开销，维护、保险、亲友往来都是长期账。";
    } else {
      cost = 28000 + Game.randomInt(0, 24000) + snackTax * 80;
      label = "养老生活开销";
      note = "退休后的钱流得慢一些，但药、菜、交通和人情依旧每天都在发生。";
    }

    cost = Math.max(0, Math.round(cost * this.getLivingCostFactor(stage.id)));
    if (cost > 0) {
      Game.Attributes.apply({ money: -cost });
    }
    return { amount: cost, label: label, note: note };
  },

  getRandomEventHandlingCost: function(item) {
    var s = Game.state;
    var stageId = Game.getStage(s.age).id;
    var base = 0;
    if (stageId === "childhood") {
      base = 2 + Game.randomInt(0, 8);
    } else if (stageId === "middle_school") {
      base = 30 + Game.randomInt(0, 120);
    } else if (stageId === "college") {
      base = 120 + Game.randomInt(0, 480);
    } else if (stageId === "early_career") {
      base = 400 + Game.randomInt(0, 1600);
    } else if (stageId === "family_career") {
      base = 700 + Game.randomInt(0, 2600);
    } else if (stageId === "midlife_asset") {
      base = 800 + Game.randomInt(0, 3200);
    } else {
      base = 500 + Game.randomInt(0, 2200);
    }

    var effects = (item && item.effects) || {};
    var moneyDelta = effects.money || 0;
    if (moneyDelta < 0) {
      base += Math.min(base * 3, Math.round(Math.abs(moneyDelta) * 0.08));
    }
    if (effects.medicalSpend || effects.theftLoss) {
      base += Math.round(base * 0.35);
    }
    if (moneyDelta > 0) {
      base = Math.round(base * 0.55);
    }
    return Math.max(0, Math.round(base * this.getLivingCostFactor(stageId)));
  },

  settleDebtYearly: function() {
    var s = Game.state;
    var openingDebt = Math.max(0, s.debt || 0);
    if (openingDebt <= 0) {
      return { openingDebt: 0, paid: 0, interest: 0, rate: 0, remainingDebt: 0, cleared: true, note: "" };
    }

    var paid = Math.min(s.money || 0, openingDebt);
    s.money = Math.max(0, (s.money || 0) - paid);
    var remaining = Math.max(0, openingDebt - paid);
    var rate = this.getDebtInterestRate(remaining);
    var interest = remaining > 0 ? Math.max(1, Math.round(remaining * rate)) : 0;

    s.debt = remaining + interest;
    if (interest > 0) s.debtInterest = (s.debtInterest || 0) + interest;

    return {
      openingDebt: openingDebt,
      paid: paid,
      interest: interest,
      rate: rate,
      remainingDebt: s.debt,
      cleared: s.debt <= 0,
      note: s.debt <= 0 ? "今年现金足够，债务已经结清。" : "今年现金不够结清债务，剩余部分按20%年息滚入下一年。"
    };
  },

  getDebtInterestRate: function(debt) {
    if (debt <= 0) return 0;
    return 0.2;
  },

  getDebtInterestEstimate: function(debt) {
    debt = Math.max(0, debt || 0);
    if (debt <= 0) return 0;
    return Math.round(debt * this.getDebtInterestRate(debt));
  },

  formatDebtWithInterest: function(debt) {
    debt = Math.max(0, debt || 0);
    if (debt <= 0) return this.formatMoney(0);
    return this.formatMoney(debt) + '（利息' + this.formatMoney(this.getDebtInterestEstimate(debt)) + '）';
  },

  getNetWorth: function() {
    var s = Game.state;
    return s.money - s.debt;
  },

  formatMoney: function(n) {
    if (n >= 10000 || n <= -10000) {
      return (n / 10000).toFixed(1) + '万';
    }
    return n.toLocaleString('zh-CN') + '元';
  }
};
