# Checkout Page Components

This file contains the new CheckoutPage and OrderConfirmationPage components that need to be added to main.js after the CartPage component (after line 696).

```javascript
const CheckoutPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    const selectedItems = state.cart.filter(item => item.selected !== false);
    if (selectedItems.length === 0) {
        showToast('No items selected for checkout');
        navigate('cart');
        return '';
    }

    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = state.checkoutData.shippingFee;
    const total = subtotal + shippingFee;

    return `
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('cart')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Back to Cart
            </button>

            <h1 style="margin-bottom: 2rem;">Checkout</h1>

            <div style="display: grid; grid-template-columns: 1fr 400px; gap: 2rem;">
                <!-- Left Column: Shipping & Payment -->
                <div>
                    <!-- Shipping Information -->
                    <div class="admin-section" style="margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">📍 Shipping Information</h2>
                        <form id="shippingForm">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Full Name *</label>
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        class="form-input" 
                                        value="${state.checkoutData.shipping.fullName || state.currentUser.name}" 
                                        required
                                        oninput="window.updateShippingInfo('fullName', this.value)"
                                    >
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        class="form-input" 
                                        value="${state.checkoutData.shipping.phone}" 
                                        required
                                        placeholder="09XX-XXX-XXXX"
                                        oninput="window.updateShippingInfo('phone', this.value)"
                                    >
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Address *</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    class="form-input" 
                                    value="${state.checkoutData.shipping.address}" 
                                    required
                                    placeholder="Street address, house number"
                                    oninput="window.updateShippingInfo('address', this.value)"
                                >
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">City *</label>
                                    <input 
                                        type="text" 
                                        name="city" 
                                        class="form-input" 
                                        value="${state.checkoutData.shipping.city}" 
                                        required
                                        oninput="window.updateShippingInfo('city', this.value)"
                                    >
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Province *</label>
                                    <input 
                                        type="text" 
                                        name="province" 
                                        class="form-input" 
                                        value="${state.checkoutData.shipping.province}" 
                                        required
                                        oninput="window.updateShippingInfo('province', this.value)"
                                    >
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Postal Code</label>
                                    <input 
                                        type="text" 
                                name="postalCode" 
                                        class="form-input" 
                                        value="${state.checkoutData.shipping.postalCode}" 
                                        placeholder="Optional"
                                        oninput="window.updateShippingInfo('postalCode', this.value)"
                                    >
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea 
                                    name="instructions" 
                                    class="form-input" 
                                    rows="3"
                                    placeholder="Floor number, landmark, etc."
                                    oninput="window.updateShippingInfo('instructions', this.value)"
                                >${state.checkoutData.shipping.instructions}</textarea>
                            </div>
                        </form>
                    </div>

                    <!-- Payment Method -->
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                            ${[
                                { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                                { id: 'gcash', label: 'GCash', icon: '💙' },
                                { id: 'maya', label: 'Maya', icon: '💚' },
                                { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                                { id: 'bank', label: 'Bank Transfer', icon: '🏦' }
                            ].map(method => `
                                <div 
                                    class="payment-method-card ${state.checkoutData.paymentMethod === method.id ? 'selected' : ''}" 
                                    onclick="window.selectPaymentMethod('${method.id}')"
                                    style="
                                        padding: 1rem;
                                        border: 2px solid ${state.checkoutData.paymentMethod === method.id ? 'var(--primary)' : 'var(--border)'};
                                        border-radius: var(--radius-md);
                                        cursor: pointer;
                                        text-align: center;
                                        transition: all 0.2s;
                                        background: ${state.checkoutData.paymentMethod === method.id ? 'rgba(0, 43, 91, 0.05)' : 'var(--surface)'};
                                    "
                                >
                                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${method.icon}</div>
                                    <div style="font-size: 0.875rem; font-weight: 600;">${method.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Order Summary -->
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${selectedItems.map(item => `
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${item.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${formatCurrency(item.price * item.quantity)}</div>
                                </div>
                            `).join('')}
                        </div>

                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${formatCurrency(subtotal)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${formatCurrency(shippingFee)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button 
                            class="btn btn-primary" 
                            onclick="window.placeOrder()" 
                            style="width: 100%; padding: 1rem; font-size: 1rem;"
                        >
                            Place Order
                        </button>

                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">
                            🔒 Your payment information is secure
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const OrderConfirmationPage = () => {
    if (!state.lastOrderId) {
        navigate('home');
        return '';
    }

    const order = state.orders.find(o => o.orderId === state.lastOrderId);
    if (!order) {
        navigate('home');
        return '';
    }

    // Calculate estimated delivery (3-5 business days)
    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 3);
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 5);

    const deliveryRange = `${minDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${maxDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return `
        <div style="max-width: 800px; margin: 4rem auto; padding: 0 2rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                    ✓
                </div>
                <h1 style="color: var(--success); margin-bottom: 0.5rem;">Order Placed Successfully!</h1>
                <p style="font-size: 1.125rem; color: var(--text-muted);">Thank you for your purchase</p>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <div style="background: var(--surface-alt); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Number</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">#${order.orderId}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Date</div>
                            <div style="font-weight: 600;">${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">1</div>
                        <div style="font-weight: 600;">Estimated Delivery</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${deliveryRange}
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${state.checkoutData.paymentMethod === 'cod' ? 'warning' : 'success'}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${state.checkoutData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Payment Confirmed'}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${state.checkoutData.shipping.fullName}<br>
                        ${state.checkoutData.shipping.address}<br>
                        ${state.checkoutData.shipping.city}, ${state.checkoutData.shipping.province} ${state.checkoutData.shipping.postalCode}<br>
                        ${state.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${order.items.map(item => `
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.productName || item.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${item.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${formatCurrency(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${formatCurrency(order.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">
                    🖨️ Print Receipt
                </button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">
                    🏠 Back to Shop
                </button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    An email confirmation has been sent to <strong>${state.currentUser.email}</strong>
                </p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">
                    Questions? Contact us at support@luminaelectronics.com
                </p>
            </div>
        </div>
    `;
};
```

## Helper Functions to Add

Add these functions after the checkout function (around line 1170):

```javascript
// Update shipping information
window.updateShippingInfo = (field, value) => {
    state.checkoutData.shipping[field] = value;
};

// Select payment method
window.selectPaymentMethod = (method) => {
    state.checkoutData.paymentMethod = method;
    render();
};

// Place order function
window.placeOrder = async () => {
    // Validate shipping information
    const shipping = state.checkoutData.shipping;
    if (!shipping.fullName || !shipping.phone || !shipping.address || !shipping.city || !shipping.province) {
        showToast('Please fill in all required shipping fields');
        return;
    }

    const selectedItems = state.cart.filter(item => item.selected !== false);
    
    const orderData = {
        userId: state.currentUser.id,
        items: selectedItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name
        })),
        total: selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + state.checkoutData.shippingFee,
        shippingInfo: state.checkoutData.shipping,
        paymentMethod: state.checkoutData.paymentMethod,
        shippingFee: state.checkoutData.shippingFee
    };

    try {
        const response = await api.createOrder(orderData);
        state.lastOrderId = response.orderId;
        // Clear cart
        state.cart = state.cart.filter(item => item.selected === false);
        saveState();
        navigate('order-confirmation');
    } catch (error) {
        // Error already handled in api.createOrder
    }
};

// Print receipt
window.printReceipt = () => {
    window.print();
};
```
