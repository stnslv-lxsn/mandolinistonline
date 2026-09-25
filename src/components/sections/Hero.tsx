import type React from 'react';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    <>
      {/* Первый экран во всё окно. Фон — цвет края студийного фона фотографии,
          поэтому фото стыкуется с ним без шва при любых пропорциях окна */}
      <section className="relative h-svh min-h-[560px] w-full overflow-hidden bg-backdrop">

        {/* Телефон и планшет стоя: фото закрывает экран целиком, текст внизу поверх.
            С lg: фото у левого края во всю высоту, текст справа на белом фоне.
            Край фото того же цвета, что и фон секции, поэтому стыка не видно */}
        <picture>
          <source media="(max-width: 1023px)" type="image/avif" srcSet="/hero-mobile-828.avif 828w, /hero-mobile.avif 1080w" sizes="100vw" />
          <source media="(max-width: 1023px)" type="image/webp" srcSet="/hero-mobile.webp" />
          {/* Кадр 1706x2560 во всю высоту окна: ширина ≈ 0,67 высоты */}
          <source type="image/avif" srcSet="/hero-desktop-800.avif 800w, /hero-desktop.avif 1280w" sizes="67vh" />
          <img
            src="/hero-desktop.webp"
            alt="Юлия Радионова"
            fetchPriority="high"
            decoding="async"
            className="hero-settle absolute inset-0 h-full w-full object-cover object-[50%_0%] lg:right-auto lg:w-auto lg:max-w-none"
          />
        </picture>

        {/* Низ кадра уходит в фон, чтобы фото не обрывалось о переход ниже */}
        <div className="absolute inset-x-0 bottom-0 h-1/6 pointer-events-none bg-gradient-to-b from-transparent to-backdrop" />

        {/* Светлая подложка снизу под текстом — только на телефоне, где текст лежит на фото */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 h-3/5 pointer-events-none bg-gradient-to-t from-backdrop via-backdrop/90 to-transparent" />

        {/* Контент */}
        <div className="relative z-10 h-full flex items-end lg:items-center lg:justify-end px-6 pb-14 lg:px-12 lg:pb-0 xl:px-24">
          <div className="w-full lg:w-[44%] max-w-xl flex flex-col gap-6 text-ink">
            <p className="hero-rise font-serif italic text-sm md:text-xl text-muted" style={{ '--i': 0 } as React.CSSProperties}>
              {formatTypography("Бизнес-консультант, исследователь")}
            </p>
            <h1 className="hero-rise font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] md:leading-[0.95] tracking-tight" style={{ '--i': 1 } as React.CSSProperties}>
              {formatTypography("Юлия Радионова")}
            </h1>
            <p className="hero-rise font-sans text-sm md:text-base text-muted max-w-xl leading-relaxed text-balance" style={{ '--i': 2 } as React.CSSProperties}>
              {formatTypography("Работаю с собственниками и руководителями, которым важно разобраться в сложной ситуации и принять обоснованное решение.")}
            </p>
            <a
              href="#contact"
              style={{ '--i': 3 } as React.CSSProperties}
              className="hero-rise w-fit uppercase tracking-[0.18em] text-xs text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors lg:border-b-0 lg:pb-3.5 lg:pt-3.5 lg:px-7 lg:bg-ink lg:text-white lg:font-medium lg:tracking-[0.2em] lg:hover:bg-forest lg:inline-flex"
            >
              {formatTypography("Обсудить задачу")}
            </a>
          </div>
        </div>

        {/* Подсказка прокрутить вниз — только на десктопе: на телефоне низ экрана занят текстом.
            Плавность перехода даёт scroll-smooth на <html> */}
        <a
          href="#profile"
          aria-label="Листать вниз"
          style={{ '--i': 5 } as React.CSSProperties}
          className="hero-rise hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-ink transition-colors"
        >
          Листать
          <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-ink/15">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink/60" />
          </span>
        </a>

      </section>

      {/* Переход под первым экраном из белого фона фото в тёплый цвет страницы,
          с плавным разгоном (см. .hero-fade) */}
      <div aria-hidden="true" className="hero-fade h-24 lg:h-32" />
    </>
  );
}
