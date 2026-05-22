window.Game = window.Game || {};

// Actions available per life stage
// Each action has effects that apply when chosen
Game.Actions = {
  childhood: [
    { id: "study", icon: "📚", name: "学习", desc: "写作业、看书、上辅导班", effects: { awareness: 1, digitalSkill: 1, happiness: -1 }, fatigue: 1 },
    { id: "chores", icon: "🧹", name: "做家务赚零花钱", desc: "帮妈妈扫地、洗碗", effects: { money: 5, familyTrust: 1, happiness: 1 }, fatigue: 0 },
    { id: "play", icon: "🎮", name: "打游戏", desc: "打电脑游戏或手机游戏", effects: { mental: 1, happiness: 1, greed: 1, loneliness: -1 }, fatigue: -1 },
    { id: "social", icon: "👫", name: "和小伙伴玩", desc: "去小区广场找同学玩", effects: { socialExp: 1, loneliness: -1, trust: 1, happiness: 1 }, fatigue: 0 },
    { id: "exercise", icon: "⚽", name: "体育运动", desc: "踢足球、跳绳、跑步", effects: { mental: 1, health: 1, happiness: 1 }, fatigue: -1 },
    { id: "rest", icon: "😴", name: "休息", desc: "在家看电视、躺着", effects: { loneliness: 1, happiness: 1 }, fatigue: -2 }
  ],
  middle_school: [
    { id: "study", icon: "📚", name: "认真学习", desc: "刷题、复习、准备考试", effects: { awareness: 1, digitalSkill: 1, happiness: -1 }, fatigue: 2 },
    { id: "parttime", icon: "💰", name: "做兼职", desc: "发传单、帮人跑腿", effects: { money: 200, socialExp: 1, happiness: -1 }, fatigue: 1 },
    { id: "play", icon: "🎮", name: "打游戏/刷手机", desc: "王者荣耀、刷抖音、看直播", effects: { mental: 1, happiness: 1, greed: 1, digitalSkill: 1 }, fatigue: -1 },
    { id: "social", icon: "👫", name: "社交", desc: "和朋友逛街、聊天、参加社团", effects: { socialExp: 1, loneliness: -1, trust: 1, happiness: 1 }, fatigue: 0 },
    { id: "exercise", icon: "🏃", name: "体育锻炼", desc: "打篮球、跑步、健身", effects: { mental: 1, health: 1, happiness: 1 }, fatigue: -1 },
    { id: "rest", icon: "😴", name: "摆烂", desc: "什么都不想干", effects: { loneliness: 1, happiness: 1 }, fatigue: -2 }
  ],
  college: [
    { id: "study", icon: "📚", name: "泡图书馆", desc: "学习、考证、准备考研", effects: { awareness: 1, digitalSkill: 1, happiness: -1 }, fatigue: 2 },
    { id: "parttime", icon: "💰", name: "兼职打工", desc: "做家教、送外卖、实习", effects: { money: 600, socialExp: 1, happiness: -1 }, fatigue: 1 },
    { id: "play", icon: "🎮", name: "打游戏/追剧", desc: "宅在宿舍打游戏", effects: { mental: 1, happiness: 1, loneliness: -1 }, fatigue: -1 },
    { id: "social", icon: "🍻", name: "社交聚会", desc: "参加社团、聚餐、认识新朋友", effects: { socialExp: 2, loneliness: -2, trust: 1, money: -200, happiness: 1 }, fatigue: 0 },
    { id: "exercise", icon: "🏃", name: "健身运动", desc: "去学校健身房、跑步", effects: { mental: 1, health: 1, happiness: 1 }, fatigue: -1 },
    { id: "love", icon: "❤️", name: "谈恋爱", desc: "和对象约会、经营感情", effects: { loneliness: -2, money: -300, mental: 1, happiness: 2 }, fatigue: 0, unlockCondition: function(s) { return s.socialExp >= 5; } },
    { id: "rest", icon: "😴", name: "摆烂", desc: "躺平、什么都不干", effects: { loneliness: 1, happiness: 1 }, fatigue: -2 }
  ],
  early_career: [
    { id: "work_hard", icon: "💼", name: "努力工作", desc: "加班、争取升职加薪", effects: { money: 900, socialExp: 1, awareness: 1, loneliness: 1, happiness: -1 }, fatigue: 2 },
    { id: "study", icon: "📚", name: "自我提升", desc: "学习理财、考证、读书", effects: { awareness: 1, digitalSkill: 1, happiness: -1 }, fatigue: 1 },
    { id: "social", icon: "🍻", name: "社交应酬", desc: "同事聚餐、朋友聚会、拓展人脉", effects: { socialExp: 1, loneliness: -1, trust: 1, money: -500, happiness: 1 }, fatigue: 0 },
    { id: "sidejob", icon: "💰", name: "搞副业", desc: "做自媒体、开网店、接私活", effects: { money: 800, greed: 1, risk: 1, happiness: -1 }, fatigue: 1 },
    { id: "exercise", icon: "🏃", name: "健身运动", desc: "去健身房、跑步、瑜伽", effects: { mental: 1, health: 1, money: -80, happiness: 1 }, fatigue: -1 },
    { id: "love", icon: "❤️", name: "经营感情", desc: "约会、陪伴另一半", effects: { loneliness: -2, familyTrust: 1, money: -500, happiness: 2 }, fatigue: 0 },
    { id: "rest", icon: "😴", name: "休息放松", desc: "周末宅家、看电影、旅游", effects: { mental: 1, loneliness: -1, happiness: 1 }, fatigue: -2 }
  ],
  family_career: [
    { id: "work_hard", icon: "💼", name: "拼事业", desc: "争取晋升、创业、赚大钱", effects: { money: 1500, socialExp: 1, loneliness: 1, familyTrust: -1, happiness: -2 }, fatigue: 2 },
    { id: "family", icon: "👨‍👩‍👧", name: "陪伴家人", desc: "陪孩子做作业、回父母家", effects: { familyTrust: 2, loneliness: -2, mental: 1, happiness: 2 }, fatigue: 0 },
    { id: "invest", icon: "📈", name: "研究投资", desc: "理财、买基金、研究股票", effects: { awareness: 1, greed: 1, happiness: -1 }, fatigue: 0 },
    { id: "social", icon: "🤝", name: "维护人脉", desc: "商业应酬、行业交流", effects: { socialExp: 1, trust: 1, money: -800, happiness: 1 }, fatigue: 0 },
    { id: "exercise", icon: "🏃", name: "健身运动", desc: "注意身体、保持健康", effects: { mental: 1, health: 1, money: -120, happiness: 1 }, fatigue: -1 },
    { id: "rest", icon: "😴", name: "休息调整", desc: "给自己放个假", effects: { mental: 1, loneliness: -1, happiness: 1 }, fatigue: -2 }
  ],
  midlife_asset: [
    { id: "work", icon: "💼", name: "继续工作", desc: "坚持干到退休", effects: { money: 1200, socialExp: 1, happiness: -1 }, fatigue: 1 },
    { id: "family", icon: "👨‍👩‍👧", name: "关注家庭", desc: "照顾父母、帮孩子", effects: { familyTrust: 2, loneliness: -1, happiness: 2 }, fatigue: 0 },
    { id: "invest", icon: "📈", name: "打理资产", desc: "管理存款、买理财产品", effects: { awareness: 1, greed: 1, happiness: -1 }, fatigue: 0 },
    { id: "hobby", icon: "🎵", name: "培养爱好", desc: "下棋、钓鱼、摄影、跳舞", effects: { mental: 1, loneliness: -2, socialExp: 1, happiness: 2 }, fatigue: -1 },
    { id: "exercise", icon: "🏃", name: "锻炼身体", desc: "太极、散步、广场舞", effects: { mental: 1, health: 1, money: -80, happiness: 1 }, fatigue: -1 },
    { id: "rest", icon: "😴", name: "休息养生", desc: "泡脚、早睡、喝茶", effects: { mental: 1, happiness: 1 }, fatigue: -2 }
  ],
  elderly: [
    { id: "family", icon: "👨‍👩‍👧", name: "含饴弄孙", desc: "带孙子、和子女视频", effects: { familyTrust: 2, loneliness: -2, mental: 1, happiness: 2 }, fatigue: 0 },
    { id: "hobby", icon: "🎵", name: "兴趣活动", desc: "广场舞、下棋、书法、种花", effects: { mental: 1, loneliness: -2, socialExp: 1, happiness: 2 }, fatigue: -1 },
    { id: "social", icon: "🤝", name: "老友聚会", desc: "和老朋友喝茶、聊天", effects: { loneliness: -2, trust: 1, socialExp: 1, happiness: 2 }, fatigue: 0 },
    { id: "learn_phone", icon: "📱", name: "学用手机", desc: "学微信、学视频通话、学网购", effects: { digitalSkill: 1, awareness: 1, risk: 1, happiness: -1 }, fatigue: 1 },
    { id: "exercise", icon: "🌅", name: "散步锻炼", desc: "早起散步、打太极", effects: { mental: 1, health: 1, happiness: 1 }, fatigue: -1 },
    { id: "rest", icon: "😴", name: "安静休息", desc: "在家看电视、听收音机", effects: { loneliness: 1, happiness: 1 }, fatigue: -2 }
  ]
};

