/**
 * crm.js – Shared CRM utilities: toast, status badge, star rendering.
 */

// ── Toast Notifications ──────────────────────────────────────

let toastTimer = null;

function showToast(message, type = 'default') {
  // Remove any existing toast
  document.querySelector('.toast')?.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  toastTimer = setTimeout(() => toast.remove(), 3500);
}

// ── Status badge HTML ─────────────────────────────────────────

function statusBadge(status) {
  const labels = {
    new:       '🔵 New',
    contacted: '🟡 Contacted',
    converted: '🟢 Converted',
    rejected:  '🔴 Rejected',
  };
  return `<span class="status-badge status-badge--${status}">${labels[status] || status}</span>`;
}

// ── Insurance display ─────────────────────────────────────────

function insDisplay(insurance) {
  if (!insurance?.hasInsurance) return 'No';
  return `Yes – ${insurance.company || 'Unknown'} (₹${Number(insurance.limit || 0).toLocaleString('en-IN')})`;
}

// ── Format date ───────────────────────────────────────────────

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// ── INR ───────────────────────────────────────────────────────

function fmtINR(n) {
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

// ── Escape HTML ───────────────────────────────────────────────

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '—';
  return div.innerHTML;
}
