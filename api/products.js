const { connectToDatabase } = require('./_lib/mongodb');
const { handleCors } = require('./_lib/cors');
const Product = require('../server/models/Product');
const DeletedProduct = require('../server/models/DeletedProduct');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;
    await connectToDatabase();

    const url = req.url;
    const method = req.method;

    try {
        // GET /api/products/meta/categories
        if (url.includes('/meta/categories') && method === 'GET') {
            const categories = await Product.distinct('category');
            return res.json({ success: true, data: categories });
        }

        // GET /api/products/alerts/low-stock
        if (url.includes('/alerts/low-stock') && method === 'GET') {
            const threshold = parseInt(req.query.threshold) || 10;
            const products = await Product.find({ stock: { $lt: threshold, $gt: 0 } });
            return res.json({ success: true, data: products, count: products.length });
        }

        // GET /api/products/alerts/out-of-stock
        if (url.includes('/alerts/out-of-stock') && method === 'GET') {
            const products = await Product.find({ stock: 0 });
            return res.json({ success: true, data: products, count: products.length });
        }

        // GET /api/products/archive or /api/products/archive/:id
        if (url.includes('/archive')) {
            if (method === 'GET') {
                const match = url.match(/\/archive\/([^/?]+)/);
                if (match) {
                    const id = match[1];
                    let deletedProduct = await DeletedProduct.findById(id);
                    if (!deletedProduct) {
                        deletedProduct = await DeletedProduct.findOne({ originalId: id });
                    }
                    if (!deletedProduct) {
                        return res.status(404).json({ success: false, error: 'Archived product not found' });
                    }
                    return res.json({ success: true, data: deletedProduct });
                }
                const deletedProducts = await DeletedProduct.find().sort({ deletedAt: -1 });
                return res.json({ success: true, data: deletedProducts, count: deletedProducts.length });
            }
        }

        // Extract ID for single product operations
        const idMatch = url.match(/\/products\/(\d+|[a-f0-9]{24})/i);
        const productId = idMatch ? idMatch[1] : null;

        // PATCH /api/products/:id/stock
        if (productId && url.includes('/stock') && method === 'PATCH') {
            const { stock } = req.body;
            const product = await Product.findOneAndUpdate(
                { id: parseInt(productId) },
                { stock: parseInt(stock) },
                { new: true }
            );
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }
            return res.json({ success: true, data: product });
        }

        // Single product operations: GET, PUT, DELETE /api/products/:id
        if (productId) {
            if (method === 'GET') {
                let product = await Product.findById(productId);
                if (!product) product = await Product.findOne({ id: parseInt(productId) });
                if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
                return res.json({ success: true, data: product });
            }
            if (method === 'PUT') {
                const updates = {
                    name: req.body.name,
                    description: req.body.description || '',
                    category: req.body.category,
                    price: parseFloat(req.body.price),
                    stock: parseInt(req.body.stock)
                };
                if (req.body.image) updates.image = req.body.image;

                let product = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });
                if (!product) {
                    product = await Product.findOneAndUpdate({ id: parseInt(productId) }, updates, { new: true, runValidators: true });
                }
                if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
                return res.json({ success: true, data: product });
            }
            if (method === 'DELETE') {
                let product = await Product.findById(productId);
                if (!product) product = await Product.findOne({ id: parseInt(productId) });
                if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

                const archivedProduct = new DeletedProduct({
                    id: product.id, name: product.name, category: product.category, price: product.price,
                    image: product.image, stock: product.stock, description: product.description,
                    requiresDeviceRegistration: product.requiresDeviceRegistration, specifications: product.specifications,
                    originalId: product._id.toString(), deletedAt: new Date(),
                    deletedBy: req.body?.deletedBy || {}, deleteReason: req.body?.deleteReason || '',
                    originalCreatedAt: product.createdAt, originalUpdatedAt: product.updatedAt
                });
                await archivedProduct.save();
                await Product.findByIdAndDelete(product._id);
                return res.json({ success: true, message: 'Product archived and deleted', archivedId: archivedProduct._id });
            }
        }

        // GET /api/products - List all products
        if (method === 'GET') {
            const { search, category, sortBy, minPrice, maxPrice } = req.query;
            let query = {};

            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ];
            }
            if (category) query.category = category;
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = parseFloat(minPrice);
                if (maxPrice) query.price.$lte = parseFloat(maxPrice);
            }

            let sort = {};
            switch (sortBy) {
                case 'price-asc': sort = { price: 1 }; break;
                case 'price-desc': sort = { price: -1 }; break;
                case 'name-asc': sort = { name: 1 }; break;
                case 'name-desc': sort = { name: -1 }; break;
                default: sort = { createdAt: -1 };
            }

            const products = await Product.find(query).sort(sort);
            return res.json({ success: true, data: products, count: products.length });
        }

        // POST /api/products - Create new product
        if (method === 'POST') {
            const lastProduct = await Product.findOne().sort({ id: -1 });
            const newId = lastProduct ? lastProduct.id + 1 : 1;

            const product = new Product({
                name: req.body.name,
                description: req.body.description || '',
                category: req.body.category,
                id: newId,
                image: req.body.image || 'https://via.placeholder.com/150',
                price: parseFloat(req.body.price),
                stock: parseInt(req.body.stock)
            });
            await product.save();
            return res.status(201).json({ success: true, data: product });
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
        return res.status(405).json({ success: false, error: `Method ${method} not allowed` });

    } catch (error) {
        console.error('Products API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
