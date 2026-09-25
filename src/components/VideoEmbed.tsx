'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  /** Заголовок уже пропущен через типограф на сервере: в клиентские компоненты его не тянем */
  title: string;
  /** Имя обложки без расширения, например /podcast-1 */
  poster: string;
  vkOid: string;
  vkId: string;
}

/**
 * Плеер выпуска подкаста. До нажатия на странице лежит только обложка:
 * плеер VK — это около мегабайта чужих скриптов, и грузить их на каждое
 * открытие сайта ради трёх роликов незачем.
 */
export default function VideoEmbed({ title, poster, vkOid, vkId }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden bg-shade">
      {playing ? (
        <iframe
          src={`https://vkvideo.ru/video_ext.php?oid=${vkOid}&id=${vkId}&hd=2&autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          /* Видео ровно 16:9, как и бокс, но при масштабировании страницы размеры
             получаются дробными, плеер округляет их по-своему и дорисовывает чёрные
             полосы по краям. Делаем кадр на 8px больше бокса и обрезаем: полосы
             уходят за край, видео теряет по 4px с каждой стороны — незаметно */
          className="absolute left-1/2 top-1/2 h-[calc(100%+8px)] w-[calc(100%+8px)] -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Смотреть выпуск «${title}»`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <picture>
            <source type="image/avif" srcSet={`${poster}.avif`} />
            <img
              src={`${poster}.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              width={960}
              height={540}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>

          {/* Затемнение, чтобы белый треугольник читался на любой обложке */}
          <span aria-hidden="true" className="absolute inset-0 bg-shade/25 transition-colors duration-300 group-hover:bg-shade/10" />

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 transition-colors duration-300 group-hover:bg-white/15"
          >
            <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
          </span>
        </button>
      )}
    </div>
  );
}
