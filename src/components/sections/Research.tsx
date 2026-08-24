import Balancer from 'react-wrap-balancer';
import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

// TODO: заменить заглушки на реальные исследования, публикации и ссылки
const topics = [
  {
    year: "2025",
    title: "Управленческий цикл в компаниях после быстрого роста",
    description: "Что происходит с процессами принятия решений, когда команда вырастает быстрее, чем управленческая рамка.",
  },
  {
    year: "2024",
    title: "Выгорание первых лиц и цена отложенных решений",
    description: "Наблюдения из практики менторства: как состояние собственника проявляется в структуре компании.",
  },
];

export default function Research() {
  return (
    <EditorialSection id="research" number="04" title="Исследования">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink">
        <Balancer>
          {formatTypography("Над чем я работаю помимо консультирования")}
        </Balancer>
      </h2>

      <div className="flex flex-col max-w-4xl">
        {topics.map((topic) => (
          <article key={topic.title} className="border-t border-black/10 py-8 flex flex-col md:flex-row gap-4 md:gap-12 min-w-0">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted md:w-24 shrink-0 md:pt-2">
              {topic.year}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink break-words hyphens-auto">
                <Balancer>{formatTypography(topic.title)}</Balancer>
              </h3>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                {formatTypography(topic.description)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}
