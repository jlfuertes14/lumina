import { formatCurrency } from '../src/utils.js';
import { apiCall } from '../src/api-config.js'; // Ensure apiCall is imported
// --- Global Admin State ---
window.adminState = {
    activeTab: 'dashboard',
    isModalOpen: false,
    modalType: null, // 'addProduct', 'editProduct', 'addStaff'
    editingId: null
};
// --- Helper Functions ---
window.switchAdminTab = (tab) => {
    window.adminState.activeTab = tab;

    // Fetch data if needed
    if (tab === 'staff' && window.api && window.api.getUsers) {
        window.api.getUsers();
    }

    window.render();

    if (tab === 'dashboard') {
        setTimeout(() => window.initAdminCharts(), 100);
    }
};
window.toggleAdminModal = (isOpen, type = null, id = null) => {
    window.adminState.isModalOpen = isOpen;
    window.adminState.modalType = type;
    window.adminState.editingId = id;
    window.render();
};
// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.adminState.isModalOpen) {
        window.toggleAdminModal(false);
    }
});
window.toggleNotifications = () => {
    const el = document.getElementById('adminNotifications');
    if (el) el.classList.toggle('show');
};
// --- API Actions (Integrated) ---
window.handleSaveProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());

    // Convert price/stock to numbers
    productData.price = parseFloat(productData.price);
    productData.stock = parseInt(productData.stock);
    try {
        // Call your backend API
        await apiCall('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        window.showToast('Product added successfully!');
        window.toggleAdminModal(false);
        if (window.api.getProducts) window.api.getProducts(); // Refresh list
    } catch (error) {
        console.error(error);
        window.showToast('Failed to add product');
    }
};
window.handleAddStaff = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const staffData = Object.fromEntries(formData.entries());
    try {
        // Register the user first
        const response = await apiCall('/users/register', {
            method: 'POST',
            body: JSON.stringify({
                name: staffData.name,
                email: staffData.email,
                password: staffData.password,
                role: staffData.role // Assuming backend accepts role on register
            })
        });

        window.showToast('Staff member added!');
        window.toggleAdminModal(false);
        if (window.api.getUsers) window.api.getUsers(); // Refresh list
    } catch (error) {
        console.error(error);
        window.showToast('Failed to add staff');
    }
};
// --- Main Component ---
export const AdminPage = (state) => {
    // 1. Security Check
    if (!state.currentUser || !['admin', 'staff', 'inventory_manager'].includes(state.currentUser.role)) {
        setTimeout(() => window.navigate('home'), 0);
        return '';
    }
    const { activeTab } = window.adminState;
    const userRole = state.currentUser.role;

    // RBAC Permissions
    const canManageProducts = ['admin', 'inventory_manager'].includes(userRole);
    const canManageStaff = ['admin'].includes(userRole);
    const canDelete = ['admin'].includes(userRole);
    // --- DATA METRICS ---
    const totalSales = state.orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = state.orders.length;
    const lowStockCount = state.products.filter(p => p.stock < 10).length;
    const activeCustomersCount = state.users ? state.users.filter(u => u.role === 'customer').length : 0;
    const recentOrders = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    // --- RENDERERS ---
    const renderSidebar = () => `
        <aside class="admin-sidebar">
            <nav class="sidebar-nav" style="padding-top: 1rem;">
                <div class="sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}" onclick="window.switchAdminTab('dashboard')">
                    <span>📊</span> Dashboard
                </div>
                <div class="sidebar-item ${activeTab === 'products' ? 'active' : ''}" onclick="window.switchAdminTab('products')">
                    <span>📦</span> Products
                </div>
                ${canManageStaff ? `
                <div class="sidebar-item ${activeTab === 'staff' ? 'active' : ''}" onclick="window.switchAdminTab('staff')">
                    <span>👥</span> Staff
                </div>` : ''}
                <div class="sidebar-item ${activeTab === 'settings' ? 'active' : ''}" onclick="window.switchAdminTab('settings')">
                    <span>⚙️</span> Settings
                </div>
                
                <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div class="sidebar-item" onclick="window.navigate('home')">
                        <span>🏠</span> Back to Home
                    </div>
                </div>
            </nav>
        </aside>
    `;
    const renderDashboard = () => `
        <div class="admin-page-header">
            <div>
                <h1 class="admin-title">Overview</h1>
                <p class="text-muted">Welcome back, ${state.currentUser.name}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <div class="notifications-wrapper">
                    <button class="btn-ghost" onclick="window.toggleNotifications()" style="position: relative;">
                        🔔
                        ${lowStockCount > 0 ? `<span style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: red; border-radius: 50%;"></span>` : ''}
                    </button>
                    <div id="adminNotifications" class="notifications-dropdown">
                        <div class="notification-item unread"><strong>System</strong><br>Dashboard ready.</div>
                        ${lowStockCount > 0 ? `<div class="notification-item unread"><strong>Alert</strong><br>${lowStockCount} items low stock.</div>` : ''}
                    </div>
                </div>
            </div>
        </div>
        <div class="quick-actions-grid">
            ${canManageProducts ? `<div class="action-card" onclick="window.toggleAdminModal(true, 'addProduct')"><div class="action-icon">➕</div><div>Add Product</div></div>` : ''}
            ${canManageStaff ? `<div class="action-card" onclick="window.toggleAdminModal(true, 'addStaff')"><div class="action-icon">👤</div><div>Add Staff</div></div>` : ''}
            <div class="action-card" onclick="window.switchAdminTab('products')"><div class="action-icon">📦</div><div>Inventory</div></div>
            <div class="action-card"><div class="action-icon">📄</div><div>Orders</div></div>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Total Sales</div><div class="stat-value">${formatCurrency(totalSales)}</div></div>
                    <div class="stat-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">💰</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">New Orders</div><div class="stat-value">${totalOrders}</div></div>
                    <div class="stat-icon" style="background: rgba(6, 182, 212, 0.1); color: #06b6d4;">📄</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Low Stock</div><div class="stat-value">${lowStockCount}</div></div>
                    <div class="stat-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">⚠️</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Active Customers</div><div class="stat-value">${activeCustomersCount}</div></div>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">👥</div>
                </div>
            </div>
        </div>
        <div class="charts-grid">
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Sales Overview</h3>
                <div style="height: 300px;"><canvas id="salesChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Customers</h3>
                <div style="height: 300px; display: flex; justify-content: center;"><canvas id="demographicsChart"></canvas></div>
            </div>
        </div>
        <div class="table-card">
            <h3 class="font-bold text-slate-800 mb-4">Recent Orders</h3>
            <table class="admin-table">
                <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
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
    `;
    const renderProductsTable = () => `
        <div class="admin-page-header">
            <h1 class="admin-title">Product Management</h1>
            ${canManageProducts ? `<button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addProduct')">+ Add Product</button>` : ''}
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    ${state.products.map(p => `
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${p.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                    <div>
                                        <div style="font-weight: 500;">${p.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">SKU: ${p.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${p.category}</td>
                            <td>${formatCurrency(p.price)}</td>
                            <td>${p.stock}</td>
                            <td><span class="status-badge ${p.stock > 0 ? 'status-instock' : 'status-outofstock'}">${p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                            <td>
                                ${canManageProducts ? `<button class="btn-ghost" onclick="window.toggleAdminModal(true, 'editProduct', '${p.id}')">✏️</button>` : ''}
                                ${canDelete ? `<button class="btn-ghost" style="color: var(--danger);" onclick="if(confirm('Delete?')) window.showToast('Deleted')">🗑️</button>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    const renderStaffTable = () => {
        // Filter users to show only staff/admin if desired, or all users
        const staffUsers = state.users ? state.users.filter(u => ['admin', 'staff', 'inventory_manager', 'manager'].includes(u.role)) : [];

        return `
        <div class="admin-page-header">
            <h1 class="admin-title">Staff Management</h1>
            <button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addStaff')">+ Add Staff</button>
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                    ${staffUsers.length > 0 ? staffUsers.map(u => `
                        <tr>
                            <td><div style="font-weight: 500;">${u.name}</div></td>
                            <td><span class="status-badge status-${u.role === 'admin' ? 'admin' : 'staff'}">${u.role.toUpperCase()}</span></td>
                            <td>${u.email}</td>
                            <td>
                                <button class="btn-ghost">✏️</button>
                                ${u.role !== 'admin' ? `<button class="btn-ghost" style="color: var(--danger);">🗑️</button>` : ''}
                            </td>
                        </tr>
                    `).join('') : '<tr><td colspan="4" style="text-align: center; padding: 2rem;">No staff members found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `};
    const renderModal = () => {
        if (!window.adminState.isModalOpen) return '';

        let title = '';
        let content = '';
        if (window.adminState.modalType === 'addProduct') {
            title = 'Add New Product';
            content = `
                <form onsubmit="window.handleSaveProduct(event)">
                    <div class="form-group">
                        <label class="form-label">Product Name</label>
                        <input type="text" name="name" class="form-input" required placeholder="e.g. Arduino Uno">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select name="category" class="form-input">
                            <option>Microcontrollers</option>
                            <option>Sensors</option>
                            <option>Components</option>
                            <option>Robotics</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Image URL</label>
                        <input type="url" name="image" class="form-input" required placeholder="https://example.com/image.jpg">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Price</label>
                            <input type="number" name="price" step="0.01" class="form-input" required placeholder="0.00">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Stock</label>
                            <input type="number" name="stock" class="form-input" required placeholder="0">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-input" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Save Product</button>
                </form>
            `;
        } else if (window.adminState.modalType === 'addStaff') {
            title = 'Add Staff Member';
            content = `
                <form onsubmit="window.handleAddStaff(event)">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="name" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Role</label>
                        <select name="role" class="form-input">
                            <option value="staff">Inventory Staff</option>
                            <option value="manager">Order Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
                </form>
            `;
        }
        return `
            <div class="modal-overlay active" onclick="if(event.target === this) window.toggleAdminModal(false)">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 style="margin: 0;">${title}</h2>
                        <button class="close-modal" onclick="window.toggleAdminModal(false)" style="font-size: 2rem; line-height: 1;">&times;</button>
                    </div>
                    ${content}
                </div>
            </div>
        `;
    };
    return `
        <div class="admin-wrapper">
            <header class="admin-custom-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 2rem;">
                    <div class="admin-logo">Lumina <span style="color: #F97316;">Electronics</span></div>
                    <div class="admin-profile-header">
                        <div class="admin-avatar-circle">${state.currentUser.name.charAt(0).toUpperCase()}</div>
                        <span class="admin-role-text">${state.currentUser.role.toUpperCase()}</span>
                    </div>
                </div>
            </header>
            <div class="admin-container">
                ${renderSidebar()}
                <main class="admin-main">
                    ${activeTab === 'dashboard' ? renderDashboard() : ''}
                    ${activeTab === 'products' ? renderProductsTable() : ''}
                    ${activeTab === 'staff' ? renderStaffTable() : ''}
                    ${activeTab === 'settings' ? '<div class="admin-page-header"><h1>Settings</h1><p>System settings coming soon...</p></div>' : ''}
                </main>
            </div>
            ${renderModal()}
        </div>
    `;
};
// --- CHART INITIALIZATION ---
window.initAdminCharts = () => {
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        if (window.salesChartInstance) window.salesChartInstance.destroy();
        window.salesChartInstance = new Chart(salesCtx, {
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
    const demoCtx = document.getElementById('demographicsChart');
    if (demoCtx) {
        if (window.demoChartInstance) window.demoChartInstance.destroy();
        window.demoChartInstance = new Chart(demoCtx, {
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