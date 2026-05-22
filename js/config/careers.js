window.Game = window.Game || {};

Game.Careers = {
  skilled_worker: {
    name: "技术工人",
    baseIncome: 58000,
    stability: 1,
    growth: 0.12,
    desc: "靠手艺吃饭，收入稳中有升。"
  },
  office_staff: {
    name: "职场白领",
    baseIncome: 60000,
    stability: 1,
    growth: 0.14,
    desc: "工资、绩效和晋升共同决定收入。"
  },
  tech_product: {
    name: "技术/产品岗",
    baseIncome: 85000,
    stability: 0.92,
    growth: 0.18,
    desc: "上限较高，变化也快。"
  },
  public_service: {
    name: "公共服务岗",
    baseIncome: 56000,
    stability: 1.18,
    growth: 0.09,
    desc: "稳定、规范，收入增长较慢。"
  },
  education_health: {
    name: "教育/医疗岗",
    baseIncome: 62000,
    stability: 1.08,
    growth: 0.13,
    desc: "专业积累越久，越吃经验。"
  },
  sales_business: {
    name: "销售/个体经营",
    baseIncome: 70000,
    stability: 0.9,
    growth: 0.16,
    desc: "波动大，人脉和风险管理很关键。"
  },
  media_creator: {
    name: "内容/传媒岗",
    baseIncome: 60000,
    stability: 0.85,
    growth: 0.17,
    desc: "机会多，节奏快，也更容易被流量牵着走。"
  },
  flexible_work: {
    name: "灵活就业",
    baseIncome: 52000,
    stability: 0.85,
    growth: 0.1,
    desc: "自由度高，保障和现金流更考验自律。"
  }
};

Game.getCareer = function(id) {
  return id && Game.Careers[id] ? Game.Careers[id] : null;
};
