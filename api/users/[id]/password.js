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
        const { currentPassword, newPassword } = req.body;

        const user = await User.findOne({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        return res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
