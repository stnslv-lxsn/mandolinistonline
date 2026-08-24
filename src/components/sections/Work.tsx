import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

// TODO: заменить заглушки на реальные этапы работы и кейсы
const stages = [
  {
    number: "I",
    title: "Диагностика",
    description: "Интервью с командой, разбор процессов и управленческих решений. На выходе — карта узких мест и приоритетов.",
  },
  {
    number: "II",
    title: "Проектирование",
    description: "Совместная выработка целевой модели: роли, зоны ответственности, ритм управления и метрики.",
  },
  {
    number: "III",
    title: "Внедрение",
    description: "Сопровождение изменений: работа с сопротивлением, поддержка руководителей, корректировка курса по ходу.",
  },
];

export default function Work() {
  return (
    <EditorialSection id="work" number="03" title="Работа">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink">
        <Balancer>
          {formatTypography("Как устроена совместная работа")}
        </Balancer>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
        {stages.map((stage) => (
          <div key={stage.number} className="border-t border-black/10 pt-6 min-w-0">
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
