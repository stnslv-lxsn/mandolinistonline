import EditorialSection from '@/components/EditorialSection';
import { formatTypography } from '@/lib/typography';

// TODO: заменить на реальный контакт Юлии (почта или Telegram)
const email = 'hello@example.com';

export default function Contact() {
  return (
    <EditorialSection id="contact" number="04" title="Контакты" className="pb-32">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 text-balance">
          {formatTypography("Готовы обсудить вашу задачу?")}
        </h2>
        <p className="text-muted mb-12 font-light text-lg text-pretty">
          {formatTypography("Напишите мне, чтобы запланировать ознакомительную встречу. Обсудим текущую ситуацию и определим формат работы.")}
        </p>
        <a href={`mailto:${email}`} className="text-2xl md:text-3xl font-serif text-ink hover:text-muted transition-colors border-b border-ink pb-2 break-all">
          {email}
        </a>
      </div>
    </EditorialSection>
  );
}
