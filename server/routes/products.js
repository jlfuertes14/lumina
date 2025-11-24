const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with filtering, sorting, and search
router.get('/', async (req, res) => {
    try {
        const { search, category, sortBy, minPrice, maxPrice } = req.query;

        let query = {};

        // Search filter (case-insensitive)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        // Category filter
        if (category) {
            query.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Sorting
        let sort = {};
        switch (sortBy) {
            case 'price-asc':
                sort = { price: 1 };
                break;
            case 'price-desc':
                sort = { price: -1 };
                break;
            case 'name-asc':
                sort = { name: 1 };
                break;
            case 'name-desc':
                sort = { name: -1 };
                break;
            default:
                sort = { createdAt: -1 }; // Most recent first
        }

        const products = await Product.find(query).sort(sort);
        res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: parseInt(req.params.id) });
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create new product (admin only)
router.post('/', async (req, res) => {
    try {
        // Get the highest ID and increment
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            ...req.body,
            id: newId
        });

        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update product (admin only)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PATCH update product stock (for inventory management)
router.patch('/:id/stock', async (req, res) => {
    try {
        const { stock } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { stock },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE product (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET categories
router.get('/meta/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET low stock products (for admin alerts)
router.get('/alerts/low-stock', async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 10;
        const products = await Product.find({ stock: { $lt: threshold, $gt: 0 } });
        res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET out of stock products
router.get('/alerts/out-of-stock', async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });
        res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
