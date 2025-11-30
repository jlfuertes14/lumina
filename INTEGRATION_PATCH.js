// COPY AND PASTE THESE DIRECTLY INTO main.js

// ==========================================
// STEP 6: ADD TO HEADER NAVIGATION
// ==========================================
// Find the Header() function (around line 260) and add this My Devices link
// in the <nav> section AFTER the "Learn" link and BEFORE "About Us":

/*
Add this between Learn and About Us links:
*/
${
    isLoggedIn && !isAdmin ? `
    <a href="#" class="nav-link ${state.route === 'my-devices' ? 'active' : ''}" 
       onclick="window.navigate('my-devices'); return false;">My Devices 🚗</a>
` : ''
}


// ==========================================
// STEP 8: REPLACE PLACEHOLDERS WITH ACTUAL CODE
// ==========================================
// Find lines around 4388 where you have the /* ... */ placeholders
// Replace those entire lines with the actual implementations below:

// Device Management Handlers
window.handleDevicePairing = async (event) => {
    event.preventDefault();
    const form = event.target;
    const deviceId = form.deviceId.value.trim();
    const deviceToken = form.deviceToken.value.trim();

    try {
        await api.pairDevice(deviceId, deviceToken);
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

// Helper functions
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

// Keyboard event listeners
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
