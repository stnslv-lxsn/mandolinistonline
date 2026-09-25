/**
 * Готовит фотографии первого экрана и картинку превью ссылки.
 *
 * Запуск: npm run images
 *
 * - hero-desktop / hero-mobile: портрет из assets/hero.jpg (1331x2000). На десктопе
 *   он стоит в левой половине карточки первого экрана (около 470px в ширину, для
 *   плотности 2 — 940px), на телефоне во всю ширину над текстом. AVIF и WebP,
 *   полный размер и уменьшенный для srcSet.
 * - src/app/opengraph-image.jpg: 1200x630 для превью в мессенджерах и соцсетях.
 *   Лицо по центру кадра: WhatsApp и часть клиентов режут превью в квадрат по центру.
 * - podcast-1…3: обложки выпусков подкаста для плееров. Пока посетитель не нажал
 *   «play», грузится только обложка, а не чужой плеер.
 *
 * Исходники лежат в assets/ — намеренно вне public/, иначе оригиналы уехали бы
 * на хостинг лишним весом. Заменили фото — положите новый assets/hero.jpg
 * и поправьте кадр превью (OG.crop), если композиция другая.
 */
import { stat } from 'node:fs/promises';
import sharp from 'sharp';

const HERO_SOURCE = 'assets/hero.jpg';
const hero = () => sharp(HERO_SOURCE);
// width/small — ширина полного и уменьшенного файла
const HERO = {
  'hero-desktop': { width: 940, small: 600 },
  'hero-mobile': { width: 1080, small: 828 },
};
// Лицо по центру кадра 1200x630
const OG = {
  crop: { left: 0, top: 330, width: 1331, height: 699 },
  out: 'src/app/opengraph-image.jpg',
};

// Обложки подкаста: карточка занимает треть колонки на десктопе и всю ширину
// на телефоне, 960 px хватает даже при плотности 2
const POSTERS = ['podcast-1', 'podcast-2', 'podcast-3'];
const POSTER_WIDTH = 960;

const kb = async (file) => `${((await stat(file)).size / 1024).toFixed(1)} KB`;

for (const [name, { width, small }] of Object.entries(HERO)) {
  const outputs = [
    [`public/${name}.avif`, (p) => p.resize({ width }).avif({ quality: 55, effort: 6 })],
    [`public/${name}.webp`, (p) => p.resize({ width }).webp({ quality: 75 })],
    [`public/${name}-${small}.avif`, (p) => p.resize({ width: small }).avif({ quality: 55, effort: 6 })],
  ];
  for (const [out, encode] of outputs) {
    await encode(hero()).toFile(out);
    console.log(`${out.padEnd(32)} ${await kb(out)}`);
  }
}

for (const name of POSTERS) {
  const source = `assets/${name}.jpg`;
  for (const [ext, encode] of [['avif', (p) => p.avif({ quality: 55, effort: 6 })], ['webp', (p) => p.webp({ quality: 72 })]]) {
    const out = `public/${name}.${ext}`;
    await encode(sharp(source).resize({ width: POSTER_WIDTH })).toFile(out);
    console.log(`${out.padEnd(32)} ${await kb(out)}  (исходник ${await kb(source)})`);
  }
}

await hero()
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
