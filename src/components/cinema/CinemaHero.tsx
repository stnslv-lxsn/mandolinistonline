import Picture from '@/components/ui/Picture';
import { ctaLabel, hero, images } from '@/content/site';
import { formatTypography } from '@/lib/typography';

/**
 * Первый экран варианта IV. Сценарий целиком на CSS-анимациях
 * (см. блок «Вариант IV» в globals.css):
 *
 *   0.1s  кадр пустого кабинета, начинается наезд
 *   0.7s  поверх проступает тот же кабинет, но с человеком
 *   1.5s  кадр уезжает из центра экрана в левую колонку
 *   1.8s  справа по строчкам проявляется текст (последняя — к 2.9s)
 *
 * Задержки строк заданы в globals.css через nth-child: на узком экране они
 * короче, а при настройке «уменьшить движение» обнуляются вместе с длительностями,
 * и первый экран сразу показывается в финальном виде.
 */
export default function CinemaHero() {
  return (
    <section className="relative min-h-[100svh] bg-black text-bone flex items-center overflow-hidden py-20 md:py-0">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">

        {/* Сцена: кадр кабинета */}
        <div className="cinema-stage md:col-span-5 lg:col-span-5">
          {/* На телефоне кадр ограничен по высоте, иначе первый экран
              вырастает выше вьюпорта и текст уезжает под сгиб */}
          <div className="cinema-frame relative aspect-[3/4] max-h-[44svh] md:max-h-none w-auto mx-auto overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            {/* Нижний слой — пустой кабинет, он и есть LCP-кадр */}
            <Picture
              image={images.sceneEmpty}
              sizes="(max-width: 768px) 92vw, 42vw"
              priority
              className="absolute inset-0"
              imgClassName="w-full h-full object-cover"
            />
            {/* Верхний слой ждёт своей секунды, поэтому грузится сразу,
                но без высокого приоритета — канал нужен нижнему кадру */}
            <Picture
              image={images.sceneHer}
              sizes="(max-width: 768px) 92vw, 42vw"
              eager
              className="cinema-shot--her absolute inset-0"
              imgClassName="w-full h-full object-cover"
            />
            {/* Тонкая рамка кадра и лёгкая виньетка */}
            <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* Текст, выходящий справа */}
        <div className="cinema-copy md:col-span-6 md:col-start-7">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-bone/50 mb-8">
            {hero.role}
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
          >
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>
          <p
            className="text-base md:text-lg text-bone/65 leading-relaxed max-w-lg text-pretty mb-10"
          >
            {formatTypography(hero.lead)}
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center border border-bone/40 px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] hover:bg-bone hover:text-black transition-colors"
            >
              {ctaLabel}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
