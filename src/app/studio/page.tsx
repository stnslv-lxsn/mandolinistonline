import type { Metadata } from 'next';
import StudioShell from '@/components/studio/StudioShell';
import Picture from '@/components/ui/Picture';
import {
  aboutSection,
  contactEmail,
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
  title: `${siteMeta.name} — вариант «Досье»`,
  robots: { index: false },
};

/** Подпись раздела: номер кирпичным, название капсом */
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate mb-10 flex items-center gap-3">
      <span className="text-marker font-bold">§ {number}</span>
      <span className="h-px w-8 bg-graphite/25" />
      {title}
    </p>
  );
}

export default function StudioPage() {
  return (
    <StudioShell>

      {/* Титульный разворот */}
      <section className="border-b border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end">
          <div className="md:col-span-7 animate-rise">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-marker mb-8">
              {hero.role}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95] tracking-[-0.03em] mb-10">
              {hero.firstName}
              <br />
              <span className="font-semibold">{hero.lastName}</span>
            </h1>
            <p className="text-base md:text-lg text-slate leading-relaxed max-w-xl text-pretty">
              {formatTypography(hero.lead)}
            </p>

            <a
              href="#contact"
              className="inline-flex mt-12 border border-graphite px-9 py-3.5 text-[0.65rem] uppercase tracking-[0.28em] font-semibold hover:bg-graphite hover:text-sheet transition-colors"
            >
              {ctaLabel}
            </a>
          </div>

          <div className="md:col-span-4 md:col-start-9 animate-rise" style={{ animationDelay: '120ms' }}>
            <Picture
              image={images.studio}
              sizes="(max-width: 768px) 100vw, 420px"
              priority
              imgClassName="w-full object-cover grayscale"
            />
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-slate">
              {siteMeta.name}
            </p>
          </div>
        </div>
      </section>

      {/* § 01 Запросы — нумерованный перечень */}
      <section id="request" className="border-b border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionLabel number={requestSection.number} title={requestSection.title} />

          <ol className="border-t border-graphite/15">
            {requestSection.moments.map((moment, index) => (
              <li
                key={moment}
                className="border-b border-graphite/15 py-7 md:py-9 grid grid-cols-[2.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 items-baseline"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-marker font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl md:text-3xl font-light leading-snug tracking-[-0.01em] text-balance">
                  {formatTypography(moment)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* § 02 Обо мне */}
      <section id="profile" className="border-b border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionLabel number={aboutSection.number} title={aboutSection.title} />
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.02em] text-balance">
              {formatTypography(aboutSection.headline)}
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-slate text-pretty">
            {aboutSection.columns.map((column) => (
              <p key={column}>{formatTypography(column)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* § 03 Факты — табличная подача */}
      <section id="facts" className="border-b border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionLabel number={factsSection.number} title={factsSection.title} />

          <dl className="border-t border-graphite/15">
            {factsSection.numbers.map((fact) => (
              <div
                key={fact.value}
                className="border-b border-graphite/15 py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
              >
                <dt className="md:col-span-4 text-3xl md:text-5xl font-light tracking-[-0.03em] tabular-nums">
                  {fact.value}
                  <span className="ml-3 text-[0.6rem] uppercase tracking-[0.22em] text-slate align-middle">
                    {fact.unit}
                  </span>
                </dt>
                <dd className="md:col-span-7 md:col-start-6 text-sm md:text-base text-slate leading-relaxed text-pretty">
                  {formatTypography(fact.caption)}
                </dd>
              </div>
            ))}

            {factsSection.qualities.map((fact) => (
              <div
                key={fact.value}
                className="border-b border-graphite/15 py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
              >
                <dt className="md:col-span-4 text-lg md:text-xl font-semibold leading-snug text-balance">
                  {formatTypography(fact.value)}
                </dt>
                <dd className="md:col-span-7 md:col-start-6 text-sm md:text-base text-slate leading-relaxed text-pretty">
                  {formatTypography(fact.caption)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* § 04 Контакты */}
      <section id="contact">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionLabel number={contactSection.number} title={contactSection.title} />
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-[-0.02em] mb-8 text-balance">
              {formatTypography(contactSection.headline)}
            </h2>
            <p className="text-sm md:text-base text-slate leading-relaxed max-w-xl mb-12 text-pretty">
              {formatTypography(contactSection.text)}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-xl md:text-3xl font-light border-b-2 border-marker pb-1 hover:text-marker transition-colors break-all"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </section>

    </StudioShell>
  );
}
