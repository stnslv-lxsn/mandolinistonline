import EditorialSection from '@/components/EditorialSection';
import MarkLayer from '@/components/MarkLayer';
import { marked } from '@/lib/marked';
import { formatTypography } from '@/lib/typography';

// Факты крупными цифрами: глаз цепляется за число, а не продирается через абзац.
// Все три числа — из прежнего текста раздела, новых данных здесь нет
const facts = [
  { figure: '20 лет', label: 'в управлении и бизнесе' },
  { figure: '6 лет', label: 'в e-commerce, на маркетплейсах' },
  { figure: 'Более 900 млн', label: 'рублей в год — оборот направления продаж' },
];

export default function About() {
  return (
    <EditorialSection id="profile" number="01" title="Обо мне">
      {/* Журнальная цитата с пометками от руки: слой пометок внутри заголовка,
          чтобы ехать вместе с ним в анимации .reveal */}
      <h2 className="reveal relative font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-10 max-w-4xl text-ink text-balance">
        {marked('Управленческую реальность я знаю изнутри: решать приходится при неполной информации и высокой цене ошибки.', [
          { phrase: 'изнутри', kind: 'underline' },
          { phrase: 'высокой цене ошибки', kind: 'circle' },
        ])}
        <MarkLayer />
      </h2>

      <dl className="reveal mb-8 grid max-w-4xl grid-cols-1 gap-6 border-t border-rule pt-6 md:grid-cols-3 md:gap-10">
        {facts.map((fact) => (
          <div key={fact.figure} className="min-w-0">
            <dt className="mb-2 font-serif text-3xl leading-none text-ink md:text-4xl">{formatTypography(fact.figure)}</dt>
            <dd className="text-sm leading-snug text-muted font-light text-balance md:text-base">{formatTypography(fact.label)}</dd>
          </div>
        ))}
      </dl>

      <p className="reveal max-w-2xl text-base leading-relaxed text-muted font-light">
        {formatTypography('Психологическое образование: краткосрочные и доказательные методы, коучинг, практика консультирования. Интересует, что происходит с руководителем в момент сложного решения.')}
      </p>
    </EditorialSection>
  );
}
