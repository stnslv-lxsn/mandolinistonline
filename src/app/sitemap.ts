import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Обязательно при output: 'export' — иначе маршрут считается динамическим
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      // Статический сайт: дата фиксируется на сборке
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
