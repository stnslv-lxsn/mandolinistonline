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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`scroll-smooth h-full antialiased ${cormorant.variable} ${montserrat.variable}`}>
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
          href="/hero-desktop-1100.avif"
          imageSrcSet="/hero-desktop-1100.avif 1100w, /hero-desktop.avif 1539w"
          imageSizes="1100px"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        {children}
      </body>
    </html>
  );
}
