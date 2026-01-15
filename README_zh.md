# 🛡️ Sentinel - 网站监控与告警系统
 
Sentinel v3.8 就地编辑版是一个基于 Cloudflare Workers 构建的现代化网站监控系统，提供实时状态监控、多平台告警、就地编辑功能和优雅的用户界面。

## ✨ 核心特性

- **多平台告警**: 支持 Telegram、Discord、Webhook 等多种通知方式
- **告警限流**: 智能防骚扰，1小时冷却时间避免重复通知
- **实时延迟监控**: 动态显示网站响应时间，带更新动画效果
- **就地编辑**: 直接在列表中编辑监控项，无需弹窗
- **智能分类与手风琴UI**: 支持自定义分组，可折叠展开
- **安全认证**: 现代化密码验证系统，支持本地和会话存储，完全退出后清除所有认证信息
- **现代化模态框**: 统一的登录与退出界面，优雅的交互体验
- **双语界面与本地时钟**: 中英文双语支持，实时本地时间显示
- **响应式设计**: 完美适配桌面和移动设备，优化触屏体验
- **智能状态分类**: 自动将异常服务置顶，分类标题动态显示统计信息
- **状态码解释**: 详细的HTTP状态码解释，帮助快速诊断问题
- **批量操作**: 支持批量添加监控项，配置导出功能


## 🚀 快速开始

