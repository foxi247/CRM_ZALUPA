"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalViews: number; todayViews: number; weekViews: number;
  topPages: { path: string; views: number }[];
  daily7: { day: string; views: number }[];
  totalLeads: number; newLeads: number;
}

function StatCard({ label, value, sub, color = "#8ff5ff" }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "0.75rem" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "2rem", color, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: "0.8rem", color: "#494847", marginTop: "0.5rem" }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setStats);
  }, []);

  const maxViews = stats ? Math.max(...stats.daily7.map(d => d.views), 1) : 1;

  const quickLinks = [
    { href: "/admin/content",   label: "Редактировать контент", icon: "✎", color: "#8ff5ff" },
    { href: "/admin/theme",     label: "Сменить тему",          icon: "◑", color: "#ac89ff" },
    { href: "/admin/crm",       label: "Просмотреть лиды",      icon: "◎", color: "#f3ffca" },
    { href: "/admin/seo",       label: "Настроить SEO",         icon: "⟡", color: "#8ff5ff" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
        Дашборд
      </h1>
      <p style={{ color: "#494847", fontSize: "0.875rem", marginBottom: "2rem" }}>
        Обзор проекта Neon Architect
      </p>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <StatCard label="Всего просмотров" value={stats?.totalViews ?? "—"} />
        <StatCard label="Сегодня" value={stats?.todayViews ?? "—"} />
        <StatCard label="За 7 дней" value={stats?.weekViews ?? "—"} />
        <StatCard label="Лидов всего" value={stats?.totalLeads ?? "—"} sub={`${stats?.newLeads ?? 0} новых`} color="#ac89ff" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Mini bar chart */}
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>
            Просмотры за 7 дней
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 80 }}>
            {(stats?.daily7 ?? Array(7).fill({ day: "", views: 0 })).map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                <div style={{ width: "100%", background: "rgba(143,245,255,0.6)", borderRadius: "3px 3px 0 0", height: `${(d.views / maxViews) * 64}px`, minHeight: d.views > 0 ? 4 : 0, transition: "height 0.5s" }} />
                <span style={{ fontSize: "0.6rem", color: "#494847" }}>{d.day?.slice(5) ?? ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>
            Топ страниц
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {(stats?.topPages ?? []).slice(0, 5).map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#adaaaa", fontFamily: "monospace" }}>{p.path}</span>
                <span style={{ fontSize: "0.85rem", color: "#8ff5ff", fontWeight: 700 }}>{p.views}</span>
              </div>
            ))}
            {!stats?.topPages?.length && <p style={{ color: "#494847", fontSize: "0.85rem" }}>Нет данных</p>}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontSize: "1rem", fontWeight: 600, color: "#e8e6e6", marginBottom: "1rem" }}>Быстрые действия</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
        {quickLinks.map(l => (
          <Link key={l.href} href={l.href} style={{
            display: "flex", alignItems: "center", gap: "1rem",
            background: "#1a1919", borderRadius: "0.75rem",
            padding: "1.25rem", border: "1px solid rgba(73,72,71,0.2)",
            textDecoration: "none", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${l.color}40`)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(73,72,71,0.2)")}
          >
            <span style={{ fontSize: "1.25rem", color: l.color }}>{l.icon}</span>
            <span style={{ fontSize: "0.875rem", color: "#adaaaa" }}>{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
