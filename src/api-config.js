// API Configuration
// This file automatically detects whether you're running locally or on GitHub Pages
// and uses the appropriate backend URL

// IMPORTANT: Replace 'YOUR-BACKEND-URL-HERE' with your actual deployed backend URL
// after deploying to Railway or Render

const PRODUCTION_API_URL = 'https://lumina-jlfuertes14s-projects.vercel.app';  // Vercel backend
const LOCAL_API_URL = 'http://localhost:3000';

// Auto-detect environment
const isProduction = window.location.hostname === 'jlfuertes14.github.io';

// Export the API base URL
export const API_BASE_URL = isProduction
    ? `${PRODUCTION_API_URL}/api`
    : `${LOCAL_API_URL}/api`;

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
console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`🔗 API URL: ${API_BASE_URL}`);
