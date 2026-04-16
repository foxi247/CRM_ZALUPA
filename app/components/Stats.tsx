const stats = [
  { value: "+300%", label: "Средний ROI проектов",                    color: "#e8e6e6" },
  { value: "124",   label: "Успешных кейса за 2023",                  color: "#e8e6e6" },
  { value: "15.4М", label: "Рекламного бюджета под управлением",      color: "#8ff5ff" },
  { value: "24/7",  label: "Мониторинг показателей",                  color: "#e8e6e6" },
];

export default function Stats() {
  return (
    <section style={{ background: "#141414", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 500, height: 200, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse, rgba(143,245,255,0.04) 0%, transparent 70%)" }} />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem 2rem",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: s.color,
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.5, maxWidth: 180, margin: "0 auto" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
