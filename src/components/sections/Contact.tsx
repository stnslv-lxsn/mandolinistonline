import EditorialSection from '@/components/ui/EditorialSection';
import { contactEmail, contactSection } from '@/content/site';
import { formatTypography } from '@/lib/typography';

export default function Contact() {
  const { id, number, title, headline, text } = contactSection;

  return (
    <EditorialSection id={id} number={number} title={title} className="pb-32">
      <div className="max-w-2xl">
        <h3 className="font-serif text-4xl md:text-5xl mb-8 text-balance">
          {formatTypography(headline)}
        </h3>
        <p className="text-muted mb-12 font-light text-lg text-pretty">
          {formatTypography(text)}
        </p>
        <a href={`mailto:${contactEmail}`} className="text-2xl md:text-3xl font-serif text-ink hover:text-muted transition-colors border-b border-ink pb-2 break-all">
          {contactEmail}
        </a>
      </div>
    </EditorialSection>
  );
}
