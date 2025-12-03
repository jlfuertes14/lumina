import { formatCurrency } from '../src/utils.js';

// pages/AdminPage.js
export const AdminPage = (state) => {
    // Redirect if not admin
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        setTimeout(() => window.navigate('home'), 0);
        return '';
    }

    console.log('AdminPage State:', state);

    // Calculate Metrics
    const totalSales = state.orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = state.orders.length;
    const lowStockCount = state.products.filter(p => p.stock < 10).length;
    const activeCustomersCount = state.users ? state.users.filter(u => u.role === 'customer').length : 0;

    // Recent Orders
    const recentOrders = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    return `
        <div class="admin-layout">
            <!-- Top Header Bar -->
            <header class="admin-header">
                <div class="admin-brand">
                    <span class="brand-text">Lumina <span class="brand-highlight">Electronics</span></span>
                </div>
                <div class="admin-header-right">
                    <div class="admin-user-profile">
                        <div class="admin-avatar">
                            ${state.currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="admin-user-info">
                            <span class="admin-name">${state.currentUser.name}</span>
                            <span class="admin-role">Admin</span>
                        </div>
                    </div>
                </div>
            </header>

            <div class="admin-body">
                <!-- Sidebar -->
                <aside class="admin-sidebar">
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
                        <div class="sidebar-item" onclick="window.showToast('Order Management feature coming soon')">
                            <span>📋</span> Order Management
                        </div>
                        <div class="sidebar-item" onclick="window.showToast('Customer Insights feature coming soon')">
                            <span>👥</span> Customer Insights
                        </div>
                        <div class="sidebar-item" onclick="window.showToast('Reports feature coming soon')">
                            <span>📄</span> Reports
                        </div>
                        <div class="sidebar-item" onclick="window.showToast('Settings feature coming soon')">
                            <span>⚙️</span> Settings
                        </div>
                        <div class="sidebar-item logout-item" onclick="window.logout()">
                            <span>🚪</span> Logout
                        </div>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="admin-main">
                    <div class="admin-page-header">
                        <h1 class="admin-title">Key Metrics</h1>
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
                                <span>↑ 0.36%</span> <span class="text-muted" style="font-weight: normal;">vs last month</span>
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
                                <span>↑ 3.79%</span> <span class="text-muted" style="font-weight: normal;">vs last week</span>
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
                                <span>${lowStockCount > 0 ? '↓ 4.27%' : 'Stable'}</span> <span class="text-muted" style="font-weight: normal;">${lowStockCount} items</span>
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
                                <span>↑ 3.27%</span> <span class="text-muted" style="font-weight: normal;">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <!-- Charts Row -->
                    <div class="charts-grid">
                        <!-- Sales Chart -->
                        <div class="chart-card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h3 class="font-bold text-slate-800">Sales Overview</h3>
                                <select style="padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.875rem;">
                                    <option>Last Month</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                            <div style="height: 300px;">
                                <canvas id="salesChart"></canvas>
                            </div>
                        </div>
                        <!-- Recent Orders -->
                        <div class="table-card">
                            <h3 class="font-bold text-slate-800 mb-4">Recent Orders</h3>
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Sales</th>
                                        <th>Production</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${recentOrders.map(order => `
                                        <tr>
                                            <td>${order.orderId}</td>
                                            <td>${formatCurrency(order.total)}</td>
                                            <td>Lumina</td>
                                            <td>${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="charts-grid" style="margin-top: 1.5rem;">
                         <!-- Top Selling Products (Placeholder) -->
                        <div class="chart-card">
                            <h3 class="font-bold text-slate-800 mb-4">Top Selling Products</h3>
                             <div style="height: 200px; display: flex; align-items: flex-end; gap: 1rem; padding-bottom: 1rem;">
                                <div style="flex: 1; background: #0ea5e9; height: 80%; border-radius: 4px 4px 0 0;"></div>
                                <div style="flex: 1; background: #0ea5e9; height: 60%; border-radius: 4px 4px 0 0;"></div>
                                <div style="flex: 1; background: #0ea5e9; height: 40%; border-radius: 4px 4px 0 0;"></div>
                                <div style="flex: 1; background: #0ea5e9; height: 30%; border-radius: 4px 4px 0 0;"></div>
                                <div style="flex: 1; background: #0ea5e9; height: 20%; border-radius: 4px 4px 0 0;"></div>
                             </div>
                        </div>

                        <!-- Demographics Chart -->
                        <div class="chart-card">
                            <h3 class="font-bold text-slate-800 mb-4">Customer Demographics</h3>
                            <div style="height: 250px; display: flex; justify-content: center;">
                                <canvas id="demographicsChart"></canvas>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
        <style>
            /* Admin Layout Styles */
            .admin-layout {
                display: flex;
                flex-direction: column;
                height: 100vh;
                background-color: #f8fafc;
                font-family: 'Inter', sans-serif;
            }
            
            .admin-header {
                height: 64px;
                background: white;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2rem;
                flex-shrink: 0;
            }
            
            .admin-brand {
                font-size: 1.25rem;
                font-weight: 700;
                color: #0f172a;
            }
            
            .brand-highlight {
                color: #f97316;
            }
            
            .admin-header-right {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .admin-user-profile {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .admin-avatar {
                width: 36px;
                height: 36px;
                background: #0f172a;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }
            
            .admin-user-info {
                display: flex;
                flex-direction: column;
                line-height: 1.2;
            }
            
            .admin-name {
                font-size: 0.875rem;
                font-weight: 600;
                color: #0f172a;
            }
            
            .admin-role {
                font-size: 0.75rem;
                color: #64748b;
            }
            
            .admin-body {
                display: flex;
                flex: 1;
                overflow: hidden;
            }
            
            .admin-sidebar {
                width: 260px;
                background: #0f172a;
                color: white;
                display: flex;
                flex-direction: column;
                flex-shrink: 0;
            }
            
            .sidebar-nav {
                padding: 1rem 0;
                flex: 1;
            }
            
            .sidebar-item {
                padding: 0.75rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #94a3b8;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.95rem;
            }
            
            .sidebar-item:hover, .sidebar-item.active {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .logout-item {
                margin-top: auto;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .admin-main {
                flex: 1;
                padding: 2rem;
                overflow-y: auto;
            }
            
            .admin-page-header {
                margin-bottom: 2rem;
            }
            
            .admin-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #0f172a;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .stat-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .stat-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }
            
            .stat-title {
                font-size: 0.875rem;
                color: #64748b;
                margin-bottom: 0.5rem;
            }
            
            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #0f172a;
            }
            
            .stat-icon {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
            }
            
            .trend-indicator {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
            }
            
            .trend-up { color: #10b981; }
            .trend-down { color: #ef4444; }
            
            .charts-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 1.5rem;
            }
            
            @media (max-width: 1024px) {
                .charts-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .chart-card, .table-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .admin-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .admin-table th {
                text-align: left;
                padding: 0.75rem 0;
                color: #64748b;
                font-weight: 600;
                font-size: 0.875rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .admin-table td {
                padding: 1rem 0;
                border-bottom: 1px solid #f1f5f9;
                color: #334155;
                font-size: 0.875rem;
            }
            
            .status-badge {
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 500;
            }
            
            .status-pending { background: #fff7ed; color: #c2410c; }
            .status-shipped { background: #eff6ff; color: #1d4ed8; }
            .status-delivered { background: #f0fdf4; color: #15803d; }
        </style>
    `;
};

// Initialize Charts Function (unchanged logic, just ensuring it matches new IDs if any)
window.initAdminCharts = () => {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        // Destroy existing chart if any (optional but good practice)
        if (window.salesChartInstance) window.salesChartInstance.destroy();

        window.salesChartInstance = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Sales',
                    data: [300, 1100, 1600, 1100, 2200, 1600, 2100, 2600],
                    borderColor: '#0ea5e9',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#0ea5e9',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [2, 4], color: '#f1f5f9' },
                        ticks: { font: { size: 11 }, color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11 }, color: '#94a3b8' }
                    }
                }
            }
        });
    }

    // Demographics Chart
    const demoCtx = document.getElementById('demographicsChart');
    if (demoCtx) {
        if (window.demoChartInstance) window.demoChartInstance.destroy();

        window.demoChartInstance = new Chart(demoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#0f172a', '#f97316', '#cbd5e1'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
                }
            }
        });
    }
};