### 在线演示
- **🌐 演示站点**: [点击查看演示](https://sentinel-demo.noxen.qzz.io/)
- **默认密码**: `123456`

## 🖼 界面预览

Sentinel 提供暗色科技风的仪表盘界面，包含：

![Sentinel 仪表盘](./assets/dashboard-main.png)
![Sentinel 管理面板](./assets/dashboard-admin.png)

## 🚀 快速部署

#### 一键部署 (推荐)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/noxenys/sentinel)

**一键部署流程**:
1. **点击上方按钮** → 登录您的 Cloudflare 账户
2. **授权 GitHub/GitLab 访问** → 系统会自动创建代码仓库
3. **自动配置资源** → Cloudflare 会自动创建 KV 存储空间并绑定到 Worker
4. **设置环境变量** → 在部署界面配置密码和通知设置
5. **完成部署** → 系统自动构建并部署到全球网络

> 💡 **优势**: 自动配置所有必需资源，无需手动操作，支持持续集成部署

#### ⚙️ 手动部署

**步骤 1: 创建 Worker 和 KV 存储**
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Worker**
3. 将 `worker.js` 代码复制到编辑器中
4. 创建 KV 命名空间: **Workers** → **KV** → **Create Namespace**
   - 名称: `SENTINEL_KV`
   - 描述: Sentinel 监控数据存储

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
| `PASSWORD` | 管理面板密码 | ✅ | `123456` |
| `TELEGRAM_TOKEN` | Telegram 机器人令牌 | ❌ | - |
| `CHAT_ID` | Telegram 聊天ID | ❌ | - |
| `DISCORD_WEBHOOK` | Discord Webhook URL | ❌ | - |
| `GENERIC_WEBHOOK` | 通用 Webhook URL | ❌ | - |

> 🔒 **安全提示**  
> 部署到生产环境时，请务必将默认密码 `123456` 修改为随机、强度足够的密码，并妥善保存。不要在公网环境长时间使用默认密码。
>
> 建议在 Cloudflare Dashboard 的 Worker 环境变量中配置 `PASSWORD`，不要在 `wrangler.toml` 中写入真实密码。

### 步骤 4: 配置定时任务 (Cron Triggers)
为了实现后台自动巡检和故障告警（发送 Telegram/Discord 通知），你需要配置 Cron 触发器。即便你关闭了网页，Worker 也会在后台按此频率运行。
请根据你的 **监控数量** 和 **Cloudflare 账号等级** 选择合适的频率：
| 方案 | Cron 表达式 | 说明 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **🛡️ 推荐 (默认)** | `*/10 * * * *` | **每 10 分钟一次** | **绝大多数用户**。非常安全，即使监控 50+ 个网站也不会爆额度。 |
| **🚀 极速模式** | `* * * * *` | **每 1 分钟一次** | **仅限监控项 < 20 个的用户**。响应最快，但消耗额度较高。 |
| **🐢 省流模式** | `*/30 * * * *` | **每 30 分钟一次** | 适合监控海量非核心网站，几乎不消耗额度。 |
> **⚠️ 流量预警 (Cloudflare Free Tier)**
> Cloudflare Workers 免费版每日请求上限为 **100,000 次**。
> * **计算公式**：`监控数量` × `1440` (若1分钟一次) = 每日消耗请求数
> * **示例**：如果你有 **20个** 监控项且设置为 **1分钟一次**，每日将消耗 `28,800` 次请求（约占额度的 30%），是安全的。但如果监控项过多（如超过 60 个），请务必降低频率（如改为 10 分钟一次），否则会导致 Worker 额度耗尽而停止工作。

**步骤 5: 部署和测试**
1. 点击 **Save and Deploy**
2. 访问您的 Worker URL 测试功能
3. 使用默认密码 `123456` 登录

### CI/CD 自动部署（可选）

本仓库内置 GitHub Actions 工作流 `.github/workflows/deploy.yml`，你可以：

1. 在 GitHub 仓库 **Settings → Secrets and variables → Actions** 中添加：
   - `CF_API_TOKEN`
   - `CF_ACCOUNT_ID`
2. 在 Cloudflare 中创建 `CF_API_TOKEN` 时，至少需要为对应账户授予：
   - **Workers 脚本 (Workers Scripts)**: 编辑（Edit）
   - **Workers KV 存储 (Workers KV Storage)**: 编辑（Edit）（如果你使用 KV）
3. 每次 push 到 `main` 分支时，自动执行 `wrangler deploy` 将最新代码部署到 Cloudflare Workers。

> ⚠️ 注意：如果启用了 GitHub Actions + `wrangler deploy` 自动部署，Cloudflare 控制台中手动修改的环境变量和机密会在下一次部署时被覆盖。请以 GitHub Secrets / CI 配置为唯一来源，不要同时在 Dashboard 中手动维护同一批变量。

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
- **HTML5 + CSS3 + JavaScript ES6+**
- 现代化UI组件，包含毛玻璃效果和动画
- 响应式设计，支持桌面和移动设备
- 实时时钟和动态数据更新

### 后端技术栈
- **Cloudflare Workers** 作为无服务器运行环境
- **KV 存储**用于持久化数据
- **定时任务**用于周期性检查
- **RESTful API** 设计

### 安全特性
- 密码验证系统，支持本地和会话存储
- API端点保护，使用X-Password头认证
- 完全退出后清除所有认证信息

### 功能特性
- 实时监控与延迟测量
- 多平台告警（Telegram、Discord、Webhook）
- 智能状态分类
- 批量操作与配置导出
- 状态码解释与错误诊断

### 监控算法

系统采用 Cloudflare Workers 的 Cron 触发器实现定时监控，默认每10分钟检查一次所有监控项。

1. **定时触发**：通过 `addEventListener('scheduled')` 监听定时事件
2. **并发检测**：使用 `Promise.all` 并行检查所有网站，提高效率
3. **状态记录**：每个网站保留最近50次检测结果，用于后台数据分析
4. **智能告警**：仅在状态变化时发送通知，并设置1小时冷却时间避免骚扰

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

> ℹ️ 开发环境建议使用 Node.js **16 或以上版本**，以避免因运行时不兼容导致的异常。

### 代码结构
```
sentinel/
├── worker.js          # 主程序文件
├── README.md          # 项目主文档
├── README_zh.md       # 中文文档
├── README_en.md       # 英文文档
├── wrangler.toml      # Cloudflare Workers 配置
├── package.json       # 项目依赖配置
├── LICENSE           # 许可证文件
├── CONTRIBUTING.md   # 贡献指南
└── .gitignore        # Git 忽略文件
```

### API 接口

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/data` | GET | 获取监控数据 |
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
- 定期清理监控数据

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

- **项目主页**: [GitHub Repository](https://github.com/noxenys/sentinel)
- **问题反馈**: [Issues Page](https://github.com/noxenys/sentinel/issues)
- **讨论交流**: [Discussions](https://github.com/noxenys/sentinel/discussions)

---

**🚀 由 Noxen YS 维护**

---

*项目开始: 2026年1月7日*  
*项目最后更新: 2026年1月15日*
