const { connectToDatabase } = require('./_lib/mongodb');
const { handleCors } = require('./_lib/cors');
const mongoose = require('mongoose');

module.exports = async function handler(req, res) {
    if (handleCors(req, res)) return;

    try {
        await connectToDatabase();

        res.json({
            status: 'ok',
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString(),
            platform: 'Vercel Serverless'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};
