import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const situations = [
  'Нужно выбрать, а цена ошибки кажется слишком высокой',
  'В команде каждый стоит на своём, и договориться не получается',
  'Приходится решать там, где у вас пока нет опыта',
  'Решение давно назрело, но вы снова его откладываете',
  'То, что раньше работало, вдруг перестало работать',
  'Условия изменились, и бизнес нужно перестраивать',
  'Знаний хватает, но трудно сделать шаг, когда впереди неизвестность',
];

export default function Products() {
  return (
    <EditorialSection id="expertise" number="02" title="Запросы">
      <div className="max-w-4xl">
        {situations.map((situation, index) => (
          <div key={situation} className="border-t border-rule py-4 md:py-5 flex gap-5 md:gap-8 items-baseline min-w-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-ink text-pretty">
              {formatTypography(situation)}
            </p>
          </div>
        ))}
        <div className="border-t border-rule" aria-hidden="true" />
        <p className="mt-6 text-sm md:text-base text-muted leading-relaxed max-w-2xl">
          {formatTypography('Вместе посмотрим на ситуацию целиком: что вас сдерживает, какие есть варианты и какое решение подойдёт именно вашим условиям.')}
        </p>
      </div>
    </EditorialSection>
  );
}
