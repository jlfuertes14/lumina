import {
    API_BASE_URL,
    BACKEND_ORIGIN,
    ENVIRONMENT_NAME,
    CONFIG_SOURCE
} from './runtime-config.js';

export { API_BASE_URL };

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
console.log(`🌍 Environment: ${ENVIRONMENT_NAME}`);
console.log(`🧭 Backend origin (${CONFIG_SOURCE}): ${BACKEND_ORIGIN}`);
console.log(`🔗 API URL: ${API_BASE_URL}`);
