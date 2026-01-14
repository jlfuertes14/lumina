const { connectToDatabase } = require('../_lib/mongodb');
const { handleCors } = require('../_lib/cors');
const UserCoupon = require('../../server/models/UserCoupon');

const AVAILABLE_COUPONS = [
    { code: 'MAKER100', title: 'New Maker Discount', description: '₱100 OFF', condition: 'Min. spend ₱500', validDays: 30 },
    { code: 'SENSE10', title: 'Sensor Bundle', description: '10% OFF', condition: 'All Sensors', validDays: 30 },
    { code: 'SHIPFREE', title: 'Free Shipping', description: 'FREE', condition: 'Orders over ₱1,500', validDays: 30 }
];

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, error: 'userId is required' });
        }

        const coupons = await UserCoupon.find({ userId }).sort({ createdAt: -1 });

        // Enhance with coupon info
        const enhancedCoupons = coupons.map(coupon => {
            const info = AVAILABLE_COUPONS.find(c => c.code === coupon.couponCode);
            return {
                ...coupon.toObject(),
                ...info
            };
        });

        return res.json({ success: true, data: enhancedCoupons });
    } catch (error) {
        console.error('My coupons error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
