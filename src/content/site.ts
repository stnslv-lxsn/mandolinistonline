/**
 * Весь текст сайта собран здесь, чтобы правки копирайта не требовали
 * правок вёрстки. Компоненты берут данные отсюда и только рисуют их.
 */

export const siteMeta = {
  url: 'https://mandolinistonline.pages.dev',
  name: 'Юлия Радионова',
  role: 'Консультант по развитию бизнес-вертикали',
  description:
    'Работаю с предпринимателями, руководителями и экспертами, которые развивают новое направление или переходят на новый масштаб.',
};

// TODO: заменить на реальный контакт Юлии (почта или Telegram)
export const contactEmail = 'hello@example.com';

/**
 * TODO: заменить на портрет Юлии, сейчас лежит временное изображение.
 * Исходник — assets/photo.jpg (вне public, в сборку не идёт), варианты
 * для отдачи генерирует `npm run images`.
 */
export const portrait = {
  alt: 'Юлия Радионова',
  sizes: '(max-width: 768px) 256px, (max-width: 1024px) 320px, 448px',
  avif: '/photo-448.avif 448w, /photo-600.avif 600w',
  webp: '/photo-448.webp 448w, /photo-600.webp 600w',
  jpeg: '/photo-448.jpg 448w, /photo-600.jpg 600w',
  fallback: '/photo-448.jpg',
  // Для превью ссылки: JPEG понимают все парсеры, AVIF — не все
  ogImage: '/photo-600.jpg',
};

export const ctaLabel = 'Обсудить задачу';

export const nav = [
  { name: 'Запросы', href: '#request' },
  { name: 'Обо мне', href: '#profile' },
  { name: 'Опыт', href: '#facts' },
  { name: 'Контакты', href: '#contact' },
];

export const hero = {
  role: siteMeta.role,
  firstName: 'Юлия',
  lastName: 'Радионова',
  lead: siteMeta.description,
};

export const requestSection = {
  id: 'request',
  number: '01',
  title: 'С чем обращаются',
  moments: [
    'Прежних способов управления уже недостаточно',
    'Важные решения откладываются',
    'Ключевые бизнес-процессы держатся на одном человеке',
  ],
};

export const aboutSection = {
  id: 'profile',
  number: '02',
  title: 'Обо мне',
  headline: 'Более 20 лет в управлении и бизнесе',
  columns: [
    'Опыт развития коммерческих направлений и управления командами.',
    'Психологическое образование, профессиональная подготовка в консультировании и наставничестве. Сейчас продолжаю исследовательскую работу в аспирантуре.',
  ],
};

export const factsSection = {
  id: 'facts',
  number: '03',
  title: 'Опыт в фактах',
  // Порядок подобран так, чтобы тяжёлые блоки шли по ходу чтения —
  // слева сверху и справа снизу, — а не наперекор ему
  numbers: [
    {
      value: '900+ млн ₽',
      unit: 'в год',
      caption: 'оборот канала сбыта на маркетплейсах, которым управляла в найме',
    },
    {
      value: '20+',
      unit: 'лет',
      caption: 'управленческого опыта',
    },
  ],
  qualities: [
    {
      value: 'Аспирантура',
      caption: 'исследовательская работа',
    },
    {
      value: 'Психология + управленческий опыт + коучинг',
      caption: 'три компонента, помогающие в работе с предпринимателями',
    },
  ],
};

export const contactSection = {
  id: 'contact',
  number: '04',
  title: 'Контакты',
  headline: 'Готовы обсудить вашу задачу?',
  text: 'Напишите мне, чтобы запланировать ознакомительную встречу. Обсудим текущую ситуацию и определим формат работы.',
};
