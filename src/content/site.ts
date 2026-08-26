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

/** Подпись разработчика в футере */
export const author = {
  name: 'example',
  role: 'Разработка и вёрстка',
  year: 2026,
};

export interface ImageSet {
  /** Базовое имя файлов в public: <name>-<width>.<ext> */
  name: string;
  widths: number[];
  /** Ширина / высота кадра */
  ratio: number;
  alt: string;
}

/**
 * Кадры портрета под разные раскладки. Исходники лежат в assets/ (вне public,
 * в сборку не идут), сами файлы генерирует `npm run images`.
 */
export const images = {
  /** Квадрат под круглый портрет */
  square: {
    name: 'portrait-square',
    widths: [448, 640, 896],
    ratio: 1,
    alt: 'Юлия Радионова',
  },
  /** Вертикальный кадр у панорамного окна — под полноэкранный первый экран */
  window: {
    name: 'portrait-window',
    widths: [640, 1000],
    ratio: 2 / 3,
    alt: 'Юлия Радионова у панорамного окна',
  },
  /** Студийный деловой портрет */
  studio: {
    name: 'portrait-studio',
    widths: [520, 800, 1100],
    ratio: 3 / 4,
    alt: 'Юлия Радионова',
  },
  /** Горизонтальный кадр для широких врезок */
  wide: {
    name: 'portrait-wide',
    widths: [900, 1440],
    ratio: 16 / 9,
    alt: 'Юлия Радионова',
  },
  /** Тёплый крупный портрет */
  warm: {
    name: 'portrait-warm',
    widths: [480, 760],
    ratio: 4 / 5,
    alt: 'Юлия Радионова',
  },
} satisfies Record<string, ImageSet>;

// Для превью ссылки: JPEG понимают все парсеры, AVIF — не все
export const ogImage = '/portrait-square-896.jpg';

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
