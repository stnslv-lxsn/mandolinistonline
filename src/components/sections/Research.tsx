import EditorialSection from '@/components/EditorialSection';
import VideoEmbed from '@/components/VideoEmbed';
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

// Выпуски подкаста «Экспертная карта Дона». Основной плеер — VK: YouTube в России
// замедляют, и видео у части посетителей просто не запустится. Ссылка на YouTube — рядом
const podcast = [
  {
    title: "Наши решения — результат свободного выбора или часть генетической программы?",
    poster: "/podcast-1",
    vkOid: "-211868881",
    vkId: "456239240",
    youtube: "https://www.youtube.com/watch?v=QjMsYxC9lzU",
  },
  {
    title: "Команда решает. И чем живёт рынок сегодня",
    poster: "/podcast-2",
    vkOid: "-211868881",
    vkId: "456239308",
    youtube: "https://www.youtube.com/watch?v=8CgzbH8RTMw",
  },
  {
    title: "Бизнес никогда не врёт",
    poster: "/podcast-3",
    vkOid: "-211868881",
    vkId: "456239193",
    youtube: "https://www.youtube.com/watch?v=5o0VZch6SMM",
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
        <div className="min-w-0 w-full">
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-2xl mb-8">
            {formatTypography("Выпуски «Экспертной карты Дона» — разговор о решениях, команде и рынке.")}
          </p>

          {/* Не больше двух колонок: блок стоит внутри колонки с отступом под подпись,
              и на трёх карточка сжимается до 268 px даже на экране 1536 px */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
            {podcast.map((episode) => {
              const title = formatTypography(episode.title);
              return (
                <article key={episode.vkId} className="min-w-0">
                  <VideoEmbed title={title} poster={episode.poster} vkOid={episode.vkOid} vkId={episode.vkId} />
                  <h3 className="font-serif text-xl md:text-2xl mt-5 mb-3 text-ink text-balance">
                    {title}
                  </h3>
                  <a
                    href={episode.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-ink"
                  >
                    Смотреть на YouTube
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}
