// Главная и AI-страница: язык, переводы, внедрение ИИ, калькулятор, услуги, кейсы, меню, контакты, демо-чат.
const { test, expect } = require('@playwright/test');
const { presetLang } = require('./helpers');

const CYRILLIC = /[А-Яа-яЁё]/;

/** Открыть главную (приветственного окна больше нет). */
async function openHome(page, url = '/index.html') {
  await page.goto(url);
}

test.describe('язык без окна выбора', () => {
  test('окна выбора нет, язык берётся из браузера', async ({ browser }) => {
    for (const [locale, lang] of [['ru-RU', 'ru'], ['en-US', 'en']]) {
      const ctx = await browser.newContext({ locale });
      const page = await ctx.newPage();
      await page.goto('/index.html');
      await expect(page.locator('#langGate')).toHaveCount(0);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('body')).not.toHaveClass(/menu-open/);
      await ctx.close();
    }
  });

  test('выбранный язык запоминается', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.lang [data-lang="en"]').click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('на AI-странице окна нет', async ({ page }) => {
    await page.goto('/ai.html');
    await expect(page.locator('#langGate')).toHaveCount(0);
  });
});

for (const path of ['index.html', 'ai.html']) {
  test(`${path}: в английской версии не осталось русского текста`, async ({ page }) => {
    await presetLang(page, 'ru');
    if (path === 'index.html') await openHome(page); else await page.goto('/' + path);
    await page.locator('.lang [data-lang="en"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(/^[^А-Яа-яЁё]*$/);
    const leftovers = await page.evaluate(re => {
      const rx = new RegExp(re);
      const out = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const n = walker.currentNode, el = n.parentElement;
        if (!el || el.closest('script, style, [hidden], .langgate, .visually-hidden')) continue;
        if (rx.test(n.textContent)) out.push(`<${el.tagName.toLowerCase()} class="${el.className}"> ${n.textContent.trim().slice(0, 50)}`);
      }
      // aria-label тоже должны переводиться
      document.querySelectorAll('[data-i18n-aria]').forEach(e => { if (rx.test(e.getAttribute('aria-label'))) out.push('aria-label: ' + e.getAttribute('aria-label')); });
      return out;
    }, CYRILLIC.source);
    expect(leftovers).toEqual([]);
  });
}

