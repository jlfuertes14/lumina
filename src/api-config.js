// API Configuration
// This file automatically detects the environment and uses the appropriate backend URL

const VERCEL_API_URL = 'https://lumina-jlfuertes14s-projects.vercel.app';  // Vercel backend
const LOCAL_API_URL = 'http://localhost:3000';

// Auto-detect environment
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isVercel = window.location.hostname.includes('vercel.app');
const isGitHubPages = window.location.hostname === 'jlfuertes14.github.io';

// Export the API base URL
// On Vercel: use relative URL (same origin)
// On GitHub Pages: use full Vercel URL
// On localhost: use local server
export const API_BASE_URL = isLocalhost
    ? `${LOCAL_API_URL}/api`
    : isVercel
        ? '/api'  // Same origin on Vercel
        : `${VERCEL_API_URL}/api`;  // Cross-origin from GitHub Pages

// Export helper function for API calls
export async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Log current environment
const envName = isLocalhost ? 'DEVELOPMENT' : isVercel ? 'VERCEL' : 'PRODUCTION';
console.log(`🌍 Environment: ${envName}`);
console.log(`🔗 API URL: ${API_BASE_URL}`);
