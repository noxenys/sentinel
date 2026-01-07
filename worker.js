const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const net = require('net');
const dns = require('dns').promises;

// ============================================================================
// SENTINEL v3.8 - Advanced Network Monitoring System
// ============================================================================

class NetworkMonitor {
    constructor(config = {}) {
        this.config = {
            checkInterval: config.checkInterval || 5000,
            timeout: config.timeout || 3000,
            port: config.port || 3000,
            ...config
        };
        
        this.servers = [];
        this.results = new Map();
        this.history = [];
        this.isRunning = false;
        this.checkStartTime = null;
        this.lastCheckDuration = 0;
        
        // Counter variables
        this.onlineCount = 0;
        this.offlineCount = 0;
        this.totalChecks = 0;
        this.totalOnline = 0;
        this.totalOffline = 0;
    }
    
    /**
     * Add a server to monitor
     */
    addServer(hostname, port = 80, protocol = 'http') {
        this.servers.push({ hostname, port, protocol });
    }
    
    /**
     * Add multiple servers
     */
    addServers(serverList) {
        serverList.forEach(server => {
            this.addServer(server.hostname, server.port || 80, server.protocol || 'http');
        });
    }
    
    /**
     * Check single host connectivity
     */
    async checkHost(hostname, port, protocol = 'http') {
        try {
            // Try DNS resolution first
            const address = await dns.resolve4(hostname);
            if (!address || address.length === 0) {
                return { status: 'offline', reason: 'DNS resolution failed' };
            }
            
            // Try TCP connection
            return await this.checkTcpConnection(hostname, port);
        } catch (error) {
            // Try TCP connection as fallback
            try {
                return await this.checkTcpConnection(hostname, port);
            } catch (tcpError) {
                return { status: 'offline', reason: error.message };
            }
        }
    }
    
    /**
     * Check TCP connection to a host
     */
    checkTcpConnection(hostname, port) {
        return new Promise((resolve) => {
            const socket = net.createConnection({ host: hostname, port, timeout: this.config.timeout });
            
            let resolved = false;
            
            const handleSuccess = () => {
                resolved = true;
                socket.destroy();
                resolve({ status: 'online', latency: Date.now() - startTime });
            };
            
            const handleError = (error) => {
                if (!resolved) {
                    resolved = true;
                    socket.destroy();
                    resolve({ status: 'offline', reason: error.message });
                }
            };
            
            const startTime = Date.now();
            
            socket.on('connect', handleSuccess);
            socket.on('error', handleError);
            socket.on('timeout', () => {
                if (!resolved) {
                    resolved = true;
                    socket.destroy();
                    resolve({ status: 'offline', reason: 'Connection timeout' });
                }
            });
        });
    }
    
    /**
     * Check all servers - FIXED: Properly reset counters and use Promise.all()
     */
    async checkAll() {
        this.checkStartTime = Date.now();
        
        // CRITICAL FIX: Reset counters at the start of each detection cycle
        this.onlineCount = 0;
        this.offlineCount = 0;
        
        try {
            // Use Promise.all() for proper synchronization
            const checkPromises = this.servers.map(server =>
                this.checkHost(server.hostname, server.port, server.protocol)
                    .then(result => ({
                        server: server.hostname,
                        port: server.port,
                        ...result,
                        timestamp: new Date().toISOString()
                    }))
                    .catch(error => ({
                        server: server.hostname,
                        port: server.port,
                        status: 'offline',
                        reason: error.message,
                        timestamp: new Date().toISOString()
                    }))
            );
            
            // Wait for all checks to complete
            const results = await Promise.all(checkPromises);
            
            // Update counters based on results
            results.forEach(result => {
                if (result.status === 'online') {
                    this.onlineCount++;
                    this.totalOnline++;
                } else {
                    this.offlineCount++;
                    this.totalOffline++;
                }
                
                this.results.set(result.server, result);
            });
            
            this.totalChecks++;
            this.lastCheckDuration = Date.now() - this.checkStartTime;
            
            // Store in history
            this.history.push({
                timestamp: new Date(),
                online: this.onlineCount,
                offline: this.offlineCount,
                duration: this.lastCheckDuration
            });
            
            // Keep only last 1000 entries
            if (this.history.length > 1000) {
                this.history.shift();
            }
            
            return {
                online: this.onlineCount,
                offline: this.offlineCount,
                total: this.servers.length,
                duration: this.lastCheckDuration,
                results: Array.from(this.results.values())
            };
        } catch (error) {
            this.lastCheckDuration = Date.now() - this.checkStartTime;
            return {
                online: this.onlineCount,
                offline: this.offlineCount,
                total: this.servers.length,
                duration: this.lastCheckDuration,
                error: error.message
            };
        }
    }
    
