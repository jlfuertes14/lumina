const { connectToDatabase } = require('../../../_lib/mongodb');
const { handleCors } = require('../../../_lib/cors');
const User = require('../../../../server/models/User');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    // Extract ID from URL path
    const urlParts = req.url.split('/');
    const idIndex = urlParts.findIndex(part => part === 'users') + 1;
    const id = urlParts[idIndex];

    try {
        const { localCart } = req.body;
        const user = await User.findOne({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Merge logic
        const serverCart = user.savedCart || [];
        const mergedCart = [...serverCart];

        localCart.forEach(localItem => {
            const existingIndex = mergedCart.findIndex(item => item.productId === localItem.id);
            if (existingIndex >= 0) {
                mergedCart[existingIndex].quantity += localItem.quantity;
            } else {
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

        return res.json({ success: true, data: user.savedCart });
    } catch (error) {
        console.error('Cart sync error:', error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
