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

const title = "Юлия Радионова | Бизнес-консультант";

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
    siteName: "Юлия Радионова",
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
        {children}
      </body>
    </html>
  );
}
