import Picture from '@/components/ui/Picture';
import { ctaLabel, hero, images } from '@/content/site';
import { formatTypography } from '@/lib/typography';

/**
 * Первый экран варианта IV — полноэкранная сцена (см. блок «Вариант IV»
 * в globals.css):
 *
 *   0.0s  кабинет во весь экран, камера наезжает
 *   0.9s  по центру, ближе к зрителю, проявляется крупный план
 *   2.1s  композиция уходит влево, справа открывается место под текст
 *   2.4s  текст выходит построчно
 *
 * Кабинет намеренно размыт и затемнён (это впечено в файл на сборке):
 * он читается как пространство за спиной, а не как вторая картинка.
 * Дальше сцена продолжает еле заметно жить — от курсора и прокрутки,
 * этим занимается CinemaMotion.
 */
export default function CinemaHero() {
  return (
    <section className="relative min-h-[100svh] bg-espresso text-cream overflow-hidden flex items-center">

      {/* Задний план: кабинет */}
      <div className="cinema-bg absolute inset-0">
        <div className="cinema-bg-push absolute inset-0">
          <Picture
            image={images.office}
            sizes="100vw"
            priority
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
          />
        </div>
        {/* Затемнение к краям, чтобы центр кадра держал внимание */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_46%,transparent_32%,rgba(21,15,9,0.78)_100%)]" />
      </div>

      {/* Передний план: она в этом же кабинете, только ближе.
          На телефоне кадр держится вверху, чтобы лицо не спорило с текстом */}
      <div className="cinema-figure absolute inset-0 z-10 flex items-start md:items-end justify-center md:justify-start pointer-events-none">
        <div className="cinema-figure-shift relative h-[58svh] mt-[8svh] md:mt-0 md:h-[93svh] md:ml-[5vw] lg:ml-[8vw]">
          <div className="cinema-figure-in relative h-full">
            {/* Тень под ногами — контакт с полом */}
            <div className="cinema-figure-ground absolute bottom-[-1.5%] left-1/2 -translate-x-1/2 w-[78%] h-[7%]" />
            <Picture
              image={images.figure}
              sizes="(max-width: 768px) 74vw, 42vw"
              priority
              className="relative block h-full"
              imgClassName="h-full w-auto object-contain object-bottom cinema-figure-body"
            />
          </div>
        </div>
      </div>

      {/* Подложка под текстом на телефоне: там он лежит поверх кадра */}
      <div className="md:hidden absolute inset-x-0 bottom-0 h-[58svh] z-20 bg-gradient-to-t from-espresso via-espresso/85 to-transparent pointer-events-none" />

      {/* Текст */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12">
        <div className="cinema-copy md:col-span-6 md:col-start-7 pt-[58svh] pb-28 md:py-0">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-cream/60 mb-6 md:mb-8">
            {hero.role}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-6 md:mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-lg text-pretty mb-8 md:mb-10 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            {formatTypography(hero.lead)}
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center border border-cream/40 bg-espresso/40 backdrop-blur-sm px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] hover:bg-cream hover:text-espresso transition-colors"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
