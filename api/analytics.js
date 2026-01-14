const { connectToDatabase } = require('./_lib/mongodb');
const { handleCors } = require('./_lib/cors');
const Order = require('../server/models/Order');
const Product = require('../server/models/Product');
const User = require('../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();
    const url = req.url;

    try {
        // GET /api/analytics/sales
        if (url.includes('/sales')) {
            const { period = 'daily', startDate, endDate } = req.query;
            let groupFormat;
            switch (period) {
                case 'monthly': groupFormat = '%Y-%m'; break;
                case 'weekly': groupFormat = '%Y-W%U'; break;
                default: groupFormat = '%Y-%m-%d';
            }

            let matchQuery = {};
            if (startDate || endDate) {
                matchQuery.createdAt = {};
                if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
                if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
            }

            const sales = await Order.aggregate([
                { $match: matchQuery },
                { $group: { _id: { $dateToString: { format: groupFormat, date: '$createdAt' } }, totalSales: { $sum: '$total' }, totalOrders: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]);
            return res.json({ success: true, data: sales });
        }

        // GET /api/analytics/products/performance
        if (url.includes('/products/performance')) {
            const performance = await Order.aggregate([
                { $unwind: '$items' },
                { $lookup: { from: 'products', localField: 'items.productId', foreignField: 'id', as: 'productInfo' } },
                { $unwind: '$productInfo' },
                { $group: { _id: '$items.productId', productName: { $first: '$items.productName' }, category: { $first: '$productInfo.category' }, totalSold: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }, currentStock: { $first: '$productInfo.stock' } } },
                { $sort: { revenue: -1 } }
            ]);
            return res.json({ success: true, data: performance });
        }

        // GET /api/analytics/revenue/by-category
        if (url.includes('/revenue/by-category')) {
            const categoryRevenue = await Order.aggregate([
                { $unwind: '$items' },
                { $lookup: { from: 'products', localField: 'items.productId', foreignField: 'id', as: 'productInfo' } },
                { $unwind: '$productInfo' },
                { $group: { _id: '$productInfo.category', revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }, orders: { $sum: 1 }, itemsSold: { $sum: '$items.quantity' } } },
                { $sort: { revenue: -1 } }
            ]);
            return res.json({ success: true, data: categoryRevenue });
        }

        // GET /api/analytics/dashboard (default)
        const salesResult = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$total' } } }]);
        const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'customer' });

        const ordersByStatus = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$total' } } }]);

        const topProducts = await Order.aggregate([
            { $unwind: '$items' },
            { $group: { _id: '$items.productId', productName: { $first: '$items.productName' }, totalQuantity: { $sum: '$items.quantity' }, totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 }
        ]);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const salesTrend = await Order.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, sales: { $sum: '$total' }, orders: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const lowStockProducts = await Product.find({ stock: { $lt: 10, $gt: 0 } });
        const outOfStockProducts = await Product.find({ stock: 0 });

        const categoryBreakdown = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 }, totalValue: { $sum: { $multiply: ['$price', '$stock'] } } } },
            { $sort: { count: -1 } }
        ]);

        return res.json({
            success: true,
            data: {
                summary: { totalSales, totalOrders, totalProducts, totalCustomers },
                ordersByStatus, topProducts, salesTrend,
                inventory: { lowStock: lowStockProducts, outOfStock: outOfStockProducts },
                categoryBreakdown
            }
        });

    } catch (error) {
        console.error('Analytics API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
