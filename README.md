# 🛡️ Sentinel - 网站监控与告警系统 / Website Monitoring & Alert System

<div align="center">
  
[English Version](README_en.md) | [中文版本](README_zh.md)

</div>

## ✨ 核心特性 / Core Features

- **多平台告警** / **Multi-platform Alerts**: 支持 Telegram、Discord、Webhook 等多种通知方式 / Support for Telegram, Discord, Webhook and other notification methods
- **告警限流** / **Alert Throttling**: 智能防骚扰，1小时冷却时间避免重复通知 / Intelligent anti-spam with 1-hour cooling period to avoid duplicate notifications
- **历史记录** / **Historical Records**: 50条记录的在线状态条形图，实时延迟跟踪 / 50-record online status bar chart with real-time latency tracking
- **实时延迟监控** / **Real-time Latency Monitoring**: 动态显示网站响应时间，带更新动画效果 / Dynamic display of website response times with update animations
- **就地编辑** / **In-place Editing**: 直接在列表中编辑监控项，无需弹窗 / Directly edit monitor items in the list without popups
- **智能分类与手风琴UI** / **Smart Categorization & Accordion UI**: 支持自定义分组，可折叠展开 / Support for custom grouping with collapsible sections
- **安全认证** / **Secure Authentication**: 现代化密码验证系统，支持本地和会话存储，完全退出后清除所有认证信息 / Modern password authentication system with local and session storage support, clears all authentication info after complete logout
- **现代化模态框** / **Modern Custom Modals**: 统一的登录与退出界面，优雅的交互体验 / Unified login and logout interface with elegant interaction experience
- **双语界面与本地时钟** / **Bilingual UI & Local Clock**: 中英文双语支持，实时本地时间显示 / Chinese-English bilingual support with real-time local time display
- **一键部署** / **One-click Deployment**: 基于 Cloudflare Workers，快速上线 / Based on Cloudflare Workers, quick deployment

## 🚀 快速开始 / Quick Start

### 在线演示 / Live Demo
- **🌐 演示站点**: [点击查看演示](https://sentinel-demo.noxen.qzz.io/) / [View Demo](https://sentinel-demo.noxen.qzz.io/)
- **默认密码**: `123456` / **Default Password**: `123456`

### 前置要求 / Prerequisites
- Cloudflare 账户 / Cloudflare account
- 基本的 Cloudflare Workers 知识 / Basic knowledge of Cloudflare Workers

### 快速部署 / Quick Deployment

#### 一键部署 / One-click Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/sentinel)

#### 手动部署 / Manual Deployment
1. **创建 Worker** 在 Cloudflare 控制台 / **Create Worker** in Cloudflare Dashboard
2. **配置 KV 存储**，命名空间为 `SENTINEL_KV` / **Configure KV Storage** with namespace `SENTINEL_KV`
3. **设置环境变量**（详见详细指南） / **Set Environment Variables** (see detailed guide)
4. **配置定时任务**: `*/30 * * * *` / **Configure Cron Trigger**: `*/30 * * * *`

## 📖 文档 / Documentation

选择你偏好的语言查看详细文档 / Choose your preferred language for detailed documentation:

- **[中文文档](README_zh.md)** - 完整中文版本，包含详细使用说明 / Complete Chinese version with detailed instructions
- **[English Documentation](README_en.md)** - 完整英文版本，包含详细说明 / Complete English version with detailed instructions

## 🔧 技术栈 / Technical Stack

- **前端** / **Frontend**: HTML5、CSS3、JavaScript ES6+、现代化UI组件 / HTML5, CSS3, JavaScript ES6+, Modern UI components
- **后端** / **Backend**: Cloudflare Workers、KV 存储 / Cloudflare Workers, KV Storage
- **安全** / **Security**: 密码验证系统、API端点保护 / Password authentication system, API endpoint protection
- **功能** / **Features**: 实时监控、多平台告警、响应式设计、优雅登录界面 / Real-time monitoring, Multi-platform alerts, Responsive design, Elegant login interface

## 🤝 贡献 / Contributing

欢迎贡献！ / We welcome contributions！

- **[中文贡献指南](README_zh.md#贡献指南)** / Chinese Contributing Guide
- **[English Contributing Guide](README_en.md#contributing)** / English Contributing Guide

## 📄 许可证 / License

本项目采用 MIT 许可证 / This project is licensed under the MIT License

---

<div align="center">

**🚀 由 Noxen YS 维护**  
**🚀 Maintained by Noxen YS**

*最后更新: 2026年1月*  
*Last Updated: January 2026*

</div>