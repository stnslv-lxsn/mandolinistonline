import Link from 'next/link';
import EditorialSection from '@/components/EditorialSection';
import { podcast, podcastTitle } from '@/content/podcast';
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

// Якорь #research оставлен прежним: ссылку на раздел могли уже кому-то отправить
export default function Research() {
  return (
    <EditorialSection id="research" number="04" title="Проекты">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
        {formatTypography("Что происходит с руководителем в момент сложного решения")}
      </h2>

      <div className="flex flex-col max-w-4xl">
        {topics.map((topic) => (
          <article key={topic.title} className="border-t border-rule py-8 flex flex-col md:flex-row gap-4 md:gap-12 min-w-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-muted md:w-40 shrink-0 whitespace-nowrap md:pt-[0.45rem]">
              {topic.year}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink break-words hyphens-auto max-w-2xl text-balance">
                {formatTypography(topic.title)}
              </h3>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-2xl">
                {formatTypography(topic.description)}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Подкаст */}
      <div className="border-t border-rule pt-8 mt-16 flex flex-col md:flex-row gap-4 md:gap-12">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-muted md:w-40 shrink-0 whitespace-nowrap md:pt-[0.45rem]">
          Подкаст
        </span>
        {/* Плееры вынесены на отдельную страницу: на главной только ссылки */}
        <div className="min-w-0 w-full">
          <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink text-balance">
            {formatTypography(`«${podcastTitle}»`)}
          </h3>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-2xl mb-8">
            {formatTypography('Разговор о решениях, команде и рынке.')}
          </p>

          <ul className="flex flex-col max-w-2xl mb-8">
            {podcast.map((episode) => (
              <li key={episode.slug} className="border-t border-rule">
                <Link
                  href={`/podcast#${episode.slug}`}
                  className="block py-4 text-base md:text-lg text-muted font-light leading-snug transition-colors hover:text-ink"
                >
                  {formatTypography(episode.title)}
                </Link>
              </li>
            ))}
            <li className="border-t border-rule" aria-hidden="true" />
          </ul>

          <Link
            href="/podcast"
            className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-ink"
          >
            Смотреть выпуски
          </Link>
        </div>
      </div>
    </EditorialSection>
  );
}
