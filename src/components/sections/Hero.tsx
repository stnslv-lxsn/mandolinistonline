import Balancer from 'react-wrap-balancer';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    <section className="relative min-h-svh w-full flex md:items-center md:justify-center md:bg-paper md:px-12 md:py-28">

      {/* На десктопе фото — центрированный блок с полями, на мобиле — на весь экран */}
      <div className="relative w-full md:w-auto md:h-[calc(100svh-14rem)] md:max-h-[793px] md:max-w-[1100px] md:aspect-[1539/1109] flex items-end md:items-center md:overflow-hidden md:shadow-2xl">

        {/* Фото */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero-mobile.webp" />
          <img
            src="/hero-desktop.webp"
            alt="Юлия Радионова"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[50%_20%] md:object-center"
          />
        </picture>

        {/* Затемнение для читаемости текста */}
        <div className="md:hidden absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
        <div className="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-l from-black/85 via-black/40 to-black/0" />

        {/* Контент */}
        <div className="relative z-10 w-full px-6 md:px-8 pt-32 pb-24 md:py-0 flex md:justify-end">
          <div className="w-full md:w-[44%] flex flex-col gap-5 md:gap-6 text-white">
            <p className="font-serif italic text-base md:text-xl text-white/75">
              Бизнес-консультант, исследователь
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight">
              Юлия Радионова
            </h1>
            <p className="font-sans text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
              <Balancer>
                {formatTypography("Помогаю компаниям проходить через кризисы управления и масштабирования. Соединяю 20-летний опыт в бизнесе с глубоким пониманием психологии систем.")}
              </Balancer>
            </p>
            <a href="#contact" className="inline-flex w-fit bg-white text-forest px-7 py-3.5 font-medium text-xs hover:bg-white/90 transition-colors uppercase tracking-[0.2em]">
              Обсудить задачу
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
