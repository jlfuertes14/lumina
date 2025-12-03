const express = require('express');
const router = express.Router();
const UserCoupon = require('../models/UserCoupon');
const AVAILABLE_COUPONS = [
    { code: 'MAKER100', title: 'New Maker Discount', description: '₱100 OFF', condition: 'Min. spend ₱500', validDays: 30 },
    { code: 'SENSE10', title: 'Sensor Bundle', description: '10% OFF', condition: 'All Sensors', validDays: 30 },
    { code: 'SHIPFREE', title: 'Free Shipping', description: 'FREE', condition: 'Orders over ₱1,500', validDays: 30 }
];
// POST /api/coupons/claim - Claim a coupon
router.post('/claim', async (req, res) => {
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
        res.status(201).json({
            success: true,
            data: userCoupon,
            message: 'Coupon claimed successfully!'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'You have already claimed this coupon' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
});
// GET /api/coupons/my-coupons - Get user's coupons
router.get('/my-coupons', async (req, res) => {
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

        res.json({ success: true, data: enhancedCoupons });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
module.exports = router;
