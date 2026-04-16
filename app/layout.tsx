import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neon Architect — Приводим клиентов, а не просто трафик",
  description:
    "Архитектура высокоэффективного маркетинга для технологичных компаний. Масштабируем ROI через Data-driven решения и премиальный UX.",
  keywords: ["digital marketing", "таргетированная реклама", "контекстная реклама", "SMM", "CRM маркетинг"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
