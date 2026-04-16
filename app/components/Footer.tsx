"use client";

const footerLinks = {
  Услуги: [
    "Таргетированная реклама",
    "Контекстная реклама",
    "SMM-продвижение",
    "Web Development",
    "CRM Маркетинг",
  ],
  Компания: [
    "О нас",
    "Кейсы",
    "Блог",
    "Карьера",
  ],
  "Правовая информация": [
    "Политика конфиденциальности",
    "Договор-оферта",
    "Реквизиты",
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(73,72,71,0.15)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(3, 1fr)",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #8ff5ff, #ac89ff)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#e8e6e6",
                  letterSpacing: "-0.01em",
                }}
              >
                Neon Architect
              </span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#adaaaa",
                lineHeight: 1.65,
                maxWidth: 280,
                marginBottom: "1.75rem",
              }}
            >
              Neon Architect — архитектурная студия высокоэффективного цифрового маркетинга.
              Строим системы привлечения, а не разовые кампании.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "TG", href: "#" },
                { label: "VK", href: "#" },
                { label: "YT", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "rgba(73,72,71,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#adaaaa",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(143,245,255,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#8ff5ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(73,72,71,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#adaaaa";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="label-caps"
                style={{ color: "#494847", marginBottom: "1.25rem", fontSize: "0.65rem" }}
              >
                {category}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "0.85rem",
                        color: "#adaaaa",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e6e6")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#adaaaa")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(73,72,71,0.15)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#494847" }}>
            © 2024 Neon Architect. Все права защищены.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#494847" }}>
            Маркетинг, который работает.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
