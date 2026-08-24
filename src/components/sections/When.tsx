import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const moments = [
  "Прежних способов управления уже недостаточно",
  "Важные решения откладываются",
  "Ключевые бизнес-процессы держатся на одном человеке",
];

export default function When() {
  return (
    <EditorialSection id="when" number="01" title="Когда приходят">
      <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
        {formatTypography("Обычно работа начинается в один из таких моментов.")}
      </p>

      <div className="flex flex-col max-w-4xl">
        {moments.map((moment, index) => (
          <div key={moment} className="border-t border-black/10 py-8 flex gap-6 md:gap-12 min-w-0">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted shrink-0 pt-2 md:pt-3">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-ink break-words hyphens-auto text-balance">
              {formatTypography(moment)}
            </p>
          </div>
        ))}
      </div>
    </EditorialSection>
  );
}
