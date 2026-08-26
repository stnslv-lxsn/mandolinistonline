import React, { ReactNode } from 'react';
import { author, contactEmail, nav, siteMeta } from '@/content/site';
import VariantSwitcher from '@/components/ui/VariantSwitcher';

interface StudioShellProps {
  children: ReactNode;
}

/**
 * Каркас варианта «Досье»: страница держится на типографике и линиях,
 * без теней, скруглений и картинок-украшений. Клиентского JS нет.
 */
export default function StudioShell({ children }: StudioShellProps) {
  return (
    <div className="theme-studio min-h-screen bg-sheet text-graphite font-sans selection:bg-marker selection:text-sheet">

      {/* Колонтитул документа */}
      <header className="sticky top-0 z-40 bg-sheet/95 backdrop-blur-sm border-b border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">
          <span className="text-[0.7rem] uppercase tracking-[0.28em] font-bold whitespace-nowrap">
            {siteMeta.name}
          </span>

          <nav className="hidden md:flex gap-7 text-[0.65rem] uppercase tracking-[0.22em] text-slate">
            {nav.map((item, index) => (
              <a key={item.name} href={item.href} className="hover:text-marker transition-colors">
                <span className="text-graphite/30 mr-2">{String(index + 1).padStart(2, '0')}</span>
                {item.name}
              </a>
            ))}
          </nav>

          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-slate whitespace-nowrap">
            Досье — {author.year}
          </span>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-graphite/15">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-[0.65rem] uppercase tracking-[0.22em] text-slate">
          <span>© {author.year} {siteMeta.name}. Все права защищены</span>
          <a href={`mailto:${contactEmail}`} className="md:text-center hover:text-marker transition-colors break-all normal-case tracking-normal text-sm">
            {contactEmail}
          </a>
          <span className="md:text-right">{author.role} — {author.name}</span>
        </div>
      </footer>

      <VariantSwitcher current="III" />
    </div>
  );
}
