const WebSocket = require('ws');
const UserDevice = require('./models/UserDevice');

/**
 * Initialize plain WebSocket endpoint for ESP32 devices
 * Separate from Socket.IO to avoid protocol complexity
 */
function initializeDeviceWebSocket(server, io, activeDevices) {
    const wss = new WebSocket.Server({
        server,
        path: '/ws/device',
        // Increase ping interval for embedded devices
        clientTracking: true
    });

    console.log('🔌 Initializing Device WebSocket endpoint...');

    wss.on('connection', async (ws, req) => {
        console.log('📱 ESP32 device attempting connection from:', req.socket.remoteAddress);

        let deviceId = null;
        let isAuthenticated = false;
        let heartbeatInterval = null;

        // Send heartbeat every 30 seconds
        heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);

        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log(`📨 Received from ${deviceId || 'unauthenticated'}:`, data.type);

                // Handle authentication
                if (data.type === 'authenticate' && !isAuthenticated) {
                    console.log(`🔐 Authenticating device: ${data.deviceId}`);

                    const device = await UserDevice.findOne({
                        deviceId: data.deviceId,
                        deviceToken: data.deviceToken
                    });

                    if (device) {
                        deviceId = data.deviceId;
                        isAuthenticated = true;
                        ws.deviceId = deviceId;
                        activeDevices.set(deviceId, ws);

                        console.log(`✅ ESP32 authenticated: ${deviceId}`);

                        // Update database status to online
                        await UserDevice.findOneAndUpdate(
                            { deviceId },
                            { status: 'active', lastOnline: new Date() }
                        );

                        // Notify web users via Socket.IO
                        io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                            deviceId,
                            status: 'online',
                            timestamp: new Date()
                        });

                        // Confirm authentication to ESP32
                        ws.send(JSON.stringify({
                            type: 'auth_success',
                            message: 'Authentication successful'
                        }));
                    } else {
                        console.log(`❌ Invalid credentials for: ${data.deviceId}`);
                        ws.send(JSON.stringify({
                            type: 'auth_error',
                            message: 'Invalid device credentials'
                        }));
                        ws.close();
                    }
                }

                // Handle status updates (telemetry)
                else if (data.type === 'status' && isAuthenticated) {
                    console.log(`📊 Status update from ${deviceId}`);

                    // Update firmware version if provided
                    if (data.payload && data.payload.firmwareVersion) {
                        await UserDevice.findOneAndUpdate(
                            { deviceId },
                            { firmwareVersion: data.payload.firmwareVersion }
                        );
                    }

                    // Forward to web users
                    io.of('/control').to(`monitor:${deviceId}`).emit('device:telemetry', {
                        deviceId,
                        ...data.payload,
                        timestamp: new Date()
                    });
                }

                // Handle command acknowledgments
                else if (data.type === 'command_ack' && isAuthenticated) {
                    console.log(`✅ Command acknowledged by ${deviceId}:`, data.payload);

                    io.of('/control').to(`monitor:${deviceId}`).emit('command:response', {
                        deviceId,
                        success: data.payload.success,
                        ...data.payload
                    });
                }

                // Handle pong (heartbeat response)
                else if (data.type === 'pong') {
                    // Silent - just confirms device is alive
                }

                // Unknown message type
                else if (!isAuthenticated) {
                    console.log('⚠️ Received message from unauthenticated device');
                    ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated' }));
                }

            } catch (error) {
                console.error('❌ WebSocket message error:', error);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Message processing failed'
                    }));
                }
            }
        });

        ws.on('close', async () => {
            clearInterval(heartbeatInterval);

            if (deviceId) {
                console.log(`❌ ESP32 disconnected: ${deviceId}`);
                activeDevices.delete(deviceId);

                // Update database
                await UserDevice.findOneAndUpdate(
                    { deviceId },
                    { status: 'offline', lastOnline: new Date() }
                );

                // Notify web users
                io.of('/control').to(`monitor:${deviceId}`).emit('device:status', {
                    deviceId,
                    status: 'offline',
                    timestamp: new Date()
                });
            } else {
                console.log('❌ Unauthenticated connection closed');
            }
        });

        ws.on('error', (error) => {
            console.error(`❌ WebSocket error for ${deviceId || 'unauthenticated'}:`, error.message);
        });
    });

    // Listen for commands from Socket.IO control namespace
    io.of('/control').on('connection', (socket) => {
        socket.on('control:command', async (data) => {
            const { deviceId, command, payload } = data;

            if (!deviceId || !command) {
                socket.emit('error', { message: 'Missing deviceId or command' });
                return;
            }

            const deviceWs = activeDevices.get(deviceId);

            if (deviceWs && deviceWs.readyState === WebSocket.OPEN) {
                console.log(`📤 Relaying command to ${deviceId}:`, command);

                deviceWs.send(JSON.stringify({
                    type: 'command',
                    command,
                    payload
                }));

                socket.emit('command:sent', {
                    deviceId,
                    command,
                    timestamp: new Date()
                });
            } else {
                socket.emit('command:response', {
                    deviceId,
                    success: false,
                    error: 'Device is offline'
                });
            }
        });
    });

    console.log('🚀 Device WebSocket endpoint initialized: /ws/device');
    return wss;
}

module.exports = { initializeDeviceWebSocket };
