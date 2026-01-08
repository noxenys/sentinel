# 🛡️ Sentinel - 网站监控与告警系统

Sentinel v3.6 就地编辑版是一个基于 Cloudflare Workers 构建的现代化网站监控系统，提供实时状态监控、多平台告警、就地编辑功能和优雅的用户界面。

## ✨ 核心特性

- **多平台告警**: 支持 Telegram、Discord、Webhook 等多种通知方式
- **告警限流**: 智能防骚扰，1小时冷却时间避免重复通知
- **历史记录**: 50条记录的在线状态条形图，实时延迟跟踪
- **实时延迟监控**: 动态显示网站响应时间，带更新动画效果
- **就地编辑**: 直接在列表中编辑监控项，无需弹窗
- **智能分类与手风琴UI**: 支持自定义分组，可折叠展开
- **安全认证**: 现代化密码验证系统，支持本地和会话存储，完全退出后清除所有认证信息
- **现代化模态框**: 统一的登录与退出界面，优雅的交互体验
- **双语界面与本地时钟**: 中英文双语支持，实时本地时间显示

## 🚀 快速开始

### 在线演示
- **🌐 演示站点**: [点击查看演示](https://sentinel-demo.noxen.qzz.io/)
- **默认密码**: `123456`

## 🚀 快速部署

### 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/sentinel)

### 手动部署

#### 步骤 1: 创建 Worker
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Worker**
3. 将 `worker.js` 代码复制到编辑器中

### 步骤 2: 配置 KV 存储
1. 在 Worker 设置中创建 KV Namespace
2. 命名空间名称: `SENTINEL_KV`
3. 绑定到 Worker，变量名必须为 `SENTINEL_KV`

### 步骤 3: 设置环境变量

| 变量名 | 描述 | 必需 | 默认值 |
|--------|------|------|--------|
| `PASSWORD` | 管理面板的操作密码 | ✅ | `123456` |
| `TELEGRAM_TOKEN` | Telegram Bot Token（从 @BotFather 获取） | ❌ | - |
| `CHAT_ID` | 接收通知的 Telegram Chat ID | ❌ | - |
| `DISCORD_WEBHOOK` | Discord Webhook URL | ❌ | - |
| `GENERIC_WEBHOOK` | 通用 Webhook URL（支持飞书、钉钉等） | ❌ | - |

### 步骤 4: 配置定时任务
- 在 Worker 的 **Triggers** 选项卡中
- 添加 Cron Trigger: `*/30 * * * *` (每30分钟)

## 📖 详细使用指南

### 🔐 登录与退出系统
- **登录界面**: 首次访问 Worker URL 时，系统会显示现代化登录模态框，提示输入管理密码。支持密码记忆功能，可选择保存到本地存储或会话存储。
- **退出界面**: 点击退出按钮时，显示与登录界面风格一致的现代化模态框，提供清晰的确认选项和操作说明，确保用户不会误操作。退出后清除所有存储的认证信息。

### ➕ 添加监控项
1. **单个添加**:
   - 在管理面板输入分类名称和 URL
   - 点击"批量添加"按钮

2. **批量添加**:
   - 在文本框中每行输入一个 URL
   - 支持格式: `分类名称:https://example.com`
   - 或直接输入 URL（默认分类）

### ✏️ 编辑监控项
- 点击监控项右侧的编辑图标
- 直接在列表中修改分类和 URL
- 支持实时保存

### 🗑️ 删除监控项
- 点击删除按钮
- 弹出确认模态框，防止误操作
- 支持二次确认

### 📋 其他操作
- **复制 URL**: 点击复制图标快速复制链接
- **导出配置**: 一键导出所有监控配置为 JSON 文件
- **分类管理**: 点击分类标题展开/收起监控项

## ⚙️ 配置说明

### 通知配置

#### Telegram 通知
1. 通过 [@BotFather](https://t.me/BotFather) 创建机器人
2. 获取 Bot Token
3. 获取 Chat ID（可通过 @userinfobot 获取）

#### Discord 通知
1. 在 Discord 服务器创建 Webhook
2. 复制 Webhook URL
3. 设置到 `DISCORD_WEBHOOK` 变量

## 🏗️ 技术架构

### 前端技术栈
- **HTML5**: 语义化标记，现代化结构
- **CSS3**: 渐变背景，磨砂玻璃效果，动画过渡
- **JavaScript ES6+**: 模块化代码，异步处理
- **响应式设计**: 移动端友好

### 后端技术栈
- **Cloudflare Workers**: 边缘计算，全球分布式
- **KV 存储**: 持久化数据存储
- **RESTful API**: 清晰的接口设计
- **Cron 触发器**: 定时任务执行

### 监控算法
```javascript
// 高频检测逻辑
setInterval(async () => {
    const latency = await checkUrl(url);
    updateStatus(latency);
    updateGlobalStats();
}, 3000 + Math.random() * 2000);
```

## 🔧 开发指南

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd sentinel

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 代码结构
```
sentinel/
├── worker.js          # 主程序文件
├── README.md          # 项目文档
└── package.json       # 项目配置
```

### API 接口

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/data` | GET | 获取监控数据和历史记录 |
| `/api/urls` | POST | 添加/更新监控 URL |
| `/api/urls` | DELETE | 删除监控 URL |
| `/api/check` | GET | 检查单个 URL 状态 |

## 🐛 故障排除

### 常见问题

**Q: 监控项状态频繁切换？**
A: 这是正常的高频检测效果，统计数字会保持稳定。

**Q: 通知没有发送？**
A: 检查环境变量配置和网络连接。

**Q: KV 存储无法访问？**
A: 确认 KV Namespace 已正确绑定。

**Q: 密码验证失败？**
A: 清除浏览器缓存或重新设置密码。

### 性能优化
- 合理设置检测频率
- 使用分类管理大量监控项
- 定期清理历史数据

## 🤝 贡献指南

我们欢迎各种形式的贡献！请参考以下指南：

### 报告问题
- 使用清晰的标题描述问题
- 提供复现步骤和环境信息
- 附上相关日志或截图

### 提交代码
1. Fork 项目仓库
2. 创建功能分支
3. 提交清晰的 commit 信息
4. 创建 Pull Request

### 代码规范
- 遵循 JavaScript 最佳实践
- 保持代码注释清晰
- 确保文档完整

## 📄 许可证

本项目采用 **MIT 许可证** - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- **Cloudflare Workers**: 提供强大的边缘计算平台
- **Telegram API**: 即时通知服务支持
- **开源社区**: 感谢所有贡献者和用户

## 📞 联系方式

- **项目主页**: [GitHub Repository](https://github.com/your-username/sentinel)
- **问题反馈**: [Issues Page](https://github.com/your-username/sentinel/issues)
- **讨论交流**: [Discussions](https://github.com/your-username/sentinel/discussions)

---

**🚀 由 Noxen YS 维护**

---

*最后更新: 2026年1月*