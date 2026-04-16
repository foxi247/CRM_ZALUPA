"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#0e0e0e",
        paddingTop: "6rem",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          top: -200,
          right: -150,
          background: "radial-gradient(circle, rgba(172,137,255,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          left: -100,
          background: "radial-gradient(circle, rgba(143,245,255,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "40%",
          background: "radial-gradient(circle, rgba(172,137,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div style={{ maxWidth: 760 }}>
          {/* Label */}
          <p className="label-caps" style={{ marginBottom: "1.5rem", color: "#8ff5ff" }}>
            Neon Architect
          </p>

          {/* Main headline */}
          <h1
            className="display"
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              color: "#e8e6e6",
            }}
          >
            ПРИВОДИМ{" "}
            <span className="text-gradient-primary">КЛИЕНТОВ</span>,<br />
            А НЕ ПРОСТО<br />
            ТРАФИК
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              lineHeight: 1.7,
              color: "#adaaaa",
              maxWidth: 540,
              marginBottom: "2.5rem",
            }}
          >
            Архитектура высокоэффективного маркетинга для технологичных компаний.
            Масштабируем ROI через Data-driven решения и премиальный UX.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="#contact" className="btn-primary">
              Оставить заявку
            </a>
            <a href="#cases" className="btn-secondary">
              Наши кейсы →
            </a>
          </div>
        </div>

        {/* Floating metric card */}
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "12%",
            background: "rgba(26,25,25,0.85)",
            backdropFilter: "blur(20px)",
            borderRadius: "1rem",
            padding: "1.5rem 2rem",
            border: "1px solid rgba(73,72,71,0.2)",
            display: "none",
          }}
          className="lg:block"
        >
          <p
            className="label-caps"
            style={{ marginBottom: "0.5rem", color: "#8ff5ff", display: "block" }}
          >
            Средний ROI
          </p>
          <p
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "2.5rem",
              color: "#e8e6e6",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            +300%
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span className="label-caps" style={{ color: "#494847" }}>
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #494847, transparent)",
          }}
        />
      </div>
    </section>
  );
}
