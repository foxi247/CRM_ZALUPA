"use client";
import { useEffect, useState } from "react";

interface Lead {
  id: number; name: string | null; email: string; phone: string | null;
  message: string | null; status: string; source: string; notes: string | null;
  created_at: string; updated_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "#8ff5ff", contacted: "#ac89ff", qualified: "#f3ffca", closed: "#68d391", lost: "#fc8181",
};
const STATUS_LABELS: Record<string, string> = {
  new: "Новый", contacted: "Контакт", qualified: "Квалификация", closed: "Закрыт", lost: "Отказ",
};

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch("/api/admin/leads").then(r => r.json()).then(setLeads); }, []);

  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);

  async function updateStatus(id: number, status: string) {
    setSaving(true);
    await fetch("/api/admin/leads", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, notes } : l));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status, notes } : null);
    setSaving(false);
  }

  const counts = leads.reduce<Record<string, number>>((acc, l) => { acc[l.status] = (acc[l.status] ?? 0) + 1; return acc; }, {});

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "1.5rem" }}>
      {/* Main table */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "#e8e6e6", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>CRM — Лиды</h1>
            <p style={{ color: "#494847", fontSize: "0.875rem" }}>Заявки с сайта</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[["all", "Все", leads.length], ...Object.entries(STATUS_LABELS).map(([k, v]) => [k, v, counts[k] ?? 0])].map(([k, v, c]) => (
              <button key={k} onClick={() => setFilter(k as string)}
                style={{
                  padding: "0.4rem 0.85rem", borderRadius: "9999px", border: "none",
                  background: filter === k ? "rgba(143,245,255,0.1)" : "#1a1919",
                  color: filter === k ? "#8ff5ff" : "#adaaaa",
                  fontSize: "0.8rem", cursor: "pointer",
                  outline: filter === k ? "1px solid rgba(143,245,255,0.3)" : "none",
                }}
              >
                {v} <span style={{ opacity: 0.6 }}>({c})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <div key={k} style={{ background: "#1a1919", borderRadius: "0.5rem", padding: "0.875rem 1rem", border: "1px solid rgba(73,72,71,0.2)" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "0.4rem" }}>{v}</p>
              <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 700, fontSize: "1.5rem", color: STATUS_COLORS[k], lineHeight: 1 }}>{counts[k] ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(73,72,71,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1fr 1fr", gap: 0, padding: "0.75rem 1.25rem", background: "#141414", borderBottom: "1px solid rgba(73,72,71,0.15)" }}>
            {["Имя / Email", "Телефон", "Дата", "Статус", ""].map((h, i) => (
              <span key={i} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847" }}>{h}</span>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: "3rem", textAlign: "center", color: "#494847" }}>Нет лидов</div>
          )}
          {filtered.map(lead => (
            <div
              key={lead.id}
              onClick={() => { setSelected(lead); setNotes(lead.notes ?? ""); }}
              style={{
                display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1fr 1fr",
                padding: "1rem 1.25rem", borderBottom: "1px solid rgba(73,72,71,0.1)",
                cursor: "pointer", transition: "background 0.15s",
                background: selected?.id === lead.id ? "rgba(143,245,255,0.04)" : "transparent",
              }}
              onMouseEnter={e => { if (selected?.id !== lead.id) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={e => { if (selected?.id !== lead.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <div>
                <p style={{ fontSize: "0.875rem", color: "#e8e6e6" }}>{lead.name ?? "—"}</p>
                <p style={{ fontSize: "0.75rem", color: "#adaaaa" }}>{lead.email}</p>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#adaaaa", alignSelf: "center" }}>{lead.phone ?? "—"}</p>
              <p style={{ fontSize: "0.75rem", color: "#494847", alignSelf: "center" }}>{lead.created_at.slice(0, 10)}</p>
              <div style={{ alignSelf: "center" }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: STATUS_COLORS[lead.status] ?? "#adaaaa",
                  background: `${STATUS_COLORS[lead.status] ?? "#adaaaa"}18`,
                  padding: "0.25rem 0.5rem", borderRadius: "4px",
                }}>
                  {STATUS_LABELS[lead.status] ?? lead.status}
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#494847", alignSelf: "center", textAlign: "right" }}>→</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ background: "#1a1919", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid rgba(73,72,71,0.2)", height: "fit-content", position: "sticky", top: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 600, fontSize: "1rem", color: "#e8e6e6" }}>
              {selected.name ?? "Лид #" + selected.id}
            </h2>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#494847", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
            {[["Email", selected.email], ["Телефон", selected.phone ?? "—"], ["Источник", selected.source], ["Создан", selected.created_at.slice(0, 16).replace("T", " ")]].map(([l, v]) => (
              <div key={l}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "0.25rem" }}>{l}</p>
                <p style={{ fontSize: "0.875rem", color: "#adaaaa" }}>{v}</p>
              </div>
            ))}
            {selected.message && (
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "0.25rem" }}>Сообщение</p>
                <p style={{ fontSize: "0.875rem", color: "#adaaaa", lineHeight: 1.6, background: "#262626", borderRadius: "0.5rem", padding: "0.75rem" }}>{selected.message}</p>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "0.5rem" }}>Статус</p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {Object.entries(STATUS_LABELS).map(([k, v]) => (
                <button key={k} onClick={() => updateStatus(selected.id, k)}
                  style={{
                    padding: "0.35rem 0.7rem", borderRadius: "9999px", border: "none",
                    background: selected.status === k ? `${STATUS_COLORS[k]}20` : "#262626",
                    color: selected.status === k ? STATUS_COLORS[k] : "#adaaaa",
                    fontSize: "0.75rem", cursor: "pointer",
                    outline: selected.status === k ? `1px solid ${STATUS_COLORS[k]}50` : "none",
                  }}
                >{v}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#494847", marginBottom: "0.5rem" }}>Заметки</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="field" style={{ resize: "vertical" }} placeholder="Добавить заметку..." />
          </div>

          <button onClick={() => updateStatus(selected.id, selected.status)} disabled={saving} className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Сохранение..." : "Сохранить заметку"}
          </button>
        </div>
      )}
    </div>
  );
}
