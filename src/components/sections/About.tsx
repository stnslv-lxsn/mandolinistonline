import EditorialSection from '@/components/ui/EditorialSection';
import { aboutSection } from '@/content/site';
import { formatTypography } from '@/lib/typography';

export default function About() {
  const { id, number, title, headline, columns } = aboutSection;

  return (
    <EditorialSection id={id} number={number} title={title}>
      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-16 max-w-4xl text-ink text-balance">
        {formatTypography(headline)}
      </h3>

      {/* Две колонки текста */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base leading-relaxed text-muted max-w-4xl font-light text-pretty">
        {columns.map((column) => (
          <p key={column}>{formatTypography(column)}</p>
        ))}
      </div>
    </EditorialSection>
  );
}
