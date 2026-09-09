const translations = {
  ru: {
    'brand': 'NOVACODE',
    'nav.services': 'Услуги', 'nav.projects': 'Проекты', 'nav.faq': 'FAQ',
    'nav.contact': 'Контакты', 'nav.cta': 'Связаться', 'nav.gamedev': 'Gamedev',
    'hero.badge': 'Открыт для проектов · 2025',
    'hero.title1': 'Превращаю идеи', 'hero.title2': 'в AI-продукты',
    'hero.title3': 'за дни, не месяцы',
    'hero.subtitle': 'Telegram-боты с AI, лендинги под ключ, генераторы контента. Полный цикл: от идеи до запуска.',
    'hero.cta1': 'Смотреть кейсы', 'hero.cta2': 'Написать в Telegram',
    'hero.stat1Label': 'проектов сдано', 'hero.stat2Label': 'боты на связи', 'hero.stat3Label': 'средний срок',
    'hero.scroll': 'Scroll',
    'services.eyebrow': '// Что я делаю',
    'services.title': 'Собираю продукты,<br>которые <span class="text-accent">приносят деньги</span>',
    'services.lead': 'Не «сайт ради сайта», а инструмент, который решает конкретную задачу бизнеса — от заявки до автоматизации.',
    'services.s1Title': 'Боты и мини-приложения', 'services.s1Text': 'Магазины и запись внутри Telegram, приём заявок и оплат, интеграции с CRM и Google Sheets. Работает 24/7 без вас.',
    'services.s2Title': 'Сайты и лендинги', 'services.s2Text': 'Быстрые страницы с калькуляторами, анимацией и формами, которые реально конвертят посетителя в заявку. Адаптив и мультиязычность из коробки.',
    'services.s3Title': 'Автоматизация и AI', 'services.s3Text': 'Убираю ручную рутину: парсинг, генерация карточек и описаний для маркетплейсов, обработка данных. То, что человек делает за час — за секунды.',
    'projects.eyebrow': '// Портфолио',
    'projects.title': 'Избранные <span class="text-accent">кейсы</span>',
    'projects.lead': 'Готовые решения для бизнеса',
    'projects.priceLabel': 'под ключ', 'projects.buyBtn': 'Купить', 'projects.orderBtn': 'Заказать такой же',
    'projects.p5Status': 'Live · В продакшене', 'projects.p5Link': 'Открыть магазин', 'projects.p5Meta1': 'Telegram Mini App', 'projects.p5Meta2': 'E-commerce',
    'projects.p5Title': 'YFB Store — магазин одежды в Telegram', 'projects.p5Text': 'Полноценный интернет-магазин внутри Telegram: каталог с фото, карточки товаров, корзина, оформление заказа и доставка. Товары автоматически подтягиваются из канала продавца.',
    'projects.p5H1Label': 'авто-тестов', 'projects.p5H2Label': 'парсинг канала', 'projects.p5H3Label': 'доставка', 'projects.p5H4Label': 'в проде',
    'projects.p5F1': 'Каталог с поиском и категориями (работает с кириллицей)', 'projects.p5F2': 'Авто-парсинг товаров из канала продавца', 'projects.p5F3': 'Корзина, оформление, интеграция СДЭК / Яндекс Доставки', 'projects.p5F4': 'Деплой в Docker на Amvera, 110 автотестов',
    'projects.p5Price': 'По запросу', 'projects.p5PriceLabel': 'коммерческий проект',
    'gamedev.eyebrow': '// Личный проект',
    'gamedev.title': 'Разработка игры на <span class="text-accent">Unity</span>',
    'gamedev.lead': 'Помимо коммерческой разработки — делаю собственную игру. Полный цикл: геймдизайн, код на C#, системный дизайн и оптимизация.',
    'gamedev.status': 'В разработке', 'gamedev.badge': '🎮 Психологический хоррор',
    'gamedev.meta1': 'Unity 6000.5', 'gamedev.meta3': 'Built-in RP',
    'gamedev.gTitle': 'Obsession of Fear — атмосферный хоррор',
    'gamedev.gText': 'Психологический хоррор без дешёвых скримеров: напряжение строится на атмосфере, звуке и состоянии психики героя. Внутри — экономика крафта, реактивное окружение и несколько концовок.',
    'gamedev.h1Label': 'открытый цикл', 'gamedev.h2Label': 'дешёвых скримеров', 'gamedev.h3Label': 'систем и механик', 'gamedev.h4Label': 'своя логика',
    'gamedev.f1': 'Экономика крафта: варка → продажа через внутриигровой ПК-мессенджер',
    'gamedev.f2': 'Цикл день↔ночь: ночные отключения энергии и ручной фонарик',
    'gamedev.f3': 'Реактивный дом — событийная система, реагирующая на состояние игрока',
    'gamedev.f4': 'Несколько концовок в зависимости от рассудка и раскрытой правды',
    'gamedev.role': '<strong>Роль:</strong> геймдизайн, программирование (C#), системный дизайн, сборка и оптимизация.',
    'gamedev.cta': 'Обсудить',
    'workflow.eyebrow': '// Процесс',
    'workflow.title': 'Как я <span class="text-accent">работаю</span>',
    'workflow.lead': 'Структурированный подход от идеи к запуску',
    'workflow.step1Title': 'Обсуждение & аналитика',
    'workflow.step1Text': 'Уточняю требования, рисую архитектуру, согласую сроки и бюджет. Вы знаете точно, что и когда получите.',
    'workflow.step1L1': 'Техническое задание',
    'workflow.step1L2': 'Смета и сроки',
    'workflow.step1L3': 'API и интеграции',
    'workflow.step2Title': 'Разработка & тесты',
    'workflow.step2Text': 'Пишу чистый код, автоматизирую тесты, интегрирую с вашими системами. Еженедельные демо и правки по факту.',
    'workflow.step2L1': 'Git + code review',
    'workflow.step2L2': 'Авто-тесты и CI/CD',
    'workflow.step2L3': 'Демо-версии',
    'workflow.step3Title': 'Запуск & поддержка',
    'workflow.step3Text': 'Помогаю с деплоем, настройкой мониторинга, документацией. 14 дней бесплатной поддержки — все баги и вопросы.',
    'workflow.step3L1': 'Деплой на продакшен',
    'workflow.step3L2': 'Документация',
    'workflow.step3L3': '14 дней поддержки',
    'faq.eyebrow': '// FAQ',
    'faq.title': 'Частые <span class="text-accent">вопросы</span>', 'faq.lead': 'Ответы на то, что спрашивают чаще всего',
    'faq.q1': 'Сколько стоит Telegram-бот?', 'faq.a1': 'Готовые — от 3 500 ₽. Уникальный — от 15 000 ₽.',
    'faq.q2': 'Сроки разработки лендинга?', 'faq.a2': 'Простой — 3-5 дней. Премиум — 5-10 дней.',
    'faq.q3': 'Можно доработать готового бота?', 'faq.a3': 'Да. Любая сложность.',
    'faq.q4': 'Как происходит оплата?', 'faq.a4': '50% до начала, 50% после сдачи.',
    'faq.q5': 'Поддержка после сдачи?', 'faq.a5': '14 дней бесплатно.',
    'faq.q6': 'Покажете примеры?', 'faq.a6': 'Конечно. В разделе «Проекты».',
    'contact.eyebrow': '// Контакты',
    'contact.title': 'Обсудим <span class="text-accent">ваш проект?</span>', 'contact.lead': 'Отвечаю в течение дня.',
    'contact.tgLabel': 'Написать в Telegram', 'contact.phoneLabel': 'Позвонить', 'contact.emailLabel': 'Email', 'contact.channelLabel': 'Личный канал',
    'contact.formTitle': 'Или оставьте заявку',
    'contact.formName': 'Имя', 'contact.formContact': 'Телефон или Telegram', 'contact.formMessage': 'О проекте',
    'contact.formSubmit': 'Отправить заявку', 'contact.formNote': 'Отвечу в течение дня · Без спама',
    'footer.about': 'AI-разработка для бизнеса. Telegram-боты, лендинги, автоматизация.',
    'footer.servicesTitle': 'Услуги', 'footer.s1': 'AI-боты', 'footer.s2': 'Лендинги', 'footer.s3': 'AI-генераторы', 'footer.s4': 'Игры на Unity',
    'footer.contactTitle': 'Связь', 'footer.channel': 'Личный канал · @red_vent', 'footer.copy': '© 2025 NOVACODE.', 'footer.made': 'Сделано с ❤ в NOVACODE',
    'widget.tooltip': 'Написать в Telegram'
  },
  en: {
    'brand': 'NOVACODE',
    'nav.services': 'Services', 'nav.projects': 'Projects', 'nav.faq': 'FAQ',
    'nav.contact': 'Contact', 'nav.cta': 'Get in touch', 'nav.gamedev': 'Gamedev',
    'hero.badge': 'Available for projects · 2025',
    'hero.title1': 'I turn ideas', 'hero.title2': 'into AI products',
    'hero.title3': 'in days, not months',
    'hero.subtitle': 'Telegram bots with AI, turnkey landing pages, content generators. Full cycle: from idea to launch.',
    'hero.cta1': 'View cases', 'hero.cta2': 'Message on Telegram',
    'hero.stat1Label': 'projects delivered', 'hero.stat2Label': 'bots online', 'hero.stat3Label': 'average time',
    'hero.scroll': 'Scroll',
    'services.eyebrow': '// What I do',
    'services.title': 'I build products<br>that <span class="text-accent">make money</span>',
    'services.lead': 'Not a "site for the sake of a site" — a tool that solves a concrete business task, from lead to automation.',
    'services.s1Title': 'Bots & mini apps', 'services.s1Text': 'Shops and booking inside Telegram, leads and payments, CRM and Google Sheets integrations. Runs 24/7 without you.',
    'services.s2Title': 'Sites & landing pages', 'services.s2Text': 'Fast pages with calculators, animation and forms that actually convert visitors into leads. Responsive and multilingual out of the box.',
    'services.s3Title': 'Automation & AI', 'services.s3Text': 'I remove manual routine: parsing, generating marketplace cards and descriptions, data processing. What takes a human an hour — in seconds.',
    'projects.eyebrow': '// Portfolio',
    'projects.title': 'Featured <span class="text-accent">cases</span>', 'projects.lead': 'Ready solutions for business',
    'projects.priceLabel': 'turnkey', 'projects.buyBtn': 'Buy', 'projects.orderBtn': 'Order similar',
    'projects.p5Status': 'Live · In production', 'projects.p5Link': 'Open store', 'projects.p5Meta1': 'Telegram Mini App', 'projects.p5Meta2': 'E-commerce',
    'projects.p5Title': 'YFB Store — clothing shop in Telegram', 'projects.p5Text': 'A full online store inside Telegram: photo catalog, product cards, cart, checkout and delivery. Products are pulled automatically from the seller\'s channel.',
    'projects.p5H1Label': 'auto-tests', 'projects.p5H2Label': 'channel parsing', 'projects.p5H3Label': 'delivery', 'projects.p5H4Label': 'in prod',
    'projects.p5F1': 'Catalog with search and categories (Cyrillic-aware)', 'projects.p5F2': 'Auto-parsing of products from the seller channel', 'projects.p5F3': 'Cart, checkout, CDEK / Yandex Delivery integration', 'projects.p5F4': 'Dockerized deploy on Amvera, 110 auto-tests',
    'projects.p5Price': 'On request', 'projects.p5PriceLabel': 'commercial project',
    'gamedev.eyebrow': '// Personal project',
    'gamedev.title': 'Building a game in <span class="text-accent">Unity</span>',
    'gamedev.lead': 'Beyond commercial work — I build my own game. Full cycle: game design, C# code, systems design and optimization.',
    'gamedev.status': 'In development', 'gamedev.badge': '🎮 Psychological horror',
    'gamedev.meta1': 'Unity 6000.5', 'gamedev.meta3': 'Built-in RP',
    'gamedev.gTitle': 'Obsession of Fear — atmospheric horror',
    'gamedev.gText': 'Psychological horror with no cheap jumpscares: tension is built on atmosphere, sound and the hero\'s state of mind. Inside — a crafting economy, reactive environment and multiple endings.',
    'gamedev.h1Label': 'open loop', 'gamedev.h2Label': 'cheap jumpscares', 'gamedev.h3Label': 'systems & mechanics', 'gamedev.h4Label': 'custom logic',
    'gamedev.f1': 'Crafting economy: brew → sell via an in-game PC messenger',
    'gamedev.f2': 'Day↔night cycle: nightly power outages and a hand-crank flashlight',
    'gamedev.f3': 'Reactive house — an event system that responds to the player\'s state',
    'gamedev.f4': 'Multiple endings depending on sanity and the truth uncovered',
    'gamedev.role': '<strong>Role:</strong> game design, programming (C#), systems design, build & optimization.',
    'gamedev.cta': 'Discuss',
    'workflow.eyebrow': '// Process',
    'workflow.title': 'How I <span class="text-accent">work</span>',
    'workflow.lead': 'Structured approach from idea to launch',
    'workflow.step1Title': 'Discussion & analytics',
    'workflow.step1Text': 'I clarify requirements, sketch architecture, agree on timeline and budget. You know exactly what and when you\'ll get.',
    'workflow.step1L1': 'Technical specification',
    'workflow.step1L2': 'Estimate & timeline',
    'workflow.step1L3': 'APIs & integrations',
    'workflow.step2Title': 'Development & testing',
    'workflow.step2Text': 'Clean code, automated tests, system integrations. Weekly demos and iterations based on feedback.',
    'workflow.step2L1': 'Git + code review',
    'workflow.step2L2': 'Auto-tests & CI/CD',
    'workflow.step2L3': 'Demo versions',
    'workflow.step3Title': 'Launch & support',
    'workflow.step3Text': 'Help with deployment, monitoring setup, documentation. 14 days free support — all bugs and questions covered.',
    'workflow.step3L1': 'Production deployment',
    'workflow.step3L2': 'Documentation',
    'workflow.step3L3': '14 days support',
    'faq.eyebrow': '// FAQ',
    'faq.title': 'Frequently asked <span class="text-accent">questions</span>', 'faq.lead': 'Answers to common questions',
    'faq.q1': 'How much does a Telegram bot cost?', 'faq.a1': 'Ready-made — from ₽3,500. Custom — from ₽15,000.',
    'faq.q2': 'How long does a landing take?', 'faq.a2': 'Simple — 3-5 days. Premium — 5-10 days.',
    'faq.q3': 'Can I modify an existing bot?', 'faq.a3': 'Yes. Any complexity.',
    'faq.q4': 'How does payment work?', 'faq.a4': '50% upfront, 50% after delivery.',
    'faq.q5': 'Post-delivery support?', 'faq.a5': '14 days free.',
    'faq.q6': 'Can I see examples?', 'faq.a6': 'Of course. In the "Projects" section.',
    'contact.eyebrow': '// Contact',
    'contact.title': 'Let\'s discuss<br><span class="text-accent">your project?</span>', 'contact.lead': 'I respond within a day.',
    'contact.tgLabel': 'Message on Telegram', 'contact.phoneLabel': 'Call', 'contact.emailLabel': 'Email', 'contact.channelLabel': 'Personal channel',
    'contact.formTitle': 'Or leave a message',
    'contact.formName': 'Name', 'contact.formContact': 'Phone or Telegram', 'contact.formMessage': 'About project',
    'contact.formSubmit': 'Send message', 'contact.formNote': 'I\'ll respond within a day · No spam',
    'footer.about': 'AI development for business. Telegram bots, landing pages, automation.',
    'footer.servicesTitle': 'Services', 'footer.s1': 'AI bots', 'footer.s2': 'Landing pages', 'footer.s3': 'AI generators', 'footer.s4': 'Unity games',
    'footer.contactTitle': 'Contact', 'footer.channel': 'Personal channel · @red_vent', 'footer.copy': '© 2025 NOVACODE.', 'footer.made': 'Made with ❤ in NOVACODE',
    'widget.tooltip': 'Message on Telegram'
  }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function t(key) {
  return translations[currentLang]?.[key] || translations.ru[key] || key;
}

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  if (!target || el.dataset.animated) return;
  el.dataset.animated = 'true';
  
  let current = 0;
  const increment = Math.ceil(target / 30);
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 50);
}

