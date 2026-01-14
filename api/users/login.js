const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const User = require('../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    try {
        if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.json({ success: true, data: userResponse });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
