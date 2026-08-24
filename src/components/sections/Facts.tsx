import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

// Числовые факты: значение крупно, единица измерения рядом мелким капсом.
// Порядок подобран так, чтобы тяжёлые блоки шли по ходу чтения — слева сверху
// и справа снизу, — а не наперекор ему
const numbers = [
  {
    value: "900+ млн ₽",
    unit: "в год",
    caption: "оборот канала сбыта на маркетплейсах, которым управляла в найме",
  },
  {
    value: "20+",
    unit: "лет",
    caption: "управленческого опыта",
  },
];

// Факты, которые не сводятся к цифре — тот же ритм, меньший кегль
const qualities = [
  {
    value: "Аспирантура",
    caption: "исследовательская работа",
  },
  {
    value: "Психология + управленческий опыт + коучинг",
    caption: "три компонента, помогающие в работе с предпринимателями",
  },
];

export default function Facts() {
  return (
    <EditorialSection id="facts" number="03" title="Опыт в фактах">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-12 md:mb-16">
        {numbers.map((fact) => (
          <div key={fact.value} className="border-t border-black/10 pt-6 min-w-0">
            <p className="font-serif text-5xl lg:text-7xl leading-none text-ink mb-4 flex items-baseline gap-3 flex-wrap">
              <span className="break-words">{fact.value}</span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
                {fact.unit}
              </span>
            </p>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-md text-pretty">
              {formatTypography(fact.caption)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {qualities.map((fact) => (
          <div key={fact.value} className="border-t border-black/10 pt-6 min-w-0">
            <p className="font-serif text-2xl md:text-3xl italic leading-snug text-ink mb-4 break-words hyphens-auto text-balance">
              {formatTypography(fact.value)}
            </p>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-md text-pretty">
              {formatTypography(fact.caption)}
            </p>
          </div>
        ))}
      </div>
    </EditorialSection>
  );
}
