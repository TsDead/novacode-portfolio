// Главная и AI-страница: окно языка, переводы, услуги, кейсы, меню, копирование контактов, демо.
const { test, expect } = require('@playwright/test');
const { presetLang } = require('./helpers');

const CYRILLIC = /[А-Яа-яЁё]/;

test.describe('окно выбора языка', () => {
  test('показывается при первом визите и запоминает выбор', async ({ page }) => {
    await page.goto('/index.html');
    const gate = page.locator('#langGate');
    await expect(gate).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/menu-open/);   // прокрутка заблокирована, пока окно открыто
    await gate.locator('[data-lang="en"]').click();
    await expect(gate).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('body')).not.toHaveClass(/menu-open/);
    expect(await page.evaluate(() => localStorage.getItem('lang'))).toBe('en');
    await page.reload();
    await expect(gate).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('закрывается крестиком и клавишей Esc', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.langgate__close').click();
    await expect(page.locator('#langGate')).toBeHidden();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('#langGate')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#langGate')).toBeHidden();
  });

  test('на AI-странице окна нет', async ({ page }) => {
    await page.goto('/ai.html');
    await expect(page.locator('#langGate')).toHaveCount(0);
  });
});

for (const path of ['index.html', 'ai.html']) {
  test(`${path}: в английской версии не осталось русского текста`, async ({ page }) => {
    await presetLang(page, 'ru');
    await page.goto('/' + path);
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
  test.beforeEach(async ({ page }) => { await presetLang(page); await page.goto('/index.html'); });

  test('четыре услуги с ценами и действиями', async ({ page }) => {
    const cards = page.locator('.svc__card');
    await expect(cards).toHaveCount(4);
    for (const card of await cards.all()) {
      await expect(card.locator('h3')).not.toBeEmpty();
      await expect(card.locator('.svc__price b')).toHaveText(/\d.*₽/);
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
    await page.locator('.pitem__btn', { hasText: 'Ремонт квартир' }).click();
    await expect(page.locator('.stage .stage__line')).toContainText('цену ремонта');
    const more = page.locator('.stage .more');
    await more.click();
    await expect(more).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.stage .details')).toHaveClass(/is-open/);
  });

  test('пункты меню ведут к своим разделам', async ({ page, isMobile }) => {
    for (const [href, id] of [['#services', 'services'], ['#work', 'work'], ['#contact', 'contact']]) {
      if (isMobile) await page.locator('#burger').click();
      await page.locator(`.nav a[href="${href}"]`).click();
      await expect(page.locator('#' + id)).toBeInViewport();
    }
    await expect(page.locator('.nav a[href="ai.html"]')).toHaveCount(1);
  });

  test('карточка «Ищете AI / LLM-инженера?» ведёт на ai.html', async ({ page }) => {
    await page.locator('.aiteaser__card').click();
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

  test('демо магазина в Telegram само проигрывается и ставится на паузу', async ({ page }) => {
    await page.locator('#tg').scrollIntoViewIfNeeded();                 // за кадром демо стоит на паузе
    await expect(page.locator('#tgScreen .chat')).toBeVisible();
    await expect(page.locator('#tgScreen .view.app').first()).toBeVisible({ timeout: 10_000 });
    const toggle = page.locator('#demoToggle');
    await expect(toggle).toHaveText('Пауза');
    await toggle.click();
    await expect(toggle).toHaveText('Продолжить');
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
    await page.goto('/index.html');
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
