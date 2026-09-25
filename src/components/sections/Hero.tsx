import Balancer from 'react-wrap-balancer';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    <section className="relative min-h-svh w-full flex pt-20 pb-12 px-4 md:px-12 md:py-28 md:items-center md:justify-center md:bg-paper">

      {/* Рамка: слева фотография, справа текст на светлом */}
      <div className="relative w-full md:w-auto md:h-[calc(100svh-14rem)] md:max-h-[793px] md:max-w-[1100px] md:aspect-[1539/1109] bg-paper overflow-hidden grid grid-cols-1 md:grid-cols-[45%_55%]">

        {/* Фотография */}
        <div className="relative h-[46svh] md:h-full">
          <img
            src="/portrait.webp"
            alt="Юлия Радионова"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Текст */}
        <div className="border border-forest md:border-l-0 flex flex-col justify-center gap-6 px-6 py-10 md:pl-20 md:pr-12 md:py-0">
          <p className="font-serif italic text-sm md:text-xl text-muted">
            Бизнес-консультант, исследователь
          </p>
          <h1 className="font-serif text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] md:leading-[0.95] tracking-tight text-ink">
            Юлия Радионова
          </h1>
          <p className="font-sans text-[15px] md:text-[17px] text-muted leading-relaxed">
            <Balancer>
              {formatTypography("Работаю с собственниками и руководителями в ситуациях, где нет очевидно правильного решения и цена ошибки высока.")}
            </Balancer>
          </p>
          <a
            href="#contact"
            className="w-fit font-sans text-xs uppercase tracking-[0.18em] text-ink border-b border-ink/40 hover:border-ink pb-1 transition-colors"
          >
            Обсудить задачу
          </a>
        </div>
      </div>
    </section>
  );
}
