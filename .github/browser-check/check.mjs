// Проверка живого сайта в трёх движках: Chromium, WebKit (движок Safari) и Firefox.
// Запускается из .github/workflows/browser-check.yml, результат — в логе.
// Linux-сборка WebKit в Playwright — тот же движок разметки, что у Safari, но
// рисует по-своему, поэтому сглаживание тонких линий на iPhone может отличаться.
import { chromium, firefox, webkit, devices } from 'playwright';

const BASE = (process.env.BASE_URL || 'https://radionova.pro').replace(/\/$/, '');
const bust = `?check=${Date.now()}`;
const engines = { chromium, firefox, webkit };

const mobile = (width, height, scale) => ({ viewport: { width, height }, deviceScaleFactor: scale, isMobile: true, hasTouch: true });
const desktop = (width, height, scale = 1) => ({ viewport: { width, height }, deviceScaleFactor: scale });
// Firefox не поддерживает isMobile: для него только размер окна и плотность
const ffMobile = (width, height, scale) => ({ viewport: { width, height }, deviceScaleFactor: scale, hasTouch: true });
const pick = (name, fallback) => (devices[name] ? { ...devices[name] } : fallback);
// Профиль устройства без привязки к движку: движок задаём сами
const strip = (profile) => Object.fromEntries(Object.entries(profile).filter(([key]) => key !== 'defaultBrowserType'));

const cases = [
  ['webkit', 'iPhone 13 (390@3)', strip(pick('iPhone 13', mobile(390, 664, 3)))],
  ['webkit', 'iPhone 15 Pro Max (430@3)', strip(pick('iPhone 15 Pro Max', mobile(430, 739, 3)))],
  ['webkit', 'iPhone SE (375@2)', mobile(375, 667, 2)],
  ['webkit', 'iPad Mini (768@2)', strip(pick('iPad Mini', mobile(768, 1024, 2)))],
  ['webkit', 'Safari desktop 1440@2', desktop(1440, 900, 2)],
  ['chromium', 'Pixel 7 (412@2.625)', strip(pick('Pixel 7', mobile(412, 839, 2.625)))],
  ['chromium', 'Android 393@2.75', mobile(393, 851, 2.75)],
  ['chromium', 'Chrome desktop 1440', desktop(1440, 900)],
  ['firefox', 'Firefox 390@3', ffMobile(390, 844, 3)],
  ['firefox', 'Firefox desktop 1440', desktop(1440, 900)],
];

// Картинки в лог: base64 кусками, чтобы их можно было собрать обратно из лога.
// Печатаются до результатов: результаты тогда читаются коротким хвостом лога
const IMAGES = new Set(['iPhone 13 (390@3)', 'Firefox 390@3']);
const images = [];
function printImage(name, buf) {
  const b64 = buf.toString('base64');
  const size = 3000;
  const total = Math.ceil(b64.length / size);
  for (let i = 0; i < total; i++) console.log(`IMG|${name}|${i + 1}/${total}|${b64.slice(i * size, (i + 1) * size)}`);
}

async function frameProfile(page) {
  // Толщина рамки текстового блока первого экрана с каждой стороны, в физических пикселях
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const box = document.querySelector('section h1').parentElement;
    box.id = 'hero-text';
    window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' });
  });
  await page.waitForTimeout(300);
  const rect = await page.evaluate(() => {
    const r = document.getElementById('hero-text').getBoundingClientRect();
    return { l: r.left, r: r.right, t: r.top, b: r.bottom, d: devicePixelRatio, h: innerHeight };
  });
  const shot = await page.screenshot();
  return page.evaluate(async ({ b64, rect }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const data = g.getImageData(0, 0, c.width, c.height).data;
    const d = rect.d;
    const midX = Math.round((rect.l + rect.r) / 2 * d);
    const midY = Math.round((rect.t + Math.min(rect.b, rect.h)) / 2 * d);
    const red = (x, y) => data[(y * c.width + x) * 4];
    const ink = (v) => Math.max(0, (249 - v) / (249 - 27));
    const scan = (points) => {
      const vals = points.map(([x, y]) => red(x, y));
      return `${vals.reduce((s, v) => s + ink(v), 0).toFixed(2)}[${vals.filter((v) => v < 240).join(',')}]`;
    };
    const around = (c0, f) => [...Array(9)].map((_, i) => f(Math.floor(c0) - 4 + i));
    return {
      left: scan(around(rect.l * d, (x) => [x, midY])),
      right: scan(around(rect.r * d, (x) => [x, midY])),
      bottom: rect.b < rect.h ? scan(around(rect.b * d, (y) => [midX, y])) : 'offscreen',
    };
  }, { b64: shot.toString('base64'), rect });
}

