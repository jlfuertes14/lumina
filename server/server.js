require('dotenv').config();

// Default to production if NODE_ENV not set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['https://jlfuertes14.github.io', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/devices', deviceRoutes);

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

// Initialize WebSocket server (Socket.IO for web users)
const { initializeWebSocket } = require('./websocket');
const io = initializeWebSocket(httpServer);

// Initialize plain WebSocket for ESP32 devices
const { initializeDeviceWebSocket } = require('./websocketDevice');
const activeDevices = new Map(); // Shared between Socket.IO and WebSocket
initializeDeviceWebSocket(httpServer, io, activeDevices);

// Start server - Listen on 0.0.0.0 for Railway
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
