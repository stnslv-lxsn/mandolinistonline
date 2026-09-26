import EditorialSection from '@/components/EditorialSection';
import LetterComposer, { type LetterSlot } from '@/components/LetterComposer';
import { contactEmail as email } from '@/lib/site';
import { formatTypography } from '@/lib/typography';

const [emailName, emailDomain] = email.split('@');

// Письмо из готовых фраз. Ситуации — те же, что в «Запросах», от первого лица.
// Порядок форматов важен: FormatMap в «Работе» подставляет их по номеру
// (0 — сессия, 1 — диагностика, 2 — сопровождение, 3 — диагностика и сопровождение)
const letter = {
  template: 'Юлия, добрый день.\nЯ {role}. Сейчас {situation}. Хочу обсудить {format}. Удобнее связаться {when}.',
  options: {
    role: ['собственник бизнеса', 'генеральный директор', 'руководитель направления', 'член команды управления'],
    situation: [
      'нужно выбрать, а цена ошибки кажется слишком высокой',
      'в команде каждый стоит на своём, и договориться не получается',
      'приходится решать там, где у меня пока нет опыта',
      'решение давно назрело, но я снова его откладываю',
      'то, что раньше работало, вдруг перестало работать',
      'условия изменились, и бизнес нужно перестраивать',
      'знаний хватает, но трудно сделать шаг, когда впереди неизвестность',
    ],
    format: ['стратегическую сессию', 'диагностическую работу', 'сопровождение', 'диагностику, а затем сопровождение', 'подходящий формат'],
    when: ['на этой неделе', 'в ближайшие две недели', 'в течение месяца'],
  } satisfies Record<LetterSlot, string[]>,
  captions: { role: 'Кто вы', situation: 'Что происходит', format: 'Какой формат', when: 'Когда удобно' } satisfies Record<LetterSlot, string>,
  initial: { role: 0, situation: 0, format: 4, when: 0 } satisfies Record<LetterSlot, number>,
};

const typeset = <T extends Record<string, string | string[]>>(record: T) =>
  Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, Array.isArray(value) ? value.map(formatTypography) : formatTypography(value)]),
  ) as T;

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
        <LetterComposer
          email={email}
          subject={formatTypography('Запрос на первую встречу')}
          template={formatTypography(letter.template)}
          options={typeset(letter.options)}
          captions={typeset(letter.captions)}
          initial={letter.initial}
          hint={formatTypography('Можно собрать письмо из готовых фраз: нажмите на подчёркнутые слова и выберите свои.')}
          labels={typeset({
            open: 'Открыть письмо',
            copy: 'Скопировать текст',
            copied: 'Текст скопирован',
            selected: 'Текст выделен, скопируйте его',
          })}
        />

        <p className="reveal mt-12 mb-3 text-sm text-muted">{formatTypography('Или напишите своими словами:')}</p>
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
