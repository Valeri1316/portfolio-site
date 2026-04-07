/**
 * modal.js — Case Preview Modal
 * THE VAL Portfolio
 *
 * Exports: openModal(idx), closeModal()
 * Auto-binds to: .case-card[data-case] and overlay/keyboard
 */

const CASES = [
  {
    num: '04',
    title: 'Альфа-банк. Подошла как продакт — доказала, что банкомат лишний',
    tags: ['B2C', 'FinTech', 'Discovery', 'Mobile'],
    tagHighlight: 'FinTech',
    role: 'Product Designer · Solo Research',
    company: 'Альфа-банк (хакатон)',
    platform: 'iOS / Android',
    href: 'mobile.html',
    figma: '#',
    pattern: 'pat-lines',
    images: [
      'media/mobile/case-mobile-1.jpg',
      'media/mobile/case-mobile-2.jpg',
      'media/mobile/case-mobile-3.jpg',
      'media/mobile/case-mobile-4.jpg',
      'media/mobile/case-mobile-5.jpg',
      'media/mobile/case-mobile-6.jpg',
      'media/mobile/case-mobile-7.jpg',
      'media/mobile/case-mobile-8.jpg',
      'media/mobile/case-mobile-9.jpg',
      'media/mobile/case-mobile-10.jpg',
      'media/mobile/case-mobile-11.jpg'
    ],
    stats: [
      { n: '5', l: 'дней соло-Discovery' },
      { n: '8', l: 'конкурентов изучено' },
      { n: '6', l: 'дизайн-решений' }
    ],
    tldr: 'За 5 дней — solo полный цикл: анализ банка, 8 конкурентов, статистика ЦБ, зарубежный опыт, интервью, персона, 2 опроса, backlog. Гипотеза подтвердилась: приложение перекрывает все функции банкомата. Итог — 6 дизайн-решений с финансовой игрой в центре.',
    roleChips: ['Product Designer', 'Solo Research'],
    roleList: [
      'Полный цикл от нуля за 5 дней — самостоятельно, без посторонней помощи',
      'Масштабное исследование: анализ банка, конкурентов, ЦБ, зарубежный опыт, поведение россиян в кризис',
      'Провела интервью, составила персону «Ирина» и Job Stories',
      'Два опроса, Backlog с приоритизацией, Mind Map, IA & User Flow',
      'Разработала 6 дизайн-решений, создала скетчи и макеты',
      'Оформила все наработки в презентацию, соблюла все 4 дедлайна'
    ],
    processSteps: ['Погружение и анализ', 'Пользователь и синтез', 'Проектирование'],
    processActive: 3,
    decisions: [
      { tag: 't-ux',  tagLabel: 'Геймификация', title: 'Финансовая игра внутри банка',        text: 'Сторителлинг раскрывает продукты банка и убирает барьер «первого касания»' },
      { tag: 't-biz', tagLabel: 'Стратегия',    title: 'Накопительный счёт vs цифровой рубль', text: 'ЦБ не позволяет создавать вклады в ЦР — это конкурентное преимущество банка' },
      { tag: 't-arc', tagLabel: 'Тёмная тема',  title: 'Игровой режим визуально отделён',     text: 'Пользователь понимает: вышел из основного интерфейса банка' },
      { tag: 't-sys', tagLabel: 'Positive framing', title: 'Акцент на доходе от продуктов',   text: 'Мотивирует хранить средства в Альфа-банке, а не выводить в цифровой рубль' }
    ]
  },
  {
    num: '03',
    title: 'ЛК агента: −45,3% времени на заявку и восхищенные отзывы',
    tags: ['B2B2C', 'CRM', 'Web-приложение'],
    tagHighlight: 'B2B2C',
    role: 'Product Designer',
    company: 'Туроператор',
    platform: 'Web-приложение',
    href: 'agent-lk.html',
    figma: '#',
    pattern: 'pat-diag',
    images: [
      'media/b2b/case-b2b-1.jpg',
      'media/b2b/case-b2b-2.jpg',
      'media/b2b/case-b2b-3.jpg',
      'media/b2b/case-b2b-4.jpg',
      'media/b2b/case-b2b-5.jpg'
    ],
    stats: [
      { n: '40+', l: 'фичей' },
      { n: '26+', l: 'гипотез' },
      { n: '2',   l: 'типа юзеров' }
    ],
    tldr: 'Агенты массово жаловались на старый кабинет и звонили в поддержку при каждой сложности. Провела исследование двух типов агентов, спроектировала новый ЛК с нуля.',
    roleChips: ['Product Designer'],
    roleList: [
      'Глубинные интервью с агентами + руководителем отдела',
      'Доступ к ЛК конкурентов через инсайдеров + анализ',
      'User flow + IA + приоритизация гипотез',
      'Wireframes → UI → юзабилити-тест двух типов пользователей',
      'Передача в разработку + дизайн-ревью'
    ],
    processSteps: ['Research', 'IA', 'Wireframes', 'UI', 'Тест'],
    processActive: 4,
    decisions: [
      { tag: 't-ux',  tagLabel: 'UX',          title: 'Логика ввода под агента',         text: 'Порядок полей совпадает с тем, как поступает заявка' },
      { tag: 't-biz', tagLabel: 'Мотивация',   title: 'Прозрачная комиссия',             text: 'Агент видит заработок при оформлении — конкурент не предлагает' },
      { tag: 't-arc', tagLabel: 'Безопасность', title: 'Паспортные данные обязательны',  text: 'Решили проблему пропущенных данных у агентов' },
      { tag: 't-sys', tagLabel: 'Фильтры',     title: 'B2B фильтры ≠ B2C фильтры',      text: 'Параметры разные — переиспользование вредило UX' }
    ]
  },
  {
    num: '02',
    title: 'Отменила Excel за 11 дней',
    tags: ['B2E', 'ERP', 'Цифровизация'],
    tagHighlight: 'B2E',
    role: 'Product Designer',
    company: 'Турпродукт',
    platform: 'Web-приложение',
    href: 'b2e.html',
    figma: '#',
    pattern: 'pat-dots',
    images: [
      'media/b2e/case-b2e-1.jpg',
      'media/b2e/case-b2e-2.jpg',
      'media/b2e/case-b2e-3.jpg',
      'media/b2e/case-b2e-4.jpg',
      'media/b2e/case-b2e-5.jpg',
      'media/b2e/case-b2e-6.jpg'
    ],
    stats: [
      { n: '−85%', l: 'время расчёта' },
      { n: 'ERP',  l: 'модуль' },
      { n: '1',    l: 'ключевой слот' }
    ],
    tldr: 'Перевела сложный Excel-расчёт стоимости туров в прозрачную автоматизированную систему. Работала на стыке бизнес-аналитики и UX — полностью формализовала логику ценообразования.',
    roleChips: ['Product Designer'],
    roleList: [
      'Погружение: встреча с руководителем + изучение Excel-файла расчётов',
      'Формализация логики ценообразования и всех переменных',
      'Проектирование модуля: от структуры до UI',
      'Автоматическое распределение затрат по размерам групп',
      'Расчёт точки рентабельности и рекомендованной стоимости'
    ],
    processSteps: ['Погружение', 'Анализ', 'Проектирование', 'UI'],
    processActive: 3,
    decisions: [
      { tag: 't-arc', tagLabel: 'Архитектура', title: 'Система сама собирает данные',    text: 'Без ручного ввода — из заполненного турпродукта' },
      { tag: 't-ux',  tagLabel: 'UX',          title: 'Прозрачная финансовая модель',    text: 'Видно каждую статью затрат — не ручной трюк' },
      { tag: 't-biz', tagLabel: 'Результат',   title: '−85% времени на расчёт тура',    text: 'Один расчёт: было ~ 40 мин., стало ~6 минут' },
      { tag: 't-sys', tagLabel: 'Автоматизация', title: 'Маржинальность задаётся один раз', text: 'Стоимость пересчитывается автоматически' }
    ]
  },
  {
    num: '01',
    title: 'Пришла обновить калькулятор — переосмыслила весь путь к покупке',
    tags: ['B2C', 'TravelTech', 'Design System', 'App'],
    tagHighlight: 'B2C',
    role: 'Product Designer + PO',
    company: 'СканТур',
    platform: '',
    href: 'b2c.html',
    figma: '#',
    pattern: 'pat-grid',
    images: [
      'media/b2c/case-2bc-1.jpg',
      'media/b2c/case-2bc-2.jpg',
      'media/b2c/case-2bc-3.jpg',
      'media/b2c/case-2bc-5.jpg',
      'media/b2c/case-2bc-6.jpg',
      'media/b2c/case-2bc-7.jpg',
      'media/b2c/case-2bc-8.jpg',
      'media/b2c/case-2bc-9.jpg',
      'media/b2c/case-2bc-10.jpg',
      'media/b2c/case-2bc-11.jpg',
      'media/b2c/case-2bc-12.jpg',
      'media/b2c/case-2bc-13.jpg',
      'media/b2c/case-2bc-14.jpg',
      'media/b2c/case-2bc-15.jpg'
    ],
    stats: [
      { n: '17', l: 'барьеров найдено' },
      { n: '12', l: 'фичей' },
      { n: '24', l: 'гипотез проверено' }
    ],
    tldr: 'Маркетинг попросил точечно обновить один элемент. Я провела аудит, нашла 17 барьеров в конверсионном пути и убедила заказчика расширить скоуп. Год экспериментов с фрилансерами — конверсия только падала. За один итерационный цикл: новый User Flow, исследование аудитории, два раунда тестирования на реальных пользователях, дизайн-система с нуля.',
    roleChips: ['Product Designer', 'Product Owner'],
    roleList: [
      'Провела аудит сайта — нашла 17 барьеров, презентовала инсайты заказчику с пруфами',
      'Анализ метрик в Яндекс.Метрике: воронки, вебвизор, карты кликов и скроллов',
      'Конкурентный анализ 8 компаний + углублённый разбор лидера рынка «Большая страна»',
      'Исследование аудитории: JTBD + CJM + персоны, согласовано с отделом маркетинга',
      'Два раунда юзабилити-тестирования (desktop + mobile), 7 респондентов через Pthwy',
      'Переработала IA и User Flow',
      'Сформировала дизайн-систему с нуля',
      'Инициировала шаблон Product Vision и систему отслеживания метрик'
    ],
    processSteps: ['Диагностика', 'Стратегия', 'Проектирование'],
    processActive: 2,
    decisions: [
      { tag: 't-arc', tagLabel: 'Архитектура', title: 'Разделение тура и оформления',   text: 'Снизило когнитивную нагрузку — конверсия выросла' },
      { tag: 't-ux',  tagLabel: 'UX',          title: 'Sticky-калькулятор',              text: 'Доступен в любой точке страницы тура' },
      { tag: 't-biz', tagLabel: 'Доверие',     title: 'Редизайн айдентики',              text: 'Без доверия холодный трафик не конвертируется' },
      { tag: 't-sys', tagLabel: 'Система',     title: 'Design System с нуля',            text: 'Ускорила последующие итерации разработки' }
    ]
  },
  {
    num: '06',
    title: 'AURA Game — приложение для споров с друзьями',
    tags: ['Mobile', 'Game', 'Social', '0→1'],
    tagHighlight: 'Mobile',
    role: 'Lead Product Designer',
    company: 'AURA',
    platform: 'iOS / Android',
    href: 'aura.html',
    figma: '#',
    pattern: 'pat-cross',
    images: [
      'media/aura/case-aura-1.jpg',
      'media/aura/case-aura-2.jpg',
      'media/aura/case-aura-3.jpg',
      'media/aura/case-aura-4.jpg',
      'media/aura/case-aura-5.jpg',
      'media/aura/case-aura-6.jpg',
      'media/aura/case-aura-7.jpg',
      'media/aura/case-aura-8.jpg',
      'media/aura/case-aura-9.jpg',
      'media/aura/case-aura-10.jpg',
      'media/aura/case-aura-11.jpg',
      'media/aura/case-aura-12.jpg'
    ],
    stats: [
      { n: '180ч', l: 'на MVP' },
      { n: '10',   l: 'разделов' },
      { n: '6',    l: 'тестов' }
    ],
    tldr: 'Продукт нулевой — ни метрик, ни данных, ни аналогов в СНГ. За 180 часов спроектировала мобильное приложение для социальных ставок: от онбординга до жизненного цикла события, от первого экрана до BPMN согласованной с разработкой.',
    roleChips: ['Lead Product Designer', 'UX Research'],
    roleList: [
      'Product Vision Board совместно с основателем',
      'Исследование сегмента: фреймворк B2C, JTBD, анализ барьеров',
      'User Flow + IA в едином артефакте на уровне экранов',
      'BPMN: 3 роли, полный жизненный цикл события — согласована до разработки',
      '6 юзабилити-тестов + 2 preference-теста до финальной сдачи',
      'Все 10 разделов: онбординг, создание, ставка, мои игры, результат и др.'
    ],
    processSteps: ['Discovery', 'Vision', 'Flow+IA', 'BPMN', 'Hi-fi', 'Тесты'],
    processActive: 5,
    decisions: [
      { tag: 't-ux',  tagLabel: 'Барьер',         title: 'Виртуальная валюта вместо денег',    text: 'Снимает ассоциацию с азартом, юридически чисто' },
      { tag: 't-arc', tagLabel: 'Архитектура',     title: 'Публичная страница без регистрации', text: 'Пользователь видит ценность до регистрации' },
      { tag: 't-biz', tagLabel: 'Рост',            title: 'Шеринг встроен в core-сценарий',    text: 'Вирусная механика сразу после ставки' },
      { tag: 't-sys', tagLabel: 'Жизненный цикл',  title: 'Событие: 5 статусов',               text: 'Понятная система управления для автора игры' }
    ]
  }
];

