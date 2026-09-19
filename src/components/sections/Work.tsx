import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const stages = [
  {
    number: "I",
    title: "Стратегическая сессия",
    description: "Разовый разбор конкретной ситуации, в которой нужно принять решение.",
  },
  {
    number: "II",
    title: "Диагностическая работа",
    description: "Исследование проблемы, способа принятия решений и того, что мешает перейти к действию.",
  },
  {
    number: "III",
    title: "Сопровождение",
    description: "Работа с серией реальных управленческих ситуаций.",
  },
];

export default function Work() {
  return (
    <EditorialSection id="work" number="03" title="Работа">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
        {formatTypography("Формат зависит от задачи, работа строится вокруг реальных решений руководителя")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
        {stages.map((stage) => (
          <div key={stage.number} className="border-t border-rule pt-6 min-w-0">
            <span className="block font-serif text-2xl italic text-muted mb-4">
              {stage.number}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink break-words hyphens-auto">
              {formatTypography(stage.title)}
            </h3>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed">
              {formatTypography(stage.description)}
            </p>
          </div>
        ))}
      </div>
    </EditorialSection>
  );
}
