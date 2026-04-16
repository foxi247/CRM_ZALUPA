"use client";

const footerLinks = {
  Услуги:   ["Таргетированная реклама", "Контекстная реклама", "SMM-продвижение", "Web Development", "CRM Маркетинг"],
  Компания: ["О нас", "Кейсы", "Блог", "Карьера"],
  "Правовая информация": ["Политика конфиденциальности", "Договор-оферта", "Реквизиты"],
};

interface Props { content: Record<string, string>; }

export default function Footer({ content }: Props) {
  const tagline = content["footer.tagline"] ?? "Строим системы привлечения, а не разовые кампании.";

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(73,72,71,0.15)", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,var(--color-primary,#8ff5ff),var(--color-secondary,#ac89ff))", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-space-grotesk),'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#e8e6e6", letterSpacing: "-0.01em" }}>
                Neon Architect
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.65, maxWidth: 280, marginBottom: "1.75rem" }}>
              Neon Architect — архитектурная студия высокоэффективного цифрового маркетинга. {tagline}
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[{ label: "TG" }, { label: "VK" }, { label: "YT" }].map(s => (
                <a key={s.label} href="#" style={{ width: 36, height: 36, borderRadius: "8px", background: "rgba(73,72,71,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#adaaaa", fontSize: "0.65rem", fontFamily: "var(--font-inter),Inter,sans-serif", fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", transition: "background 0.2s,color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(143,245,255,0.12)"; e.currentTarget.style.color = "var(--color-primary,#8ff5ff)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(73,72,71,0.2)"; e.currentTarget.style.color = "#adaaaa"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <p className="label-caps" style={{ color: "#494847", marginBottom: "1.25rem", fontSize: "0.65rem" }}>{cat}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "0.85rem", color: "#adaaaa", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#e8e6e6")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#adaaaa")}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(73,72,71,0.15)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#494847" }}>© 2024 Neon Architect. Все права защищены.</p>
          <p style={{ fontSize: "0.8rem", color: "#494847" }}>Маркетинг, который работает.</p>
        </div>
      </div>
    </footer>
  );
}
