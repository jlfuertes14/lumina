/**
 * ESP32 WebSocket Client - Frontend Socket.IO Integration
 * Handles real-time communication with ESP32 smart cars
 */

class ESP32SocketClient {
    constructor(serverUrl = 'https://lumina-production-a4bb.up.railway.app') {
        this.serverUrl = serverUrl;
        this.socket = null;
        this.connected = false;
        this.currentDeviceId = null;
        this.eventHandlers = new Map();
    }

    /**
     * Connect to the WebSocket server
     * @param {number} userId - User ID for authentication
     * @param {string} sessionToken - User session token (optional)
     */
    async connect(userId, sessionToken = '') {
        if (this.socket && this.connected) {
            console.warn('Already connected to WebSocket');
            return;
        }

        return new Promise((resolve, reject) => {
            // Load Socket.IO from CDN if not available
            if (typeof io === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.socket.io/4.5.4/socket.io.min.js';
                script.onload = () => this._initializeSocket(userId, sessionToken, resolve, reject);
                script.onerror = () => reject(new Error('Failed to load Socket.IO'));
                document.head.appendChild(script);
            } else {
                this._initializeSocket(userId, sessionToken, resolve, reject);
            }
        });
    }

    _initializeSocket(userId, sessionToken, resolve, reject) {
        try {
            this.socket = io(`${this.serverUrl}/control`, {
                auth: {
                    userId,
                    sessionToken
                },
                transports: ['websocket', 'polling']
            });

            this.socket.on('connect', () => {
                console.log('✅ Connected to ESP32 WebSocket server');
                this.connected = true;
                this._triggerEvent('connected');
                resolve();
            });

            this.socket.on('connect_error', (error) => {
                console.error('❌ Connection error:', error.message);
                this.connected = false;
                this._triggerEvent('error', error);
                reject(error);
            });

            this.socket.on('disconnect', () => {
                console.log('❌ Disconnected from WebSocket server');
                this.connected = false;
                this._triggerEvent('disconnected');
            });

            // Listen for device status updates
            this.socket.on('device:status', (data) => {
                console.log('📊 Device status:', data);
                this._triggerEvent('device:status', data);
            });

            // Listen for device telemetry (battery, sensors, etc.)
            this.socket.on('device:telemetry', (data) => {
                this._triggerEvent('device:telemetry', data);
            });

            // Listen for command responses
            this.socket.on('command:response', (data) => {
                this._triggerEvent('command:response', data);
            });

            this.socket.on('command:sent', (data) => {
                this._triggerEvent('command:sent', data);
            });

            // Listen for device errors
            this.socket.on('device:error', (data) => {
                console.error('Device error:', data);
                this._triggerEvent('device:error', data);
            });

            // Listen for device list updates
            this.socket.on('devices:list', (devices) => {
                this._triggerEvent('devices:list', devices);
            });

            // System errors
            this.socket.on('error', (error) => {
                console.error('System error:', error);
                this._triggerEvent('error', error);
            });

        } catch (error) {
            reject(error);
        }
    }

    /**
     * Start monitoring a specific device
     * @param {string} deviceId - Device ID to monitor
     */
    monitorDevice(deviceId) {
        if (!this.connected) {
            throw new Error('Not connected to WebSocket server');
        }

        this.currentDeviceId = deviceId;
        this.socket.emit('monitor:device', deviceId);
        console.log(`👁️ Monitoring device: ${deviceId}`);
    }

    /**
     * Stop monitoring current device
     */
    stopMonitoring() {
        if (this.currentDeviceId && this.connected) {
            this.socket.emit('monitor:stop', this.currentDeviceId);
            this.currentDeviceId = null;
        }
    }

    /**
     * Send a control command to the ESP32
     * @param {string} deviceId - Target device ID
     * @param {string} command - Command name (e.g., 'move', 'stop')
     * @param {object} payload - Command parameters
     */
    sendCommand(deviceId, command, payload = {}) {
        if (!this.connected) {
            throw new Error('Not connected to WebSocket server');
        }

        this.socket.emit('control:command', {
            deviceId,
            command,
            payload
        });

        console.log(`📤 Sent command to ${deviceId}:`, command, payload);
    }

    /**
     * Movement commands for smart car
     */
    move(deviceId, direction, speed = 255) {
        this.sendCommand(deviceId, 'move', { direction, speed });
    }

    stop(deviceId) {
        this.sendCommand(deviceId, 'stop');
    }

    turnLeft(deviceId, speed = 200) {
        this.sendCommand(deviceId, 'move', { direction: 'left', speed });
    }

    turnRight(deviceId, speed = 200) {
        this.sendCommand(deviceId, 'move', { direction: 'right', speed });
    }

    forward(deviceId, speed = 255) {
        this.sendCommand(deviceId, 'move', { direction: 'forward', speed });
    }

    backward(deviceId, speed = 255) {
        this.sendCommand(deviceId, 'move', { direction: 'backward', speed });
    }

    /**
     * Request list of user's devices
     */
    requestDeviceList() {
        if (!this.connected) {
            throw new Error('Not connected to WebSocket server');
        }

        this.socket.emit('devices:list');
    }

    /**
     * Register event handler
     * @param {string} event - Event name
     * @param {function} handler - Event handler function
     */
    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }

    /**
     * Remove event handler
     * @param {string} event - Event name
     * @param {function} handler - Event handler to remove
     */
    off(event, handler) {
        if (!this.eventHandlers.has(event)) return;

        const handlers = this.eventHandlers.get(event);
        const index = handlers.indexOf(handler);
        if (index > -1) {
            handlers.splice(index, 1);
        }
    }

    /**
     * Trigger event handlers
     */
    _triggerEvent(event, data = null) {
        if (!this.eventHandlers.has(event)) return;

        const handlers = this.eventHandlers.get(event);
        handlers.forEach(handler => {
            try {
                handler(data);
            } catch (error) {
                console.error(`Error in event handler for ${event}:`, error);
            }
        });
    }

    /**
     * Disconnect from server
     */
    disconnect() {
        if (this.socket) {
            this.stopMonitoring();
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
            console.log('👋 Disconnected from WebSocket');
        }
    }

    /**
     * Check connection status
     */
    isConnected() {
        return this.connected;
    }

    /**
     * Get current monitored device
     */
    getCurrentDevice() {
        return this.currentDeviceId;
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESP32SocketClient;
}
