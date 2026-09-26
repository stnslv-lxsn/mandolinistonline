import type React from 'react';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  // Первый экран — карточка по центру: портрет слева, текст справа, тонкая рамка
  // по контуру. На телефоне портрет сверху во всю ширину, текст под ним
  return (
    <section className="flex min-h-svh items-center justify-center px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-16">
      <div className="grid w-full max-w-[1040px] grid-cols-1 border border-rule md:h-[min(750px,calc(100svh-11rem))] md:min-h-[520px] md:grid-cols-[45%_1fr]">

        {/* Портрет. Кадр 1331x2000; в карточке его ширина — 45% от 1040px */}
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full">
          <picture>
            <source media="(max-width: 767px)" type="image/avif" srcSet="/hero-mobile-828.avif 828w, /hero-mobile.avif 1080w" sizes="100vw" />
            <source media="(max-width: 767px)" type="image/webp" srcSet="/hero-mobile.webp" />
            <source type="image/avif" srcSet="/hero-desktop-600.avif 600w, /hero-desktop.avif 940w" sizes="(min-width: 1200px) 468px, 40vw" />
            <img
              src="/hero-desktop.webp"
              alt="Юлия Радионова"
              fetchPriority="high"
              decoding="async"
              className="hero-settle absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            />
          </picture>
        </div>

        {/* Текст */}
        <div className="flex flex-col justify-center gap-5 px-6 py-10 md:px-12 md:py-12">
          <p className="hero-rise font-serif italic text-base md:text-lg text-muted" style={{ '--i': 0 } as React.CSSProperties}>
            {formatTypography('Бизнес-консультант, исследователь')}
          </p>
          <h1 className="hero-rise font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink" style={{ '--i': 1 } as React.CSSProperties}>
            {formatTypography('Юлия Радионова')}
          </h1>
          <p className="hero-rise font-sans text-sm md:text-base text-muted leading-relaxed max-w-md text-balance" style={{ '--i': 2 } as React.CSSProperties}>
            {formatTypography('Работаю с собственниками и руководителями в ситуациях, где нет очевидно правильного решения и цена ошибки высока.')}
          </p>
          <a
            href="#contact"
            style={{ '--i': 3 } as React.CSSProperties}
            className="hero-rise mt-1 w-fit border-b border-ink/40 pb-1 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
          >
            {formatTypography('Обсудить задачу')}
          </a>
        </div>

      </div>
    </section>
  );
}
