/**
 * hero-physics.js — Letter gravity triggered by scroll position
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(init, 850);
  });

  var inited = false;

  function init() {
    if (inited) return;
    inited = true;

    var h1 = document.querySelector('.hero-h1');
    if (!h1) return;

    /* stop h1 animation, lock visible state */
    h1.style.animation  = 'none';
    h1.style.opacity    = '1';
    h1.style.transform  = 'none';

    splitAndRun(h1);
  }

  /* ─── Split h1 into letter spans ──────────────────────── */
  function splitAndRun(h1) {
    var nodes = Array.from(h1.childNodes);
    h1.innerHTML = '';
    var spans = [];

    nodes.forEach(function (node) {
      if (node.nodeName === 'BR') {
        h1.appendChild(document.createElement('br'));
        return;
      }
      if (node.nodeType !== 3) return;

      for (var i = 0; i < node.textContent.length; i++) {
        var ch = node.textContent[i];
        if (ch === '\n' || ch === '\r' || ch === '\t') continue;   /* skip HTML formatting */
        if (ch === ' '  || ch === '\u00A0') {
          h1.appendChild(document.createTextNode(ch));
          continue;
        }
        var s = document.createElement('span');
        s.textContent = ch;
        s.style.cssText = 'display:inline-block;';
        h1.appendChild(s);
        spans.push(s);
      }
    });

    if (!spans.length) return;

    /* two frames to let layout settle */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        startPhysics(h1, spans);
      });
    });
  }

  /* ─── Physics ──────────────────────────────────────────── */
  function startPhysics(h1, spans) {

    /* origins in h1-relative coords (h1 top-left = 0,0) */
    var h1R0 = h1.getBoundingClientRect();
    var P = spans.map(function (el) {
      var r  = el.getBoundingClientRect();
      var ox = r.left - h1R0.left + r.width  / 2;
      var oy = r.top  - h1R0.top  + r.height / 2;
      return {
        el: el,
        ox: ox, oy: oy,
        x:  ox, y:  oy,
        vx: 0,  vy: 0,
        rot: 0, vrot: 0,
        w:  r.width, h: r.height,
        state: 'idle'
      };
    });

    var FLOOR    = 600;   /* recalculated at fall-trigger */
    var floorMap = {};

    /* h1 rect updated on scroll (for mouse coords) */
    var h1R = h1.getBoundingClientRect();
    window.addEventListener('scroll', function () {
      h1R = h1.getBoundingClientRect();
    }, { passive: true });
    window.addEventListener('resize', function () {
      h1R      = h1.getBoundingClientRect();
      floorMap = {};
      active   = false;
      P.forEach(function (p) {
        p.x = p.ox; p.y = p.oy;
        p.vx = 0;   p.vy = 0;
        p.rot = 0;  p.vrot = 0;
        p.state = 'idle';
        p.el.style.transform = '';
      });
    });

    var mx = -9999, my = -9999;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });

    var MR     = 10;
    var MF     = 9;
    var active = false;

    /* ── Scroll trigger: fall when crossing FALL_AT down, return when crossing up ── */
    var FALL_AT     = 60;
    var prevSY      = window.scrollY;
    var returnTimer = null;

    window.addEventListener('scroll', function () {
      var sy = window.scrollY;

      /* ── Trigger FALL: crossing FALL_AT going down ── */
      if (sy > FALL_AT && !active) {
        var casesW = document.querySelector('.cases .w');
        FLOOR = casesW
          ? casesW.getBoundingClientRect().top - h1.getBoundingClientRect().top + 10
          : h1.closest('section').getBoundingClientRect().bottom - h1.getBoundingClientRect().top - 20;
        active   = true;
        floorMap = {};
        P.forEach(function (p) {
          if (p.state === 'idle') {
            p.state = 'falling';
            p.vx    = (Math.random() - 0.5) * 2;
            p.vrot  = (Math.random() - 0.5) * 5;
          }
        });
      }

      /* ── Re-fall if scrolled down while returning ── */
      if (sy > FALL_AT && active) {
        P.forEach(function (p) {
          if (p.state === 'returning') {
            p.state = 'falling';
            p.vrot  = (Math.random() - 0.5) * 3;
          }
        });
      }

      /* ── Trigger RETURN: only when crossing FALL_AT going UP ── */
      if (prevSY > FALL_AT && sy <= FALL_AT && active) {
        if (returnTimer) clearTimeout(returnTimer);
        returnTimer = setTimeout(function () {
          returnTimer = null;
          if (window.scrollY <= FALL_AT && active) {
            floorMap = {};
            P.forEach(function (p) {
              if (p.state !== 'idle') p.state = 'returning';
            });
          }
        }, 300);
      } else if (returnTimer && sy > FALL_AT) {
        clearTimeout(returnTimer);
        returnTimer = null;
      }

      prevSY = sy;
    }, { passive: true });

    /* ── Tick ───────────────────────────────────────────────── */
    (function tick() {
      var mhx     = mx - h1R.left;
      var mhy     = my - h1R.top;
      var allIdle = true;

      P.forEach(function (p) {
        if (p.state === 'idle') return;
        allIdle = false;

        /* ─ FALLING ─ */
        if (p.state === 'falling') {
          p.vy   += 1.0;
          if (p.vy > 22) p.vy = 22;
          p.vrot += (Math.random() - 0.5) * 0.4;
          p.vrot *= 0.94;
          p.vx   *= 0.99;

          var dx = p.x - mhx, dy = p.y - mhy;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MR && d > 0.5) {
            var s = (1 - d / MR) * MF;
            p.vx += dx / d * s;
            p.vy += dy / d * s;
          }

          p.x   += p.vx;
          p.y   += p.vy;
          p.rot += p.vrot;

          if (p.y + p.h / 2 >= FLOOR) {
            p.y     = FLOOR - p.h / 2;
            p.vy    = 0;
            p.vx   *= 0.5;
            p.vrot *= 0.3;
            p.state = 'resting';
          }
        }

        /* ─ RESTING ─ */
        else if (p.state === 'resting') {
          var dx = p.x - mhx, dy = p.y - mhy;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MR * 0.85 && d > 0.5) {
            p.state = 'falling';
            var s   = (1 - d / MR) * MF * 2.8;
            p.vx   += dx / d * s;
            p.vy   += dy / d * s * 0.3 - 2.5;
            p.vrot  = (Math.random() - 0.5) * 6;
          }
        }

        /* ─ RETURNING ─ */
        else if (p.state === 'returning') {
          var dx = p.x - mhx, dy = p.y - mhy;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MR && d > 0.5) {
            p.state = 'falling';
            var s   = (1 - d / MR) * MF * 1.8;
            p.vx   += dx / d * s;
            p.vy   += dy / d * s * 0.3 - 2;
            p.vrot  = (Math.random() - 0.5) * 6;
          }
          var rx = p.ox - p.x, ry = p.oy - p.y;
          var rd = Math.sqrt(rx * rx + ry * ry);
          /* spring + затухание сильнее вблизи */
          var nearDamp = rd < 30 ? 0.72 : 0.88;
          p.vx += rx * 0.003;
          p.vy += ry * 0.003;
          p.vx *= nearDamp;
          p.vy *= nearDamp;
          p.vrot *= 0.88;
          p.rot  *= 0.88;
          p.x   += p.vx;
          p.y   += p.vy;
          p.rot += p.vrot;

          if (rd < 0.8 && Math.abs(p.vx) < 0.05 && Math.abs(p.vy) < 0.05) {
            p.x = p.ox; p.y = p.oy;
            p.vx = 0;   p.vy = 0;
            p.rot = 0;  p.vrot = 0;
            p.state = 'idle';
          }
        }

        p.el.style.transform =
          'translate(' + (p.x - p.ox).toFixed(2) + 'px,' +
                         (p.y - p.oy).toFixed(2) + 'px) rotate(' +
                          p.rot.toFixed(2)        + 'deg)';
      });

      if (allIdle && active) {
        active   = false;
        floorMap = {};
        P.forEach(function (p) { p.el.style.transform = ''; });
      }

      requestAnimationFrame(tick);
    }());
  }
}());
