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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 max-w-6xl">
          {podcast.map((episode) => {
            const title = formatTypography(episode.title);
            return (
              <article key={episode.slug} id={episode.slug} className="min-w-0 scroll-mt-32">
                <VideoEmbed title={title} poster={episode.poster} vkOid={episode.vkOid} vkId={episode.vkId} />
                <h2 className="font-serif text-xl md:text-2xl mt-5 mb-3 text-ink text-balance">
                  {title}
                </h2>
                <a
                  href={episode.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-ink"
                >
                  Смотреть на YouTube
                </a>
              </article>
            );
          })}
        </div>

        <Link
          href="/"
          className="inline-block mt-20 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-ink"
        >
          На главную
        </Link>
      </section>
    </Layout>
  );
}
