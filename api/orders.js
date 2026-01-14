const { connectToDatabase } = require('./_lib/mongodb');
const { handleCors } = require('./_lib/cors');
const Order = require('../server/models/Order');
const Product = require('../server/models/Product');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    await connectToDatabase();

    const url = req.url;
    const method = req.method;

    try {
        // GET /api/orders/my-orders
        if (url.includes('/my-orders') && method === 'GET') {
            const { userId } = req.query;
            if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

            const orders = await Order.find({ userId: parseInt(userId) }).sort({ createdAt: -1 });
            return res.json({ success: true, data: orders, count: orders.length });
        }

        // GET /api/orders/stats/summary
        if (url.includes('/stats/summary') && method === 'GET') {
            const totalOrders = await Order.countDocuments();
            const salesResult = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$total' } } }]);
            const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;
            const statusBreakdown = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
            return res.json({ success: true, data: { totalOrders, totalSales, statusBreakdown } });
        }

        // GET /api/orders/stats/recent
        if (url.includes('/stats/recent') && method === 'GET') {
            const limit = parseInt(req.query.limit) || 10;
            const orders = await Order.find().sort({ createdAt: -1 }).limit(limit);
            return res.json({ success: true, data: orders });
        }

        // Extract orderId from URL
        const orderMatch = url.match(/\/orders\/([A-Z0-9-]+)/i);
        const orderId = orderMatch ? orderMatch[1] : null;

        if (orderId && orderId !== 'my-orders' && orderId !== 'stats') {
            // PUT /api/orders/:orderId/status
            if (url.includes('/status') && method === 'PUT') {
                const { status } = req.body;
                const order = await Order.findOneAndUpdate({ orderId }, { status }, { new: true });
                if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
                return res.json({ success: true, data: order });
            }

            // GET /api/orders/:orderId
            if (method === 'GET') {
                const order = await Order.findOne({ orderId });
                if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
                return res.json({ success: true, data: order });
            }

            // DELETE /api/orders/:orderId
            if (method === 'DELETE') {
                const order = await Order.findOneAndDelete({ orderId });
                if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
                return res.json({ success: true, message: 'Order deleted successfully' });
            }
        }

        // GET /api/orders - List all orders
        if (method === 'GET') {
            const { userId, status, startDate, endDate } = req.query;
            let query = {};
            if (userId) query.userId = parseInt(userId);
            if (status) query.status = status;
            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }
            const orders = await Order.find(query).sort({ createdAt: -1 });
            return res.json({ success: true, data: orders, count: orders.length });
        }

        // POST /api/orders - Create new order
        if (method === 'POST') {
            const { userId, items } = req.body;
            let total = 0;
            const orderItems = [];

            for (const item of items) {
                const product = await Product.findOne({ id: item.productId });
                if (!product) return res.status(404).json({ success: false, error: `Product ${item.productId} not found` });
                if (product.stock < item.quantity) return res.status(400).json({ success: false, error: `Insufficient stock for ${product.name}` });

                product.stock -= item.quantity;
                await product.save();

                orderItems.push({
                    productId: product.id, productName: product.name, price: product.price,
                    quantity: item.quantity, image: product.image
                });
                total += product.price * item.quantity;
            }

            const newOrderId = `ORD-${Date.now().toString().slice(-6)}`;
            const order = new Order({
                orderId: newOrderId, userId, items: orderItems,
                total: req.body.total || total, status: req.body.status || 'Pending',
                paymentMethod: req.body.paymentMethod || 'Cash on Delivery',
                shippingInfo: req.body.shippingInfo || null
            });
            await order.save();
            return res.status(201).json({ success: true, data: order });
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ success: false, error: `Method ${method} not allowed` });

    } catch (error) {
        console.error('Orders API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