// ===== ALL INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: false
    });
  }

  // Translations
  updateTranslations();
  document.getElementById('langSwitch').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang');
      localStorage.setItem('lang', currentLang);
      document.getElementById('langSwitch').querySelectorAll('button').forEach(b => b.classList.remove('lang-switch__btn--active'));
      btn.classList.add('lang-switch__btn--active');
      updateTranslations();
    });
  });

  // Counter animation with IntersectionObserver
  const observerOptions = { threshold: 0.3 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.hasAttribute('data-count')) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));

  // Scroll progress
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (window.scrollY / height) * 100 + '%';
    });
  }

  // Navigation
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  if (burger) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      burger.classList.toggle('active');
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burger.classList.remove('active');
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll to top
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      setTimeout(() => {
        contactForm.submit();
      }, 100);
    });
  }

  // Telegram widget
  const tgWidget = document.getElementById('tgWidget');
  if (tgWidget) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        tgWidget.style.opacity = '1';
        tgWidget.style.pointerEvents = 'auto';
      } else {
        tgWidget.style.opacity = '0.3';
        tgWidget.style.pointerEvents = 'none';
      }
    });
  }

  // Analytics events
  document.querySelectorAll('[data-ym]').forEach(el => {
    el.addEventListener('click', (e) => {
      const event = el.getAttribute('data-ym');
      if (typeof ym !== 'undefined') {
        ym(XXXXXXXX, 'reachGoal', event);
      }
    });
  });

  // Orbital System (Canvas 2D)
  const orbitalContainer = document.getElementById('orbitalContainer');
  if (orbitalContainer) {
    initializeOrbitalSystem(orbitalContainer);
  }
});

