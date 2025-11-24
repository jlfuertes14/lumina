const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true,
        ref: 'User'
    },
    items: [{
        productId: {
            type: Number,
            required: true,
            ref: 'Product'
        },
        productName: String,
        price: Number,
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        default: 'Cash on Delivery'
    },
    shippingAddress: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for queries
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', orderSchema);
