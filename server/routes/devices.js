const express = require('express');
const router = express.Router();
const UserDevice = require('../models/UserDevice');
const Product = require('../models/Product');

// GET all user's devices
router.get('/my-devices', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'userId is required'
            });
        }

        const devices = await UserDevice.find({ userId })
            .populate('productId', 'name image category')
            .sort({ registeredAt: -1 });

        res.json({
            success: true,
            data: devices,
            count: devices.length
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single device details
router.get('/:deviceId', async (req, res) => {
    try {
        const device = await UserDevice.findOne({ deviceId: req.params.deviceId })
            .populate('productId', 'name image category specifications');

        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Device not found'
            });
        }

        res.json({ success: true, data: device });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST - Device pairing/activation (called when user sets up ESP32)
router.post('/pair', async (req, res) => {
    try {
        const { deviceId, deviceToken, userId } = req.body;

        if (!deviceId || !deviceToken || !userId) {
            return res.status(400).json({
                success: false,
                error: 'deviceId, deviceToken, and userId are required'
            });
        }

        // Find device and validate token
        const device = await UserDevice.findOne({ deviceId, deviceToken });

        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Invalid device credentials'
            });
        }

        // Verify ownership
        if (device.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                error: 'This device does not belong to you'
            });
        }

        // Update device status to active
        device.status = 'active';
        await device.save();

        res.json({
            success: true,
            message: 'Device paired successfully!',
            data: device
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT - Update device name
router.put('/:deviceId/rename', async (req, res) => {
    try {
        const { deviceName, userId } = req.body;

        if (!deviceName) {
            return res.status(400).json({
                success: false,
                error: 'deviceName is required'
            });
        }

        const device = await UserDevice.findOne({ deviceId: req.params.deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Device not found'
            });
        }

        // Verify ownership
        if (device.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized'
            });
        }

        device.deviceName = deviceName;
        await device.save();

        res.json({
            success: true,
            message: 'Device renamed successfully',
            data: device
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT - Update device online status (called by ESP32 and server)
router.put('/:deviceId/status', async (req, res) => {
    try {
        const { isOnline, deviceToken } = req.body;

        const device = await UserDevice.findOne({
            deviceId: req.params.deviceId,
            deviceToken
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Device not found or invalid token'
            });
        }

        await device.updateOnlineStatus(isOnline);

        res.json({
            success: true,
            data: device
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE - Unregister device
router.delete('/:deviceId', async (req, res) => {
    try {
        const { userId } = req.body;

        const device = await UserDevice.findOne({ deviceId: req.params.deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Device not found'
            });
        }

        // Verify ownership
        if (device.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized'
            });
        }

        await UserDevice.deleteOne({ deviceId: req.params.deviceId });

        res.json({
            success: true,
            message: 'Device unregistered successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
