const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const Order = require('../../../server/models/Order');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const totalOrders = await Order.countDocuments();

        const salesResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$total' }
                }
            }
        ]);

        const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;

        const statusBreakdown = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.json({
            success: true,
            data: {
                totalOrders,
                totalSales,
                statusBreakdown
            }
        });
    } catch (error) {
        console.error('Order summary error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
