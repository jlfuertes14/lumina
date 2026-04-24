// Shared runtime configuration for API + WebSocket endpoints.
//
// For Render migration:
// - Set VITE_BACKEND_ORIGIN in your build environment
//   Example: https://your-service-name.onrender.com

const LOCAL_BACKEND_ORIGIN = 'http://localhost:3000';

// Safe fallback so existing deployments keep working until Render is live.
const DEFAULT_PRODUCTION_BACKEND_ORIGIN = 'https://lumina-jlfuertes14s-projects.vercel.app';

function normalizeBackendOrigin(value) {
    if (!value || typeof value !== 'string') return '';

    const trimmed = value.trim();
    if (!trimmed) return '';

    // Allow values like https://example.com/api and normalize to origin.
    return trimmed.replace(/\/api\/?$/i, '').replace(/\/+$/, '');
}

const envBackendOrigin = normalizeBackendOrigin(import.meta.env.VITE_BACKEND_ORIGIN);
const configuredProductionOrigin = envBackendOrigin || DEFAULT_PRODUCTION_BACKEND_ORIGIN;

const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
const isRenderHost = hostname.endsWith('.onrender.com');
const isVercelHost = hostname.endsWith('.vercel.app');
const isSameOriginApiHost = isRenderHost || isVercelHost;

export const BACKEND_ORIGIN = isLocalhost
    ? LOCAL_BACKEND_ORIGIN
    : isSameOriginApiHost
        ? window.location.origin
        : configuredProductionOrigin;

export const API_BASE_URL = isSameOriginApiHost
    ? '/api'
    : `${BACKEND_ORIGIN}/api`;

export const SOCKET_BASE_URL = BACKEND_ORIGIN;

export const ENVIRONMENT_NAME = isLocalhost
    ? 'DEVELOPMENT'
    : isRenderHost
        ? 'RENDER'
        : isVercelHost
            ? 'VERCEL'
            : 'PRODUCTION';

export const CONFIG_SOURCE = envBackendOrigin
    ? 'VITE_BACKEND_ORIGIN'
    : 'DEFAULT_PRODUCTION_BACKEND_ORIGIN';
