/* NOVACODE portfolio v2. Plain JS, no dependencies. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mobileMq = window.matchMedia('(max-width: 880px)');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  if ('IntersectionObserver' in window) document.documentElement.classList.add('js');

  /* ---------------- texts ---------------- */
  const EN = {
    'meta.title': 'Stepan, NOVACODE: Telegram bots, Telegram shops and websites',
    'meta.desc': 'Telegram bots, in-Telegram shops and websites for small businesses. Since 2024, more than 5 projects.',
    skip: 'Skip to content', navLabel: 'Sections', langLabel: 'Site language',
    'nav.work': 'Work', 'nav.game': 'Game', 'nav.price': 'Prices', 'nav.contact': 'Contact',
    'hero.name': 'Stepan',
    'hero.line': 'Telegram bots, shops and websites. Since 2024, more than five projects.',
    'hero.cta': 'Message me on Telegram', 'hero.work': 'See the work',
    'demo.aria': 'A customer orders a hoodie in the YFB Store shop inside Telegram', 'demo.bot': 'bot',
    'work.title': 'Work',
    'game.studio': 'Duallix studio’s own game',
    'game.line': 'Horror without monsters. It gets scary as the paranoia grows.',
    'game.hint': 'Use the flashlight: move your mouse',
    'game.f1': 'all the code is mine', 'game.f2b': 'Brewing and selling', 'game.f2': 'via a messenger on the in-game PC',
    'game.f3b': 'Sanity and paranoia', 'game.f3': 'change what the hero sees',
    'price.title': 'What do you need built?', 'price.from': 'from',
    step1: 'Conversation', step1t: 'plan, deadline and price before we start',
    step2: 'Development', step2t: 'I show versions along the way',
    step3: 'Launch', step3t: 'plus 14 days of free support',
    'contact.title': 'Contact', 'contact.lead': 'Message me, I reply within a day', 'contact.channel': 'Personal channel',
    'form.open': 'Leave a request', 'form.name': 'Name', 'form.contact': 'Telegram or phone', 'form.msg': 'What needs to be built', 'form.send': 'Send',
    foot: 'Developer and co-founder of Duallix studio'
  };
  const UI = {
    ru: { sent: 'Заявка отправлена. Отвечу в течение дня.', fail: 'Не отправилось. Напишите в Telegram: @n0vacode', fill: 'Заполните все три поля.', sending: 'Отправляю…', copied: 'Скопировано', play: 'Продолжить', pause: 'Пауза', next: 'Следующий шаг', again: 'Сначала', menuOpen: 'Закрыть меню', menuClosed: 'Открыть меню', more: 'Как это было', less: 'Свернуть', was: 'Было', did: 'Сделал', end: 'Итог', hintTouch: 'Посветите фонариком: ведите пальцем', formClose: 'Скрыть заявку' },
    en: { sent: 'Request sent. I’ll reply within a day.', fail: 'Couldn’t send. Message me on Telegram: @n0vacode', fill: 'Please fill in all three fields.', sending: 'Sending…', copied: 'Copied', play: 'Resume', pause: 'Pause', next: 'Next step', again: 'Start over', menuOpen: 'Close menu', menuClosed: 'Open menu', more: 'How it went', less: 'Collapse', was: 'Before', did: 'What I built', end: 'Result', hintTouch: 'Use the flashlight: drag your finger', formClose: 'Hide the form' }
  };

  const PROJECTS = [
    { id: 'yfb', phones: ['img/yfb-1.webp', 'img/yfb-2.webp', 'img/yfb-3.webp'], link: 'https://t.me/YFB_Store_bot', tags: ['Telegram Mini App', 'FastAPI', 'aiogram', 'React', 'Docker'],
      ru: { name: 'YFB Store', kind: 'Магазин одежды в Telegram', line: 'Каталог собирается сам из постов канала продавца. Корзина, СДЭК, 110 автотестов.', open: 'Открыть магазин',
        was: 'Товары в постах канала, заказы в личке, учёт в таблице.', did: 'Магазин из семи экранов внутри Telegram. Бот читает посты канала и сам делает карточки, продавец одобряет их одним нажатием.', end: 'Работает на своём сервере, бэкап каждый день приходит продавцу в личку.' },
      en: { name: 'YFB Store', kind: 'Clothing shop inside Telegram', line: 'The catalog builds itself from the seller’s channel posts. Cart, CDEK delivery, 110 automated tests.', open: 'Open the shop',
        was: 'Products in channel posts, orders in DMs, stock in a spreadsheet.', did: 'A seven-screen shop inside Telegram. The bot reads channel posts and makes product cards itself; the seller approves them with one tap.', end: 'Runs on its own server; a backup lands in the seller’s DMs every day.' } },
    { id: 'holo', shot: 'img/holo.webp', link: 'https://holo.galoba.ru', tags: ['WordPress', 'Elementor', 'JavaScript'],
      ru: { name: 'Кумиры Северной Пальмиры', kind: 'Виртуальная выставка, Петербург', line: '36 голограмм 2001 года. Портреты поворачиваются за курсором, как настоящие.', open: 'holo.galoba.ru',
        was: 'Коллекцию на стеклянных пластинах можно было увидеть только вживую.', did: 'Шоурум на бесплатном Elementor. Функции Elementor Pro написал своим JavaScript.', end: 'Сайт запущен, через форму приходят запросы на закрытый показ.' },
      en: { name: 'Idols of the Northern Palmyra', kind: 'Virtual exhibition, St. Petersburg', line: '36 holograms from 2001. Portraits turn after your cursor, like the real thing.', open: 'holo.galoba.ru',
        was: 'The glass-plate collection could only be seen in person.', did: 'A showroom on free Elementor. Elementor Pro features rewritten in my own JavaScript.', end: 'The site is live; private viewing requests come in through its form.' } },
    { id: 'barbot', shot: 'img/barbot.webp', tags: ['aiogram 3', 'Google Sheets'],
      ru: { name: 'BarBot', kind: 'Бот для записи в барбершоп', line: 'Услуга, мастер, время. Запись сразу в Google Sheets.',
        was: 'Запись звонками и в переписке, расписание путается.', did: 'Бот с собственным календарём без библиотек и админкой прямо в Telegram.', end: 'Продаю готовым: 3 500 ₽ под ключ.' },
      en: { name: 'BarBot', kind: 'Barbershop booking bot', line: 'Service, barber, time. The booking goes straight into Google Sheets.',
        was: 'Bookings by phone and chat, a tangled schedule.', did: 'A bot with its own library-free calendar and an admin panel right in Telegram.', end: 'Sold ready-made: 3,500 ₽ turnkey.' } },
    { id: 'remont', shot: 'img/remont.webp', tags: ['HTML', 'CSS', 'JS'],
      ru: { name: 'Ремонт квартир', kind: 'Лендинг с калькулятором', line: 'Клиент считает цену ремонта до звонка.',
        was: 'Бригаде нужен был сайт, где стоимость видна сразу.', did: 'Калькулятор цены за м², фото объектов, две языковые версии, форма с маской телефона.', end: 'Заявки приходят от людей, которые уже знают бюджет.' },
      en: { name: 'Apartment renovation', kind: 'Landing page with a calculator', line: 'Clients work out the price before calling.',
        was: 'The crew needed a site that shows the cost right away.', did: 'Price-per-m² calculator, project photos, two languages, a form with a phone mask.', end: 'Requests come from people who already know their budget.' } },
    { id: 'ai', shot: 'img/ai-gen.webp', tags: ['Python', 'AI'],
      ru: { name: 'AI-генератор карточек', kind: 'Для Wildberries и Ozon', line: 'Карточка товара за 5 секунд вместо часа.',
        was: 'На одну карточку уходит около часа ручной работы.', did: 'Программа пишет название, SEO-описание, характеристики, ключи и ответы на отзывы.', end: 'Продаётся лицензией за 15 000 ₽.' },
      en: { name: 'AI card generator', kind: 'For Wildberries and Ozon', line: 'A product card in 5 seconds instead of an hour.',
        was: 'One card takes about an hour of manual work.', did: 'The app writes the title, SEO description, specs, keywords and replies to reviews.', end: 'Sold as a 15,000 ₽ licence.' } },
    { id: 'duallix', shot: 'img/duallix.webp', link: 'https://tsdead.github.io/duallix/', tags: ['HTML', 'CSS', 'JS'],
      ru: { name: 'Duallix', kind: 'Презентация своей студии', line: 'Одна ссылка вместо PDF с коммерческим предложением.', open: 'tsdead.github.io/duallix',
        was: 'Клиентам приходилось объяснять в переписке, чем бот на заказ лучше конструктора.', did: 'Страница с живым макетом магазина и сравнением с конструкторами.', end: 'Отправляю её вместо КП.' },
      en: { name: 'Duallix', kind: 'Presentation for my studio', line: 'One link instead of a PDF proposal.', open: 'tsdead.github.io/duallix',
        was: 'Clients had to be told in chat why a custom bot beats a builder.', did: 'A page with a live shop mockup and a comparison with builders.', end: 'I send it instead of a proposal.' } }
  ];

  const PRICES = [
    { v: 3500, from: true, ru: ['Бот для записи', '1–3 дня', 'Готовый бот, настрою под ваш бизнес'], en: ['Booking bot', '1–3 days', 'Ready-made bot set up for your business'] },
    { v: 15000, from: true, ru: ['Бот под задачу', 'от 5 дней', 'Заявки, оплаты, интеграции с таблицами и CRM'], en: ['Custom bot', 'from 5 days', 'Requests, payments, spreadsheet and CRM integrations'] },
    { v: 15000, from: true, ru: ['Магазин в Telegram', 'от 3 недель', 'Как YFB Store: каталог, корзина, доставка'], en: ['Shop inside Telegram', 'from 3 weeks', 'Like YFB Store: catalog, cart, delivery'] },
    { v: 5000, from: true, ru: ['Лендинг', '3–5 дней', 'Одна страница с формой заявки'], en: ['Landing page', '3–5 days', 'One page with a request form'] },
    { v: 10000, from: true, ru: ['Сложный лендинг', '5–10 дней', 'Калькулятор, анимация, два языка'], en: ['Complex landing', '5–10 days', 'Calculator, animation, two languages'] },
    { v: 15000, from: false, ru: ['AI-генератор карточек', 'сразу', 'Готовая программа, разовая оплата'], en: ['AI card generator', 'right away', 'Ready app, one-time payment'] }
  ];

  let lang = store.get('lang') === 'en' ? 'en' : 'ru';
  const RU = {};
  const nodes = { text: [...document.querySelectorAll('[data-i18n]')], aria: [...document.querySelectorAll('[data-i18n-aria]')] };
  nodes.text.forEach(el => { RU[el.dataset.i18n] = el.innerHTML; });
  nodes.aria.forEach(el => { RU[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  RU['meta.title'] = document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  RU['meta.desc'] = metaDesc.content;
  const t = key => (lang === 'en' ? (EN[key] ?? RU[key]) : RU[key]);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function applyLang() {
    document.documentElement.lang = lang;
    nodes.text.forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    nodes.aria.forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    document.title = t('meta.title');
    metaDesc.content = t('meta.desc');
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    syncBurger();
    nameFx.split();
    work.render(false);
    game.hint();
    price.build();
    formToggleLabel();
    demo.relang();
  }
  document.querySelectorAll('.lang button').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang; store.set('lang', lang); applyLang();
  }));

  /* ---------------- menu ---------------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  function syncBurger() {
    burger.setAttribute('aria-label', UI[lang][burger.getAttribute('aria-expanded') === 'true' ? 'menuOpen' : 'menuClosed']);
  }
  function setMenu(open, focusBurger) {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    syncBurger();
    if (open) setTimeout(() => nav.querySelector('a').focus(), 40);
    else if (focusBurger) burger.focus();
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a') && mobileMq.matches) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (!nav.classList.contains('is-open')) return;
    if (e.key === 'Escape') setMenu(false, true);
    if (e.key === 'Tab') {
      const items = [burger, ...nav.querySelectorAll('a')];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  mobileMq.addEventListener('change', () => { if (!mobileMq.matches) setMenu(false); work.place(); });

  /* ---------------- pointer light ---------------- */
  const glow = document.querySelector('.glow');
  let glowRaf = 0, gx = 0, gy = 0;
  window.addEventListener('pointermove', e => {
    if (!finePointer.matches) return;
    gx = e.clientX; gy = e.clientY;
    if (!glowRaf) glowRaf = requestAnimationFrame(() => { glow.style.setProperty('--gx', gx + 'px'); glow.style.setProperty('--gy', gy + 'px'); glowRaf = 0; });
  }, { passive: true });

  /* ---------------- name: letters react to the pointer ---------------- */
  const nameFx = (() => {
    const el = document.getElementById('name');
    const hero = document.querySelector('.hero');
    let chars = [], raf = 0, px = -9999, py = -9999;
    function split() {
      const text = el.textContent;
      el.setAttribute('aria-label', text);
      el.innerHTML = [...text].map(c => `<span class="ch" aria-hidden="true">${esc(c)}</span>`).join('');
      chars = [...el.children];
      if (!reduceMotion.matches) wave();
    }
    function paint() {
      raf = 0;
      chars.forEach(ch => {
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const f = Math.max(0, 1 - d / 260);
        ch.style.setProperty('--w', Math.round(800 - f * 580));
        ch.style.setProperty('--h', f.toFixed(2));
      });
    }
    function move(e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(paint); }
    function reset() { px = py = -9999; if (!raf) raf = requestAnimationFrame(paint); }
    function wave() {
      chars.forEach((ch, i) => {
        setTimeout(() => { ch.style.setProperty('--w', 220); ch.style.setProperty('--h', 1); }, 250 + i * 90);
        setTimeout(() => { ch.style.setProperty('--w', 800); ch.style.setProperty('--h', 0); }, 650 + i * 90);
      });
    }
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerdown', move);
    hero.addEventListener('pointerleave', reset);
    hero.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') setTimeout(reset, 500); });
    return { split };
  })();

  /* ---------------- work ---------------- */
  const work = (() => {
    const list = document.getElementById('plist');
    const stage = document.getElementById('stage');
    const body = stage.parentElement;
    let active = 0, hoverTimer = 0;

    function media(p) {
      const s = p[lang];
      const cover = (small) => `<div class="cover"><b>${esc(s.name)}</b>${small ? '' : `<span>${esc(s.kind)}</span>`}</div>`;
      const img = src => `<img src="${src}" alt="" loading="lazy" decoding="async" onerror="this.remove()" style="position:absolute;inset:0;z-index:1">`;
      if (p.phones) return `<div class="fan">${p.phones.map(src => `<figure>${cover(true)}${img(src)}</figure>`).join('')}</div>`;
      return `${cover(false)}${img(p.shot)}`;
    }
    function renderList() {
      list.innerHTML = PROJECTS.map((p, i) => `
        <div class="pitem"><button type="button" class="pitem__btn" id="pb-${p.id}" aria-controls="stage" aria-expanded="${i === active}" data-i="${i}">
          <span class="pitem__name">${esc(p[lang].name)}</span><span class="pitem__kind">${esc(p[lang].kind)}</span>
        </button></div>`).join('');
    }
    function renderStage(animate) {
      const p = PROJECTS[active], s = p[lang], u = UI[lang];
      stage.setAttribute('aria-labelledby', 'pb-' + p.id);
      stage.innerHTML = `
        <div class="stage__media">${media(p)}</div>
        <div class="stage__info">
          <p class="stage__line">${esc(s.line)}</p>
          <ul class="tags">${p.tags.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="stage__actions">
            <button type="button" class="more" aria-expanded="false" aria-controls="det-${p.id}"><i aria-hidden="true"></i><span>${u.more}</span></button>
            ${p.link ? `<a class="link" href="${p.link}" target="_blank" rel="noopener">${esc(s.open)}</a>` : ''}
          </div>
          <div class="details" id="det-${p.id}"><dl>
            <div><dt>${u.was}</dt><dd>${esc(s.was)}</dd></div>
            <div><dt>${u.did}</dt><dd>${esc(s.did)}</dd></div>
            <div><dt>${u.end}</dt><dd>${esc(s.end)}</dd></div>
          </dl></div>
        </div>`;
      if (animate && !reduceMotion.matches) { stage.classList.remove('is-in'); void stage.offsetWidth; stage.classList.add('is-in'); }
    }
    function place() {
      if (mobileMq.matches) list.children[active].appendChild(stage);
      else if (stage.parentElement !== body) body.appendChild(stage);
    }
    function set(i, { scroll = false } = {}) {
      if (i === active) return;
      active = i;
      list.querySelectorAll('.pitem__btn').forEach((b, j) => b.setAttribute('aria-expanded', String(j === i)));
      renderStage(true);
      place();
      if (scroll && mobileMq.matches) {
        const b = list.children[i].firstElementChild;
        requestAnimationFrame(() => b.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' }));
      }
    }
    list.addEventListener('click', e => { const b = e.target.closest('.pitem__btn'); if (b) set(+b.dataset.i, { scroll: true }); });
    list.addEventListener('focusin', e => { const b = e.target.closest('.pitem__btn'); if (b && !mobileMq.matches) set(+b.dataset.i); });
    list.addEventListener('pointerover', e => {
      if (!finePointer.matches || mobileMq.matches) return;
      const b = e.target.closest('.pitem__btn'); if (!b) return;
      clearTimeout(hoverTimer); hoverTimer = setTimeout(() => set(+b.dataset.i), 90);
    });
    list.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
    stage.addEventListener('click', e => {
      const m = e.target.closest('.more'); if (!m) return;
      const open = m.getAttribute('aria-expanded') !== 'true';
      m.setAttribute('aria-expanded', String(open));
      m.querySelector('span').textContent = UI[lang][open ? 'less' : 'more'];
      stage.querySelector('.details').classList.toggle('is-open', open);
    });
    return { render(anim) { renderList(); renderStage(anim); place(); }, place };
  })();

  /* ---------------- game: flashlight ---------------- */
  const game = (() => {
    const box = document.getElementById('gameDark');
    const scene = box.querySelector('.game__scene');
    const hintEl = document.getElementById('gameHint');
    let tx = 0, ty = 0, cx = 0, cy = 0, touched = false, visible = false, raf = 0, t0 = performance.now();
    const radius = () => (window.innerWidth < 600 ? 150 : 210);
    function setVars(x, y) { scene.style.setProperty('--fx', x + 'px'); scene.style.setProperty('--fy', y + 'px'); }
    function frame(now) {
      raf = 0;
      if (!visible) return;
      const w = box.clientWidth, h = box.clientHeight;
      if (!touched) { const k = (now - t0) / 1000; tx = w * (0.5 + 0.28 * Math.sin(k * 0.55)); ty = h * (0.42 + 0.18 * Math.sin(k * 0.9 + 1)); }
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      setVars(cx, cy);
      raf = requestAnimationFrame(frame);
    }
    function point(e) {
      const r = box.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (!touched) { touched = true; hintEl.classList.add('is-gone'); }
      if (reduceMotion.matches) setVars(tx, ty);
    }
    box.addEventListener('pointermove', point);
    box.addEventListener('pointerdown', point);
    function init() {
      scene.style.setProperty('--r', (reduceMotion.matches ? radius() * 2 : radius()) + 'px');
      cx = tx = box.clientWidth / 2; cy = ty = box.clientHeight * 0.45; setVars(cx, cy);
    }
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduceMotion.matches && !raf) raf = requestAnimationFrame(frame);
    }).observe(box);
    window.addEventListener('resize', init);
    init();
    return { hint() { hintEl.textContent = finePointer.matches ? t('game.hint') : UI[lang].hintTouch; } };
  })();

  /* ---------------- price picker ---------------- */
  const price = (() => {
    const pick = document.getElementById('pricePick');
    const val = document.getElementById('priceVal');
    const fromEl = document.getElementById('priceFrom');
    const time = document.getElementById('priceTime');
    const note = document.getElementById('priceNote');
    let cur = 0, shown = PRICES[0].v, anim = 0;
    const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    function show(i, animate) {
      cur = i;
      const p = PRICES[i], s = p[lang];
      pick.querySelectorAll('.chip').forEach((c, j) => { c.setAttribute('aria-checked', String(j === i)); c.tabIndex = j === i ? 0 : -1; });
      fromEl.style.visibility = p.from ? 'visible' : 'hidden';
      time.textContent = s[1]; note.textContent = s[2];
      cancelAnimationFrame(anim);
      if (!animate || reduceMotion.matches) { shown = p.v; val.textContent = fmt(p.v); return; }
      const a = shown, b = p.v, st = performance.now();
      const step = now => {
        const k = Math.min(1, (now - st) / 550), e = 1 - Math.pow(1 - k, 3);
        shown = a + (b - a) * e; val.textContent = fmt(Math.round(shown / 100) * 100);
        if (k < 1) anim = requestAnimationFrame(step); else { shown = b; val.textContent = fmt(b); }
      };
      anim = requestAnimationFrame(step);
    }
    function build() {
      pick.innerHTML = PRICES.map((p, i) => `<button type="button" class="chip" role="radio" data-i="${i}">${esc(p[lang][0])}</button>`).join('');
      show(cur, false);
    }
    pick.addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) show(+c.dataset.i, true); });
    pick.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const n = (cur + d + PRICES.length) % PRICES.length;
      show(n, true); pick.children[n].focus();
    });
    return { build };
  })();

  /* ---------------- copy + toast ---------------- */
  const toast = document.getElementById('toast');
  let toastT = 0;
  function say(msg) { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 1800); }
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const v = b.dataset.copy;
    try { await navigator.clipboard.writeText(v); say(UI[lang].copied + ': ' + v); }
    catch (e) { window.location.href = v.startsWith('+') ? 'tel:' + v : 'mailto:' + v; }
  }));

  /* ---------------- form ---------------- */
  const form = document.getElementById('form');
  const formOpen = document.getElementById('formOpen');
  const status = document.getElementById('formStatus');
  const formBtn = document.getElementById('formBtn');
  function formToggleLabel() { formOpen.textContent = form.hidden ? t('form.open') : UI[lang].formClose; }
  formOpen.addEventListener('click', () => {
    form.hidden = !form.hidden;
    formOpen.setAttribute('aria-expanded', String(!form.hidden));
    formToggleLabel();
    if (!form.hidden) form.querySelector('input').focus();
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    let ok = true;
    fields.forEach(f => { const bad = !f.value.trim(); f.setAttribute('aria-invalid', String(bad)); if (bad && ok) { f.focus(); ok = false; } });
    status.className = 'form__status';
    if (!ok) { status.textContent = UI[lang].fill; status.classList.add('is-err'); return; }
    formBtn.disabled = true; status.textContent = UI[lang].sending;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset(); fields.forEach(f => f.removeAttribute('aria-invalid'));
      status.textContent = UI[lang].sent; status.classList.add('is-ok');
    } catch (err) { status.textContent = UI[lang].fail; status.classList.add('is-err'); }
    finally { formBtn.disabled = false; }
  });

  /* ---------------- reveal on scroll ---------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-shown'); io.unobserve(e.target); } }), { threshold: 0.2 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }

  /* ---------------- hero demo ---------------- */
  const ICONS = {
    hoodie: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M36 17c4-6 24-6 28 0l18 10 12 31-12 5-6-16v43H24V47l-6 16-12-5 12-31z" fill="#3A332D"/><path d="M38 18c2 12 22 12 24 0" fill="none" stroke="#C9A25B" stroke-width="3"/><path d="M44 34v12M56 34v12" stroke="#C9A25B" stroke-width="2.5" stroke-linecap="round"/><rect x="36" y="62" width="28" height="12" rx="3" fill="#2C2622"/></svg>',
    sleeve: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M37 15c5 6 21 6 26 0l21 11 8 60-12 2-6-44v46H26V44l-6 44-12-2 8-60z" fill="#EDE7DD"/><path d="M37 15c5 6 21 6 26 0" fill="none" stroke="#B9AE9E" stroke-width="3"/></svg>',
    shoe: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M8 70l3-22c10-1 19-7 26-14l10 7c10 9 24 15 40 17 6 1 8 6 8 12v6H8z" fill="#E9E4DA"/><path d="M8 72h88v7H8z" fill="#3A332D"/><path d="M40 46l6-4M46 51l6-4M52 55l6-4" stroke="#C9A25B" stroke-width="3" stroke-linecap="round"/></svg>',
    cap: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M16 62c0-22 14-34 34-34s34 12 34 34z" fill="#6E4F2E"/><path d="M50 62h44c-2 7-12 10-26 9-8 0-14-3-18-9z" fill="#57401F"/><circle cx="50" cy="29" r="3" fill="#C9A25B"/><path d="M40 48h14" stroke="#C9A25B" stroke-width="3" stroke-linecap="round"/></svg>'
  };
  const TILE_BG = { hoodie: '#D9CDBA', sleeve: '#C8BBA7', shoe: '#CFC9BF', cap: '#E2D6C4' };

  const DEMO = {
    ru: {
      hi: 'Привет! Это YFB Store. Каталог, размеры и&nbsp;доставка прямо здесь.',
      open: 'Открыть магазин',
      catalog: 'Каталог', fresh: 'новинки из канала',
      chips: ['Все', 'Худи', 'Обувь', 'Кепки'],
      items: [['hoodie', 'Худи оверсайз «Смог»', '5 990 ₽'], ['sleeve', 'Лонгслив базовый', '3 490 ₽'], ['shoe', 'Кроссовки Runner', '9 990 ₽'], ['cap', 'Кепка с вышивкой', '1 990 ₽']],
      size: 'Размер', add: 'В корзину', added: 'В корзине',
      cart: 'Корзина', sizeM: 'размер M', total: 'Итого', hint: 'Доставку выберете на следующем шаге', checkout: 'Оформить заказ',
      form: 'Оформление', name: 'Имя', phone: 'Телефон', ship: 'Доставка', point: 'Пункт выдачи',
      cdek: ['СДЭК', 'пункт выдачи, 2–4 дня'], ya: ['Яндекс Доставка', 'курьер, завтра'],
      vName: 'Анна', vPhone: '+7 921 555-14-07', vPoint: 'Невский пр., 28',
      confirm: 'Подтвердить заказ',
      done: '<b>Заказ №1042 принят.</b> Худи «Смог», размер M, 5 990 ₽. СДЭК, пункт выдачи на&nbsp;Невском, 28. Трек-номер пришлю, как только посылка уедет.',
      note: 'Так выглядит YFB Store, живой магазин в Telegram',
      noteEnd: 'Заказ оформлен за полминуты. Сейчас начнём заново'
    },
    en: {
      hi: 'Hi! This is YFB Store. Catalog, sizes and delivery, all right here.',
      open: 'Open the shop',
      catalog: 'Catalog', fresh: 'new from the channel',
      chips: ['All', 'Hoodies', 'Shoes', 'Caps'],
      items: [['hoodie', 'Oversized hoodie “Smog”', '5 990 ₽'], ['sleeve', 'Basic longsleeve', '3 490 ₽'], ['shoe', 'Runner sneakers', '9 990 ₽'], ['cap', 'Embroidered cap', '1 990 ₽']],
      size: 'Size', add: 'Add to cart', added: 'In cart',
      cart: 'Cart', sizeM: 'size M', total: 'Total', hint: 'You’ll choose delivery on the next step', checkout: 'Check out',
      form: 'Checkout', name: 'Name', phone: 'Phone', ship: 'Delivery', point: 'Pickup point',
      cdek: ['CDEK', 'pickup point, 2–4 days'], ya: ['Yandex Delivery', 'courier, tomorrow'],
      vName: 'Anna', vPhone: '+7 921 555-14-07', vPoint: '28 Nevsky Ave',
      confirm: 'Confirm order',
      done: '<b>Order #1042 received.</b> “Smog” hoodie, size M, 5 990 ₽. CDEK pickup point at 28 Nevsky Ave. I’ll send the tracking number as soon as the parcel ships.',
      note: 'This is YFB Store, a live shop inside Telegram',
      noteEnd: 'Order placed in half a minute. Starting over'
    }
  };

  const demo = (() => {
    const tg = document.getElementById('tg');
    const screen = document.getElementById('tgScreen');
    const tapEl = document.getElementById('tgTap');
    const badge = document.getElementById('tgBadge');
    const toggle = document.getElementById('demoToggle');
    const note = document.getElementById('demoNote');
    const ABORT = Symbol('abort');
    let manual = reduceMotion.matches;   // reduced motion: steps only on click
    let userPaused = false, hidden = false, offscreen = false;
    let run = 0, stepIndex = 0, busy = false;
    const L = () => DEMO[lang];
    const paused = () => userPaused || hidden || offscreen;

    /* --- views --- */
    const views = {
      chat(done) {
        const s = L();
        return `<div class="view chat">
          <div class="bubble bubble--me">/start<small>14:31</small></div>
          <div class="bubble">${s.hi}<small>14:31</small></div>
          ${done ? `<div class="bubble is-new">${s.done}<small>14:32</small></div>`
                 : `<div class="chat__open" data-t="open">${s.open}</div>`}
        </div>`;
      },
      catalog() {
        const s = L();
        return `<div class="view app">
          <div class="app__bar"><h5>${s.catalog}</h5><span>${s.fresh}</span></div>
          <div class="chips">${s.chips.map((c, i) => `<span class="${i === 0 ? 'on' : ''}">${c}</span>`).join('')}</div>
          <div class="grid">${s.items.map(([k, n, p], i) => `
            <div class="item" ${i === 0 ? 'data-t="item"' : ''}><div class="item__pic" style="background:${TILE_BG[k]}">${ICONS[k]}</div><p>${n}</p><b>${p}</b></div>`).join('')}
          </div>
        </div>`;
      },
      product() {
        const s = L(), [, n, p] = s.items[0];
        return `<div class="view app">
          <div class="app__bar"><h5>YFB</h5><span>${s.fresh}</span></div>
          <div class="product__pic">${ICONS.hoodie}</div>
          <div class="product__body"><h6>${n}</h6><div class="price">${p}</div>
            <div class="sizes">${['S', 'M', 'L', 'XL'].map(z => `<span data-t="size-${z}">${z}</span>`).join('')}</div>
          </div>
          <div class="app__cta is-muted" data-t="add">${s.add}</div>
        </div>`;
      },
      cart() {
        const s = L(), [, n, p] = s.items[0];
        return `<div class="view app">
          <div class="app__bar"><h5>${s.cart}</h5><span>1</span></div>
          <div class="cart-row"><div class="item__pic">${ICONS.hoodie}</div><p>${n}<br><span>${s.sizeM}</span></p></div>
          <div class="sum"><span>${s.total}</span><b>${p}</b></div>
          <p class="app__hint">${s.hint}</p>
          <div class="app__cta" data-t="checkout">${s.checkout}</div>
        </div>`;
      },
      checkout() {
        const s = L();
        return `<div class="view app">
          <div class="app__bar"><h5>${s.form}</h5><span>5 990 ₽</span></div>
          <div class="field"><label>${s.name}</label><div data-t="f-name"></div></div>
          <div class="field"><label>${s.phone}</label><div data-t="f-phone"></div></div>
          <div class="field"><label>${s.ship}</label></div>
          <div class="ship" style="margin-top:-2px"><span data-t="cdek">${s.cdek[0]}<small>${s.cdek[1]}</small></span><span>${s.ya[0]}<small>${s.ya[1]}</small></span></div>
          <div class="field"><label>${s.point}</label><div data-t="f-point"></div></div>
          <div class="app__cta" data-t="confirm">${s.confirm}</div>
        </div>`;
      }
    };

    function show(name, arg, from = 'right') {
      const old = screen.firstElementChild;
      const wrap = document.createElement('div');
      wrap.innerHTML = views[name](arg).trim();
      const v = wrap.firstElementChild;
      const animate = !manual && old;
      if (animate) v.classList.add(from === 'up' ? 'is-up' : 'is-enter');
      screen.appendChild(v);
      tg.classList.toggle('is-app', name !== 'chat');
      if (animate) {
        v.getBoundingClientRect();
        v.classList.remove('is-enter', 'is-up');
        old.classList.add('is-leave');
        setTimeout(() => old.remove(), 400);
      } else if (old) {
        old.remove();
      }
      return v;
    }
    const $ = key => screen.lastElementChild.querySelector(`[data-t="${key}"]`);

    /* --- timing helpers (pausable, abortable) --- */
    function wait(ms, id) {
      if (manual) return Promise.resolve();
      return new Promise((resolve, reject) => {
        let left = ms;
        const tick = () => {
          if (id !== run) return reject(ABORT);
          if (!paused()) left -= 50;
          if (left <= 0) resolve(); else setTimeout(tick, 50);
        };
        setTimeout(tick, 50);
      });
    }
    async function tap(el, id) {
      if (manual || !el) return;
      const r = el.getBoundingClientRect(), base = tg.getBoundingClientRect();
      tapEl.style.left = (r.left - base.left + r.width / 2) + 'px';
      tapEl.style.top = (r.top - base.top + r.height / 2) + 'px';
      tapEl.style.opacity = '1';
      await wait(520, id);
      tapEl.classList.remove('is-press'); void tapEl.offsetWidth; tapEl.classList.add('is-press');
      await wait(260, id);
    }
    async function type(el, text, id) {
      if (manual) { el.textContent = text; return; }
      el.classList.add('is-typing');
      for (let i = 1; i <= text.length; i++) { el.textContent = text.slice(0, i); await wait(70, id); }
      el.classList.remove('is-typing');
    }
    function setBadge(n) { badge.textContent = n; badge.classList.toggle('is-on', n > 0); }

    /* --- the story, one visible change per step --- */
    const steps = [
      async id => { await tap($('open'), id); show('catalog', null, 'up'); },
      async id => { await tap($('item'), id); show('product'); },
      async id => {
        const m = $('size-M'); await tap(m, id); m.classList.add('on');
        const add = $('add'); add.classList.remove('is-muted'); await wait(350, id);
        await tap(add, id); add.textContent = L().added; add.classList.add('is-done'); setBadge(1);
      },
      async id => { await tap(tg.querySelector('.tg__cart'), id); show('cart'); },
      async id => { await tap($('checkout'), id); show('checkout'); },
      async id => {
        const s = L();
        await tap($('f-name'), id); await type($('f-name'), s.vName, id);
        await wait(200, id); await type($('f-phone'), s.vPhone, id);
        await wait(250, id); const c = $('cdek'); await tap(c, id); c.classList.add('on');
        await wait(200, id); await tap($('f-point'), id); await type($('f-point'), s.vPoint, id);
      },
      async id => {
        const c = $('confirm'); await tap(c, id); c.classList.add('is-done');
        await wait(450, id);
        tapEl.style.opacity = '0';
        setBadge(0);
        show('chat', true);
        note.textContent = DEMO[lang].noteEnd;
      }
    ];
    const pauses = [1500, 1300, 1100, 1100, 1100, 700, 700];

    function reset() {
      run++;
      stepIndex = 0;
      busy = false;
      screen.innerHTML = '';
      tapEl.style.opacity = '0';
      setBadge(0);
      show('chat', false);
      note.textContent = DEMO[lang].note;
      setToggleLabel();
    }

    async function autoplay() {
      const id = run;
      try {
        while (id === run) {
          for (let i = 0; i < steps.length; i++) { await wait(pauses[i], id); await steps[i](id); }
          await wait(4800, id);
          reset();
          return autoplay();
        }
      } catch (e) { if (e !== ABORT) throw e; }
    }

    async function manualStep() {
      if (busy) return;
      if (stepIndex >= steps.length) { reset(); return; }
      busy = true;
      await steps[stepIndex](run);
      stepIndex++;
      busy = false;
      setToggleLabel();
    }

    function setToggleLabel() {
      if (manual) toggle.textContent = stepIndex >= steps.length ? UI[lang].again : UI[lang].next;
      else toggle.textContent = userPaused ? UI[lang].play : UI[lang].pause;
      toggle.setAttribute('aria-pressed', manual ? 'false' : String(userPaused));
      if (manual) toggle.removeAttribute('aria-pressed');
    }

    toggle.addEventListener('click', () => {
      if (manual) { manualStep(); return; }
      userPaused = !userPaused;
      setToggleLabel();
    });

    document.addEventListener('visibilitychange', () => { hidden = document.hidden; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { offscreen = !e.isIntersecting; }, { threshold: 0.15 }).observe(tg);
    }
    reduceMotion.addEventListener('change', () => { manual = reduceMotion.matches; start(); });

    function start() { reset(); if (!manual) autoplay(); }

    return {
      start,
      relang() { start(); }
    };
  })();


  applyLang();
})();
