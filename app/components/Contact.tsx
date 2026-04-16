"use client";
import { useState } from "react";
import FadeIn from "./FadeIn";

interface Props { content: Record<string, string>; }

export default function Contact({ content }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const c = (key: string, fallback: string) => content[key] ?? fallback;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/leads", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false); setSubmitted(true);
  }

  return (
    <section id="contact" style={{ background: "#141414", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div className="orb animate-orb" style={{ width: 500, height: 500, bottom: -200, left: -100, background: "radial-gradient(circle,rgba(172,137,255,0.10) 0%,transparent 70%)", animationDuration: "20s" }} />
      <div className="orb animate-orb" style={{ width: 400, height: 400, top: -100, right: -100, background: "radial-gradient(circle,rgba(143,245,255,0.08) 0%,transparent 70%)", animationDuration: "16s", animationDelay: "-7s" }} />

      <div className="container">
        <div className="contact-grid">
          {/* Left */}
          <FadeIn>
            <p className="label-caps" style={{ color: "var(--color-primary,#8ff5ff)", marginBottom: "1.25rem" }}>{c("contact.label", "Связаться")}</p>
            <h2 className="display" style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              {c("contact.title", "ГОТОВЫ К ПРОРЫВУ?")}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#adaaaa", lineHeight: 1.7, maxWidth: 380, marginBottom: "2.5rem" }}>
              {c("contact.subtitle", "Оставьте заявку, и мы подготовим бесплатный аудит вашей текущей маркетинговой ситуации в течение 24 часов.")}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {["Стратегия из медиа-плана", "Анализ текущей ситуации"].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: "#adaaaa" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary,#8ff5ff)", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={200} direction="left">
            <div style={{ background: "#1a1919", borderRadius: "1.25rem", padding: "2.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                  <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary,#8ff5ff)", marginBottom: "1rem" }}>
                    Заявка отправлена!
                  </p>
                  <p style={{ color: "#adaaaa", fontSize: "0.9rem" }}>Мы свяжемся с вами в течение 24 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { name: "name",  label: "Имя",     type: "text",  placeholder: "Ваше имя",           req: true },
                    { name: "email", label: "Email",    type: "email", placeholder: "your@email.com",      req: true },
                    { name: "phone", label: "Телефон",  type: "tel",   placeholder: "+7 (999) 000-00-00",  req: false },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}>{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.placeholder} required={f.req}
                        value={form[f.name as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                        className="field" />
                    </div>
                  ))}
                  <div>
                    <label className="label-caps" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.65rem" }}>Сообщение</label>
                    <textarea name="message" placeholder="Расскажите о вашем проекте..." rows={3}
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="field" style={{ resize: "vertical", minHeight: 80 }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Отправка..." : "Получить стратегию"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
