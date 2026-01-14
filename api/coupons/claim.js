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

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    await connectToDatabase();

    try {
        const { userId, couponCode } = req.body;

        if (!userId || !couponCode) {
            return res.status(400).json({ success: false, error: 'userId and couponCode required' });
        }

        const couponInfo = AVAILABLE_COUPONS.find(c => c.code === couponCode);
        if (!couponInfo) {
            return res.status(404).json({ success: false, error: 'Invalid coupon code' });
        }

        const existingClaim = await UserCoupon.findOne({ userId, couponCode });
        if (existingClaim) {
            return res.status(400).json({ success: false, error: 'You have already claimed this coupon' });
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + couponInfo.validDays);

        const userCoupon = new UserCoupon({
            userId,
            couponCode,
            expiresAt
        });

        await userCoupon.save();

        return res.status(201).json({
            success: true,
            data: userCoupon,
            message: 'Coupon claimed successfully!'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'You have already claimed this coupon' });
        }
        console.error('Coupon claim error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