// Extra actions rotate by age so each year has a slightly different texture.
Game.TimedActions = [
  { id: "family_antifraud_drill", stage: ["childhood"], minAge: 7, maxAge: 12, cadence: 3, phase: 1, icon: "📱", name: "和爸妈聊手机", desc: "聊聊陌生链接和验证码", effects: { awareness: 2, familyTrust: 1 }, fatigue: 1, energyCost: 2 },
  { id: "coding_class", stage: ["childhood"], minAge: 8, maxAge: 12, cadence: 3, phase: 2, icon: "💻", name: "兴趣班体验", desc: "学一点电脑和网络常识", effects: { digitalSkill: 2, awareness: 1, money: -80 }, fatigue: 1, energyCost: 2 },
  { id: "school_fair", stage: ["childhood"], minAge: 7, maxAge: 12, cadence: 4, phase: 0, icon: "🎪", name: "校园义卖", desc: "摆摊、换卡、管零花钱", effects: { money: 12, socialExp: 1, greed: 1 }, fatigue: 1, energyCost: 2 },

  { id: "contest", stage: ["middle_school"], minAge: 13, maxAge: 18, cadence: 3, phase: 1, icon: "🏅", name: "参加竞赛", desc: "备赛、面试、处理压力", effects: { awareness: 1, socialExp: 1, mental: -1 }, fatigue: 2, energyCost: 3 },
  { id: "ai_homework", stage: ["middle_school"], minAge: 14, maxAge: 18, cadence: 3, phase: 2, icon: "🤖", name: "用AI学习", desc: "学会核对答案来源", effects: { digitalSkill: 2, awareness: 1, risk: 1 }, fatigue: 1, energyCost: 2 },
  { id: "stream_watch", stage: ["middle_school"], minAge: 13, maxAge: 18, cadence: 4, phase: 0, icon: "📺", name: "看直播", desc: "关注主播、抽奖和粉丝群", effects: { mental: 1, greed: 1, risk: 1 }, fatigue: 0, energyCost: 1 },

  { id: "internship", stage: ["college"], minAge: 19, maxAge: 24, cadence: 3, phase: 1, icon: "🧳", name: "找实习", desc: "投简历、面试、识别黑中介", effects: { money: 1200, socialExp: 2, awareness: 1 }, fatigue: 2, energyCost: 3 },
  { id: "content_creator", stage: ["college"], minAge: 19, maxAge: 24, cadence: 3, phase: 2, icon: "🎬", name: "做内容号", desc: "剪视频、接推广、看数据", effects: { money: 500, digitalSkill: 2, greed: 1, risk: 1 }, fatigue: 1, energyCost: 2 },
  { id: "campus_antifraud", stage: ["college"], minAge: 19, maxAge: 24, cadence: 4, phase: 0, icon: "📣", name: "反诈志愿者", desc: "给同学讲真实案例", effects: { awareness: 2, socialExp: 1, trust: 1 }, fatigue: 1, energyCost: 2 },
  { id: "certificate_exam", stage: ["college"], minAge: 20, maxAge: 24, cadence: 5, phase: 0, icon: "📜", name: "考证规划", desc: "辨别证书含金量", effects: { awareness: 1, digitalSkill: 1, money: -800 }, fatigue: 2, energyCost: 3 },

  { id: "ai_tool_learning", stage: ["early_career"], minAge: 25, maxAge: 35, cadence: 3, phase: 1, icon: "🧠", name: "学习AI工具", desc: "提高效率，也学辨别AI骗局", effects: { digitalSkill: 2, awareness: 1 }, fatigue: 1, energyCost: 2 },
  { id: "emergency_fund", stage: ["early_career"], minAge: 25, maxAge: 35, cadence: 3, phase: 2, icon: "🏦", name: "建立应急金", desc: "把一部分工资存起来", effects: { money: -2000, awareness: 1, mental: 1, greed: -1 }, fatigue: 0, energyCost: 1 },
  { id: "career_switch", stage: ["early_career"], minAge: 28, maxAge: 35, cadence: 4, phase: 0, icon: "🔁", name: "评估跳槽", desc: "查公司、谈薪、算风险", effects: { money: 1500, socialExp: 1, risk: 1 }, fatigue: 2, energyCost: 3 },
  { id: "dating_app", stage: ["early_career"], minAge: 25, maxAge: 35, cadence: 5, phase: 0, icon: "💬", name: "认真相亲", desc: "线上线下认识新人", effects: { loneliness: -2, socialExp: 1, trust: 1, risk: 1 }, fatigue: 1, energyCost: 2 },

  { id: "child_digital_rules", stage: ["family_career"], minAge: 36, maxAge: 50, cadence: 3, phase: 1, icon: "👪", name: "家庭数字规矩", desc: "和孩子约定支付和游戏规则", effects: { familyTrust: 2, awareness: 1, digitalSkill: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return s.lifeFlags && s.lifeFlags.has_child; } },
  { id: "elder_phone_guard", stage: ["family_career"], minAge: 36, maxAge: 50, cadence: 3, phase: 2, icon: "📱", name: "帮父母清手机", desc: "清理诱导广告和陌生群", effects: { familyTrust: 2, awareness: 2, mental: -1 }, fatigue: 1, energyCost: 2 },
  { id: "mortgage_review", stage: ["family_career"], minAge: 36, maxAge: 50, cadence: 4, phase: 0, icon: "🏠", name: "复盘房贷保险", desc: "检查合同和续费项目", effects: { money: 1200, awareness: 1, mental: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return s.lifeFlags && (s.lifeFlags.has_house || s.lifeFlags.has_car); } },
  { id: "deepfake_drill", stage: ["family_career"], minAge: 40, maxAge: 50, cadence: 5, phase: 0, icon: "🎭", name: "聊聊AI冒充", desc: "提醒家人大额转账先确认", effects: { awareness: 2, digitalSkill: 1, familyTrust: 1 }, fatigue: 1, energyCost: 2 },

  { id: "asset_checkup", stage: ["midlife_asset"], minAge: 51, maxAge: 65, cadence: 3, phase: 1, icon: "📊", name: "资产体检", desc: "盘点存款、债务和保险", effects: { awareness: 2, greed: -1, mental: 1 }, fatigue: 1, energyCost: 2 },
  { id: "medical_check", stage: ["midlife_asset"], minAge: 51, maxAge: 65, cadence: 3, phase: 2, icon: "🏥", name: "认真体检", desc: "把小毛病早点处理", effects: { mental: 1, fatigue: -1, money: -1500 }, fatigue: -1, energyCost: 2 },
  { id: "community_antifraud", stage: ["midlife_asset"], minAge: 51, maxAge: 65, cadence: 4, phase: 0, icon: "🏘", name: "社区反诈课", desc: "听案例，也提醒身边人", effects: { awareness: 2, socialExp: 1, trust: 1 }, fatigue: 0, energyCost: 1 },
  { id: "retirement_docs", stage: ["midlife_asset"], minAge: 58, maxAge: 65, cadence: 5, phase: 0, icon: "🗂", name: "整理退休材料", desc: "把证件、账户和密码理清", effects: { awareness: 1, familyTrust: 1, mental: 1 }, fatigue: 1, energyCost: 2 },

  { id: "phone_cleanup", stage: ["elderly"], minAge: 66, maxAge: 80, cadence: 3, phase: 1, icon: "🧹", name: "清理手机", desc: "卸载陌生APP和诱导广告", effects: { digitalSkill: 1, awareness: 2, risk: -1 }, fatigue: 1, energyCost: 2 },
  { id: "hospital_followup", stage: ["elderly"], minAge: 66, maxAge: 80, cadence: 3, phase: 2, icon: "🩺", name: "复诊配药", desc: "只走正规医院渠道", effects: { mental: 1, awareness: 1, money: -800 }, fatigue: 1, energyCost: 2 },
  { id: "neighborhood_watch", stage: ["elderly"], minAge: 66, maxAge: 80, cadence: 4, phase: 0, icon: "🏘", name: "邻里互助", desc: "互相提醒陌生推销", effects: { loneliness: -2, socialExp: 1, awareness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "video_family", stage: ["elderly"], minAge: 66, maxAge: 80, cadence: 5, phase: 0, icon: "📹", name: "和家人视频", desc: "聊近况，问问最近忙什么", effects: { loneliness: -2, familyTrust: 1, digitalSkill: 1 }, fatigue: 0, energyCost: 1 },

  { id: "reading_habit", stage: ["childhood"], minAge: 7, maxAge: 12, cadence: 2, phase: 1, icon: "📖", name: "课外阅读", desc: "读故事、科普和历史", effects: { awareness: 1, mental: 1, digitalSkill: 1 }, fatigue: 1, energyCost: 2 },
  { id: "labor_practice", stage: ["childhood"], minAge: 8, maxAge: 12, cadence: 3, phase: 0, icon: "🌱", name: "劳动实践", desc: "种菜、打扫、整理班级", effects: { socialExp: 1, familyTrust: 1, shame: -1 }, fatigue: 1, energyCost: 2 },
  { id: "science_fair", stage: ["childhood"], minAge: 9, maxAge: 12, cadence: 4, phase: 1, icon: "🔬", name: "科学小实验", desc: "做模型、观察和记录", effects: { digitalSkill: 1, awareness: 1, mental: 1 }, fatigue: 1, energyCost: 2 },
  { id: "class_duty", stage: ["childhood"], minAge: 9, maxAge: 12, cadence: 4, phase: 2, icon: "🧑‍🏫", name: "当值日班委", desc: "帮老师收作业、管纪律", effects: { socialExp: 1, trust: 1, shame: -1 }, fatigue: 1, energyCost: 2 },

  { id: "zhongkao_review", stage: ["middle_school"], minAge: 14, maxAge: 16, cadence: 2, phase: 0, icon: "📝", name: "中考复习", desc: "查漏补缺，稳住基础", effects: { awareness: 2, mental: -1 }, fatigue: 2, energyCost: 3 },
  { id: "library_study", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, cadence: 3, phase: 1, icon: "🏛", name: "去图书馆", desc: "安静学习，少刷手机", effects: { awareness: 1, digitalSkill: 1, greed: -1 }, fatigue: 1, energyCost: 2 },
  { id: "volunteer_service", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, cadence: 4, phase: 1, icon: "🤲", name: "志愿服务", desc: "社区服务、助老助残", effects: { socialExp: 2, trust: 1, loneliness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "law_class", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, cadence: 4, phase: 2, icon: "⚖️", name: "法治课", desc: "学合同、隐私和消费者权益", effects: { awareness: 2, digitalSkill: 1 }, fatigue: 1, energyCost: 2 },
  { id: "skills_training", stage: ["middle_school", "college", "early_career"], minAge: 15, maxAge: 30, cadence: 3, phase: 0, icon: "🛠", name: "技能训练", desc: "实训、编程、维修或剪辑", effects: { digitalSkill: 2, socialExp: 1 }, fatigue: 2, energyCost: 3 },
  { id: "career_planning", stage: ["middle_school", "college"], minAge: 15, maxAge: 24, cadence: 5, phase: 0, icon: "🧭", name: "生涯规划", desc: "了解专业、职业和城市", effects: { awareness: 1, socialExp: 1, greed: -1 }, fatigue: 1, energyCost: 2 },
  { id: "gaokao_review", stage: ["middle_school"], minAge: 17, maxAge: 18, cadence: 2, phase: 1, icon: "🎯", name: "高考冲刺", desc: "模拟考、错题本和作息", effects: { awareness: 2, mental: -1, fatigue: 1 }, fatigue: 2, energyCost: 3 },
  { id: "psychology_counseling", stage: ["middle_school", "college", "early_career"], minAge: 15, maxAge: 30, cadence: 5, phase: 2, icon: "🫶", name: "心理疏导", desc: "和老师、家人或咨询师聊聊", effects: { mental: 2, shame: -1, familyTrust: 1 }, fatigue: 0, energyCost: 1, unlockCondition: function(s) { return s.mental <= 10 || s.shame >= 5 || s.fatigue >= 5; } },

  { id: "major_research", stage: ["college"], minAge: 19, maxAge: 22, cadence: 3, phase: 0, icon: "🔎", name: "研究专业方向", desc: "问学长、看培养方案", effects: { awareness: 2, socialExp: 1 }, fatigue: 1, energyCost: 2 },
  { id: "scholarship_apply", stage: ["college"], minAge: 19, maxAge: 24, cadence: 4, phase: 1, icon: "🏅", name: "申请奖助学金", desc: "整理材料，争取资助", effects: { money: 1200, awareness: 1, shame: -1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return s.awareness >= 8 || s.money <= 5000; } },
  { id: "student_union", stage: ["college"], minAge: 19, maxAge: 23, cadence: 4, phase: 2, icon: "🧑‍🤝‍🧑", name: "参加学生组织", desc: "做活动、协调同学", effects: { socialExp: 2, trust: 1, fatigue: 1 }, fatigue: 1, energyCost: 2 },
  { id: "research_project", stage: ["college"], minAge: 20, maxAge: 24, cadence: 5, phase: 1, icon: "🧪", name: "科研/竞赛项目", desc: "跟老师做项目或比赛", effects: { awareness: 2, digitalSkill: 1, socialExp: 1 }, fatigue: 2, energyCost: 3, unlockCondition: function(s) { return s.awareness >= 9 && s.digitalSkill >= 6; } },
  { id: "exam_postgraduate", stage: ["college", "early_career"], minAge: 21, maxAge: 30, cadence: 5, phase: 3, icon: "🎓", name: "准备考研/升本", desc: "系统复习，提升学历", effects: { awareness: 2, fatigue: 2, mental: -1 }, fatigue: 2, energyCost: 3, unlockCondition: function(s) { return s.lifeFlags.college_zhuanke || s.lifeFlags.college_bachelor || s.lifeFlags.work_then_adult_education; } },
  { id: "campus_job_fair", stage: ["college"], minAge: 21, maxAge: 24, cadence: 3, phase: 2, icon: "💼", name: "校园招聘会", desc: "投简历、问岗位、比待遇", effects: { socialExp: 2, awareness: 1 }, fatigue: 1, energyCost: 2 },

  { id: "certification_exam", stage: ["early_career", "family_career"], minAge: 25, maxAge: 45, cadence: 4, phase: 1, icon: "📜", name: "职业资格考试", desc: "备考证书，规范提升", effects: { awareness: 1, money: -600, digitalSkill: 1 }, fatigue: 2, energyCost: 3 },
  { id: "community_service_adult", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, cadence: 5, phase: 2, icon: "🏘", name: "社区公益", desc: "参与社区治理和互助", effects: { socialExp: 2, trust: 1, loneliness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "parent_school_meeting", stage: ["family_career", "midlife_asset"], minAge: 36, maxAge: 55, cadence: 4, phase: 3, icon: "🏫", name: "参加家校沟通", desc: "了解孩子学习和心理", effects: { familyTrust: 2, awareness: 1, fatigue: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return s.lifeFlags && s.lifeFlags.has_child; } },
  { id: "lifelong_learning", stage: ["midlife_asset", "elderly"], minAge: 50, maxAge: 80, cadence: 4, phase: 1, icon: "📚", name: "终身学习", desc: "老年大学、公开课、读书会", effects: { awareness: 1, digitalSkill: 1, loneliness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "mentor_young_people", stage: ["midlife_asset", "elderly"], minAge: 55, maxAge: 80, cadence: 5, phase: 3, icon: "🧑‍🏫", name: "带带年轻人", desc: "分享经验，提醒少走弯路", effects: { socialExp: 1, trust: 1, loneliness: -1, awareness: 1 }, fatigue: 1, energyCost: 2 }
];

Game.TimedActions = Game.TimedActions.concat([
  { id: "buy_spicy_strips", stage: ["childhood"], minAge: 7, maxAge: 12, cadence: 2, phase: 0, icon: "🌶", name: "买辣条", desc: "放学路上买一包，快乐很便宜", effects: { money: -2, mental: 1, health: -1 }, fatigue: 0, energyCost: 1, stateEffects: { snackHabit: 1 } },
  { id: "buy_card_pack", stage: ["childhood"], minAge: 7, maxAge: 12, cadence: 3, phase: 2, icon: "🃏", name: "买卡包", desc: "想抽到稀有卡，但零花钱很薄", effects: { money: -5, greed: 1, mental: 1 }, fatigue: 0, energyCost: 1 },
  { id: "save_pocket_money", stage: ["childhood", "middle_school"], minAge: 7, maxAge: 18, cadence: 3, phase: 1, icon: "🐖", name: "存零花钱", desc: "把小钱装进储蓄罐", effects: { awareness: 1, greed: -1, shame: -1 }, fatigue: 0, energyCost: 1 },
  { id: "school_clinic", stage: ["childhood", "middle_school"], minAge: 7, maxAge: 18, cadence: 4, phase: 3, icon: "🏥", name: "去医务室", desc: "感冒、肚子疼就别硬扛", effects: { money: -20, health: 2, fatigue: -1, medicalSpend: 20 }, fatigue: -1, energyCost: 1, unlockCondition: function(s) { return s.health <= 14 || s.fatigue >= 5; } },
  { id: "canteen_meal", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, cadence: 2, phase: 1, icon: "🍚", name: "好好吃饭", desc: "少点外卖，按时吃热饭", effects: { money: -18, health: 1, mental: 1, snackHabit: -1 }, fatigue: -1, energyCost: 1 },
  { id: "night_snack", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, cadence: 3, phase: 0, icon: "🍢", name: "吃宵夜", desc: "烧烤、炸串、奶茶，很香也很花钱", effects: { money: -45, mental: 1, health: -1, fatigue: 1 }, fatigue: 0, energyCost: 1, stateEffects: { snackHabit: 1 } },
  { id: "regular_physical_exam", stage: ["early_career", "family_career", "midlife_asset", "elderly"], minAge: 25, maxAge: 80, cadence: 4, phase: 1, icon: "🩺", name: "基础体检", desc: "抽血、B超、牙齿和慢病筛查", effects: { money: -650, health: 2, awareness: 1, medicalSpend: 650 }, fatigue: 0, energyCost: 2 },
  { id: "clinic_visit", stage: ["early_career", "family_career", "midlife_asset", "elderly"], minAge: 25, maxAge: 80, cadence: 3, phase: 2, icon: "🏥", name: "去门诊", desc: "把小毛病处理掉，别拖成大账单", effects: { money: -420, health: 2, fatigue: -1, medicalSpend: 420 }, fatigue: -1, energyCost: 2, unlockCondition: function(s) { return s.health <= 12 || s.fatigue >= 6; } },
  { id: "home_cooking_budget", stage: ["college", "early_career", "family_career", "midlife_asset"], minAge: 19, maxAge: 65, cadence: 4, phase: 0, icon: "🍳", name: "做饭控预算", desc: "买菜做饭，守住胃也守住钱包", effects: { money: -120, health: 1, familyTrust: 1, snackHabit: -1 }, fatigue: 0, energyCost: 1, hobbyTag: "cooking" },
  { id: "repair_lock", stage: ["early_career", "family_career", "midlife_asset", "elderly"], minAge: 25, maxAge: 80, cadence: 5, phase: 3, icon: "🔐", name: "检查门锁账户", desc: "换锁、改密码、补安全习惯", effects: { money: -260, awareness: 1, risk: -1 }, fatigue: 0, energyCost: 1 },
  { id: "learn_guitar", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, cadence: 4, phase: 1, icon: "🎸", name: "学吉他", desc: "练和弦、弹唱和节奏", effects: { mental: 1, loneliness: -1, socialExp: 1, money: -300 }, fatigue: 1, energyCost: 2, hobbyTag: "guitar" },
  { id: "learn_piano", stage: ["childhood", "middle_school", "college", "early_career"], minAge: 7, maxAge: 35, cadence: 5, phase: 2, icon: "🎹", name: "学钢琴", desc: "练基本功和乐理", effects: { mental: 1, awareness: 1, money: -200 }, fatigue: 1, energyCost: 2, hobbyTag: "piano" },
  { id: "learn_erhu", stage: ["midlife_asset", "elderly"], minAge: 50, maxAge: 80, cadence: 4, phase: 2, icon: "🎻", name: "学二胡", desc: "跟老师练弓法和曲子", effects: { mental: 1, loneliness: -1, socialExp: 1, money: -300 }, fatigue: 1, energyCost: 2, hobbyTag: "erhu" },
  { id: "choir_singing", stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 18, maxAge: 80, cadence: 5, phase: 0, icon: "🎤", name: "合唱/唱歌", desc: "参加合唱、K歌或练声", effects: { mental: 1, loneliness: -2, socialExp: 1, money: -100 }, fatigue: 0, energyCost: 1, hobbyTag: "singing" },
  { id: "basketball_training", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, cadence: 3, phase: 2, icon: "🏀", name: "打篮球", desc: "约球、跑战术、出汗", effects: { mental: 1, socialExp: 1, loneliness: -1 }, fatigue: -1, energyCost: 2, hobbyTag: "basketball" },
  { id: "badminton_training", stage: ["college", "early_career", "family_career", "midlife_asset"], minAge: 18, maxAge: 65, cadence: 4, phase: 0, icon: "🏸", name: "打羽毛球", desc: "下班约场，活动身体", effects: { mental: 1, socialExp: 1, money: -80 }, fatigue: -1, energyCost: 2, hobbyTag: "badminton" },
  { id: "swimming_training", stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset"], minAge: 13, maxAge: 65, cadence: 5, phase: 1, icon: "🏊", name: "游泳", desc: "学换气，练体能", effects: { mental: 1, fatigue: -1, money: -120 }, fatigue: -1, energyCost: 2, hobbyTag: "swimming" },
  { id: "martial_arts", stage: ["childhood", "middle_school", "college", "early_career"], minAge: 8, maxAge: 35, cadence: 5, phase: 3, icon: "🥋", name: "武术/搏击", desc: "练基本动作和自我保护", effects: { mental: 1, shame: -1, socialExp: 1, money: -120 }, fatigue: 1, energyCost: 2, hobbyTag: "martial_arts" },
  { id: "calligraphy", stage: ["childhood", "middle_school", "midlife_asset", "elderly"], minAge: 8, maxAge: 80, cadence: 4, phase: 3, icon: "🖌", name: "练书法", desc: "临帖、静心和控笔", effects: { mental: 1, awareness: 1, fatigue: -1 }, fatigue: -1, energyCost: 1, hobbyTag: "calligraphy" },
  { id: "photography", stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 18, maxAge: 80, cadence: 4, phase: 2, icon: "📷", name: "摄影", desc: "拍街景、人像和生活细节", effects: { mental: 1, digitalSkill: 1, socialExp: 1, money: -500 }, fatigue: 1, energyCost: 2, hobbyTag: "photography" },
  { id: "cooking_skill", stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 18, maxAge: 80, cadence: 3, phase: 1, icon: "🍳", name: "学做饭", desc: "练家常菜、控预算", effects: { familyTrust: 1, mental: 1, money: -100 }, fatigue: 0, energyCost: 1, hobbyTag: "cooking" },
  { id: "history_reading", stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 13, maxAge: 80, cadence: 5, phase: 4, icon: "🏺", name: "读历史", desc: "看朝代、人物和制度变迁", effects: { awareness: 1, mental: 1, greed: -1 }, fatigue: 0, energyCost: 1, hobbyTag: "history" },
  { id: "math_logic", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, cadence: 5, phase: 2, icon: "➗", name: "学数学逻辑", desc: "练概率、统计和推理", effects: { awareness: 2, digitalSkill: 1, greed: -1 }, fatigue: 1, energyCost: 2, hobbyTag: "math" },
  { id: "astronomy_watch", stage: ["childhood", "middle_school", "college", "early_career", "family_career"], minAge: 8, maxAge: 55, cadence: 6, phase: 1, icon: "🔭", name: "看星星", desc: "学天文、认星座和行星", effects: { mental: 1, awareness: 1, loneliness: -1 }, fatigue: 0, energyCost: 1, hobbyTag: "astronomy" },
  { id: "short_drama_scroll", stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 13, maxAge: 80, cadence: 3, phase: 0, icon: "📱", name: "刷短剧", desc: "看逆袭、悬疑、现实题材短剧", effects: { mental: 1, fatigue: 1, greed: 1, digitalSkill: 1 }, fatigue: 1, energyCost: 1, hobbyTag: "short_drama" },
  { id: "short_drama_create", stage: ["college", "early_career", "family_career"], minAge: 19, maxAge: 45, cadence: 5, phase: 2, icon: "🎬", name: "拍短剧", desc: "写脚本、拍摄、剪辑发布", effects: { digitalSkill: 2, socialExp: 1, money: -500, risk: 1 }, fatigue: 2, energyCost: 3, hobbyTag: "short_drama_create", unlockCondition: function(s) { return s.digitalSkill >= 6 || s.careerId === "media_creator"; } },
  { id: "career_deep_work", stage: ["early_career", "family_career", "midlife_asset"], minAge: 22, maxAge: 60, cadence: 3, phase: 1, icon: "📈", name: "深耕职业", desc: "复盘项目、补短板、稳步成长", effects: { money: 800, awareness: 1, fatigue: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return !!s.careerId; } },
  { id: "job_switch_plan", stage: ["early_career", "family_career"], minAge: 25, maxAge: 45, cadence: 5, phase: 4, icon: "🧳", name: "谋划跳槽", desc: "看岗位、谈薪资、查公司", effects: { socialExp: 1, awareness: 1, risk: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return !!s.careerId && s.socialExp >= 7; } },
  { id: "house_viewing", stage: ["early_career", "family_career"], minAge: 25, maxAge: 50, cadence: 4, phase: 1, icon: "🏠", name: "看房", desc: "看地段、学区、通勤和月供", effects: { awareness: 1, greed: 1, fatigue: 1 }, fatigue: 1, energyCost: 2, stateEffects: { houseMarketHeat: 1 }, unlockCondition: function(s) { return !s.lifeFlags.has_house && s.money >= 10000; } },
  { id: "mortgage_calculation", stage: ["early_career", "family_career"], minAge: 25, maxAge: 55, cadence: 5, phase: 2, icon: "🧮", name: "算房贷", desc: "算首付、月供和利率风险", effects: { awareness: 2, greed: -1, mental: 1 }, fatigue: 1, energyCost: 2, stateEffects: { houseMarketHeat: -1 }, unlockCondition: function(s) { return s.money >= 8000 || s.lifeFlags.has_house; } },
  { id: "stock_index_invest", stage: ["early_career", "family_career", "midlife_asset"], minAge: 23, maxAge: 65, cadence: 3, phase: 2, icon: "📊", name: "指数定投", desc: "小额、长期、分散风险", effects: { money: -1000, awareness: 1, greed: -1 }, fatigue: 0, energyCost: 1, stateEffects: { stockPosition: 1 }, unlockCondition: function(s) { return s.money >= 3000 && s.awareness >= 6; } },
  { id: "stock_speculation", stage: ["college", "early_career", "family_career", "midlife_asset"], minAge: 19, maxAge: 65, cadence: 4, phase: 3, icon: "📉", name: "短线炒股", desc: "追热点、看K线、赌消息", effects: { money: -1500, greed: 2, risk: 2, fatigue: 1 }, fatigue: 1, energyCost: 2, stateEffects: { stockPosition: 2 }, unlockCondition: function(s) { return s.money >= 5000; } },
  { id: "antique_market", stage: ["family_career", "midlife_asset", "elderly"], minAge: 40, maxAge: 80, cadence: 4, phase: 0, icon: "🏺", name: "逛古玩市场", desc: "看瓷器、钱币、字画和故事", effects: { awareness: 1, greed: 1, money: -500 }, fatigue: 1, energyCost: 2, stateEffects: { antiqueCollection: 1 }, hobbyTag: "antiques" },
  { id: "museum_study", stage: ["college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 18, maxAge: 80, cadence: 5, phase: 1, icon: "🏛", name: "逛博物馆", desc: "看展览，学点鉴赏常识", effects: { awareness: 2, mental: 1, money: -80 }, fatigue: 0, energyCost: 1, hobbyTag: "museum" }
]);

// Optional spending actions: these are always eligible by age/stage and feed the 3-choice random action deck.
Game.SpendingActions = [
  { id: "coin_capsule_toy", stage: ["childhood"], minAge: 7, maxAge: 12, icon: "🧸", name: "扭蛋小玩具", desc: "用几块钱买一个随机小惊喜", effects: { money: -6, happiness: 1, greed: 1 }, fatigue: 0, energyCost: 1 },
  { id: "comic_rental", stage: ["childhood", "middle_school"], minAge: 8, maxAge: 16, icon: "📕", name: "租漫画书", desc: "放学后租几本漫画回家看", effects: { money: -5, happiness: 1, mental: 1, awareness: 1 }, fatigue: -1, energyCost: 1 },
  { id: "stationery_upgrade", stage: ["childhood", "middle_school"], minAge: 7, maxAge: 18, icon: "✏️", name: "买新文具", desc: "一支顺手的笔也能让作业没那么痛苦", effects: { money: -12, happiness: 1, awareness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "snack_share_pack", stage: ["childhood", "middle_school"], minAge: 7, maxAge: 18, icon: "🍬", name: "买零食分同学", desc: "用小钱换一点热闹和人缘", effects: { money: -10, happiness: 1, socialExp: 1, snackHabit: 1, health: -1 }, fatigue: 0, energyCost: 1 },
  { id: "child_movie_ticket", stage: ["childhood", "middle_school"], minAge: 8, maxAge: 16, icon: "🎬", name: "看一场电影", desc: "爆米花很贵，但大银幕很亮", effects: { money: -45, happiness: 2, mental: 1 }, fatigue: 0, energyCost: 1 },
  { id: "school_trip_fee", stage: ["childhood", "middle_school"], minAge: 9, maxAge: 18, icon: "🚌", name: "交春游费", desc: "和同学去郊外或科技馆走走", effects: { money: -120, happiness: 2, socialExp: 1, awareness: 1 }, fatigue: 1, energyCost: 2 },
  { id: "sports_shoes_student", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, icon: "👟", name: "买运动鞋", desc: "旧鞋磨脚，新鞋也磨钱包", effects: { money: -320, happiness: 1, health: 1 }, fatigue: 0, energyCost: 1 },
  { id: "phone_case_student", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, icon: "📱", name: "换手机壳", desc: "给旧手机换一点新鲜感", effects: { money: -35, happiness: 1, greed: 1 }, fatigue: 0, energyCost: 1 },
  { id: "idol_merch", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, icon: "🎫", name: "买周边", desc: "喜欢是真的，价格也是真的", effects: { money: -180, happiness: 2, greed: 1 }, fatigue: 0, energyCost: 1 },
  { id: "exam_materials", stage: ["middle_school", "college", "early_career"], minAge: 13, maxAge: 35, icon: "📚", name: "买复习资料", desc: "资料不保证上岸，但空手更难", effects: { money: -160, awareness: 1, happiness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "private_tutor_hour", stage: ["middle_school"], minAge: 13, maxAge: 18, icon: "🧑‍🏫", name: "补一节课", desc: "把一个卡住的知识点讲明白", effects: { money: -260, awareness: 2, happiness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "student_group_meal", stage: ["middle_school", "college"], minAge: 13, maxAge: 24, icon: "🍜", name: "同学聚餐", desc: "一顿饭让关系熟一点", effects: { money: -90, happiness: 2, socialExp: 1, loneliness: -1 }, fatigue: 0, energyCost: 1 },
  { id: "campus_laundry_card", stage: ["college"], minAge: 19, maxAge: 24, icon: "🧺", name: "充洗衣卡", desc: "把生活小事处理利索", effects: { money: -80, happiness: 1, health: 1 }, fatigue: -1, energyCost: 1 },
  { id: "dorm_decoration", stage: ["college"], minAge: 19, maxAge: 24, icon: "🛏", name: "布置宿舍", desc: "小台灯、床帘、收纳盒，空间终于像自己的", effects: { money: -260, happiness: 2, mental: 1 }, fatigue: 0, energyCost: 1 },
  { id: "secondhand_laptop", stage: ["college", "early_career"], minAge: 19, maxAge: 30, icon: "💻", name: "买二手电脑", desc: "提升效率，也要查清来源和保修", effects: { money: -1800, digitalSkill: 1, awareness: 1, happiness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "online_course_paid", stage: ["college", "early_career", "family_career"], minAge: 19, maxAge: 45, icon: "🎓", name: "买线上课", desc: "课程可能有用，冲动囤课也会吃灰", effects: { money: -699, digitalSkill: 1, awareness: 1, happiness: -1 }, fatigue: 1, energyCost: 2 },
  { id: "campus_short_trip", stage: ["college"], minAge: 19, maxAge: 24, icon: "🚄", name: "周边短途游", desc: "趁年轻去附近城市看一看", effects: { money: -600, happiness: 3, socialExp: 1, fatigue: 1 }, fatigue: 1, energyCost: 2 },
  { id: "job_interview_outfit", stage: ["college", "early_career"], minAge: 21, maxAge: 30, icon: "👔", name: "买面试衣服", desc: "体面不等于虚荣，它也是准备的一部分", effects: { money: -500, socialExp: 1, happiness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "rent_better_room", stage: ["early_career"], minAge: 25, maxAge: 35, icon: "🏠", name: "换好一点的房间", desc: "通勤短一点，租金高一点", effects: { money: -1800, happiness: 2, health: 1, fatigue: -1 }, fatigue: -1, energyCost: 2 },
  { id: "commute_month_card", stage: ["college", "early_career", "family_career"], minAge: 19, maxAge: 50, icon: "🚇", name: "办通勤月卡", desc: "小额确定支出，换一点每天的稳定", effects: { money: -220, happiness: 1, fatigue: -1, awareness: 1 }, fatigue: -1, energyCost: 1 },
  { id: "noise_cancel_headphones", stage: ["college", "early_career", "family_career"], minAge: 19, maxAge: 50, icon: "🎧", name: "买降噪耳机", desc: "给自己买一点安静", effects: { money: -899, happiness: 2, mental: 1 }, fatigue: 0, energyCost: 1 },
  { id: "fitness_membership", stage: ["early_career", "family_career"], minAge: 25, maxAge: 50, icon: "🏋️", name: "办健身卡", desc: "年卡划算的前提是你真的去", effects: { money: -1600, health: 2, happiness: 1, greed: 1 }, fatigue: 0, energyCost: 2 },
  { id: "therapy_session", stage: ["college", "early_career", "family_career"], minAge: 19, maxAge: 50, icon: "🛋", name: "心理咨询", desc: "把心里乱成团的东西慢慢说清楚", effects: { money: -500, mental: 2, shame: -1, happiness: 2 }, fatigue: 0, energyCost: 1, unlockCondition: function(s) { return s.mental <= 12 || s.happiness <= 9 || s.shame >= 5; } },
  { id: "dating_dinner", stage: ["early_career", "family_career"], minAge: 25, maxAge: 45, icon: "🍽", name: "认真约顿饭", desc: "不是炫耀消费，是好好相处", effects: { money: -450, happiness: 2, loneliness: -1, trust: 1 }, fatigue: 0, energyCost: 1 },
  { id: "gift_parents", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, icon: "🎁", name: "给父母买东西", desc: "一件实用礼物，比转发关心更具体", effects: { money: -800, familyTrust: 2, happiness: 2 }, fatigue: 0, energyCost: 1 },
  { id: "annual_vacation", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, icon: "🏖", name: "休年假旅行", desc: "离开熟悉环境几天，回来继续生活", effects: { money: -3500, happiness: 4, mental: 2, fatigue: -2 }, fatigue: -2, energyCost: 3 },
  { id: "house_cleaning_service", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, icon: "🧽", name: "请家政打扫", desc: "用钱买回半天体力和整洁", effects: { money: -260, happiness: 1, fatigue: -1, health: 1 }, fatigue: -1, energyCost: 1 },
  { id: "small_appliance", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, icon: "🍲", name: "买小家电", desc: "电饭煲、空气炸锅、净水壶，生活被调顺一点", effects: { money: -480, happiness: 2, health: 1 }, fatigue: 0, energyCost: 1 },
  { id: "family_portrait", stage: ["family_career", "midlife_asset"], minAge: 36, maxAge: 65, icon: "📷", name: "拍全家福", desc: "把一个普通年份认真留下来", effects: { money: -1200, familyTrust: 2, happiness: 3 }, fatigue: 1, energyCost: 2 },
  { id: "child_interest_class", stage: ["family_career"], minAge: 36, maxAge: 50, icon: "🎨", name: "给孩子报兴趣班", desc: "尊重兴趣，也看清预算", effects: { money: -2200, familyTrust: 1, happiness: 1, awareness: 1 }, fatigue: 1, energyCost: 2, unlockCondition: function(s) { return s.lifeFlags && s.lifeFlags.has_child; } },
  { id: "parent_medical_exam", stage: ["family_career", "midlife_asset"], minAge: 36, maxAge: 65, icon: "🩺", name: "带父母体检", desc: "提前发现问题，少一点后悔", effects: { money: -1800, familyTrust: 2, awareness: 1, happiness: 1 }, fatigue: 1, energyCost: 2 },
  { id: "car_maintenance", stage: ["family_career", "midlife_asset"], minAge: 36, maxAge: 65, icon: "🚗", name: "车子保养", desc: "车不会自己健康，账单也不会自己消失", effects: { money: -900, awareness: 1, fatigue: -1, happiness: 1 }, fatigue: -1, energyCost: 1, unlockCondition: function(s) { return s.lifeFlags && s.lifeFlags.has_car; } },
  { id: "home_repair", stage: ["family_career", "midlife_asset", "elderly"], minAge: 36, maxAge: 80, icon: "🧰", name: "修修家里", desc: "水龙头、门锁、灯管，小问题不拖成大问题", effects: { money: -650, happiness: 1, awareness: 1, health: 1 }, fatigue: 0, energyCost: 1 },
  { id: "better_mattress", stage: ["family_career", "midlife_asset", "elderly"], minAge: 36, maxAge: 80, icon: "🛌", name: "换个好床垫", desc: "睡眠不是奢侈，是底层系统", effects: { money: -2600, health: 2, happiness: 2, fatigue: -2 }, fatigue: -2, energyCost: 2 },
  { id: "dental_cleaning", stage: ["early_career", "family_career", "midlife_asset", "elderly"], minAge: 25, maxAge: 80, icon: "🦷", name: "洗牙护齿", desc: "花小钱，少挨大疼", effects: { money: -320, health: 1, awareness: 1, happiness: 1, medicalSpend: 320 }, fatigue: 0, energyCost: 1 },
  { id: "new_year_red_packet", stage: ["early_career", "family_career", "midlife_asset"], minAge: 25, maxAge: 65, icon: "🧧", name: "发压岁钱", desc: "成年人的年味，也是一叠现金的厚度", effects: { money: -1200, familyTrust: 1, happiness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "friend_wedding_gift", stage: ["college", "early_career", "family_career"], minAge: 22, maxAge: 50, icon: "💌", name: "随份子", desc: "关系走到礼金簿上，数字就很具体", effects: { money: -800, socialExp: 1, trust: 1, happiness: 1 }, fatigue: 0, energyCost: 1 },
  { id: "pet_supplies", stage: ["early_career", "family_career", "midlife_asset", "elderly"], minAge: 25, maxAge: 80, icon: "🐾", name: "买宠物用品", desc: "猫粮狗粮玩具驱虫，陪伴也有账单", effects: { money: -360, happiness: 2, loneliness: -1 }, fatigue: 0, energyCost: 1, unlockCondition: function(s) { return s.lifeFlags && s.lifeFlags.has_pet; } },
  { id: "community_group_buy", stage: ["family_career", "midlife_asset", "elderly"], minAge: 36, maxAge: 80, icon: "🥬", name: "社区团购", desc: "省钱和冲动下单只隔一个满减", effects: { money: -180, happiness: 1, greed: 1 }, fatigue: 0, energyCost: 1 },
  { id: "tea_house_afternoon", stage: ["midlife_asset", "elderly"], minAge: 50, maxAge: 80, icon: "🍵", name: "茶馆坐坐", desc: "一壶茶，半天闲话，一点人间烟火", effects: { money: -120, happiness: 2, loneliness: -1, socialExp: 1 }, fatigue: -1, energyCost: 1 },
  { id: "senior_university_fee", stage: ["midlife_asset", "elderly"], minAge: 55, maxAge: 80, icon: "🏫", name: "老年大学缴费", desc: "学唱歌、书法、摄影，生活还有新课表", effects: { money: -600, happiness: 3, loneliness: -1, awareness: 1 }, fatigue: 0, energyCost: 2 },
  { id: "hearing_glasses_check", stage: ["midlife_asset", "elderly"], minAge: 55, maxAge: 80, icon: "👓", name: "配镜听力检查", desc: "看得清、听得见，世界就近一点", effects: { money: -900, health: 1, happiness: 2, digitalSkill: 1 }, fatigue: 0, energyCost: 1 },
  { id: "grandchild_gift", stage: ["elderly"], minAge: 66, maxAge: 80, icon: "🧸", name: "给晚辈买礼物", desc: "别太贵，但要认真挑", effects: { money: -300, familyTrust: 1, happiness: 2 }, fatigue: 0, energyCost: 1 },
  { id: "short_drama_topup", stage: ["middle_school", "college", "early_career", "family_career", "midlife_asset", "elderly"], minAge: 13, maxAge: 80, icon: "📺", name: "短剧小额充值", desc: "只充一点点，但平台很会让你再充一点点", effects: { money: -68, happiness: 1, greed: 1, fatigue: 1 }, fatigue: 1, energyCost: 1 },
  { id: "premium_membership", stage: ["middle_school", "college", "early_career", "family_career"], minAge: 13, maxAge: 50, icon: "⭐", name: "开会员", desc: "免广告、看全集、云空间，舒服也会自动续费", effects: { money: -198, happiness: 1, digitalSkill: 1, awareness: 1 }, fatigue: 0, energyCost: 1 }
];

// Get actions available for a stage
Game.getActions = function(stageId, state) {
  var s = state || Game.state;
  var base = (Game.Actions[stageId] || Game.Actions["early_career"]).slice();
  var extras = Game.TimedActions.filter(function(action) {
    if (action.stage.indexOf(stageId) === -1) return false;
    if (s.age < action.minAge || s.age > action.maxAge) return false;
    if (action.unlockCondition && !action.unlockCondition(s)) return false;
    return s.age % action.cadence === action.phase;
  });
  if (extras.length > 0) {
    var offset = s.age % extras.length;
    extras = extras.slice(offset).concat(extras.slice(0, offset));
  }
  var spending = (Game.SpendingActions || []).filter(function(action) {
    if (action.stage.indexOf(stageId) === -1) return false;
    if (s.age < action.minAge || s.age > action.maxAge) return false;
    if (action.unlockCondition && !action.unlockCondition(s)) return false;
    return true;
  });
  return base.concat(extras.slice(0, 9), spending);
};
