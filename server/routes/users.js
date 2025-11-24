const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

// DELETE user (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ id: parseInt(req.params.id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
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