    /**
     * Start continuous monitoring
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        console.log(`[Sentinel] Starting network monitoring (interval: ${this.config.checkInterval}ms)`);
        
        // Initial check
        this.checkAll();
        
        // Schedule periodic checks
        this.interval = setInterval(() => {
            this.checkAll();
        }, this.config.checkInterval);
    }
    
    /**
     * Stop monitoring
     */
    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.interval);
        console.log('[Sentinel] Monitoring stopped');
    }
    
    /**
     * Get current statistics
     */
    getStats() {
        return {
            online: this.onlineCount,
            offline: this.offlineCount,
            total: this.servers.length,
            uptime: ((this.onlineCount / this.servers.length) * 100).toFixed(2) + '%',
            totalChecks: this.totalChecks,
            totalOnline: this.totalOnline,
            totalOffline: this.totalOffline,
            averageOnlinePerCheck: (this.totalOnline / (this.totalChecks || 1)).toFixed(2),
            lastCheckDuration: this.lastCheckDuration + 'ms',
            statusDetails: Array.from(this.results.values())
        };
    }
    
    /**
     * Get history
     */
    getHistory(limit = 100) {
        return this.history.slice(-limit);
    }
}

// ============================================================================
// WEB SERVER & DASHBOARD
// ============================================================================

const monitor = new NetworkMonitor({
    checkInterval: 5000,
    timeout: 3000,
    port: 3000
});

// Add example servers to monitor
const serversToMonitor = [
    { hostname: 'google.com', port: 80 },
    { hostname: 'github.com', port: 443 },
    { hostname: 'cloudflare.com', port: 80 },
    { hostname: 'example.com', port: 80 },
    { hostname: 'localhost', port: 3000 }
];

monitor.addServers(serversToMonitor);

// ============================================================================
// HTML DASHBOARD
// ============================================================================

