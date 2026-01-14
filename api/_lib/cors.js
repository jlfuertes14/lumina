/**
 * CORS middleware for Vercel serverless functions
 */

function setCorsHeaders(res, origin) {
    // Allow all origins for now (can restrict later if needed)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range');
}

function handleCors(req, res) {
    const origin = req.headers.origin || '';
    setCorsHeaders(res, origin);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }

    return false;
}

module.exports = { handleCors, setCorsHeaders };
