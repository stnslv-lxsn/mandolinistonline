/**
 * Готовит портрет для круга в hero: квадратная обрезка по верхнему краю
 * плюс AVIF/WebP/JPEG в двух размерах (1x и 2x).
 *
 * Запуск: npm run images
 * Исходник лежит в assets/ и намеренно вне public/, иначе оригинал
 * попал бы в сборку и уехал на хостинг лишним весом.
 */
import { stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'assets/photo.jpg';
const OUT_DIR = 'public';
const SIZES = [448, 896];

if (!existsSync(SOURCE)) {
  console.error(`Нет исходника: ${SOURCE}`);
  process.exit(1);
}

const meta = await sharp(SOURCE).metadata();
const shortestSide = Math.min(meta.width, meta.height);
console.log(`Исходник: ${meta.width}x${meta.height}, ${((await stat(SOURCE)).size / 1024).toFixed(0)} KB\n`);

for (const size of SIZES) {
  // Апскейл бессмысленен: больше короткой стороны оригинала не рисуем
  const target = Math.min(size, shortestSide);
  const base = sharp(SOURCE).resize(target, target, { fit: 'cover', position: 'top' });

  const variants = [
    ['avif', base.clone().avif({ quality: 55 })],
    ['webp', base.clone().webp({ quality: 72 })],
    ['jpg', base.clone().jpeg({ quality: 76, mozjpeg: true })],
  ];

  // Имя по фактическому размеру: srcset обязан соответствовать реальной ширине
  for (const [ext, pipeline] of variants) {
    const file = path.join(OUT_DIR, `photo-${target}.${ext}`);
    await pipeline.toFile(file);
    const { size: bytes } = await stat(file);
    console.log(`photo-${target}.${ext.padEnd(4)} ${target}x${target}  ${(bytes / 1024).toFixed(1)} KB`);
  }
}
