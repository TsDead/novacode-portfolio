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

test.describe('vnedrenie.html', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/vnedrenie.html'); });

  test('ночная переписка доигрывает до заявки в CRM', async ({ page }) => {
    await page.locator('#chat').scrollIntoViewIfNeeded();
    await expect(page.locator('#log .crm')).toHaveClass(/on/, { timeout: 15_000 });
    await expect(page.locator('#replay')).toBeEnabled();
  });

  test('калькулятор потерь: заявки и рутина, склонения', async ({ page }) => {
    await expect(page.locator('#loss')).toHaveText(/180\s000/);              // 10 × 30 × 20% × 30% × 10 000
    await expect(page.locator('#resSub')).toContainText('60 заявок');
    await setRange(page, 'leads', 1); await setRange(page, 'missed', 5);   // 1.5 → 2 заявки
    await expect(page.locator('#resSub')).toContainText('2 заявки');
    await page.locator('[data-mode="routine"]').click();
    await expect(page.locator('#fLeads')).toBeHidden();
    await expect(page.locator('#loss')).toHaveText(/52\s800/);               // 3 × 2 ч × 22 дня × 400
    await expect(page.locator('#resSub')).toContainText('132 часа');
    await setRange(page, 'staff', 1); await setRange(page, 'hours', 0.5);  // 11 часов
    await expect(page.locator('#resSub')).toContainText('11 часов');
    await page.locator('[data-mode="leads"]').click();
    await expect(page.locator('#fRoutine')).toBeHidden();
  });

  test('вкладки сфер: мышью и стрелками', async ({ page }) => {
    await expect(page.locator('#p-law')).toBeVisible();
    await page.locator('#t-med').click();
    await expect(page.locator('#p-med')).toBeVisible();
    await expect(page.locator('#p-law')).toBeHidden();
    await page.locator('#t-med').press('ArrowRight');
    await expect(page.locator('#t-build')).toBeFocused();
    await expect(page.locator('#p-build')).toBeVisible();
    await page.locator('#t-build').press('ArrowLeft');
    await expect(page.locator('#t-med')).toHaveAttribute('aria-selected', 'true');
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
