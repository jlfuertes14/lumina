const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DeletedUser = require('../models/DeletedUser');

// GET all users (admin only - consider adding auth middleware)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json({ success: true, data: users, count: users.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: parseInt(req.params.id) }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        // Get the highest ID and increment
        const lastUser = await User.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const user = new User({
            id: newId,
            name,
            email,
            password, // Will be hashed by pre-save hook
            role: role || 'customer'
        });

        await user.save();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// POST login
router.post('/login', async (req, res) => {
    try {
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

        res.json({ success: true, data: userResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET user's saved cart
router.get('/:id/cart', async (req, res) => {
    try {
        const user = await User.findOne({ id: parseInt(req.params.id) }).select('savedCart');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: user.savedCart || [] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT update user's cart
router.put('/:id/cart', async (req, res) => {
    try {
        const { cart } = req.body;
        const user = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { savedCart: cart },
            { new: true }
        ).select('savedCart');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user.savedCart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// POST sync cart (merge local cart with server cart)
router.post('/:id/cart/sync', async (req, res) => {
    try {
        const { localCart } = req.body;
        const user = await User.findOne({ id: parseInt(req.params.id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Merge logic: combine server cart with local cart
        const serverCart = user.savedCart || [];
        const mergedCart = [...serverCart];

        // Add or update items from local cart
        localCart.forEach(localItem => {
            const existingIndex = mergedCart.findIndex(item => item.productId === localItem.id);
            if (existingIndex >= 0) {
                // Item exists, update quantity
                mergedCart[existingIndex].quantity += localItem.quantity;
            } else {
                // New item, add to cart
                mergedCart.push({
                    productId: localItem.id,
                    name: localItem.name,
                    price: localItem.price,
                    image: localItem.image,
                    quantity: localItem.quantity,
                    category: localItem.category,
                    selected: localItem.selected !== false
                });
            }
        });

        user.savedCart = mergedCart;
        await user.save();

        res.json({ success: true, data: user.savedCart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const updates = { ...req.body };

        // Don't allow password updates through this endpoint
        delete updates.password;

        const user = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update user profile (name, email, phone, gender, birthDate)
router.put('/:id/profile', async (req, res) => {
    try {
        const { name, email, phone, gender, birthDate } = req.body;

        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (gender) updates.gender = gender;
        if (birthDate) updates.birthDate = birthDate;

        const user = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update user address
router.put('/:id/address', async (req, res) => {
    try {
        const addressData = req.body;

        const user = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { address: addressData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT change password
router.put('/:id/password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findOne({ id: parseInt(req.params.id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Current password is incorrect' });
        }

        // Update password (will be hashed by pre-save hook)
        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE user (admin only) - Archives to DeletedUser collection
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: parseInt(req.params.id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Archive the user before deletion
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
            deletedBy: req.body.deletedBy || {},
            deleteReason: req.body.deleteReason || '',
            originalCreatedAt: user.createdAt,
            originalUpdatedAt: user.updatedAt
        });

        await archivedUser.save();

        // Now delete from active users
        await User.findByIdAndDelete(user._id);

        res.json({
            success: true,
            message: 'User archived and deleted successfully',
            archivedId: archivedUser._id
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET archived/deleted users (admin only)
router.get('/archive', async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};

        // Filter by role if specified (e.g., only staff)
        if (role) {
            query.role = role;
        }

        const deletedUsers = await DeletedUser.find(query)
            .select('-password')
            .sort({ deletedAt: -1 });
        res.json({ success: true, data: deletedUsers, count: deletedUsers.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single archived user by ID
router.get('/archive/:id', async (req, res) => {
    try {
        let deletedUser = await DeletedUser.findById(req.params.id).select('-password');

        if (!deletedUser) {
            deletedUser = await DeletedUser.findOne({ originalId: req.params.id }).select('-password');
        }

        if (!deletedUser) {
            return res.status(404).json({ success: false, error: 'Archived user not found' });
        }

        res.json({ success: true, data: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET customer count (for admin dashboard)
router.get('/stats/customers', async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'customer' });
        res.json({ success: true, data: { customerCount: count } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
