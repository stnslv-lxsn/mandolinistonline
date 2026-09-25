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
    // Без линии между разделами: внутри «Запросов» и «Проектов» свои линии, и вместе
    // они путали, где кончается раздел. Разделы отделяет отступ и подпись «01 / …»
    <section id={id} className={`px-6 md:px-12 py-16 md:py-20 scroll-mt-8 max-w-[1400px] mx-auto ${className}`}>
      {/* Боковая колонка с подписью — только с xl. На планшете в двух двенадцатых
          не помещается даже «Исследования» (с линией ему нужно 180px), а при md
          одиннадцать промежутков gap-16 шире самого контейнера — подпись стоит над контентом */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16">

        {/* Левая колонка (Навигация/Заголовок) */}
        <div className="xl:col-span-2 shrink-0">
          <div className="reveal xl:sticky xl:top-32 flex items-center gap-4 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-muted mb-4 xl:mb-0">
            <span className="w-6 h-[1px] shrink-0 bg-muted/50"></span>
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
