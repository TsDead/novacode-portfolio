// Общие помощники для тестов.
const PAGES = ['index.html', 'ai.html', 'nfc.html', 'komok.html', 'privacy.html'];

/** Пропустить окно выбора языка: язык уже «выбран» до загрузки страницы. */
async function presetLang(page, lang = 'ru') {
  await page.addInitScript(l => { try { localStorage.setItem('lang', l); } catch (e) {} }, lang);
}

/**
 * Следит за страницей: ошибки JS, ошибки в консоли, упавшие и 404-запросы,
 * запросы на сторонние сайты (их быть не должно: так обещает политика конфиденциальности).
 */
function watch(page, baseURL) {
  const problems = { jsErrors: [], consoleErrors: [], failed: [], external: [] };
  page.on('pageerror', e => problems.jsErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') problems.consoleErrors.push(m.text()); });
  page.on('requestfailed', r => problems.failed.push(`${r.failure()?.errorText} ${r.url()}`));
  page.on('response', r => { if (r.status() >= 400) problems.failed.push(`${r.status()} ${r.url()}`); });
  page.on('request', r => {
    const url = r.url();
    if (!url.startsWith(baseURL) && !url.startsWith('data:') && !url.startsWith('blob:')) problems.external.push(url);
  });
  return problems;
}

/** Прокрутить страницу до конца, чтобы подгрузилось всё ленивое. */
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 500) {
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

/** Есть ли горизонтальная прокрутка (страница шире экрана). */
async function horizontalOverflow(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return { vw, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth };
  });
}

module.exports = { PAGES, presetLang, watch, scrollThrough, horizontalOverflow };
