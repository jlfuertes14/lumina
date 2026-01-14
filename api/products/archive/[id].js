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
        const urlParts = req.url.split('/');
        const id = urlParts[urlParts.length - 1].split('?')[0];

        let deletedProduct = await DeletedProduct.findById(id);

        if (!deletedProduct) {
            deletedProduct = await DeletedProduct.findOne({ originalId: id });
        }

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Archived product not found' });
        }

        return res.json({ success: true, data: deletedProduct });
    } catch (error) {
        console.error('Archive error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
