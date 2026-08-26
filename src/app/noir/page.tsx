import type { Metadata } from 'next';
import NoirShell from '@/components/noir/NoirShell';
import Picture from '@/components/ui/Picture';
import {
  aboutSection,
  contactSection,
  ctaLabel,
  factsSection,
  hero,
  images,
  requestSection,
  siteMeta,
} from '@/content/site';
import { formatTypography } from '@/lib/typography';

export const metadata: Metadata = {
  title: `${siteMeta.name} — вариант «Ночь»`,
  robots: { index: false },
};

export default function NoirPage() {
  return (
    <NoirShell>

      {/* Первый экран: кадр во весь экран, текст поверх затемнения */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <Picture
          image={images.window}
          sizes="100vw"
          priority
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover object-[50%_30%]"
        />
        {/* Двойное затемнение: снизу под текст, сверху под шапку */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/30" />
        <div className="absolute inset-0 bg-noir/20" />

        <div className="relative px-6 md:px-12 pb-24 md:pb-32 pt-40 w-full max-w-[1200px] mx-auto animate-rise">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-brass mb-8">
            {hero.role}
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tight mb-10">
            {hero.firstName}
            <br />
            {hero.lastName}
          </h1>
          <p className="text-base md:text-lg text-bone/70 max-w-xl leading-relaxed text-pretty mb-12">
            {formatTypography(hero.lead)}
          </p>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-4 border border-brass/60 text-brass px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] hover:bg-brass hover:text-noir transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </section>

      {/* С чем обращаются */}
      <section id="request" className="px-6 md:px-12 py-28 md:py-40 max-w-[1200px] mx-auto">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-brass mb-16">
          {requestSection.number} — {requestSection.title}
        </p>

        <div className="flex flex-col">
          {requestSection.moments.map((moment) => (
            <p
              key={moment}
              className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-bone/90 border-t border-bone/10 py-10 md:py-14 text-balance"
            >
              {formatTypography(moment)}
            </p>
          ))}
        </div>
      </section>

      {/* Обо мне: широкий кадр и текст */}
      <section id="profile" className="px-6 md:px-12 pb-28 md:pb-40 max-w-[1200px] mx-auto">
        <Picture
          image={images.wide}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="block mb-16"
          imgClassName="w-full h-[40vh] md:h-[60vh] object-cover object-[50%_35%]"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-brass mb-8">
              {aboutSection.number} — {aboutSection.title}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-balance">
              {formatTypography(aboutSection.headline)}
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 flex flex-col gap-8 text-base md:text-lg leading-relaxed text-bone/60 text-pretty">
            {aboutSection.columns.map((column) => (
              <p key={column}>{formatTypography(column)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Опыт в фактах */}
      <section id="facts" className="border-y border-bone/10 bg-noir-soft">
        <div className="px-6 md:px-12 py-24 md:py-32 max-w-[1200px] mx-auto">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-brass mb-16">
            {factsSection.number} — {factsSection.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {factsSection.numbers.map((fact) => (
              <div key={fact.value}>
                <p className="font-serif text-5xl md:text-7xl leading-none text-brass mb-5">
                  {fact.value}
                  <span className="ml-4 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-bone/40 align-middle">
                    {fact.unit}
                  </span>
                </p>
                <p className="text-sm text-bone/50 leading-relaxed max-w-sm text-pretty">
                  {formatTypography(fact.caption)}
                </p>
              </div>
            ))}

            {factsSection.qualities.map((fact) => (
              <div key={fact.value}>
                <p className="font-serif italic text-2xl md:text-3xl leading-snug text-bone mb-5 text-balance">
                  {formatTypography(fact.value)}
                </p>
                <p className="text-sm text-bone/50 leading-relaxed max-w-sm text-pretty">
                  {formatTypography(fact.caption)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="px-6 md:px-12 py-28 md:py-40 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-brass mb-10">
              {contactSection.number} — {contactSection.title}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-8 text-balance">
              {formatTypography(contactSection.headline)}
            </h2>
            <p className="text-base md:text-lg text-bone/60 leading-relaxed max-w-lg text-pretty">
              {formatTypography(contactSection.text)}
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Picture
              image={images.warm}
              sizes="(max-width: 768px) 100vw, 380px"
              imgClassName="w-full object-cover"
            />
          </div>
        </div>
      </section>

    </NoirShell>
  );
}
