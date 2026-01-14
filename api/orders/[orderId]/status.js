const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const Order = require('../../../server/models/Order');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        // Extract orderId from URL path
        const urlParts = req.url.split('/');
        const idIndex = urlParts.findIndex(part => part === 'orders') + 1;
        const orderId = urlParts[idIndex];

        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        return res.json({ success: true, data: order });
    } catch (error) {
        console.error('Order status error:', error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
