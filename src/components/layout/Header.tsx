'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { nav, siteMeta } from '@/content/site';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Обновляем стейт только при переходе через границу в 50px, а не на каждый скролл
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && lastScrollY <= 50) {
        setIsScrolled(true);
      } else if (currentScrollY <= 50 && lastScrollY > 50) {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled && !mobileMenuOpen ? 'bg-paper/90 backdrop-blur-md border-b border-black/5 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className={cn(
        'px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300',
        isScrolled && !mobileMenuOpen ? 'py-4' : ''
      )}>
        <span className="font-serif text-lg md:text-2xl font-bold tracking-wide relative z-50 whitespace-nowrap">
          {siteMeta.name.toUpperCase()}
        </span>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-ink transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-ink hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-ink relative z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* inert убирает скрытое меню и из a11y-дерева, и из таб-порядка */}
      <div
        className={cn(
          // без w-screen: 100vw включает ширину скроллбара и даёт горизонтальный скролл
          'fixed inset-0 h-[100dvh] bg-paper flex flex-col justify-center items-center transition-all duration-500 ease-in-out lg:hidden',
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
        inert={!mobileMenuOpen}
      >
        <nav className="flex flex-col items-center space-y-8 text-lg font-medium uppercase tracking-[0.2em]">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-forest transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
