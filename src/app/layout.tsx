import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import { siteUrl } from "@/lib/site";
import { formatTypography } from "@/lib/typography";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const title = formatTypography("Юлия Радионова | Бизнес-консультант");
const siteName = formatTypography("Юлия Радионова");

// Описание уходит и в превью ссылок в мессенджерах и соцсетях, поэтому тоже через типограф.
// Картинку превью Next берёт из opengraph-image.jpg рядом с этим файлом
const description = formatTypography("Работаю с собственниками и руководителями, которым важно разобраться в сложной ситуации и принять обоснованное решение.");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Время суток у посетителя для света из окна на первом экране (.window-light в globals.css).
// Инлайн-скрипт в <head> выполняется до первой отрисовки, иначе свет успел бы смениться
// у человека на глазах. next/script тут не подходит: даже beforeInteractive он ставит
// в очередь и выполняет после загрузки JS Next. Паттерн из гайда Next
// «Preventing flash before hydration». Без скрипта — дневной свет. ES5: выполняется везде
const daytimeScript = `(function(){var h=new Date().getHours();document.documentElement.setAttribute('data-daytime',h>=5&&h<11?'morning':h>=11&&h<17?'day':'evening')})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: data-daytime ставит скрипт из <head>, React о нём не знает
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth h-full antialiased ${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: daytimeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {/* Фото первого экрана — самый крупный элемент страницы. Без этих строк браузер
            узнаёт о нём только добравшись до разметки Hero; так загрузка стартует сразу.
            React сам поднимает эти теги в <head>. type даёт браузерам без AVIF
            пропустить предзагрузку и не тратить трафик */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/hero-mobile-828.avif"
          imageSrcSet="/hero-mobile-828.avif 828w, /hero-mobile.avif 1080w"
          imageSizes="100vw"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/hero-desktop-600.avif"
          imageSrcSet="/hero-desktop-600.avif 600w, /hero-desktop.avif 940w"
          imageSizes="(min-width: 1200px) 468px, 40vw"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        {children}
      </body>
    </html>
  );
}
