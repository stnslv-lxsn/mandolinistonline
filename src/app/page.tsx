import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import When from '@/components/sections/When';
import About from '@/components/sections/About';
import Facts from '@/components/sections/Facts';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <When />
      <About />
      <Facts />
      <Contact />
    </Layout>
  );
}
