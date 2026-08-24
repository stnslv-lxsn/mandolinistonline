import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';
import { cn } from '@/lib/utils';

const facts = [
  {
    value: "20+",
    unit: "лет",
    caption: "управленческого опыта",
    numeric: true,
  },
  {
    value: "900+ млн ₽",
    unit: "в год",
    caption: "оборот канала сбыта на маркетплейсах, которым управляла в найме",
    numeric: true,
  },
  {
    value: "Психология + управленческий опыт + коучинг",
    caption: "три компонента, помогающие в работе с предпринимателями",
    numeric: false,
  },
  {
    value: "Аспирантура",
    caption: "исследовательская работа",
    numeric: false,
  },
];

export default function Facts() {
  return (
    <EditorialSection id="facts" number="03" title="Опыт в фактах">
      {/* Ровный ряд равных по ширине фактов: вес распределяется по горизонтали,
          а не собирается в диагональ, как в сетке 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-12">
        {facts.map((fact) => (
          <div key={fact.value} className="border-t border-black/10 pt-6 flex flex-col min-w-0">
            {/* Общая высота верхнего блока ставит все подписи на одну линию */}
            <div className="flex items-end min-h-[3.5rem] lg:min-h-[5rem] mb-4">
              <p className={cn(
                "font-serif text-ink min-w-0",
                fact.numeric
                  ? "text-4xl lg:text-5xl leading-none flex items-baseline gap-3 flex-wrap"
                  : "italic text-lg lg:text-xl leading-snug text-balance"
              )}>
                <span className="break-words">{fact.value}</span>
                {fact.unit && (
                  <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                    {fact.unit}
                  </span>
                )}
              </p>
            </div>
            <p className="text-sm text-muted font-light leading-relaxed text-pretty">
              {formatTypography(fact.caption)}
            </p>
          </div>
        ))}
      </div>
    </EditorialSection>
  );
}
