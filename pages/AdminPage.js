import { formatCurrency } from '../src/utils.js';
// pages/AdminPage.js
export const AdminPage = (state) => {
    // Redirect if not admin
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        setTimeout(() => window.navigate('home'), 0);
        return '';
    }
    // Calculate Metrics
    const totalSales = state.orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = state.orders.length;
    const lowStockCount = state.products.filter(p => p.stock < 10).length;
    const activeCustomersCount = state.users ? state.users.filter(u => u.role === 'customer').length : 0;
    // Recent Orders
    const recentOrders = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    return `
        <div class="admin-container">
            <!-- Sidebar -->
            <aside class="admin-sidebar">
                <div class="sidebar-header">
                    <span>Admin Dashboard</span>
                </div>
                <nav class="sidebar-nav">
                    <div class="sidebar-item active">
                        <span>📊</span> Dashboard
                    </div>
                    <div class="sidebar-item" onclick="window.showToast('Inventory feature coming soon')">
                        <span>📦</span> Inventory
                    </div>
                    <div class="sidebar-item" onclick="window.showToast('Analytics feature coming soon')">
                        <span>📈</span> Analytics
                    </div>
                    <div class="sidebar-item" onclick="window.showToast('Settings feature coming soon')">
                        <span>⚙️</span> Settings
                    </div>
                    
                    <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div class="sidebar-item" onclick="window.navigate('home')">
                            <span>🏠</span> Back to Home
                        </div>
                    </div>
                </nav>
            </aside>
            <!-- Main Content -->
            <main class="admin-main">
                <div class="admin-page-header">
                    <div>
                        <h1 class="admin-title">Overview</h1>
                        <p class="text-muted" style="margin: 0; font-size: 0.9rem;">Welcome back, ${state.currentUser.name}</p>
                    </div>
                    <!-- EMBEDDED SEARCH BAR -->
                    <div style="flex: 1; max-width: 400px; margin: 0 2rem;">
                        <div class="search-container" style="background: white; border: 1px solid #e2e8f0;">
                            <input type="text" class="search-input" placeholder="Search orders, products..." 
                                style="background: transparent;"
                                onkeyup="if(event.key === 'Enter') window.showToast('Global search coming soon')">
                            <button class="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 40px; height: 40px; background: #0B1E3B; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
                            ${state.currentUser.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
                <!-- Stats Row -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div>
                                <div class="stat-title">Total Sales</div>
                                <div class="stat-value">${formatCurrency(totalSales)}</div>
                            </div>
                            <div class="stat-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">💰</div>
                        </div>
                        <div class="trend-indicator trend-up">
                            <span>↑ 12%</span> <span class="text-muted" style="font-weight: normal;">vs last month</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-header">
                            <div>
                                <div class="stat-title">New Orders</div>
                                <div class="stat-value">${totalOrders}</div>
                            </div>
                            <div class="stat-icon" style="background: rgba(6, 182, 212, 0.1); color: #06b6d4;">📄</div>
                        </div>
                        <div class="trend-indicator trend-up">
                            <span>↑ 5%</span> <span class="text-muted" style="font-weight: normal;">vs last week</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-header">
                            <div>
                                <div class="stat-title">Low Stock Items</div>
                                <div class="stat-value">${lowStockCount}</div>
                            </div>
                            <div class="stat-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">⚠️</div>
                        </div>
                        <div class="trend-indicator ${lowStockCount > 0 ? 'trend-down' : 'trend-up'}">
                            <span>${lowStockCount} items</span> <span class="text-muted" style="font-weight: normal;">need attention</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-header">
                            <div>
                                <div class="stat-title">Active Customers</div>
                                <div class="stat-value">${activeCustomersCount}</div>
                            </div>
                            <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">👥</div>
                        </div>
                        <div class="trend-indicator trend-up">
                            <span>↑ 3%</span> <span class="text-muted" style="font-weight: normal;">vs last month</span>
                        </div>
                    </div>
                </div>
                <!-- Charts Row -->
                <div class="charts-grid">
                    <!-- Sales Chart -->
                    <div class="chart-card">
                        <h3 class="font-bold text-slate-800 mb-4">Sales Overview</h3>
                        <div style="height: 300px;">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>
                    <!-- Demographics Chart -->
                    <div class="chart-card">
                        <h3 class="font-bold text-slate-800 mb-4">Customers</h3>
                        <div style="height: 300px; display: flex; justify-content: center;">
                            <canvas id="demographicsChart"></canvas>
                        </div>
                    </div>
                </div>
                <!-- Recent Orders -->
                <div class="table-card">
                    <h3 class="font-bold text-slate-800 mb-4">Recent Orders</h3>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recentOrders.map(order => `
                                <tr>
                                    <td>#${order.orderId}</td>
                                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>${state.users.find(u => u.id === order.userId)?.name || 'Unknown'}</td>
                                    <td>${formatCurrency(order.total)}</td>
                                    <td><span class="status-badge status-${order.status?.toLowerCase() || 'pending'}">${order.status || 'Pending'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    `;
};

// Initialize Charts Function
window.initAdminCharts = () => {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Sales',
                    data: [4000, 3000, 5000, 2780, 6890, 2390, 3490],
                    borderColor: '#3b82f6',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { borderDash: [2, 4] } }, x: { grid: { display: false } } }
            }
        });
    }
    // Demographics Chart
    const demoCtx = document.getElementById('demographicsChart');
    if (demoCtx) {
        new Chart(demoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [400, 300, 100],
                    backgroundColor: ['#0F172A', '#F97316', '#CBD5E1'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
};