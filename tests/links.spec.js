// Проверки без браузера: все ссылки и файлы на месте, sitemap и robots в порядке.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PAGES } = require('./helpers');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const exists = f => fs.existsSync(path.join(ROOT, decodeURIComponent(f)));

// Эти проверки не зависят от экрана: гоняем их один раз.
test.skip(({ isMobile }) => isMobile, 'статические проверки идут только в проекте desktop');

test('все локальные ссылки и файлы в HTML существуют', () => {
  const missing = [];
  for (const page of PAGES) {
    const html = read(page);
    const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
    const cssUrls = [...html.matchAll(/url\("?([^")]+)"?\)/g)].map(m => m[1]);
    for (const ref of [...refs, ...cssUrls]) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(ref) || ref.startsWith('//')) continue;
      const file = ref.split('#')[0].split('?')[0];
      if (file && !exists(file)) missing.push(`${page} → ${ref}`);
    }
  }
  expect(missing).toEqual([]);
});

test('якорные ссылки (#id) ведут на существующие блоки', () => {
  const broken = [];
  for (const page of PAGES) {
    const html = read(page);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    for (const [, target, anchor] of html.matchAll(/href="([^"#]*)#([^"]+)"/g)) {
      if (/^https?:/.test(target)) continue;
      const other = target && target !== page ? read(target) : null;
      const ok = other ? new RegExp(`\\sid="${anchor}"`).test(other) : ids.has(anchor);
      if (!ok) broken.push(`${page} → ${target}#${anchor}`);
    }
  }
  expect(broken).toEqual([]);
});

test('все файлы из style.css и script.js существуют', () => {
  const missing = [];
  for (const m of read('style.css').matchAll(/url\("?([^")]+)"?\)/g)) {
    if (!m[1].startsWith('data:') && !exists(m[1])) missing.push(`style.css → ${m[1]}`);
  }
  const js = read('script.js');
  for (const m of js.matchAll(/'((?:img|icons|fonts)\/[^']+)'/g)) {
    if (!exists(m[1])) missing.push(`script.js → ${m[1]}`);
    // у обложек кейсов должна быть лёгкая версия для телефонов
    if (/shot: '/.test(js.slice(m.index - 8, m.index)) && !exists(m[1].replace(/\.webp$/, '-640.webp'))) {
      missing.push(`script.js → ${m[1].replace(/\.webp$/, '-640.webp')} (версия для телефона)`);
    }
  }
  for (const m of js.matchAll(/href = '([\w-]+\.html)'/g)) if (!exists(m[1])) missing.push(`script.js → ${m[1]}`);
  expect(missing).toEqual([]);
});

test('sitemap.xml: все страницы на месте и все адреса существуют', () => {
  const xml = read('sitemap.xml');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const page of ['', ...PAGES.filter(p => p !== 'index.html')]) {
    expect(locs, `в sitemap нет ${page || 'главной'}`).toContain('https://new-coder.ru/' + page);
  }
  for (const loc of locs) {
    const file = loc.replace('https://new-coder.ru/', '') || 'index.html';
    expect(exists(file), `${loc} — файла нет`).toBe(true);
  }
});

test('robots.txt разрешает индексацию и указывает на sitemap', () => {
  const robots = read('robots.txt');
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toContain('Sitemap: https://new-coder.ru/sitemap.xml');
  expect(read('CNAME').trim()).toBe('new-coder.ru');
});

test('на сайте нет форм и сторонних скриптов, шрифтов и счётчиков', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page);
    if (/<form[\s>]/i.test(html)) bad.push(`${page}: <form>`);
    if (/formspree/i.test(html)) bad.push(`${page}: formspree`);
    for (const m of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g)) {
      if (!m[1].startsWith('https://new-coder.ru/')) bad.push(`${page}: ${m[1]}`);   // canonical на свой домен — не сторонний
    }
  }
  expect(bad).toEqual([]);
});

test('стили и скрипт подключены с номером версии, одинаковым на всех страницах', () => {
  // без ?v= браузеры показывают старую версию сайта из кэша после обновления
  const versions = new Set();
  for (const page of ['index.html', 'ai.html']) {
    const html = read(page);
    const css = html.match(/href="style\.css\?v=([\w.-]+)"/), js = html.match(/src="script\.js\?v=([\w.-]+)"/);
    expect(css, `${page}: style.css без ?v=`).not.toBeNull();
    expect(js, `${page}: script.js без ?v=`).not.toBeNull();
    versions.add(css[1]); versions.add(js[1]);
  }
  expect([...versions], 'версии должны совпадать').toHaveLength(1);
});
