import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Юлия Радионова | Бизнес-консультант",
  description: "Работаю с собственниками и руководителями, которым важно разобраться в сложной ситуации и принять обоснованное решение.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`scroll-smooth h-full antialiased ${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=localStorage.getItem('palette');if(p&&p!=='warm')document.documentElement.setAttribute('data-palette',p)}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