// ─── State ──────────────────────────────────────────
let currentCase = 0;
let currentImage = 0;

// ─── DOM refs (resolved after DOMContentLoaded) ─────
let modal, overlay;

function renderModal(idx) {
  const c = CASES[idx];
  currentCase = idx;

  // Cover pattern + image
  currentImage = 0;
  document.getElementById('modalCoverBg').className = 'modal-cover-inner ' + c.pattern;
  const img = document.getElementById('modalCoverImg');
  if (c.images && c.images.length) {
    img.src = c.images[0];
    img.style.display = 'block';
  } else {
    img.src = '';
    img.style.display = 'none';
  }

  // Stats (up to 3)
  c.stats.forEach((s, i) => {
    const n = document.getElementById('ms' + (i + 1));
    const l = document.getElementById('ms' + (i + 1) + 'l');
    if (n) { n.textContent = s.n; n.className = s.n.includes('·') ? 'mvs-n placeholder' : 'mvs-n'; }
    if (l) l.textContent = s.l;
  });

  // Tags
  document.getElementById('modalTags').innerHTML = c.tags
    .map(t => `<span class="mtag${t === c.tagHighlight ? ' hi' : ''}">${t}</span>`)
    .join('');

  // Title + meta
  document.getElementById('modalTitle').textContent = c.title;
  document.getElementById('modalMeta').innerHTML = [
    { label: 'Роль',     val: c.role },
    { label: 'Компания', val: c.company },
    { label: 'Платформа', val: c.platform }
  ].filter(m => m.val).map(m => `<span class="mmi"><strong>${m.val}</strong>&ensp;${m.label}</span>`).join('');

  // Process steps HTML
  const stepsHtml = c.processSteps.map((s, i) => {
    const cls = i < c.processActive ? 'done' : i === c.processActive ? 'active' : '';
    return `<div class="m-step ${cls}">
      <div class="m-step-dot">${i + 1}</div>
      <div class="m-step-label">${s}</div>
    </div>`;
  }).join('');

  // Body
  document.getElementById('modalBody').innerHTML = `
    <div class="m-tldr">
      <span class="m-tldr-text">${c.tldr}</span>
    </div>

    <span class="m-sec-lbl">Роль и вклад</span>
    <div class="m-role-row">
      ${c.roleChips.map(ch => `<span class="m-chip m-chip-dark">${ch}</span>`).join('')}
    </div>
    <ul class="m-list" style="margin-top:8px">
      ${c.roleList.map(li => `<li>${li}</li>`).join('')}
    </ul>

    <span class="m-sec-lbl">Этапы работы</span>
    <div class="m-process">${stepsHtml}</div>

    <span class="m-sec-lbl">Ключевые решения</span>
    <div class="m-decisions">
      ${c.decisions.map(d => `
        <div class="m-dec">
          <span class="m-dec-tag ${d.tag}">${d.tagLabel}</span>
          <div class="m-dec-title">${d.title}</div>
          <div class="m-dec-text">${d.text}</div>
        </div>`).join('')}
    </div>`;

  // CTA
  document.getElementById('btnOpenCase').href = c.href;
  document.getElementById('btnFigma').href    = c.figma;

  // Counter + nav buttons
  document.getElementById('caseCounter').textContent = (idx + 1) + ' / ' + CASES.length;
  document.getElementById('btnPrev').disabled = idx === 0;
  document.getElementById('btnNext').disabled = idx === CASES.length - 1;

  // Reset scroll + sticky header
  const scroll = document.getElementById('modalContentScroll');
  if (scroll) scroll.scrollTop = 0;
  const hdr = document.getElementById('modalHeader');
  if (hdr) hdr.classList.remove('scrolled');
}

