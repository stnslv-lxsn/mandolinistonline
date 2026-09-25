import EditorialSection from '@/components/EditorialSection';
import { contactEmail as email } from '@/lib/site';
import { formatTypography } from '@/lib/typography';

const [emailName, emailDomain] = email.split('@');

// Ссылки контактов: акцентный синий; поведение при наведении — .link в globals.css
const contactLink = 'link text-forest';

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
        {/* Почта и соцсети в один ряд, одним стилем: синие, подчёркивание при наведении.
            Шрифт — гротеск, как во всём тексте сайта. На узком экране адрес не помещается в строку, а break-all рвал его
            посреди домена. Кегль меньше до md, а единственное разрешённое место переноса —
            перед «@»: домен остаётся целым */}
        <div className="reveal flex flex-wrap items-baseline gap-x-8 gap-y-2 font-sans text-lg md:text-xl">
          <a href={`mailto:${email}`} className={`${contactLink} break-words`}>
            {emailName}<wbr />@{emailDomain}
          </a>
          {socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className={`${contactLink} whitespace-nowrap`}>
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}
