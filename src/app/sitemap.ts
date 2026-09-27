import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Обязательно при output: 'export' — иначе маршрут считается динамическим
export const dynamic = 'force-static';

// Дата изменения страницы — дата последнего коммита в файлах, из которых она собрана.
// Дата сборки не годится: она новая при каждом деплое, и поисковики перестают
// доверять lastmod сайта. Появится страница или контент переедет в другой файл —
// поправить список sources
const pages: { path: string; sources: string[]; changeFrequency: 'monthly'; priority: number }[] = [
  {
    path: '',
    sources: [
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'src/components/sections',
      'src/components/EditorialSection.tsx',
      'src/lib/site.ts',
      'public/portrait.webp',
    ],
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    path: '/podcast',
    sources: ['src/app/podcast', 'src/content/podcast.ts', 'src/components/VideoEmbed.tsx', 'public/podcast-*'],
    changeFrequency: 'monthly',
    priority: 0.5,
  },
];

const git = (...args: string[]) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

// Без полной истории git (неглубокий клон, сборка вне репозитория) даты нет:
// лучше не указать её вовсе, чем указать неверную
function lastCommitDate(sources: string[]): string | undefined {
  try {
    if (git('rev-parse', '--is-shallow-repository') === 'true') return undefined;
    return git('log', '-1', '--format=%cI', '--', ...sources) || undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, sources, changeFrequency, priority }) => {
    const lastModified = lastCommitDate(sources);
    return {
      url: `${siteUrl}${path}`,
      ...(lastModified && { lastModified }),
      changeFrequency,
      priority,
    };
  });
}
