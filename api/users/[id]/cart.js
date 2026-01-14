const { connectToDatabase } = require('../../_lib/mongodb');
const { handleCors } = require('../../_lib/cors');
const User = require('../../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    // Extract ID from URL path
    const urlParts = req.url.split('/');
    const idIndex = urlParts.findIndex(part => part === 'users') + 1;
    const id = urlParts[idIndex];

    try {
        if (req.method === 'GET') {
            const user = await User.findOne({ id: parseInt(id) }).select('savedCart');
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            return res.json({ success: true, data: user.savedCart || [] });

        } else if (req.method === 'PUT') {
            const { cart } = req.body;
            const user = await User.findOneAndUpdate(
                { id: parseInt(id) },
                { savedCart: cart },
                { new: true }
            ).select('savedCart');

            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            return res.json({ success: true, data: user.savedCart });

        } else {
            res.setHeader('Allow', ['GET', 'PUT']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Cart API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
