"use client";
import { useEffect, useState } from "react";

interface Props {
  content: Record<string, string>;
}

export default function Hero({ content }: Props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const c = (key: string, fallback: string) => content[key] ?? fallback;

  return (
    <section
      id="hero"
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center",
        overflow: "hidden", background: "var(--color-surface, #0e0e0e)",
        paddingTop: "6rem",
      }}
    >
      {/* Animated orbs */}
      <div className="orb animate-orb" style={{ width: 600, height: 600, top: -200, right: -150, background: "radial-gradient(circle,rgba(172,137,255,0.2) 0%,transparent 70%)", animationDuration: "18s" }} />
      <div className="orb animate-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: "radial-gradient(circle,rgba(143,245,255,0.12) 0%,transparent 70%)", animationDuration: "14s", animationDelay: "-5s" }} />
      <div className="orb animate-orb" style={{ width: 280, height: 280, top: "35%", left: "55%", background: "radial-gradient(circle,rgba(172,137,255,0.07) 0%,transparent 70%)", animationDuration: "22s", animationDelay: "-9s" }} />

      <div className="container" style={{ width: "100%" }}>
        <div style={{ maxWidth: 780 }}>
          {/* Label */}
          <p
            className="label-caps"
            style={{
              color: "var(--color-primary,#8ff5ff)", marginBottom: "1.5rem",
              opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {c("hero.label", "Neon Architect")}
          </p>

          {/* Main headline — word-by-word reveal */}
          <h1
            className="display"
            style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)", lineHeight: 1.05, marginBottom: "1.5rem",
              opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 100ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          >
            {c("hero.title1", "ПРИВОДИМ")}{" "}
            <span className="text-gradient-primary animate-glow">
              {c("hero.title_accent", "КЛИЕНТОВ")}
            </span>
            ,<br />
            {c("hero.title2", "А НЕ ПРОСТО ТРАФИК")}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-inter),Inter,sans-serif",
              fontSize: "clamp(0.95rem,1.5vw,1.1rem)", lineHeight: 1.7,
              color: "#adaaaa", maxWidth: 540, marginBottom: "2.5rem",
              opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)",
              transition: "opacity 0.7s ease 250ms, transform 0.7s ease 250ms",
            }}
          >
            {c("hero.subtitle", "Архитектура высокоэффективного маркетинга для технологичных компаний. Масштабируем ROI через Data-driven решения и премиальный UX.")}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center",
              opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)",
              transition: "opacity 0.7s ease 400ms, transform 0.7s ease 400ms",
            }}
          >
            <a href="#contact" className="btn-primary">{c("hero.cta_primary", "Оставить заявку")}</a>
            <a href="#cases" className="btn-secondary">{c("hero.cta_secondary", "Наши кейсы →")}</a>
          </div>
        </div>

        {/* Floating metric — desktop */}
        <div
          className="hero-float-card animate-float"
          style={{
            position: "absolute", right: "5%", bottom: "12%",
            background: "rgba(26,25,25,0.85)", backdropFilter: "blur(20px)",
            borderRadius: "1rem", padding: "1.5rem 2rem",
            border: "1px solid rgba(73,72,71,0.2)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 600ms",
          }}
        >
          <p className="label-caps" style={{ marginBottom: "0.5rem", color: "var(--color-primary,#8ff5ff)" }}>
            Средний ROI
          </p>
          <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "2.5rem", color: "#e8e6e6", lineHeight: 1, letterSpacing: "-0.02em" }}>
            +300%
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span className="label-caps" style={{ color: "#494847" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#494847,transparent)" }} />
      </div>
    </section>
  );
}
