import Link from 'next/link';
import Layout from '@/components/Layout';
import { LEGAL_UPDATED, OPERATOR, type LegalSection } from '@/content/legal';
import { formatTypography } from '@/lib/typography';

interface LegalPageProps {
  title: string;
  sections: LegalSection[];
}

// Общая вёрстка юридических страниц: узкая колонка текста, крупный заголовок,
// дата редакции. Пока реквизиты не заполнены — плашка-предупреждение сверху
export default function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <Layout anchorPrefix="/">
      <article className="px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-32 max-w-3xl mx-auto">
        {!OPERATOR.ready && (
          <p className="mb-10 border border-rule px-5 py-4 text-sm text-muted">
            {formatTypography('Черновик: реквизиты оператора ещё не заполнены, страница закрыта от поисковиков.')}
          </p>
        )}
        <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4 text-ink text-balance">
          {formatTypography(title)}
        </h1>
        <p className="text-sm text-muted mb-12">
          {formatTypography(`Редакция от ${LEGAL_UPDATED}`)}
        </p>

        {sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl mb-4 text-ink">
              {formatTypography(section.heading)}
            </h2>
            <div className="flex flex-col gap-4 text-base text-muted leading-relaxed">
              {section.paragraphs?.map((p) => <p key={p}>{formatTypography(p)}</p>)}
              {section.list && (
                <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-rule">
                  {section.list.map((item) => <li key={item}>{formatTypography(item)}</li>)}
                </ul>
              )}
              {section.after?.map((p) => <p key={p}>{formatTypography(p)}</p>)}
            </div>
          </section>
        ))}

        <Link
          href="/"
          className="link inline-block mt-6 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-forest whitespace-nowrap"
        >
          На главную
        </Link>
      </article>
    </Layout>
  );
}
