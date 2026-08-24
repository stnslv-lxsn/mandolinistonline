import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

export default function About() {
  return (
    <EditorialSection id="profile" number="02" title="Обо мне">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
        {formatTypography("Более 20 лет в управлении и бизнесе")}
      </h2>

      {/* Две колонки текста */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-muted max-w-4xl font-light text-pretty">
        <p>
          {formatTypography("Опыт развития коммерческих направлений и управления командами.")}
        </p>
        <p>
          {formatTypography("Психологическое образование, профессиональная подготовка в консультировании и наставничестве. Сейчас продолжаю исследовательскую работу в аспирантуре.")}
        </p>
      </div>
    </EditorialSection>
  );
}
