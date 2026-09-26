import EditorialSection from '@/components/EditorialSection';
import FormatMap from '@/components/FormatMap';
import MarkLayer from '@/components/MarkLayer';
import { marked } from '@/lib/marked';
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

// Оси карты взяты из описаний форматов: одно решение или серия, ясно или нет, что мешает
const axes = {
  top: 'неясно, что мешает',
  bottom: 'ясно, что мешает',
  left: 'одно решение',
  right: 'серия решений',
};

export default function Work() {
  return (
    <EditorialSection id="work" number="03" title="Работа">
      <h2 className="reveal relative font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-10 max-w-4xl text-ink text-balance">
        {marked('Формат зависит от задачи, работа строится вокруг реальных решений руководителя', [
          { phrase: 'реальных решений', kind: 'underline' },
        ])}
        <MarkLayer />
      </h2>

      {/* Типограф здесь, на сервере: FormatMap клиентский и получает готовые строки */}
      <FormatMap
        stages={stages.map((stage) => ({
          number: stage.number,
          title: formatTypography(stage.title),
          description: formatTypography(stage.description),
        }))}
        prompt={formatTypography('Где вы сейчас? Поставьте точку на карте, и подходящий формат подсветится.')}
        axes={{
          top: formatTypography(axes.top),
          bottom: formatTypography(axes.bottom),
          left: formatTypography(axes.left),
          right: formatTypography(axes.right),
        }}
        cta={formatTypography('Обсудить этот формат')}
        fits={formatTypography('Подходит:')}
        markerLabel={formatTypography('Точка на карте. Двигайте стрелками')}
      />
    </EditorialSection>
  );
}
