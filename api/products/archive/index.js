const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const DeletedProduct = require('../../../server/models/DeletedProduct');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const deletedProducts = await DeletedProduct.find().sort({ deletedAt: -1 });
        return res.json({ success: true, data: deletedProducts, count: deletedProducts.length });
    } catch (error) {
        console.error('Archive error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
