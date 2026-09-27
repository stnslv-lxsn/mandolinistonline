// Сравнение способов нарисовать тонкую рамку вокруг текста первого экрана
// в Chromium, WebKit и Firefox: вариант подставляется стилем поверх живого сайта,
// толщина каждой стороны меряется по скриншоту в физических пикселях
import { chromium, firefox, webkit } from 'playwright';

const BASE = (process.env.BASE_URL || 'https://radionova.pro').replace(/\/$/, '');
const engines = { chromium, firefox, webkit };
const color = '#1B3A5C';
const reset = `#hero-text { box-shadow: none !important; border: 0 !important; outline: 0 !important; background-image: none !important; }`;

const variants = {
  current: '',
  border05: `${reset} #hero-text { border: 0.5px solid ${color} !important; }`,
  scaled: `${reset} #hero-text { position: relative; } #hero-text::after { content: ''; position: absolute; left: 0; top: 0; width: 200%; height: 200%; border: 1px solid ${color}; transform: scale(0.5); transform-origin: 0 0; pointer-events: none; box-sizing: border-box; }`,
  gradients: `${reset} #hero-text { background-image: linear-gradient(${color}, ${color}), linear-gradient(${color}, ${color}), linear-gradient(${color}, ${color}), linear-gradient(${color}, ${color}) !important; background-repeat: no-repeat; background-size: 100% 0.5px, 100% 0.5px, 0.5px 100%, 0.5px 100%; background-position: top, bottom, left, right; }`,
  shadow1dp: `${reset} #hero-text { box-shadow: inset 0 0 0 calc(1px / var(--dpr)) ${color} !important; }`,
  border1: `${reset} #hero-text { border: 1px solid ${color} !important; }`,
};

const phones = [
  ['webkit', '390@3', 390, 844, 3],
  ['webkit', '375@2', 375, 667, 2],
  ['chromium', '412@2.625', 412, 839, 2.625],
  ['chromium', '393@2.75', 393, 851, 2.75],
  ['firefox', '390@3', 390, 844, 3],
  ['firefox', '412@2.625', 412, 839, 2.625],
];

async function measure(page) {
  const rect = await page.evaluate(() => {
    const r = document.getElementById('hero-text').getBoundingClientRect();
    return { l: r.left, r: r.right, t: r.top, b: r.bottom, h: innerHeight };
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
    return `L ${scan(around(rect.l * d, (x) => [x, midY]))} R ${scan(around(rect.r * d, (x) => [x, midY]))} B ${rect.b < rect.h ? scan(around(rect.b * d, (y) => [midX, y])) : 'off'}`;
  }, { b64: shot.toString('base64'), rect });
}

for (const [engine, name, width, height, scale] of phones) {
  const browser = await engines[engine].launch();
  const options = { viewport: { width, height }, deviceScaleFactor: scale, hasTouch: true, ...(engine === 'firefox' ? {} : { isMobile: true }) };
  for (const [variant, css] of Object.entries(variants)) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(`${BASE}/?frame=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.style.setProperty('--dpr', String(devicePixelRatio));
      const box = document.querySelector('section h1').parentElement;
      box.id = 'hero-text';
      window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' });
    });
    if (css) await page.addStyleTag({ content: css });
    await page.waitForTimeout(300);
    console.log(`FRAME|${engine} ${name}|${variant}|${await measure(page)}`);
    await context.close();
  }
  await browser.close();
}
