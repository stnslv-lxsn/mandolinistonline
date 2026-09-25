/**
 * Готовит фотографии первого экрана и картинку превью ссылки.
 *
 * Запуск: npm run images
 *
 * - hero-desktop / hero-mobile: из одного исходника assets/hero.jpg — студийный портрет
 *   по пояс в костюме на ровном белом фоне #FDFDFD. Фон вырезается в прозрачность
 *   (см. cutOut ниже), вокруг фигуры виден фон страницы. На десктопе фото стоит
 *   у левого края во всю высоту окна, на телефоне — сверху над текстом. AVIF и WebP
 *   с альфа-каналом, полный размер и уменьшенный для srcSet.
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
// Фон исходника — ровный #FDFDFD. Он вырезается в прозрачность: заливка от краёв кадра
// по пикселям, отличающимся от этого белого не больше чем на BG_TOLERANCE. Внутренние
// светлые места (белая футболка) с краем не связаны и остаются непрозрачными.
// Вокруг фигуры виден сам фон страницы, поэтому цвет совпадает в любом браузере,
// как бы тот ни декодировал AVIF/WebP. Край маски смягчён на полтора пикселя.
// Оставшиеся светлые пиксели кромки (волосы) подкрашены в цвет страницы, чтобы
// не давать белого ореола: белый #FDFDFD → --color-paper #F9F8F4
const SOURCE_WHITE = [253, 253, 253];
const PAGE_PAPER = [0xf9, 0xf8, 0xf4];
const BG_TOLERANCE = 6;

async function cutOut(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const n = width * height;
  const isBg = new Uint8Array(n);
  const near = (p) => {
    const i = p * 3;
    return Math.abs(data[i] - SOURCE_WHITE[0]) <= BG_TOLERANCE
      && Math.abs(data[i + 1] - SOURCE_WHITE[1]) <= BG_TOLERANCE
      && Math.abs(data[i + 2] - SOURCE_WHITE[2]) <= BG_TOLERANCE;
  };
  // Заливка от всех краёв кадра
  const stack = new Int32Array(n);
  let top = 0;
  const push = (p) => { if (!isBg[p] && near(p)) { isBg[p] = 1; stack[top++] = p; } };
  for (let x = 0; x < width; x++) { push(x); push((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { push(y * width); push(y * width + width - 1); }
  while (top) {
    const p = stack[--top];
    const x = p % width;
    if (x > 0) push(p - 1);
    if (x < width - 1) push(p + 1);
    if (p >= width) push(p - width);
    if (p < n - width) push(p + width);
  }
  const tint = PAGE_PAPER.map((c, i) => c / SOURCE_WHITE[i]);
  const rgba = Buffer.alloc(n * 4);
  const alpha = Buffer.alloc(n);
  for (let p = 0; p < n; p++) {
    for (let c = 0; c < 3; c++) rgba[p * 4 + c] = Math.min(255, Math.round(data[p * 3 + c] * tint[c]));
    alpha[p] = isBg[p] ? 0 : 255;
  }
  // extractChannel: иначе sharp отдаёт размытую маску тремя каналами и индексы съезжают
  const soft = await sharp(alpha, { raw: { width, height, channels: 1 } }).blur(1.5).extractChannel(0).raw().toBuffer();
  if (soft.length !== n) throw new Error(`маска: ${soft.length} байт вместо ${n}`);
  for (let p = 0; p < n; p++) rgba[p * 4 + 3] = soft[p];
  return sharp(await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer());
}

const heroCut = await (await cutOut(HERO_SOURCE)).png().toBuffer();
const hero = () => sharp(heroCut);
const HERO = {
  'hero-desktop': { extract: null, width: 1280, small: 800 },
  'hero-mobile': { extract: null, width: 1080, small: 828 },
};
const OG = {
  crop: { left: 0, top: 40, width: 1706, height: 896 },
  out: 'src/app/opengraph-image.jpg',
};

// Обложки подкаста: карточка занимает треть колонки на десктопе и всю ширину
// на телефоне, 960 px хватает даже при плотности 2
const POSTERS = ['podcast-1', 'podcast-2', 'podcast-3'];
const POSTER_WIDTH = 960;

const kb = async (file) => `${((await stat(file)).size / 1024).toFixed(1)} KB`;

for (const [name, { extract, width, small }] of Object.entries(HERO)) {
  const frame = () => (extract ? hero().extract(extract) : hero());
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

await hero()
  .flatten({ background: { r: PAGE_PAPER[0], g: PAGE_PAPER[1], b: PAGE_PAPER[2] } })
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
