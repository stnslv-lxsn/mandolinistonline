'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: 'Запросы', href: '#request' },
  { name: 'Обо мне', href: '#profile' },
  { name: 'Опыт', href: '#facts' },
  { name: 'Контакты', href: '#contact' },
];

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Оптимизация обработчика скролла: throttle/debounce не обязателен для простого boolean,
  // но лучше вызывать state update только если значение реально изменилось (уменьшает ререндеры)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Проверяем пересечение границы в 50px, обновляем стейт только при переходе
      if (currentScrollY > 50 && lastScrollY <= 50) {
        setIsScrolled(true);
      } else if (currentScrollY <= 50 && lastScrollY > 50) {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };

    // Инициализация при монтировании
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true }); // passive: true улучшает производительность скролла
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
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-forest selection:text-white">

      {/* 1. ВЕРХНЕЕ МЕНЮ (Sticky + Glassmorphism) */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled && !mobileMenuOpen ? "bg-paper/90 backdrop-blur-md border-b border-black/5 shadow-sm" : "bg-transparent"
        )}
      >
        <div className={cn(
          "px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300",
          isScrolled && !mobileMenuOpen ? "py-4" : ""
        )}>
          <div className="font-serif text-lg md:text-2xl font-bold tracking-wide relative z-50 whitespace-nowrap">
            ЮЛИЯ РАДИОНОВА
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-ink transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-ink hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap">
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-ink relative z-50 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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

      {/* Основной контент */}
      <main className="pb-32 md:pb-0">
        {children}
      </main>

      {/* 2. ФИКСИРОВАННАЯ КНОПКА (Десктоп - Справа посередине) */}
      <div className="hidden md:flex fixed top-1/2 right-0 -translate-y-1/2 z-40">
        <a
          href="#contact"
          className="bg-forest text-white py-8 px-4 rounded-l-md hover:bg-forest-dark transition-colors flex items-center justify-center shadow-lg group duration-300 min-h-[200px]"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-medium whitespace-nowrap rotate-180">
            Обсудить задачу
          </span>
        </a>
      </div>

      {/* 3. ФИКСИРОВАННАЯ КНОПКА (Мобайл - Прилипает к низу) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a href="#contact" className="flex items-center justify-center w-full bg-forest text-white py-4 rounded-md font-medium text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-forest-dark transition-colors">
          Обсудить задачу
        </a>
      </div>
    </div>
  );
}
