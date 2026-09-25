import Link from 'next/link';
import EditorialSection from '@/components/EditorialSection';
import { podcastHeading } from '@/content/podcast';
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
      <div className="flex flex-col max-w-5xl">
        {topics.map((topic) => (
          <article key={topic.title} className="reveal border-t border-rule py-5 flex flex-col md:flex-row gap-4 md:gap-12 min-w-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-muted md:w-40 shrink-0 whitespace-nowrap md:pt-[0.7rem]">
              {topic.year}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-3xl md:text-4xl mb-3 text-ink break-words hyphens-auto max-w-3xl text-balance">
                {formatTypography(topic.title)}
              </h3>
              <p className="text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl">
                {formatTypography(topic.description)}
              </p>
            </div>
          </article>
        ))}

        {/* Подкаст: на главной только тема и кнопка, выпуски и плееры — на /podcast */}
        <article className="reveal border-t border-rule py-5 flex flex-col md:flex-row gap-4 md:gap-12 min-w-0">
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-muted md:w-40 shrink-0 whitespace-nowrap md:pt-[0.7rem]">
            Подкасты
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-3xl md:text-4xl mb-3 text-ink break-words hyphens-auto max-w-3xl text-balance">
              {formatTypography(podcastHeading)}
            </h3>
            {/* Как описание у пунктов выше («Тема научной работы»): тем же шрифтом и цветом,
                ссылку выдаёт стрелка и подчёркивание при наведении. Мелким капсом она
                читалась как ещё одно название раздела, кнопкой — выбивалась из ряда */}
            <Link
              href="/podcast"
              className="group inline-flex items-center gap-2 text-base md:text-lg text-forest font-light leading-relaxed"
            >
              <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">Смотреть выпуски</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </article>
      </div>

    </EditorialSection>
  );
}
