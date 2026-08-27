import type { Metadata } from 'next';
import CinemaShell from '@/components/cinema/CinemaShell';
import CinemaHero from '@/components/cinema/CinemaHero';
import Picture from '@/components/ui/Picture';
import {
  aboutSection,
  contactEmail,
  contactSection,
  factsSection,
  images,
  requestSection,
  siteMeta,
} from '@/content/site';
import { formatTypography } from '@/lib/typography';

export const metadata: Metadata = {
  title: `${siteMeta.name} — вариант «Кадр»`,
  robots: { index: false },
};

export default function CinemaPage() {
  return (
    <CinemaShell>

      <CinemaHero />

      {/* С чем обращаются */}
      <section id="request" className="px-6 md:px-12 py-24 md:py-36 max-w-[1400px] mx-auto">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted mb-14">
          {requestSection.number} — {requestSection.title}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {requestSection.moments.map((moment, index) => (
            <div key={moment} data-reveal className="border-t border-ink/15 pt-6">
              <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted mb-6">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-balance">
                {formatTypography(moment)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Разворот: кадр во всю ширину */}
      <section aria-hidden="true" data-reveal>
        <Picture
          image={images.wide}
          sizes="100vw"
          className="block"
          imgClassName="w-full h-[50vh] md:h-[75vh] object-cover object-[50%_35%]"
        />
      </section>

      {/* Обо мне */}
      <section id="profile" className="px-6 md:px-12 py-24 md:py-36 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div data-reveal className="md:col-span-5">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted mb-10">
              {aboutSection.number} — {aboutSection.title}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-balance">
              {formatTypography(aboutSection.headline)}
            </h2>
          </div>

          <div data-reveal className="md:col-span-6 md:col-start-7 flex flex-col gap-7 text-base md:text-lg leading-relaxed text-muted text-pretty">
            {aboutSection.columns.map((column) => (
              <p key={column}>{formatTypography(column)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Опыт в фактах — на чёрной плашке, перекликается с открытием */}
      <section id="facts" className="bg-espresso text-cream">
        <div className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cream/40 mb-14">
            {factsSection.number} — {factsSection.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {factsSection.numbers.map((fact) => (
              <div key={fact.value} data-reveal className="border-t border-cream/15 pt-7">
                <p className="font-serif text-5xl md:text-7xl leading-none mb-5">
                  {fact.value}
                  <span className="ml-4 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-cream/40 align-middle">
                    {fact.unit}
                  </span>
                </p>
                <p className="text-sm text-cream/50 leading-relaxed max-w-sm text-pretty">
                  {formatTypography(fact.caption)}
                </p>
              </div>
            ))}

            {factsSection.qualities.map((fact) => (
              <div key={fact.value} data-reveal className="border-t border-cream/15 pt-7">
                <p className="font-serif italic text-2xl md:text-3xl leading-snug mb-5 text-balance">
                  {formatTypography(fact.value)}
                </p>
                <p className="text-sm text-cream/50 leading-relaxed max-w-sm text-pretty">
                  {formatTypography(fact.caption)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="px-6 md:px-12 py-24 md:py-36 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div data-reveal className="md:col-span-4">
            <Picture
              image={images.warm}
              sizes="(max-width: 768px) 100vw, 380px"
              imgClassName="w-full object-cover"
            />
          </div>

          <div data-reveal className="md:col-span-7 md:col-start-6">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted mb-10">
              {contactSection.number} — {contactSection.title}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8 text-balance">
              {formatTypography(contactSection.headline)}
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-lg mb-10 text-pretty">
              {formatTypography(contactSection.text)}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="font-serif text-2xl md:text-4xl border-b border-ink pb-2 hover:text-muted transition-colors break-all"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </section>

    </CinemaShell>
  );
}
