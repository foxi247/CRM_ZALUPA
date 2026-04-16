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
      className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
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
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "0.875rem",
                  color: "#adaaaa",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e6e6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#adaaaa")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}>
            Получить стратегию
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "#adaaaa",
                borderRadius: 2,
                transition: "all 0.25s",
                transformOrigin: "center",
                transform:
                  menuOpen
                    ? i === 0
                      ? "translateY(5.5px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-5.5px) rotate(-45deg)"
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
          <ul className="flex flex-col gap-5 mb-6">
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
