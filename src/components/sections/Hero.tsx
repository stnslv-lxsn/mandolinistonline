import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    // Первый экран во всё окно. Фон — цвет края студийного фона фотографии,
    // поэтому фото стыкуется с ним без шва при любых пропорциях окна
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden bg-backdrop">

      {/* Телефон и планшет стоя: фото закрывает экран целиком, текст внизу поверх.
          С lg: фото у левого края во всю высоту, текст справа на тёмном фоне.
          Правый край фото растворяется в фоне, чтобы стык не читался даже
          при сдвиге цвета после сжатия */}
      <picture>
        <source media="(max-width: 1023px)" type="image/avif" srcSet="/hero-mobile-828.avif 828w, /hero-mobile.avif 1080w" sizes="100vw" />
        <source media="(max-width: 1023px)" type="image/webp" srcSet="/hero-mobile.webp" />
        {/* Кадр 1706x1920 во всю высоту окна: ширина ≈ 0,89 высоты */}
        <source type="image/avif" srcSet="/hero-desktop-977.avif 977w, /hero-desktop.avif 1706w" sizes="89vh" />
        <img
          src="/hero-desktop.webp"
          alt="Юлия Радионова"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%] lg:right-auto lg:w-auto lg:max-w-none lg:[mask-image:linear-gradient(to_right,black_65%,transparent)]"
        />
      </picture>

      {/* Затемнение снизу под текстом — только на телефоне, где текст лежит на фото */}
      <div className="lg:hidden absolute inset-x-0 bottom-0 h-3/5 pointer-events-none bg-gradient-to-t from-backdrop via-backdrop/70 to-transparent" />

      {/* Короткий переход в цвет страницы у нижнего края, чтобы тёмный экран
          не обрывался о светлый раздел под ним */}
      <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 pointer-events-none bg-gradient-to-b from-transparent to-paper" />

      {/* Контент */}
      <div className="relative z-10 h-full flex items-end lg:items-center lg:justify-end px-6 pb-24 lg:px-12 lg:pb-0 xl:px-24">
        <div className="w-full lg:w-[44%] max-w-xl flex flex-col gap-6 text-white">
          <p className="font-serif italic text-sm md:text-xl text-white/70">
            {formatTypography("Бизнес-консультант, исследователь")}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] md:leading-[0.95] tracking-tight">
            {formatTypography("Юлия Радионова")}
          </h1>
          <p className="font-sans text-sm md:text-base text-white/75 max-w-xl leading-relaxed text-balance">
            {formatTypography("Работаю с собственниками и руководителями, которым важно разобраться в сложной ситуации и принять обоснованное решение.")}
          </p>
          <a
            href="#contact"
            className="w-fit uppercase tracking-[0.18em] text-xs text-white border-b border-white/40 pb-1 hover:border-white transition-colors lg:border-b-0 lg:pb-3.5 lg:pt-3.5 lg:px-7 lg:bg-white lg:text-shade lg:font-medium lg:tracking-[0.2em] lg:hover:bg-white/90 lg:inline-flex"
          >
            {formatTypography("Обсудить задачу")}
          </a>
        </div>
      </div>

    </section>
  );
}
