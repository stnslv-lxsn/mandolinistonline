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
];

const FORMATS = [
  ['avif', (p) => p.avif({ quality: 52 })],
  ['webp', (p) => p.webp({ quality: 72 })],
  ['jpg', (p) => p.jpeg({ quality: 76, mozjpeg: true })],
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

    for (const [ext, apply] of FORMATS) {
      const file = path.join(OUT_DIR, `${job.name}-${width}.${ext}`);
      const pipeline = sharp(job.source);
      if (job.crop) pipeline.extract(job.crop);
      await apply(
        pipeline.resize(width, height, { fit: 'cover', position: job.position })
      ).toFile(file);
      const { size } = await stat(file);
      console.log(`  ${job.name}-${width}.${ext.padEnd(4)} ${width}x${height}  ${(size / 1024).toFixed(1)} KB`);
    }
  }
}
