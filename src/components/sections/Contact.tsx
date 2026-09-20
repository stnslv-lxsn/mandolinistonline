import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const email = 'YuliaRadionova2026@yandex.ru';

const socials = [
  { label: 'ВКонтакте', href: 'https://vk.ru/yulsun_vk' },
  { label: 'Instagram', href: 'https://www.instagram.com/yulsun__' },
];

export default function Contact() {
  return (
    <EditorialSection id="contact" number="05" title="Контакты" className="pb-32">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 text-balance">
          {formatTypography("Обсудить вашу ситуацию")}
        </h2>
        <p className="text-muted mb-12 font-light text-lg">
          {formatTypography("Напишите, чтобы договориться о первой встрече. На ней разберём вашу ситуацию и определим формат работы.")}
        </p>
        <a href={`mailto:${email}`} className="text-2xl md:text-3xl font-serif text-ink hover:text-muted transition-colors border-b border-ink pb-2 break-all">
          {email}
        </a>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent pb-1 transition-colors hover:text-ink hover:border-ink whitespace-nowrap"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}
