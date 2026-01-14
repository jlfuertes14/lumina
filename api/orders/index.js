const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const crypto = require('crypto');
const Order = require('../../server/models/Order');
const Product = require('../../server/models/Product');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            // GET all orders
            const { userId, status, startDate, endDate } = req.query;

            let query = {};

            if (userId) {
                query.userId = parseInt(userId);
            }

            if (status) {
                query.status = status;
            }

            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }

            const orders = await Order.find(query).sort({ createdAt: -1 });
            return res.json({ success: true, data: orders, count: orders.length });

        } else if (req.method === 'POST') {
            // POST create new order
            const { userId, items } = req.body;

            let total = 0;
            const orderItems = [];

            for (const item of items) {
                const product = await Product.findOne({ id: item.productId });

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        error: `Product ${item.productId} not found`
                    });
                }

                if (product.stock < item.quantity) {
                    return res.status(400).json({
                        success: false,
                        error: `Insufficient stock for ${product.name}`
                    });
                }

                // Update product stock
                product.stock -= item.quantity;
                await product.save();

                orderItems.push({
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity: item.quantity,
                    image: product.image
                });

                total += product.price * item.quantity;
            }

            // Generate order ID
            const orderId = `ORD-${Date.now().toString().slice(-6)}`;

            const order = new Order({
                orderId,
                userId,
                items: orderItems,
                total: req.body.total || total,
                status: req.body.status || 'Pending',
                paymentMethod: req.body.paymentMethod || 'Cash on Delivery',
                shippingInfo: req.body.shippingInfo || null
            });

            await order.save();

            return res.status(201).json({
                success: true,
                data: order
            });

        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Orders API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
