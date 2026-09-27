// Проверка живого сайта в трёх движках: Chromium, WebKit (движок Safari) и Firefox.
// Запускается из .github/workflows/browser-check.yml: итог — строки RESULT в логе,
// скриншоты — в .github/browser-check/shots (workflow коммитит их в ветку).
// Linux-сборка WebKit в Playwright — тот же движок разметки, что у Safari, но
// рисует по-своему, поэтому сглаживание тонких линий на iPhone может отличаться.
import { mkdirSync } from 'node:fs';
import { chromium, firefox, webkit, devices } from 'playwright';

const BASE = (process.env.BASE_URL || 'https://radionova.pro').replace(/\/$/, '');
const bust = `?check=${Date.now()}`;
const engines = { chromium, firefox, webkit };
const SHOTS = new URL('./shots/', import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

const mobile = (width, height, scale) => ({ viewport: { width, height }, deviceScaleFactor: scale, isMobile: true, hasTouch: true });
const desktop = (width, height, scale = 1) => ({ viewport: { width, height }, deviceScaleFactor: scale });
// Firefox не поддерживает isMobile: для него только размер окна и плотность
const ffMobile = (width, height, scale) => ({ viewport: { width, height }, deviceScaleFactor: scale, hasTouch: true });
const pick = (name, fallback) => (devices[name] ? { ...devices[name] } : fallback);
// Профиль устройства без привязки к движку: движок задаём сами
const strip = (profile) => Object.fromEntries(Object.entries(profile).filter(([key]) => key !== 'defaultBrowserType'));

// [движок, имя, профиль, файл скриншотов или null]
const cases = [
  ['webkit', 'iPhone 13 (390@3)', strip(pick('iPhone 13', mobile(390, 664, 3))), 'webkit-iphone13'],
  ['webkit', 'iPhone 15 Pro Max (430@3)', strip(pick('iPhone 15 Pro Max', mobile(430, 739, 3))), 'webkit-iphone15promax'],
  ['webkit', 'iPhone SE (375@2)', mobile(375, 667, 2), 'webkit-iphonese'],
  ['webkit', 'iPad Mini (768@2)', strip(pick('iPad Mini', mobile(768, 1024, 2))), null],
  ['webkit', 'Safari desktop 1440@2', desktop(1440, 900, 2), 'webkit-desktop'],
  ['chromium', 'Pixel 7 (412@2.625)', strip(pick('Pixel 7', mobile(412, 839, 2.625))), 'chromium-pixel7'],
  ['chromium', 'Android 393@2.75', mobile(393, 851, 2.75), null],
  ['chromium', 'Chrome desktop 1440', desktop(1440, 900), null],
  ['firefox', 'Firefox 390@3', ffMobile(390, 844, 3), 'firefox-390'],
  ['firefox', 'Firefox desktop 1440', desktop(1440, 900), null],
];

const wait = (page, ms) => page.waitForTimeout(ms);
const instantScroll = (page, top) => page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);

async function frameProfile(page) {
  // Толщина рамки текстового блока первого экрана с каждой стороны, в физических пикселях
  await page.evaluate(() => {
    const box = document.querySelector('section h1').parentElement;
    box.id = 'hero-text';
    window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' });
  });
  await wait(page, 300);
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
    // Скриншот может быть не в физических пикселях (так бывает в Firefox): масштаб берём по факту
    const d = img.width / innerWidth;
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
      shotScale: +d.toFixed(3),
      dpr: rect.d,
      left: scan(around(rect.l * d, (x) => [x, midY])),
      right: scan(around(rect.r * d, (x) => [x, midY])),
      bottom: rect.b < rect.h ? scan(around(rect.b * d, (y) => [midX, y])) : 'offscreen',
    };
  }, { b64: shot.toString('base64'), rect });
}

// Сведения о блоке .reveal: где стоит, видим ли и на каком шаге его анимация
const describeReveal = () => {
  window.__revealInfo = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const anim = el.getAnimations()[0];
    const timing = anim?.effect?.getComputedTiming?.();
    return {
      section: el.closest('section')?.id || (el.closest('footer') ? 'footer' : ''),
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
      top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight,
      y: Math.round(scrollY), maxY: document.documentElement.scrollHeight - innerHeight,
      opacity: +Number(cs.opacity).toFixed(2),
      progress: timing?.progress == null ? null : +timing.progress.toFixed(2),
      animations: el.getAnimations().length,
      timeline: cs.animationTimeline, range: cs.animationRange,
    };
  };
};

