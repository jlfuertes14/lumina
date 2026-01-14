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
        const products = await Product.find({ stock: 0 });
        return res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        console.error('Out of stock error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
