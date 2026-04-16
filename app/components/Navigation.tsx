"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#cases" },
  { label: "О нас", href: "#about" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="glass-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "padding 0.3s",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <nav
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: "linear-gradient(135deg, #8ff5ff, #ac89ff)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: "1rem", color: "#e8e6e6", letterSpacing: "-0.01em",
            }}
          >
            Neon Architect
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="nav-links" style={{ listStyle: "none", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{ fontSize: "0.875rem", color: "#adaaaa", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e6e6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#adaaaa")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <a href="#contact" className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            Получить стратегию
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
          style={{
            background: "none", border: "none", cursor: "pointer",
            flexDirection: "column", gap: "5px", padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block", width: 22, height: 2,
                background: "#adaaaa", borderRadius: 2,
                transition: "all 0.25s", transformOrigin: "center",
                transform: menuOpen
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(14,14,14,0.98)",
            borderTop: "1px solid rgba(73,72,71,0.2)",
            padding: "1.5rem 1.5rem 2rem",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "#adaaaa", fontSize: "1rem", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Получить стратегию
          </a>
        </div>
      )}
    </header>
  );
}
