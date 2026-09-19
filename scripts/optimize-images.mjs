/**
 * Готовит фотографии первого экрана и картинку превью ссылки.
 *
 * Запуск: npm run images
 *
 * - hero-desktop / hero-mobile: рядом с WebP кладётся AVIF, который вдвое легче,
 *   в полном размере и в уменьшенном: 1100 px — ширина кадра на десктопе,
 *   828 px — телефон с плотностью 2. <picture> в Hero выбирает размер через
 *   srcSet/sizes и отдаёт AVIF первым, WebP остаётся для старых браузеров.
 * - src/app/opengraph-image.jpg: 1200x630 для превью в мессенджерах и соцсетях.
 *   Кадр сдвинут так, чтобы лицо было ближе к центру: WhatsApp и часть клиентов
 *   режут превью в квадрат по центру.
 *
 * Оригиналов нет, исходник — сами WebP из public/. Заменили фото — положите
 * новые WebP с теми же именами и перезапустите скрипт.
 */
import { stat } from 'node:fs/promises';
import sharp from 'sharp';

// Уменьшенная ширина для srcSet; полный размер собирается всегда
const HERO = { 'hero-desktop': 1100, 'hero-mobile': 828 };
const OG = {
  source: 'public/hero-desktop.webp',
  crop: { left: 0, top: 50, width: 1100, height: 578 },
  out: 'src/app/opengraph-image.jpg',
};

const kb = async (file) => `${((await stat(file)).size / 1024).toFixed(1)} KB`;

for (const [name, smallWidth] of Object.entries(HERO)) {
  const source = `public/${name}.webp`;
  const full = `public/${name}.avif`;
  const small = `public/${name}-${smallWidth}.avif`;
  await sharp(source).avif({ quality: 55, effort: 6 }).toFile(full);
  await sharp(source).resize({ width: smallWidth }).avif({ quality: 55, effort: 6 }).toFile(small);
  console.log(`${full.padEnd(32)} ${await kb(full)}  (WebP ${await kb(source)})`);
  console.log(`${small.padEnd(32)} ${await kb(small)}`);
}

await sharp(OG.source)
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
