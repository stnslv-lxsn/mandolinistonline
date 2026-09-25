/**
 * Готовит фотографии первого экрана и картинку превью ссылки.
 *
 * Запуск: npm run images
 *
 * - hero-desktop / hero-mobile: из одного исходника assets/hero.jpg — студийное фото
 *   в костюме на тёмном фоне, его край ≈ #070708 (см. --color-backdrop). На десктопе
 *   фото стоит у левого края во всю высоту окна, поэтому кадр обрезан до колен;
 *   на телефоне фото закрывает экран целиком, кадр полный. AVIF и WebP, полный
 *   размер и уменьшенный для srcSet.
 * - src/app/opengraph-image.jpg: 1200x630 для превью в мессенджерах и соцсетях.
 *   Лицо по центру кадра: WhatsApp и часть клиентов режут превью в квадрат по центру.
 * - podcast-1…3: обложки выпусков подкаста для плееров. Пока посетитель не нажал
 *   «play», грузится только обложка, а не чужой плеер.
 *
 * Исходники лежат в assets/ — намеренно вне public/, иначе оригиналы уехали бы
 * на хостинг лишним весом. Заменили фото — положите новый assets/hero.jpg
 * и поправьте кадры ниже, если композиция другая.
 */
import { stat } from 'node:fs/promises';
import sharp from 'sharp';

// Исходник 1706x2560. extract — кадр, width/small — ширина полного и уменьшенного файла
const HERO_SOURCE = 'assets/hero.jpg';
const HERO = {
  'hero-desktop': { extract: { left: 0, top: 0, width: 1706, height: 1920 }, width: 1706, small: 977 },
  'hero-mobile': { extract: null, width: 1080, small: 828 },
};
const OG = {
  source: HERO_SOURCE,
  crop: { left: 0, top: 120, width: 1706, height: 896 },
  out: 'src/app/opengraph-image.jpg',
};

// Обложки подкаста: карточка занимает треть колонки на десктопе и всю ширину
// на телефоне, 960 px хватает даже при плотности 2
const POSTERS = ['podcast-1', 'podcast-2', 'podcast-3'];
const POSTER_WIDTH = 960;

const kb = async (file) => `${((await stat(file)).size / 1024).toFixed(1)} KB`;

for (const [name, { extract, width, small }] of Object.entries(HERO)) {
  const frame = () => (extract ? sharp(HERO_SOURCE).extract(extract) : sharp(HERO_SOURCE));
  const outputs = [
    [`public/${name}.avif`, (p) => p.resize({ width }).avif({ quality: 55, effort: 6 })],
    [`public/${name}.webp`, (p) => p.resize({ width }).webp({ quality: 75 })],
    [`public/${name}-${small}.avif`, (p) => p.resize({ width: small }).avif({ quality: 55, effort: 6 })],
  ];
  for (const [out, encode] of outputs) {
    await encode(frame()).toFile(out);
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

await sharp(OG.source)
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
