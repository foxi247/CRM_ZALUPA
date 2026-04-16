"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin",           icon: "⊞", label: "Дашборд"   },
  { href: "/admin/content",   icon: "✎", label: "Контент"   },
  { href: "/admin/theme",     icon: "◑", label: "Тема"      },
  { href: "/admin/crm",       icon: "◎", label: "CRM"       },
  { href: "/admin/analytics", icon: "▲", label: "Аналитика" },
  { href: "/admin/seo",       icon: "⟡", label: "SEO"       },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0, background: "#0e0e0e",
        borderRight: "1px solid rgba(73,72,71,0.2)",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(73,72,71,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#8ff5ff,#ac89ff)", flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#e8e6e6", letterSpacing: "-0.01em" }}>Neon Architect</p>
              <p style={{ fontSize: "0.65rem", color: "#494847", letterSpacing: "0.08em" }}>ADMIN</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV.map(item => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.6rem 0.75rem", borderRadius: "0.5rem",
                  textDecoration: "none", transition: "background 0.15s",
                  background: active ? "rgba(143,245,255,0.08)" : "transparent",
                  color: active ? "#8ff5ff" : "#adaaaa",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(73,72,71,0.15)" }}>
          <button
            onClick={logout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.6rem 0.75rem", borderRadius: "0.5rem", border: "none",
              background: "transparent", color: "#494847", fontSize: "0.875rem",
              cursor: "pointer", transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fc8181")}
            onMouseLeave={e => (e.currentTarget.style.color = "#494847")}
          >
            <span>⏻</span> Выйти
          </button>
          <a href="/" target="_blank" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.6rem 0.75rem", borderRadius: "0.5rem",
            textDecoration: "none", color: "#494847", fontSize: "0.875rem",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#8ff5ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#494847")}
          >
            <span>↗</span> Сайт
          </a>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}
