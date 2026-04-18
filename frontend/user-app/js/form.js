/**
 * form.js – 8-step wizard for Esticure user onboarding.
 *
 * Step 7 (department / subsection / service) is OPTIONAL and skippable.
 * All three fields are free-text inputs auto-filled from Fuse.js selection.
 */

// ── State ─────────────────────────────────────────────────────

let currentStep = 1;
const TOTAL_STEPS = 8;

// Steps that are optional (user can skip without validation)
const OPTIONAL_STEPS = new Set([7]);

const STEP_NAMES = ['Name', 'Mobile', 'OTP', 'Location', 'Insurance', 'Problem', 'Treatment', 'Context'];

const userData = {
  name: '', mobile: '', email: '', city: '',
  insurance: { hasInsurance: false, company: '', limit: 0 },
  medical:   { problem: '', department: '', subsection: '', service: '', serviceId: '' },
  context:   { lastDoctor: '', consultedBefore: false },
};

let allServices   = [];
let fuseInstance  = null;
let selectedService = null;

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  // Close handlers
  document.getElementById('form-close')?.addEventListener('click', () => {
    window.closeFormOverlay?.();
    resetForm();
  });
  document.getElementById('form-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'form-overlay') { window.closeFormOverlay?.(); resetForm(); }
  });

  // Nav buttons
  document.getElementById('btn-next')?.addEventListener('click', handleNext);
  document.getElementById('btn-back')?.addEventListener('click', handleBack);
  document.getElementById('btn-skip')?.addEventListener('click', handleSkip);
  document.getElementById('btn-submit')?.addEventListener('click', handleSubmit);

  // Insurance toggle
  document.querySelectorAll('input[name="has_insurance"]').forEach((r) => {
    r.addEventListener('change', (e) => {
      document.getElementById('insurance-extra')
        ?.classList.toggle('visible', e.target.value === 'yes');
    });
  });

  // OTP inputs
  initOtpInputs();

  // Load services from backend for Fuse.js
  try {
    allServices = await getServices();
    initFuseSearch();
  } catch {
    console.warn('Could not load services – fuzzy search disabled.');
  }

  renderStep(1);
});

// ── Step rendering ────────────────────────────────────────────

function renderStep(step) {
  currentStep = Math.max(1, Math.min(TOTAL_STEPS, step));

  // Show/hide steps
  document.querySelectorAll('.form-step').forEach((el) => el.classList.remove('active'));
  const active = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  if (active) {
    active.classList.add('active');
    setTimeout(() => active.querySelector('input, select, textarea')?.focus(), 60);
  }

  // Progress bar
  const pct = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = `${pct}%`;

  // Labels
  const stepLabel = document.getElementById('step-label');
  const stepName  = document.getElementById('step-name');
  if (stepLabel) stepLabel.textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
  if (stepName)  stepName.textContent  = STEP_NAMES[currentStep - 1] || '';

  // Back button
  const btnBack = document.getElementById('btn-back');
  if (btnBack) btnBack.style.visibility = currentStep > 1 ? 'visible' : 'hidden';

  // Skip / Next / Submit buttons
  const btnSkip   = document.getElementById('btn-skip');
  const btnNext   = document.getElementById('btn-next');
  const btnSubmit = document.getElementById('btn-submit');

  const isOptional = OPTIONAL_STEPS.has(currentStep);
  const isLast     = currentStep === TOTAL_STEPS;

  if (btnSkip)   btnSkip.style.display   = (isOptional && !isLast) ? '' : 'none';
  if (btnNext)   btnNext.style.display   = !isLast ? '' : 'none';
  if (btnSubmit) btnSubmit.style.display = isLast ? '' : 'none';

  // Populate Step 7 from selected service if available
  if (currentStep === 7 && selectedService) {
    autoFillStep7(selectedService);
  }

  clearError();
}

function resetForm() {
  currentStep = 1;
  selectedService = null;
  document.querySelectorAll('.form-control').forEach((el) => (el.value = ''));
  document.querySelectorAll('.otp-input').forEach((el) => { el.value = ''; el.classList.remove('filled'); });
  document.getElementById('insurance-extra')?.classList.remove('visible');
  clearError();
  renderStep(1);
}

// ── Navigation ─────────────────────────────────────────���──────

