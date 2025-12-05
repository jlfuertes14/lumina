import { formatCurrency } from '../src/utils.js';
import { apiCall } from '../src/api-config.js';

// --- Global Admin State ---
window.adminState = {
    activeTab: 'dashboard',
    isModalOpen: false,
    modalType: null, // 'addProduct', 'editProduct', 'addStaff'
    editingId: null,
    uploadedImage: null // Store base64 image
};

// --- Helper Functions ---
window.switchAdminTab = (tab) => {
    window.adminState.activeTab = tab;
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
    window.adminState.uploadedImage = null; // Reset image
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

// --- Image Upload Handlers ---
window.handleImageSelect = (event) => {
    const file = event.target.files[0];
    window.processImageFile(file);
};

window.handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
};

window.handleDragLeave = (event) => {
    event.currentTarget.classList.remove('dragover');
};

window.handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    window.processImageFile(file);
};

window.processImageFile = (file) => {
    if (!file) return;

    // Validate Type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        window.showToast('Only JPEG and PNG images are allowed.');
        return;
    }

    // Validate Size (3MB)
    if (file.size > 3 * 1024 * 1024) {
        window.showToast('File size must be less than 3MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        window.adminState.uploadedImage = e.target.result;
        // Update UI directly to avoid full re-render losing focus
        const previewArea = document.getElementById('imagePreview');
        const dropZone = document.getElementById('dropZone');
        const previewImg = document.getElementById('previewImg');

        if (previewArea && dropZone && previewImg) {
            previewImg.src = e.target.result;
            previewArea.style.display = 'block';
            dropZone.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
};

window.removeImage = () => {
    window.adminState.uploadedImage = null;
    const previewArea = document.getElementById('imagePreview');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    if (previewArea && dropZone) {
        previewArea.style.display = 'none';
        dropZone.style.display = 'flex';
        if (fileInput) fileInput.value = '';
    }
};

// --- API Actions ---
window.handleSaveProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());

    productData.price = parseFloat(productData.price);
    productData.stock = parseInt(productData.stock);

    // Use uploaded image if available, or keep existing image when editing
    if (window.adminState.uploadedImage) {
        productData.image = window.adminState.uploadedImage;
    } else if (window.adminState.editingId) {
        // Keep existing image when editing and no new image uploaded
        const existingProduct = window.state.products.find(p => String(p.id) === String(window.adminState.editingId) || p._id === window.adminState.editingId);
        if (existingProduct) {
            productData.image = existingProduct.image;
        }
    } else {
        // Fallback placeholder for new products
        productData.image = 'https://via.placeholder.com/150';
    }

    try {
        console.log('Saving product:', productData);
        let response;
        if (window.adminState.editingId) {
            // UPDATE existing product
            response = await apiCall(`/products/${window.adminState.editingId}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
            console.log('Update response:', response);
            window.showToast('Product updated successfully!', 'success');
        } else {
            // CREATE new product
            response = await apiCall('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
            console.log('Create response:', response);
            window.showToast('Product added successfully!', 'success');
        }
        window.toggleAdminModal(false);
        if (window.api && window.api.getProducts) window.api.getProducts();
    } catch (error) {
        console.error('Save product error:', error);
        window.showToast(window.adminState.editingId ? 'Failed to update product' : 'Failed to add product', 'error');
    }
};
// --- Delete Product ---
window.handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        await apiCall(`/products/${productId}`, {
            method: 'DELETE'
        });
        window.showToast('Product deleted successfully!');
        if (window.api.getProducts) window.api.getProducts();
    } catch (error) {
        console.error(error);
        window.showToast('Failed to delete product');
    }
};

window.handleAddStaff = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const staffData = Object.fromEntries(formData.entries());

    try {
        await apiCall('/users/register', {
            method: 'POST',
            body: JSON.stringify({
                name: staffData.name,
                email: staffData.email,
                password: staffData.password,
                role: staffData.role
            })
        });

        window.showToast('Staff member added!');
        window.toggleAdminModal(false);
        if (window.api.getUsers) window.api.getUsers();
    } catch (error) {
        console.error(error);
        window.showToast('Failed to add staff');
    }
};

// --- Main Component ---
export const AdminPage = (state) => {
    if (!state.currentUser || !['admin', 'staff', 'inventory_manager'].includes(state.currentUser.role)) {
        setTimeout(() => window.navigate('home'), 0);
        return '';
    }

    const { activeTab } = window.adminState;
    const userRole = state.currentUser.role;

    const canManageProducts = ['admin', 'inventory_manager'].includes(userRole);
    const canManageStaff = ['admin'].includes(userRole);
    const canDelete = ['admin'].includes(userRole);

    const totalSales = state.orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = state.orders.length;
    const lowStockCount = state.products.filter(p => p.stock < 10).length;
    const activeCustomersCount = state.users ? state.users.filter(u => u.role === 'customer').length : 0;
    const recentOrders = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

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
                                ${canManageProducts ? `<button class="btn-ghost" onclick="window.toggleAdminModal(true, 'editProduct', '${p._id || p.id}')">✏️</button>` : ''}
                                ${canDelete ? `<button class="btn-ghost" style="color: var(--danger);" onclick="window.handleDeleteProduct('${p._id || p.id}')">🗑️</button>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    const renderStaffTable = () => {
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

        if (window.adminState.modalType === 'addProduct' || window.adminState.modalType === 'editProduct') {
            // Get existing product data if editing (convert to string for comparison)
            const editingProduct = window.adminState.editingId
                ? state.products.find(p => String(p.id) === String(window.adminState.editingId) || p._id === window.adminState.editingId)
                : null;

            title = editingProduct ? 'Edit Product' : 'Add New Product';
            content = `
                <form onsubmit="window.handleSaveProduct(event)">
                    <div class="modal-body-grid">
                        <div class="modal-left-col">
                            <div class="form-group">
                                <label class="form-label">Product Name</label>
                                <input type="text" name="name" class="form-input" required placeholder="e.g. Arduino Uno" value="${editingProduct ? editingProduct.name : ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Category</label>
                                <select name="category" class="form-input">
                                    <option ${editingProduct?.category === 'Microcontrollers' ? 'selected' : ''}>Microcontrollers</option>
                                    <option ${editingProduct?.category === 'Sensors' ? 'selected' : ''}>Sensors</option>
                                    <option ${editingProduct?.category === 'Components' ? 'selected' : ''}>Components</option>
                                    <option ${editingProduct?.category === 'Robotics' ? 'selected' : ''}>Robotics</option>
                                </select>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Price</label>
                                    <input type="number" name="price" step="0.01" class="form-input" required placeholder="0.00" value="${editingProduct ? editingProduct.price : ''}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Stock</label>
                                    <input type="number" name="stock" class="form-input" required placeholder="0" value="${editingProduct ? editingProduct.stock : ''}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea name="description" class="form-input" rows="4">${editingProduct?.description || ''}</textarea>
                            </div>
                        </div>
                        
                        <div class="modal-right-col">
                            <label class="form-label">Product Image</label>
                            ${editingProduct && editingProduct.image && !window.adminState.uploadedImage ? `
                                <div class="image-preview-area" style="display: block;" id="currentImagePreview">
                                    <img src="${editingProduct.image}" alt="Current Image">
                                </div>
                                <button type="button" class="btn btn-secondary" style="width: 100%; margin-top: 0.75rem;" onclick="document.getElementById('dropZone').style.display='flex'; document.getElementById('currentImagePreview').style.display='none'; this.style.display='none';">Change Image</button>
                                <div class="image-upload-container" id="dropZone" 
                                    ondragover="window.handleDragOver(event)" 
                                    ondragleave="window.handleDragLeave(event)" 
                                    ondrop="window.handleDrop(event)"
                                    style="display: none;">
                                    <div class="upload-icon">☁️</div>
                                    <p style="margin-bottom: 1rem; color: #64748b;">Upload new image</p>
                                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()">Select files from system</button>
                                    <input type="file" id="fileInput" hidden accept="image/png, image/jpeg" onchange="window.handleImageSelect(event)">
                                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #94a3b8;">Max 3MB, JPEG/PNG</p>
                                </div>
                            ` : `
                                <div class="image-upload-container" id="dropZone" 
                                    ondragover="window.handleDragOver(event)" 
                                    ondragleave="window.handleDragLeave(event)" 
                                    ondrop="window.handleDrop(event)"
                                    style="display: ${window.adminState.uploadedImage ? 'none' : 'flex'};">
                                    <div class="upload-icon">☁️</div>
                                    <p style="margin-bottom: 1rem; color: #64748b;">Drag and drop image here or</p>
                                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()">Select files from system</button>
                                    <input type="file" id="fileInput" hidden accept="image/png, image/jpeg" onchange="window.handleImageSelect(event)">
                                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #94a3b8;">Max 3MB, JPEG/PNG</p>
                                </div>
                            `}
                            <div id="imagePreview" class="image-preview-area" style="display: ${window.adminState.uploadedImage ? 'block' : 'none'};">
                                <img id="previewImg" src="${window.adminState.uploadedImage || ''}" alt="Preview">
                                <button type="button" class="remove-image-btn" onclick="window.removeImage()">×</button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="window.toggleAdminModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary">${editingProduct ? 'Update Product' : 'Add Product'}</button>
                    </div>
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
                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="window.toggleAdminModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Staff</button>
                    </div>
                </form>
            `;
        }

        return `
            <div class="modal-overlay active" onclick="if(event.target === this) window.toggleAdminModal(false)">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 style="margin: 0;">${title}</h2>
                        <button class="close-modal" onclick="window.toggleAdminModal(false)" style="font-size: 2rem; line-height: 1; cursor: pointer;">&times;</button>
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