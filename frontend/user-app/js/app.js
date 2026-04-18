/**
 * app.js – Global behaviors for Esticure User App.
 * Handles: navbar, hero CTA, scroll reveal (.reveal + .anim-fade-up),
 * counter animations, ripple effects, city tab switcher.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSearch();
  initScrollReveal();
  initCounters();
  initRipple();
  initCityTabs();
});

// ── Navbar ─────────────────────────────────────────────────────

function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const links     = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on nav link click
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        links.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// ── Hero search / CTA ──────────────────────────────────────────

function initHeroSearch() {
  const heroCta = document.getElementById('hero-cta');
  const navCta  = document.getElementById('nav-cta');

  if (heroCta) heroCta.addEventListener('click', openFormOverlay);
  if (navCta)  navCta.addEventListener('click', openFormOverlay);
}

function openFormOverlay() {
  const overlay = document.getElementById('form-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input after transition
    setTimeout(() => {
      overlay.querySelector('input')?.focus();
    }, 300);
  }
}

function closeFormOverlay() {
  const overlay = document.getElementById('form-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Expose globally so form.js can call these
window.openFormOverlay  = openFormOverlay;
window.closeFormOverlay = closeFormOverlay;

// ── Scroll Reveal ──────────────────────────────────────────────

function initScrollReveal() {
  // Support both .reveal (new) and .anim-fade-up (legacy) classes
  const revealEls  = document.querySelectorAll('.reveal');
  const legacyEls  = document.querySelectorAll('.anim-fade-up');

  const threshold = 0.12;
  const rootMargin = '0px 0px -40px 0px';

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin });
    revealEls.forEach((el) => observer.observe(el));
  }

  if (legacyEls.length) {
    const legacyObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          legacyObserver.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin });
    legacyEls.forEach((el) => legacyObserver.observe(el));
  }
}

// ── Counter animation ──────────────────────────────────────────

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const isDecimal = el.hasAttribute('data-decimal');
  const duration  = 1500;
  const fps       = 60;
  const step      = duration / fps;
  let current     = 0;
  let frame       = 0;

  const timer = setInterval(() => {
    frame++;
    // Ease-out: faster at start, slower at end
    const progress = 1 - Math.pow(1 - frame / fps, 3);
    current = target * progress;

    if (frame >= fps) {
      current = target;
      clearInterval(timer);
    }

    el.textContent = isDecimal
      ? current.toFixed(1)
      : Math.floor(current).toLocaleString('en-IN');
  }, step);
}

// ── Ripple effect ──────────────────────────────────────────────

function initRipple() {
  document.querySelectorAll('.btn-ripple').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      const rect = btn.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top  = `${e.clientY - rect.top}px`;
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}

// ── City Tab Switcher ──────────────────────────────────────────

function initCityTabs() {
  const tabs = document.querySelectorAll('.city-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const city = tab.dataset.city;
      if (!city) return;

      // Update tab active states
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show the matching panel
      document.querySelectorAll('.city-panel').forEach((panel) => {
        panel.classList.remove('active');
      });
      const panel = document.getElementById(`panel-${city}`);
      if (panel) panel.classList.add('active');
    });
  });
}
