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

          {/* Лёгкое затемнение при наведении — обложка откликается на курсор */}
          <span aria-hidden="true" className="absolute inset-0 bg-shade/0 transition-colors duration-300 group-hover:bg-shade/10" />

          {/* Кнопка в левом нижнем углу на своей тёмной подложке: по центру она закрывала
              заголовки, напечатанные на обложках, и без затемнения всей картинки читается
              на любом фоне */}
          <span
            aria-hidden="true"
            className="absolute left-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full bg-shade/60 backdrop-blur-sm transition-colors duration-300 group-hover:bg-shade/80"
          >
            <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
          </span>
        </button>
      )}
    </div>
  );
}
