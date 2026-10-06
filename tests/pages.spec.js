// Каждая страница: грузится без ошибок, без битых файлов, без сторонних запросов,
// не шире экрана, без дублей id и без картинок без alt.
const { test, expect } = require('@playwright/test');
const { PAGES, presetLang, watch, scrollThrough, horizontalOverflow } = require('./helpers');

for (const path of PAGES) {
  test.describe(path, () => {
    test('грузится без ошибок, битых файлов и сторонних запросов', async ({ page, baseURL }) => {
      await presetLang(page);
      const problems = watch(page, baseURL);
      await page.goto('/' + path);
      await scrollThrough(page);
      await page.waitForLoadState('networkidle');
      expect(problems.jsErrors, 'ошибки JavaScript').toEqual([]);
      expect(problems.consoleErrors, 'ошибки в консоли').toEqual([]);
      expect(problems.failed, 'упавшие или 404-запросы').toEqual([]);
      expect(problems.external, 'запросы на сторонние сайты').toEqual([]);
    });

    test('страница не шире экрана', async ({ page }) => {
      await presetLang(page);
      await page.goto('/' + path);
      await scrollThrough(page);
      const o = await horizontalOverflow(page);
      expect(o.scrollWidth, `ширина контента ${o.scrollWidth} > экрана ${o.vw}`).toBeLessThanOrEqual(o.vw);
    });

    test('разметка: заголовок, один h1, уникальные id, alt у картинок, язык', async ({ page }) => {
      await presetLang(page);
      await page.goto('/' + path);
      await expect(page).toHaveTitle(/\S/);
      expect(await page.locator('html').getAttribute('lang')).toMatch(/^(ru|en)$/);
      expect(await page.locator('meta[name="viewport"]').count(), 'meta viewport').toBe(1);
      // ровно один h1; у privacy.html вторая языковая версия скрыта атрибутом hidden и не считается
      expect(await page.locator('h1').evaluateAll(hs => hs.filter(h => !h.closest('[hidden]')).length), 'ровно один h1').toBe(1);
      const dupIds = await page.evaluate(() => {
        const seen = {}; document.querySelectorAll('[id]').forEach(e => { seen[e.id] = (seen[e.id] || 0) + 1; });
        return Object.keys(seen).filter(k => seen[k] > 1);
      });
      expect(dupIds, 'повторяющиеся id').toEqual([]);
      const noAlt = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).map(i => i.src));
      expect(noAlt, 'картинки без alt').toEqual([]);
      const unsafeBlank = await page.evaluate(() => [...document.querySelectorAll('a[target="_blank"]')]
        .filter(a => !/noopener/.test(a.rel)).map(a => a.href));
      expect(unsafeBlank, 'target=_blank без rel=noopener').toEqual([]);
    });
  });
}

// Узкие и широкие экраны: от маленьких телефонов до больших мониторов.
test.describe('ширина экрана', () => {
  test.skip(({ isMobile }) => isMobile, 'размеры задаются в самом тесте');
  for (const width of [320, 360, 390, 768, 1024, 1920]) {
    test(`ни одна страница не шире экрана при ${width}px`, async ({ page }) => {
      await presetLang(page);
      await page.setViewportSize({ width, height: 800 });
      const bad = [];
      for (const path of PAGES) {
        await page.goto('/' + path);
        await page.waitForTimeout(150);
        const o = await horizontalOverflow(page);
        if (o.scrollWidth > o.vw) bad.push(`${path}: ${o.scrollWidth}px > ${o.vw}px`);
      }
      expect(bad).toEqual([]);
    });
  }
});

test.describe('вес и скорость', () => {
  test('главная весит меньше 700 КБ, ни одна картинка не тяжелее 150 КБ', async ({ page }) => {
    await presetLang(page);
    let total = 0; const heavy = [];
    page.on('response', async r => {
      const body = await r.body().catch(() => Buffer.alloc(0));
      total += body.length;
      if (r.request().resourceType() === 'image' && body.length > 150 * 1024) heavy.push(`${Math.round(body.length / 1024)} КБ ${r.url()}`);
    });
    await page.goto('/index.html');
    await scrollThrough(page);
    await page.waitForLoadState('networkidle');
    expect(heavy, 'тяжёлые картинки').toEqual([]);
    expect(Math.round(total / 1024), 'вес страницы, КБ').toBeLessThan(700);
  });

  for (const path of ['index.html', 'ai.html']) {
    test(`${path}: макет не прыгает при загрузке (CLS < 0.1)`, async ({ page }) => {
      await presetLang(page);
      await page.addInitScript(() => {
        window.__cls = 0;
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
          .observe({ type: 'layout-shift', buffered: true });
      });
      await page.goto('/' + path);
      await page.waitForTimeout(2500);
      expect(await page.evaluate(() => window.__cls)).toBeLessThan(0.1);
    });
  }
});
