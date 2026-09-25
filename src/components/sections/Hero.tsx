import type React from 'react';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  // Первый экран во всё окно. Фон — цвет края студийного фона фотографии,
  // поэтому фото стыкуется с ним без шва при любых пропорциях окна
  return (
    <section className="relative flex flex-col h-svh min-h-[560px] w-full overflow-clip bg-backdrop">

      {/* Телефон и планшет стоя: фото сверху на всю оставшуюся высоту, текст под ним.
          С lg: фото у левого края во всю высоту, текст справа на белом фоне.
          Край фото того же цвета, что и фон секции, поэтому стыка не видно.
          Градиентов нет намеренно: ни поверх фото, ни на переходах */}
      <div className="relative flex-1 min-h-0 lg:absolute lg:inset-0">
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
            className="hero-settle absolute inset-0 h-full w-full object-cover object-[50%_0%] lg:left-[6vw] lg:right-auto lg:w-auto lg:max-w-none"
          />
        </picture>
      </div>

      {/* Контент */}
      <div className="relative z-10 px-6 pt-8 pb-12 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-end lg:pl-12 lg:pr-8 lg:py-0 xl:pr-12">
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

      {/* Уровень «Листать» (на телефоне подсказки нет, уровень тот же): когда он уходит
          под шапку, в шапке появляется имя — см. logoAfterHero в Layout */}
      <div data-logo-trigger aria-hidden="true" className="absolute inset-x-0 bottom-8 h-px pointer-events-none" />

      {/* Подсказка прокрутить вниз — только на десктопе: на телефоне низ экрана занят текстом.
          По центру экрана; на 1024–1279px центр попадает на фото, там она под колонкой текста.
          Плавность перехода даёт scroll-smooth на <html> */}
      <a
        href="#profile"
        aria-label="Листать вниз"
        style={{ '--i': 5 } as React.CSSProperties}
        className="hero-rise hidden lg:flex absolute bottom-8 left-3/4 xl:left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-ink transition-colors"
      >
        Листать
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-ink/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink/60" />
        </span>
      </a>

    </section>
  );
}
