const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const User = require('../../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const count = await User.countDocuments({ role: 'customer' });
        return res.json({ success: true, data: { customerCount: count } });
    } catch (error) {
        console.error('Customer stats error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
