import React, { ReactNode } from 'react';

interface EditorialSectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function EditorialSection({ id, number, title, children, className = '' }: EditorialSectionProps) {
  return (
    <section id={id} className={`px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto border-t border-black/10 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Левая колонка (Навигация/Заголовок) */}
        <div className="md:col-span-3 lg:col-span-2">
          <div className="md:sticky md:top-32 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#666666] mb-8 md:mb-0">
            <span className="w-6 h-[1px] bg-[#666666]/50"></span>
            {number} / {title}
          </div>
        </div>

        {/* Правая колонка (Контент) */}
        <div className="md:col-span-9 lg:col-span-10">
          {children}
        </div>
        
      </div>
    </section>
  );
}