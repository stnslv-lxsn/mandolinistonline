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
| `npm run images` | Пережимает портреты из `assets/` в AVIF/WebP/JPEG в `public/` |
| `npm run cutout` | Вырезает фигуру из портрета в `assets/cutout.png` (нужен разовый `npm i -D @imgly/background-removal-node`) |

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

## Варианты дизайна

Пока идёт выбор направления, в проекте живут три макета на одном контенте. Переключаться между ними можно плашкой I / II / III внизу экрана.

| Путь | Вариант | Характер |
|---|---|---|
| `/` | I — Editorial | Светлый, кремовый фон, круглый портрет, антиква |
| `/noir` | II — Ночь | Тёмный, полноэкранный кадр, латунный акцент |
| `/studio` | III — Досье | Документ: гротеск, линейки, таблицы, кирпичный акцент |

Варианты II и III закрыты от индексации (`robots: { index: false }`). Когда направление выберут, лишние макеты и `VariantSwitcher` нужно удалить.

## Изображения

Исходники портретов лежат в `assets/` — вне `public/`, чтобы оригиналы не уезжали на хостинг. Полный набор снимков от клиента хранится локально в папке «Фото (Исходники)» и в репозиторий не попадает (см. `.gitignore`).

Кадры описаны в `images` внутри [site.ts](src/content/site.ts), файлы генерирует `npm run images`, отдаёт их компонент [Picture](src/components/ui/Picture.tsx) — AVIF, затем WebP, затем JPEG (для картинок с прозрачностью — PNG).

Для сцены варианта IV фигура нужна без фона: её готовит `npm run cutout` и кладёт в `assets/cutout.png`, дальше `npm run images` собирает из неё `figure-*`. Результат закоммичен, так что на хостинге модель сегментации не нужна.

## Что ещё не сделано

- в контактах стоит заглушка `hello@example.com`;
- домен с reg.ru не подключён, хостинг — Cloudflare Pages.
