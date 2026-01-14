const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const Order = require('../../server/models/Order');
const Product = require('../../server/models/Product');
const User = require('../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

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

        // Total Customers
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

        return res.json({
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
        console.error('Dashboard error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
