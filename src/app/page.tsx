import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Work from '@/components/sections/Work';
import Cases from '@/components/sections/Cases';
import Research from '@/components/sections/Research';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout darkHero>
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
