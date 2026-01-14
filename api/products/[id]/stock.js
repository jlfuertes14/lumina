const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const Product = require('../../../server/models/Product');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        // Extract ID from URL path
        const urlParts = req.url.split('/');
        const idIndex = urlParts.findIndex(part => part === 'products') + 1;
        const id = urlParts[idIndex];

        const { stock } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: parseInt(id) },
            { stock: parseInt(stock) },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        return res.json({ success: true, data: product });
    } catch (error) {
        console.error('Stock update error:', error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
