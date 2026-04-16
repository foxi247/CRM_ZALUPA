const services = [
  {
    icon: "◎",
    iconColor: "#8ff5ff",
    title: "Targeted Advertising",
    description:
      "Точная настройка за лидерство в нише. Работаем с самыми небольшими бюджетами. Доведём конверсию до эталона.",
    tag: "Таргет",
  },
  {
    icon: "⬡",
    iconColor: "#ac89ff",
    title: "Contextual Ads (Яндекс / Google)",
    description:
      "Захват горячего спроса. Работаем со смыслами небольшого бюджета. Прозрачная аналитика до звонка.",
    tag: "Контекст",
  },
  {
    icon: "◈",
    iconColor: "#f3ffca",
    title: "SMM Strategy",
    description:
      "Создаём сильный бренд, а не просто посты. Аудитория, которая знает вас по всему рынку партнёров.",
    tag: "SMM",
  },
  {
    icon: "</>",
    iconColor: "#8ff5ff",
    title: "Web Development",
    description:
      "Высококонверсионные лендинги и кастомные порталы на Next.js. Скорость и результат — наш стандарт.",
    tag: "Dev",
  },
  {
    icon: "✦",
    iconColor: "#ac89ff",
    title: "CRM Marketing",
    description:
      "Автоматизация воронки и LTV-менеджмент через CRM решения. Клиент возвращается снова и снова.",
    tag: "CRM",
  },
];

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="label-caps" style={{ color: "#8ff5ff", marginBottom: "1rem" }}>
            Наши экспертизы
          </p>
          <h2
            className="display"
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#e8e6e6",
            }}
          >
            ЭКОСИСТЕМА РОСТА
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(73,72,71,0.15)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "2rem",
                borderRadius: 0,
                background: "#141414",
                position: "relative",
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: s.icon === "</>" ? "0.9rem" : "1.5rem",
                  color: s.iconColor,
                  marginBottom: "1.25rem",
                  fontFamily: s.icon === "</>" ? "monospace" : "inherit",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {s.icon}
              </div>

              {/* Title */}
              <h3
                className="headline"
                style={{
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e8e6e6",
                  marginBottom: "0.75rem",
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#adaaaa",
                  lineHeight: 1.65,
                }}
              >
                {s.description}
              </p>

              {/* Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(73,72,71,0.2)",
                  borderRadius: "4px",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#494847",
                }}
              >
                {s.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
