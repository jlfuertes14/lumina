const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const Product = require('../../../server/models/Product');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const threshold = parseInt(req.query.threshold) || 10;
        const products = await Product.find({ stock: { $lt: threshold, $gt: 0 } });
        return res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        console.error('Low stock error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
