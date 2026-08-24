import type { MetadataRoute } from 'next';
import { siteMeta } from '@/content/site';

// Обязательно при output: 'export' — иначе маршрут считается динамическим
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMeta.url,
      // Статический сайт: дата фиксируется на сборке
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
