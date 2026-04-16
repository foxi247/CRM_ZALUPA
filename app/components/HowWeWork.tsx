import FadeIn from "./FadeIn";

const steps = [
  { num: "01", title: "Глубокий аудит",       description: "Разбираем, где конкурируете, ищем точки роста в вашем продукте и текущей ситуации." },
  { num: "02", title: "Разработка стратегии", description: "Формируем модели с конкретизацией KPI и четкими сроками реализации." },
  { num: "03", title: "Запуск и тест",         description: "Разворачиваем инфраструктуру, запускаем первые рекламные связки." },
  { num: "04", title: "Оптимизация",           description: "Масштабируем прибыльные каналы, отключаем неэффективные гипотезы." },
  { num: "05", title: "Кратностный рост",      description: "Выходим на новые рынки и объёмы, внедряем продвинутые инструменты удержания." },
];

interface Props { content: Record<string, string>; }

export default function HowWeWork({ content }: Props) {
  const c = (key: string, fallback: string) => content[key] ?? fallback;

  return (
    <section id="about" className="section" style={{ background: "#0e0e0e" }}>
      <div className="container">
        <div className="how-grid">
          {/* Left sticky */}
          <div style={{ position: "sticky", top: "8rem" }}>
            <FadeIn>
              <p className="label-caps" style={{ color: "var(--color-primary,#8ff5ff)", marginBottom: "1.25rem" }}>{c("how.label", "Как мы работаем")}</p>
              <h2 className="display" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.1, marginBottom: "2rem" }}>
                {c("how.title", "КАК МЫ СТРОИМ ВАШ УСПЕХ").split(" ").map((word, wi) =>
                  word === "СТРОИМ" ? (
                    <span key={wi} className="text-gradient-primary">{word} </span>
                  ) : `${word} `
                )}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#adaaaa", lineHeight: 1.7, maxWidth: 360, marginBottom: "2.5rem" }}>
                {c("how.subtitle", "Пять последовательных этапов, которые превращают маркетинговый хаос в предсказуемую машину роста.")}
              </p>
              <a href="#contact" className="btn-primary">Начать сейчас</a>
            </FadeIn>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 100} direction="left">
                <div style={{
                  display: "flex", gap: "2rem", padding: "2rem 0",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(73,72,71,0.15)" : "none",
                }}>
                  <div style={{ flexShrink: 0, paddingTop: "0.2rem" }}>
                    <span className="label-caps" style={{ color: "#494847", fontSize: "0.65rem" }}>{step.num}</span>
                  </div>
                  <div>
                    <h3 className="headline" style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" }}>{step.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#adaaaa", lineHeight: 1.65 }}>{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
