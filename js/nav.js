/**
 * nav.js — Navigation, Scroll Reveal, Reading Progress
 * THE VAL Portfolio
 *
 * Handles:
 *  - Sticky nav shadow on scroll
 *  - Hamburger open/close
 *  - Scroll-reveal (.rv elements)
 *  - Reading progress bar (#rp) for case pages
 *  - Active side-nav highlighting for case pages
 *  - Filter bar for index.html
 *  - Quick Preview panel for index.html
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Sticky nav shadow ──────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger ──────────────────────────────────── */
  const hbg = document.getElementById('hbg');
  const nl  = document.getElementById('nl');
  if (hbg && nl) {
    hbg.addEventListener('click', () => {
      const open = nl.classList.toggle('open');
      hbg.classList.toggle('open', open);
      hbg.setAttribute('aria-expanded', open);
    });
    // Close on nav-link click
    nl.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      nl.classList.remove('open');
      hbg.classList.remove('open');
      hbg.setAttribute('aria-expanded', false);
    }));
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        nl.classList.remove('open');
        hbg.classList.remove('open');
      }
    });
  }

  /* ── Scroll reveal ──────────────────────────────── */
  const rvEls = document.querySelectorAll('.rv');
  if (rvEls.length) {
    rvEls.forEach(el => el.classList.add('pre'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(x => {
        if (x.isIntersecting) {
          x.target.classList.add('in');
          io.unobserve(x.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    rvEls.forEach(el => io.observe(el));
    // Fallback: reveal anything still hidden after 800ms
    setTimeout(() => {
      document.querySelectorAll('.rv.pre:not(.in)').forEach(el => el.classList.add('in'));
    }, 800);
  }

  /* ── Reading progress bar (case pages) ─────────── */
  const rp = document.getElementById('rp');
  if (rp) {
    const updateRP = () => {
      const d = document.documentElement;
      const pct = d.scrollTop / (d.scrollHeight - d.clientHeight) * 100;
      rp.style.width = Math.min(pct, 100) + '%';
    };
    window.addEventListener('scroll', updateRP, { passive: true });
  }

  /* ── Active side-nav (case pages) ──────────────── */
  const sideLinks = document.querySelectorAll('.side-nav-item a[data-sec]');
  if (sideLinks.length) {
    const sections = document.querySelectorAll('section[id], .sec[id]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sideLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.side-nav-item a[data-sec="${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ── Filter bar (index.html) ────────────────────── */
  window.f = function (tag, el) {
    if (tag === 'all') {
      document.querySelectorAll('.ftag').forEach(b => b.classList.remove('on'));
      el.classList.add('on');
    } else {
      document.querySelector('.ftag[data-tag="all"]').classList.remove('on');
      el.classList.toggle('on');
      if (document.querySelectorAll('.ftag.on').length === 0)
        document.querySelector('.ftag[data-tag="all"]').classList.add('on');
    }
    const activeTags = [...document.querySelectorAll('.ftag.on')].map(b => b.dataset.tag);
    const all = activeTags.includes('all');
    let n = 0;
    document.querySelectorAll('.cc').forEach(c => {
      if (c.classList.contains('cc-quote')) { c.classList.toggle('h', !all); return; }
      const t = c.dataset.t || '';
      const words = t.split(' ');
      const show = all || activeTags.every(tag => words.includes(tag));
      c.classList.toggle('h', !show);
      if (show) n++;
    });
    const empty = document.getElementById('empty');
    if (empty) empty.style.display = n ? 'none' : 'block';
  };

  /* ── Quick Preview panel (index.html) ──────────── */
  const panel = document.getElementById('qp');
  if (!panel) return;

  const db = {
    'Задача на калькулятор':       { e: '🌍', m: '24 гипотезы', d: 'Калькулятор → редизайн всего пути пользователя.',  tags: ['B2C','Конверсия','Design System'], steps: [['01','Аудит','Метрика, карты'],['02','Гипотезы','24 по воронке'],['03','DS','Компоненты'],['04','A/B','Запуск'],['05','Итог','Рост конверсии']] },
    'Отменила Excel':     { e: '📊', m: '−85% время',  d: 'Ручной расчёт туров → автоматизированная финмодель.', tags: ['B2E','ERP','Автоматизация'], steps: [['01','Погружение','12 Excel-файлов'],['02','BPMN','Процесс расчёта'],['03','Концепция','Финмодель'],['04','Дизайн','Калькулятор'],['05','Результат','−85% времени']] },
    'ЛК агента с нуля': { e: '💼', m: '×3 скорость', d: 'Скорость создания сделки выросла в 3 раза.',  tags: ['B2B','ERP/CRM'], steps: [['01','Аудит','Боли агентов'],['02','Интервью','8 глубинных'],['03','Прототип','Wireframe → макет'],['04','Тест','Юзабилити'],['05','Запуск','×3 подтверждено']] },
    'Альфа-банк. Подошла как продакт — доказала, что банкомат лишний':         { e: '🏦', m: 'Discovery',   d: 'Полное исследование за 5 дней без брифа.',       tags: ['B2C','Финтех','Геймификация'], steps: [['01','Погружение','Без брифа — гипотезы'],['02','CustDev','12 интервью за 2 дня'],['03','Барьеры','4 ключевых барьера'],['04','Концепция','Геймификация заявки'],['05','UI Kit','Компоненты с нуля']] },
    'Telegram Mini App':  { e: '✈️', m: 'B2C',          d: 'Продукт на широкую аудиторию. Онбординг, retention.', tags: ['B2C','Telegram','Геймификация'], steps: [['01','Research','Конкуренты TG'],['02','Онбординг','Порог входа'],['03','Механики','Удержание'],['04','Прототип','Макет'],['05','Retention','Возврат']] },
    'Этот сайт':          { e: '💻', m: 'Claude AI',    d: 'Портфолио без единой строки кода вручную.',     tags: ['Портфолио','No-code'], steps: [['01','Концепция','Структура'],['02','Дизайн','С Claude'],['03','Вёрстка','Диалог'],['04','Контент','Кейсы'],['05','Готово','Деплой']] }
  };

  let ht, ct;

  function showPanel(card) {
    const nm = card.querySelector('.cc-nm');
    if (!nm) return;
    const d = db[nm.textContent.trim()];
    if (!d) return;
    document.getElementById('qpE').textContent = d.e;
    document.getElementById('qpM').textContent = d.m;
    document.getElementById('qpN').textContent = nm.textContent.trim();
    document.getElementById('qpD').textContent = d.d;
    document.getElementById('qpT').innerHTML = d.tags.map((t, i) =>
      `<span class="qp-tag${i === 0 ? ' y' : ''}">${t}</span>`).join('');
    document.getElementById('qpS').innerHTML = d.steps.map(s =>
      `<div class="qp-step"><span class="qp-sn">${s[0]}</span><div><div class="qp-st">${s[1]}</div><div class="qp-sd">${s[2]}</div></div></div>`
    ).join('');

    const r   = card.getBoundingClientRect();
    const cx  = ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1);
    const pct = parseFloat(cx);
    const l   = Math.max(0, pct - 8);
    const rr  = Math.max(0, 100 - pct - 8);

    panel.style.transition = 'none';
    panel.style.clipPath    = `inset(0% ${rr}% 80% ${l}% round 50px)`;
    panel.offsetHeight; // reflow
    panel.style.transition  = 'clip-path .6s cubic-bezier(0.4,0,0.2,1),opacity .2s ease';
    panel.style.opacity     = '1';
    panel.style.clipPath    = 'inset(0% 0% 0% 0% round 0px)';
    panel.style.pointerEvents = 'auto';
  }

  function hidePanel() {
    panel.style.transition  = 'clip-path .4s cubic-bezier(0.4,0,0.2,1),opacity .3s ease';
    panel.style.clipPath    = 'inset(0% 0% 100% 0% round 0px)';
    panel.style.opacity     = '0';
    panel.style.pointerEvents = 'none';
  }

  document.querySelectorAll('.cc:not(.cc-quote)').forEach(c => {
    c.addEventListener('mouseenter', () => { clearTimeout(ct); ht = setTimeout(() => showPanel(c), 160); });
    c.addEventListener('mouseleave', () => { clearTimeout(ht); ct = setTimeout(hidePanel, 200); });
  });
  panel.addEventListener('mouseenter', () => clearTimeout(ct));
  panel.addEventListener('mouseleave', () => { ct = setTimeout(hidePanel, 200); });
});
