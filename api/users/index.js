const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const User = require('../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            // GET all users
            const users = await User.find().select('-password');
            return res.json({ success: true, data: users, count: users.length });

        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Users API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
