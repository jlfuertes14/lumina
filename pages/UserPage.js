export const UserPage = ({ state }) => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    // --- Data Preparation ---
    const userOrders = state.orders.filter(o => o.userId === state.currentUser.id);

    // Order Status Filtering
    const toShipOrders = userOrders.filter(o => o.status === 'Pending');
    const toReceiveOrders = userOrders.filter(o => o.status === 'Shipped');
    const completedOrders = userOrders.filter(o => o.status === 'Delivered');

    // Mock Coupons
    const coupons = [
        { code: 'WELCOME10', description: '10% Off First Order', validUntil: '2024-12-31', claimed: false },
        { code: 'FREESHIP', description: 'Free Shipping Voucher', validUntil: '2024-12-31', claimed: true },
        { code: 'LOYALTY5', description: '5% Off for Loyal Customers', validUntil: '2024-06-30', claimed: false }
    ];

    // --- Event Handlers (Attached to window for inline access) ---
    if (!window.handleProfileUpdate) {
        window.handleProfileUpdate = (event) => {
            event.preventDefault();
            const form = event.target;
            const updatedUser = {
                ...state.currentUser,
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                address: form.address.value
            };

            // Update State
            state.currentUser = updatedUser;

            // Update LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Update Users Array (Mock Backend Update)
            const userIndex = state.users.findIndex(u => u.id === updatedUser.id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
            }

            alert('Profile updated successfully!');
            render(); // Re-render to show changes
        };
    }

    if (!window.switchOrderTab) {
        window.switchOrderTab = (tabName) => {
            // Simple tab switching logic using data attributes or just re-rendering with a local 'activeTab' state if we were using React.
            // Since we are using vanilla JS string templates, we might need a global state for the active tab or just use CSS/JS to toggle visibility.
            // For simplicity in this architecture, let's use a small script to toggle classes.

            document.querySelectorAll('.order-tab-content').forEach(el => el.style.display = 'none');
            document.getElementById(`tab-${tabName}`).style.display = 'block';

            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        };
    }

    if (!window.claimCoupon) {
        window.claimCoupon = (code) => {
            alert(`Coupon ${code} claimed!`);
            // In a real app, we'd call an API. Here we just show feedback.
        };
    }

    // --- Render Helpers ---
    const renderOrderCard = (order) => `
        <div class="order-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: white;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">Order #${order.orderId}</span>
                <span style="color: var(--text-muted); font-size: 0.875rem;">${new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div style="margin-bottom: 0.5rem;">
                ${order.items.map(item => `
                    <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                        <img src="${item.image || 'assets/placeholder.png'}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <div style="font-size: 0.9rem;">${item.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">x${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; border-top: 1px solid var(--border);">
                <span style="font-weight: 600;">Total: ${formatCurrency(order.total)}</span>
                <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
        </div>
    `;

    return `
        <div class="user-page-container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <!-- Header -->
            <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), #0EA5E9); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                    ${state.currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 style="margin: 0; font-size: 1.75rem;">${state.currentUser.name}</h1>
                    <p style="color: var(--text-muted); margin: 0.25rem 0 0;">${state.currentUser.email}</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                <!-- Left Column: Orders & Coupons -->
                <div class="main-content">
                    
                    <!-- Coupons Section -->
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 2rem;">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            🎟️ My Coupons
                        </h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
                            ${coupons.map(coupon => `
                                <div style="border: 2px dashed ${coupon.claimed ? '#cbd5e1' : 'var(--primary)'}; border-radius: 8px; padding: 1rem; background: ${coupon.claimed ? '#f8fafc' : '#eff6ff'}; position: relative;">
                                    <div style="font-weight: 700; color: ${coupon.claimed ? '#94a3b8' : 'var(--primary)'};">${coupon.code}</div>
                                    <div style="font-size: 0.875rem; margin: 0.5rem 0;">${coupon.description}</div>
                                    ${coupon.claimed
            ? '<span style="font-size: 0.75rem; color: #64748b; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">Claimed</span>'
            : `<button onclick="window.claimCoupon('${coupon.code}')" style="font-size: 0.75rem; padding: 4px 8px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">Claim</button>`
        }
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Orders Section -->
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">📦 My Orders</h2>
                        
                        <!-- Tabs -->
                        <div style="display: flex; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem;">
                            <button class="tab-btn active" data-tab="to-ship" onclick="window.switchOrderTab('to-ship')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid var(--primary); color: var(--primary); font-weight: 600; cursor: pointer;">To Ship (${toShipOrders.length})</button>
                            <button class="tab-btn" data-tab="to-receive" onclick="window.switchOrderTab('to-receive')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">To Receive (${toReceiveOrders.length})</button>
                            <button class="tab-btn" data-tab="completed" onclick="window.switchOrderTab('completed')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">Completed (${completedOrders.length})</button>
                        </div>

                        <!-- Tab Contents -->
                        <div id="tab-to-ship" class="order-tab-content">
                            ${toShipOrders.length > 0 ? toShipOrders.map(renderOrderCard).join('') : '<p class="text-muted">No orders to ship.</p>'}
                        </div>
                        <div id="tab-to-receive" class="order-tab-content" style="display: none;">
                            ${toReceiveOrders.length > 0 ? toReceiveOrders.map(renderOrderCard).join('') : '<p class="text-muted">No orders to receive.</p>'}
                        </div>
                        <div id="tab-completed" class="order-tab-content" style="display: none;">
                            ${completedOrders.length > 0 ? completedOrders.map(renderOrderCard).join('') : '<p class="text-muted">No completed orders yet.</p>'}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Edit Profile -->
                <div class="sidebar">
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: sticky; top: 2rem;">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">✏️ Edit Profile</h2>
                        <form onsubmit="window.handleProfileUpdate(event)">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Full Name</label>
                                <input type="text" name="name" value="${state.currentUser.name}" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Email</label>
                                <input type="email" name="email" value="${state.currentUser.email}" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Phone</label>
                                <input type="tel" name="phone" value="${state.currentUser.phone || ''}" placeholder="0912 345 6789" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Address</label>
                                <textarea name="address" rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">${state.currentUser.address || ''}</textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .tab-btn.active {
                color: var(--primary) !important;
                border-bottom-color: var(--primary) !important;
            }
            .tab-btn:hover {
                color: var(--primary) !important;
            }
        </style>
    `;
};
