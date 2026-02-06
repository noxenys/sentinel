/**
 * Sentinel v3.8 - Final Layout Fix
 * * Fixed: Toast position centered
 * * Fixed: Refresh button layout (Flexbox)
 */

const DEFAULT_URLS = []; 

const HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sentinel | Dashboard</title>

  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #6366f1;
      --bg: #020617;
      --card-bg: rgba(15, 23, 42, 0.8);
      --text-main: #e5e7eb;
      --text-muted: #9ca3af;
      --success: #22c55e;
      --error: #f97373;
      --border: rgba(148, 163, 184, 0.2);
      --clock: #93a9d1;
      --group-divider: rgba(148, 163, 184, 0.16);
      --group-divider-hover: rgba(148, 163, 184, 0.3);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
      background-color: var(--bg);
      background-image:
        linear-gradient(125deg, rgba(4, 10, 28, 0.97) 0%, rgba(2, 6, 23, 0.96) 48%, rgba(7, 18, 43, 0.97) 100%),
        radial-gradient(circle at top right, rgba(56, 189, 248, 0.1), transparent 42%),
        radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.08), transparent 45%);
      color: var(--text-main);
      line-height: 1.6;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header { 
      position: relative; 
      text-align: center; 
      margin-bottom: 40px; 
    }
    h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.05em; margin-bottom: 8px; background: linear-gradient(to bottom right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { color: var(--text-muted); font-size: 1rem; font-weight: 500; }
    .live-clock {
      margin-top: 15px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
      color: var(--clock);
      font-weight: 600;
      font-size: 1.05rem;
      letter-spacing: 0.8px;
      text-shadow: 0 0 10px rgba(96, 165, 250, 0.2);
    }
    .logout-btn-top {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 8px;
      color: var(--error);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logout-btn-top:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: var(--error);
      transform: translateY(-1px);
    }
    
    /* 数据卡片网格布局 */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    /* 数据卡片样式 */
    .stat-card {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 16px;
      padding: 18px;
      text-align: center;
      backdrop-filter: blur(16px);
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      background: rgba(30, 41, 59, 0.5);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    .stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; font-weight: 600; }
    .stat-value { font-size: 2rem; font-weight: 800; }

    /* 手机端适配 */
    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .group-container { margin-bottom: 24px; }
    
    /* 分类标题：改为透明背景 + 底部线条 */
    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 4px;       /* 减小内边距，更紧凑 */
      background: transparent; 
      border: none;
      border-bottom: 1px solid var(--group-divider); /* 更淡的底线 */
      border-radius: 0;        
      cursor: pointer;
      user-select: none;
      margin-bottom: 10px;     /* 减小间距 */
      transition: all 0.2s;
    }
    .group-header:hover { 
      padding-left: 8px;      /* 更小的悬停偏移 */
      border-bottom-color: var(--group-divider-hover); /* 更淡的悬停颜色 */
      background: rgba(15, 23, 42, 0.2);
    }
    
    /* 标题文字 */
    .group-title { 
      font-size: 1.1rem;       /* 字体稍微加大一点 */
      color: var(--text-main); 
      font-weight: 700; 
      display: flex; 
      align-items: center; 
      gap: 12px; 
      flex: 1;
    }
    
    /* 移除旧的红色边框报警样式，改为文字发光，更高级 */
    .group-header.has-offline { 
      border-left: none; 
      background: transparent; 
    }
    .group-header.has-offline .group-title { 
      color: var(--error); 
      text-shadow: 0 0 15px rgba(239, 68, 68, 0.4); /* 红色光晕 */
    }
    .group-stats {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .stat-online { color: var(--success); }
    .stat-offline { color: var(--error); }
    .stat-latency { color: #38bdf8; font-family: monospace; font-weight: 600; }
    .group-arrow { transition: transform 0.3s; }
    .group-collapsed .group-arrow { transform: rotate(-90deg); }
    .group-content { 
      display: grid; 
      /* 修复横向溢出：使用自适应网格布局 */ 
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
      gap: 16px; 
      margin-top: 16px; 
      width: 100%;
      box-sizing: border-box;
    } 
    /* 手机端保持1列 */ 
    @media (max-width: 768px) { 
      .group-content { grid-template-columns: 1fr; } 
    }
    .group-collapsed .group-content { display: none; }

    .monitor-item { 
      background: rgba(15, 23, 42, 0.9); 
      border: 1px solid rgba(148, 163, 184, 0.16); 
      border-radius: 10px; 
      padding: 14px; 
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05); 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between; 
      min-height: 100px; /* 稍微降低高度 */ 
      transition: all 0.3s ease;
    } 
    .monitor-item:hover { 
      transform: translateY(-1px); 
      border-color: rgba(255, 255, 255, 0.1); 
      box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1); 
    }
    .monitor-item.offline { 
      border-color: rgba(239, 68, 68, 0.4);
      background: rgba(239, 68, 68, 0.1);
      box-shadow: 0 2px 8px -1px rgba(239, 68, 68, 0.2);
    }
    .monitor-item.offline:hover { border-color: var(--error); }
    
    .monitor-header { 
      margin-bottom: 8px; 
      /* 让标题和状态分列左右 */ 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-start; 
    } 
    
    .url-info { flex: 1; padding-right: 10px; min-width: 0; overflow: hidden; } /* 防止文字撞到状态标 */ 
    .url-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 2px; color: rgba(255, 255, 255, 0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .url-path {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .domain-info {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .status-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      min-width: 80px;
    }
    .status-badge { 
      font-size: 0.6rem; 
      padding: 3px 8px; 
      border-radius: 6px; 
      font-weight: 700; 
      text-transform: uppercase; 
      width: fit-content;
      transition: all 0.3s ease;
    }
    .status-online { 
      background: rgba(16, 185, 129, 0.08); 
      color: rgba(16, 185, 129, 0.6); 
      border: 1px solid rgba(16, 185, 129, 0.1); 
      opacity: 0.7;
    }
    .status-offline { 
      background: rgba(239, 68, 68, 0.2); 
      color: var(--error); 
      border: 1px solid rgba(239, 68, 68, 0.3); 
      opacity: 1;
    }
    .status-info-text {
      font-size: 0.65rem;
      color: var(--text-muted);
      opacity: 0.8;
      line-height: 1.3;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 2px;
    }
    .latency { 
      font-size: 0.65rem; 
      color: rgba(56, 189, 248, 0.6); 
      font-family: monospace; 
      transition: all 0.3s ease; 
      font-weight: 500; 
      opacity: 0.7;
    }
    .latency-update { color: rgba(255, 255, 255, 0.9); text-shadow: 0 0 4px rgba(56, 189, 248, 0.3); }

    .actions { 
      display: flex; 
      gap: 12px; 
      align-items: center;
      justify-content: flex-end;
      margin-top: 8px;
    }
    .btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.85rem;
      min-width: auto;
    }
    .btn:hover { background: var(--primary-hover); }
    .btn-icon { 
      background: rgba(255,255,255,0.02); 
      color: rgba(255, 255, 255, 0.3); 
      padding: 6px; 
      border: 1px solid rgba(255, 255, 255, 0.05); 
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.3s ease;
      opacity: 0.5;
    }
    .btn-icon:hover { 
      background: rgba(255,255,255,0.08); 
      border-color: var(--primary); 
      color: rgba(255, 255, 255, 0.8);
      transform: translateY(-1px); 
      opacity: 1;
    }
    .btn-danger { 
      background: rgba(239, 68, 68, 0.1); 
      color: var(--error); 
      border: 1px solid rgba(239, 68, 68, 0.2); 
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .btn-danger:hover { 
      background: rgba(239, 68, 68, 0.2); 
      border-color: var(--error); 
      transform: translateY(-1px); 
    }

    .history-bar { 
      display: none;
    }

    /* Badge styles */
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 6px;
      transition: all 0.2s ease;
    }
    .badge-success {
      background-color: rgba(34, 197, 94, 0.15);
      color: var(--success);
    }
    .badge-error {
      background-color: rgba(239, 68, 68, 0.15);
      color: var(--error);
    }
    .badge-neutral {
      background-color: rgba(100, 116, 139, 0.15);
      color: var(--text-muted);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .group-content { grid-template-columns: 1fr; }
      .monitor-header { flex-direction: column; align-items: flex-start; }
      .status-info { align-items: flex-start; margin-top: 8px; }
      .actions { justify-content: flex-start; }
    }

    /* 底部触发按钮样式 */
    .btn-add-monitor {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--border); /* Changed from dashed to solid */
      border-radius: 20px;
      padding: 15px;
      color: var(--text-muted);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      backdrop-filter: blur(20px); /* Restored glassy effect */
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 40px;
    }
    .btn-add-monitor:hover {
      background: rgba(30, 41, 59, 0.8);
      border-color: var(--primary);
      color: white;
      transform: translateY(-2px);
    }
    
    /* 管理面板容器（默认隐藏） */
    .admin-panel-wrapper {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .admin-panel-wrapper.open {
      max-height: 600px; /* 展开高度 */
      opacity: 1;
      margin-top: 20px;
    }
    
    .admin-panel { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 30px; }
    .input-group { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
    .input-field {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: white;
      padding: 14px;
      font-family: inherit;
      width: 100%;
    }
    
    /* 修正后的 Toast 居中样式 */
    .toast { 
      position: fixed; 
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%);
      background: rgba(15, 23, 42, 0.95);
      color: white;
      padding: 16px 32px;
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 50px rgba(0,0,0,0.5);
      display: none;
      z-index: 3000;
      font-weight: 600;
      backdrop-filter: blur(8px);
      text-align: center;
    }
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
      display: none; justify-content: center; align-items: center; z-index: 2000;
    }
    .modal {
      background: #1e293b; border: 1px solid var(--border); border-radius: 24px;
      padding: 32px; max-width: 400px; width: 90%; text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: scale(0.9); transition: transform 0.2s ease;
    }
    .modal-active .modal { transform: scale(1); }
    .modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; color: #fff; }
    .modal-text { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5; }
    /* 弹窗底部按钮容器 */
    .modal-btns { 
      display: flex; 
      gap: 12px; 
      justify-content: space-between; /* 确保撑满两端 */
      width: 100%;
    }
    /* 强制修正弹窗内的所有按钮样式 */ 
    .modal-btns button, 
    .modal-btns .btn, 
    .modal-btns .login-btn { 
      flex: 1;                 /* 平分宽度 */ 
      height: 46px;            /* 核心：强制固定高度 */ 
      line-height: 46px;       /* 确保文字垂直居中（辅助） */ 
      padding: 0 !important;   /* 既然定了高度，padding就可以去掉了，防止撑大 */ 
      margin: 0 !important;    /* 清除所有干扰边距 */ 
      border: 1px solid transparent; /* 核心：给所有按钮都加一个透明边框，防止有的按钮有边框有的没导致的高度差 */ 
      white-space: nowrap;     
      display: flex; 
      align-items: center; 
      justify-content: center; 
      width: auto !important; 
    }
    
    .login-modal { max-width: 380px; }
    .login-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; background: linear-gradient(to bottom right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .login-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px; }
    .login-input { 
      background: rgba(15, 23, 42, 0.8); 
      border: 1px solid var(--border); 
      border-radius: 12px; 
      color: white; 
      padding: 16px; 
      font-family: inherit; 
      width: 100%; 
      font-size: 1rem;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }
    .login-input:focus { 
      outline: none; 
      border-color: var(--primary); 
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); 
    }
    .login-btn { 
      background: var(--primary); 
      color: white; 
      border: none; 
      padding: 14px 28px; 
      border-radius: 12px; 
      font-weight: 600; 
      cursor: pointer; 
      transition: all 0.2s; 
      font-size: 1rem; 
      width: 100%;
    }
    .login-btn:hover { background: var(--primary-hover); transform: translateY(-1px); }
    .login-btn:active { transform: translateY(0); }
    .login-error { 
      color: var(--error); 
      font-size: 0.85rem; 
      margin-top: -10px; 
      margin-bottom: 15px; 
      text-align: center; 
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Sentinel</h1>
      <p class="subtitle">智能在线哨兵 · 生产级监控</p>
      <button class="logout-btn-top" onclick="logout()" title="退出登录 / Logout">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
      <div id="liveClock" class="live-clock"></div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">总监控</div>
        <div class="stat-value" id="totalCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">在线</div>
        <div class="stat-value" style="color:var(--success)" id="onlineCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">异常</div>
        <div class="stat-value" style="color:var(--error)" id="offlineCount">0</div>
      </div>
    </div>

    <div id="monitorList"></div>

    <button id="toggleAdminBtn" class="btn-add-monitor" onclick="toggleAdmin()">
      + 添加新监控 / Add New Monitor
    </button>
    
    <div class="admin-panel-wrapper" id="adminContainer">
      <div class="admin-panel">
        <h3 style="margin-bottom:20px; font-weight:700;">管理面板 / Admin Panel</h3>
        <div class="input-group">
          <input type="text" id="groupName" class="input-field" placeholder="分类名称 / Group Name (e.g. Production, Personal)">
          <textarea id="newUrls" class="input-field" style="min-height: 100px;" placeholder="输入 URL，每行一个 / Enter URLs, one per line"></textarea>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn" id="addBtn" onclick="addUrls()">批量添加 / Add</button>
          <button class="btn" style="background:#475569" onclick="exportConfig()">导出 / Export</button>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <div id="modalOverlay" class="modal-overlay">
    <div class="modal">
      <div class="modal-title" id="modalTitle">确认操作</div>
      <div class="modal-text" id="modalText">确定要执行此操作吗？</div>
      <div class="modal-btns">
        <button class="btn" style="background:#475569" onclick="closeModal()">取消 / Cancel</button>
        <button class="btn btn-danger" id="modalConfirmBtn">确定 / Confirm</button>
      </div>
    </div>
  </div>

  <div id="loginOverlay" class="modal-overlay" style="display:none;">
    <div class="modal login-modal">
      <div class="login-title">🔐 Sentinel</div>
      <div class="login-subtitle">请输入管理密码以继续 / Please enter admin password</div>
      <input type="password" id="loginPassword" class="login-input" placeholder="密码 / Password" autocomplete="current-password">
      <div style="display:flex; align-items:center; margin:15px 0;">
        <input type="checkbox" id="rememberPassword" checked>
        <label for="rememberPassword" style="margin-left:8px; font-size:0.9rem; color:var(--text-muted);">
          记住密码 / Remember password
        </label>
      </div>
      <div id="loginError" class="login-error">密码错误，请重新输入</div>
      <button class="login-btn" onclick="handleLogin()">登录 / Login</button>
      <div style="text-align:center; margin-top:20px; color:var(--text-muted); font-size:0.8rem;">
        按 Enter 键快速登录 / Press Enter to login quickly
      </div>
    </div>
  </div>

  <script>
    let allUrls = [];
    let historyData = {};
    
    // 初始化全局变量
    window.editingId = null;
    window.originalValues = {};
    
    // 实时时钟
    function updateClock() {
      const now = new Date();
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      };
      const timeString = now.toLocaleString('zh-CN', options);
      const clockEl = document.getElementById('liveClock');
      if (clockEl) {
        clockEl.innerText = timeString;
      }
    }
    
    // 启动时钟
    setInterval(updateClock, 1000);
    updateClock(); // 立即更新一次
    
    function getSafeId(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return 'id-' + Math.abs(hash);
    }

    let loginResolve = null;
    let loginReject = null;
    
    async function showLoginModal() {
      return new Promise((resolve, reject) => {
        loginResolve = resolve;
        loginReject = reject;
        document.getElementById('loginOverlay').style.display = 'flex';
        setTimeout(() => document.getElementById('loginOverlay').classList.add('modal-active'), 10);
        document.getElementById('loginPassword').focus();
      });
    }
    
    function hideLoginModal() {
      document.getElementById('loginOverlay').classList.remove('modal-active');
      setTimeout(() => {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginError').style.display = 'none';
      }, 200);
    }
    
    async function handleLogin() {
      const password = document.getElementById('loginPassword').value;
      const rememberPassword = document.getElementById('rememberPassword').checked;
      
      if (!password) {
        document.getElementById('loginError').innerText = '请输入密码 / Please enter password';
        document.getElementById('loginError').style.display = 'block';
        return;
      }
      
      // 测试密码是否正确
      const testRes = await fetch('/api/data', {
        headers: { 'X-Password': password }
      });
      
      if (testRes.status === 200) {
        // 根据用户选择决定是否保存密码
        if (rememberPassword) {
          localStorage.setItem('sentinel_pro_pass', password);
        } else {
          // 不记住密码，使用sessionStorage（关闭浏览器后失效）
          sessionStorage.setItem('sentinel_pro_pass', password);
        }
        hideLoginModal();
        if (loginResolve) loginResolve(password);
      } else if (testRes.status === 503) {
        document.getElementById('loginError').innerText = 'Server misconfigured: PASSWORD env var is missing';
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
      } else {
        document.getElementById('loginError').innerText = '密码错误，请重新输入 / Incorrect password';
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
      }
    }
    
    // 添加Enter键支持
    document.addEventListener('DOMContentLoaded', function() {
      const loginInput = document.getElementById('loginPassword');
      if (loginInput) {
        loginInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            handleLogin();
          }
        });
      }
    });
    
    async function apiFetch(path, options = {}) {
      // 检查localStorage和sessionStorage中的密码
      let password = localStorage.getItem('sentinel_pro_pass') || sessionStorage.getItem('sentinel_pro_pass');
      options.headers = options.headers || {};
      options.headers['X-Password'] = password || '';
      const res = await fetch(path, options);
      return res;
    }

   async function init() {
      // 1. 页面加载时，先检查本地有没有存密码
      const savedPass = localStorage.getItem('sentinel_pro_pass') || sessionStorage.getItem('sentinel_pro_pass');
      const loginOverlay = document.getElementById('loginOverlay');

      if (savedPass) {
        // 2. 如果有密码，尝试静默验证
        try {
          const res = await fetch('/api/data', { 
            headers: { 'X-Password': savedPass } 
          });

          if (res.status === 200) {
            // 3. 验证成功：直接隐藏弹窗，加载数据
            if (loginOverlay) {
                loginOverlay.style.display = 'none';
                loginOverlay.classList.remove('modal-active');
            }
            
            const data = await res.json();
            allUrls = data.urls || [];
            historyData = data.history || {};
            render();
            checkAll();
            setupStatCards(); // 设置统计卡点击功能
            return; // 直接结束，不显示登录框
          } 
        } catch (e) {
          console.error("Auto-login failed", e);
        }
        
        // 如果代码走到这里，说明 verify 失败了（密码过期或错误），清除旧密码
        localStorage.removeItem('sentinel_pro_pass');
        sessionStorage.removeItem('sentinel_pro_pass');
      }

      // 4. 如果没密码或验证失败，显示登录框并等待用户输入
      // 等待 showLoginModal 解析（即用户点击登录且成功后）
      const newPass = await showLoginModal();
      
      // 登录成功后，再次调用 init 加载数据
      if (newPass) {
          init();
      }
    }

    function render() {
      const list = document.getElementById('monitorList');
      document.getElementById('totalCount').innerText = allUrls.length;
      if (allUrls.length === 0) {
        list.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:40px;">暂无监控目标 / No monitors</div>';
        return;
      }
      const groups = {};
      allUrls.forEach(item => {
        let group = '默认分类', url = item;
        if (item.includes(':http')) {
          const idx = item.indexOf(':http');
          group = item.substring(0, idx);
          url = item.substring(idx + 1);
        }
        if (!groups[group]) groups[group] = [];
        groups[group].push({ raw: item, url: url });
      });
      
      // 排序：有异常的分类置顶
      const sortedGroups = Object.entries(groups).sort(([groupA, itemsA], [groupB, itemsB]) => {
        const offlineA = itemsA.filter(item => window.itemStatuses?.[getSafeId(item.raw)] === 'offline').length;
        const offlineB = itemsB.filter(item => window.itemStatuses?.[getSafeId(item.raw)] === 'offline').length;
        if (offlineA > 0 && offlineB === 0) return -1;
        if (offlineA === 0 && offlineB > 0) return 1;
        return groupA.localeCompare(groupB);
      });
      
      let html = '';
      for (const [groupName, items] of sortedGroups) {
        const groupId = getSafeId(groupName);
        
        // 计算分类统计
        let groupOnline = 0, groupOffline = 0, totalLatency = 0, latencyCount = 0;
        items.forEach(item => {
          const itemId = getSafeId(item.raw);
          const status = window.itemStatuses?.[itemId];
          if (status === 'online') groupOnline++;
          else if (status === 'offline') groupOffline++;
          
          // 计算延迟
          const latencyEl = document.getElementById('latency-' + itemId);
          if (latencyEl && latencyEl.innerText && latencyEl.innerText !== '') {
            const latency = parseInt(latencyEl.innerText.replace('ms', ''));
            if (!isNaN(latency)) {
              totalLatency += latency;
              latencyCount++;
            }
          }
        });
        
        const avgLatency = latencyCount > 0 ? Math.round(totalLatency / latencyCount) : 0;
        const hasOffline = groupOffline > 0;
        
        // 1. 定义折叠逻辑：如果没有异常(!hasOffline)，则默认为折叠状态 
        const isCollapsed = !hasOffline;
        
        let itemsHtml = '';
        items.forEach(item => {
          const history = historyData[item.raw] || [];
          const itemId = getSafeId(item.raw);
          let dotsHtml = '';
          for (let i = 0; i < 12; i++) {
            const status = history[history.length - 12 + i];
            const dotClass = status === undefined ? '' : (status ? 'dot-online' : 'dot-offline');
            dotsHtml += '<div class="history-dot ' + dotClass + '"></div>';
          }
          
          // 提取域名信息
          let domain = item.url;
          try {
            const urlObj = new URL(item.url);
            domain = urlObj.hostname;
          } catch (e) {
            // 如果URL解析失败，使用原始URL
          }
          
          // 截取URL的host和path，用于显示
          let displayUrl = item.url;
          try {
            const urlObj = new URL(item.url);
            // 显示hostname + path，但不包含协议和查询参数
            displayUrl = urlObj.hostname + urlObj.pathname;
            // 如果路径太长，截断它
            if (displayUrl.length > 40) {
              displayUrl = displayUrl.substring(0, 40) + '...';
            }
          } catch (e) {
            // 如果URL解析失败，使用原始URL
            if (displayUrl.length > 40) {
              displayUrl = displayUrl.substring(0, 40) + '...';
            }
          }

          itemsHtml += \`
            <div class="monitor-item" id="item-\${itemId}">
              <div class="monitor-header">
                <div class="url-info">
                  <div class="url-title" title="\${item.url}">\${domain}</div>
                  <div class="url-path" title="\${item.url}">\${displayUrl}</div>
                </div>
                <div class="status-info">
                  <span id="status-\${itemId}" class="status-badge status-checking">检测中...</span>
                  <span id="latency-\${itemId}" class="latency"></span>
                </div>
              </div>
              <div class="actions">
                <button class="btn btn-icon" onclick="copyUrl('\${item.url}')" title="复制">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
                <button class="btn btn-icon" onclick="editUrl('\${item.raw.replace(/'/g, "\\\\'")}')" title="编辑">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="btn btn-icon" onclick="deleteUrl('\${item.raw.replace(/'/g, "\\\\'")}')" title="删除" style="color:#ef4444; border-color:rgba(239,68,68,0.2);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
              <div class="history-bar">\${dotsHtml}</div>
            </div>
          \`;
        });
        
        html += \`
          <div class="group-container\${isCollapsed ? ' group-collapsed' : ''}\${hasOffline ? ' has-offline' : ''}" id="group-\${groupId}">
            <div class="group-header\${hasOffline ? ' has-offline' : ''}" onclick="toggleGroup('\${groupId}')">
              <div class="group-title" id="group-title-\${groupId}">
                <svg class="group-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
                \${groupName}
              </div>
              <div class="group-stats">
                \${groupOnline > 0 ? \`<span class="badge badge-success">\${groupOnline} 在线</span>\` : ''}
                \${groupOffline > 0 ? \`<span class="badge badge-error" style="\${groupOffline > 0 ? 'box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);' : ''}">\${groupOffline} 异常</span>\` : ''}
                \${avgLatency > 0 ? \`<span class="badge badge-neutral">Avg \${avgLatency}ms</span>\` : ''}
              </div>
            </div>
            <div class="group-content">\${itemsHtml}</div>
          </div>
        \`;
      }
      list.innerHTML = html;
    }

    function toggleGroup(id) {
      document.getElementById('group-' + id).classList.toggle('group-collapsed');
    }

    // 全局变量用于存储轮询定时器
    let checkAllTimer = null;

    async function checkAll() {
      // 清除之前的定时器（如果存在）
      if (checkAllTimer) {
        clearInterval(checkAllTimer);
      }

      // 全局状态存储，用于记录每个监控项的当前状态
      window.itemStatuses = {};
      
      const checkOne = async (item) => {
        let url = item;
        if (item.includes(':http')) url = item.substring(item.indexOf(':http') + 1);
        const itemId = getSafeId(item);
        const badge = document.getElementById('status-' + itemId);
        const latEl = document.getElementById('latency-' + itemId);
        
        const runCheck = async () => {
          const start = Date.now();
          try {
            const res = await apiFetch('/api/check?url=' + encodeURIComponent(url));
            const data = await res.json();
            const latency = Date.now() - start;
            
            if (badge) {
              if (data.ok) {
                badge.innerText = 'ONLINE ' + data.status;
                badge.className = 'status-badge status-online';
                latEl.innerText = latency + 'ms';
                latEl.classList.add('latency-update');
                setTimeout(() => { latEl.classList.remove('latency-update'); }, 500);
                
                // 记录状态为在线
                window.itemStatuses[itemId] = 'online';

                // 移除可能存在的错误信息
                const statusInfoEl = document.getElementById('status-info-' + itemId);
                if (statusInfoEl) {
                  statusInfoEl.remove();
                }
              } else {
                const statusCode = data.status || 'ERR';
                badge.innerText = 'OFFLINE ' + statusCode;
                badge.className = 'status-badge status-offline';

                // 添加状态码解释
                const statusExplain = getStatusExplanation(statusCode);
                const statusInfoEl = document.getElementById('status-info-' + itemId);
                if (!statusInfoEl) {
                  const infoEl = document.createElement('div');
                  infoEl.id = 'status-info-' + itemId;
                  infoEl.className = 'status-info-text';
                  infoEl.innerText = statusExplain;
                  badge.parentNode.appendChild(infoEl);
                } else {
                  statusInfoEl.innerText = statusExplain;
                }
                
                // 记录状态为异常
                window.itemStatuses[itemId] = 'offline';
              }
            }
          } catch (e) { 
            // 记录状态为异常
            window.itemStatuses[itemId] = 'offline';
          }
          
          // 更新统计显示（基于所有监控项的状态）
          updateGlobalStats();
        };

        await runCheck();
      };

      // 并行检查所有URL
      await Promise.all(allUrls.map(item => checkOne(item)));

      // 设置统一轮询，每30秒刷新一次所有URL
      checkAllTimer = setInterval(async () => {
        await Promise.all(allUrls.map(item => checkOne(item)));
      }, 30000);
    }

    // 添加手动刷新按钮功能
    function manualRefresh() {
      checkAll();
      showToast('已刷新所有监控项 / All monitors refreshed');
    }

    function updateGlobalStats() {
      // 计算所有监控项的在线和异常数量
      let online = 0, offline = 0;
      
      allUrls.forEach(item => {
        const itemId = getSafeId(item);
        const status = window.itemStatuses ? window.itemStatuses[itemId] : null;
        if (status === 'online') online++;
        else if (status === 'offline') offline++;
      });
      
      // 添加灵动动画效果
      animateNumber('onlineCount', online);
      animateNumber('offlineCount', offline);

      // 更新分类显示状态
      const groups = {};
      allUrls.forEach(item => {
        let group = '默认分类', url = item;
        if (item.includes(':http')) {
          const idx = item.indexOf(':http');
          group = item.substring(0, idx);
          url = item.substring(idx + 1);
        }
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
      });

      // 更新每个分类的统计显示
      for (const groupName in groups) {
        const groupId = getSafeId(groupName);
        const groupHeader = document.getElementById('group-' + groupId)?.querySelector('.group-header');
        const groupStatsEl = groupHeader?.querySelector('.group-stats');
        
        if (groupHeader && groupStatsEl) {
          let groupOnline = 0, groupOffline = 0;
          groups[groupName].forEach(item => {
            const itemId = getSafeId(item);
            const status = window.itemStatuses ? window.itemStatuses[itemId] : null;
            if (status === 'online') groupOnline++;
            else if (status === 'offline') groupOffline++;
          });
          
          // 更新分类统计显示
          groupStatsEl.innerHTML = \`
            \${groupOnline > 0 ? \`<span class="stat-online">\${groupOnline}🟢</span>\` : ''}
            \${groupOffline > 0 ? \`<span class="stat-offline">\${groupOffline}🔴</span>\` : ''}
          \`;
          
          // 更新分类样式
          if (groupOffline > 0) {
            groupHeader.classList.add('has-offline');
            
            // [新增] 如果发现异常，强制展开分组
            const groupContainer = document.getElementById('group-' + groupId);
            if (groupContainer) {
              groupContainer.classList.remove('group-collapsed');
            }
          } else {
            groupHeader.classList.remove('has-offline');
          }
          
          // 更新URL项样式
          groups[groupName].forEach(item => {
            const itemId = getSafeId(item);
            const itemEl = document.getElementById('item-' + itemId);
            if (itemEl) {
              const status = window.itemStatuses ? window.itemStatuses[itemId] : null;
              if (status === 'offline') {
                itemEl.classList.add('offline');
              } else {
                itemEl.classList.remove('offline');
              }
            }
          });
        }
      }
      
      // 设置定期轻微跳动效果（即使数字不变也跳动）
      if (!window.continuousAnimation) {
        window.continuousAnimation = setInterval(() => {
          // 随机触发轻微跳动（约每3-8秒一次）
          if (Math.random() < 0.3) {
            const onlineEl = document.getElementById('onlineCount');
            const offlineEl = document.getElementById('offlineCount');
            
            if (onlineEl) {
              onlineEl.style.transition = 'all 0.2s ease';
              onlineEl.style.transform = 'translateY(-1px) scale(1.02)';
              setTimeout(() => {
                onlineEl.style.transform = 'translateY(0) scale(1)';
              }, 200);
            }
            
            if (offlineEl) {
              offlineEl.style.transition = 'all 0.2s ease';
              offlineEl.style.transform = 'translateY(-1px) scale(1.02)';
              setTimeout(() => {
                offlineEl.style.transform = 'translateY(0) scale(1)';
              }, 200);
            }
          }
        }, 3000);
      }
    }
    
    function animateNumber(elementId, targetValue) {
      const element = document.getElementById(elementId);
      const currentValue = parseInt(element.innerText) || 0;
      
      // 即使数字没有变化，也添加轻微的跳动效果
      const shouldUpdateNumber = currentValue !== targetValue;
      
      // 添加优雅的跳动动画
      element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // 第一阶段：轻微上浮
      element.style.transform = 'translateY(-3px) scale(1.08)';
      element.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
      
      setTimeout(() => {
        // 第二阶段：更新数字并轻微下沉
        if (shouldUpdateNumber) {
          element.innerText = targetValue;
        }
        element.style.transform = 'translateY(1px) scale(0.98)';
        
        // 添加颜色闪烁效果
        if (elementId === 'onlineCount') {
          element.style.color = '#22c55e';
        } else if (elementId === 'offlineCount') {
          element.style.color = '#f87171';
        }
        
        setTimeout(() => {
          // 第三阶段：恢复原状
          element.style.transform = 'translateY(0) scale(1)';
          element.style.textShadow = 'none';
          
          // 恢复原色
          if (elementId === 'onlineCount') {
            element.style.color = 'var(--success)';
          } else if (elementId === 'offlineCount') {
            element.style.color = 'var(--error)';
          }
        }, 200);
      }, 200);
    }
    
    // 全局状态存储
    window.itemStatuses = {};

    function editUrl(raw) {
      const itemId = getSafeId(raw);
      const itemEl = document.querySelector('#item-' + itemId);
      
      if (!itemEl) return;
      
      // 检查是否已经在编辑状态（单例约束）
      if (window.editingId === itemId) {
        return; // 如果已经在编辑状态，直接返回，避免重复渲染
      }
      
      // 检查是否正在编辑其他条目，如果是则先取消之前的编辑
      if (window.editingId && window.editingId !== itemId) {
        cancelEdit(window.editingId);
      }
      
      let group = '默认分类', url = raw;
      if (raw.includes(':http')) {
        const idx = raw.indexOf(':http');
        group = raw.substring(0, idx);
        url = raw.substring(idx + 1);
      }
      
      const originalHtml = itemEl.innerHTML;
      // 简化转义逻辑，使用更安全的方法
      const escapedOriginalHtml = originalHtml.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      const escapedRaw = raw.replace(/'/g, "\\'");
      
      // 设置编辑状态
      window.editingId = itemId;
      window.originalValues[itemId] = { group, url, raw, originalHtml };
      
      itemEl.innerHTML = \`
        <div class="edit-mode" style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <input type="text" id="edit-group-\${itemId}" class="input-field" style="padding:8px; font-size:0.85rem;" value="\${group === '默认分类' ? '' : group}" placeholder="分类名称">
          <input type="text" id="edit-url-\${itemId}" class="input-field" style="padding:8px; font-size:0.85rem;" value="\${url}" placeholder="URL">
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button type="button" class="btn" style="background:#475569; padding:5px 12px;" onclick="cancelEdit('\${itemId}')">取消</button>
            <button type="button" class="btn" style="padding:5px 12px;" onclick="saveEdit('\${itemId}', '\${escapedRaw}')">保存</button>
          </div>
        </div>
      \`;
      
      // 自动聚焦到URL输入框
      setTimeout(() => {
        const urlInput = document.getElementById('edit-url-' + itemId);
        if (urlInput) urlInput.focus();
      }, 10);
    }

    function cancelEdit(itemId) {
      const itemEl = document.querySelector('#item-' + itemId);
      
      // 确保取消操作总是能退出编辑状态
      if (itemEl && window.originalValues && window.originalValues[itemId]) {
        // 恢复原始HTML
        itemEl.innerHTML = window.originalValues[itemId].originalHtml;
        
        // 重置编辑状态
        window.editingId = null;
        delete window.originalValues[itemId];
      } else {
        // 如果无法恢复原始状态，至少重置编辑状态
        window.editingId = null;
        if (window.originalValues && window.originalValues[itemId]) {
          delete window.originalValues[itemId];
        }
      }
      
      // 确保编辑状态完全清除
      if (window.editingId === itemId) {
        window.editingId = null;
      }
    }

    async function saveEdit(itemId, oldRaw) {
      const newGroup = document.getElementById('edit-group-' + itemId).value.trim();
      const newUrl = document.getElementById('edit-url-' + itemId).value.trim();
      if (!newUrl) return showToast('URL 不能为空');
      const newRaw = newGroup ? newGroup + ':' + newUrl : newUrl;
      
      const res = await apiFetch('/api/urls', { 
        method: 'POST', 
        body: JSON.stringify({ urls: [newRaw], replace: oldRaw }) 
      });
      if (res && res.ok) {
        showToast('修改成功 / Updated');
        setTimeout(() => location.reload(), 300);
      }
    }

    async function addUrls() {
      const group = document.getElementById('groupName').value.trim();
      const text = document.getElementById('newUrls').value.trim();
      if (!text) return showToast('请输入 URL');
      let urls = text.split('\\n').map(u => u.trim()).filter(u => u.includes('http'));
      if (urls.length === 0) return showToast('无效的 URL');
      if (group) urls = urls.map(u => group + ':' + u);
      
      const res = await apiFetch('/api/urls', { method: 'POST', body: JSON.stringify({ urls: urls }) });
      if (res && res.ok) {
        showToast('添加成功 / Added');
        setTimeout(() => location.reload(), 300);
      }
    }

    let pendingDeleteRaw = null;
    function deleteUrl(raw) {
      const urlOnly = raw.includes(':http') ? raw.substring(raw.indexOf(':http') + 1) : raw;
      pendingDeleteRaw = raw;
      openModal(
        '确认删除 / Confirm Delete',
        '确定要删除监控项目 [' + urlOnly + '] 吗？此操作不可撤销。',
        async () => {
          const res = await apiFetch('/api/urls', {
            method: 'DELETE',
            body: JSON.stringify({ url: pendingDeleteRaw })
          });
          if (res && res.ok) {
            showToast('已删除 / Deleted');
            setTimeout(() => location.reload(), 300);
          }
          closeModal();
        }
      );
    }

    function openModal(title, text, onConfirm) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalText').innerText = text;
      const btn = document.getElementById('modalConfirmBtn');
      btn.onclick = () => {
        closeModal();
        Promise.resolve().then(onConfirm);
      };
      const overlay = document.getElementById('modalOverlay');
      overlay.style.display = 'flex';
      setTimeout(() => overlay.classList.add('modal-active'), 10);
    }

    function closeModal() {
      const overlay = document.getElementById('modalOverlay');
      overlay.classList.remove('modal-active');
      setTimeout(() => overlay.style.display = 'none', 200);
    }

    function copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => showToast('已复制完整URL / Copied full URL'));
    }

    function copyHost(host) {
      navigator.clipboard.writeText(host).then(() => showToast('已复制域名 / Copied host'));
    }

    // 获取状态码解释
    function getStatusExplanation(statusCode) {
      const explanations = {
        '400': '请求错误 - 请求格式不正确',
        '401': '认证失败 - 需要登录或凭据无效',
        '403': '禁止访问 - 没有权限访问此资源',
        '404': '未找到 - 请求的资源不存在',
        '408': '请求超时 - 服务器等待请求时超时',
        '429': '请求过多 - 超过了速率限制',
        '500': '服务器内部错误',
        '501': '未实现 - 服务器不支持该功能',
        '502': '网关错误 - 上游服务器响应无效',
        '503': '服务不可用 - 服务器暂时过载或维护',
        '504': '网关超时 - 上游服务器响应超时',
        '521': 'Web服务器已关闭 - 源站拒绝连接',
        '522': '连接超时 - Cloudflare无法连接到源站',
        '523': '源站已崩溃 - 源站连接已断开',
        '524': '超时错误 - 发生了超时',
        'TIMEOUT': '请求超时 - 目标站点响应缓慢或无响应',
        'ERR': '连接失败 - 无法建立连接'
      };

      return explanations[statusCode] || '未知错误 - 无法确定具体原因';
    }

    function exportConfig() {
      const blob = new Blob([JSON.stringify(allUrls, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sentinel-config.json';
      a.click();
    }

    function logout() {
      openLogoutModal();
    }
    
    function toggleAdmin() {
      const container = document.getElementById('adminContainer');
      const btn = document.getElementById('toggleAdminBtn');
      container.classList.toggle('open');
      
      // 简单的文字切换反馈
      if (container.classList.contains('open')) {
        btn.innerText = "× 关闭面板 / Close Panel";
        btn.style.borderColor = "var(--primary)";
      } else {
        btn.innerText = "+ 添加新监控 / Add New Monitor";
        btn.style.borderColor = "";
      }
    }
    
    function openLogoutModal() {
      const modalHtml = '<div id="logoutOverlay" class="modal-overlay" style="display:flex;">' +
        '<div class="modal login-modal">' +
          '<div class="login-title">🔓 Sentinel</div>' +
          '<div class="login-subtitle">确定要退出登录吗？/ Are you sure you want to logout?</div>' +
          '<div style="text-align:center; margin:20px 0; color:var(--text-muted); font-size:0.9rem;">' +
            '退出后需要重新输入密码才能访问管理面板 / You will need to re-enter your password to access the admin panel' +
          '</div>' +
          '<div class="modal-btns">' +
            '<button class="login-btn" style="background:#475569; margin-bottom:10px;" onclick="closeLogoutModal()">取消 / Cancel</button>' +
            '<button class="login-btn btn-danger" onclick="confirmLogout()">退出 / Logout</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      // 创建临时容器并添加模态框
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = modalHtml;
      document.body.appendChild(tempContainer.firstElementChild);
      
      // 添加动画效果
      setTimeout(() => {
        const overlay = document.getElementById('logoutOverlay');
        if (overlay) overlay.classList.add('modal-active');
      }, 10);
    }
    
    function closeLogoutModal() {
      const overlay = document.getElementById('logoutOverlay');
      overlay.classList.remove('modal-active');
      setTimeout(() => {
        overlay.remove();
      }, 200);
    }
    
    function confirmLogout() {
      localStorage.removeItem('sentinel_pro_pass');
      sessionStorage.removeItem('sentinel_pro_pass');
      location.reload();
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }
    
    // 统计卡点击功能
    function setupStatCards() {
      const offlineCard = document.getElementById('offlineCount').closest('.stat-card');
      if (offlineCard) {
        offlineCard.addEventListener('click', function() {
          const offlineCount = parseInt(document.getElementById('offlineCount').innerText);
          if (offlineCount > 0) {
            navigateToFirstOffline();
          }
        });
      }
    }
    
    function navigateToFirstOffline() {
      // 找到第一个有异常的分类
      const offlineGroups = document.querySelectorAll('.group-header.has-offline');
      if (offlineGroups.length > 0) {
        const firstOfflineGroup = offlineGroups[0];
        const groupId = firstOfflineGroup.closest('.group-container').id.replace('group-', '');
        
        // 展开分类
        const groupEl = document.getElementById('group-' + groupId);
        if (groupEl && groupEl.classList.contains('group-collapsed')) {
          groupEl.classList.remove('group-collapsed');
        }
        
        // 找到分类中的第一个异常项
        const offlineItems = groupEl.querySelectorAll('.monitor-item.offline');
        if (offlineItems.length > 0) {
          const firstOfflineItem = offlineItems[0];
          
          // 滚动到该元素并高亮显示
          firstOfflineItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstOfflineItem.style.transition = 'all 0.3s ease';
          firstOfflineItem.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.3)';
          firstOfflineItem.style.transform = 'scale(1.02)';
          
          // 2秒后移除高亮效果
          setTimeout(() => {
            firstOfflineItem.style.boxShadow = '';
            firstOfflineItem.style.transform = '';
          }, 2000);
        }
      }
    }

    // 启动初始化
    init();

  </script>
</body>
</html>
`;

// --- Backend Logic ---

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled());
});

const CHECK_TIMEOUT_MS = 10000;
const SCHEDULED_CONCURRENCY = 8;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function getAuthPassword() {
  const password = typeof PASSWORD === 'string' ? PASSWORD.trim() : '';
  // 防止使用默认弱密码，要求必须配置环境变量
  if (password === '123456' || password === '') {
    console.warn('Security warning: Using default or empty password is not recommended');
  }
  return password;
}

function extractTargetUrl(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.includes(':http')) return trimmed.substring(trimmed.indexOf(':http') + 1).trim();
  return trimmed;
}

