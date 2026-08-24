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
      {/* Промежутки держим умеренными: на md 12 колонок с большим gap
          съедают всю ширину, и колонки схлопываются в ноль */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12">

        {/* Левая колонка (Навигация/Заголовок) */}
        <div className="md:col-span-3 lg:col-span-2 min-w-0">
          <div className="md:sticky md:top-32 flex items-start gap-3 lg:gap-4 text-xs font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-muted mb-8 md:mb-0">
            <span className="w-6 h-[1px] bg-muted/50 shrink-0 mt-[0.7em]"></span>
            <span className="min-w-0 break-words">{number} / {title}</span>
          </div>
        </div>

        {/* Правая колонка (Контент) */}
        <div className="md:col-span-9 lg:col-span-10 min-w-0">
          {children}
        </div>

      </div>
    </section>
  );
}
