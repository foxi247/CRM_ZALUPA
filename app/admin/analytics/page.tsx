"use client";
import { useEffect, useState } from "react";

interface Analytics {
  totalViews: number; todayViews: number; weekViews: number;
  topPages: { path: string; views: number }[];
  daily7: { day: string; views: number }[];
  totalLeads: number; newLeads: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setData);
  }, []);

  const maxViews = data ? Math.max(...data.daily7.map(d => d.views), 1) : 1;
  const maxTopViews = data ? Math.max(...data.topPages.map(p => p.views), 1) : 1;
  const convRate = data && data.weekViews > 0 ? ((data.newLeads / data.weekViews) * 100).toFixed(1) : "0.0";

  function StatCard({ label, value, sub, color = "#8ff5ff" }: { label: string; value: string | number; sub?: string; color?: string }) {
    return (
      <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "0.75rem" }}>{label}</p>
        <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "2.25rem", color, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontSize: "0.75rem", color: "#494847", marginTop: "0.5rem" }}>{sub}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>Аналитика</h1>
      <p style={{ color: "#494847", fontSize: "0.875rem", marginBottom: "2rem" }}>Статистика посещаемости сайта</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <StatCard label="Всего просмотров" value={data?.totalViews ?? "—"} />
        <StatCard label="Сегодня" value={data?.todayViews ?? "—"} color="#ac89ff" />
        <StatCard label="За 7 дней" value={data?.weekViews ?? "—"} />
        <StatCard label="Конверсия" value={`${convRate}%`} sub="лиды / просмотры" color="#f3ffca" />
        <StatCard label="Всего лидов" value={data?.totalLeads ?? "—"} color="#ac89ff" />
        <StatCard label="Новых лидов" value={data?.newLeads ?? "—"} color="#8ff5ff" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Bar chart */}
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.5rem" }}>Просмотры по дням</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 120 }}>
            {(data?.daily7 ?? Array(7).fill({ day: "", views: 0 })).map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.65rem", color: "#8ff5ff", fontWeight: 700 }}>{d.views || ""}</span>
                <div style={{
                  width: "100%", borderRadius: "3px 3px 0 0",
                  background: "linear-gradient(to top, #8ff5ff, #ac89ff)",
                  height: `${Math.max((d.views / maxViews) * 80, d.views > 0 ? 4 : 0)}px`,
                  transition: "height 0.6s ease",
                  opacity: 0.7,
                }} />
                <span style={{ fontSize: "0.6rem", color: "#494847" }}>{d.day?.slice(5) ?? ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.5rem" }}>Топ страниц</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {(data?.topPages ?? []).slice(0, 8).map((p, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#adaaaa", fontFamily: "monospace" }}>{p.path}</span>
                  <span style={{ fontSize: "0.8rem", color: "#8ff5ff", fontWeight: 700 }}>{p.views}</span>
                </div>
                <div style={{ height: 3, background: "#262626", borderRadius: 2 }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg,#8ff5ff,#ac89ff)", borderRadius: 2, width: `${(p.views / maxTopViews) * 100}%`, transition: "width 0.6s" }} />
                </div>
              </div>
            ))}
            {!data?.topPages?.length && <p style={{ color: "#494847", fontSize: "0.85rem" }}>Нет данных. Страницы отслеживаются автоматически.</p>}
          </div>
        </div>
      </div>

      <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1rem" }}>ℹ Как работает трекинг</p>
        <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.65 }}>
          Каждое посещение сайта автоматически записывается через API <code style={{ background: "#262626", padding: "0.1rem 0.35rem", borderRadius: 4, fontSize: "0.8rem" }}>/api/track</code>.
          Данные хранятся в локальной SQLite базе данных. Статистика обновляется в реальном времени при каждом обновлении страницы.
        </p>
      </div>
    </div>
  );
}
