import React, { ReactNode, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Утилита для объединения классов
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Обо мне', href: '#profile' },
    { name: 'Авторские продукты', href: '#expertise' },
    { name: 'Работа', href: '#work' },
    { name: 'Исследования', href: '#research' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#222222] font-sans relative selection:bg-[#1D332D] selection:text-white">
      
      {/* 1. ВЕРХНЕЕ МЕНЮ (Sticky + Glassmorphism) */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled && !mobileMenuOpen ? "bg-[#F7F5F0]/90 backdrop-blur-md border-b border-black/5 shadow-sm" : "bg-transparent"
        )}
      >
        <div className={cn(
          "px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300",
          isScrolled && !mobileMenuOpen ? "py-4" : ""
        )}>
          <div className="font-serif text-2xl font-bold tracking-wide relative z-50">
            ЮЛИЯ
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#666666]">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-[#222222] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#222222] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap">
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#222222] relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={cn(
          "fixed inset-0 h-screen w-screen bg-[#F7F5F0] flex flex-col justify-center items-center transition-all duration-500 ease-in-out lg:hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <nav className="flex flex-col items-center space-y-8 text-lg font-medium uppercase tracking-[0.2em]">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1D332D] transition-colors"
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
          className="bg-[#1D332D] text-white py-8 px-4 rounded-l-md hover:bg-[#11201c] transition-colors flex items-center justify-center shadow-lg group duration-300 min-h-[200px]"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-medium whitespace-nowrap rotate-180">
            Обсудить задачу
          </span>
        </a>
      </div>

      {/* 3. ФИКСИРОВАННАЯ КНОПКА (Мобайл - Прилипает к низу) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a href="#contact" className="flex items-center justify-center w-full bg-[#1D332D] text-white py-4 rounded-md font-medium text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#11201c] transition-colors">
          Обсудить задачу
        </a>
      </div>
    </div>
  );
}