const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const DeletedUser = require('../../../server/models/DeletedUser');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const { role } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }

        const deletedUsers = await DeletedUser.find(query)
            .select('-password')
            .sort({ deletedAt: -1 });
        return res.json({ success: true, data: deletedUsers, count: deletedUsers.length });
    } catch (error) {
        console.error('Archive error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
