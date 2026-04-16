"use client";
import FadeIn from "./FadeIn";

const cases = [
  { category: "FASHION B2B", tag: "+145%", tagLabel: "CPL",     accent: "#8ff5ff", title: "Снижение CPL в 2.4 раза за 3 месяца",      description: "Комплексная работа с клиентской рекламой и рефиниш продуктовых страниц." },
  { category: "E-COMMERCE",  tag: "×3.2",  tagLabel: "Revenue", accent: "#ac89ff", title: "Масштабирование выручки до 40 млн/мес",     description: "Автоматизация SMM и внедрение каналов аналитики в связке с CRM." },
  { category: "SAAS",        tag: "−62%",  tagLabel: "CAC",     accent: "#f3ffca", title: "Снижение стоимости привлечения в SaaS",      description: "Пересборка performance-воронки: новые офферы, А/Б тесты посадочных." },
];

interface Props { content: Record<string, string>; }

export default function Cases({ content }: Props) {
  const c = (key: string, fallback: string) => content[key] ?? fallback;

  return (
    <section id="cases" className="section" style={{ background: "#0e0e0e" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <FadeIn>
            <p className="label-caps" style={{ color: "var(--color-primary,#8ff5ff)", marginBottom: "1rem" }}>{c("cases.label", "Портфолио")}</p>
            <h2 className="display" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{c("cases.title", "КЕЙСЫ, КОТОРЫЕ ГОВОРЯТ")}</h2>
          </FadeIn>
          <a href="#contact" style={{ fontSize: "0.85rem", color: "var(--color-primary,#8ff5ff)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap", alignSelf: "flex-end" }}>
            Смотреть все кейсы →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 120} direction="up">
              <div
                style={{ background: "#141414", borderRadius: "1rem", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", transition: "background 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "#1a1919"; el.style.boxShadow = `0 -1px 0 0 ${c.accent}40`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "#141414"; el.style.boxShadow = "none"; }}
              >
                {/* Chart visual */}
                <div style={{ height: 200, position: "relative", background: `linear-gradient(135deg,${c.accent}12 0%,transparent 100%)`, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(73,72,71,0.15)" }}>
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" style={{ opacity: 0.8 }}>
                    <defs>
                      <linearGradient id={`g${i}`} x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={c.accent} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={c.accent} stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <polyline points="0,80 30,60 60,70 90,30 120,45 150,20 180,35 200,15" stroke={`url(#g${i})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {[{ x: 90, y: 30 }, { x: 150, y: 20 }, { x: 200, y: 15 }].map((pt, pi) => (
                      <circle key={pi} cx={pt.x} cy={pt.y} r="4" fill={c.accent} />
                    ))}
                  </svg>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", background: `${c.accent}20`, border: `1px solid ${c.accent}40`, borderRadius: "6px", padding: "0.3rem 0.7rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1rem", color: c.accent }}>{c.tag}</span>
                    <span style={{ fontSize: "0.65rem", color: `${c.accent}aa`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{c.tagLabel}</span>
                  </div>
                </div>
                <div style={{ padding: "1.75rem", flexGrow: 1 }}>
                  <p className="label-caps" style={{ color: c.accent, marginBottom: "0.75rem" }}>{c.category}</p>
                  <h3 className="headline" style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.4 }}>{c.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.65 }}>{c.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
