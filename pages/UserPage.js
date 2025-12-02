import { formatCurrency } from '../src/utils.js';

export const UserPage = ({ state }) => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    // --- Data Preparation ---
    const userOrders = state.orders.filter(o => o.userId === state.currentUser.id);
    const toShipOrders = userOrders.filter(o => o.status === 'Pending');
    const toReceiveOrders = userOrders.filter(o => o.status === 'Shipped');
    const completedOrders = userOrders.filter(o => o.status === 'Delivered');

    // --- Event Handlers ---
    if (!window.handleProfileUpdate) {
        window.handleProfileUpdate = (event) => {
            event.preventDefault();
            const form = event.target;
            const updatedUser = {
                ...state.currentUser,
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                address: form.address.value, // Although not in the main form, keeping it in state
                gender: form.gender.value,
                birthDate: `${form.birthYear.value}-${form.birthMonth.value}-${form.birthDay.value}`
            };

            // Update State
            state.currentUser = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Mock Backend Update
            // In a real app, we would call api.updateUser(updatedUser)

            alert('Profile updated successfully!');
            render();
        };
    }

    if (!window.switchUserTab) {
        window.switchUserTab = (tabName) => {
            document.querySelectorAll('.user-tab-content').forEach(el => el.style.display = 'none');
            document.getElementById(`user-tab-${tabName}`).style.display = 'block';

            // Update active state in sidebar
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
            if (activeLink) activeLink.classList.add('active');
        };
    }

    // Helper to generate date options
    const generateOptions = (start, end) => {
        let options = '';
        for (let i = start; i <= end; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        return options;
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthOptions = months.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');

    // Parse birthDate
    const birthDate = state.currentUser.birthDate ? new Date(state.currentUser.birthDate) : null;
    const birthDay = birthDate ? birthDate.getDate() : '';
    const birthMonth = birthDate ? birthDate.getMonth() + 1 : '';
    const birthYear = birthDate ? birthDate.getFullYear() : '';

    return `
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${state.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-brief-info">
                                <div class="user-name-truncate">${state.currentUser.name}</div>
                                <a href="#" onclick="window.switchUserTab('profile'); return false;" class="edit-profile-link">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    Edit Profile
                                </a>
                            </div>
                        </div>

                        <nav class="user-nav">
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">👤</span>
                                    My Account
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link active" data-tab="profile" onclick="window.switchUserTab('profile'); return false;">Profile</a></li>
                                    <li><a href="#" class="sidebar-link" onclick="return false;">Banks & Cards</a></li>
                                    <li><a href="#" class="sidebar-link" onclick="return false;">Addresses</a></li>
                                    <li><a href="#" class="sidebar-link" onclick="return false;">Change Password</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">📦</span>
                                    My Purchase
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link" data-tab="orders" onclick="window.switchUserTab('orders'); return false;">Order History</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">🔔</span>
                                    Notifications
                                </div>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- Profile Tab -->
                        <div id="user-tab-profile" class="user-tab-content">
                            <div class="content-header">
                                <h1>My Profile</h1>
                                <p>Manage and protect your account</p>
                            </div>

                            <div class="profile-layout">
                                <div class="profile-form-section">
                                    <form onsubmit="window.handleProfileUpdate(event)">
                                        <div class="form-row">
                                            <label>Username</label>
                                            <div class="form-value">${state.currentUser.email.split('@')[0]}</div>
                                        </div>
                                        <div class="form-row">
                                            <label>Name</label>
                                            <input type="text" name="name" value="${state.currentUser.name}" class="form-input">
                                        </div>
                                        <div class="form-row">
                                            <label>Email</label>
                                            <div class="form-value">
                                                ${state.currentUser.email}
                                                <a href="#" class="change-link">Change</a>
                                            </div>
                                            <input type="hidden" name="email" value="${state.currentUser.email}">
                                        </div>
                                        <div class="form-row">
                                            <label>Phone Number</label>
                                            <div class="form-value">
                                                ${state.currentUser.phone || 'Not Set'}
                                                <a href="#" class="change-link">Change</a>
                                            </div>
                                            <input type="hidden" name="phone" value="${state.currentUser.phone || ''}">
                                        </div>
                                        <div class="form-row">
                                            <label>Gender</label>
                                            <div class="radio-group">
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Male" ${state.currentUser.gender === 'Male' ? 'checked' : ''}> Male
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Female" ${state.currentUser.gender === 'Female' ? 'checked' : ''}> Female
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Other" ${state.currentUser.gender === 'Other' ? 'checked' : ''}> Other
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <label>Date of Birth</label>
                                            <div class="date-selects">
                                                <select name="birthDay" class="form-select">
                                                    <option value="">Day</option>
                                                    ${generateOptions(1, 31)}
                                                </select>
                                                <select name="birthMonth" class="form-select">
                                                    <option value="">Month</option>
                                                    ${monthOptions}
                                                </select>
                                                <select name="birthYear" class="form-select">
                                                    <option value="">Year</option>
                                                    ${generateOptions(1950, 2024)}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <!-- Hidden Address Field to persist it -->
                                        <input type="hidden" name="address" value="${state.currentUser.address || ''}">

                                        <div class="form-actions">
                                            <button type="submit" class="btn-save">Save</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="profile-avatar-section">
                                    <div class="avatar-preview">
                                        ${state.currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <button class="btn-select-image">Select Image</button>
                                    <div class="avatar-help">
                                        File size: maximum 1 MB<br>
                                        File extension: .JPEG, .PNG
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Orders Tab -->
                        <div id="user-tab-orders" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>My Orders</h1>
                            </div>
                            
                            <div class="orders-tabs">
                                <div class="order-status-tab active">All</div>
                                <div class="order-status-tab">To Pay</div>
                                <div class="order-status-tab">To Ship (${toShipOrders.length})</div>
                                <div class="order-status-tab">To Receive (${toReceiveOrders.length})</div>
                                <div class="order-status-tab">Completed (${completedOrders.length})</div>
                            </div>

                            <div class="orders-list">
                                ${userOrders.length > 0 ? userOrders.map(order => `
                                    <div class="order-item">
                                        <div class="order-header">
                                            <span>Order ID: ${order.id}</span>
                                            <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
                                        </div>
                                        <div class="order-products">
                                            ${order.items.map(item => `
                                                <div class="order-product">
                                                    <img src="${item.image || 'assets/placeholder.png'}" alt="${item.name}">
                                                    <div class="product-details">
                                                        <div class="product-name">${item.name}</div>
                                                        <div class="product-qty">x${item.quantity}</div>
                                                    </div>
                                                    <div class="product-price">${formatCurrency(item.price)}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                        <div class="order-footer">
                                            <div class="order-total">
                                                Order Total: <span>${formatCurrency(order.total)}</span>
                                            </div>
                                            <div class="order-actions">
                                                <button class="btn-buy-again">Buy Again</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('') : `
                                    <div class="no-orders">
                                        <div class="no-orders-icon">📄</div>
                                        <p>No orders yet</p>
                                    </div>
                                `}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>

        <style>
            .user-page-wrapper {
                background-color: #f5f5f5;
                min-height: calc(100vh - 64px); /* Adjust based on header height */
                padding: 20px 0;
                font-family: 'Inter', sans-serif;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 16px;
            }
            .user-layout {
                display: flex;
                gap: 20px;
            }
            
            /* Sidebar */
            .user-sidebar {
                width: 250px;
                flex-shrink: 0;
                display: block;
            }
            .user-brief {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 0;
                border-bottom: 1px solid #efefef;
                margin-bottom: 20px;
            }
            .user-avatar-small {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #555;
                border: 1px solid #d0d0d0;
            }
            .user-brief-info {
                overflow: hidden;
            }
            .user-name-truncate {
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 150px;
            }
            .edit-profile-link {
                font-size: 12px;
                color: #888;
                display: flex;
                align-items: center;
                gap: 4px;
                text-decoration: none;
            }
            .edit-profile-link:hover {
                color: var(--primary);
            }
            
            .user-nav {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .nav-header {
                font-weight: 500;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #333;
            }
            .nav-list {
                list-style: none;
                padding-left: 30px;
                margin: 0;
            }
            .nav-list li {
                margin-bottom: 8px;
            }
            .sidebar-link {
                color: #666;
                text-decoration: none;
                font-size: 14px;
                display: block;
            }
            .sidebar-link:hover {
                color: var(--primary);
            }
            .sidebar-link.active {
                color: var(--primary);
                font-weight: 500;
            }

            /* Main Content */
            .user-content {
                flex: 1;
                background: white;
                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
                border-radius: 2px;
                padding: 30px;
                min-height: 500px;
            }
            .content-header {
                border-bottom: 1px solid #efefef;
                padding-bottom: 18px;
                margin-bottom: 24px;
            }
            .content-header h1 {
                font-size: 18px;
                font-weight: 500;
                margin: 0;
                color: #333;
            }
            .content-header p {
                font-size: 14px;
                color: #555;
                margin: 4px 0 0;
            }

            /* Profile Form */
            .profile-layout {
                display: flex;
                gap: 40px;
            }
            .profile-form-section {
                flex: 1;
                padding-right: 40px;
                border-right: 1px solid #efefef;
            }
            .form-row {
                display: flex;
                align-items: center;
                margin-bottom: 24px;
            }
            .form-row label {
                width: 120px;
                text-align: right;
                color: #555;
                font-size: 14px;
                margin-right: 20px;
            }
            .form-value {
                font-size: 14px;
                color: #333;
            }
            .form-input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 2px;
                font-size: 14px;
                outline: none;
            }
            .form-input:focus {
                border-color: #888;
            }
            .change-link {
                color: #05a;
                text-decoration: underline;
                font-size: 13px;
                margin-left: 8px;
            }
            .radio-group {
                display: flex;
                gap: 16px;
            }
            .radio-label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                cursor: pointer;
            }
            .date-selects {
                display: flex;
                gap: 10px;
            }
            .form-select {
                padding: 8px;
                border: 1px solid #e0e0e0;
                border-radius: 2px;
                background: white;
                font-size: 14px;
            }
            .btn-save {
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 24px;
                border-radius: 2px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            }
            .btn-save:hover {
                opacity: 0.9;
            }
            .form-actions {
                margin-left: 140px;
                margin-top: 30px;
            }

            /* Avatar Section */
            .profile-avatar-section {
                width: 280px;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 20px;
            }
            .avatar-preview {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                color: #555;
                margin-bottom: 20px;
                border: 1px solid #d0d0d0;
            }
            .btn-select-image {
                background: white;
                border: 1px solid #ddd;
                padding: 8px 16px;
                font-size: 14px;
                color: #555;
                cursor: pointer;
                margin-bottom: 12px;
            }
            .btn-select-image:hover {
                background: #f8f8f8;
            }
            .avatar-help {
                font-size: 12px;
                color: #999;
                text-align: center;
                line-height: 1.5;
            }

            /* Orders Styles */
            .orders-tabs {
                display: flex;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 20px;
                background: white;
            }
            .order-status-tab {
                padding: 16px 20px;
                cursor: pointer;
                font-size: 16px;
                color: #555;
                border-bottom: 2px solid transparent;
            }
            .order-status-tab.active {
                color: var(--primary);
                border-bottom-color: var(--primary);
            }
            .order-status-tab:hover {
                color: var(--primary);
            }
            .order-item {
                background: white;
                border: 1px solid #e0e0e0;
                margin-bottom: 16px;
                border-radius: 2px;
            }
            .order-header {
                padding: 12px 24px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
            }
            .order-status {
                text-transform: uppercase;
                font-weight: 500;
            }
            .order-product {
                display: flex;
                padding: 12px 24px;
                border-bottom: 1px solid #f8f8f8;
                gap: 12px;
            }
            .order-product img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border: 1px solid #e0e0e0;
            }
            .product-details {
                flex: 1;
            }
            .product-name {
                font-size: 14px;
                margin-bottom: 4px;
            }
            .product-qty {
                color: #888;
                font-size: 13px;
            }
            .order-footer {
                padding: 16px 24px;
                background: #fffafb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .order-total {
                font-size: 14px;
            }
            .order-total span {
                font-size: 20px;
                color: var(--primary);
                font-weight: 500;
                margin-left: 8px;
            }
            .btn-buy-again {
                background: var(--primary);
                color: white;
                border: none;
                padding: 8px 20px;
                border-radius: 2px;
                cursor: pointer;
            }

            @media (max-width: 768px) {
                .user-layout {
                    flex-direction: column;
                }
                .user-sidebar {
                    width: 100%;
                    display: none; /* Hidden on mobile for now, or use a drawer */
                }
                .profile-layout {
                    flex-direction: column-reverse;
                }
                .profile-form-section {
                    border-right: none;
                    padding-right: 0;
                }
                .form-row {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .form-row label {
                    text-align: left;
                    margin-bottom: 8px;
                }
                .form-actions {
                    margin-left: 0;
                }
            }
        </style>
    `;
};
