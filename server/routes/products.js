const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

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

// POST create new product (handles both JSON with base64 and file upload)
router.post('/', async (req, res) => {
    try {
        // Handle multipart upload if present
        upload.single('image')(req, res, async (uploadErr) => {
            try {
                // Get the highest ID and increment
                const lastProduct = await Product.findOne().sort({ id: -1 });
                const newId = lastProduct ? lastProduct.id + 1 : 1;

                // Determine image path - can be base64, URL, or uploaded file
                let imagePath = req.body.image || 'https://via.placeholder.com/150';
                if (req.file) {
                    // Use uploaded file path
                    imagePath = `/images/products/${req.file.filename}`;
                }

                const product = new Product({
                    name: req.body.name,
                    description: req.body.description || '',
                    category: req.body.category,
                    id: newId,
                    image: imagePath,
                    price: parseFloat(req.body.price),
                    stock: parseInt(req.body.stock)
                });

                await product.save();
                res.status(201).json({ success: true, data: product });
            } catch (error) {
                console.error('Product save error:', error);
                res.status(400).json({ success: false, error: error.message });
            }
        });
    } catch (error) {
        console.error('Product route error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT update product (handles both JSON with base64 and file upload)
router.put('/:id', async (req, res) => {
    try {
        // Handle multipart upload if present
        upload.single('image')(req, res, async (uploadErr) => {
            try {
                const updates = {
                    name: req.body.name,
                    description: req.body.description || '',
                    category: req.body.category,
                    price: parseFloat(req.body.price),
                    stock: parseInt(req.body.stock)
                };

                // If new image uploaded or provided, update image
                if (req.file) {
                    updates.image = `/images/products/${req.file.filename}`;
                } else if (req.body.image) {
                    updates.image = req.body.image;
                }

                // Try to find by _id first, then by numeric id
                let product = await Product.findByIdAndUpdate(
                    req.params.id,
                    updates,
                    { new: true, runValidators: true }
                );

                // If not found by _id, try by numeric id
                if (!product) {
                    product = await Product.findOneAndUpdate(
                        { id: parseInt(req.params.id) },
                        updates,
                        { new: true, runValidators: true }
                    );
                }

                if (!product) {
                    return res.status(404).json({ success: false, error: 'Product not found' });
                }

                res.json({ success: true, data: product });
            } catch (error) {
                console.error('Product update error:', error);
                res.status(400).json({ success: false, error: error.message });
            }
        });
    } catch (error) {
        console.error('Product update route error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// PATCH update product stock (for inventory management)
router.patch('/:id/stock', async (req, res) => {
    try {
        const { stock } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { stock: parseInt(stock) },
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
        // Try to delete by _id first, then by numeric id
        let product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
        }

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Product delete error:', error);
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
