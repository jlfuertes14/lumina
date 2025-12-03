// pages/AdminPage.js
export const AdminPage = () => {
    // Redirect if not admin
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        setTimeout(() => window.navigate('home'), 0);
        return '';
    }
    // Calculate Metrics
    const totalSales = state.orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = state.orders.length;
    const lowStockCount = state.products.filter(p => p.stock < 10).length;
    const activeCustomers = state.users.filter(u => u.role === 'customer').length;
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
                </nav>
            </aside>
            <!-- Main Content -->
            <main class="admin-main">
                <div class="admin-page-header">
                    <h1 class="admin-title">Overview</h1>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span class="text-muted">Welcome, ${state.currentUser.name}</span>
                        <div style="width: 32px; height: 32px; background: #0B1E3B; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            A
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
                                <div class="stat-value">${activeCustomers}</div>
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