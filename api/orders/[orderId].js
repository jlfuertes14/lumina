const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const Order = require('../../server/models/Order');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    // Extract orderId from URL path
    const urlParts = req.url.split('/');
    const orderId = urlParts[urlParts.length - 1].split('?')[0];

    try {
        if (req.method === 'GET') {
            const order = await Order.findOne({ orderId });
            if (!order) {
                return res.status(404).json({ success: false, error: 'Order not found' });
            }
            return res.json({ success: true, data: order });

        } else if (req.method === 'DELETE') {
            const order = await Order.findOneAndDelete({ orderId });

            if (!order) {
                return res.status(404).json({ success: false, error: 'Order not found' });
            }

            return res.json({ success: true, message: 'Order deleted successfully' });

        } else {
            res.setHeader('Allow', ['GET', 'DELETE']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Order API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
