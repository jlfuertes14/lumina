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
        const categories = await Product.distinct('category');
        return res.json({ success: true, data: categories });
    } catch (error) {
        console.error('Categories error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
