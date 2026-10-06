// NFC-метки, демо KOMOK и политика конфиденциальности.
const { test, expect } = require('@playwright/test');

async function setRange(page, id, value) {
  await page.locator('#' + id).evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
}

test.describe('nfc.html', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/nfc.html'); });

  test('анимация касания проигрывается до конца', async ({ page }) => {
    await page.locator('#tapBtn').click();
    await expect(page.locator('#scene')).toHaveClass(/is-done/, { timeout: 15_000 });
    await expect(page.locator('#stars span.on')).toHaveCount(5);
    await expect(page.locator('#send')).toHaveText('Спасибо за отзыв!');
    await expect(page.locator('#tapBtn')).toBeEnabled();
  });

  test('калькулятор окупаемости считает и склоняет слова', async ({ page }) => {
    await expect(page.locator('#payback')).toHaveText('7');            // 1990 ₽ / (800 ₽ × 40%) → 7
    await expect(page.locator('#paybackCap')).toContainText('новых клиентов');
    await setRange(page, 'check', 10000);
    await setRange(page, 'margin', 80);
    await expect(page.locator('#payback')).toHaveText('1');
    await expect(page.locator('#paybackCap')).toContainText('новый клиент');
    await setRange(page, 'check', 1000);
    await setRange(page, 'margin', 50);                                // 1990 / 500 → 4
    await expect(page.locator('#paybackCap')).toContainText('новых клиента');
    await setRange(page, 'guests', 100);
    await expect(page.locator('#reviews')).toHaveText('60');           // 100 × 30 / 50
  });

  test('дизайн под бизнес: цена, название и варианты оформления', async ({ page }) => {
    await expect(page.locator('#price')).toHaveText(/1\s?990/);
    await expect(page.locator('#opts')).toBeHidden();
    await page.locator('[data-mode="own"]').click();
    await expect(page.locator('#opts')).toBeVisible();
    await expect(page.locator('#price')).toHaveText(/2\s?990/);
    await page.locator('#biz').fill('Барбер Ок');
    await expect(page.locator('#card .nm')).toHaveText('Барбер Ок');
    await expect(page.locator('#plateName')).toHaveText('Барбер Ок');
    await page.locator('#sw [data-d="3"]').click();
    await expect(page.locator('#card')).toHaveClass(/d-pop/);
    await expect(page.locator('#dname')).toHaveText('Поп');
    await page.locator('#biz').fill('<b>x</b>');                         // ввод не должен превращаться в HTML
    await expect(page.locator('#card .nm b')).toHaveCount(0);
    await page.locator('[data-mode="std"]').click();
    await expect(page.locator('#opts')).toBeHidden();
    await expect(page.locator('#price')).toHaveText(/1\s?990/);
  });
});

test.describe('komok.html', () => {
  const top = '.views .view:last-child';
  test.beforeEach(async ({ page }) => { await page.goto('/komok.html'); });

  test('бронь вещи от карточки до подтверждения', async ({ page }) => {
    await page.locator(`${top} [data-open="cartier"]`).click();
    await expect(page.locator(`${top} .brandline`)).toHaveText('Cartier');
    await page.locator(`${top} [data-act="book"]`).click();
    await expect(page.locator('#sheet')).toHaveClass(/on/);
    await expect(page.locator('#confirmBtn')).toBeDisabled();
    await page.locator('[data-act="share"]').click();
    await expect(page.locator('#confirmBtn')).toBeEnabled();
    await page.locator('#confirmBtn').click();
    await expect(page.locator('#sheet')).toContainText('Забронировано');
    await page.locator('#sheet [data-act="close"]').click();
    await expect(page.locator('#sheet')).not.toHaveClass(/on/);
    await expect(page.locator(`${top} .cta`)).toContainText('Забронировано за вами');
    await page.locator(`${top} [data-act="back"]`).click();
    await expect(page.locator(`${top} [data-open="cartier"] .badge`)).toHaveText('Забронировано');
  });

  test('фильтр по размеру и бренду, сброс фильтра', async ({ page }) => {
    const cards = page.locator(`${top} .grid .card`);
    await expect(cards).toHaveCount(12);
    await page.locator(`${top} [data-act="filter"]`).click();
    await page.locator('#sheet [data-size="42"]').click();
    await page.locator('#sheet [data-brand="Max Mara"]').click();
    await page.locator('#sheet [data-act="apply"]').click();
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toHaveAttribute('data-open', 'maxmara');
    await page.locator(`${top} [data-act="clear"]`).click();
    await expect(cards).toHaveCount(12);
  });

  test('«Хочу похожую» на проданной вещи оформляет подписку', async ({ page }) => {
    await page.locator(`${top} [data-open="moncler"]`).click();
    await page.locator(`${top} [data-act="similar"]`).click();
    await page.locator('#sheet [data-act="subscribe"]').click();
    await expect(page.locator('#sheet')).toContainText('Подписка оформлена');
  });
});

test.describe('privacy.html', () => {
  test('переключение RU/EN и общий выбор языка с главной', async ({ page }) => {
    await page.goto('/privacy.html');                                    // язык не выбран — по умолчанию русский
    await expect(page.locator('#doc-ru')).toBeVisible();
    await expect(page.locator('#doc-en')).toBeHidden();
    await page.locator('.lang [data-lang="en"]').click();
    await expect(page.locator('#doc-en')).toBeVisible();
    await expect(page.locator('#doc-ru')).toBeHidden();
    await expect(page).toHaveTitle('Privacy policy — NOVACODE');
    await page.goto('/index.html');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('ссылки на почту и Telegram верные', async ({ page }) => {
    await page.goto('/privacy.html');
    await expect(page.locator('#doc-ru a[href="mailto:stepchikcrypto@gmail.com"]')).toHaveCount(1);
    await expect(page.locator('#doc-ru a[href="https://t.me/n0vacode"]')).toHaveCount(1);
  });
});
