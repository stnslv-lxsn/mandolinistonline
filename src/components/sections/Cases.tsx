import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

// Место под реальные разборы. Кейсы НЕ придумывать — заполняется по факту.
// Пока массив пуст, раздел не отрисовывается и нумерация остальных не сбивается.
const cases: { title: string; context: string; task: string; approach: string; result: string }[] = [];

const parts = [
  { key: 'context', label: 'Контекст' },
  { key: 'task', label: 'Задача' },
  { key: 'approach', label: 'Подход' },
  { key: 'result', label: 'Результат' },
] as const;

export default function Cases() {
  if (cases.length === 0) return null;

  return (
    <EditorialSection id="cases" number="04" title="Разборы">
      <div className="max-w-4xl">
        {cases.map((item) => (
          <article key={item.title} className="border-t border-rule py-10">
            <h3 className="font-serif text-2xl md:text-3xl mb-8 text-ink text-pretty">
              {formatTypography(item.title)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {parts.map((part) => (
                <div key={part.key}>
                  <span className="block font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted mb-3">
                    {part.label}
                  </span>
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {formatTypography(item[part.key])}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
        <div className="border-t border-rule" aria-hidden="true" />
      </div>
    </EditorialSection>
  );
}