function openModal(idx) {
  renderModal(idx);
  modal.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// ─── Init ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  modal   = document.getElementById('modal');
  overlay = document.getElementById('overlay');

  if (!modal || !overlay) return; // modal not present on this page

  // Card click: hint button → modal, rest of card → case page
  document.querySelectorAll('.cc[data-case]').forEach(card => {
    const hint = card.querySelector('.cc-hint');
    if (hint) {
      hint.addEventListener('click', e => {
        e.stopPropagation();
        openModal(+card.dataset.case);
      });
    }
    card.addEventListener('click', e => {
      if (e.target.closest('.cc-hint')) return;
      if (e.target.closest('a')) return;
      if (!card.dataset.case) return;
      window.location.href = CASES[+card.dataset.case].href;
    });
  });

  // Close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseFooter').addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Footer navigation
  document.getElementById('btnPrev').addEventListener('click', () => {
    if (currentCase > 0) renderModal(currentCase - 1);
  });
  document.getElementById('btnNext').addEventListener('click', () => {
    if (currentCase < CASES.length - 1) renderModal(currentCase + 1);
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    const c = CASES[currentCase];
    const imgs = c.images || [];
    if (e.key === 'ArrowRight' && imgs.length) {
      currentImage = Math.min(currentImage + 1, imgs.length - 1);
      document.getElementById('modalCoverImg').src = imgs[currentImage];
    }
    if (e.key === 'ArrowLeft' && imgs.length) {
      currentImage = Math.max(currentImage - 1, 0);
      document.getElementById('modalCoverImg').src = imgs[currentImage];
    }
  });

  // Sticky header shadow on scroll
  const scroll = document.getElementById('modalContentScroll');
  if (scroll) {
    scroll.addEventListener('scroll', function () {
      document.getElementById('modalHeader').classList.toggle('scrolled', this.scrollTop > 8);
    });
  }
});
