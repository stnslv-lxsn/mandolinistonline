import React, { ReactNode } from 'react';
import { author, contactEmail, ctaLabel, nav, siteMeta } from '@/content/site';
import VariantSwitcher from '@/components/ui/VariantSwitcher';

interface NoirShellProps {
  children: ReactNode;
}

/**
 * Каркас тёмного варианта. Ни строчки клиентского JS: шапка не реагирует
 * на скролл (и потому не мигает поверх фотографии), мобильное меню — <details>.
 */
export default function NoirShell({ children }: NoirShellProps) {
  return (
    <div className="theme-noir min-h-screen bg-noir text-bone font-sans selection:bg-brass selection:text-noir">

      <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-serif text-base md:text-lg tracking-[0.35em] uppercase">
          {siteMeta.name}
        </span>

        <nav className="hidden md:flex gap-8 text-[0.65rem] uppercase tracking-[0.3em] text-bone/60">
          {nav.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-brass transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Мобильное меню без JavaScript */}
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer text-[0.65rem] uppercase tracking-[0.3em] text-bone/70 marker:hidden">
            Меню
          </summary>
          <nav className="absolute right-0 mt-4 flex flex-col gap-4 bg-noir-soft/95 backdrop-blur-sm border border-bone/10 px-6 py-5 text-[0.7rem] uppercase tracking-[0.25em] whitespace-nowrap">
            {nav.map((item) => (
              <a key={item.name} href={item.href} className="text-bone/80 hover:text-brass transition-colors">
                {item.name}
              </a>
            ))}
          </nav>
        </details>
      </header>

      <main>{children}</main>

      <footer className="px-6 md:px-12 py-16 border-t border-bone/10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          <a
            href={`mailto:${contactEmail}`}
            className="font-serif text-3xl md:text-5xl text-bone hover:text-brass transition-colors break-all"
          >
            {contactEmail}
          </a>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-[0.65rem] uppercase tracking-[0.3em] text-bone/40">
            <span>{siteMeta.name} — {siteMeta.role}</span>
            <span>© {author.year}. Все права защищены</span>
            <span>{author.role} — {author.name}</span>
          </div>
        </div>
      </footer>

      {/* Кнопка обратной связи, прижатая к нижнему краю на мобильных */}
      <a
        href="#contact"
        className="md:hidden fixed bottom-20 left-4 right-4 z-50 flex items-center justify-center bg-brass text-noir py-4 text-[0.7rem] uppercase tracking-[0.3em] font-semibold"
      >
        {ctaLabel}
      </a>

      <VariantSwitcher current="II" tone="dark" />
    </div>
  );
}
