const mongoose = require('mongoose');

let cachedConnection = null;

/**
 * Connect to MongoDB with connection caching for serverless
 * Vercel serverless functions are stateless, so we cache the connection
 */
async function connectToDatabase() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
        });

        cachedConnection = connection;
        console.log('✅ Connected to MongoDB Atlas');
        return connection;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };
