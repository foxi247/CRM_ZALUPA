import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import PageTracker from "./components/PageTracker";
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
  description: "Архитектура высокоэффективного маркетинга для технологичных компаний.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
      <body>
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
