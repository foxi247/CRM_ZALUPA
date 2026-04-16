import { getAllContent, getAllSettings, getSeoSettings } from "@/lib/db";
import { Metadata } from "next";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Cases from "./components/Cases";
import HowWeWork from "./components/HowWeWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoSettings("/");
  return {
    title:       seo?.title       ?? "Neon Architect — Приводим клиентов, а не просто трафик",
    description: seo?.description ?? "Архитектура высокоэффективного маркетинга для технологичных компаний.",
    keywords:    seo?.keywords    ?? "digital marketing, таргетированная реклама",
    robots:      seo?.robots      ?? "index, follow",
    openGraph: {
      title:       seo?.og_title       ?? seo?.title       ?? undefined,
      description: seo?.og_description ?? seo?.description ?? undefined,
      images:      seo?.og_image ? [seo.og_image] : undefined,
    },
  };
}

export default function Home() {
  const content = getAllContent();
  const settings = getAllSettings();

  const theme = {
    primary:   settings["theme.primary"]   ?? "#8ff5ff",
    secondary: settings["theme.secondary"] ?? "#ac89ff",
    tertiary:  settings["theme.tertiary"]  ?? "#f3ffca",
    surface:   settings["theme.surface"]   ?? "#0e0e0e",
  };

  const cssVars = `
    :root {
      --color-primary:   ${theme.primary};
      --color-secondary: ${theme.secondary};
      --color-tertiary:  ${theme.tertiary};
      --color-surface:   ${theme.surface};
    }
    body { background-color: ${theme.surface}; }
  `;

  return (
    <>
      {/* Inject theme CSS vars */}
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />

      <Navigation content={content} />
      <main>
        <Hero content={content} />
        <Services content={content} />
        <Stats />
        <Cases content={content} />
        <HowWeWork content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
