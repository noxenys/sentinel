/**
 * Sentinel v3.8 - High-Frequency Dynamic Edition
 * Powered by Noxen YS & Manus AI
 * 
 * Features: 
 * - High-Frequency Dynamic Monitoring (3-5s interval)
 * - In-place Editing (Directly edit in the list)
 * - Multi-platform Alerts (TG, Discord, Webhook)
 * - Alert Throttling (1h cooling)
 * - Uptime History Bar (50 records)
 * - Real-time Latency Tracking with Visual Feedback
 * - Smart Categorization & Accordion UI
 * - Modern Custom Modals
 * - Bilingual UI & Local Clock
 */

const DEFAULT_URLS = []; 

const HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sentinel | Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --success: #10b981;
      --error: #ef4444;
      --border: rgba(255, 255, 255, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg);
      background-image: radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent),
                        radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.05), transparent);
      color: var(--text-main);
      line-height: 1.6;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 40px; }
    h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.05em; margin-bottom: 8px; background: linear-gradient(to bottom right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { color: var(--text-muted); font-size: 1rem; font-weight: 500; }
    
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      backdrop-filter: blur(16px);
    }
    .stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; font-weight: 600; }
    .stat-value { font-size: 2rem; font-weight: 800; }

    .group-container { margin-bottom: 24px; }
    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 24px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 16px;
      cursor: pointer;
      user-select: none;
    }
    .group-header:hover { background: rgba(255, 255, 255, 0.06); border-color: var(--primary); }
    .group-title { font-weight: 700; font-size: 0.95rem; color: #fff; display: flex; align-items: center; gap: 12px; }
    .group-arrow { transition: transform 0.3s; }
    .group-collapsed .group-arrow { transform: rotate(-90deg); }
    .group-content { margin-top: 12px; display: flex; flex-direction: column; gap: 12px; }
    .group-collapsed .group-content { display: none; }

    .monitor-item {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      transition: all 0.3s ease;
    }
    .monitor-item:hover { border-color: var(--primary); transform: translateY(-2px); }
    
    .item-main { display: flex; justify-content: space-between; align-items: center; }
    .url-info { display: flex; flex-direction: column; gap: 6px; overflow: hidden; flex: 1; }
    .url-text { font-weight: 600; font-size: 1.05rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff; }
    
    .status-row { display: flex; align-items: center; gap: 12px; }
    .status-badge { font-size: 0.65rem; padding: 3px 10px; border-radius: 6px; font-weight: 700; text-transform: uppercase; }
    .status-online { background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.2); }
    .status-online { background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.2); }
    .status-offline { background: rgba(239, 68, 68, 0.15); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.2); }
    .latency { font-size: 0.75rem; color: #38bdf8; font-family: monospace; transition: all 0.3s ease; font-weight: 600; }
    .latency-update { color: #fff; text-shadow: 0 0 8px var(--primary); }

    .history-bar { display: flex; gap: 4px; margin-top: 14px; }
    .history-dot { width: 100%; height: 5px; border-radius: 3px; background: rgba(255,255,255,0.05); }
    .dot-online { background: var(--success); opacity: 0.7; }
    .dot-offline { background: var(--error); opacity: 0.9; }

    .actions { display: flex; gap: 10px; }
    .btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.85rem;
    }
    .btn:hover { background: var(--primary-hover); }
    .btn-icon { background: rgba(255,255,255,0.05); color: var(--text-muted); padding: 8px; border: 1px solid var(--border); }
    .btn-danger { background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.2); }

    .admin-panel { margin-top: 50px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 30px; }
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
    
    .toast {
      position: fixed; bottom: 30px; right: 30px;
      background: #1e293b; color: white; padding: 14px 28px;
      border-radius: 12px; border: 1px solid var(--border);
      display: none; z-index: 1000;
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
    .modal-btns { display: flex; gap: 12px; justify-content: center; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Sentinel</h1>
      <p class="subtitle">智能在线哨兵 · 生产级监控</p>
      <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; opacity: 0.6;">Powered by Noxen YS & Manus AI</p>
      <div id="liveClock" style="margin-top: 15px; font-family: monospace; color: var(--primary); font-weight: 600; font-size: 1.1rem; letter-spacing: 1px;"></div>
    </header>

    <div class="stats">
      <div class="stat-card"><div class="stat-label">总监控</div><div class="stat-value" id="totalCount">0</div></div>
      <div class="stat-card"><div class="stat-label">在线</div><div class="stat-value" style="color:var(--success)" id="onlineCount">0</div></div>
      <div class="stat-card"><div class="stat-label">异常</div><div class="stat-value" style="color:var(--error)" id="offlineCount">0</div></div>
    </div>

    <div id="monitorList"></div>

    <div class="admin-panel">
      <h3 style="margin-bottom:20px; font-weight:700;">管理面板 / Admin Panel</h3>
      <div class="input-group">
        <input type="text" id="groupName" class="input-field" placeholder="分类名称 / Group Name (e.g. Production, Personal)">
        <textarea id="newUrls" class="input-field" style="min-height: 100px;" placeholder="输入 URL，每行一个 / Enter URLs, one per line"></textarea>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:12px;">
          <button class="btn" id="addBtn" onclick="addUrls()">批量添加 / Add</button>
          <button class="btn" style="background:#475569" onclick="exportConfig()">导出 / Export</button>
        </div>
        <button class="btn btn-danger" onclick="logout()">退出 / Logout</button>
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

  <script>
    let allUrls = [];
    let historyData = {};
    
    function getSafeId(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return 'id-' + Math.abs(hash);
    }

    async function apiFetch(path, options = {}) {
      let password = localStorage.getItem('sentinel_pro_pass');
      if (!password && path !== '/api/data') {
        password = prompt('请输入管理密码 / Please enter admin password:');
        if (password) localStorage.setItem('sentinel_pro_pass', password);
      }
      options.headers = options.headers || {};
      options.headers['X-Password'] = password || '';
      const res = await fetch(path, options);
      if (res.status === 401) {
        localStorage.removeItem('sentinel_pro_pass');
        const pass = prompt('密码错误，请重新输入 / Incorrect password:');
        if (pass) {
          localStorage.setItem('sentinel_pro_pass', pass);
          return apiFetch(path, options);
        }
      }
      return res;
    }

    async function init() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        allUrls = data.urls || [];
        historyData = data.history || {};
        render();
        checkAll();
      } catch (e) { console.error(e); }
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
      let html = '';
      for (const groupName in groups) {
        const items = groups[groupName];
        const groupId = getSafeId(groupName);
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
          itemsHtml += \`
            <div class="monitor-item" id="item-\${itemId}">
              <div class="item-main">
                <div class="url-info">
                  <div class="url-text" title="\${item.url}">\${item.url}</div>
                  <div class="status-row">
                    <span id="status-\${itemId}" class="status-badge status-checking">检测中...</span>
                    <span id="latency-\${itemId}" class="latency"></span>
                  </div>
                </div>
                <div class="actions">
                  <button class="btn btn-icon" onclick="copyUrl('\${item.url}')" title="复制">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                  <button class="btn btn-icon" onclick="editUrl('\${item.raw.replace(/'/g, "\\\\\\\\'")}')" title="编辑">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button class="btn btn-danger" onclick="deleteUrl('\${item.raw.replace(/'/g, "\\\\\\\\'")}')">删除</button>
                </div>
              </div>
              <div class="history-bar">\${dotsHtml}</div>
            </div>
          \`;
        });
        html += \`
          <div class="group-container" id="group-\${groupId}">
            <div class="group-header" onclick="toggleGroup('\${groupId}')">
              <div class="group-title">
                <svg class="group-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
                \${groupName} (\${items.length})
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

    async function checkAll() {
      let online = 0, offline = 0;
      const checkOne = async (item) => {
        let url = item;
        if (item.includes(':http')) url = item.substring(item.indexOf(':http') + 1);
        const itemId = getSafeId(item);
        const badge = document.getElementById('status-' + itemId);
        const latEl = document.getElementById('latency-' + itemId);
        
        const runCheck = async () => {
          const start = Date.now();
          try {
            const res = await fetch('/api/check?url=' + encodeURIComponent(url));
            const data = await res.json();
            const latency = Date.now() - start;
            if (badge) {
              if (data.ok) {
                badge.innerText = 'ONLINE ' + data.status;
                badge.className = 'status-badge status-online';
                latEl.innerText = latency + 'ms';
                latEl.classList.add('latency-update');
                setTimeout(() => { latEl.classList.remove('latency-update'); }, 500);
                online++;
              } else {
                badge.innerText = 'OFFLINE ' + (data.status || 'ERR');
                badge.className = 'status-badge status-offline';
                offline++;
              }
            }
          } catch (e) { offline++; }
          document.getElementById('onlineCount').innerText = online;
          document.getElementById('offlineCount').innerText = offline;
        };

        await runCheck();
        // 开启高频循环检测，每 3-5 秒更新一次延迟，增强实时动感
        setInterval(runCheck, 3000 + Math.random() * 2000);
      };

      allUrls.forEach(item => checkOne(item));
    }

    function editUrl(raw) {
      const itemId = getSafeId(raw);
      const itemEl = document.querySelector('#item-' + itemId);
      let group = '默认分类', url = raw;
      if (raw.includes(':http')) {
        const idx = raw.indexOf(':http');
        group = raw.substring(0, idx);
        url = raw.substring(idx + 1);
      }
      
      const originalHtml = itemEl.innerHTML;
      itemEl.innerHTML = \`
        <div class="edit-mode" style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <input type="text" id="edit-group-\${itemId}" class="input-field" style="padding:8px; font-size:0.85rem;" value="\${group === '默认分类' ? '' : group}" placeholder="分类名称">
          <input type="text" id="edit-url-\${itemId}" class="input-field" style="padding:8px; font-size:0.85rem;" value="\${url}" placeholder="URL">
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button class="btn" style="background:#475569; padding:5px 12px;" onclick="cancelEdit('\${itemId}', \\\`\${originalHtml.replace(/\\\`/g, '\\\\\\\\\\\`').replace(/\\$/g, '\\\\\\\\$')}\\\`)">取消</button>
            <button class="btn" style="padding:5px 12px;" onclick="saveEdit('\${itemId}', '\${raw.replace(/'/g, "\\\\\\\\'")}')">保存</button>
          </div>
        </div>
      \`;
    }

    function cancelEdit(itemId, originalHtml) {
      document.querySelector('#item-' + itemId).innerHTML = originalHtml;
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
        setTimeout(() => location.reload(), 800);
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
        setTimeout(() => location.reload(), 800);
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
            setTimeout(() => location.reload(), 500);
          }
          closeModal();
        }
      );
    }

    function openModal(title, text, onConfirm) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalText').innerText = text;
      const btn = document.getElementById('modalConfirmBtn');
      btn.onclick = onConfirm;
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
      navigator.clipboard.writeText(url).then(() => showToast('已复制 / Copied'));
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
      if (confirm('确定要退出登录吗？\\nAre you sure?')) {
        localStorage.removeItem('sentinel_pro_pass');
        location.reload();
      }
    }

    function updateClock() {
      const now = new Date();
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const el = document.getElementById('liveClock');
      if (el) el.innerText = now.toLocaleString(undefined, options);
    }
    setInterval(updateClock, 1000);
    updateClock();

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }
    init();
  </script>
</body>
</html>
\`;

// --- Backend Logic ---

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled());
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const method = request.method;
  const AUTH_PASSWORD = typeof PASSWORD !== 'undefined' ? PASSWORD : '123456';
  const checkAuth = (req) => req.headers.get('X-Password') === AUTH_PASSWORD;

  if (method === 'GET' && url.pathname === '/api/data') {
    const urls = await getUrls();
    const history = await getHistory();
    return new Response(JSON.stringify({ urls, history }), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'POST' && url.pathname === '/api/urls') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    const { urls: newUrls, replace } = await request.json();
    let currentUrls = await getUrls();
    if (replace) {
      currentUrls = currentUrls.filter(u => u !== replace);
    }
    const updatedUrls = [...new Set([...currentUrls, ...newUrls])];
    await saveUrls(updatedUrls);
    return new Response(JSON.stringify({ ok: true }));
  }

  if (method === 'DELETE' && url.pathname === '/api/urls') {
    if (!checkAuth(request)) return new Response('Unauthorized', { status: 401 });
    const { url: delUrl } = await request.json();
    let currentUrls = await getUrls();
    const updatedUrls = currentUrls.filter(u => u !== delUrl);
    await saveUrls(updatedUrls);
    return new Response(JSON.stringify({ ok: true }));
  }

  if (method === 'GET' && url.pathname === '/api/check') {
    const target = url.searchParams.get('url');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(target, { 
        method: 'GET', 
        headers: { 'User-Agent': 'Sentinel/3.8' }, 
        redirect: 'follow',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return new Response(JSON.stringify({ ok: res.status < 400, status: res.status }));
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, status: e.message === 'Request aborted' ? 'TIMEOUT' : 'ERR' }));
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
  let alertStatus = await SENTINEL_KV.get('alert_status') ? JSON.parse(await SENTINEL_KV.get('alert_status')) : {};
  
  const TG_TOKEN = typeof TELEGRAM_TOKEN !== 'undefined' ? TELEGRAM_TOKEN : '';
  const TG_CHAT = typeof CHAT_ID !== 'undefined' ? CHAT_ID : '';
  const DISCORD_URL = typeof DISCORD_WEBHOOK !== 'undefined' ? DISCORD_WEBHOOK : '';
  const GENERIC_URL = typeof GENERIC_WEBHOOK !== 'undefined' ? GENERIC_WEBHOOK : '';

  let results = [];
  await Promise.all(urls.map(async (raw) => {
    let url = raw;
    if (raw.includes(':http')) url = raw.substring(raw.indexOf(':http') + 1);
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Sentinel-Monitor/3.8' } });
      const ok = res.status < 400;
      results.push({ raw, url, ok, status: res.status });
      if (!history[raw]) history[raw] = [];
      history[raw].push(ok ? 1 : 0);
      if (history[raw].length > 50) history[raw].shift();
    } catch (e) {
      results.push({ raw, url, ok: false, status: 'Error' });
      if (!history[raw]) history[raw] = [];
      history[raw].push(0);
      if (history[raw].length > 50) history[raw].shift();
    }
  }));

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
      await Promise.all(promises);
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
