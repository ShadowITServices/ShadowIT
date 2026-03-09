/* ═══════════════════════════════════════════════════════════════
   Shadow IT — Blog JavaScript
   Lightweight vanilla JS for search, filter, scroll, TOC, nav
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Mobile nav ──────────────────────────────────────────── */
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-overlay');
  const panel = document.getElementById('mobile-panel');
  const closeBtn = document.getElementById('mobile-close');

  function openNav() {
    overlay && overlay.classList.add('open');
    panel && panel.classList.add('open');
    toggle && toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    overlay && overlay.classList.remove('open');
    panel && panel.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle && toggle.addEventListener('click', openNav);
  closeBtn && closeBtn.addEventListener('click', closeNav);
  overlay && overlay.addEventListener('click', closeNav);

  /* ── Header scroll shadow ────────────────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 10);
      lastScroll = y;
    }, { passive: true });
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── Blog search ─────────────────────────────────────────── */
  const searchInput = document.getElementById('blog-search');
  const postsGrid = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');

  function getAllCards() {
    var cards = [];
    // Featured post
    var featured = document.querySelector('.featured-post');
    if (featured) cards.push(featured);
    // Grid cards
    if (postsGrid) {
      var gridCards = postsGrid.querySelectorAll('.post-card');
      gridCards.forEach(function (c) { cards.push(c); });
    }
    return cards;
  }

  function filterPosts() {
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var activeCategory = getActiveCategory();
    var cards = getAllCards();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var title = (card.getAttribute('data-title') || '').toLowerCase();
      var cat = (card.getAttribute('data-category') || '').toLowerCase();
      var text = card.textContent.toLowerCase();
      var matchesSearch = !query || title.indexOf(query) !== -1 || text.indexOf(query) !== -1;
      var matchesCat = activeCategory === 'all' || cat === activeCategory;
      var show = matchesSearch && matchesCat;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? '' : 'none';
    }

    // Hide/show pagination when filtering
    var pagination = document.getElementById('blog-pagination');
    if (pagination) {
      pagination.style.display = (query || activeCategory !== 'all') ? 'none' : '';
    }
  }

  function getActiveCategory() {
    var active = document.querySelector('.cat-btn.active');
    return active ? (active.getAttribute('data-category') || 'all') : 'all';
  }

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(filterPosts, 200);
    });
  }

  /* ── Category filter ─────────────────────────────────────── */
  var catFilters = document.getElementById('category-filters');
  if (catFilters) {
    catFilters.addEventListener('click', function (e) {
      var btn = e.target.closest('.cat-btn');
      if (!btn) return;
      catFilters.querySelectorAll('.cat-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      filterPosts();
    });
  }

  /* ── Tag cloud click → search ────────────────────────────── */
  document.querySelectorAll('.tag-pill[data-tag]').forEach(function (tag) {
    tag.addEventListener('click', function () {
      var term = tag.textContent.trim();
      if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
        // Scroll to top of blog content
        var hero = document.querySelector('.blog-hero');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Reading progress bar (post pages) ───────────────────── */
  var progressBar = document.getElementById('reading-progress');
  var postContent = document.getElementById('post-content');
  if (progressBar && postContent) {
    window.addEventListener('scroll', function () {
      var rect = postContent.getBoundingClientRect();
      var total = postContent.scrollHeight - window.innerHeight;
      var scrolled = -rect.top;
      var pct = Math.min(Math.max(scrolled / total * 100, 0), 100);
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── TOC active state ────────────────────────────────────── */
  var tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length) {
    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var el = document.getElementById(id.substring(1));
        if (el) headings.push({ el: el, link: link });
      }
    });

    function updateTOC() {
      var current = null;
      var offset = 120;
      headings.forEach(function (h) {
        if (h.el.getBoundingClientRect().top <= offset) {
          current = h;
        }
      });
      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', updateTOC, { passive: true });
    updateTOC();
  }

  /* ── Copy link button ────────────────────────────────────── */
  var copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>';
        setTimeout(function () { copyBtn.innerHTML = original; }, 2000);
      });
    });
  }

  /* ── Smooth scroll for TOC links ─────────────────────────── */
  document.querySelectorAll('.toc-link, a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#' && href.length > 1) {
        var target = document.getElementById(href.substring(1));
        if (target) {
          e.preventDefault();
          var offsetTop = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          history.pushState(null, null, href);
        }
      }
    });
  });

})();