async function revealCheck(page, prefix) {
  await page.evaluate(describeReveal);
  const count = await page.evaluate(() => document.querySelectorAll('.reveal').length);

  // Проход 1: каждый блок программно в центр экрана, как при переходе по якорю
  const programmatic = [];
  for (let i = 0; i < count; i++) {
    await page.evaluate((n) => document.querySelectorAll('.reveal')[n].scrollIntoView({ block: 'center', behavior: 'instant' }), i);
    await wait(page, 150);
    const info = await page.evaluate((n) => window.__revealInfo(document.querySelectorAll('.reveal')[n]), i);
    if (info.opacity < 0.95) {
      await wait(page, 1000);
      info.opacityAfter1s = await page.evaluate((n) => +Number(getComputedStyle(document.querySelectorAll('.reveal')[n]).opacity).toFixed(2), i);
      await page.evaluate(() => window.scrollBy({ top: 1, behavior: 'instant' }));
      await wait(page, 200);
      info.opacityAfterNudge = await page.evaluate((n) => +Number(getComputedStyle(document.querySelectorAll('.reveal')[n]).opacity).toFixed(2), i);
      if (prefix && programmatic.length < 3) await page.screenshot({ path: `${SHOTS}${prefix}-hidden-${programmatic.length + 1}.jpg`, type: 'jpeg', quality: 60, scale: 'css' });
      programmatic.push(info);
    }
  }

  // Проход 2: сверху вниз мелкими шагами, как при прокрутке пальцем; блоки, целиком
  // оказавшиеся в окне, должны быть видны
  await instantScroll(page, 0);
  await wait(page, 300);
  const natural = new Map();
  for (let step = 0; step < 400; step++) {
    const done = await page.evaluate(() => {
      window.scrollBy({ top: Math.round(innerHeight / 6), behavior: 'instant' });
      return window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    });
    await wait(page, 80);
    const bad = await page.evaluate(() => [...document.querySelectorAll('.reveal')]
      .map((el, n) => [n, el.getBoundingClientRect()])
      .filter(([, r]) => r.top >= 0 && r.bottom <= innerHeight && r.height > 0)
      .map(([n]) => [n, window.__revealInfo(document.querySelectorAll('.reveal')[n])])
      .filter(([, info]) => info.opacity < 0.95));
    // Блок только что въехал: даём анимации догнать прокрутку, считаем со следующего шага
    for (const [n, info] of bad) natural.set(n, (natural.get(n) || []).concat(info));
    if (done) break;
  }
  const stuck = [...natural.values()].filter((list) => list.length >= 3).map((list) => list[list.length - 1]);
  return { count, programmatic, naturalStuck: stuck };
}

async function runCase([engine, name, options, prefix]) {
  const browser = await engines[engine].launch();
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const problems = [];
  let phase = 'load';
  page.on('pageerror', (e) => problems.push(`[${phase}] pageerror: ${e.message}`));
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) problems.push(`[${phase}] console.${m.type()}: ${m.text()}`); });
  page.on('requestfailed', (r) => problems.push(`[${phase}] requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`[${phase}] http ${r.status()}: ${r.url()}`); });

  const result = { engine, name, version: browser.version() };
  try {
    await page.goto(`${BASE}/${bust}`, { waitUntil: 'networkidle', timeout: 60000 });
    await wait(page, 800);
    phase = 'home';
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });

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
        frameCss: { shadow: cs.boxShadow.split(', rgb').pop(), border: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].join(' ') },
        fonts: [...document.fonts].filter((f) => f.status === 'loaded').length,
        jsonLd: ld,
      };
    }));

    result.frameInk = await frameProfile(page);
    if (prefix) {
      await instantScroll(page, 0);
      await wait(page, 300);
      await page.screenshot({ path: `${SHOTS}${prefix}-top.jpg`, type: 'jpeg', quality: 60, scale: 'css' });
    }

    result.reveal = await revealCheck(page, prefix);

    // Мобильное меню открывается и закрывается (Escape)
    const burger = await page.$('button[aria-label="Открыть меню"]');
    if (burger && await burger.isVisible()) {
      await instantScroll(page, 0);
      await burger.click();
      await wait(page, 700);
      const opened = await page.evaluate(() => document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded'));
      await page.keyboard.press('Escape');
      await wait(page, 700);
      const closed = await page.evaluate(() => document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded'));
      result.mobileMenu = `${opened}->${closed}`;
    }

    // Имя в шапке ведёт с /podcast на главную
    phase = 'podcast';
    try {
      await page.goto(`${BASE}/podcast${bust}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.click('header a[href="/"]', { timeout: 10000 });
      await page.waitForURL((u) => u.pathname === '/', { timeout: 10000 }).catch(() => {});
      result.logoFromPodcast = new URL(page.url()).pathname;
    } catch (e) {
      result.logoFromPodcast = `failed: ${e.message.split('\n')[0]}`;
    }

    phase = 'files';
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

for (const c of cases) console.log(`RESULT|${JSON.stringify(await runCase(c))}`);
