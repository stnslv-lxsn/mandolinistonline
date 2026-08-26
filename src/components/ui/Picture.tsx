import type { ImageSet } from '@/content/site';

interface PictureProps {
  image: ImageSet;
  /** Значение sizes: без него браузер считает картинку шириной во весь экран */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** true для изображения первого экрана: грузим сразу, с высоким приоритетом */
  priority?: boolean;
  /** Грузить сразу, но без повышенного приоритета — чтобы не отбирать
      канал у главного кадра */
  eager?: boolean;
}

/**
 * Отдаёт AVIF/WebP с JPEG-запасом. next/image здесь не нужен: при
 * output: 'export' он отдаёт файл как есть, а <picture> умеет форматы.
 */
export default function Picture({ image, sizes, className, imgClassName, priority = false, eager = false }: PictureProps) {
  const srcSet = (ext: string) =>
    image.widths.map((width) => `/${image.name}-${width}.${ext} ${width}w`).join(', ');

  const base = image.widths[0];

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/${image.name}-${base}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={image.alt}
        width={base}
        height={Math.round(base / image.ratio)}
        loading={priority || eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
