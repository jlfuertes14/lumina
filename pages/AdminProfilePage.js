import { formatCurrency } from '../src/utils.js';
export const AdminProfilePage = ({ state }) => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }
    // --- Event Handlers ---

    // 1. Profile Update
    if (!window.handleAdminProfileUpdate) {
        window.handleAdminProfileUpdate = async (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            // Validation
            if (!name || !email || !phone) {
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
            try {
                await window.api.updateProfile(state.currentUser.id, { name, email, phone });
                window.render();
            } catch (error) {
                console.error('Profile update failed:', error);
            }
        };
    }
    // 2. Password Update
    if (!window.handleAdminPasswordUpdate) {
        window.handleAdminPasswordUpdate = async (event) => {
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
            try {
                await window.api.changePassword(state.currentUser.id, currentPass, newPass);
                form.reset();
            } catch (error) {
                console.error('Password change failed:', error);
            }
        };
    }
    // 3. Tab Switching (renamed to avoid conflict with AdminPage.js)
    if (!window.switchAdminProfileTab) {
        window.switchAdminProfileTab = (tabName) => {
            document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
            const target = document.getElementById(`admin-tab-${tabName}`);
            if (target) target.style.display = 'block';
            document.querySelectorAll('.admin-sidebar-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
            if (activeLink) activeLink.classList.add('active');
            window.scrollTo(0, 0);
        };
    }
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
                                <a href="#" onclick="window.switchAdminProfileTab('profile'); return false;" class="edit-profile-link">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    Edit Profile
                                </a>
                            </div>
                        </div>
                        <nav class="user-nav">
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">👤</span>
                                    My Profile
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="admin-sidebar-link active" data-tab="profile" onclick="window.switchAdminProfileTab('profile'); return false;">Profile</a></li>
                                    <li><a href="#" class="admin-sidebar-link" data-tab="password" onclick="window.switchAdminProfileTab('password'); return false;">Change Password</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- Profile Tab -->
                        <div id="admin-tab-profile" class="admin-tab-content">
                            <div class="content-header">
                                <h1>My Profile</h1>
                                <p>Manage your admin account information</p>
                            </div>
                            <form onsubmit="window.handleAdminProfileUpdate(event)" style="max-width: 600px;">
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" value="${state.currentUser.name}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" value="${state.currentUser.email}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" name="phone" value="${state.currentUser.phone || ''}" class="form-input" placeholder="09XXXXXXXXX" required>
                                </div>
                                <button type="submit" class="btn-save">Save Changes</button>
                            </form>
                        </div>
                        <!-- Change Password Tab -->
                        <div id="admin-tab-password" class="admin-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>Change Password</h1>
                                <p>Update your account password</p>
                            </div>
                            <form onsubmit="window.handleAdminPasswordUpdate(event)" style="max-width: 400px;">
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
                                <button type="submit" class="btn-save">Change Password</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <style>
            /* Reuse UserPage styles */
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
            
            .user-sidebar {
                width: 250px;
                flex-shrink: 0;
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
            .admin-sidebar-link {
                color: #666;
                text-decoration: none;
                font-size: 14px;
                display: block;
                transition: color 0.2s;
            }
            .admin-sidebar-link:hover {
                color: var(--primary);
            }
            .admin-sidebar-link.active {
                color: var(--accent);
                font-weight: 500;
            }
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
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                color: #555;
            }
            .form-input {
                width: 100%;
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
        </style>
    `;
};