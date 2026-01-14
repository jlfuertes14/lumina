const { connectToDatabase } = require('./_lib/mongodb');
const { handleCors } = require('./_lib/cors');
const User = require('../server/models/User');
const DeletedUser = require('../server/models/DeletedUser');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    await connectToDatabase();

    const url = req.url;
    const method = req.method;

    try {
        // POST /api/users/register
        if (url.includes('/register') && method === 'POST') {
            const { name, email, password, role } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ success: false, error: 'Email already exists' });

            const lastUser = await User.findOne().sort({ id: -1 });
            const newId = lastUser ? lastUser.id + 1 : 1;

            const user = new User({ id: newId, name, email, password, role: role || 'customer' });
            await user.save();

            const userResponse = user.toObject();
            delete userResponse.password;
            return res.status(201).json({ success: true, data: userResponse });
        }

        // POST /api/users/login
        if (url.includes('/login') && method === 'POST') {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

            const userResponse = user.toObject();
            delete userResponse.password;
            return res.json({ success: true, data: userResponse });
        }

        // GET /api/users/stats/customers
        if (url.includes('/stats/customers') && method === 'GET') {
            const count = await User.countDocuments({ role: 'customer' });
            return res.json({ success: true, data: { customerCount: count } });
        }

        // GET /api/users/archive or /api/users/archive/:id
        if (url.includes('/archive')) {
            if (method === 'GET') {
                const match = url.match(/\/archive\/([^/?]+)/);
                if (match) {
                    const id = match[1];
                    let deletedUser = await DeletedUser.findById(id).select('-password');
                    if (!deletedUser) deletedUser = await DeletedUser.findOne({ originalId: id }).select('-password');
                    if (!deletedUser) return res.status(404).json({ success: false, error: 'Archived user not found' });
                    return res.json({ success: true, data: deletedUser });
                }
                const { role } = req.query;
                let query = role ? { role } : {};
                const deletedUsers = await DeletedUser.find(query).select('-password').sort({ deletedAt: -1 });
                return res.json({ success: true, data: deletedUsers, count: deletedUsers.length });
            }
        }

        // Extract user ID from URL
        const idMatch = url.match(/\/users\/(\d+)/);
        const userId = idMatch ? parseInt(idMatch[1]) : null;

        if (userId) {
            // Cart operations
            if (url.includes('/cart/sync') && method === 'POST') {
                const { localCart } = req.body;
                const user = await User.findOne({ id: userId });
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });

                const serverCart = user.savedCart || [];
                const mergedCart = [...serverCart];
                localCart.forEach(localItem => {
                    const existingIndex = mergedCart.findIndex(item => item.productId === localItem.id);
                    if (existingIndex >= 0) {
                        mergedCart[existingIndex].quantity += localItem.quantity;
                    } else {
                        mergedCart.push({
                            productId: localItem.id, name: localItem.name, price: localItem.price,
                            image: localItem.image, quantity: localItem.quantity, category: localItem.category,
                            selected: localItem.selected !== false
                        });
                    }
                });
                user.savedCart = mergedCart;
                await user.save();
                return res.json({ success: true, data: user.savedCart });
            }

            if (url.includes('/cart')) {
                if (method === 'GET') {
                    const user = await User.findOne({ id: userId }).select('savedCart');
                    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                    return res.json({ success: true, data: user.savedCart || [] });
                }
                if (method === 'PUT') {
                    const { cart } = req.body;
                    const user = await User.findOneAndUpdate({ id: userId }, { savedCart: cart }, { new: true }).select('savedCart');
                    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                    return res.json({ success: true, data: user.savedCart });
                }
            }

            // Profile update
            if (url.includes('/profile') && method === 'PUT') {
                const { name, email, phone, gender, birthDate } = req.body;
                const updates = {};
                if (name) updates.name = name;
                if (email) updates.email = email;
                if (phone) updates.phone = phone;
                if (gender) updates.gender = gender;
                if (birthDate) updates.birthDate = birthDate;

                const user = await User.findOneAndUpdate({ id: userId }, updates, { new: true, runValidators: true }).select('-password');
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                return res.json({ success: true, data: user });
            }

            // Avatar update
            if (url.includes('/avatar') && method === 'PUT') {
                const { avatar } = req.body;
                const existingUser = await User.findOne({ id: userId });
                if (!existingUser) return res.status(404).json({ success: false, error: 'User not found' });
                if (existingUser.role !== 'customer') return res.status(403).json({ success: false, error: 'Avatar is only available for customers' });

                const user = await User.findOneAndUpdate({ id: userId }, { avatar }, { new: true }).select('-password');
                return res.json({ success: true, data: user });
            }

            // Address update
            if (url.includes('/address') && method === 'PUT') {
                const user = await User.findOneAndUpdate({ id: userId }, { address: req.body }, { new: true, runValidators: true }).select('-password');
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                return res.json({ success: true, data: user });
            }

            // Password change
            if (url.includes('/password') && method === 'PUT') {
                const { currentPassword, newPassword } = req.body;
                const user = await User.findOne({ id: userId });
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });

                const isMatch = await user.comparePassword(currentPassword);
                if (!isMatch) return res.status(401).json({ success: false, error: 'Current password is incorrect' });

                user.password = newPassword;
                await user.save();
                return res.json({ success: true, message: 'Password updated successfully' });
            }

            // Single user CRUD
            if (method === 'GET') {
                const user = await User.findOne({ id: userId }).select('-password');
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                return res.json({ success: true, data: user });
            }
            if (method === 'PUT') {
                const updates = { ...req.body };
                delete updates.password;
                const user = await User.findOneAndUpdate({ id: userId }, updates, { new: true, runValidators: true }).select('-password');
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });
                return res.json({ success: true, data: user });
            }
            if (method === 'DELETE') {
                const user = await User.findOne({ id: userId });
                if (!user) return res.status(404).json({ success: false, error: 'User not found' });

                const archivedUser = new DeletedUser({
                    id: user.id, name: user.name, email: user.email, password: user.password, role: user.role,
                    phone: user.phone, address: user.address, gender: user.gender, birthDate: user.birthDate,
                    savedCart: user.savedCart, originalId: user._id.toString(), deletedAt: new Date(),
                    deletedBy: req.body?.deletedBy || {}, deleteReason: req.body?.deleteReason || '',
                    originalCreatedAt: user.createdAt, originalUpdatedAt: user.updatedAt
                });
                await archivedUser.save();
                await User.findByIdAndDelete(user._id);
                return res.json({ success: true, message: 'User archived and deleted', archivedId: archivedUser._id });
            }
        }

        // GET /api/users - List all users
        if (method === 'GET') {
            const users = await User.find().select('-password');
            return res.json({ success: true, data: users, count: users.length });
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ success: false, error: `Method ${method} not allowed` });

    } catch (error) {
        console.error('Users API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
