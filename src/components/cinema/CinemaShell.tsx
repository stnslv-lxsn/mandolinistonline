import React, { ReactNode } from 'react';
import { author, contactEmail, ctaLabel, nav, siteMeta } from '@/content/site';
import VariantSwitcher from '@/components/ui/VariantSwitcher';
import CinemaMotion from './CinemaMotion';

interface CinemaShellProps {
  children: ReactNode;
}

/**
 * Каркас варианта IV: чёрное кинематографичное открытие, дальше светлый
 * разворот. Шапка лежит поверх первого экрана и уезжает вместе с ним —
 * так она не перекрашивается на ходу и не мигает над фотографией.
 */
export default function CinemaShell({ children }: CinemaShellProps) {
  return (
    <div className="theme-cinema min-h-screen bg-white text-ink font-sans selection:bg-ink selection:text-white">

      {/* Отклик на курсор и прокрутку; ничего не рисует */}
      <CinemaMotion />

      <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between text-bone">
        <span className="font-serif text-base md:text-lg tracking-[0.32em] uppercase">
          {siteMeta.name}
        </span>

        <nav className="hidden md:flex gap-8 text-[0.65rem] uppercase tracking-[0.28em] text-bone/60">
          {nav.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-bone transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer text-[0.65rem] uppercase tracking-[0.28em] text-bone/70">
            Меню
          </summary>
          <nav className="absolute right-0 mt-4 flex flex-col gap-4 bg-black/90 backdrop-blur-sm px-6 py-5 text-[0.7rem] uppercase tracking-[0.24em] whitespace-nowrap">
            {nav.map((item) => (
              <a key={item.name} href={item.href} className="text-bone/80 hover:text-bone transition-colors">
                {item.name}
              </a>
            ))}
          </nav>
        </details>
      </header>

      <main>{children}</main>

      <footer className="bg-black text-bone px-6 md:px-12 py-16">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
          <a
            href={`mailto:${contactEmail}`}
            className="font-serif text-3xl md:text-5xl hover:text-bone/60 transition-colors break-all"
          >
            {contactEmail}
          </a>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.28em] text-bone/40">
            <span>{siteMeta.name} — {siteMeta.role}</span>
            <span>© {author.year}. Все права защищены</span>
            <span>{author.role} — {author.name}</span>
          </div>
        </div>
      </footer>

      {/* На телефоне кнопка обратной связи держится у нижнего края:
          в первом экране она иначе оказывается под сгибом */}
      <a
        href="#contact"
        className="md:hidden fixed bottom-20 left-4 right-4 z-50 flex items-center justify-center bg-white text-black py-4 text-[0.7rem] uppercase tracking-[0.3em] font-semibold shadow-2xl"
      >
        {ctaLabel}
      </a>

      <VariantSwitcher current="IV" />
    </div>
  );
}
