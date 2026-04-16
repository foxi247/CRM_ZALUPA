const steps = [
  { num: "01", title: "Глубокий аудит",       description: "Разбираем, где конкурируете, ищем точки роста в вашем продукте и текущей ситуации." },
  { num: "02", title: "Разработка стратегии", description: "Формируем модели с конкретизацией KPI и четкими сроками реализации." },
  { num: "03", title: "Запуск и тест",         description: "Разворачиваем инфраструктуру, запускаем первые рекламные связки." },
  { num: "04", title: "Оптимизация",           description: "Масштабируем прибыльные каналы, отключаем неэффективные гипотезы." },
  { num: "05", title: "Кратностный рост",      description: "Выходим на новые рынки и объёмы, внедряем продвинутые инструменты удержания." },
];

export default function HowWeWork() {
  return (
    <section id="about" className="section" style={{ background: "#0e0e0e" }}>
      <div className="container">
        <div className="how-grid">
          {/* Left — sticky headline */}
          <div style={{ position: "sticky", top: "8rem" }}>
            <p className="label-caps" style={{ color: "#8ff5ff", marginBottom: "1.25rem" }}>Как мы работаем</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, marginBottom: "2rem" }}
            >
              КАК МЫ<br />
              <span className="text-gradient-primary">СТРОИМ</span> ВАШ<br />
              УСПЕХ
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#adaaaa", lineHeight: 1.7, maxWidth: 360, marginBottom: "2.5rem" }}>
              Пять последовательных этапов, которые превращают маркетинговый хаос
              в предсказуемую машину роста.
            </p>
            <a href="#contact" className="btn-primary">Начать сейчас</a>
          </div>

          {/* Right — steps */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(73,72,71,0.15)" : "none",
                }}
              >
                <div style={{ flexShrink: 0, paddingTop: "0.2rem" }}>
                  <span className="label-caps" style={{ color: "#494847", fontSize: "0.65rem" }}>
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="headline" style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#adaaaa", lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
