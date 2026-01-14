const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const User = require('../../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    // Extract ID from URL path
    const urlParts = req.url.split('/');
    const idIndex = urlParts.findIndex(part => part === 'users') + 1;
    const id = urlParts[idIndex];

    try {
        const { avatar } = req.body;

        const existingUser = await User.findOne({ id: parseInt(id) });
        if (!existingUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (existingUser.role !== 'customer') {
            return res.status(403).json({ success: false, error: 'Avatar is only available for customers' });
        }

        const user = await User.findOneAndUpdate(
            { id: parseInt(id) },
            { avatar },
            { new: true }
        ).select('-password');

        return res.json({ success: true, data: user });
    } catch (error) {
        console.error('Avatar update error:', error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
