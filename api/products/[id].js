const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const Product = require('../../server/models/Product');
const DeletedProduct = require('../../server/models/DeletedProduct');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    await connectToDatabase();

    // Extract ID from URL path
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1].split('?')[0];

    try {
        if (req.method === 'GET') {
            // GET single product
            let product = await Product.findById(id);

            if (!product) {
                product = await Product.findOne({ id: parseInt(id) });
            }

            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            return res.json({ success: true, data: product });

        } else if (req.method === 'PUT') {
            // PUT update product
            const updates = {
                name: req.body.name,
                description: req.body.description || '',
                category: req.body.category,
                price: parseFloat(req.body.price),
                stock: parseInt(req.body.stock)
            };

            if (req.body.image) {
                updates.image = req.body.image;
            }

            let product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

            if (!product) {
                product = await Product.findOneAndUpdate(
                    { id: parseInt(id) },
                    updates,
                    { new: true, runValidators: true }
                );
            }

            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            return res.json({ success: true, data: product });

        } else if (req.method === 'DELETE') {
            // DELETE product (archive first)
            let product = await Product.findById(id);

            if (!product) {
                product = await Product.findOne({ id: parseInt(id) });
            }

            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            // Archive the product
            const archivedProduct = new DeletedProduct({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                stock: product.stock,
                description: product.description,
                requiresDeviceRegistration: product.requiresDeviceRegistration,
                specifications: product.specifications,
                originalId: product._id.toString(),
                deletedAt: new Date(),
                deletedBy: req.body?.deletedBy || {},
                deleteReason: req.body?.deleteReason || '',
                originalCreatedAt: product.createdAt,
                originalUpdatedAt: product.updatedAt
            });

            await archivedProduct.save();
            await Product.findByIdAndDelete(product._id);

            return res.json({
                success: true,
                message: 'Product archived and deleted successfully',
                archivedId: archivedProduct._id
            });

        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Product API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
