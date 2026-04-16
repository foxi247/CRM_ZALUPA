"use client";
import { useEffect, useState } from "react";

interface ContentItem { key: string; value: string; label: string; section: string; }

const SECTION_LABELS: Record<string, string> = {
  hero: "Главный экран (Hero)",
  services: "Услуги",
  cases: "Кейсы",
  how: "Как мы работаем",
  contact: "Форма связи",
  footer: "Футер",
  nav: "Навигация",
};

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content").then(r => r.json()).then((data: ContentItem[]) => {
      setItems(data);
      setEdits(Object.fromEntries(data.map(d => [d.key, d.value])));
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edits),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const grouped = items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    (acc[item.section] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>Редактор контента</h1>
          <p style={{ color: "#494847", fontSize: "0.875rem" }}>Все тексты сайта в одном месте</p>
        </div>
        <button
          onClick={save} disabled={saving}
          className="btn-primary"
          style={{ opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Сохранение..." : saved ? "✓ Сохранено" : "Сохранить всё"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {Object.entries(grouped).map(([section, sectionItems]) => (
          <div key={section} style={{ background: "#1a1919", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(73,72,71,0.2)" }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(73,72,71,0.15)", background: "#141414" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8ff5ff" }}>
                {SECTION_LABELS[section] ?? section}
              </p>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {sectionItems.map(item => (
                <div key={item.key}>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#adaaaa", marginBottom: "0.4rem" }}>{item.label}</label>
                  {(edits[item.key]?.length ?? 0) > 80 ? (
                    <textarea
                      value={edits[item.key] ?? ""}
                      onChange={e => setEdits(prev => ({ ...prev, [item.key]: e.target.value }))}
                      rows={3}
                      className="field"
                      style={{ resize: "vertical" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={edits[item.key] ?? ""}
                      onChange={e => setEdits(prev => ({ ...prev, [item.key]: e.target.value }))}
                      className="field"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
