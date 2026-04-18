/**
 * auth.js – Session management for Hospital CRM.
 *
 * Hospital session is stored in sessionStorage:
 *   { hospitalId, name, city }
 *
 * All CRM pages call requireAuth() at load time to guard access.
 */

const SESSION_KEY = 'esticure_hospital_session';

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function saveSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Must be called at top of every CRM page.
 * Redirects to login.html if no session found.
 * Returns the session object.
 */
function requireAuth() {
  const session = getSession();
  if (!session || !session.hospitalId) {
    window.location.replace('login.html');
    return null;
  }
  return session;
}

function logout() {
  clearSession();
  window.location.replace('login.html');
}

// Populate sidebar hospital name on all CRM pages
function initSidebarInfo() {
  const session = getSession();
  if (!session) return;

  const nameEl = document.getElementById('sidebar-hospital-name');
  const cityEl = document.getElementById('sidebar-hospital-city');

  if (nameEl) nameEl.textContent = session.name || '—';
  if (cityEl) cityEl.textContent = session.city || '—';

  // Wire logout buttons
  document.querySelectorAll('[data-logout]').forEach((btn) => {
    btn.addEventListener('click', logout);
  });
}
