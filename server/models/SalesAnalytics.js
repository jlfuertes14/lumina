const mongoose = require('mongoose');

// For tracking daily/monthly sales analytics
const salesAnalyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        index: true
    },
    totalSales: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    topProducts: [{
        productId: Number,
        productName: String,
        quantity: Number,
        revenue: Number
    }],
    categoryBreakdown: [{
        category: String,
        sales: Number,
        orders: Number
    }]
}, {
    timestamps: true
});

salesAnalyticsSchema.index({ date: -1 });

module.exports = mongoose.model('SalesAnalytics', salesAnalyticsSchema);
