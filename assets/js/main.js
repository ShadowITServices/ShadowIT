/* ═══════════════════════════════════════════════════════
   Shadow IT — Main JavaScript
   Mobile nav, scroll header, intersection observer
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile navigation ──
  const toggle = document.getElementById('mobileToggle');
  const panel = document.getElementById('mobilePanel');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');

  function openMobile() {
    panel.classList.add('open');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    panel.classList.remove('open');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (overlay) overlay.addEventListener('click', closeMobile);

  // Close mobile nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel && panel.classList.contains('open')) {
      closeMobile();
    }
  });

  // ── Header scroll effect ──
  const header = document.getElementById('siteHeader');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ── Scroll-triggered reveal animations ──
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();