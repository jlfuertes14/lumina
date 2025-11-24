const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const SalesAnalytics = require('../models/SalesAnalytics');

// GET dashboard summary
router.get('/dashboard', async (req, res) => {
    try {
        // Total Sales
        const salesResult = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: '$total' } } }
        ]);
        const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;

        // Total Orders
        const totalOrders = await Order.countDocuments();

        // Total Products
        const totalProducts = await Product.countDocuments();

        // Total Customers (assuming users with role 'customer')
        const User = require('../models/User');
        const totalCustomers = await User.countDocuments({ role: 'customer' });

        // Sales by Status
        const ordersByStatus = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$total' } } }
        ]);

        // Top selling products
        const topProducts = await Order.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.productId',
                    productName: { $first: '$items.productName' },
                    totalQuantity: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 }
        ]);

        // Sales trend (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const salesTrend = await Order.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    sales: { $sum: '$total' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Low stock alerts
        const lowStockProducts = await Product.find({ stock: { $lt: 10, $gt: 0 } });
        const outOfStockProducts = await Product.find({ stock: 0 });

        // Category breakdown
        const categoryBreakdown = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            data: {
                summary: {
                    totalSales,
                    totalOrders,
                    totalProducts,
                    totalCustomers
                },
                ordersByStatus,
                topProducts,
                salesTrend,
                inventory: {
                    lowStock: lowStockProducts,
                    outOfStock: outOfStockProducts
                },
                categoryBreakdown
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET sales by period (daily, weekly, monthly)
router.get('/sales', async (req, res) => {
    try {
        const { period = 'daily', startDate, endDate } = req.query;

        let groupFormat;
        switch (period) {
            case 'monthly':
                groupFormat = '%Y-%m';
                break;
            case 'weekly':
                groupFormat = '%Y-W%U';
                break;
            default: // daily
                groupFormat = '%Y-%m-%d';
        }

        let matchQuery = {};
        if (startDate || endDate) {
            matchQuery.createdAt = {};
            if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
            if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
        }

        const sales = await Order.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
                    totalSales: { $sum: '$total' },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ success: true, data: sales });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET product performance
router.get('/products/performance', async (req, res) => {
    try {
        const performance = await Order.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.productId',
                    foreignField: 'id',
                    as: 'productInfo'
                }
            },
            { $unwind: '$productInfo' },
            {
                $group: {
                    _id: '$items.productId',
                    productName: { $first: '$items.productName' },
                    category: { $first: '$productInfo.category' },
                    totalSold: { $sum: '$items.quantity' },
                    revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    currentStock: { $first: '$productInfo.stock' }
                }
            },
            { $sort: { revenue: -1 } }
        ]);

        res.json({ success: true, data: performance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET revenue by category
router.get('/revenue/by-category', async (req, res) => {
    try {
        const categoryRevenue = await Order.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.productId',
                    foreignField: 'id',
                    as: 'productInfo'
                }
            },
            { $unwind: '$productInfo' },
            {
                $group: {
                    _id: '$productInfo.category',
                    revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    orders: { $sum: 1 },
                    itemsSold: { $sum: '$items.quantity' }
                }
            },
            { $sort: { revenue: -1 } }
        ]);

        res.json({ success: true, data: categoryRevenue });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
