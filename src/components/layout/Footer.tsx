import { author, contactEmail, siteMeta } from '@/content/site';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto border-t border-black/10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted">
          {siteMeta.name} — {siteMeta.role}
        </span>
        <a href={`mailto:${contactEmail}`} className="text-sm text-muted hover:text-ink transition-colors break-all">
          {contactEmail}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted/80">
        <span>© {author.year} {siteMeta.name}. Все права защищены</span>
        <span>{author.role} — {author.name}</span>
      </div>
    </footer>
  );
}
