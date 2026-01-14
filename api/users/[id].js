const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const User = require('../../server/models/User');
const DeletedUser = require('../../server/models/DeletedUser');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    // Extract ID from URL path
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1].split('?')[0];

    try {
        if (req.method === 'GET') {
            const user = await User.findOne({ id: parseInt(id) }).select('-password');
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            return res.json({ success: true, data: user });

        } else if (req.method === 'PUT') {
            const updates = { ...req.body };
            delete updates.password;

            const user = await User.findOneAndUpdate(
                { id: parseInt(id) },
                updates,
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            return res.json({ success: true, data: user });

        } else if (req.method === 'DELETE') {
            const user = await User.findOne({ id: parseInt(id) });

            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            // Archive the user
            const archivedUser = new DeletedUser({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                birthDate: user.birthDate,
                savedCart: user.savedCart,
                originalId: user._id.toString(),
                deletedAt: new Date(),
                deletedBy: req.body?.deletedBy || {},
                deleteReason: req.body?.deleteReason || '',
                originalCreatedAt: user.createdAt,
                originalUpdatedAt: user.updatedAt
            });

            await archivedUser.save();
            await User.findByIdAndDelete(user._id);

            return res.json({
                success: true,
                message: 'User archived and deleted successfully',
                archivedId: archivedUser._id
            });

        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('User API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
