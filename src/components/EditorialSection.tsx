import React, { ReactNode } from 'react';
import { formatTypography } from '@/lib/typography';

interface EditorialSectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function EditorialSection({ id, number, title, children, className = '' }: EditorialSectionProps) {
  return (
    <section id={id} className={`px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto border-t border-rule ${className}`}>
      {/* Боковая колонка с подписью — только с xl. На планшете в двух двенадцатых
          не помещается даже «Исследования» (с линией ему нужно 180px), а при md
          одиннадцать промежутков gap-16 шире самого контейнера — подпись стоит над контентом */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16">

        {/* Левая колонка (Навигация/Заголовок) */}
        <div className="xl:col-span-2 shrink-0">
          <div className="xl:sticky xl:top-32 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-muted mb-8 xl:mb-0">
            <span className="w-6 h-[1px] bg-muted/50"></span>
            {/* Номер не отрывается от косой черты: «01 /» не распадается на две строки */}
            {number}&nbsp;/ {formatTypography(title)}
          </div>
        </div>

        {/* Правая колонка (Контент) */}
        <div className="xl:col-span-10 min-w-0">
          {children}
        </div>

      </div>
    </section>
  );
}
