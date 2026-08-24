import SiteShell from '@/components/layout/SiteShell';
import Hero from '@/components/sections/Hero';
import Request from '@/components/sections/Request';
import About from '@/components/sections/About';
import Facts from '@/components/sections/Facts';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Request />
      <About />
      <Facts />
      <Contact />
    </SiteShell>
  );
}
