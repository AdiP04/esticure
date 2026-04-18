/**
 * api.js – Fetch wrapper for Hospital CRM.
 *
 * BASE_URL resolution order:
 *  1. window.ESTICURE_API_URL (set manually in a <script> tag for production)
 *  2. localStorage key 'esticure_api_url' (set via CRM settings page)
 *  3. Same origin on port 3000 (auto-detect: strips port then adds :3000)
 *  4. Falls back to http://localhost:3000
 */

function getBaseUrl() {
  // 1. Manual override via global variable
  if (typeof window.ESTICURE_API_URL === 'string') return window.ESTICURE_API_URL;

  // 2. LocalStorage override (set in Settings panel)
  const stored = localStorage.getItem('esticure_api_url');
  if (stored) return stored;

  // 3. Auto-detect: assume backend on port 3000 of the same hostname
  try {
    const { protocol, hostname } = window.location;
    // If running on file:// or localhost, use localhost:3000
    if (hostname === '' || hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    // Production: same host, port 3000
    return `${protocol}//${hostname}:3000`;
  } catch {
    return 'http://localhost:3000';
  }
}

const BASE_URL = getBaseUrl();

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...(options.headers || {}) },
    });
  } catch (networkErr) {
    throw new Error(
      `Cannot reach backend at ${BASE_URL}. ` +
      `Make sure the server is running, or set your API URL in localStorage key "esticure_api_url".`
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg = data?.message || `Request failed: ${response.status}`;
    throw new Error(Array.isArray(msg) ? msg.join(', ') : msg);
  }

  return data;
}

// ── Hospital Auth ────────────────────────────────────────────��

async function hospitalLogin(email, password) {
  return request('/hospital/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ── User / Lead CRUD ───────────────────────────────────────��──

async function getLeads(hospitalId) {
  return request(`/users?hospitalId=${encodeURIComponent(hospitalId)}`);
}

async function getLeadById(id) {
  return request(`/users/${id}`);
}

async function updateLeadStatus(id, status) {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/** Update lead: status, remark, doctorVisit (any combination) */
async function updateLead(id, payload) {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
