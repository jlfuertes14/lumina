import { formatCurrency } from '../src/utils.js';

export const UserPage = ({ state }) => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    // --- Data Preparation ---
    const userOrders = state.orders.filter(o => o.userId === state.currentUser.id);

    // Filter orders for tabs
    const toShipOrders = userOrders.filter(o => o.status === 'Pending' || o.status === 'Processing');
    const toReceiveOrders = userOrders.filter(o => o.status === 'Shipped');
    const completedOrders = userOrders.filter(o => o.status === 'Delivered' || o.status === 'Completed');

    // Get user's claimed coupons from state
    const myCoupons = state.myCoupons || [];

    // Auto-switch to specified tab: priority is params.tab > sessionStorage > 'profile'
    const savedTab = sessionStorage.getItem('userActiveTab');
    const targetTab = (state.params && state.params.tab) ? state.params.tab : savedTab;

    if (targetTab && window.switchUserTab) {
        const shouldSwitch = !window._lastSwitchedTab || window._lastSwitchedTab !== targetTab;
        if (shouldSwitch) {
            window._lastSwitchedTab = targetTab;
            setTimeout(() => window.switchUserTab(targetTab), 50);
        }
    }


    // --- Event Handlers ---

    // 1. Profile Update
    if (!window.handleProfileUpdate) {
        window.handleProfileUpdate = async (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            const gender = form.gender.value;
            const birthDate = `${form.birthYear.value}-${form.birthMonth.value}-${form.birthDay.value}`;

            // Validation
            if (!name || !email || !phone || !gender || !form.birthYear.value || !form.birthMonth.value || !form.birthDay.value) {
                showToast('Please fill in all fields.');
                return;
            }

            if (/\d/.test(name)) {
                showToast('Name should not contain numbers.');
                return;
            }

            if (!email.includes('@')) {
                showToast('Please enter a valid email address.');
                return;
            }

            if (!/^09\d{9}$/.test(phone)) {
                showToast('Phone number must be 11 digits and start with 09.');
                return;
            }

            // Call API to update profile in database
            try {
                await api.updateProfile(state.currentUser.id, {
                    name,
                    email,
                    phone,
                    gender,
                    birthDate
                });
                window.render();
            } catch (error) {
                console.error('Profile update failed:', error);
            }
        };
    }

    // 2. Image Upload
    if (!window.handleImageUpload) {
        window.handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (!file) return;

            // Validate Size (3MB = 3 * 1024 * 1024 bytes)
            if (file.size > 3 * 1024 * 1024) {
                showToast('File size exceeds 3MB limit.');
                return;
            }

            // Validate Type
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                showToast('Only .JPEG and .PNG files are allowed.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const updatedUser = {
                    ...state.currentUser,
                    avatar: e.target.result
                };
                state.currentUser = updatedUser;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                showToast('Profile image updated!');
                render();
            };
            reader.readAsDataURL(file);
        };
    }

    // 3. Address Update
    if (!window.handleAddressUpdate) {
        window.handleAddressUpdate = async (event) => {
            event.preventDefault();
            const form = event.target;
            const addressData = {
                fullName: form.fullName.value,
                phone: form.phone.value,
                region: form.region.value,
                province: form.province.value,
                city: form.city.value,
                barangay: form.barangay.value,
                postalCode: form.postalCode.value,
                street: form.street.value,
                details: form.details.value
            };

            // Basic Validation
            if (Object.values(addressData).some(val => !val)) {
                showToast('Please fill in all address fields.');
                return;
            }

            // Call API to update address in database
            try {
                await api.updateAddress(state.currentUser.id, addressData);
                render();
            } catch (error) {
                console.error('Address update failed:', error);
            }
        };
    }

    // 4. Password Update
    if (!window.handlePasswordUpdate) {
        window.handlePasswordUpdate = async (event) => {
            event.preventDefault();
            const form = event.target;
            const currentPass = form.currentPassword.value;
            const newPass = form.newPassword.value;
            const confirmPass = form.confirmPassword.value;

            if (newPass.length < 6) {
                showToast('New password must be at least 6 characters.');
                return;
            }

            if (newPass !== confirmPass) {
                showToast('New passwords do not match.');
                return;
            }

            // Call API to change password in database
            try {
                await api.changePassword(state.currentUser.id, currentPass, newPass);
                form.reset();
            } catch (error) {
                console.error('Password change failed:', error);
            }
        };
    }

    // 5. Tab Switching
    if (!window.switchUserTab) {
        window.switchUserTab = (tabName) => {
            // Save tab to sessionStorage for persistence on refresh
            sessionStorage.setItem('userActiveTab', tabName);

            // Hide all tabs
            document.querySelectorAll('.user-tab-content').forEach(el => el.style.display = 'none');
            // Show selected tab
            const target = document.getElementById(`user-tab-${tabName}`);
            if (target) target.style.display = 'block';

            // Update active state in sidebar
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Scroll to top
            window.scrollTo(0, 0);
        };
    }

    // 6. Order Tab Switching
    if (!window.switchOrderTab) {
        window.switchOrderTab = (status) => {
            document.querySelectorAll('.order-status-tab').forEach(el => el.classList.remove('active'));
            document.querySelector(`.order-status-tab[data-status="${status}"]`).classList.add('active');

            document.querySelectorAll('.order-item').forEach(el => {
                if (status === 'All' || el.dataset.status === status) {
                    el.style.display = 'block';
                } else {
                    el.style.display = 'none';
                }
            });
        };
    }

    // Helper to generate date options
    const generateOptions = (start, end, selected) => {
        let options = '';
        for (let i = start; i <= end; i++) {
            options += `<option value="${i}" ${parseInt(selected) === i ? 'selected' : ''}>${i}</option>`;
        }
        return options;
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Parse birthDate
    const birthDate = state.currentUser.birthDate ? new Date(state.currentUser.birthDate) : null;
    const birthDay = birthDate ? birthDate.getDate() : '';
    const birthMonth = birthDate ? birthDate.getMonth() + 1 : '';
    const birthYear = birthDate ? birthDate.getFullYear() : '';

    // Address Data
    const addr = state.currentUser.address || {};
    const isAddressObject = typeof addr === 'object' && addr !== null;

    return `
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${state.currentUser.avatar ?
            `<img src="${state.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
            state.currentUser.name.charAt(0).toUpperCase()}
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
                                    <li><a href="#" class="sidebar-link" data-tab="address" onclick="window.switchUserTab('address'); return false;">Addresses</a></li>
                                    <li><a href="#" class="sidebar-link" data-tab="password" onclick="window.switchUserTab('password'); return false;">Change Password</a></li>
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
                                    <span class="nav-icon">🎟️</span>
                                    My Vouchers
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link" data-tab="coupons" onclick="window.switchUserTab('coupons'); return false;">My Coupons</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- 1. Profile Tab -->
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
                                            <input type="text" name="name" value="${state.currentUser.name}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Email</label>
                                            <input type="email" name="email" value="${state.currentUser.email}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" value="${state.currentUser.phone || ''}" class="form-input" placeholder="09XXXXXXXXX" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Gender</label>
                                            <div class="radio-group">
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Male" ${state.currentUser.gender === 'Male' ? 'checked' : ''} required> Male
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
                                                <select name="birthDay" class="form-select" required>
                                                    <option value="">Day</option>
                                                    ${generateOptions(1, 31, birthDay)}
                                                </select>
                                                <select name="birthMonth" class="form-select" required>
                                                    <option value="">Month</option>
                                                    ${months.map((m, i) => `<option value="${i + 1}" ${parseInt(birthMonth) === i + 1 ? 'selected' : ''}>${m}</option>`).join('')}
                                                </select>
                                                <select name="birthYear" class="form-select" required>
                                                    <option value="">Year</option>
                                                    ${generateOptions(1950, 2024, birthYear)}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="form-actions">
                                            <button type="submit" class="btn-save">Save</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="profile-avatar-section">
                                    <div class="avatar-preview">
                                        ${state.currentUser.avatar ?
            `<img src="${state.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
            state.currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <input type="file" id="avatarInput" accept=".jpeg, .png, .jpg" style="display: none;" onchange="window.handleImageUpload(event)">
                                    <button class="btn-select-image" onclick="document.getElementById('avatarInput').click()">Select Image</button>
                                    <div class="avatar-help">
                                        File size: maximum 3 MB<br>
                                        File extension: .JPEG, .PNG
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Address Tab -->
                        <div id="user-tab-address" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>My Addresses</h1>
                                <p>Manage your shipping addresses</p>
                            </div>
                            <form onsubmit="window.handleAddressUpdate(event)" style="max-width: 600px;">
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" name="fullName" class="form-input" value="${isAddressObject ? (addr.fullName || '') : ''}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" name="phone" class="form-input" value="${isAddressObject ? (addr.phone || '') : ''}" placeholder="09XXXXXXXXX" required>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Region</label>
                                        <input type="text" name="region" class="form-input" value="${isAddressObject ? (addr.region || '') : ''}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Province</label>
                                        <input type="text" name="province" class="form-input" value="${isAddressObject ? (addr.province || '') : ''}" required>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">City</label>
                                        <input type="text" name="city" class="form-input" value="${isAddressObject ? (addr.city || '') : ''}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Barangay</label>
                                        <input type="text" name="barangay" class="form-input" value="${isAddressObject ? (addr.barangay || '') : ''}" required>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Postal Code</label>
                                    <input type="text" name="postalCode" class="form-input" value="${isAddressObject ? (addr.postalCode || '') : ''}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Street Name, Building, House No.</label>
                                    <input type="text" name="street" class="form-input" value="${isAddressObject ? (addr.street || '') : ''}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Additional Details (Landmark, etc.)</label>
                                    <input type="text" name="details" class="form-input" value="${isAddressObject ? (addr.details || '') : ''}">
                                </div>
                                <button type="submit" class="btn-save">Save Address</button>
                            </form>
                        </div>

                        <!-- 3. Change Password Tab -->
                        <div id="user-tab-password" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>Change Password</h1>
                                <p>For your account's security, do not share your password with anyone else</p>
                            </div>
                            <form onsubmit="window.handlePasswordUpdate(event)" style="max-width: 400px;">
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Current Password</label>
                                    <input type="password" name="currentPassword" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">New Password</label>
                                    <input type="password" name="newPassword" class="form-input" required minlength="6">
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" name="confirmPassword" class="form-input" required minlength="6">
                                </div>
                                <button type="submit" class="btn-save">Confirm</button>
                            </form>
                        </div>

                        <!-- 4. Orders Tab -->
                        <div id="user-tab-orders" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>My Orders</h1>
                            </div>
                            
                            <div class="orders-tabs">
                                <div class="order-status-tab active" data-status="All" onclick="window.switchOrderTab('All')">All</div>
                                <div class="order-status-tab" data-status="Pending" onclick="window.switchOrderTab('Pending')">To Ship</div>
                                <div class="order-status-tab" data-status="Shipped" onclick="window.switchOrderTab('Shipped')">To Receive</div>
                                <div class="order-status-tab" data-status="Completed" onclick="window.switchOrderTab('Completed')">Completed</div>
                            </div>

                            <div class="orders-list">
                                ${userOrders.length > 0 ? userOrders.map(order => `
                                    <div class="order-item" data-status="${order.status === 'Pending' || order.status === 'Processing' ? 'Pending' : order.status === 'Shipped' ? 'Shipped' : order.status === 'Delivered' ? 'Completed' : order.status}">
                                        <div class="order-header">
                                            <span>Order ID: ${order.id || order.orderId}</span>
                                            <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
                                        </div>
                                        <div class="order-products">
                                            ${order.items.map(item => `
                                                <div class="order-product">
                                                    <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2212%22%3ENo Image%3C/text%3E%3C/svg%3E'}" alt="${item.name}">
                                                    <div class="product-details">
                                                        <div class="product-name">${item.name || item.productName}</div>
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

                        <!-- 5. My Coupons Tab -->
                        <div id="user-tab-coupons" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>My Vouchers</h1>
                                <div style="display: flex; gap: 1rem; font-size: 0.875rem;">
                                    <a href="#" style="color: var(--primary);">Get more vouchers</a>
                                    <span style="color: #ddd;">|</span>
                                    <a href="#" style="color: var(--primary);">View voucher history</a>
                                </div>
                            </div>

                            <!-- Add Voucher Section -->
                            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 4px; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                                <span style="font-weight: 500; color: #333;">Add Voucher</span>
                                <input type="text" placeholder="Please enter voucher code" style="flex: 1; padding: 0.625rem; border: 1px solid #e0e0e0; border-radius: 2px; outline: none;">
                                <button style="background: #e0e0e0; color: #999; border: none; padding: 0.625rem 1.5rem; border-radius: 2px; cursor: not-allowed;">Redeem</button>
                            </div>

                            <!-- Voucher Tabs -->
                            <div style="border-bottom: 1px solid #e0e0e0; margin-bottom: 1.5rem;">
                                <div style="display: inline-block; padding: 0.75rem 1.5rem; color: var(--primary); border-bottom: 2px solid var(--primary); font-weight: 500;">
                                    All (${myCoupons.length})
                                </div>
                            </div>

                            <!-- Vouchers List -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                ${myCoupons.map(coupon => `
                                    <div style="display: flex; background: white; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                        <!-- Left Side (Image/Icon) -->
                                        <div style="width: 120px; background: ${coupon.color}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 1rem; position: relative; border-right: 2px dashed white;">
                                            <div style="font-size: 2rem; font-weight: 700;">%</div>
                                            <div style="font-size: 0.75rem; margin-top: 0.25rem;">LUMINA</div>
                                            <!-- Sawtooth border effect simulation -->
                                            <div style="position: absolute; right: -6px; top: 0; bottom: 0; width: 10px; background-image: radial-gradient(circle, white 4px, transparent 5px); background-size: 10px 14px; background-repeat: repeat-y;"></div>
                                        </div>
                                        
                                        <!-- Right Side (Details) -->
                                        <div style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: center;">
                                            <div style="font-size: 1rem; font-weight: 600; color: #333; margin-bottom: 0.25rem;">${coupon.description}</div>
                                            <div style="font-size: 0.875rem; color: #666; margin-bottom: 0.25rem;">${coupon.condition}</div>
                                            <div style="font-size: 0.75rem; color: #999; margin-bottom: 0.5rem;">Valid till: 31.12.2025</div>
                                            
                                            <div style="display: flex; justify-content: flex-end;">
                                                <button style="color: var(--primary); background: white; border: 1px solid var(--primary); padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 2px; cursor: pointer;">Use</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>

        <style>
            .user-page-wrapper {
                background-color: #f5f5f5;
                min-height: calc(100vh - 64px);
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
                transition: color 0.2s;
            }
            .sidebar-link:hover {
                color: var(--primary);
            }
            .sidebar-link.active {
                color: var(--accent); /* User requested accent color */
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
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
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

            /* Forms */
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
                transition: border-color 0.2s;
            }
            .form-input:focus {
                border-color: #888;
            }
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                color: #555;
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
                overflow: hidden;
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
