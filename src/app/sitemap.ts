import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Обязательно при output: 'export' — иначе маршрут считается динамическим
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Статический сайт: дата фиксируется на сборке
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/podcast`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