// Orbital System - Solar System with Planets
function initializeOrbitalSystem(container) {
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Planets data
  const planets = [
    { name: 'БОТЫ', fact: 'Telegram Mini Apps\n24/7 в работе', radius: 80, angle: 0, color: '#7B68EE', size: 30 },
    { name: 'САЙТЫ', fact: 'Лендинги\nс конверсией', radius: 120, angle: 60, color: '#5EB3D6', size: 25 },
    { name: 'AI', fact: 'Генерация\nконтента', radius: 160, angle: 120, color: '#FF6B9D', size: 28 },
    { name: 'CODE', fact: 'Полный цикл\nразработки', radius: 100, angle: 180, color: '#00D084', size: 26 },
    { name: 'UNITY', fact: 'C# игры\nна Unity', radius: 140, angle: 240, color: '#FFB84D', size: 27 },
    { name: 'DEPLOY', fact: 'Production\nready код', radius: 180, angle: 300, color: '#C9A25B', size: 24 }
  ];

  let rotation = 0;
  let userDrag = 0;
  let hoveredPlanet = null;
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  // Mouse events
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Check if hovering over planet
    hoveredPlanet = null;
    planets.forEach(planet => {
      const angleRad = (planet.angle + rotation) * Math.PI / 180;
      const px = centerX + planet.radius * Math.cos(angleRad);
      const py = centerY + planet.radius * Math.sin(angleRad);
      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist < planet.size * 1.5) {
        hoveredPlanet = planet;
        canvas.style.cursor = 'pointer';
      }
    });
    if (!hoveredPlanet) canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredPlanet = null;
    canvas.style.cursor = 'grab';
  });

  // Dragging to rotate
  let isDragging = false;
  let lastX = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    canvas.style.cursor = 'grabbing';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const delta = e.clientX - lastX;
      userDrag += delta * 0.5;
      lastX = e.clientX;
    }
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update rotation
    rotation = (rotation + 0.3 + userDrag * 0.01) % 360;
    userDrag *= 0.95; // Friction

    // Draw orbits
    planets.forEach(planet => {
      ctx.strokeStyle = 'rgba(201, 162, 91, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw sun
    const sunGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
    sunGrad.addColorStop(0, '#FFD700');
    sunGrad.addColorStop(1, '#C9A25B');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun glow
    ctx.strokeStyle = 'rgba(201, 162, 91, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Draw planets
    planets.forEach(planet => {
      const angleRad = (planet.angle + rotation) * Math.PI / 180;
      const px = centerX + planet.radius * Math.cos(angleRad);
      const py = centerY + planet.radius * Math.sin(angleRad);

      // Planet size based on hover
      let size = planet.size;
      if (hoveredPlanet === planet) {
        size *= 1.5;
      }

      // Planet glow if hovered
      if (hoveredPlanet === planet) {
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 20;
      } else {
        ctx.shadowBlur = 5;
      }

      // Draw planet
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();

      // Planet border
      ctx.strokeStyle = planet.color + 'aa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Planet label (when not hovered)
      if (hoveredPlanet !== planet) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 0;
        ctx.fillText(planet.name, px, py);
      }
    });

    // Draw hovered planet info
    if (hoveredPlanet) {
      ctx.shadowBlur = 0;
      const angleRad = (hoveredPlanet.angle + rotation) * Math.PI / 180;
      const px = centerX + hoveredPlanet.radius * Math.cos(angleRad);
      const py = centerY + hoveredPlanet.radius * Math.sin(angleRad);

      // Info box background
      ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
      ctx.fillRect(px - 90, py + 50, 180, 70);

      // Info box border
      ctx.strokeStyle = hoveredPlanet.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(px - 90, py + 50, 180, 70);

      // Info text
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(hoveredPlanet.name, px, py + 65);

      ctx.fillStyle = hoveredPlanet.color;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(hoveredPlanet.fact, px, py + 90);
    }

    // Draw tooltip
    if (!hoveredPlanet) {
      ctx.fillStyle = 'rgba(201, 162, 91, 0.6)';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('↻ Крути мышью • Наведи на планету', centerX, canvas.height - 20);
    }

    // Handle window resize
    if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }

  animate();
}
