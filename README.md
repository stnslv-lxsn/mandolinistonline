# mandolinistonline

Одностраничный сайт-визитка Юлии Радионовой, консультанта по развитию бизнес-вертикали.

Статический сайт на Next.js (App Router) с экспортом в HTML — `output: 'export'` в [next.config.ts](next.config.ts). Хостится на Cloudflare Pages: пуш в `master` уходит в production, любая другая ветка собирается как preview.

## Разработка

```bash
npm install
npm run dev
```

| Команда | Что делает |
|---|---|
| `npm run dev` | Дев-сервер на http://localhost:3000 |
| `npm run build` | Продакшн-сборка и статический экспорт в `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов без сборки |

Не запускайте `npm run build` одновременно с `npm run dev`: обе команды пишут в `.next` и мешают друг другу.

## Структура

```
src/
  app/            маршрут, root layout, глобальные стили, robots.ts, sitemap.ts
  components/
    layout/       каркас страницы: Header, Footer, SiteShell
    sections/     секции лендинга: Hero, Request, About, Facts, Contact
    ui/           переиспользуемые примитивы: EditorialSection
  content/        весь текст сайта — site.ts
  lib/            утилиты: cn, типографика
public/           статика: фотография
```

**Текст правится в [src/content/site.ts](src/content/site.ts)**, а не в компонентах. Там же лежат контактная почта, ссылки меню и данные секций.

Цвета заданы токенами в [globals.css](src/app/globals.css) и доступны как обычные классы Tailwind: `bg-paper`, `text-ink`, `text-muted`, `bg-forest`, `bg-forest-dark`. Хардкодить hex-значения в компонентах не нужно.

Русская типографика (неразрывные пробелы после предлогов) — [src/lib/typography.ts](src/lib/typography.ts), функция `formatTypography`.

## Что ещё не сделано

- в контактах стоит заглушка `hello@example.com`;
- `public/photo.jpg` — временное изображение, а не портрет Юлии.
