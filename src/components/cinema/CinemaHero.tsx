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
    <section className="relative min-h-[100svh] bg-black text-bone overflow-hidden flex items-center">

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Передний план: она в этом же кабинете, только ближе.
          На телефоне кадр держится вверху, чтобы лицо не спорило с текстом */}
      <div className="cinema-figure absolute inset-0 z-10 flex items-start md:items-end justify-center md:justify-start pointer-events-none">
        <div className="cinema-figure-shift relative h-[52svh] mt-[7svh] md:mt-0 md:h-[80svh] md:mb-[10svh] md:ml-[4vw] lg:ml-[7vw]">
          <div className="cinema-figure-in h-full">
            <Picture
              image={images.figure}
              sizes="(max-width: 768px) 80vw, 46vw"
              priority
              className="block h-full"
              imgClassName="h-full w-auto object-contain object-bottom cinema-figure-body"
            />
          </div>
        </div>
      </div>

      {/* Передний план: поверхность, за которой она сидит. Даёт глубину
          и прячет край, где вырезанный кадр обрывается */}
      <div className="cinema-desk absolute inset-x-0 bottom-0 h-[30svh] md:h-[34svh] z-20 pointer-events-none">
        <Picture
          image={images.foreground}
          sizes="100vw"
          eager
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
      </div>

      {/* Подложка под текстом на телефоне: там он лежит поверх кадра */}
      <div className="md:hidden absolute inset-x-0 bottom-0 h-[58svh] z-20 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />

      {/* Текст */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12">
        <div className="cinema-copy md:col-span-6 md:col-start-7 pt-[58svh] pb-28 md:py-0">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-bone/60 mb-6 md:mb-8">
            {hero.role}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-6 md:mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>
          <p className="text-base md:text-lg text-bone/75 leading-relaxed max-w-lg text-pretty mb-8 md:mb-10 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            {formatTypography(hero.lead)}
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center border border-bone/40 bg-black/30 backdrop-blur-sm px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] hover:bg-bone hover:text-black transition-colors"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
