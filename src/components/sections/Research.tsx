import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const topics = [
  {
    year: "Исследование",
    title: "Качество управленческих решений",
    description: "Почему при наличии знаний и опыта человек откладывает действие, ищет подтверждение у других или возвращается к привычному сценарию. Особенно когда ограничением становится не компетенция, а цена возможной ошибки.",
  },
  {
    year: "Диссертация",
    title: "Потребительское поведение на маркетплейсах",
    description: "Тема научной работы.",
  },
];

export default function Research() {
  return (
    <EditorialSection id="research" number="04" title="Исследования">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink">
        <Balancer>
          {formatTypography("Что происходит с руководителем в момент сложного решения")}
        </Balancer>
      </h2>

      <div className="flex flex-col max-w-4xl">
        {topics.map((topic) => (
          <article key={topic.title} className="border-t border-rule py-8 flex flex-col md:flex-row gap-4 md:gap-12 min-w-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-muted md:w-40 shrink-0 whitespace-nowrap md:pt-[0.45rem]">
              {topic.year}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink break-words hyphens-auto max-w-2xl">
                <Balancer>{formatTypography(topic.title)}</Balancer>
              </h3>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-2xl">
                {formatTypography(topic.description)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}
