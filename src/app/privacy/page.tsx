import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { OPERATOR, privacySections } from '@/content/legal';
import { formatTypography } from '@/lib/typography';

export const metadata: Metadata = {
  title: formatTypography('Политика обработки персональных данных | Юлия Радионова'),
  description: formatTypography('Какие персональные данные обрабатываются на сайте radionova.pro, зачем и как их удалить.'),
  alternates: { canonical: '/privacy' },
  robots: OPERATOR.ready ? undefined : { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalPage title="Политика в отношении обработки персональных данных" sections={privacySections} />;
}
