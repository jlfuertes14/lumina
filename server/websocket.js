const { Server } = require('socket.io');
const UserDevice = require('./models/UserDevice');
const User = require('./models/User');

/**
 * Initialize WebSocket server for real-time ESP32 control
 * @param {HttpServer} httpServer - Express HTTP server instance
 */
function initializeWebSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*', // Configure based on your frontend URL
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    // Store active device connections
    const activeDevices = new Map(); // deviceId -> socket.id
    const activeUsers = new Map();   // userId -> [socket.id, socket.id...]

    // ============================================================
    // DEVICE NAMESPACE - For ESP32 Smart Car Connections
    // ============================================================
    const deviceNamespace = io.of('/device');

    // Device authentication middleware
    deviceNamespace.use(async (socket, next) => {
        // Allow connection - we'll verify auth when they send "authenticate" event
        // (ESP32 SocketIOclient library can't send auth in handshake easily)
        console.log('📱 Device attempting to connect...');
        next();
    });

    // Device connected
    deviceNamespace.on('connection', async (socket) => {
        console.log(`🤖 ESP32 Device connected (not yet authenticated)`);

        // Handle authentication event from ESP32
        socket.on('authenticate', async (data) => {
            console.log('🔍 Authenticate event received, data:', JSON.stringify(data));
            console.log('🔍 Data type:', typeof data);

            try {
                const { deviceId, deviceToken } = data;

                if (!deviceId || !deviceToken) {
                    socket.emit('auth:error', { message: 'Missing credentials' });
                    socket.disconnect();
                    return;
                }

                // Validate device credentials
                const device = await UserDevice.findOne({ deviceId, deviceToken });

                if (!device) {
                    console.log(`❌ Invalid credentials for ${deviceId}`);
                    socket.emit('auth:error', { message: 'Invalid device credentials' });
                    socket.disconnect();
                    return;
                }

                // Attach device info to socket
                socket.deviceId = deviceId;
                socket.deviceData = device;

                console.log(`✅ Device authenticated: ${deviceId}`);

                // Store active connection
                activeDevices.set(deviceId, socket.id);

                // Update device status to online
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { status: 'active', lastOnline: new Date() }
                );

                // Join device-specific room
                socket.join(`device:${deviceId}`);

                // Notify all users monitoring this device
                io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                    deviceId,
                    status: 'online',
                    timestamp: new Date()
                });

                // Confirm authentication to ESP32
                socket.emit('auth:success', { message: 'Authentication successful' });

            } catch (error) {
                console.error('Authentication error:', error);
                socket.emit('auth:error', { message: 'Authentication failed' });
                socket.disconnect();
            }
        });

        // Listen for status updates from ESP32 (after authentication)
        socket.on('status:update', async (data) => {
            const { deviceId } = socket;
            if (!deviceId) return; // Not authenticated yet

            console.log(`📊 Status from ${deviceId}:`, data);

            // Update firmware version if provided
            if (data.firmwareVersion) {
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { firmwareVersion: data.firmwareVersion }
                );
            }

            // Forward status to all connected users monitoring this device
            io.of('/control').to(`monitor:${deviceId}`).emit('device:telemetry', {
                deviceId,
                ...data,
                timestamp: new Date()
            });
        });

        // Handle command acknowledgment from ESP32 (after authentication)
        socket.on('command:ack', (data) => {
            const { deviceId } = socket;
            if (!deviceId) return; // Not authenticated yet

            console.log(`✅ Command acknowledged by ${deviceId}:`, data);

            // Forward acknowledgment to user who sent the command
            io.of('/control').to(`monitor:${deviceId}`).emit('command:response', {
                deviceId,
                success: true,
                ...data
            });
        });

        // Handle errors from ESP32 (after authentication)
        socket.on('error:report', (error) => {
            const { deviceId } = socket;
            if (!deviceId) return; // Not authenticated yet

            console.error(`❌ Error from ${deviceId}:`, error);

            io.of('/control').to(`monitor:${deviceId}`).emit('device:error', {
                deviceId,
                error
            });
        });

        // Device disconnected
        socket.on('disconnect', async () => {
            const { deviceId } = socket;
            console.log(`❌ ESP32 Device disconnected: ${deviceId}`);

            activeDevices.delete(deviceId);

            // Update device status to offline
            await UserDevice.findOneAndUpdate(
                { deviceId },
                { status: 'offline', lastOnline: new Date() }
            );

            // Notify users
            io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                deviceId,
                status: 'offline',
                timestamp: new Date()
            });
        });
    });

    // ============================================================
    // CONTROL NAMESPACE - For Web User Connections
    // ============================================================
    const controlNamespace = io.of('/control');

    // User authentication middleware
    controlNamespace.use(async (socket, next) => {
        try {
            const { userId, sessionToken } = socket.handshake.auth;

            if (!userId) {
                return next(new Error('Missing user credentials'));
            }

            // Validate user exists (add proper session validation in production)
            const user = await User.findOne({ id: parseInt(userId) });

            if (!user) {
                return next(new Error('Invalid user'));
            }

            // Attach user info to socket
            socket.userId = userId;
            socket.userData = user;

            console.log(`✅ User authenticated: ${user.name} (${userId})`);
            next();
        } catch (error) {
            console.error('User auth error:', error);
            next(new Error('Authentication failed'));
        }
    });

    // User connected
    controlNamespace.on('connection', async (socket) => {
        const { userId } = socket;
        console.log(`👤 User connected: ${userId}`);

        // Store active user connection
        if (!activeUsers.has(userId)) {
            activeUsers.set(userId, []);
        }
        activeUsers.get(userId).push(socket.id);

        // User requests to monitor a device
        socket.on('monitor:device', async (deviceId) => {
            try {
                // Verify user owns this device (userId is String in UserDevice schema)
                const device = await UserDevice.findOne({
                    deviceId,
                    userId: String(socket.userId)
                });

                if (!device) {
                    socket.emit('error', { message: 'Device not found or access denied' });
                    return;
                }

                // Join monitoring room
                socket.join(`monitor:${deviceId}`);
                console.log(`👁️ User ${userId} monitoring device ${deviceId}`);

                // Send current device status
                const isOnline = activeDevices.has(deviceId);
                socket.emit('device:status', {
                    deviceId,
                    status: isOnline ? 'online' : 'offline',
                    lastOnline: device.lastOnline
                });
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        // User sends control command to device
        socket.on('control:command', async (data) => {
            try {
                const { deviceId, command, payload } = data;

                if (!deviceId || !command) {
                    socket.emit('error', { message: 'Missing deviceId or command' });
                    return;
                }

                // Verify user owns this device (userId is String in UserDevice schema)
                const device = await UserDevice.findOne({
                    deviceId,
                    userId: String(socket.userId)
                });

                if (!device) {
                    socket.emit('error', { message: 'Device not found or access denied' });
                    return;
                }

                // Check if device is online
                if (!activeDevices.has(deviceId)) {
                    socket.emit('command:response', {
                        deviceId,
                        success: false,
                        error: 'Device is offline'
                    });
                    return;
                }

                console.log(`📤 Relaying command to ${deviceId}:`, command, payload);

                // Send command to ESP32 device on main namespace
                io.to(`device:${deviceId}`).emit('control:command', {
                    command,
                    payload,
                    timestamp: new Date()
                });

                // Immediate acknowledgment to user (ESP32 will send actual ack later)
                socket.emit('command:sent', {
                    deviceId,
                    command,
                    timestamp: new Date()
                });

            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        // User requests device list
        socket.on('devices:list', async () => {
            try {
                // userId is String in UserDevice schema
                const devices = await UserDevice.find({ userId: String(socket.userId) })
                    .populate('productId', 'name image')
                    .lean();

                // Add online status to each device
                const devicesWithStatus = devices.map(device => ({
                    ...device,
                    isOnline: activeDevices.has(device.deviceId)
                }));

                socket.emit('devices:list', devicesWithStatus);
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        // Stop monitoring device
        socket.on('monitor:stop', (deviceId) => {
            socket.leave(`monitor:${deviceId}`);
            console.log(`👁️ User ${userId} stopped monitoring ${deviceId}`);
        });

        // User disconnected
        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${userId}`);

            // Remove from active users
            const userSockets = activeUsers.get(userId) || [];
            const updated = userSockets.filter(id => id !== socket.id);

            if (updated.length === 0) {
                activeUsers.delete(userId);
            } else {
                activeUsers.set(userId, updated);
            }
        });
    });

    // ============================================================
    // Health Check & Utilities
    // ============================================================

    // Main namespace for system info
    io.on('connection', (socket) => {
        console.log('📡 Client connected to main namespace');

        // Handle ESP32 device authentication on main namespace
        // (ESP32 SocketIO library has difficulty with custom namespaces)
        socket.on('authenticate', async (data) => {
            console.log('🔍 ESP32 Auth on main namespace:', JSON.stringify(data));

            try {
                const { deviceId, deviceToken } = data;

                if (!deviceId || !deviceToken) {
                    socket.emit('auth:error', { message: 'Missing credentials' });
                    socket.disconnect();
                    return;
                }

                // Validate device credentials
                const device = await UserDevice.findOne({ deviceId, deviceToken });

                if (!device) {
                    console.log(`❌ Invalid credentials for ${deviceId}`);
                    socket.emit('auth:error', { message: 'Invalid device credentials' });
                    socket.disconnect();
                    return;
                }

                // Attach device info to socket
                socket.deviceId = deviceId;
                socket.deviceData = device;

                console.log(`✅ Device authenticated on main namespace: ${deviceId}`);

                // Store active connection
                activeDevices.set(deviceId, socket.id);

                // Update device status to online
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { status: 'active', lastOnline: new Date() }
                );

                // Join device-specific room
                socket.join(`device:${deviceId}`);

                // Notify all users monitoring this device
                io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                    deviceId,
                    status: 'online',
                    timestamp: new Date()
                });

                // Confirm authentication to ESP32
                socket.emit('auth:success', { message: 'Authentication successful' });

            } catch (error) {
                console.error('ESP32 authentication error:', error);
                socket.emit('auth:error', { message: 'Authentication failed' });
                socket.disconnect();
            }
        });

        // Handle status updates from ESP32
        socket.on('status:update', async (data) => {
            const { deviceId } = socket;
            if (!deviceId) return; // Not authenticated yet

            console.log(`📊 Status from ${deviceId}:`, data);

            // Update firmware version if provided
            if (data.firmwareVersion) {
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { firmwareVersion: data.firmwareVersion }
                );
            }

            // Forward status to all connected users monitoring this device
            io.of('/control').to(`monitor:${deviceId}`).emit('device:telemetry', {
                deviceId,
                ...data,
                timestamp: new Date()
            });
        });

        // Handle command acknowledgment from ESP32
        socket.on('command:ack', (data) => {
            const { deviceId } = socket;
            if (!deviceId) return; // Not authenticated yet

            console.log(`✅ Command acknowledged by ${deviceId}:`, data);

            // Forward acknowledgment to user who sent the command
            io.of('/control').to(`monitor:${deviceId}`).emit('command:response', {
                deviceId,
                success: true,
                ...data
            });
        });

        // Handle ESP32 disconnect
        socket.on('disconnect', async () => {
            const { deviceId } = socket;

            if (deviceId) {
                console.log(`❌ ESP32 Device disconnected from main namespace: ${deviceId}`);
                activeDevices.delete(deviceId);

                // Update device status to offline
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { status: 'offline', lastOnline: new Date() }
                );

                // Notify users
                io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                    deviceId,
                    status: 'offline',
                    timestamp: new Date()
                });
            } else {
                console.log('❌ Client disconnected from main namespace');
            }
        });

        socket.on('system:info', () => {
            socket.emit('system:stats', {
                activeDevices: activeDevices.size,
                activeUsers: activeUsers.size,
                timestamp: new Date()
            });
        });
    });

    console.log('🚀 WebSocket server initialized');
    console.log('   - Device namespace: /device');
    console.log('   - Control namespace: /control');

    return io;
}

module.exports = { initializeWebSocket };
