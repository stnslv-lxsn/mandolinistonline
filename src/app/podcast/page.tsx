import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import VideoEmbed from '@/components/VideoEmbed';
import { podcast, podcastHeading } from '@/content/podcast';
import { formatTypography } from '@/lib/typography';

export const metadata: Metadata = {
  title: formatTypography('Подкасты | Юлия Радионова'),
  description: formatTypography('Подкасты с участием Юлии Радионовой: разговоры о решениях, команде и рынке.'),
  alternates: { canonical: '/podcast' },
};

export default function PodcastPage() {
  return (
    <Layout anchorPrefix="/">
      <section className="px-6 md:px-12 pt-32 pb-24 md:pt-44 md:pb-32 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-muted mb-8">
          <span className="w-6 h-[1px] bg-muted/50" />
          Подкасты
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
          {formatTypography(podcastHeading)}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-6xl">
          {podcast.map((episode) => {
            const title = formatTypography(episode.title);
            // Колонкой: ссылка на YouTube прижата к низу карточки, у выпусков с короткими
            // названиями она стоит на одной линии с остальными
            return (
              <article key={episode.slug} id={episode.slug} className="reveal min-w-0 scroll-mt-32 flex flex-col">
                <VideoEmbed title={title} poster={episode.poster} vkOid={episode.vkOid} vkId={episode.vkId} />
                <h2 className="font-serif text-lg md:text-xl mt-4 mb-2 text-ink text-balance flex-1">
                  {title}
                </h2>
                <a
                  href={episode.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link self-start font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-forest whitespace-nowrap"
                >
                  Смотреть на YouTube
                </a>
              </article>
            );
          })}
        </div>

        <Link
          href="/"
          className="link inline-block mt-20 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-forest whitespace-nowrap"
        >
          На главную
        </Link>
      </section>
    </Layout>
  );
}
