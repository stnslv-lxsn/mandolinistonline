import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const situations = [
  'Выбор между несколькими вариантами с высокой ценой ошибки',
  'Конфликт интересов внутри команды',
  'Решения в незнакомой области',
  'Переход из роли эксперта в управленческую роль',
  'Привычные способы управления перестают работать',
  'Перестройка бизнеса при изменении условий',
  'Ограничение уже не в знаниях, а в способности действовать при неопределённости',
];

export default function Products() {
  return (
    <EditorialSection id="expertise" number="02" title="Запросы">
      <div className="max-w-3xl">
        {situations.map((situation, index) => (
          <div key={situation} className="border-t border-rule py-5 md:py-6 flex gap-5 md:gap-8 items-baseline min-w-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-xl md:text-2xl leading-snug text-ink text-pretty">
              {formatTypography(situation)}
            </p>
          </div>
        ))}
        <div className="border-t border-rule" aria-hidden="true" />
        <p className="mt-10 text-sm md:text-base text-muted leading-relaxed max-w-2xl">
          {formatTypography('Задача работы — увидеть ситуацию целиком, определить ограничения и варианты действий и принять решение, соответствующее реальным условиям.')}
        </p>
      </div>
    </EditorialSection>
  );
}
