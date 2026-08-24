import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Work from '@/components/sections/Work';
import Research from '@/components/sections/Research';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Products />
      <Work />
      <Research />
      <Contact />
    </Layout>
  );
}
