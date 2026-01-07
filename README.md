# Sentinel

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)
![Telegram](https://img.shields.io/badge/Telegram-Notifications-blue?style=for-the-badge&logo=telegram)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Sentinel** 是一个基于 Cloudflare Workers 构建的生产级、智能分类网站在线状态监控系统。它不仅轻量、高性能，还提供了直观的管理界面和丰富的告警功能。

> **Sentinel** is a production-grade, intelligently categorized website uptime monitoring system built on Cloudflare Workers. It's lightweight, high-performance, and offers an intuitive management interface with rich alerting capabilities.

## ✨ 特性 / Features

- 🚀 **极简审美 / Clean & Minimalist UI**: 采用现代化的深色模式 UI，信息展示清晰直观。
- 🎨 **现代化模态框 / Modern Custom Modals**: 告别原生弹窗，删除操作采用与 UI 风格统一的磨砂玻璃质感模态框，交互更优雅。
- ⚡ **高频实时动感监控 / High-Frequency Dynamic Monitoring**: 响应时间每 3-5 秒高频更新，伴随视觉闪烁，增强实时感。
- 🔔 **多平台告警 / Multi-Platform Alerts**: 支持 Telegram、Discord 和通用 Webhook (飞书/钉钉) 等多渠道告警，确保通知无遗漏。
- ⏰ **实时时钟 / Real-time Clock**: Dashboard 顶部显示本地时区实时时间，增强监控感。
- 📊 **实时状态与延迟 / Real-time Status & Latency**: 实时显示网站在线状态和响应延迟（毫秒）。
- 📈 **历史状态条 / Uptime History Bar**: 每个监控项下方展示最近 12 次检测的历史状态。
- 📂 **智能分类与折叠 / Smart Categorization & Accordion**: 支持自定义分类，并通过折叠面板管理大量监控项。
- 🛡️ **告警冷却与阈值 / Alert Throttling**: 防止告警轰炸，智能判断连续失败后才发送通知。
- 🔔 **多平台通知 / Multi-Platform Notifications**: 默认支持 Telegram，易于扩展到 Discord 等平台。
- 💾 **配置一键导出 / One-Click Config Export**: 轻松备份所有监控配置。
- 🔒 **安全管理面板 / Secure Admin Panel**: 通过密码保护管理操作，支持登录持久化。
- 📋 **一键复制 URL / One-Click Copy URL**: 方便快捷地复制监控链接。
- ✅ **删除确认 / Delete Confirmation**: 防止误操作，删除前进行二次确认。
- 🌐 **全球分布式监控 / Globally Distributed Monitoring**: 利用 Cloudflare Workers 的优势，实现全球范围内的快速检测。

## 🚀 快速部署 / Quick Deployment

1.  **创建 Worker / Create a Worker**: 在 Cloudflare Dashboard 创建一个新的 Worker，并将本项目中的 `worker.js` 代码复制进去。
2.  **绑定 KV / Bind KV Namespace**: 创建一个名为 `SENTINEL_KV` 的 KV Namespace，并将其绑定到您的 Worker。在 Worker 设置中，**Variable name (变量名)** 必须设置为 `SENTINEL_KV`。
3.  **设置环境变量 / Set Environment Variables**:
    *   `PASSWORD`: 管理面板的操作密码（默认 `123456`）。
    *   `TELEGRAM_TOKEN`: Telegram Bot Token (从 @BotFather 获取)。
    *   `CHAT_ID`: 接收通知的 Telegram Chat ID。
    *   `DISCORD_WEBHOOK`: (可选) Discord Webhook URL。
    *   `GENERIC_WEBHOOK`: (可选) 通用 Webhook URL (支持飞书、钉钉等)。
4.  **添加定时触发器 / Add a Cron Trigger**: 在 Worker 的 **Triggers** 选项卡中，添加一个新的 Cron Trigger。建议设置为每 30 分钟运行一次，Cron 表达式为 `*/30 * * * *`。

## 📝 使用指南 / Usage Guide

### 登录 / Login
访问您的 Worker URL。首次操作管理面板时会提示输入密码，密码会保存在浏览器本地存储，无需重复输入，除非您手动退出登录。

### 添加监控 / Add Monitors
在管理面板中：
1.  在 **“分类名称 / Group Name”** 输入框中填写您想创建的分类名称（例如：`生产环境`）。如果留空，则默认为 `默认分类`。
2.  在下方的文本框中，每行输入一个您要监控的 URL (例如：`https://example.com`)。
3.  点击 **“批量添加 / Add”** 按钮。

### 管理监控 / Manage Monitors
-   **删除 / Delete**: 点击每个监控项旁边的“删除”按钮，会弹出确认框。
-   **复制 / Copy**: 点击复制图标可将 URL 复制到剪贴板。
-   **折叠 / Collapse**: 点击分类标题可展开或收起该分类下的所有监控项。

### 导出配置 / Export Configuration
点击管理面板中的 **“导出 / Export”** 按钮，即可将所有监控 URL 导出为 JSON 文件。

### 退出登录 / Logout
点击 **“退出 / Logout”** 按钮，会清除本地密码并刷新页面，管理面板将重新锁定。

## 🤝 贡献 / Contributing

欢迎提交 Pull Request 或提出 Issue 来改进 Sentinel。您的贡献将使这个项目变得更好！

## 📄 许可证 / License

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

---

**Powered by Noxen YS & Manus AI**
