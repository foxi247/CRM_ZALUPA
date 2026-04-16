const steps = [
  {
    num: "01",
    title: "Глубокий аудит",
    description:
      "Разбираем, где конкурируете, ищем точки роста в вашем продукте и текущей ситуации.",
  },
  {
    num: "02",
    title: "Разработка стратегии",
    description:
      "Формируем модели с конкретизацией KPI и четкими сроками реализации.",
  },
  {
    num: "03",
    title: "Запуск и тест",
    description:
      "Разворачиваем инфраструктуру, запускаем первые рекламные связки.",
  },
  {
    num: "04",
    title: "Оптимизация",
    description:
      "Масштабируем прибыльные каналы, отключаем неэффективные гипотезы.",
  },
  {
    num: "05",
    title: "Кратностный рост",
    description:
      "Выходим на новые рынки и объёмы, внедряем продвинутые инструменты удержания.",
  },
];

export default function HowWeWork() {
  return (
    <section id="about" className="section" style={{ background: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="how-grid"
        >
          {/* Left — sticky headline */}
          <div style={{ position: "sticky", top: "8rem" }}>
            <p className="label-caps" style={{ color: "#8ff5ff", marginBottom: "1.25rem" }}>
              Как мы работаем
            </p>
            <h2
              className="display"
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#e8e6e6",
                lineHeight: 1.1,
                marginBottom: "2rem",
              }}
            >
              КАК МЫ<br />
              <span className="text-gradient-primary">СТРОИМ</span>{" "}
              ВАШ<br />
              УСПЕХ
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#adaaaa",
                lineHeight: 1.7,
                maxWidth: 360,
                marginBottom: "2.5rem",
              }}
            >
              Пять последовательных этапов, которые превращают маркетинговый хаос
              в предсказуемую машину роста.
            </p>
            <a href="#contact" className="btn-primary">
              Начать сейчас
            </a>
          </div>

          {/* Right — steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "2rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(73,72,71,0.15)" : "none",
                  position: "relative",
                }}
              >
                {/* Step number */}
                <div style={{ flexShrink: 0, paddingTop: "0.2rem" }}>
                  <span
                    className="label-caps"
                    style={{
                      color: "#494847",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="headline"
                    style={{
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#e8e6e6",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#adaaaa",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .how-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
