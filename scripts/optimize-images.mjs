/**
 * Готовит все изображения сайта: кадрирует под нужную пропорцию и пишет
 * AVIF/WebP/JPEG в нескольких ширинах.
 *
 * Запуск: npm run images
 * Исходники лежат в assets/ и намеренно вне public/, иначе оригиналы
 * попали бы в сборку и уехали на хостинг лишним весом.
 */
import { stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = 'public';

/** aspect — ширина/высота итогового кадра; widths — ширины для srcset */
const JOBS = [
  {
    source: 'assets/portrait-editorial.jpg',
    name: 'portrait-square',
    aspect: 1,
    position: 'top',
    widths: [448, 640, 896],
  },
  {
    source: 'assets/portrait-window.jpg',
    name: 'portrait-window',
    aspect: 2 / 3,
    position: 'center',
    widths: [640, 1000, 1400],
  },
  {
    source: 'assets/portrait-studio.jpg',
    name: 'portrait-studio',
    aspect: 3 / 4,
    position: 'top',
    widths: [520, 800, 1100],
  },
  {
    source: 'assets/portrait-wide.jpg',
    name: 'portrait-wide',
    aspect: 16 / 9,
    position: 'center',
    widths: [900, 1440],
  },
  {
    source: 'assets/portrait-warm.jpg',
    name: 'portrait-warm',
    aspect: 4 / 5,
    position: 'top',
    widths: [480, 760],
  },
  // Кадры сцены для варианта IV: пустой кабинет и тот же кабинет с человеком.
  // Кроп задан вручную, чтобы на первом кадре точно никого не было,
  // а на втором фигура стояла по центру.
  {
    source: 'assets/scene-empty.jpg',
    name: 'scene-empty',
    crop: { left: 150, top: 0, width: 900, height: 1200 },
    aspect: 3 / 4,
    position: 'center',
    widths: [640, 900],
  },
  {
    source: 'assets/scene-her.jpg',
    name: 'scene-her',
    crop: { left: 420, top: 120, width: 900, height: 1200 },
    aspect: 3 / 4,
    position: 'center',
    widths: [640, 900],
  },
  // Полноэкранная сцена варианта IV: кабинет уходит в расфокус и работает
  // фоном, а крупный план ложится поверх — она в этом же кабинете, но ближе.
  {
    source: 'assets/scene-empty.jpg',
    name: 'office-blur',
    crop: { left: 0, top: 0, width: 1331, height: 1000 },
    aspect: 16 / 10,
    position: 'center',
    widths: [900, 1300],
    blur: 9,
    brightness: 0.5,
  },
  {
    source: 'assets/scene-close.jpg',
    name: 'scene-close',
    aspect: 4 / 5,
    position: 'top',
    widths: [560, 820],
    grayscale: true,
  },
  // Передний план сцены: сильно размытая поверхность у нижнего края.
  // За ней прячется место, где вырезанная фигура обрывается кадром,
  // и появляется ощущение, что человек сидит за столом, а не висит в воздухе.
  {
    source: 'assets/scene-her.jpg',
    name: 'foreground',
    crop: { left: 0, top: 1620, width: 1331, height: 380 },
    aspect: 1331 / 380,
    position: 'center',
    widths: [900, 1300],
    blur: 14,
    brightness: 0.62,
    grayscale: true,
  },
  // Фигура без фона (её готовит npm run cutout). Пропорции исходника
  // не трогаем — обрезать вырезанного человека нечем и незачем.
  {
    source: 'assets/cutout.png',
    name: 'figure',
    aspect: 1331 / 2000,
    position: 'center',
    widths: [560, 820, 1100],
    grayscale: true,
    alpha: true,
  },
];

const FORMATS = [
  ['avif', (p) => p.avif({ quality: 52 })],
  ['webp', (p) => p.webp({ quality: 72 })],
  ['jpg', (p) => p.jpeg({ quality: 76, mozjpeg: true })],
];

// Для картинок с прозрачностью JPEG не годится — запасной формат PNG
const ALPHA_FORMATS = [
  ['avif', (p) => p.avif({ quality: 55 })],
  ['webp', (p) => p.webp({ quality: 78, alphaQuality: 90 })],
  ['png', (p) => p.png({ compressionLevel: 9, palette: true })],
];

for (const job of JOBS) {
  if (!existsSync(job.source)) {
    console.error(`Нет исходника: ${job.source}`);
    process.exitCode = 1;
    continue;
  }

  const meta = await sharp(job.source).metadata();
  const sourceWidth = job.crop ? job.crop.width : meta.width;
  const sourceHeight = job.crop ? job.crop.height : meta.height;
  console.log(`\n${job.name}  <- ${path.basename(job.source)} (${meta.width}x${meta.height})`);

  for (const width of job.widths) {
    const height = Math.round(width / job.aspect);

    // Апскейл бессмысленен: кадр не может быть больше исходника
    if (width > sourceWidth || height > sourceHeight) {
      console.log(`  ${width}px пропущен — исходник меньше`);
      continue;
    }

    for (const [ext, apply] of (job.alpha ? ALPHA_FORMATS : FORMATS)) {
      const file = path.join(OUT_DIR, `${job.name}-${width}.${ext}`);
      const pipeline = sharp(job.source);
      if (job.crop) pipeline.extract(job.crop);
      pipeline.resize(width, height, {
        fit: job.alpha ? 'inside' : 'cover',
        position: job.position,
      });
      // Расфокус и затемнение делаем на сборке: в рантайме фильтры дороги,
      // а размытая картинка вдобавок жмётся в разы лучше резкой
      if (job.blur) pipeline.blur(job.blur);
      if (job.brightness) pipeline.modulate({ brightness: job.brightness });
      if (job.grayscale) pipeline.grayscale();
      await apply(pipeline).toFile(file);
      const { size } = await stat(file);
      console.log(`  ${job.name}-${width}.${ext.padEnd(4)} ${width}x${height}  ${(size / 1024).toFixed(1)} KB`);
    }
  }
}
