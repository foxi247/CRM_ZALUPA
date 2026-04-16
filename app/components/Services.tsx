"use client";
import FadeIn from "./FadeIn";

const services = [
  { icon: "◎",   iconColor: "#8ff5ff",  tag: "Таргет",   title: "Targeted Advertising",           description: "Точная настройка за лидерство в нише. Работаем с самыми небольшими бюджетами. Доведём конверсию до эталона." },
  { icon: "⬡",   iconColor: "#ac89ff",  tag: "Контекст", title: "Contextual Ads (Яндекс / Google)",description: "Захват горячего спроса. Прозрачная аналитика до звонка. Управляем кампаниями без скрытых наценок." },
  { icon: "◈",   iconColor: "#f3ffca",  tag: "SMM",      title: "SMM Strategy",                   description: "Создаём сильный бренд, а не просто посты. Аудитория, которая знает вас по всему рынку." },
  { icon: "</>", iconColor: "#8ff5ff",  tag: "Dev",      title: "Web Development",                description: "Высококонверсионные лендинги и кастомные порталы на Next.js. Скорость и результат — наш стандарт." },
  { icon: "✦",   iconColor: "#ac89ff",  tag: "CRM",      title: "CRM Marketing",                  description: "Автоматизация воронки и LTV-менеджмент через CRM решения. Клиент возвращается снова и снова." },
];

interface Props { content: Record<string, string>; }

export default function Services({ content }: Props) {
  const c = (key: string, fallback: string) => content[key] ?? fallback;

  return (
    <section id="services" className="section" style={{ background: "#0e0e0e" }}>
      <div className="container">
        <FadeIn style={{ marginBottom: "3.5rem" }}>
          <p className="label-caps" style={{ color: "var(--color-primary,#8ff5ff)", marginBottom: "1rem" }}>
            {c("services.label", "Наши экспертизы")}
          </p>
          <h2 className="display" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            {c("services.title", "ЭКОСИСТЕМА РОСТА")}
          </h2>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "1px", background: "rgba(73,72,71,0.15)", borderRadius: "1rem", overflow: "hidden",
        }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 80} direction="up">
              <div
                style={{
                  padding: "2rem", background: "#141414", position: "relative", height: "100%",
                  transition: "background 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1a1919")}
                onMouseLeave={e => (e.currentTarget.style.background = "#141414")}
              >
                {/* Icon */}
                <div style={{
                  fontSize: s.icon === "</>" ? "0.9rem" : "1.5rem",
                  color: s.iconColor, marginBottom: "1.25rem",
                  fontFamily: s.icon === "</>" ? "monospace" : "inherit",
                  fontWeight: 700, letterSpacing: "0.05em",
                  transition: "text-shadow 0.3s",
                }}>
                  {s.icon}
                </div>
                <h3 className="headline" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#adaaaa", lineHeight: 1.65 }}>{s.description}</p>
                <div style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  background: "rgba(73,72,71,0.2)", borderRadius: "4px", padding: "0.25rem 0.6rem",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847",
                }}>{s.tag}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
