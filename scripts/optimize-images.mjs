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
 * - podcast-1…3: обложки выпусков подкаста для плееров. Пока посетитель не нажал
 *   «play», грузится только обложка, а не чужой плеер.
 *
 * Исходники обложек лежат в assets/ — намеренно вне public/, иначе оригиналы
 * уехали бы на хостинг лишним весом. У фото первого экрана оригиналов нет,
 * исходник — сами WebP из public/: заменили фото — положите новые WebP
 * с теми же именами и перезапустите скрипт.
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

// Обложки подкаста: карточка занимает треть колонки на десктопе и всю ширину
// на телефоне, 960 px хватает даже при плотности 2
const POSTERS = ['podcast-1', 'podcast-2', 'podcast-3'];
const POSTER_WIDTH = 960;

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

for (const name of POSTERS) {
  const source = `assets/${name}.jpg`;
  for (const [ext, encode] of [['avif', (p) => p.avif({ quality: 55, effort: 6 })], ['webp', (p) => p.webp({ quality: 72 })]]) {
    const out = `public/${name}.${ext}`;
    await encode(sharp(source).resize({ width: POSTER_WIDTH })).toFile(out);
    console.log(`${out.padEnd(32)} ${await kb(out)}  (исходник ${await kb(source)})`);
  }
}

await sharp(OG.source)
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
