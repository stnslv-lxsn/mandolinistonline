import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import { formatTypography } from '@/lib/typography';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-32 max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-12 min-h-[90vh]">

      <div className="md:w-3/5 flex flex-col gap-8 md:gap-10">
        <div>
          <p className="font-serif italic text-xl md:text-2xl text-muted mb-4">
            Бизнес-консультант, исследователь
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-none text-ink tracking-tight mb-8">
            Стас
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            <Balancer>
              {formatTypography("Помогаю компаниям проходить через кризисы управления и масштабирования. Соединяю 20-летний опыт в бизнесе с глубоким пониманием психологии систем.")}
            </Balancer>
          </p>
        </div>

        <div className="hidden md:block pt-8">
          <a href="#contact" className="inline-flex bg-forest text-white px-8 py-4 font-medium text-sm hover:bg-forest-dark transition-colors uppercase tracking-[0.2em]">
            Обсудить задачу
          </a>
        </div>
      </div>

      {/* Фотография в круге */}
      <div className="md:w-2/5 flex justify-center md:justify-end shrink-0 relative">
        {/* Приятный ореол (Glow effect) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-forest/5 rounded-full blur-3xl -z-10"></div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden bg-black/5 shadow-2xl shrink-0">
          {/* LCP-изображение: грузим сразу, без ленивой загрузки */}
          <Image
            src="/photo.jpg"
            alt="Стас"
            fill
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
