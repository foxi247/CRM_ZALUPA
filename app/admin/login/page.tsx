"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@neonarchitect.ru");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) { router.push("/admin"); router.refresh(); }
    else { const d = await res.json(); setError(d.error ?? "Ошибка входа"); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#8ff5ff,#ac89ff)", margin: "0 auto 1rem" }} />
          <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#e8e6e6", letterSpacing: "-0.02em" }}>
            Neon Architect
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#494847", marginTop: "0.35rem" }}>Admin Panel</p>
        </div>

        <form onSubmit={submit} style={{ background: "#1a1919", borderRadius: "1rem", padding: "2rem", border: "1px solid rgba(73,72,71,0.2)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#adaaaa", marginBottom: "0.5rem" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="field" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#adaaaa", marginBottom: "0.5rem" }}>Пароль</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="field" placeholder="••••••••" />
          </div>
          {error && <p style={{ fontSize: "0.85rem", color: "#fc8181", background: "rgba(252,129,129,0.08)", padding: "0.75rem", borderRadius: "0.5rem" }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#494847", marginTop: "1.5rem" }}>
          По умолчанию: admin@neonarchitect.ru / admin123
        </p>
      </div>
    </div>
  );
}
