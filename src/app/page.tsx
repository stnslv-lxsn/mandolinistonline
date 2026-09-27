import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Work from '@/components/sections/Work';
import Cases from '@/components/sections/Cases';
import Research from '@/components/sections/Research';
import Contact from '@/components/sections/Contact';
import { contactEmail, personName, personRole, positioning, siteUrl, socials } from '@/lib/site';

// Разметка для поисковиков (JSON-LD): это сайт Юлии Радионовой, и кто она такая.
// Имя распространённое, разметка помогает отличить её от однофамилиц.
// WebSite.name — название сайта, которое Google показывает в выдаче над ссылкой;
// по правилам Google эта разметка только на главной.
// Посетитель её не видит, поэтому тексты без типографа: неразрывные пробелы
// и U+2060 поисковику не нужны
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: personName,
      inLanguage: 'ru',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: personName,
      jobTitle: personRole,
      description: positioning,
      url: siteUrl,
      image: `${siteUrl}/portrait.webp`,
      email: contactEmail,
      sameAs: socials.map((social) => social.href),
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      {/* «<» заменён, чтобы строка в данных не могла закрыть тег script — так советует Next */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <About />
      <Products />
      <Work />
      <Cases />
      <Research />
      <Contact />
    </Layout>
  );
}
