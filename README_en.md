# 🛡️ Sentinel - Website Monitoring & Alert System

Sentinel v3.6 In-place Edition is a modern website monitoring system built on Cloudflare Workers, providing real-time status monitoring, multi-platform alerts, in-place editing capabilities, and an elegant user interface.

## ✨ Core Features

- **Multi-platform Alerts**: Support for Telegram, Discord, Webhook and other notification methods
- **Alert Throttling**: Intelligent anti-spam with 1-hour cooling period to avoid duplicate notifications
- **Historical Records**: 50-record online status bar chart with real-time latency tracking
- **Real-time Latency Monitoring**: Dynamic display of website response times with update animations
- **In-place Editing**: Directly edit monitor items in the list without popups
- **Smart Categorization & Accordion UI**: Support for custom grouping with collapsible sections
- **Secure Authentication**: Modern password authentication system with local and session storage support, clears all authentication info after complete logout
- **Modern Custom Modals**: Unified login and logout interface with elegant interaction experience
- **Bilingual UI & Local Clock**: Chinese-English bilingual support with real-time local time display

## 🚀 Quick Start

### Live Demo
- **🌐 Demo Site**: [View Demo](https://sentinel-demo.noxen.qzz.io/)
- **Default Password**: `123456`

## 🚀 Quick Deployment

### One-click Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/sentinel)

### Manual Deployment

#### Step 1: Create Worker
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create Worker**
3. Copy the `worker.js` code into the editor

### Step 2: Configure KV Storage
1. Create KV Namespace in Worker settings
2. Namespace name: `SENTINEL_KV`
3. Bind to Worker, variable name must be `SENTINEL_KV`

### Step 3: Set Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PASSWORD` | Admin panel operation password | ✅ | `123456` |
| `TELEGRAM_TOKEN` | Telegram Bot Token (get from @BotFather) | ❌ | - |
| `CHAT_ID` | Telegram Chat ID for receiving notifications | ❌ | - |
| `DISCORD_WEBHOOK` | Discord Webhook URL | ❌ | - |
| `GENERIC_WEBHOOK` | Generic Webhook URL (supports Lark, DingTalk, etc.) | ❌ | - |

### Step 4: Configure Scheduled Tasks
- In Worker's **Triggers** tab
- Add Cron Trigger: `*/30 * * * *` (every 30 minutes)

## 📖 Detailed Usage Guide

### 🔐 Login and Logout System
- **Login Interface**: When first accessing the Worker URL, the system displays a modern login modal prompting for the admin password. Supports password memory functionality with options to save to local storage or session storage.
- **Logout Interface**: Clicking the logout button displays a modern modal with a consistent style to the login interface, providing clear confirmation options and operation instructions to prevent accidental actions. After logout, all stored authentication information is cleared.

### ➕ Adding Monitors
1. **Single Addition**:
   - Enter category name and URL in admin panel
   - Click "Batch Add" button

2. **Batch Addition**:
   - Enter one URL per line in text box
   - Supported format: `Category Name:https://example.com`
   - Or directly enter URL (default category)

### ✏️ Editing Monitors
- Click edit icon on the right side of monitor item
- Modify category and URL directly in the list
- Supports real-time saving

### 🗑️ Deleting Monitors
- Click delete button
- Confirmation modal pops up to prevent accidental deletion
- Supports secondary confirmation

### 📋 Other Operations
- **Copy URL**: Click copy icon to quickly copy link
- **Export Configuration**: One-click export all monitor configurations as JSON file
- **Category Management**: Click category title to expand/collapse monitor items

## ⚙️ Configuration Details

### Notification Configuration

#### Telegram Notifications
1. Create bot via [@BotFather](https://t.me/BotFather)
2. Get Bot Token
3. Get Chat ID (can use @userinfobot)

#### Discord Notifications
1. Create Webhook in Discord server
2. Copy Webhook URL
3. Set to `DISCORD_WEBHOOK` variable

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup, modern structure
- **CSS3**: Gradient backgrounds, frosted glass effects, animation transitions
- **JavaScript ES6+**: Modular code, asynchronous processing
- **Responsive Design**: Mobile-friendly

### Backend Stack
- **Cloudflare Workers**: Edge computing, globally distributed
- **KV Storage**: Persistent data storage
- **RESTful API**: Clear interface design
- **Cron Triggers**: Scheduled task execution

### Monitoring Algorithm
```javascript
// High-frequency detection logic
setInterval(async () => {
    const latency = await checkUrl(url);
    updateStatus(latency);
    updateGlobalStats();
}, 3000 + Math.random() * 2000);
```

## 🔧 Development Guide

### Local Development
```bash
# Clone project
git clone <repository-url>
cd sentinel

# Install dependencies
npm install

# Start development server
npm run dev
```

### Code Structure
```
sentinel/
├── worker.js          # Main program file
├── README.md          # Project documentation
└── package.json       # Project configuration
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/data` | GET | Get monitoring data and historical records |
| `/api/urls` | POST | Add/update monitor URL |
| `/api/urls` | DELETE | Delete monitor URL |
| `/api/check` | GET | Check single URL status |

## 🐛 Troubleshooting

### Common Issues

**Q: Monitor status frequently switching?**
A: This is normal high-frequency detection effect, statistics will remain stable.

**Q: Notifications not sending?**
A: Check environment variable configuration and network connection.

**Q: KV storage inaccessible?**
A: Confirm KV Namespace is correctly bound.

**Q: Password verification failed?**
A: Clear browser cache or reset password.

### Performance Optimization
- Set appropriate detection frequency
- Use category management for large number of monitors
- Regularly clean historical data

## 🤝 Contributing Guide

We welcome all forms of contributions! Please refer to the following guidelines:

### Reporting Issues
- Use clear title to describe the issue
- Provide reproduction steps and environment information
- Attach relevant logs or screenshots

### Submitting Code
1. Fork the project repository
2. Create feature branch
3. Submit clear commit messages
4. Create Pull Request

### Code Standards
- Follow JavaScript best practices
- Maintain clear code comments
- Ensure complete documentation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cloudflare Workers**: Powerful edge computing platform
- **Telegram API**: Instant notification service support
- **Open Source Community**: Thanks to all contributors and users

## 📞 Contact

- **Project Homepage**: [GitHub Repository](https://github.com/your-username/sentinel)
- **Issue Reporting**: [Issues Page](https://github.com/your-username/sentinel/issues)
- **Discussion**: [Discussions](https://github.com/your-username/sentinel/discussions)

---

**🚀 Maintained by Noxen YS**

---

*Last Updated: January 2026*