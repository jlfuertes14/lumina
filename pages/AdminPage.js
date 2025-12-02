export const AdminPage = (state) => {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        navigate('home');
        return '';
    }

    // Auto-load orders on dashboard mount!
    if (state.orders.length === 0) {
        api.getOrders();
    }

    // Calculate metrics
    const totalSales = state.orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = state.orders.length;
    const totalProducts = state.products.length;
    const totalCustomers = state.users.filter(u => u.role === 'customer').length;

    // Low stock products
    const lowStockProducts = state.products.filter(p => p.stock < 10);
    const outOfStockProducts = state.products.filter(p => p.stock === 0);

    // Recent orders (last 5)
    const recentOrders = state.orders.slice(0, 5);

    // Average order value
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Category Distribution Data
    const categories = {};
    state.products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + 1;
    });
    const categoryData = Object.entries(categories).map(([name, count]) => ({ name, count }));

    // Mock Revenue Data (Last 7 Days)
    const revenueData = [450, 720, 550, 890, 600, 950, 1200];
    const maxRevenue = Math.max(...revenueData);

    return `
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${lowStockProducts.length > 0 ? `<span class="notification-badge">${lowStockProducts.length}</span>` : ''}
                    </div>
                    <button class="btn-action" onclick="window.showToast('Exporting data...')">
                        📥 Export CSV
                    </button>
                    <button class="btn-action" onclick="window.showToast('Report generated!')">
                        Generate Report
                    </button>
                </div>
            </div>

            <!-- Analytics Overview -->
            <div class="analytics-grid">
                <!-- Revenue Trend -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>📈 Revenue Trend (7 Days)</h3>
                    </div>
                    <div class="chart-container">
                        ${revenueData.map(val => `
                            <div class="chart-bar" style="height: ${(val / maxRevenue) * 100}%" data-value="${formatCurrency(val)}"></div>
                        `).join('')}
                    </div>
                </div>

                <!-- Category Distribution -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🥧 Categories</h3>
                    </div>
                    <div class="donut-chart">
                        <div class="donut-hole">
                            ${categoryData.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${categoryData.slice(0, 3).map(c => `<span class="badge badge-info">${c.name}: ${c.count}</span>`).join('')}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${state.products.slice(0, 4).map(p => `
                            <div class="top-product-item">
                                <img src="${p.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${p.name}</span>
                                        <span>${formatCurrency(p.price)}</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${Math.random() * 40 + 60}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">💰</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Revenue</div>
                        <div class="metric-value">${formatCurrency(totalSales)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${totalOrders}</div>
                        <div class="metric-change positive">+8 new today</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">👥</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Customers</div>
                        <div class="metric-value">${totalCustomers}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${formatCurrency(avgOrderValue)}</div>
                        <div class="metric-change positive">+5.2%</div>
                    </div>
                </div>
            </div>

            <!-- Order Management -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>🛍️ Order Management</h3>
                    <div class="filter-bar" style="margin-bottom: 0;">
                        <input type="date" class="filter-input">
                        <select class="filter-input">
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recentOrders.length > 0 ? recentOrders.map(order => {
        const customer = state.users.find(u => u.id === order.userId);
        return `
                                    <tr>
                                        <td><strong>#${order.orderId}</strong></td>
                                        <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>${customer ? customer.name : 'Unknown (ID: ' + order.userId + ')'}</td>
                                        <td>${order.items.length} items</td>
                                        <td><strong>${formatCurrency(order.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${order.orderId}', this.value)">
                                                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${order.orderId}')" title="Quick View">👁️</button>
                                        </td>
                                    </tr>
                                `;
    }).join('') : '<tr><td colspan="7" class="text-center text-muted">No orders yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Inventory Management -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>📦 Inventory Management</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-small btn-accent" onclick="window.showProductModal()">
                            ➕ Add New Product
                        </button>
                        <button class="btn-small btn-accent" onclick="window.bulkAction('restock')">Restock Selected</button>
                        <button class="btn-small" style="background: var(--danger); color: white;" onclick="window.bulkAction('delete')">Delete Selected</button>
                    </div>
                </div>
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" onclick="window.toggleSelectAll(this)"></th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Est. Days Left</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.products.map(product => `
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${product.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${product.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${product.category}</span></td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="stock-badge ${product.stock < 10 ? 'low' : ''} ${product.stock === 0 ? 'out' : ''}" style="${product.stock < 10 ? 'color: var(--danger); font-weight: bold;' : ''}">
                                            ${product.stock}
                                        </span>
                                    </td>
                                    <td>${product.stock > 0 ? Math.floor(product.stock / 2) + ' days' : 'Out of Stock'}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${product.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${product.id})" title="Delete">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Customer Insights (New) -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>👥 Customer Insights</h3>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    <div>
                        <h4>Top Spenders</h4>
                        <ul style="list-style: none; padding: 0; margin-top: 1rem;">
                            ${state.users.filter(u => u.role === 'customer').slice(0, 3).map(u => `
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${u.name}</span>
                                    <span style="font-weight: bold; color: var(--primary);">$${(Math.random() * 500 + 100).toFixed(2)}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4>Geographic Distribution</h4>
                        <div class="map-widget">
                            Map Widget Placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};