function normalizeTargetUrl(raw) {
  const candidate = extractTargetUrl(raw);
  if (!candidate) return null;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch (e) {
    return null;
  }
}

function isTimeoutError(error) {
  if (!error) return false;
  if (error.name === 'AbortError') return true;
  const msg = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  return msg.includes('abort') || msg.includes('timeout');
}

async function fetchWithTimeout(url, options = {}, timeoutMs = CHECK_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function mapWithConcurrency(items, limit, workerFn) {
  if (!Array.isArray(items) || items.length === 0) return [];
  const results = new Array(items.length);
  let nextIndex = 0;
  const concurrency = Math.max(1, Math.min(limit, items.length));

  const runner = async () => {
    while (true) {
      const current = nextIndex++;
      if (current >= items.length) break;
      results[current] = await workerFn(items[current], current);
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => runner()));
  return results;
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const method = request.method;
  const AUTH_PASSWORD = getAuthPassword();
  const checkAuth = (req) => AUTH_PASSWORD.length > 0 && req.headers.get('X-Password') === AUTH_PASSWORD;

  if (url.pathname.startsWith('/api/') && AUTH_PASSWORD.length === 0) {
    return jsonResponse({ ok: false, error: 'PASSWORD env var is not configured' }, 503);
  }

  if (method === 'GET' && url.pathname === '/api/data') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    const urls = await getUrls();
    const history = await getHistory();
    return jsonResponse({ urls, history });
  }

  if (method === 'POST' && url.pathname === '/api/urls') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response('Bad Request', { status: 400 });
    }
    const replace = body && typeof body.replace === 'string' ? body.replace : null;
    const newUrls = Array.isArray(body && body.urls) ? body.urls.filter(u => typeof u === 'string' && u.trim() !== '') : [];
    if (!replace && newUrls.length === 0) {
      return new Response('No URLs provided', { status: 400 });
    }
    let currentUrls = await getUrls();
    if (replace) {
      currentUrls = currentUrls.filter(u => u !== replace);
    }
    const updatedUrls = newUrls.length > 0 ? [...new Set([...currentUrls, ...newUrls])] : currentUrls;
    await saveUrls(updatedUrls);
    return jsonResponse({ ok: true });
  }

  if (method === 'DELETE' && url.pathname === '/api/urls') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response('Bad Request', { status: 400 });
    }
    const delUrl = body && typeof body.url === 'string' ? body.url : '';
    if (!delUrl) {
      return new Response('No URL provided', { status: 400 });
    }
    let currentUrls = await getUrls();
    const updatedUrls = currentUrls.filter(u => u !== delUrl);
    await saveUrls(updatedUrls);
    return jsonResponse({ ok: true });
  }

  if (method === 'GET' && url.pathname === '/api/check') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    const target = normalizeTargetUrl(url.searchParams.get('url'));
    if (!target) return jsonResponse({ ok: false, status: 'INVALID_URL' }, 400);
    try {
      // 增加超时控制和更宽松的协议处理，确保带端口的 URL 也能正常检测
      const res = await fetchWithTimeout(target, {
        method: 'GET',
        headers: { 'User-Agent': 'Sentinel/3.8' },
        redirect: 'follow'
      });
      return jsonResponse({ ok: res.status < 400, status: res.status });
    } catch (e) {
      return jsonResponse({ ok: false, status: isTimeoutError(e) ? 'TIMEOUT' : 'ERR' });
    }
  }

  return new Response(HTML_PAGE, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

async function getUrls() {
  try {
    const data = await SENTINEL_KV.get('urls');
    return data ? JSON.parse(data) : DEFAULT_URLS;
  } catch (e) { return DEFAULT_URLS; }
}

async function saveUrls(urls) {
  await SENTINEL_KV.put('urls', JSON.stringify(urls));
}

async function getHistory() {
  try {
    const data = await SENTINEL_KV.get('history');
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
}

async function handleScheduled() {
  const urls = await getUrls();
  let history = await getHistory();
  let alertStatusRaw = await SENTINEL_KV.get('alert_status');
  let alertStatus;
  try {
    alertStatus = alertStatusRaw ? JSON.parse(alertStatusRaw) : {};
  } catch (e) {
    alertStatus = {};
  }
  
  const TG_TOKEN = typeof TELEGRAM_TOKEN !== 'undefined' ? TELEGRAM_TOKEN : '';
  const TG_CHAT = typeof CHAT_ID !== 'undefined' ? CHAT_ID : '';
  const DISCORD_URL = typeof DISCORD_WEBHOOK !== 'undefined' ? DISCORD_WEBHOOK : '';
  const GENERIC_URL = typeof GENERIC_WEBHOOK !== 'undefined' ? GENERIC_WEBHOOK : '';

  const results = await mapWithConcurrency(urls, SCHEDULED_CONCURRENCY, async (raw) => {
    const target = normalizeTargetUrl(raw);
    const normalizedUrl = target || String(raw);
    if (!history[raw]) history[raw] = [];

    if (!target) {
      history[raw].push(0);
      if (history[raw].length > 50) history[raw].shift();
      return { raw, url: normalizedUrl, ok: false, status: 'INVALID_URL' };
    }

    try {
      const res = await fetchWithTimeout(target, {
        method: 'GET',
        headers: { 'User-Agent': 'Sentinel/3.8' },
        redirect: 'follow'
      }, 15000); // 15秒超时
      const ok = res.status < 400;
      history[raw].push(ok ? 1 : 0);
      if (history[raw].length > 50) history[raw].shift();
      return { raw, url: normalizedUrl, ok, status: res.status };
    } catch (e) {
      history[raw].push(0);
      if (history[raw].length > 50) history[raw].shift();
      return { raw, url: normalizedUrl, ok: false, status: isTimeoutError(e) ? 'TIMEOUT' : 'Error' };
    }
  });

  await SENTINEL_KV.put('history', JSON.stringify(history));

  const failed = results.filter(r => !r.ok);
  if (failed.length > 0) {
    let alertMsg = [];
    for (const f of failed) {
      const lastAlert = alertStatus[f.raw] || 0;
      const now = Date.now();
      if (now - lastAlert > 3600000) {
        alertMsg.push("❌ " + f.url + " (状态: " + f.status + ")");
        alertStatus[f.raw] = now;
      }
    }
    if (alertMsg.length > 0) {
      const msg = "⚠️ Sentinel 告警 / Alert\\n\\n" + alertMsg.join("\\n");
      const promises = [];
      if (TG_TOKEN && TG_CHAT) promises.push(sendTG(TG_TOKEN, TG_CHAT, msg));
      if (DISCORD_URL) promises.push(sendDiscord(DISCORD_URL, msg));
      if (GENERIC_URL) promises.push(sendGeneric(GENERIC_URL, msg));
      
      // 使用 Promise.allSettled 避免单个通知失败影响整体
      const results = await Promise.allSettled(promises);
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Notification ${index} failed:`, result.reason);
        }
      });
      await SENTINEL_KV.put('alert_status', JSON.stringify(alertStatus));
    }
  }
}

async function sendTG(token, chat_id, text) {
  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text: text, parse_mode: 'Markdown' })
  });
}

async function sendDiscord(url, text) {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text })
  });
}

async function sendGeneric(url, text) {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text, msg_type: "text", content: { text: text } })
  });
}
