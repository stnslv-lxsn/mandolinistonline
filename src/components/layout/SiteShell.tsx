import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ctaLabel } from '@/content/site';

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  // Боковая кнопка висит поверх страницы, поэтому на широких экранах
  // контенту нужен запас по краям, иначе она накрывает текст
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-forest selection:text-white lg:px-10 xl:px-16">

      <Header />

      <main className="pb-32 md:pb-0">
        {children}
      </main>

      <Footer />

      {/* ФИКСИРОВАННАЯ КНОПКА (Десктоп — справа посередине) */}
      <div className="hidden md:flex fixed top-1/2 right-0 -translate-y-1/2 z-40">
        <a
          href="#contact"
          className="bg-forest text-white py-8 px-4 rounded-l-md hover:bg-forest-dark transition-colors flex items-center justify-center shadow-lg duration-300 min-h-[200px]"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-medium whitespace-nowrap rotate-180">
            {ctaLabel}
          </span>
        </a>
      </div>

      {/* ФИКСИРОВАННАЯ КНОПКА (Мобайл — прилипает к низу) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a
          href="#contact"
          className="flex items-center justify-center w-full bg-forest text-white py-4 rounded-md font-medium text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-forest-dark transition-colors"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
