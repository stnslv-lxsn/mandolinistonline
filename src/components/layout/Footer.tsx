import { contactEmail, siteMeta } from '@/content/site';

export default function Footer() {
  // Сайт статический: год вычисляется на сборке и обновится при следующем деплое
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted">
        {siteMeta.name} — {siteMeta.role}
      </span>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
        <a href={`mailto:${contactEmail}`} className="text-sm text-muted hover:text-ink transition-colors break-all">
          {contactEmail}
        </a>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">© {year}</span>
      </div>
    </footer>
  );
}
