"use client";
import { useEffect, useState } from "react";

const PRESETS = [
  { id: "default", name: "Cyan Space",   primary: "#8ff5ff", secondary: "#ac89ff", tertiary: "#f3ffca", surface: "#0e0e0e" },
  { id: "violet",  name: "Violet Night", primary: "#b794f4", secondary: "#f687b3", tertiary: "#fbb6ce", surface: "#0d0b14" },
  { id: "amber",   name: "Amber Fire",   primary: "#f6ad55", secondary: "#fc8181", tertiary: "#fefcbf", surface: "#0e0b06" },
  { id: "emerald", name: "Emerald Tech", primary: "#68d391", secondary: "#63b3ed", tertiary: "#e9d8fd", surface: "#060e0a" },
  { id: "solar",   name: "Solar Flare",  primary: "#fc8181", secondary: "#f6ad55", tertiary: "#fefcbf", surface: "#0e0806" },
];

interface Theme { primary: string; secondary: string; tertiary: string; surface: string; preset: string; }

function ColorSwatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: "0.5rem", background: value, border: "1px solid rgba(73,72,71,0.3)" }} />
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.75rem", color: "#adaaaa", marginBottom: "0.3rem" }}>{label}</p>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="field" style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem", fontFamily: "monospace" }} />
      </div>
    </div>
  );
}

export default function ThemePage() {
  const [theme, setTheme] = useState<Theme>({ primary: "#8ff5ff", secondary: "#ac89ff", tertiary: "#f3ffca", surface: "#0e0e0e", preset: "default" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/theme").then(r => r.json()).then(setTheme);
  }, []);

  function applyPreset(preset: typeof PRESETS[0]) {
    setTheme({ primary: preset.primary, secondary: preset.secondary, tertiary: preset.tertiary, surface: preset.surface, preset: preset.id });
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "theme.primary": theme.primary, "theme.secondary": theme.secondary,
        "theme.tertiary": theme.tertiary, "theme.surface": theme.surface,
        "theme.preset": theme.preset,
      }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>Тема сайта</h1>
          <p style={{ color: "#494847", fontSize: "0.875rem" }}>Выберите пресет или настройте цвета вручную</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.6 : 1 }}>
          {saving ? "Сохранение..." : saved ? "✓ Сохранено" : "Применить тему"}
        </button>
      </div>

      {/* Presets */}
      <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>Пресеты</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.6rem 1rem", borderRadius: "0.5rem", border: "none",
                background: theme.preset === p.id ? "rgba(143,245,255,0.1)" : "#262626",
                cursor: "pointer", transition: "background 0.2s",
                outline: theme.preset === p.id ? `1px solid ${p.primary}60` : "none",
              }}
            >
              {/* Color dots */}
              <div style={{ display: "flex", gap: "3px" }}>
                {[p.primary, p.secondary, p.tertiary].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontSize: "0.8rem", color: "#adaaaa" }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>Цвета</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <ColorSwatch label="Primary (акцент основной)"   value={theme.primary}   onChange={v => setTheme(p => ({ ...p, primary: v, preset: "custom" }))} />
          <ColorSwatch label="Secondary (акцент второй)"   value={theme.secondary} onChange={v => setTheme(p => ({ ...p, secondary: v, preset: "custom" }))} />
          <ColorSwatch label="Tertiary (акцент третий)"    value={theme.tertiary}  onChange={v => setTheme(p => ({ ...p, tertiary: v, preset: "custom" }))} />
          <ColorSwatch label="Surface (фон сайта)"         value={theme.surface}   onChange={v => setTheme(p => ({ ...p, surface: v, preset: "custom" }))} />
        </div>
      </div>

      {/* Live preview */}
      <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#494847", marginBottom: "1.25rem" }}>Превью</p>
        <div style={{ background: theme.surface, borderRadius: "0.75rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#e8e6e6", letterSpacing: "-0.02em" }}>
            NEON <span style={{ background: `linear-gradient(135deg,${theme.primary},${theme.secondary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ARCHITECT</span>
          </h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ padding: "0.6rem 1.25rem", borderRadius: "9999px", background: `linear-gradient(135deg,${theme.primary},${theme.secondary})`, color: "#000", fontSize: "0.85rem", fontWeight: 700 }}>Primary CTA</div>
            <div style={{ padding: "0.6rem 1.25rem", borderRadius: "9999px", border: `1px solid ${theme.primary}40`, color: "#e8e6e6", fontSize: "0.85rem" }}>Secondary CTA</div>
            <div style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", background: `${theme.tertiary}20`, color: theme.tertiary, fontSize: "0.75rem", fontWeight: 700 }}>TAG</div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[theme.primary, theme.secondary, theme.tertiary].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: c, boxShadow: `0 0 12px ${c}60` }} />
                <span style={{ fontSize: "0.75rem", color: "#adaaaa", fontFamily: "monospace" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
