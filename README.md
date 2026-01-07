# 🛡️ Sentinel - 网站监控与告警系统

<div align="center">
  
[English](README_en.md) | [中文](README_zh.md)

</div>

## ✨ 核心特性

- **实时监控**: 高频检测网站可用性和响应时间
- **多平台告警**: 支持 Telegram、Discord、飞书、钉钉等
- **优雅界面**: 现代化设计，响应式布局
- **告警限流**: 智能防骚扰，避免重复通知
- **历史记录**: 完整的上线时间统计和延迟跟踪
- **一键部署**: 基于 Cloudflare Workers，快速上线

## 🚀 快速开始

### 前置要求
- Cloudflare 账户
- 基本的 Cloudflare Workers 知识

### 快速部署
1. **创建 Worker** 在 Cloudflare 控制台
2. **配置 KV 存储**，命名空间为 `SENTINEL_KV`
3. **设置环境变量**（详见详细指南）
4. **配置定时任务**: `*/30 * * * *`

## 📖 文档

选择你偏好的语言：

- **[English Documentation](README_en.md)** - 完整英文版本，包含详细说明
- **[中文文档](README_zh.md)** - 完整中文版本，包含详细使用说明

## 🔧 技术栈

- **前端**: HTML5、CSS3、JavaScript ES6+
- **后端**: Cloudflare Workers、KV 存储
- **功能**: 实时监控、多平台告警、响应式设计

## 🤝 贡献

欢迎贡献！请阅读我们的[贡献指南](README_zh.md#贡献指南)了解详情。

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

<div align="center">

**🚀 由 Noxen YS & Manus AI 强力驱动**

*最后更新: 2026年1月*

</div>