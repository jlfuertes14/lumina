require('dotenv').config();

// Default to production if NODE_ENV not set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const allowedOrigins = new Set([
    'https://jlfuertes14.github.io',
    'http://localhost:5173',
    'http://localhost:3000'
]);

if (process.env.FRONTEND_URL) {
    allowedOrigins.add(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests (curl/postman/health checks).
        if (!origin) {
            return callback(null, true);
        }

        const isKnownOrigin = allowedOrigins.has(origin);
        const isRenderPreview = origin.endsWith('.onrender.com');
        const isVercelPreview = origin.endsWith('.vercel.app');

        if (isKnownOrigin || isRenderPreview || isVercelPreview) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (for uploaded images)
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Database connection events
mongoose.connection.on('connected', () => {
    console.log('📊 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Mongoose disconnected');
});

// Import routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');
const deviceRoutes = require('./routes/devices');
const couponRoutes = require('./routes/coupons');



// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/coupons', couponRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

// Create HTTP server (required for Socket.IO)
const http = require('http');
const httpServer = http.createServer(app);

// Shared active devices map between Socket.IO and Plain WebSocket
const activeDevices = new Map();

// Initialize WebSocket server (Socket.IO for web users)
const { initializeWebSocket } = require('./websocket');
const io = initializeWebSocket(httpServer, activeDevices);

// Initialize plain WebSocket for ESP32 devices
const { initializeDeviceWebSocket } = require('./websocketDevice');
const wss = initializeDeviceWebSocket(httpServer, io, activeDevices);

// Manually handle upgrade to avoid conflict with Socket.IO
httpServer.on('upgrade', (request, socket, head) => {
    const pathname = request.url;

    if (pathname.startsWith('/ws/device')) {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    }
    // For other paths (like /socket.io/), let Socket.IO's listener handle it
});

// Start server - Listen on 0.0.0.0 for cloud providers.
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Database: ${(process.env.MONGODB_URI || '').includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('\n👋 Server shutting down gracefully');
    process.exit(0);
});
