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
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'userId is required'
            });
        }

        const orders = await Order.find({ userId: parseInt(userId) })
            .sort({ createdAt: -1 });

        return res.json({ success: true, data: orders, count: orders.length });
    } catch (error) {
        console.error('My orders error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
