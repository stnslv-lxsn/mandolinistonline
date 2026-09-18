import Balancer from 'react-wrap-balancer';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    <section className="relative min-h-svh w-full flex md:items-center md:justify-center md:bg-paper md:px-12 md:py-28">

      {/* Телефон: фото сверху, текст под ним. Десктоп: фото — центрированный блок, текст поверх справа */}
      <div className="bg-paper pt-20 md:bg-transparent md:pt-0 relative w-full min-h-svh md:min-h-0 flex flex-col md:flex-none md:flex-row md:w-auto md:h-[calc(100svh-14rem)] md:max-h-[793px] md:max-w-[1100px] md:aspect-[1539/1109] md:items-center md:overflow-hidden md:shadow-2xl">

        {/* Фото */}
        <div className="absolute inset-x-0 top-20 bottom-0 md:inset-0 md:top-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-mobile.webp" />
            <img
              src="/hero-desktop.webp"
              alt="Юлия Радионова"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[50%_0%] md:object-center"
            />
          </picture>
        </div>

        {/* Затемнение справа налево — только десктоп */}
        <div className="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-l from-shade/85 via-shade/40 to-shade/0" />

        {/* Контент */}
        <div className="relative z-10 w-full mt-auto bg-gradient-to-t from-shade/70 via-shade/60 to-transparent px-6 pt-24 pb-14 md:mt-0 md:bg-none md:px-8 md:py-0 md:flex md:justify-end">
          <div className="w-full md:w-[44%] flex flex-col gap-6 md:gap-6 text-white">
            <p className="font-serif italic text-sm md:text-xl text-white/70">
              Бизнес-консультант, исследователь
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] md:leading-[0.95] tracking-tight">
              Юлия Радионова
            </h1>
            <p className="font-sans text-sm md:text-base text-white/75 max-w-xl leading-relaxed">
              <Balancer>
                {formatTypography("Работаю с собственниками и руководителями, которым важно разобраться в сложной ситуации и принять обоснованное решение.")}
              </Balancer>
            </p>
            <a
              href="#contact"
              className="w-fit uppercase tracking-[0.18em] text-xs text-white border-b border-white/40 pb-1 hover:border-white transition-colors md:border-b-0 md:pb-3.5 md:pt-3.5 md:px-7 md:bg-white md:text-shade md:font-medium md:tracking-[0.2em] md:hover:bg-white/90 md:inline-flex"
            >
              Обсудить задачу
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
