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
        const limit = parseInt(req.query.limit) || 10;
        const orders = await Order.find().sort({ createdAt: -1 }).limit(limit);
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Recent orders error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
