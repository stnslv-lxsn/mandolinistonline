import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

const email = 'YuliaRadionova2026@yandex.ru';
const [emailName, emailDomain] = email.split('@');

const socials = [
  { label: 'ВКонтакте', href: 'https://vk.ru/yulsun_vk' },
];

export default function Contact() {
  return (
    <EditorialSection id="contact" number="05" title="Контакты" className="pb-24">
      <div className="max-w-2xl">
        <h2 className="reveal font-serif text-4xl md:text-5xl mb-6 text-balance">
          {formatTypography("Обсудить вашу ситуацию")}
        </h2>
        <p className="reveal text-muted mb-6 font-light text-lg">
          {formatTypography("Напишите, чтобы договориться о первой встрече. На ней разберём вашу ситуацию и определим формат работы.")}
        </p>
        {/* На узком экране адрес не помещается в одну строку кеглем 24px, а break-all рвал его
            посреди домена. Кегль меньше до sm, а единственное разрешённое место переноса —
            перед «@»: домен остаётся целым */}
        <a href={`mailto:${email}`} className="text-xl md:text-2xl font-serif text-ink hover:text-muted transition-colors border-b border-rule hover:border-ink pb-1 break-words">
          {emailName}<wbr />@{emailDomain}
        </a>

        <div className="reveal mt-6 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              // Подчёркивание как у пунктов меню в шапке: растёт из нуля за 300 мс
              className="transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap hover:text-ink after:bg-ink"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}
