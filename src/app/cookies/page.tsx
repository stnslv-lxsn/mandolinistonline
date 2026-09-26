import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { cookieSections, OPERATOR } from '@/content/legal';
import { formatTypography } from '@/lib/typography';

export const metadata: Metadata = {
  title: formatTypography('Политика использования cookie | Юлия Радионова'),
  description: formatTypography('Какие cookie-файлы используются на сайте radionova.pro.'),
  alternates: { canonical: '/cookies' },
  robots: OPERATOR.ready ? undefined : { index: false, follow: false },
};

export default function CookiesPage() {
  return <LegalPage title="Политика использования cookie-файлов" sections={cookieSections} />;
}
