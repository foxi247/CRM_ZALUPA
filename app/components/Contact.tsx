"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        background: "#141414",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orb */}
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          bottom: -200,
          left: -100,
          background: "radial-gradient(circle, rgba(172,137,255,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          top: -100,
          right: -100,
          background: "radial-gradient(circle, rgba(143,245,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <p className="label-caps" style={{ color: "#8ff5ff", marginBottom: "1.25rem" }}>
              Связаться
            </p>
            <h2
              className="display"
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#e8e6e6",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              ГОТОВЫ К<br />
              <span className="text-gradient-primary">ПРОРЫВУ</span>?
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#adaaaa",
                lineHeight: 1.7,
                maxWidth: 380,
                marginBottom: "2.5rem",
              }}
            >
              Оставьте заявку, и мы подготовим бесплатный аудит вашей текущей
              маркетинговой ситуации в течение 24 часов.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                "Стратегия из медиа-плана",
                "Анализ текущей ситуации",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#adaaaa",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#8ff5ff",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form */}
          <div
            style={{
              background: "#1a1919",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              border: "1px solid rgba(73,72,71,0.2)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <p
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#8ff5ff",
                    marginBottom: "1rem",
                  }}
                >
                  Заявка отправлена!
                </p>
                <p style={{ color: "#adaaaa", fontSize: "0.9rem" }}>
                  Мы свяжемся с вами в течение 24 часов.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="field"
                  />
                </div>
                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="field"
                  />
                </div>
                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (999) 000-00-00"
                    value={form.phone}
                    onChange={handleChange}
                    className="field"
                  />
                </div>
                <div>
                  <label
                    className="label-caps"
                    style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}
                  >
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    placeholder="Расскажите о вашем проекте..."
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="field"
                    style={{ resize: "vertical", minHeight: 80 }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  Получить стратегию
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
