// ESP32 Device Management Pages
// Add these to main.js

// ===== State Extensions for Device Management =====
// Add to existing state object (around line 35):
/*
    devices: [],
    currentDeviceId: null,
    esp32Client: null,
    deviceStatus: {},
    telemetryData: {}
*/

// ===== API Extensions =====
// Add to api object (around line 130):
const deviceAPI = {
    getMyDevices: async () => {
        if (!state.currentUser) return;
        try {
            const response = await apiCall(`/devices/my-devices?userId=${state.currentUser._id}`);
            state.devices = response.data;
            render();
        } catch (error) {
            console.error('Failed to load devices:', error);
            showToast('Failed to load devices');
        }
    },

    pairDevice: async (deviceId, deviceToken) => {
        try {
            const response = await apiCall('/devices/pair', {
                method: 'POST',
                body: JSON.stringify({
                    deviceId,
                    deviceToken,
                    userId: state.currentUser._id
                })
            });
            showToast('Device paired successfully!');
            await deviceAPI.getMyDevices();
            navigate('my-devices');
        } catch (error) {
            showToast(error.message || 'Device pairing failed');
            throw error;
        }
    }
};

// ===== Page Components =====

const MyDevicesPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    const devices = state.devices || [];

    return `
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${Breadcrumbs('my-devices')}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0;">
                <h1 style="font-size: 2.5rem; margin: 0;">My Devices</h1>
                <button class="btn btn-primary" onclick="window.navigate('device-pair')">
                    + Pair New Device
                </button>
            </div>

            ${devices.length === 0 ? `
                <div style="text-align: center; padding: 4rem 2rem; background: var(--surface); border-radius: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 1rem; opacity: 0.3;">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <h2>No Devices Yet</h2>
                    <p style="color: var(--text-muted); margin: 1rem 0;">Pair your ESP32 smart car to get started</p>
                    <button class="btn btn-primary" onclick="window.navigate('device-pair')" style="margin-top: 1rem;">
                        Pair Your First Device
                    </button>
                </div>
            ` : `
                <div class="device-grid">
                    ${devices.map(device => `
                        <div class="device-card">
                            <div class="device-status-badge ${device.status === 'active' ? 'online' : 'offline'}">
                                <span class="status-dot"></span>
                                ${device.status === 'active' ? 'Online' : device.status === 'pending' ? 'Not Configured' : 'Offline'}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${device.deviceName}</h3>
                            <p class="device-id">ID: ${device.deviceId}</p>
                            <p class="device-id" style="font-family: monospace; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
                                🔑 Token: ${device.deviceToken ? device.deviceToken.substring(0, 16) + '...' : 'N/A'}
                            </p>
                            
                            <div class="device-info">
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                                        <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    ${device.lastOnline ? new Date(device.lastOnline).toLocaleDateString() : 'Never'}
                                </div>
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.5-12.5v5.793l2.646 2.647a.5.5 0 0 1-.707.707l-3-3A.5.5 0 0 1 7 8V3.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    v${device.firmwareVersion || '1.0.0'}
                                </div>
                            </div>
                            
                            <div class="device-actions">
                                ${device.status === 'active' ? `
                                    <button class="btn btn-primary" onclick="window.startRemoteControl('${device.deviceId}')" style="width: 100%;">
                                        🎮 Control
                                    </button>
                                ` : device.status === 'pending' ? `
                                    <button class="btn btn-outline" style="width: 100%;" onclick="window.navigate('device-pair')">
                                        🔧 Awaiting Setup
                                    </button>
                                ` : `
                                    <button class="btn btn-outline" style="width: 100%;" disabled>
                                        Offline
                                    </button>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
};

const DevicePairingPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    return `
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${Breadcrumbs('device-pair')}
            
            <div style="background: var(--surface); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">Pair New Device</h1>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">
                    Enter your device credentials from your order confirmation email.
                </p>
                
                <form onsubmit="window.handleDevicePairing(event)" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Device ID</label>
                        <input type="text" name="deviceId" class="form-input" placeholder="ESP32-XXXXXXXX" required>
                        <small style="color: var(--text-muted); font-size: 0.875rem;">From your order confirmation</small>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Device Token</label>
                        <input type="text" name="deviceToken" class="form-input" placeholder="Enter your device token" required>
                        <small style="color: var(--text-muted); font-size: 0.875rem;">Long string of random characters</small>
                    </div>
                    
                    <div style="background: #f0f4ff; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem;">Setup Instructions:</h4>
                        <ol style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
                            <li>Turn on your ESP32 smart car</li>
                            <li>Connect to WiFi network: <strong>"ESP32-SmartCar-Setup"</strong></li>
                            <li>Open <strong>http://192.168.4.1</strong> in your browser</li>
                            <li>Enter your WiFi details and device credentials</li>
                            <li>Once configured, pair it here</li>
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" class="btn btn-outline" onclick="window.navigate('my-devices')" style="flex: 1;">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary" style="flex: 1;">
                            Pair Device
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

const RemoteControlPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    if (!state.currentDeviceId) {
        navigate('my-devices');
        return '';
    }

    const device = state.devices?.find(d => d.deviceId === state.currentDeviceId);
    if (!device) {
        navigate('my-devices');
        return '';
    }

    const statusData = state.deviceStatus[device.deviceId] || {};
    const telemetry = state.telemetryData[device.deviceId] || {};
    const isConnected = statusData.status === 'online';

    return `
        <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-outline" onclick="window.stopRemoteControl()" style="padding: 0.75rem 1.5rem;">
                    ← Back to My Devices
                </button>
            </div>

            <div class="remote-control-container">
                <!-- Device Info Header -->
                <div class="remote-header">
                    <div>
                        <h1 style="margin: 0 0 0.5rem 0; font-size: 1.75rem;">${device.deviceName}</h1>
                        <p style="color: var(--text-muted); margin: 0;">${device.deviceId}</p>
                    </div>
                    <div class="connection-status ${isConnected ? 'connected' : 'disconnected'}">
                        <span class="status-pulse"></span>
                        ${isConnected ? 'Connected' : 'Offline'}
                    </div>
                </div>

                <!-- Telemetry Dashboard -->
                <div class="telemetry-grid">
                    <div class="telemetry-card">
                        <div class="telemetry-icon">🔋</div>
                        <div class="telemetry-value">${telemetry.battery || 0}%</div>
                        <div class="telemetry-label">Battery</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">📡</div>
                        <div class="telemetry-value">${telemetry.signal || 'N/A'}</div>
                        <div class="telemetry-label">Signal</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">⚡</div>
                        <div class="telemetry-value">${telemetry.isMoving ? 'Yes' : 'No'}</div>
                        <div class="telemetry-label">Moving</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">🚧</div>
                        <div class="telemetry-value">${telemetry.frontSensor ? 'Detected' : 'Clear'}</div>
                        <div class="telemetry-label">Obstacle</div>
                    </div>
                </div>

                <!-- Control Panel -->
                <div class="control-panel">
                    <div class="control-section">
                        <h3 style="margin-bottom: 1rem; text-align: center;">Directional Controls</h3>
                        <div class="control-grid">
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn" 
                                    onmousedown="window.sendCarCommand('forward')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('forward')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${!isConnected ? 'disabled' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="19" x2="12" y2="5"></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                                    <div>Forward</div>
                                </button>
                            </div>
                            <div style="grid-column: 1; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('left')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('left')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${!isConnected ? 'disabled' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    <div>Left</div>
                                </button>
                            </div>
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn stop-btn"
                                    onclick="window.sendCarCommand('stop')"
                                    ${!isConnected ? 'disabled' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="6" width="12" height="12"></rect>
                                    </svg>
                                    <div>STOP</div>
                                </button>
                            </div>
                            <div style="grid-column: 3; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('right')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('right')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${!isConnected ? 'disabled' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                    <div>Right</div>
                                </button>
                            </div>
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('backward')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('backward')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${!isConnected ? 'disabled' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                    <div>Backward</div>
                                </button>
                            </div>
                        </div>
                        <p style="text-align: center; color: var(--text-muted); margin-top: 1rem; font-size: 0.875rem;">
                            Or use keyboard: W/A/S/D or Arrow Keys
                        </p>
                    </div>
                </div>

                <!-- Command Log -->
                <div class="command-log">
                    <h4 style="margin-bottom: 0.5rem;">Activity Log</h4>
                    <div id="commandLogContent" class="log-content">
                        <div class="log-entry">Ready to control ${device.deviceName}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// ===== Event Handlers =====

window.handleDevicePairing = async (event) => {
    event.preventDefault();
    const form = event.target;
    const deviceId = form.deviceId.value.trim();
    const deviceToken = form.deviceToken.value.trim();

    try {
        await deviceAPI.pairDevice(deviceId, deviceToken);
    } catch (error) {
        // Error already shown via toast
    }
};

window.startRemoteControl = async (deviceId) => {
    state.currentDeviceId = deviceId;

    // Initialize WebSocket connection
    if (!state.esp32Client) {
        state.esp32Client = new ESP32SocketClient();
    }

    try {
        await state.esp32Client.connect(state.currentUser._id);

        // Start monitoring device
        state.esp32Client.monitorDevice(deviceId);

        // Set up event listeners
        state.esp32Client.on('device:status', (data) => {
            state.deviceStatus[data.deviceId] = data;
            updateRemoteControlUI();
        });

        state.esp32Client.on('device:telemetry', (data) => {
            state.telemetryData[data.deviceId] = data;
            updateRemoteControlUI();
        });

        state.esp32Client.on('command:sent', (data) => {
            addCommandLog(`Command sent: ${data.command}`);
        });

        state.esp32Client.on('command:response', (data) => {
            if (data.success) {
                addCommandLog(`✓ ${data.message || 'Command executed'}`);
            } else {
                addCommandLog(`✗ ${data.error || 'Command failed'}`);
            }
        });

        navigate('remote-control');
    } catch (error) {
        showToast('Failed to connect to device');
        console.error(error);
    }
};

window.stopRemoteControl = () => {
    if (state.esp32Client) {
        state.esp32Client.stopMonitoring();
    }
    state.currentDeviceId = null;
    navigate('my-devices');
};

window.sendCarCommand = (direction) => {
    if (!state.esp32Client || !state.currentDeviceId) return;

    try {
        if (direction === 'stop') {
            state.esp32Client.stop(state.currentDeviceId);
        } else {
            state.esp32Client.move(state.currentDeviceId, direction, 255);
        }
    } catch (error) {
        showToast('Failed to send command');
        console.error(error);
    }
};

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (state.route !== 'remote-control') return;

    const key = e.key.toLowerCase();
    const keyMap = {
        'w': 'forward',
        'arrowup': 'forward',
        's': 'backward',
        'arrowdown': 'backward',
        'a': 'left',
        'arrowleft': 'left',
        'd': 'right',
        'arrowright': 'right',
        ' ': 'stop'
    };

    if (keyMap[key]) {
        e.preventDefault();
        window.sendCarCommand(keyMap[key]);
    }
});

document.addEventListener('keyup', (e) => {
    if (state.route !== 'remote-control') return;

    const key = e.key.toLowerCase();
    if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        window.sendCarCommand('stop');
    }
});

function updateRemoteControlUI() {
    if (state.route === 'remote-control') {
        render();
    }
}

function addCommandLog(message) {
    const logContent = document.getElementById('commandLogContent');
    if (logContent) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContent.insertBefore(entry, logContent.firstChild);

        // Keep only last 10 entries
        while (logContent.children.length > 10) {
            logContent.removeChild(logContent.lastChild);
        }
    }
}

// Initialize devices on login
window.addEventListener('load', () => {
    if (state.currentUser) {
        deviceAPI.getMyDevices();
    }
});