async function handleNext() {
  const valid = await validateStep(currentStep);
  if (!valid) return;
  collectStep(currentStep);
  renderStep(currentStep + 1);
}

function handleBack() {
  collectStep(currentStep);
  renderStep(currentStep - 1);
}

function handleSkip() {
  // Skip optional step without collecting or validating
  renderStep(currentStep + 1);
}

// ── Validation ────────────────────────────────────────────────

async function validateStep(step) {
  clearError();

  switch (step) {
    case 1: {
      const name = document.getElementById('input-name')?.value.trim();
      if (!name) return showError('Please enter your name.');
      break;
    }
    case 2: {
      const mobile = document.getElementById('input-mobile')?.value.trim();
      if (!mobile || !/^\d{10}$/.test(mobile))
        return showError('Enter a valid 10-digit mobile number.');
      break;
    }
    case 3: {
      const digits = [...document.querySelectorAll('.otp-input')].map((i) => i.value).join('');
      if (digits.length < 6) return showError('Please enter all 6 OTP digits.');
      const mobile = document.getElementById('input-mobile')?.value.trim();
      try {
        const res = await verifyOtp(mobile, digits);
        if (!res.success) return showError(res.message || 'Invalid OTP. Please try again.');
      } catch {
        return showError('Could not verify OTP. Please check your connection.');
      }
      break;
    }
    case 4: {
      const email = document.getElementById('input-email')?.value.trim();
      const city  = document.getElementById('input-city')?.value;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return showError('Enter a valid email address.');
      if (!city) return showError('Please select your city.');
      break;
    }
    case 5: {
      const hasIns = document.querySelector('input[name="has_insurance"]:checked');
      if (!hasIns) return showError('Please select an option.');
      if (hasIns.value === 'yes') {
        const company = document.getElementById('input-ins-company')?.value;
        const limit   = document.getElementById('input-ins-limit')?.value;
        if (!company) return showError('Please select your insurance company.');
        if (!limit || Number(limit) <= 0) return showError('Enter a valid coverage limit (₹).');
      }
      break;
    }
    case 6: {
      const problem = document.getElementById('problem-input')?.value.trim();
      if (!problem) return showError('Please describe your problem or condition.');
      break;
    }
    case 7:
      // Optional step — always passes. Collect whatever is there.
      break;
    case 8:
      // Optional context — always passes.
      break;
  }

  return true;
}

function showError(msg) {
  const el     = document.getElementById('form-error');
  const textEl = document.getElementById('form-error-text');
  if (el && textEl) {
    textEl.textContent = msg;
    el.classList.add('visible');
  }
  return false;
}

function clearError() {
  const el = document.getElementById('form-error');
  if (el) el.classList.remove('visible');
}

// ── Collect step data ─────────────────────────────────────────

function collectStep(step) {
  switch (step) {
    case 1:
      userData.name = document.getElementById('input-name')?.value.trim() || '';
      break;
    case 2:
      userData.mobile = document.getElementById('input-mobile')?.value.trim() || '';
      break;
    case 3:
      break; // OTP not persisted in userData
    case 4:
      userData.email = document.getElementById('input-email')?.value.trim() || '';
      userData.city  = document.getElementById('input-city')?.value || '';
      break;
    case 5: {
      const hasIns = document.querySelector('input[name="has_insurance"]:checked');
      userData.insurance.hasInsurance = hasIns?.value === 'yes';
      userData.insurance.company      = document.getElementById('input-ins-company')?.value || '';
      userData.insurance.limit        = Number(document.getElementById('input-ins-limit')?.value) || 0;
      break;
    }
    case 6:
      userData.medical.problem = document.getElementById('problem-input')?.value.trim() || '';
      break;
    case 7:
      // Collect whatever the user typed (all optional)
      userData.medical.department = document.getElementById('input-dept')?.value.trim()       || '';
      userData.medical.subsection = document.getElementById('input-subsection')?.value.trim() || '';
      userData.medical.service    = document.getElementById('input-service')?.value.trim()    || '';
      userData.medical.serviceId  = selectedService?.id || '';
      break;
    case 8:
      userData.context.lastDoctor =
        document.getElementById('input-last-doctor')?.value.trim() || '';
      userData.context.consultedBefore =
        document.querySelector('input[name="consulted_before"]:checked')?.value === 'yes';
      break;
  }
}

