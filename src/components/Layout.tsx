'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  /** Префикс для пунктов меню: на главной якоря локальные, на других страницах нужен «/» */
  anchorPrefix?: string;
}

// Иконки нарисованы вручную: ради двух штук lucide-react тянул в бандл
// собственный рантайм создания иконок
function BurgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const menuItems = [
  { name: 'Обо мне', href: '#profile' },
  { name: 'Запросы', href: '#expertise' },
  { name: 'Работа', href: '#work' },
  { name: 'Проекты', href: '#research' },
  { name: 'Контакты', href: '#contact' },
];

export default function Layout({ children, anchorPrefix = '' }: LayoutProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Пишем прогресс прокрутки (0…1 на отрезке 0…180px) прямо в CSS-переменную,
  // без setState на каждый кадр — иначе лишний ререндер на каждое движение
  useEffect(() => {
    let frame = 0;

    const apply = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / 180));
      headerRef.current?.style.setProperty('--hdr', progress.toFixed(3));
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Открытое мобильное меню перекрывает страницу целиком: блокируем скролл под ним
  // и даём закрыть его с клавиатуры
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-forest selection:text-paper">

      {/* 1. ВЕРХНЕЕ МЕНЮ (Sticky + Glassmorphism) */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-paper/90 backdrop-blur-md border-b border-rule shadow-sm pointer-events-none',
            mobileMenuOpen && 'opacity-0'
          )}
          style={mobileMenuOpen ? undefined : { opacity: 'var(--hdr, 0)' }}
        />
        <div
          className="relative px-6 md:px-12 flex justify-between items-center"
          style={{
            paddingTop: 'calc(1.25rem - 0.25rem * var(--hdr, 0))',
            paddingBottom: 'calc(1.25rem - 0.25rem * var(--hdr, 0))',
          }}
        >
          <div className="font-serif text-[13px] md:text-2xl font-semibold md:font-bold tracking-[0.14em] md:tracking-wide relative z-50 text-ink">
            ЮЛИЯ РАДИОНОВА
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {menuItems.map((item) => (
              <a key={item.name} href={anchorPrefix + item.href} className="transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-accent">
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-2 -mr-2 text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {/* inert убирает скрытое меню и из a11y-дерева, и из таб-порядка */}
        <div
          className={cn(
            "fixed inset-0 h-[100dvh] w-screen bg-paper flex flex-col justify-center items-center transition-all duration-500 ease-in-out lg:hidden",
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
          inert={!mobileMenuOpen}
        >
          <nav className="flex flex-col items-center space-y-8 text-lg font-medium uppercase tracking-[0.2em]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={anchorPrefix + item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <main>
        {children}
      </main>

      {/* Подвал: ссылки на документы о персональных данных. Подписи короткие,
          держатся вместе через whitespace-nowrap — типограф в клиентском компоненте не нужен */}
      <footer className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
        {/* Год считается и при сборке, и в браузере: на стыке лет они разойдутся, это ожидаемо */}
        <span className="whitespace-nowrap" suppressHydrationWarning>© {new Date().getFullYear()} Юлия Радионова</span>
        <a href="/privacy" className="whitespace-nowrap underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">
          Политика персональных данных
        </a>
        <a href="/cookies" className="whitespace-nowrap underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">
          Политика cookie
        </a>
      </footer>
    </div>
  );
}
