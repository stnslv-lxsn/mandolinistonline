/**
 * Готовит фотографии первого экрана и картинку превью ссылки.
 *
 * Запуск: npm run images
 *
 * - hero-desktop / hero-mobile: из одного исходника assets/hero.jpg — студийный портрет
 *   по пояс в костюме на ровном белом фоне #FDFDFD. Кадр домножается по каналам так,
 *   что этот белый становится ровно цветом страницы (--color-paper, #F9F8F4): первый
 *   экран залит тем же цветом, что и вся страница, и стыка нет. Сдвиг 1,5–3,5 %,
 *   на лице и костюме он незаметен.
 *   На десктопе фото стоит у левого края во всю высоту окна, на телефоне закрывает
 *   экран целиком. AVIF и WebP, полный размер и уменьшенный для srcSet.
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
// Белый фона исходника → цвет страницы. Поменяли --color-paper или фото — пересчитайте
const SOURCE_WHITE = [253, 253, 253];
const PAGE_PAPER = [0xf9, 0xf8, 0xf4];
const TINT = PAGE_PAPER.map((c, i) => c / SOURCE_WHITE[i]);
const hero = () => sharp(HERO_SOURCE).linear(TINT, [0, 0, 0]);
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
  .extract(OG.crop)
  .resize(1200, 630)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OG.out);
console.log(`${OG.out.padEnd(32)} ${await kb(OG.out)}`);
