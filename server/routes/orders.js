const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const UserDevice = require('../models/UserDevice');

// GET all orders
router.get('/', async (req, res) => {
    try {
        const { userId, status, startDate, endDate } = req.query;

        let query = {};

        // Filter by user
        if (userId) {
            query.userId = parseInt(userId);
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by date range
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json({ success: true, data: orders, count: orders.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single order
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create new order
router.post('/', async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Calculate total and validate products
        let total = 0;
        const orderItems = [];
        const registeredDevices = []; // Track devices registered with this order

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
                quantity: item.quantity
            });

            total += product.price * item.quantity;

            // Check if product requires device registration (ESP32 Smart Cars)
            if (product.requiresDeviceRegistration) {
                // Create a device registration for each unit purchased
                for (let i = 0; i < item.quantity; i++) {
                    const deviceId = `ESP32-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
                    const deviceToken = crypto.randomBytes(16).toString('hex');

                    const userDevice = new UserDevice({
                        userId,
                        deviceId,
                        deviceToken,
                        productId: product._id,
                        deviceName: `${product.name} #${i + 1}`,
                        status: 'pending',
                        orderReference: `ORD-${Date.now().toString().slice(-6)}`
                    });

                    await userDevice.save();

                    registeredDevices.push({
                        deviceId,
                        deviceToken,
                        productName: product.name,
                        setupInstructions: 'Please use these credentials to configure your ESP32 Smart Car. Keep your device token secure!'
                    });
                }
            }
        }

        // Generate order ID
        const orderId = `ORD-${Date.now().toString().slice(-6)}`;

        const order = new Order({
            orderId,
            userId,
            items: orderItems,
            total,
            status: req.body.status || 'Pending'
        });

        await order.save();

        // Include device credentials in response if any devices were registered
        const response = {
            success: true,
            data: order
        };

        if (registeredDevices.length > 0) {
            response.devices = registeredDevices;
            response.message = 'Order created successfully! Device registration credentials have been generated. Please check your email for setup instructions.';
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update order status
router.put('/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE order (admin only - consider adding auth)
router.delete('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.orderId });

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Optionally restore stock
        // for (const item of order.items) {
        //     await Product.findOneAndUpdate(
        //         { id: item.productId },
        //         { $inc: { stock: item.quantity } }
        //     );
        // }

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET order statistics (for admin dashboard)
router.get('/stats/summary', async (req, res) => {
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

        res.json({
            success: true,
            data: {
                totalOrders,
                totalSales,
                statusBreakdown
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET recent orders (for admin dashboard)
router.get('/stats/recent', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const orders = await Order.find().sort({ createdAt: -1 }).limit(limit);
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
