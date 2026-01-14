const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const Product = require('../../server/models/Product');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            // GET all products with filtering, sorting, and search
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
                    sort = { createdAt: -1 };
            }

            const products = await Product.find(query).sort(sort);
            return res.json({ success: true, data: products, count: products.length });

        } else if (req.method === 'POST') {
            // POST create new product
            const lastProduct = await Product.findOne().sort({ id: -1 });
            const newId = lastProduct ? lastProduct.id + 1 : 1;

            // Note: File uploads require different handling in Vercel (use external storage like Cloudinary)
            let imagePath = req.body.image || 'https://via.placeholder.com/150';

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
            return res.status(201).json({ success: true, data: product });

        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Products API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
