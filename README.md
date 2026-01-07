# Sentinel - 智能在线监控系统

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)
![Telegram](https://img.shields.io/badge/Telegram-Notifications-blue?style=for-the-badge&logo=telegram)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-v3.6-important?style=for-the-badge)

> **Sentinel** 是一个基于 Cloudflare Workers 构建的生产级、智能分类网站在线状态监控系统。它不仅轻量、高性能，还提供了直观的管理界面和丰富的告警功能。

> **Sentinel** is a production-grade, intelligently categorized website uptime monitoring system built on Cloudflare Workers. It's lightweight, high-performance, and offers an intuitive management interface with rich alerting capabilities.

## 🌟 核心特性 / Core Features

### 🎨 现代化界面 / Modern Interface
- **极简深色主题 / Clean Dark Theme**: 采用现代化的深色模式 UI，信息展示清晰直观
- **灵动动画效果 / Dynamic Animations**: 统计数字带有优雅的跳动动画，增强视觉体验
- **响应式设计 / Responsive Design**: 完美适配各种屏幕尺寸

### ⚡ 实时监控 / Real-time Monitoring
- **高频检测 / High-Frequency Checks**: 每 3-5 秒更新一次响应时间，实时性强
- **动态延迟显示 / Dynamic Latency Display**: 延迟数字更新时带有视觉闪烁效果
- **实时状态统计 / Real-time Status Statistics**: 在线/异常数量实时计算，状态稳定

### 🔔 智能告警 / Smart Alerting
- **多平台支持 / Multi-Platform Support**: Telegram、Discord、Webhook（飞书/钉钉）
- **告警冷却机制 / Alert Throttling**: 防止告警轰炸，1小时冷却时间
- **智能状态判断 / Smart Status Detection**: 连续失败才发送通知

### 📊 数据可视化 / Data Visualization
- **历史状态条 / Uptime History Bar**: 每个监控项显示最近12次检测历史
- **智能分类管理 / Smart Categorization**: 支持自定义分类，折叠面板管理
- **在线率统计 / Uptime Statistics**: 直观展示整体监控状态

### 🔧 管理功能 / Management Features
- **在线编辑 / In-place Editing**: 直接在列表中编辑监控项
- **批量操作 / Batch Operations**: 支持批量添加、删除监控项
- **配置导出 / Configuration Export**: 一键导出所有监控配置
- **安全管理 / Secure Management**: 密码保护，登录持久化

## 🚀 快速开始 / Quick Start

### 1. 环境准备 / Environment Setup
```bash
# 确保已安装 Node.js 和 npm
node --version
npm --version
```

### 2. Cloudflare Workers 部署 / Deployment to Cloudflare Workers

#### 步骤 1: 创建 Worker
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Worker**
3. 将 `worker.js` 代码复制到编辑器中

#### 步骤 2: 配置 KV 存储
1. 在 Worker 设置中创建 KV Namespace
2. 命名空间名称: `SENTINEL_KV`
3. 绑定到 Worker，变量名必须为 `SENTINEL_KV`

#### 步骤 3: 设置环境变量

| 变量名 / Variable | 描述 / Description | 必需 / Required | 默认值 / Default |
|------------------|-------------------|----------------|------------------|
| `PASSWORD` | 管理面板的操作密码 | ✅ | `123456` |
| `TELEGRAM_TOKEN` | Telegram Bot Token（从 @BotFather 获取） | ❌ | - |
| `CHAT_ID` | 接收通知的 Telegram Chat ID | ❌ | - |
| `DISCORD_WEBHOOK` | Discord Webhook URL | ❌ | - |
| `GENERIC_WEBHOOK` | 通用 Webhook URL（支持飞书、钉钉等） | ❌ | - |

#### 步骤 4: 配置定时任务
- 在 Worker 的 **Triggers** 选项卡中
- 添加 Cron Trigger: `*/30 * * * *` (每30分钟)

## 📖 详细使用指南 / Detailed Usage Guide

### 🔐 登录系统 / System Login
首次访问 Worker URL 时，系统会提示输入管理密码。密码将保存在浏览器本地存储中，支持登录持久化。

### ➕ 添加监控项 / Adding Monitors
1. **单个添加 / Single Addition**:
   - 在管理面板输入分类名称和 URL
   - 点击"批量添加"按钮

2. **批量添加 / Batch Addition**:
   - 在文本框中每行输入一个 URL
   - 支持格式: `分类名称:https://example.com`
   - 或直接输入 URL（默认分类）

### ✏️ 编辑监控项 / Editing Monitors
- 点击监控项右侧的编辑图标
- 直接在列表中修改分类和 URL
- 支持实时保存

### 🗑️ 删除监控项 / Deleting Monitors
- 点击删除按钮
- 弹出确认模态框，防止误操作
- 支持二次确认

### 📋 其他操作 / Other Operations
- **复制 URL**: 点击复制图标快速复制链接
- **导出配置**: 一键导出所有监控配置为 JSON 文件
- **分类管理**: 点击分类标题展开/收起监控项

## ⚙️ 配置说明 / Configuration Details

### 环境变量 / Environment Variables

环境变量已在部署步骤中详细说明，请参考 **步骤 3: 设置环境变量**。

### 通知配置 / Notification Configuration

#### Telegram 通知
1. 通过 [@BotFather](https://t.me/BotFather) 创建机器人
2. 获取 Bot Token
3. 获取 Chat ID（可通过 @userinfobot 获取）

#### Discord 通知
1. 在 Discord 服务器创建 Webhook
2. 复制 Webhook URL
3. 设置到 `DISCORD_WEBHOOK` 变量

## 🏗️ 技术架构 / Technical Architecture

### 前端技术栈 / Frontend Stack
- **HTML5**: 语义化标记，现代化结构
- **CSS3**: 渐变背景，磨砂玻璃效果，动画过渡
- **JavaScript ES6+**: 模块化代码，异步处理
- **响应式设计**: 移动端友好

### 后端技术栈 / Backend Stack
- **Cloudflare Workers**: 边缘计算，全球分布式
- **KV 存储**: 持久化数据存储
- **RESTful API**: 清晰的接口设计
- **Cron 触发器**: 定时任务执行

### 监控算法 / Monitoring Algorithm
```javascript
// 高频检测逻辑
setInterval(async () => {
    const latency = await checkUrl(url);
    updateStatus(latency);
    updateGlobalStats();
}, 3000 + Math.random() * 2000);
```

## 🔧 开发指南 / Development Guide

### 本地开发 / Local Development
```bash
# 克隆项目
git clone <repository-url>
cd sentinel

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 代码结构 / Code Structure
```
sentinel/
├── worker.js          # 主程序文件
├── README.md          # 项目文档
└── package.json       # 项目配置
```

### API 接口 / API Endpoints

| 端点 / Endpoint | 方法 / Method | 描述 / Description |
|----------------|---------------|-------------------|
| `/api/data` | GET | 获取监控数据和历史记录 |
| `/api/urls` | POST | 添加/更新监控 URL |
| `/api/urls` | DELETE | 删除监控 URL |
| `/api/check` | GET | 检查单个 URL 状态 |

## 🐛 故障排除 / Troubleshooting

### 常见问题 / Common Issues

**Q: 监控项状态频繁切换？**
A: 这是正常的高频检测效果，统计数字会保持稳定。

**Q: 通知没有发送？**
A: 检查环境变量配置和网络连接。

**Q: KV 存储无法访问？**
A: 确认 KV Namespace 已正确绑定。

**Q: 密码验证失败？**
A: 清除浏览器缓存或重新设置密码。

### 性能优化 / Performance Optimization
- 合理设置检测频率
- 使用分类管理大量监控项
- 定期清理历史数据

## 🤝 贡献指南 / Contributing Guide

我们欢迎各种形式的贡献！请参考以下指南：

### 报告问题 / Reporting Issues
- 使用清晰的标题描述问题
- 提供复现步骤和环境信息
- 附上相关日志或截图

### 提交代码 / Submitting Code
1. Fork 项目仓库
2. 创建功能分支
3. 提交清晰的 commit 信息
4. 创建 Pull Request

### 代码规范 / Code Standards
- 遵循 JavaScript 最佳实践
- 保持代码注释清晰
- 确保双文文档完整

## 📄 许可证 / License

本项目采用 **MIT 许可证** - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢 / Acknowledgments

- **Cloudflare Workers**: 提供强大的边缘计算平台
- **Telegram API**: 即时通知服务支持
- **开源社区**: 感谢所有贡献者和用户

## 📞 联系方式 / Contact

- **项目主页**: [GitHub Repository](https://github.com/your-username/sentinel)
- **问题反馈**: [Issues Page](https://github.com/your-username/sentinel/issues)
- **讨论交流**: [Discussions](https://github.com/your-username/sentinel/discussions)

---

**🚀 由 Noxen YS & Manus AI 强力驱动**  
**🚀 Powered by Noxen YS & Manus AI**

---

*最后更新: 2026年1月*  
*Last Updated: January 2026*