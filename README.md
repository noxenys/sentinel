# 🛡️ Sentinel - 网站监控与告警系统 / Website Monitoring & Alert System

<div align="center">
  
[English Version](README_en.md) | [中文版本](README_zh.md)

</div>

## 目录 / Table of Contents

- [✨ 核心特性 / Core Features](#features)
- [🚀 快速开始 / Quick Start](#quick-start)
- [🖼 界面预览 / UI Preview](#ui-preview)
- [📖 文档 / Documentation](#docs)
- [🔧 技术栈 / Technical Stack](#tech-stack)
- [🤝 贡献 / Contributing](#contributing)
- [📄 许可证 / License](#license)

<a id="features"></a>

## ✨ 核心特性 / Core Features

- **多平台告警** / **Multi-platform Alerts**: 支持 Telegram、Discord、Webhook 等多种通知方式 / Support for Telegram, Discord, Webhook and other notification methods
- **告警限流** / **Alert Throttling**: 智能防骚扰，1小时冷却时间避免重复通知 / Intelligent anti-spam with 1-hour cooling period to avoid duplicate notifications
- **实时延迟监控** / **Real-time Latency Monitoring**: 动态显示网站响应时间，带更新动画效果 / Dynamic display of website response times with update animations
- **就地编辑** / **In-place Editing**: 直接在列表中编辑监控项，无需弹窗 / Directly edit monitor items in the list without popups
- **智能分类与手风琴UI** / **Smart Categorization & Accordion UI**: 支持自定义分组，可折叠展开 / Support for custom grouping with collapsible sections
- **安全认证** / **Secure Authentication**: 现代化密码验证系统，支持本地和会话存储，完全退出后清除所有认证信息 / Modern password authentication system with local and session storage support, clears all authentication info after complete logout
- **现代化模态框** / **Modern Custom Modals**: 统一的登录与退出界面，优雅的交互体验 / Unified login and logout interface with elegant interaction experience
- **双语界面与本地时钟** / **Bilingual UI & Local Clock**: 中英文双语支持，实时本地时间显示 / Chinese-English bilingual support with real-time local time display
- **响应式设计** / **Responsive Design**: 完美适配桌面和移动设备，优化触屏体验 / Fully optimized for desktop and mobile devices with enhanced touch experience
- **智能状态分类** / **Smart Status Categorization**: 自动将异常服务置顶，分类标题动态显示统计信息 / Automatically prioritize failed services, category headers display dynamic statistics
- **状态码解释** / **Status Code Explanation**: 详细的HTTP状态码解释，帮助快速诊断问题 / Detailed HTTP status code explanations for quick problem diagnosis
- **批量操作** / **Batch Operations**: 支持批量添加监控项，配置导出功能 / Support for batch adding monitors and configuration export

- **一键部署** / **One-click Deployment**: 基于 Cloudflare Workers，快速上线 / Based on Cloudflare Workers, quick deployment

## 🤔 为什么选择 Sentinel / Why Sentinel

- 专为个人站点、小型服务和 Side Project 设计，部署门槛极低
- 完全依赖 Cloudflare Workers 与 KV，无需自建服务器和数据库
- 集「实时监控 + 图形化控制台 + 多平台告警」于一体，开箱即用

<a id="quick-start"></a>

## 🚀 快速开始 / Quick Start

### 在线演示 / Live Demo
- **🌐 演示站点**: [点击查看演示](https://sentinel-demo.noxen.qzz.io/) / [View Demo](https://sentinel-demo.noxen.qzz.io/)
- **密码 / Password**: 在环境变量 `PASSWORD` 中配置（无内置默认值） / Set via `PASSWORD` env var (no built-in default)

<a id="ui-preview"></a>

## 🖼 界面预览 / UI Preview

Sentinel 提供暗色科技风的仪表盘界面，包含：
- 顶部实时统计卡片：总监控数、在线数、异常数一目了然
- 分组折叠列表：按 Cloudflare / Hugging Face / Zeabur 等分组展示监控项
- 管理面板：底部一键展开，支持批量添加、导出配置和就地编辑

![Sentinel Dashboard](./assets/dashboard-main.png)
![Sentinel Admin Panel](./assets/dashboard-admin.png)

访问在线演示可以看到完整界面效果。  
Visit the live demo above to see the full dashboard UI.

### 前置要求 / Prerequisites
- Cloudflare 账户 / Cloudflare account
- 基本的 Cloudflare Workers 知识 / Basic knowledge of Cloudflare Workers

### 快速部署 / Quick Deployment

#### 🚀 一键部署 (推荐) / One-click Deployment (Recommended)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/noxenys/sentinel)

**一键部署流程**:
1. **点击上方按钮** → 登录您的 Cloudflare 账户
2. **授权 GitHub/GitLab 访问** → 系统会自动创建代码仓库
3. **自动配置资源** → Cloudflare 会自动创建 KV 存储空间并绑定到 Worker
4. **设置环境变量** → 在部署界面配置密码和通知设置
5. **完成部署** → 系统自动构建并部署到全球网络

> 💡 **优势**: 自动配置所有必需资源，无需手动操作，支持持续集成部署

#### ⚙️ 手动部署 / Manual Deployment

**步骤 1: 创建 Worker 和 KV 存储**
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Worker**
3. 将 `worker.js` 代码复制到编辑器中
4. 创建 KV 命名空间: **Workers** → **KV** → **Create Namespace**
   - 名称: `SENTINEL_KV`
   - 描述: Sentinel Monitoring Data Storage

**步骤 2: 绑定 KV 存储到 Worker**
1. 在 Worker 设置中进入 **Settings** → **Variables**
2. 在 **KV Namespace Bindings** 部分点击 **Add binding**
3. 配置绑定:
   - Variable name: `SENTINEL_KV` (必须精确匹配)
   - KV namespace: 选择刚才创建的 `SENTINEL_KV`

**步骤 3: 设置环境变量**
在 Worker 的 **Settings** → **Variables** → **Environment Variables** 中添加:

| 变量名 | 描述 | 必需 | 默认值 |
|--------|------|------|--------|
| `PASSWORD` | 管理面板密码 | ✅ | *(required, no default)* |
| `TELEGRAM_TOKEN` | Telegram 机器人令牌 | ❌ | - |
| `CHAT_ID` | Telegram 聊天ID | ❌ | - |
| `DISCORD_WEBHOOK` | Discord Webhook URL | ❌ | - |
| `GENERIC_WEBHOOK` | 通用 Webhook URL | ❌ | - |

> 🔒 **安全提示 / Security Note**  
> Sentinel 无内置默认密码。请在首次登录前为 `PASSWORD` 设置强随机值。 / Sentinel has no built-in default password. Set a strong random value for `PASSWORD` before first login.

4. **配置定时任务** / **Configure Cron Trigger**: 推荐 `*/10 * * * *` (每10分钟 / Every 10 mins)
> ⚠️ 免费版请注意请求额度，详情见文档 / Note free tier limits, see docs for details.

**步骤 5: 部署和测试**
1. 点击 **Save and Deploy**
2. 访问您的 Worker URL 测试功能
3. 使用 `PASSWORD` 配置值登录 / Log in with your configured `PASSWORD` value

<a id="docs"></a>

## 📖 文档 / Documentation

选择你偏好的语言查看详细文档 / Choose your preferred language for detailed documentation:

- **[中文文档](README_zh.md)** - 完整中文版本，包含详细使用说明 / Complete Chinese version with detailed instructions
- **[English Documentation](README_en.md)** - 完整英文版本，包含详细说明 / Complete English version with detailed instructions

<a id="tech-stack"></a>

## 🔧 技术栈 / Technical Stack

- **前端** / **Frontend**: 
  - HTML5 + CSS3 + JavaScript ES6+
  - 现代化UI组件，包含毛玻璃效果和动画
  - 响应式设计，支持桌面和移动设备
  - 实时时钟和动态数据更新

- **后端** / **Backend**: 
  - Cloudflare Workers 作为无服务器运行环境
  - KV 存储用于持久化数据
  - 定时任务用于周期性检查
  - RESTful API 设计

- **安全** / **Security**: 
  - 密码验证系统，支持本地和会话存储
  - API端点保护，使用X-Password头认证
  - 完全退出后清除所有认证信息

- **功能** / **Features**: 
  - 实时监控与延迟测量
  - 多平台告警（Telegram、Discord、Webhook）
  - 智能状态分类
  - 批量操作与配置导出
  - 状态码解释与错误诊断

### 代码结构 / Code Structure
```
sentinel/
├── worker.js          # 主程序文件 / Main program file
├── README.md          # 项目主文档 / Main project documentation
├── README_zh.md       # 中文文档 / Chinese documentation
├── README_en.md       # 英文文档 / English documentation
├── wrangler.toml      # Cloudflare Workers 配置 / Cloudflare Workers configuration
├── package.json       # 项目依赖配置 / Project dependencies configuration
├── LICENSE           # 许可证文件 / License file
├── CONTRIBUTING.md   # 贡献指南 / Contributing guide
└── .gitignore        # Git 忽略文件 / Git ignore file
```

<a id="contributing"></a>

## 🤝 贡献 / Contributing

欢迎贡献！ / We welcome contributions！

- **[中文贡献指南](README_zh.md#贡献指南)** / Chinese Contributing Guide
- **[English Contributing Guide](README_en.md#contributing)** / English Contributing Guide

<a id="license"></a>

## 📄 许可证 / License

本项目采用 MIT 许可证 / This project is licensed under the MIT License

---

<div align="center">

**🚀 由 Noxen YS 维护**  
**🚀 Maintained by Noxen YS**

*项目开始: 2026年1月7日*  
*项目最后更新: 2026年1月15日*  
*Project Started: January 7, 2026*  
*Last Updated: January 15, 2026*

**版本: v3.8**  
**Version: v3.8**

</div>
