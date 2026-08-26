import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { images, ogImage, siteMeta } from "@/content/site";

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

const title = `${siteMeta.name} | ${siteMeta.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title,
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteMeta.url,
    siteName: siteMeta.name,
    title,
    description: siteMeta.description,
    images: [{ url: ogImage, alt: images.square.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteMeta.description,
    images: [ogImage],
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