const getDashboardHTML = () => {
    const stats = monitor.getStats();
    const uptime = stats.uptime;
    const statusColor = stats.online > 0 ? '#10b981' : '#ef4444';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sentinel v3.8 - Network Monitor</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }
        
        header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .stat-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #999;
            font-size: 0.9em;
        }
        
        .status-online {
            color: #10b981;
        }
        
        .status-offline {
            color: #ef4444;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            transition: width 0.3s ease;
        }
        
        .servers-section {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .servers-section h2 {
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .server-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.3s ease;
        }
        
        .server-item:hover {
            background: #f9f9f9;
        }
        
        .server-item:last-child {
            border-bottom: none;
        }
        
        .server-name {
            font-weight: 500;
            color: #333;
        }
        
        .server-port {
            color: #999;
            font-size: 0.9em;
            margin-left: 10px;
        }
        
        .server-status {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .status-indicator.online {
            background: #10b981;
        }
        
        .status-indicator.offline {
            background: #ef4444;
        }
        
        .status-text {
            font-weight: 500;
            min-width: 70px;
            text-align: right;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 currentColor;
            }
            70% {
                box-shadow: 0 0 0 6px rgba(0, 0, 0, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            }
        }
        
        .auto-refresh {
            text-align: center;
            color: white;
            margin-top: 20px;
            font-size: 0.9em;
        }
        
        .chart-container {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-top: 20px;
        }
        
        .chart-container h2 {
            color: #667eea;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🛡️ Sentinel v3.8</h1>
            <p>Advanced Network Monitoring System</p>
        </header>
        
        <div class="grid">
            <div class="card">
                <h3>Online Servers</h3>
                <div class="stat-value status-online">${stats.online}</div>
                <div class="stat-label">of ${stats.total} servers</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(stats.online / stats.total) * 100}%"></div>
                </div>
            </div>
            
            <div class="card">
                <h3>Offline Servers</h3>
                <div class="stat-value status-offline">${stats.offline}</div>
                <div class="stat-label">of ${stats.total} servers</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="background: linear-gradient(90deg, #ef4444, #dc2626); width: ${(stats.offline / stats.total) * 100}%"></div>
                </div>
            </div>
            
            <div class="card">
                <h3>Overall Uptime</h3>
                <div class="stat-value" style="color: ${statusColor}">${uptime}</div>
                <div class="stat-label">Based on current check</div>
            </div>
            
            <div class="card">
                <h3>Total Checks</h3>
                <div class="stat-value">${stats.totalChecks}</div>
                <div class="stat-label">Monitoring cycles completed</div>
            </div>
            
            <div class="card">
                <h3>Last Check Duration</h3>
                <div class="stat-value">${stats.lastCheckDuration}</div>
                <div class="stat-label">Execution time</div>
            </div>
            
            <div class="card">
                <h3>Average Online</h3>
                <div class="stat-value">${stats.averageOnlinePerCheck}</div>
                <div class="stat-label">servers per check</div>
            </div>
        </div>
        
        <div class="servers-section">
            <h2>📡 Server Status</h2>
            ${stats.statusDetails.map(detail => `
                <div class="server-item">
                    <div>
                        <span class="server-name">${detail.server}</span>
                        <span class="server-port">:${detail.port}</span>
                    </div>
                    <div class="server-status">
                        <div class="status-indicator ${detail.status}"></div>
                        <span class="status-text status-${detail.status}">${detail.status.toUpperCase()}</span>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="auto-refresh">
            <p>⏟ Auto-refreshing every 5 seconds | Last updated: ${new Date().toLocaleTimeString()}</p>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 5 seconds
        setTimeout(() => {
            location.reload();
        }, 5000);
    </script>
</body>
</html>
    `;
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // =====================================================================
    // ROUTES
    // =====================================================================
    
    // Dashboard
    if (url === '/' || url === '/dashboard') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(getDashboardHTML());
        return;
    }
    
    // API: Get current statistics
    if (url === '/api/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(monitor.getStats(), null, 2));
        return;
    }
    
    // API: Get current status
    if (url === '/api/status') {
        const stats = monitor.getStats();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: stats.online > 0 ? 'operational' : 'degraded',
            online: stats.online,
            offline: stats.offline,
            total: stats.total,
            uptime: stats.uptime,
            timestamp: new Date().toISOString()
        }, null, 2));
        return;
    }
    
    // API: Get server details
    if (url === '/api/servers') {
        const stats = monitor.getStats();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            servers: stats.statusDetails,
            summary: {
                online: stats.online,
                offline: stats.offline,
                total: stats.total
            }
        }, null, 2));
        return;
    }
    
    // API: Get history
    if (url.startsWith('/api/history')) {
        const limit = parseInt(req.url.split('limit=')[1]) || 100;
        const history = monitor.getHistory(limit);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ history }, null, 2));
        return;
    }
    
    // API: Get specific server status
    if (url.startsWith('/api/server/')) {
        const hostname = url.split('/api/server/')[1];
        const stats = monitor.getStats();
        const serverStatus = stats.statusDetails.find(s => s.server === hostname);
        
        if (serverStatus) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(serverStatus, null, 2));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server not found' }, null, 2));
        }
        return;
    }
    
    // API: Trigger manual check
    if (url === '/api/check') {
        monitor.checkAll().then(result => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result, null, 2));
        });
        return;
    }
    
    // API: Get health
    if (url === '/api/health') {
        const stats = monitor.getStats();
        const isHealthy = stats.online === stats.total;
        res.writeHead(isHealthy ? 200 : 503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            healthy: isHealthy,
            online: stats.online,
            offline: stats.offline,
            total: stats.total
        }, null, 2));
        return;
    }
    
    // API: Get monitoring info
    if (url === '/api/info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            name: 'Sentinel v3.8',
            version: '3.8.0',
            description: 'Advanced Network Monitoring System',
            uptime: process.uptime(),
            checkInterval: monitor.config.checkInterval,
            timeout: monitor.config.timeout,
            monitoredServers: monitor.servers.length,
            startTime: new Date(Date.now() - process.uptime() * 1000).toISOString()
        }, null, 2));
        return;
    }
    
    // 404 Handler
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET  /',
            'GET  /dashboard',
            'GET  /api/stats',
            'GET  /api/status',
            'GET  /api/servers',
            'GET  /api/server/:hostname',
            'GET  /api/history?limit=100',
            'GET  /api/check',
            'GET  /api/health',
            'GET  /api/info'
        ]
    }, null, 2));
});

// ============================================================================
// STARTUP
// ============================================================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`\n${'='.repeat(70)}`);
    console.log('🛡️  SENTINEL v3.8 - Advanced Network Monitoring System');
    console.log(`${'='.repeat(70)}`);
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`✓ API Documentation: http://localhost:${PORT}/api/info`);
    console.log(`\n📡 Monitoring ${monitor.servers.length} servers:`);
    monitor.servers.forEach(s => {
        console.log(`   • ${s.hostname}:${s.port}`);
    });
    console.log(`\n⏱️  Check interval: ${monitor.config.checkInterval}ms`);
    console.log(`⏱️  Connection timeout: ${monitor.config.timeout}ms`);
    console.log(`\n${'='.repeat(70)}\n`);
    
    // Start monitoring
    monitor.start();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down Sentinel...');
    monitor.stop();
    server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
    });
});

module.exports = { NetworkMonitor, monitor };