async function runCase([engine, name, options]) {
  const browser = await engines[engine].launch();
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const problems = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) problems.push(`console.${m.type()}: ${m.text()}`); });
  page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });

  const result = { engine, name, version: browser.version() };
  try {
    await page.goto(`${BASE}/${bust}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);

    Object.assign(result, await page.evaluate(() => {
      const img = document.querySelector('section img');
      const photo = img.parentElement.getBoundingClientRect();
      const box = document.querySelector('section h1').parentElement;
      const cs = getComputedStyle(box);
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try { return JSON.parse(s.textContent)['@graph'].map((n) => n['@type']).join('+'); } catch (e) { return `invalid: ${e.message}`; }
      });
      return {
        supports: {
          aspectRatio: CSS.supports('aspect-ratio: 1'),
          svh: CSS.supports('height: 1svh'),
          textBalance: CSS.supports('text-wrap: balance'),
          scrollTimeline: CSS.supports('animation-timeline: view()'),
          colorMix: CSS.supports('color: color-mix(in srgb, red, blue)'),
          atProperty: typeof CSS.registerProperty === 'function',
        },
        overflowX: document.documentElement.scrollWidth - innerWidth,
        photoRatioShown: +(photo.height / (photo.width * img.naturalHeight / img.naturalWidth)).toFixed(3),
        photoLoaded: img.complete && img.naturalWidth > 0,
        textBox: [photo.left, photo.bottom, box.getBoundingClientRect().width].map(Math.round),
        frame: { shadow: cs.boxShadow, border: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].join(' ') },
        fonts: [...document.fonts].filter((f) => f.status === 'loaded').length,
        h1Font: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
        jsonLd: ld,
      };
    }));

    result.frameInk = await frameProfile(page);

    if (IMAGES.has(name)) {
      const hero = await page.$('section');
      images.push([`${name} hero`, await hero.screenshot({ type: 'jpeg', quality: 45, scale: 'css' })]);
    }

    // Разделы: после прокрутки к каждому блоку .reveal он должен быть полностью виден
    result.revealHidden = await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const hidden = [];
      for (const el of document.querySelectorAll('.reveal')) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        await wait(120);
        const o = Number(getComputedStyle(el).opacity);
        if (o < 0.95) hidden.push(`${el.tagName.toLowerCase()}:${o.toFixed(2)}`);
      }
      return hidden;
    });

    // Мобильное меню открывается и закрывается (Escape)
    const burger = await page.$('button[aria-label="Открыть меню"]');
    if (burger && await burger.isVisible()) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await burger.click();
      await page.waitForTimeout(700);
      const opened = await page.evaluate(() => document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded'));
      await page.keyboard.press('Escape');
      await page.waitForTimeout(700);
      const closed = await page.evaluate(() => document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded'));
      result.mobileMenu = `${opened}->${closed}`;
    }

    // Имя в шапке ведёт с /podcast на главную
    try {
      await page.goto(`${BASE}/podcast${bust}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.click('header a[href="/"]', { timeout: 10000 });
      await page.waitForURL((u) => u.pathname === '/', { timeout: 10000 }).catch(() => {});
      result.logoFromPodcast = new URL(page.url()).pathname;
    } catch (e) {
      result.logoFromPodcast = `failed: ${e.message.split('\n')[0]}`;
    }

    for (const path of ['/podcast', '/sitemap.xml', '/robots.txt', '/yandex_2e12dd98a82a79a5.html']) {
      const r = await page.goto(`${BASE}${path}${bust}`, { waitUntil: 'load', timeout: 60000 });
      result[path] = r?.status();
    }
  } catch (e) {
    problems.push(`check failed: ${e.message.split('\n')[0]}`);
  }
  result.problems = problems;
  await browser.close();
  return result;
}

const results = [];
for (const c of cases) results.push(await runCase(c));
for (const [name, buf] of images) printImage(name, buf);
for (const r of results) console.log(`RESULT|${JSON.stringify(r)}`);
