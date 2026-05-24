# 防骗模拟器

在线地址：https://7zv8hg2hmh-source.github.io/shangdang/

一个人生资产防守型文字模拟器。从 7 岁走到 80 岁，在不同年龄、关系、欲望和生活场景中遭遇各种诈骗风险、生活开销、债务利息、医疗支出和随机意外。你的每一次选择都会影响资产、识骗能力、幸福感、健康、信任、心理状态等核心属性。游戏最终根据一生数据生成「人生防骗报告」。

## 运行方式

直接在浏览器中打开 `index.html` 即可运行，无需安装任何依赖。

```
open index.html
```

或使用本地服务器：
```
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署。推送到 `main` 分支后，工作流会发布静态站点到 GitHub Pages。

仓库首次使用时，需要在 GitHub 仓库设置里开启 Pages：

1. 进入 `Settings` → `Pages`
2. `Build and deployment` 的 `Source` 选择 `GitHub Actions`
3. 保存后等待 `Deploy static site to GitHub Pages` 工作流完成

## 在线人数统计

项目使用 Supabase RPC 统计在线人数、今日游玩人数和总游玩人数。

1. 在 Supabase SQL Editor 执行 `supabase/migrations/001_game_analytics.sql`
2. 在 `js/systems/analyticsSystem.js` 中填入 Supabase `anon public key`
3. 推送到 `main` 后 GitHub Pages 会自动重新部署

注意：不要把 Postgres 直连密码写进前端或提交到仓库。

## 游戏特色

- **8 个人生阶段**：家庭启蒙期 → 儿童期 → 中学期 → 大学期 → 初入社会期 → 家庭事业期 → 中年资产期 → 养老期
- **500+ 生活/意外/条件事件**：不是知识问答，而是具体生活情境中的选择
- **多种诈骗类型**：覆盖刷单返利、杀猪盘、冒充公检法、AI 换脸等常见骗术
- **5 条连环诈骗链**：多步骤递进，每一步都可以识破/中断/继续深陷
- **12 种人生结局**：从"真正走到对岸"到"信任破产"，每种结局都有人生况味
- **10 个反诈工具**：国家反诈中心 APP、96110 预警、冷静 24 小时等可解锁 Buff
- **14 个成就**：记录你的防骗人生
- **存档系统**：基于 localStorage，支持存档、读档、重开

## 核心属性

| 属性 | 说明 |
|------|------|
| 💰 资产 | 当前可用资金 |
| 🔴 债务 | 负债金额 |
| 🌞 幸福感 | 生活满意度与精神状态 (0-20) |
| ❤️ 健康 | 身体状态 (0-20) |
| 🧠 识骗力 | 识别骗局的能力 (0-20) |
| 📱 数字素养 | 数字安全意识 (0-20) |
| 🤝 信任 | 对外界的基本信任 (0-20) |
| 👨‍👩‍👧 家庭支持 | 家人的支持与沟通 (0-20) |
| 💪 心态 | 心理韧性 (0-20) |
| 🌙 孤独感 | 孤独程度 (0-20) |
| 🎰 贪念 | 侥幸和贪婪倾向 (0-20) |
| ⚠️ 风险暴露 | 信息泄露和风险累积 (0-20) |

## 技术架构

- 纯前端：原生 HTML + CSS + JavaScript
- 无框架依赖，无构建工具，无后端
- 模块化文件组织
- localStorage 本地存档
- 响应式设计，支持移动端

## 目录结构

```
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js
    ├── core/
    │   ├── state.js          # 游戏状态
    │   ├── gameLoop.js       # 回合推进
    │   ├── attributes.js     # 属性系统
    │   └── storage.js        # 存档读档
    ├── config/
    │   ├── lifeStages.js     # 人生阶段
    │   ├── fraudEvents.js    # 诈骗事件库 (80+)
    │   ├── fraudChains.js    # 连环诈骗链 (5条)
    │   ├── endings.js        # 结局库 (12个)
    │   ├── tools.js          # 反诈工具
    │   └── achievements.js   # 成就系统
    ├── systems/
    │   ├── eventSystem.js    # 事件抽取与处理
    │   ├── fraudChainSystem.js
    │   ├── moneySystem.js    # 收入/支出/债务
    │   ├── toolSystem.js     # 工具解锁
    │   ├── endingSystem.js   # 结局判定
    │   ├── reportSystem.js   # 防骗报告
    │   └── achievementSystem.js
    └── ui/
        └── render.js         # UI 渲染
```

## 安全与伦理声明

- 所有诈骗内容以**防范、识别、止损**为导向
- 不包含可执行诈骗教程或可供诈骗者复用的话术模板
- 仅呈现受害者视角的风险信号和识别点
- 适用于校园反诈教育场景
