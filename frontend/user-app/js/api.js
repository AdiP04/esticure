/**
 * api.js – Lightweight fetch wrapper for Esticure User App.
 * All requests go to the NestJS backend at BASE_URL.
 */

// Auto-detect backend URL (same logic as CRM api.js)
function getBaseUrl() {
  if (typeof window.ESTICURE_API_URL === 'string') return window.ESTICURE_API_URL;
  const stored = localStorage.getItem('esticure_api_url');
  if (stored) return stored;
  try {
    const { protocol, hostname } = window.location;
    if (hostname === '' || hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    return `${protocol}//${hostname}:3000`;
  } catch { return 'http://localhost:3000'; }
}

const BASE_URL = getBaseUrl();

/**
 * Generic request helper.
 * @param {string} endpoint - Path, e.g. '/users'
 * @param {object} options  - fetch options (method, body, etc.)
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg = data?.message || `Request failed with status ${response.status}`;
    throw new Error(msg);
  }

  return data;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** Verify OTP */
async function verifyOtp(mobile, otp) {
  return request('/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ mobile, otp }),
  });
}

/** Create user (called on form submit) */
async function createUser(userData) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/** Fetch a single user by ID (used on result page) */
async function getUserById(id) {
  return request(`/users/${id}`);
}

/** Fetch all services for Fuse.js search */
async function getServices() {
  return request('/services');
}
