const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const Order = require('../../server/models/Order');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

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
            default:
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

        return res.json({ success: true, data: sales });
    } catch (error) {
        console.error('Sales analytics error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
