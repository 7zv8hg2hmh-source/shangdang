window.Game = window.Game || {};

Game.Achievements = [
  // Fraud-related
  { id: "first_blood", name: "初次失血", desc: "第一次被骗", condition: function(s) { return s.scamVictimCount >= 1; } },
  { id: "iron_wall", name: "铜墙铁壁", desc: "连续识破5次诈骗", condition: function(s) { return s.stoppedLossCount >= 5; } },
  { id: "chain_breaker", name: "链条终结者", desc: "成功中断一条连环诈骗", condition: function(s) { return s.flags.indexOf("chain_broken") !== -1; } },
  { id: "reporter", name: "正义之声", desc: "累计报警/举报3次", condition: function(s) { return s.reportedCount >= 3; } },
  { id: "big_loss", name: "伤筋动骨", desc: "单次损失超过5万", condition: function(s) { return s.flags.indexOf("big_loss_50k") !== -1; } },
  { id: "paranoid", name: "杯弓蛇影", desc: "信任值降到0", condition: function(s) { return s.trust <= 0; } },
  { id: "debt_king", name: "负债累累", desc: "债务超过10万", condition: function(s) { return s.debt >= 100000; } },
  { id: "tool_master", name: "反诈达人", desc: "收集5个以上反诈工具", condition: function(s) { return s.tools.length >= 5; } },
  { id: "clean_run", name: "金身不破", desc: "走到60岁未被骗过", condition: function(s) { return s.age >= 60 && s.scamVictimCount === 0; } },
  { id: "awareness_max", name: "火眼金睛", desc: "识骗能力达到20", condition: function(s) { return s.awareness >= 20; } },
  { id: "ten_encounters", name: "久经沙场", desc: "遭遇10次诈骗", condition: function(s) { return s.scamEncountered >= 10; } },

  // Life-related
  { id: "survivor", name: "幸存者", desc: "走到80岁", condition: function(s) { return s.age >= 80; } },
  { id: "family_shield", name: "家人是盾", desc: "家庭支持达到满值", condition: function(s) { return s.familyTrust >= 20; } },
  { id: "greed_zero", name: "心如止水", desc: "贪念降到0", condition: function(s) { return s.greed <= 0; } },
  { id: "married_life", name: "执子之手", desc: "成功结婚", condition: function(s) { return s.lifeFlags && s.lifeFlags.married; } },
  { id: "full_family", name: "人生赢家", desc: "有房有车有家庭", condition: function(s) { return s.lifeFlags && s.lifeFlags.married && s.lifeFlags.has_house && s.lifeFlags.has_car && s.lifeFlags.has_child; } },
  { id: "rich", name: "小有积蓄", desc: "资产超过20万", condition: function(s) { return s.money >= 200000; } },
  { id: "social_butterfly", name: "社交达人", desc: "社会经验达到18以上", condition: function(s) { return s.socialExp >= 18; } },
  { id: "lonely_heart", name: "孤独患者", desc: "孤独感达到18以上", condition: function(s) { return s.loneliness >= 18; } },
  { id: "workaholic", name: "工作狂", desc: "连续3次选择工作/努力工作", condition: function(s) { return s.consecutiveActionCount >= 3 && (s.lastAction === 'work_hard' || s.lastAction === 'work'); } },
  { id: "zen_master", name: "佛系人生", desc: "心态达到20", condition: function(s) { return s.mental >= 20; } },
  { id: "divorce_survivor", name: "重新开始", desc: "经历离婚", condition: function(s) { return s.lifeFlags && s.lifeFlags.divorced; } },
  { id: "pet_lover", name: "铲屎官", desc: "养了宠物", condition: function(s) { return s.lifeFlags && s.lifeFlags.has_pet; } }
];
