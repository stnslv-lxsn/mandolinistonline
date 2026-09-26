import { formatTypography } from '@/lib/typography';

export default function Hero() {
  // Первый экран — как в версии Егора (dev/egordenisov4-cmyk, 96265b9): слева портрет
  // на 45% ширины, справа текст на 55%. Тонкая рамка цвета акцента — только вокруг
  // текстовой части: сверху, справа и снизу, со стороны фото её нет, по высоте она
  // равна снимку. Пустое место справа оставлено намеренно.
  // На телефоне фото сверху на 46% высоты экрана, текст в рамке под ним.
  //
  // Без анимаций появления, как у Егора.
  //
  // Пропорции карточки 1539/1109. Высота — от высоты окна, но не больше, чем позволяет
  // ширина: иначе на планшете (768–1024 px) карточка вылезала бы за край экрана
  return (
    <section className="relative flex min-h-svh w-full px-4 pt-20 pb-12 md:items-center md:justify-center md:px-12 md:py-28">
      <div className="relative grid w-full grid-cols-1 overflow-hidden bg-paper md:aspect-[1539/1109] md:h-[min(calc(100svh-14rem),calc((100vw-6rem)*0.7206),793px)] md:w-auto md:max-w-[1100px] md:grid-cols-[45%_55%]">

        {/* Портрет — файл public/portrait.webp из версии Егора без изменений (1331x2000) */}
        <div className="relative h-[46svh] md:h-full">
          <img
            src="/portrait.webp"
            alt="Юлия Радионова"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        {/* Текст в рамке */}
        <div className="flex flex-col justify-center gap-6 border border-forest px-6 py-10 md:border-l-0 md:py-0 md:pl-20 md:pr-12">
          <p className="font-serif italic text-sm md:text-xl text-muted">
            {formatTypography('Бизнес-консультант, исследователь')}
          </p>
          <h1 className="font-serif text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] md:leading-[0.95] tracking-tight text-ink">
            {formatTypography('Юлия Радионова')}
          </h1>
          <p className="font-sans text-[15px] md:text-[17px] text-muted leading-relaxed text-balance">
            {formatTypography('Работаю с собственниками и руководителями в ситуациях, где нет очевидно правильного решения и цена ошибки высока.')}
          </p>
          <a
            href="#contact"
            className="w-fit border-b border-ink/40 pb-1 font-sans text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
          >
            {formatTypography('Обсудить задачу')}
          </a>
        </div>

      </div>
    </section>
  );
}
