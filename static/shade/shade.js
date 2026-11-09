/* @ds-bundle: {"format":4,"namespace":"ShadowITShade","components":[{"name":"Avatar"},{"name":"Peek"},{"name":"Nudge"},{"name":"MenuHint"},{"name":"Scheduler"}]} */
/*
 * Shade — the Shadow IT AI avatar.
 * One classic script, no dependencies, no network. Ships as a Docusaurus
 * client module on a statically exported site.
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Geometry. Everything is drawn in a 64-unit square at one stroke
   * weight, matching the brand's line-icon set.
   * ------------------------------------------------------------------ */

  var BODY_FULL =
    'M11 50 C11 25 20 9 32 9 C44 9 53 25 53 50 ' +
    'C51.5 55.5 44 55.5 42.5 50 C41 55.5 33.5 55.5 32 50 ' +
    'C30.5 55.5 23 55.5 21.5 50 C20 55.5 12.5 55.5 11 50 Z';

  var BODY_PEEK = 'M11 50 C11 25 20 9 32 9 C44 9 53 25 53 50 Z';

  var MARK_OUTER = 'M25 47 L32 36 L39 47';
  var MARK_INNER = 'M29.5 47 L32 41.5 L34.5 47';

  var MOODS = ['idle', 'curious', 'happy', 'thinking', 'sleep'];
  var POSES = ['full', 'peek', 'hang'];

  function eyes(mood, cy, noMouth) {
    var lx = 25;
    var rx = 39;
    var out = '';

    if (mood === 'sleep') {
      /* closed lids, not dashes: a shallow downward arc each */
      return (
        '<path class="shade__eye-line" d="M' + (lx - 3.5) + ' ' + (cy - 1) +
          ' Q' + lx + ' ' + (cy + 2.5) + ' ' + (lx + 3.5) + ' ' + (cy - 1) + '"/>' +
        '<path class="shade__eye-line" d="M' + (rx - 3.5) + ' ' + (cy - 1) +
          ' Q' + rx + ' ' + (cy + 2.5) + ' ' + (rx + 3.5) + ' ' + (cy - 1) + '"/>'
      );
    }

    if (mood === 'happy') {
      out =
        '<path class="shade__eye-line" d="M' + (lx - 3.5) + ' ' + (cy + 1.5) +
          ' Q' + lx + ' ' + (cy - 3.5) + ' ' + (lx + 3.5) + ' ' + (cy + 1.5) + '"/>' +
        '<path class="shade__eye-line" d="M' + (rx - 3.5) + ' ' + (cy + 1.5) +
          ' Q' + rx + ' ' + (cy - 3.5) + ' ' + (rx + 3.5) + ' ' + (cy + 1.5) + '"/>';
      /* The mouth and the chest mark occupy the same band. The mark wins. */
      if (!noMouth) {
        out += '<path class="shade__mouth" d="M28 ' + (cy + 10) + ' Q32 ' +
          (cy + 14) + ' 36 ' + (cy + 10) + '"/>';
      }
      return out;
    }

    var lr = mood === 'curious' ? 4.6 : 4;
    var rr = mood === 'curious' ? 3.4 : 4;
    var lp = mood === 'curious' ? 2.1 : 1.9;
    var rp = mood === 'curious' ? 1.6 : 1.9;
    var py = mood === 'thinking' ? cy - 1.2 : cy;

    out +=
      '<circle class="shade__eye" cx="' + lx + '" cy="' + cy + '" r="' + lr + '"/>' +
      '<circle class="shade__eye" cx="' + rx + '" cy="' + cy + '" r="' + rr + '"/>' +
      '<circle class="shade__pupil" cx="' + lx + '" cy="' + py + '" r="' + lp + '"/>' +
      '<circle class="shade__pupil" cx="' + rx + '" cy="' + py + '" r="' + rp + '"/>';

    return out;
  }

  function sparks(mood) {
    if (mood === 'thinking') {
      return (
        '<circle class="shade__think" cx="45" cy="12" r="1.1"/>' +
        '<circle class="shade__think" cx="50" cy="7.5" r="1.5"/>' +
        '<circle class="shade__think" cx="55.5" cy="3.5" r="2"/>'
      );
    }
    return (
      '<path class="shade__spark" d="M54 12 L58.5 7.5"/>' +
      '<path class="shade__spark" d="M56.5 21 h5"/>' +
      '<path class="shade__spark" d="M59 18.5 v5"/>' +
      '<circle class="shade__accent" cx="52" cy="26" r="1.4"/>'
    );
  }

  /**
   * The character as an SVG string.
   * @param {{pose?:string, mood?:string, size?:number, mark?:boolean}} o
   */
  function art(o) {
    o = o || {};
    var pose = POSES.indexOf(o.pose) > -1 ? o.pose : 'peek';
    var mood = MOODS.indexOf(o.mood) > -1 ? o.mood : 'idle';
    var size = o.size || 48;
    var mark = o.mark === true || (o.mark !== false && size >= 72 && pose !== 'hang');

    var cy = pose === 'hang' ? 38 : 26;
    var body = pose === 'full' ? BODY_FULL : BODY_PEEK;
    /* hang = the peek silhouette turned over: the flat edge fuses to the lip
       above and the rounded apex hangs down into the page. */
    var flip = pose === 'hang' ? ' transform="rotate(180 32 32)"' : '';
    /* The tilt is only ever applied to 'full'. On a flat-hemmed pose it skews
       the edge that is meant to meet the block, and the character looks
       broken rather than curious. */
    var tilt = mood === 'curious' && pose === 'full' ? ' transform="rotate(-6 32 32)"' : '';

    var svg =
      '<svg class="shade__art" viewBox="0 0 64 64" width="' + size + '" height="' + size +
        '" aria-hidden="true" focusable="false">' +
      '<g class="shade__figure"' + tilt + '>' +
      '<path class="shade__body" d="' + body + '"' + flip + '/>';

    if (pose === 'full') {
      svg +=
        '<path class="shade__dust" d="M17 56 h4.5"/>' +
        '<path class="shade__dust" d="M27.5 58.5 h9"/>' +
        '<path class="shade__dust" d="M42 56 h4.5"/>';
    }

    if (mark) {
      svg +=
        '<path class="shade__mark" d="' + MARK_OUTER + '"/>' +
        '<path class="shade__mark shade__mark--inner" d="' + MARK_INNER + '"/>';
    }

    svg += eyes(mood, cy, mark) + sparks(mood) + '</g></svg>';
    return svg;
  }

  /* ------------------------------------------------------------------ *
   * Avatar — the character as an element.
   * ------------------------------------------------------------------ */

  var Avatar = {
    MOODS: MOODS,
    POSES: POSES,
    art: art,

    create: function (o) {
      o = o || {};
      var el = document.createElement('span');
      el.className = 'shade shade--' + (o.pose || 'peek') + ' shade--' + (o.mood || 'idle');
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = art(o);
      el._shade = {pose: o.pose || 'peek', mood: o.mood || 'idle', size: o.size || 48, mark: o.mark};
      return el;
    },

    setMood: function (el, mood) {
      if (!el || !el._shade || MOODS.indexOf(mood) < 0) return;
      el.classList.remove('shade--' + el._shade.mood);
      el.classList.add('shade--' + mood);
      el._shade.mood = mood;
      el.innerHTML = art(el._shade);
    },

    /** Jittered blink, 4-9s apart. Returns a stop function. */
    blink: function (el) {
      if (!el || prefersReducedMotion()) return function () {};
      var t;
      var loop = function () {
        t = setTimeout(function () {
          el.classList.add('shade--blinking');
          setTimeout(function () { el.classList.remove('shade--blinking'); }, 140);
          loop();
        }, 4000 + Math.random() * 5000);
      };
      loop();
      return function () { clearTimeout(t); };
    }
  };

  /* ------------------------------------------------------------------ *
   * Peek — the character placed against a block, behind it.
   * ------------------------------------------------------------------ */

  /*
   * The character lives in a fixed, pointer-transparent layer on <body> at
   * --z-peek, NOT inside the block. A child of the block would paint on top
   * of the block's own background (negative z-index descendants still paint
   * above it), and the whole point of the placement is that the block hides
   * two thirds of the character. The anchored block must be z-index 1 or
   * above with an opaque background; see integration.md.
   */
  /*
   * Two layers, because they sit on opposite sides of the page content:
   * 'peek' at --z-peek (0) so blocks paint over the character, and 'nudge' at
   * --z-nudge (40) so the card paints over them. One layer cannot do both — a
   * layer with z-index 0 is a stacking context, and nothing inside it can rise
   * above a sibling block, whatever z-index it carries.
   */
  function layer(kind) {
    var cls = kind === 'nudge' ? 'shade-nudge-layer' : 'shade-layer';
    var l = document.querySelector('.' + cls);
    if (!l) {
      l = document.createElement('div');
      l.className = cls;
      document.body.appendChild(l);
    }
    return l;
  }

  function cssPx(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    var n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  }

  var Peek = {
    /**
     * @param {Element} target the anchored block
     * @param {{placement?:string, size?:number}} o
     */
    mount: function (target, o) {
      o = o || {};
      var placement = o.placement || 'peek-edge';
      var pose = placement === 'gutter-walk' || placement === 'greeting' ? 'full' : 'peek';
      var size = o.size || (placement === 'gutter-walk' || placement === 'greeting' ? 72 : 48);
      var el = Avatar.create({pose: pose, mood: 'sleep', size: size});
      el.classList.add('shade-place', 'shade-place--' + placement);
      layer().appendChild(el);

      var raf = null;
      var place = function () {
        var r = target.getBoundingClientRect();
        var x, y;
        if (placement === 'peek-corner') {
          x = r.right - size * 0.45;
          y = r.top + r.height * 0.4;
        } else if (placement === 'gutter-walk') {
          /* Right gutter by preference, left when the right has no room —
             on a 1280 viewport a centred content column often leaves only
             one usable gutter. */
          var gap = cssPx('--gutter-offset', 56);
          x = r.right + gap;
          if (x + size > innerWidth - 8) {
            x = r.left - gap - size;
          }
          y = r.top + 24;
        } else if (placement === 'greeting') {
          x = r.right + 16;
          y = r.top;
        } else {
          /* peek-edge: the crown clears the top edge by --peek-rise */
          x = r.left + r.width * 0.12;
          y = r.top - cssPx('--peek-rise', 22);
        }
        el.style.left = Math.round(x) + 'px';
        el.style.top = Math.round(y) + 'px';
      };

      var track = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(place);
      };

      place();
      var stopBlink = function () {};

      return {
        el: el,
        rect: function () { return el.getBoundingClientRect(); },
        reposition: place,
        /*
         * Whether this is a moment worth appearing in. A tall section can be
         * 60% in view with its top edge above the sticky navbar, and a crown
         * that rises behind the navbar is just a wasted appearance.
         */
        fits: function () {
          var r = el.getBoundingClientRect();
          return r.top >= 64 &&
            r.bottom <= innerHeight - 8 &&
            r.left >= 0 &&
            r.right <= innerWidth;
        },
        show: function (mood) {
          void el.offsetWidth; /* a frame, so the rise animates from rest */
          el.classList.add('is-visible');
          Avatar.setMood(el, mood || 'idle');
          stopBlink = Avatar.blink(el);
          addEventListener('scroll', track, {passive: true});
          addEventListener('resize', track);
        },
        setMood: function (m) { Avatar.setMood(el, m); },
        hide: function (immediate) {
          stopBlink();
          el.classList.toggle('shade-place--immediate', immediate === true);
          el.classList.remove('is-visible');
        },
        destroy: function () {
          stopBlink();
          cancelAnimationFrame(raf);
          removeEventListener('scroll', track);
          removeEventListener('resize', track);
          if (el.parentNode) el.parentNode.removeChild(el);
        }
      };
    }
  };

  /* ------------------------------------------------------------------ *
   * Nudge — the one short thing the character says.
   * ------------------------------------------------------------------ */

  var Nudge = {
    /**
     * Mounts into the shared overlay layer, not into the anchored block: the
     * sections worth peeking from tend to carry `overflow: clip`, which would
     * cut the card in half. It is a polite live region, so it is announced on
     * arrival wherever it sits in the DOM.
     *
     * @param {Element} host usually the .shade-layer element
     * @param {{title:string, body?:string, cta?:{label:string,href:string},
     *          side?:string, onDismiss?:Function, onAct?:Function}} o
     */
    open: function (host, o) {
      o = o || {};
      var anchor = host;
      var card = document.createElement('div');
      card.className = 'shade-nudge shade-nudge--' + (o.side || 'right');
      card.setAttribute('role', 'status');
      card.setAttribute('aria-live', 'polite');

      var html = '<p class="shade-nudge__title">' + esc(o.title || '') + '</p>';
      if (o.body) html += '<p class="shade-nudge__body">' + esc(o.body) + '</p>';
      if (o.cta && o.cta.href) {
        html += '<a class="shade-nudge__cta" href="' + esc(o.cta.href) + '">' +
          esc(o.cta.label || 'Read more') + '</a>';
      }
      html += '<button class="shade-nudge__dismiss" type="button">' +
        '<span class="shade-visually-hidden">Dismiss this tip</span>' +
        '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
        '<path d="M4 4 L12 12 M12 4 L4 12"/></svg></button>';
      card.innerHTML = html;

      anchor.appendChild(card);
      requestAnimationFrame(function () { card.classList.add('is-visible'); });

      var close = function (viaUser) {
        document.removeEventListener('keydown', onKey, true);
        card.classList.remove('is-visible');
        setTimeout(function () {
          if (card.parentNode) card.parentNode.removeChild(card);
        }, 200);
        if (viaUser && typeof o.onDismiss === 'function') o.onDismiss();
      };

      var onKey = function (e) { if (e.key === 'Escape') close(true); };
      document.addEventListener('keydown', onKey, true);

      card.querySelector('.shade-nudge__dismiss').addEventListener('click', function () {
        close(true);
      });

      var cta = card.querySelector('.shade-nudge__cta');
      if (cta && typeof o.onAct === 'function') cta.addEventListener('click', o.onAct);

      /** Position the card beside a character rect, clamped into the viewport. */
      var place = function (charRect) {
        if (!charRect) return;
        var side = o.side || 'right';
        var w = card.offsetWidth || 264;
        var h = card.offsetHeight || 96;
        var x;
        var y;

        if (side === 'top') {
          x = charRect.left - 20;
          y = charRect.top - h - 12;
        } else if (side === 'bottom-left') {
          x = charRect.left - 20;
          y = charRect.bottom + 12;
        } else {
          x = charRect.right + 12;
          y = charRect.top;
        }

        /* Never off-screen, never under the navbar. */
        x = Math.max(16, Math.min(x, innerWidth - w - 16));
        y = Math.max(72, Math.min(y, innerHeight - h - 16));
        card.style.left = Math.round(x) + 'px';
        card.style.top = Math.round(y) + 'px';
      };

      return {el: card, place: place, close: close};
    }
  };

  /* ------------------------------------------------------------------ *
   * MenuHint — hangs from the lip of an open dropdown.
   * ------------------------------------------------------------------ */

  var MenuHint = {
    attach: function (menuEl, o) {
      o = o || {};
      if (!menuEl || menuEl._shadeHint) return null;
      var delay = o.delay == null ? 600 : o.delay;

      var timer = setTimeout(function () {
        var el = Avatar.create({pose: 'hang', mood: o.mood || 'idle', size: o.size || 36});
        el.classList.add('shade-hint');
        /* Hang from the bottom lip of the menu, which is usually not the host
           itself: in Infima the host is the relatively-positioned dropdown and
           the menu is a <ul> inside it, which may not take a <span> child. */
        if (o.anchor) {
          el.style.top = (o.anchor.offsetTop + o.anchor.offsetHeight - 9) + 'px';
          /* Hang under the menu, not under the navbar label: the host is only
             as wide as the word, while the menu is a panel beneath it. */
          el.style.left = (o.anchor.offsetLeft + 20) + 'px';
          el.style.right = 'auto';
        }
        if (o.text) {
          var cap = document.createElement('span');
          cap.className = 'shade-hint__text';
          cap.textContent = o.text;
          el.appendChild(cap);
        }
        menuEl.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('is-visible'); });
        menuEl._shadeHint = el;
      }, delay);

      menuEl._shadeHintTimer = timer;
      return {detach: function () { MenuHint.detach(menuEl); }};
    },

    detach: function (menuEl) {
      if (!menuEl) return;
      clearTimeout(menuEl._shadeHintTimer);
      var el = menuEl._shadeHint;
      if (el && el.parentNode) el.parentNode.removeChild(el);
      menuEl._shadeHint = null;
    }
  };

  /* ------------------------------------------------------------------ *
   * Scheduler — the appearance budget and every suppression rule.
   * The defaults here ARE the contract written in behaviour.md.
   * ------------------------------------------------------------------ */

  var DEFAULTS = {
    maxPerSession: 3,
    minGapMs: 90000,
    quietAfterLoadMs: 12000,
    visibleMs: 9000,
    visibleMsReducedMotion: 14000,
    dwellMs: 8000,
    dwellRatio: 0.6,
    hesitationMs: 2500,
    menuDelayMs: 600,
    dismissalsBeforeOff: 2,
    offForDays: 30,
    minViewportPx: 480,
    gutterMinViewportPx: 1200,
    fastScrollPxPerSec: 1200,
    blockedRoutes: [],
    storageKey: 'shadowit.shade.v1',
    messages: []
  };

  var state = {
    cfg: null,
    live: null,
    nudge: null,
    lastEndedAt: 0,
    startedAt: 0,
    observers: [],
    timers: [],
    claimed: false,
    scrollY: 0,
    scrollAt: 0,
    velocity: 0
  };

  function store(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function sessionCount(key, delta) {
    try {
      var n = parseInt(sessionStorage.getItem(key + '.count') || '0', 10) || 0;
      if (delta) { n += delta; sessionStorage.setItem(key + '.count', String(n)); }
      return n;
    } catch (e) { return 0; }
  }

  function prefersReducedMotion() {
    return typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isOff(cfg) {
    var rec = store(cfg.storageKey, null);
    if (!rec) return false;
    if (rec.off === true) return true;
    if (rec.dismissals >= cfg.dismissalsBeforeOff && rec.until && Date.now() < rec.until) {
      return true;
    }
    return false;
  }

  function recordDismissal(cfg) {
    var rec = store(cfg.storageKey, {dismissals: 0});
    rec.dismissals = (rec.dismissals || 0) + 1;
    if (rec.dismissals >= cfg.dismissalsBeforeOff) {
      rec.until = Date.now() + cfg.offForDays * 86400000;
    }
    save(cfg.storageKey, rec);
  }

  /** Every reason not to appear, in one place. */
  function suppressed(cfg, placement) {
    if (document.visibilityState !== 'visible') return 'hidden-tab';
    if (document.querySelector('dialog[open], .navbar-sidebar--show, [aria-modal="true"]')) {
      return 'modal';
    }
    var a = document.activeElement;
    if (a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) {
      return 'typing';
    }
    var sel = global.getSelection && global.getSelection();
    if (sel && String(sel).length > 0) return 'selection';
    if (state.velocity > cfg.fastScrollPxPerSec) return 'fast-scroll';
    if (innerWidth < cfg.minViewportPx && placement !== 'hang-menu') return 'narrow';
    if (placement === 'gutter-walk' && innerWidth < cfg.gutterMinViewportPx) return 'no-gutter';
    if (navigator.connection && navigator.connection.saveData) return 'save-data';
    for (var i = 0; i < cfg.blockedRoutes.length; i++) {
      if (location.pathname.indexOf(cfg.blockedRoutes[i]) === 0) return 'blocked-route';
    }
    if (isOff(cfg)) return 'opted-out';
    return null;
  }

  function budgetOk(cfg) {
    if (state.live || state.claimed) return false;
    if (sessionCount(cfg.storageKey) >= cfg.maxPerSession) return false;
    if (Date.now() - state.startedAt < cfg.quietAfterLoadMs) return false;
    if (state.lastEndedAt && Date.now() - state.lastEndedAt < cfg.minGapMs) return false;
    return true;
  }

  function appear(target, message) {
    var cfg = state.cfg;
    var placement = message.placement || 'peek-edge';
    if (!budgetOk(cfg) || suppressed(cfg, placement)) return;

    var peek = Peek.mount(target, {placement: placement, size: message.size});
    /* Checked before the budget is touched: a skipped appearance costs nothing. */
    if (!peek.fits()) {
      peek.destroy();
      return;
    }
    state.live = peek;
    sessionCount(cfg.storageKey, 1);
    peek.show(message.mood || 'idle');

    var retreatMs = prefersReducedMotion() ? cfg.visibleMsReducedMotion : cfg.visibleMs;
    var timer = null;
    var follow = function () {
      if (state.nudge) state.nudge.place(peek.rect());
    };
    var end = function (immediate) {
      clearTimeout(timer);
      clearInterval(guard);
      removeEventListener('scroll', follow);
      removeEventListener('resize', follow);
      if (state.nudge) { state.nudge.close(false); state.nudge = null; }
      peek.hide(immediate);
      setTimeout(function () {
        peek.destroy();
        state.live = null;
        state.lastEndedAt = Date.now();
      }, immediate ? 0 : 420);
    };

    var guard = setInterval(function () {
      if (suppressed(cfg, placement)) end(true);
    }, 500);

    if (message.title) {
      state.timers.push(setTimeout(function () {
        if (!state.live) return;
        state.nudge = Nudge.open(layer('nudge'), {
          title: message.title,
          body: message.body,
          cta: message.cta,
          side: message.side,
          onDismiss: function () { recordDismissal(cfg); end(true); },
          onAct: function () { peek.setMood('happy'); setTimeout(end, 600); }
        });
        var card = state.nudge.el;
        state.nudge.place(peek.rect());
        addEventListener('scroll', follow, {passive: true});
        addEventListener('resize', follow);
        var pause = function () { clearTimeout(timer); };
        var resume = function () { timer = setTimeout(end, retreatMs); };
        card.addEventListener('mouseenter', pause);
        card.addEventListener('focusin', pause);
        card.addEventListener('mouseleave', resume);
        card.addEventListener('focusout', resume);
      }, 400));
    }

    timer = setTimeout(end, retreatMs);
  }

  function watchScroll() {
    var onScroll = function () {
      var now = Date.now();
      var dy = Math.abs(scrollY - state.scrollY);
      var dt = Math.max(now - state.scrollAt, 16);
      state.velocity = (dy / dt) * 1000;
      state.scrollY = scrollY;
      state.scrollAt = now;
    };
    addEventListener('scroll', onScroll, {passive: true});
    return function () { removeEventListener('scroll', onScroll); };
  }

  var Scheduler = {
    defaults: DEFAULTS,

    start: function (cfg) {
      Scheduler.stop();
      var c = {};
      var k;
      for (k in DEFAULTS) if (Object.prototype.hasOwnProperty.call(DEFAULTS, k)) c[k] = DEFAULTS[k];
      for (k in cfg || {}) if (Object.prototype.hasOwnProperty.call(cfg, k)) c[k] = cfg[k];
      state.cfg = c;
      state.startedAt = Date.now();
      state.scrollY = scrollY;
      state.scrollAt = Date.now();
      state.teardownScroll = watchScroll();

      if (isOff(c)) return;

      var byId = {};
      c.messages.forEach(function (m) { byId[m.id] = m; });

      var anchors = document.querySelectorAll('[data-shade]');
      Array.prototype.forEach.call(anchors, function (el) {
        var placement = el.getAttribute('data-shade');
        var id = el.getAttribute('data-shade-id');
        var message = byId[id];
        if (!message) return;
        message.placement = message.placement || placement;

        if (placement === 'hesitation') {
          var hoverTimer;
          el.addEventListener('mouseenter', function () {
            hoverTimer = setTimeout(function () { appear(el, message); }, c.hesitationMs);
          });
          el.addEventListener('mouseleave', function () { clearTimeout(hoverTimer); });
          el.addEventListener('click', function () { clearTimeout(hoverTimer); });
          return;
        }

        var dwellTimer = null;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.intersectionRatio >= c.dwellRatio) {
              dwellTimer = setTimeout(function () { appear(el, message); }, c.dwellMs);
            } else {
              clearTimeout(dwellTimer);
            }
          });
        }, {threshold: [0, c.dwellRatio, 1]});
        io.observe(el);
        state.observers.push(io);
      });
    },

    stop: function () {
      state.claimed = false;
      state.observers.forEach(function (io) { io.disconnect(); });
      state.observers = [];
      state.timers.forEach(clearTimeout);
      state.timers = [];
      if (state.nudge) { state.nudge.close(false); state.nudge = null; }
      if (state.live) { state.live.destroy(); state.live = null; }
      if (state.teardownScroll) state.teardownScroll();
    },

    /**
     * Take a slot in the session budget for an appearance this component does
     * not own — the menu hint, which lives and dies with its dropdown. Returns
     * false when the budget or a suppression rule says no; call release() when
     * the appearance ends, which starts the gap timer.
     */
    claim: function (placement) {
      var cfg = state.cfg || DEFAULTS;
      if (!budgetOk(cfg)) return false;
      if (suppressed(cfg, placement || 'hang-menu')) return false;
      sessionCount(cfg.storageKey, 1);
      state.claimed = true;
      return true;
    },

    release: function () {
      if (!state.claimed) return;
      state.claimed = false;
      state.lastEndedAt = Date.now();
    },

    /** Fire a message by id, ignoring triggers but not the budget. */
    trigger: function (id) {
      if (!state.cfg) return;
      var message = null;
      state.cfg.messages.forEach(function (m) { if (m.id === id) message = m; });
      if (!message) return;
      var el = document.querySelector('[data-shade-id="' + id + '"]');
      if (el) appear(el, message);
    },

    /** Clear the session count and the opt-out. Testing only. */
    reset: function () {
      var key = (state.cfg || DEFAULTS).storageKey;
      try {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key + '.count');
      } catch (e) {}
    },

    state: function () {
      var cfg = state.cfg || DEFAULTS;
      return {
        shown: sessionCount(cfg.storageKey),
        remaining: Math.max(0, cfg.maxPerSession - sessionCount(cfg.storageKey)),
        visible: !!state.live,
        optedOut: isOff(cfg),
        suppressedBy: suppressed(cfg, 'peek-edge')
      };
    }
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/>/g, '&gt;')
      .replace(/</g, '&lt;');
  }

  global.ShadowITShade = {
    version: '1.0.0',
    art: art,
    Avatar: Avatar,
    Peek: Peek,
    Nudge: Nudge,
    MenuHint: MenuHint,
    Scheduler: Scheduler,
    prefersReducedMotion: prefersReducedMotion
  };
})(window);