// ── OTP inputs ────────────────────────────────────────────────

function initOtpInputs() {
  const inputs = document.querySelectorAll('.otp-input');

  inputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val.slice(-1);
      input.classList.toggle('filled', !!val);
      if (val && idx < inputs.length - 1) inputs[idx + 1].focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) inputs[idx - 1].focus();
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      inputs.forEach((inp, i) => {
        inp.value = pasted[i] || '';
        inp.classList.toggle('filled', !!pasted[i]);
      });
      inputs[Math.min(pasted.length, inputs.length - 1)].focus();
    });
  });
}

// ── Fuse.js search ────────────────────────────────────────────

function initFuseSearch() {
  if (typeof Fuse === 'undefined' || !allServices.length) return;

  fuseInstance = new Fuse(allServices, {
    keys: ['problem', 'keywords', 'department', 'subsection', 'service'],
    threshold: 0.4,
    includeScore: true,
  });

  const problemInput    = document.getElementById('problem-input');
  const suggestionsList = document.getElementById('suggestions-list');
  if (!problemInput || !suggestionsList) return;

  problemInput.addEventListener('input', () => {
    const query = problemInput.value.trim();
    suggestionsList.innerHTML = '';
    if (!query) return;

    const results = fuseInstance.search(query).slice(0, 8);
    results.forEach(({ item }) => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = `<i class="fas fa-stethoscope"></i>${item.problem} → <strong>${item.service}</strong>`;
      div.addEventListener('click', () => {
        selectSuggestion(item);
        suggestionsList.innerHTML = '';
      });
      suggestionsList.appendChild(div);
    });
  });

  document.addEventListener('click', (e) => {
    if (!problemInput.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.innerHTML = '';
    }
  });
}

function selectSuggestion(service) {
  selectedService = service;
  document.getElementById('problem-input').value = service.problem;
  // Pre-fill Step 7 text inputs
  autoFillStep7(service);
}

function autoFillStep7(service) {
  const dept = document.getElementById('input-dept');
  const sub  = document.getElementById('input-subsection');
  const svc  = document.getElementById('input-service');
  if (dept) dept.value = service.department || '';
  if (sub)  sub.value  = service.subsection  || '';
  if (svc)  svc.value  = service.service     || '';
}

// ── Submit ────────────────────────────────────────────────────

async function handleSubmit() {
  const valid = await validateStep(TOTAL_STEPS);
  if (!valid) return;
  collectStep(TOTAL_STEPS);

  // If service still not set, try to find by problem text
  if (!userData.medical.service && allServices.length) {
    const match = allServices.find((s) =>
      s.problem.toLowerCase().includes(userData.medical.problem.toLowerCase()) ||
      userData.medical.problem.toLowerCase().includes(s.problem.toLowerCase())
    );
    if (match) {
      userData.medical.service    = match.service;
      userData.medical.department = match.department;
      userData.medical.subsection = match.subsection;
      userData.medical.serviceId  = match.id;
    } else if (allServices.length) {
      // Default to first service to ensure matching works
      userData.medical.serviceId = allServices[0].id;
    }
  }

  // Show processing overlay
  window.closeFormOverlay?.();
  const overlay = document.getElementById('processing-overlay');
  overlay?.classList.add('active');
  document.body.style.overflow = 'hidden';

  const messages = [
    'Analysing your condition…',
    'Matching best hospitals…',
    'Calculating costs…',
    'Almost ready…',
  ];
  let msgIdx = 0;
  const msgEl = document.getElementById('processing-message');

  const msgTimer = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length;
    if (msgEl) {
      msgEl.style.opacity = '0';
      setTimeout(() => {
        msgEl.textContent = messages[msgIdx];
        msgEl.style.opacity = '1';
      }, 200);
    }
  }, 1200);

  try {
    const result = await createUser(userData);
    clearInterval(msgTimer);
    // Cache result so result.html can recover even if API is slow
    try { sessionStorage.setItem('esticure_result', JSON.stringify(result)); } catch {}
    setTimeout(() => {
      window.location.href = `result.html?userId=${result.id}`;
    }, 600);
  } catch (err) {
    clearInterval(msgTimer);
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
    window.openFormOverlay?.();
    renderStep(TOTAL_STEPS);
    showError(`Submission failed: ${err.message}`);
  }
}
