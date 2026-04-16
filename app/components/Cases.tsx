const cases = [
  {
    category: "FASHION B2B",
    tag: "+145%",
    tagLabel: "CPL",
    title: "Снижение CPL в 2.4 раза за 3 месяца",
    description:
      "Комплексная работа с клиентской рекламой и рефиниш продуктовых страниц, снижение годовых страниц.",
    accent: "#8ff5ff",
    bg: "#141414",
  },
  {
    category: "E-COMMERCE",
    tag: "×3.2",
    tagLabel: "Revenue",
    title: "Масштабирование выручки до 40 млн/мес",
    description:
      "Автоматизация SMM и внедрение каналов аналитики в связке с CRM. Системный рост без раздутого штата.",
    accent: "#ac89ff",
    bg: "#141414",
  },
  {
    category: "SAAS",
    tag: "−62%",
    tagLabel: "CAC",
    title: "Снижение стоимости привлечения в SaaS",
    description:
      "Пересборка performance-воронки: новые офферы, А/Б тесты посадочных и сегментация аудиторий.",
    accent: "#f3ffca",
    bg: "#141414",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="section" style={{ background: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p className="label-caps" style={{ color: "#8ff5ff", marginBottom: "1rem" }}>
              Портфолио
            </p>
            <h2
              className="display"
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#e8e6e6",
              }}
            >
              КЕЙСЫ, КОТОРЫЕ<br />ГОВОРЯТ
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              fontSize: "0.85rem",
              color: "#8ff5ff",
              textDecoration: "none",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
              alignSelf: "flex-end",
            }}
          >
            Смотреть все кейсы →
          </a>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {cases.map((c, i) => (
            <div
              key={i}
              className="card"
              style={{
                background: c.bg,
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Visual area */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, ${c.accent}12 0%, rgba(26,25,25,0) 100%)`,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid rgba(73,72,71,0.15)",
                }}
              >
                {/* Abstract visual elements */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Simulated chart/graph visual */}
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                    <polyline
                      points="0,80 30,60 60,70 90,30 120,45 150,20 180,35 200,15"
                      stroke={c.accent}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                    />
                    <polyline
                      points="0,80 30,60 60,70 90,30 120,45 150,20 180,35 200,15"
                      stroke={c.accent}
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.15"
                      strokeDasharray="4 4"
                    />
                    {[
                      { x: 90, y: 30 },
                      { x: 150, y: 20 },
                      { x: 200, y: 15 },
                    ].map((pt, pi) => (
                      <circle key={pi} cx={pt.x} cy={pt.y} r="3" fill={c.accent} opacity="0.8" />
                    ))}
                  </svg>
                </div>

                {/* Tag badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: `${c.accent}20`,
                    border: `1px solid ${c.accent}40`,
                    borderRadius: "6px",
                    padding: "0.3rem 0.7rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: c.accent,
                    }}
                  >
                    {c.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: `${c.accent}aa`,
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {c.tagLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.75rem", flexGrow: 1 }}>
                <p className="label-caps" style={{ color: c.accent, marginBottom: "0.75rem" }}>
                  {c.category}
                </p>
                <h3
                  className="headline"
                  style={{
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#e8e6e6",
                    marginBottom: "0.75rem",
                    lineHeight: 1.4,
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.65 }}>
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
