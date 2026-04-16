"use client";
import { useEffect, useState } from "react";

interface SeoSettings {
  path: string; title: string | null; description: string | null;
  keywords: string | null; og_title: string | null; og_description: string | null;
  og_image: string | null; robots: string; updated_at: string;
}

const PAGES = ["/", "/admin"];

export default function SeoPage() {
  const [settings, setSettings] = useState<SeoSettings[]>([]);
  const [selected, setSelected] = useState("/");
  const [form, setForm] = useState<Omit<SeoSettings, "updated_at">>({
    path: "/", title: "", description: "", keywords: "",
    og_title: "", og_description: "", og_image: "", robots: "index, follow",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo").then(r => r.json()).then((data: SeoSettings[]) => {
      setSettings(data);
      const found = data.find(s => s.path === selected);
      if (found) setForm({ ...found });
    });
  }, []);

  function selectPage(path: string) {
    setSelected(path);
    const found = settings.find(s => s.path === path);
    if (found) setForm({ ...found });
    else setForm({ path, title: "", description: "", keywords: "", og_title: "", og_description: "", og_image: "", robots: "index, follow" });
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/seo", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSettings(prev => {
      const existing = prev.findIndex(s => s.path === form.path);
      const updated = { ...form, updated_at: new Date().toISOString() };
      if (existing >= 0) { const n = [...prev]; n[existing] = updated; return n; }
      return [...prev, updated];
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function f(key: keyof typeof form) {
    return (
      <input type="text" value={form[key] ?? ""} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        className="field" />
    );
  }

  const allPages = [...new Set([...PAGES, ...settings.map(s => s.path)])];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "1.5rem" }}>
      {/* Page list */}
      <div>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1rem" }}>Страницы</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {allPages.map(p => (
            <button key={p} onClick={() => selectPage(p)}
              style={{
                textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                border: "none", background: selected === p ? "rgba(143,245,255,0.08)" : "transparent",
                color: selected === p ? "#8ff5ff" : "#adaaaa",
                fontSize: "0.85rem", cursor: "pointer", fontFamily: "monospace",
              }}
            >{p}</button>
          ))}
          {/* Add custom page */}
          <button onClick={() => {
            const p = prompt("Путь страницы (например /services):");
            if (p) selectPage(p.startsWith("/") ? p : "/" + p);
          }}
            style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", border: "1px dashed rgba(73,72,71,0.3)", background: "transparent", color: "#494847", fontSize: "0.8rem", cursor: "pointer" }}>
            + Добавить
          </button>
        </div>
      </div>

      {/* Form */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>SEO</h1>
            <p style={{ color: "#494847", fontSize: "0.875rem" }}>Страница: <code style={{ background: "#1a1919", padding: "0.15rem 0.4rem", borderRadius: 4, fontSize: "0.8rem" }}>{selected}</code></p>
          </div>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
            {saving ? "Сохранение..." : saved ? "✓ Сохранено" : "Сохранить"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Basic */}
          <div style={{ background: "#1a1919", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(73,72,71,0.2)" }}>
            <div style={{ padding: "0.875rem 1.5rem", background: "#141414", borderBottom: "1px solid rgba(73,72,71,0.15)" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8ff5ff" }}>Основные теги</p>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div><label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>Title <span style={{ color: "#494847" }}>({(form.title?.length ?? 0)}/60)</span></label>{f("title")}</div>
              <div>
                <label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>Description <span style={{ color: "#494847" }}>({(form.description?.length ?? 0)}/160)</span></label>
                <textarea value={form.description ?? ""} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="field" rows={3} style={{ resize: "vertical" }} />
              </div>
              <div><label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>Keywords</label>{f("keywords")}</div>
              <div>
                <label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>Robots</label>
                <select value={form.robots} onChange={e => setForm(p => ({ ...p, robots: e.target.value }))}
                  className="field" style={{ cursor: "pointer" }}>
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div style={{ background: "#1a1919", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(73,72,71,0.2)" }}>
            <div style={{ padding: "0.875rem 1.5rem", background: "#141414", borderBottom: "1px solid rgba(73,72,71,0.15)" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ac89ff" }}>Open Graph (соцсети)</p>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div><label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>OG Title</label>{f("og_title")}</div>
              <div>
                <label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>OG Description</label>
                <textarea value={form.og_description ?? ""} onChange={e => setForm(p => ({ ...p, og_description: e.target.value }))} className="field" rows={2} style={{ resize: "vertical" }} />
              </div>
              <div><label className="label-caps" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.65rem" }}>OG Image URL</label>{f("og_image")}</div>
            </div>
          </div>

          {/* Preview */}
          <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>Превью в поиске</p>
            <div style={{ background: "#0e0e0e", borderRadius: "0.5rem", padding: "1.25rem" }}>
              <p style={{ fontSize: "0.7rem", color: "#68d391", marginBottom: "0.25rem" }}>neonarchitect.ru{form.path}</p>
              <p style={{ fontSize: "1rem", color: "#8ab4f8", marginBottom: "0.35rem", fontWeight: 500 }}>{form.title || "Заголовок страницы"}</p>
              <p style={{ fontSize: "0.85rem", color: "#adaaaa", lineHeight: 1.5 }}>{form.description || "Описание страницы появится здесь..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