test.describe('главная', () => {
  test.beforeEach(async ({ page }) => { await presetLang(page); await openHome(page); });

  test('первый экран: внедрение ИИ, кнопки разбора и звонка, отзывы на Авито', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('теряет заявки');
    await expect(page.locator('.hero__actions a.btn').first()).toHaveAttribute('href', 'https://t.me/n0vacode');
    await expect(page.locator('.hero__actions a[href="tel:+79105650340"]')).toHaveCount(1);
    await expect(page.locator('.revbadge')).toContainText('отзывов на Авито');
    await page.locator('.revbadge').click();
    await expect(page.locator('#reviews')).toBeInViewport();
  });

  test('лестница внедрения: четыре шага, разбор бесплатный, ссылка на подробности', async ({ page }) => {
    const steps = page.locator('.ladder li');
    await expect(steps).toHaveCount(4);
    await expect(steps.first()).toContainText('бесплатно');
    await expect(steps.nth(2)).toContainText('30');
    await expect(page.locator('#services a[href="vnedrenie.html"]')).toHaveCount(1);
  });

  test('калькулятор потерь пересчитывает сумму и переключает режим', async ({ page }) => {
    const loss = page.locator('#loss');
    await expect(loss).toHaveText('180 000 ₽');        // 10 заявок × 30 дней × 20% × 30% × 10 000 ₽
    await page.locator('#check').fill('20000');
    await expect(loss).toHaveText('360 000 ₽');
    await page.locator('[data-mode="routine"]').click();
    await expect(page.locator('#fRoutine')).toBeVisible();
    await expect(loss).toHaveText('52 800 ₽');         // 3 сотрудника × 2 ч × 22 дня × 400 ₽
    await expect(page.locator('#calc a.btn')).toHaveAttribute('href', 'https://t.me/n0vacode');
  });

  test('четыре быстрых решения с ценой, составом и действием', async ({ page }) => {
    const cards = page.locator('#quick .svc__card');
    await expect(cards).toHaveCount(4);
    for (const card of await cards.all()) {
      await expect(card.locator('h3')).not.toBeEmpty();
      await expect(card.locator('.svc__price b')).toHaveText(/\d.*₽/);
      await expect(card.locator('.svc__inc')).toContainText('Входит');
      await expect(card.locator('a.link')).toHaveAttribute('href', /^(https:\/\/t\.me\/n0vacode|nfc\.html)$/);
    }
  });

  test('«Пример» в карточке услуги открывает нужный кейс', async ({ page }) => {
    for (const [card, name] of [['#svc-shop', 'YFB Store'], ['#svc-web', 'Кумиры Северной Пальмиры'], ['#svc-bot', 'BarBot']]) {
      await page.locator(`${card} .svc__ex`).click();
      await expect(page.locator('#work')).toBeInViewport();
      await page.waitForTimeout(400);   // пока страница едет к кейсам, наведение мыши не должно перебить выбор
      await expect(page.locator('.pitem__btn[aria-expanded="true"] .pitem__name')).toHaveText(name);
    }
  });

  test('в «Работах» только клиентские кейсы, кейс открывается и раскрывается', async ({ page }) => {
    const names = await page.locator('.pitem__name').allTextContents();
    expect(names).toEqual(['YFB Store', 'BarBot', 'Кумиры Северной Пальмиры', 'Ремонт квартир', 'AI-генератор карточек', 'Duallix']);
    await expect(page.locator('.pfilter')).toHaveCount(0);
    await expect(page.locator('#work .tags')).toHaveCount(0);   // стек технологий заказчику не показываем
    await page.locator('.pitem__btn', { hasText: 'Ремонт квартир' }).click();
    await expect(page.locator('.stage .stage__line')).toContainText('цену ремонта');
    const more = page.locator('.stage .more');
    await more.click();
    await expect(more).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.stage .details')).toHaveClass(/is-open/);
  });

  test('пункты меню ведут к своим разделам', async ({ page, isMobile }) => {
    for (const [href, id] of [['#services', 'services'], ['#calc', 'calc'], ['#quick', 'quick'], ['#work', 'work'], ['#reviews', 'reviews'], ['#contact', 'contact']]) {
      if (isMobile) await page.locator('#burger').click();
      await page.locator(`.nav a[href="${href}"]`).click();
      await expect(page.locator('#' + id)).toBeInViewport();
    }
    await expect(page.locator('.nav a[href="ai.html"]')).toHaveCount(0);
  });

  test('блок отзывов: четыре отзыва и ссылка на профиль Авито', async ({ page }) => {
    await expect(page.locator('#reviews .rev')).toHaveCount(4);
    await expect(page.locator('#reviews a[href="https://www.avito.ru/brands/bef6b6dd2afa4adc1995c39daeae428e"]')).toHaveCount(1);
  });

  test('ссылка «Для работодателей» в подвале ведёт на ai.html', async ({ page }) => {
    await expect(page.locator('.aiteaser')).toHaveCount(0);
    await page.locator('.foot a[href="ai.html"]').click();
    await expect(page).toHaveURL(/ai\.html$/);
    await expect(page.locator('h1')).toContainText('Степан');
  });

  test('почта копируется по нажатию и показывается подсказка', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'права на буфер обмена есть только в Chromium');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.locator('[data-copy="stepchikcrypto@gmail.com"]').click();
    await expect(page.locator('#toast')).toHaveClass(/is-on/);
    await expect(page.locator('#toast')).toContainText('stepchikcrypto@gmail.com');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('stepchikcrypto@gmail.com');
  });

  test('ночной чат сам проигрывается и показывает заявку в CRM', async ({ page }) => {
    await page.locator('#chat').scrollIntoViewIfNeeded();
    await expect(page.locator('#chatLog .crm')).toHaveClass(/on/, { timeout: 10_000 });
    await expect(page.locator('#chatNote')).toHaveText('Менеджер спит. Заявка не потерялась.');
    await expect(page.locator('#chatReplay')).toBeEnabled();
  });

  test('на телефоне внизу закреплены кнопки «Написать» и «Позвонить»', async ({ page, isMobile }) => {
    const bar = page.locator('#mcta');
    if (!isMobile) { await expect(bar).toBeHidden(); return; }
    await expect(bar).toBeVisible();
    await expect(bar.locator('a[href="tel:+79105650340"]')).toBeVisible();
  });

  test('ссылки в подвале: политика конфиденциальности', async ({ page }) => {
    await page.locator('.foot a[href="privacy.html"]').click();
    await expect(page).toHaveURL(/privacy\.html$/);
  });
});

test.describe('меню на телефоне', () => {
  test.skip(({ isMobile }) => !isMobile, 'бургер есть только на телефоне');
  test('открывается, закрывается по Esc и после выбора пункта', async ({ page }) => {
    await presetLang(page);
    await openHome(page);
    const burger = page.locator('#burger'), nav = page.locator('#nav');
    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(nav).not.toHaveClass(/is-open/);
    await burger.click();
    await nav.locator('a[href="#work"]').click();
    await expect(nav).not.toHaveClass(/is-open/);
    await expect(page.locator('#work')).toBeInViewport();
  });
});

test.describe('AI-страница', () => {
  test.beforeEach(async ({ page }) => { await presetLang(page); await page.goto('/ai.html'); });

  test('семь AI-проектов, у каждого есть ссылка на код или демо', async ({ page }) => {
    const names = await page.locator('.pitem__name').allTextContents();
    expect(names).toHaveLength(7);
    expect(names).toContain('AI Agent');
    expect(names).not.toContain('YFB Store');
    for (const btn of await page.locator('.pitem__btn').all()) {
      await btn.click();
      await expect(page.locator('.stage a.link')).toHaveAttribute('href', /^https:\/\/(github\.com\/TsDead|tsdead\.github\.io)\//);
    }
  });

  test('карточка стека и ссылка обратно на главную', async ({ page, isMobile }) => {
    await expect(page.locator('.stackcard li')).toHaveCount(11);
    if (isMobile) await page.locator('#burger').click();
    await page.locator('.nav a[href="index.html"]').click();
    await expect(page).toHaveURL(/index\.html$/);
  });
});
