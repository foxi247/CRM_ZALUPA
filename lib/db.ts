import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "neon.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content (
      key     TEXT PRIMARY KEY,
      value   TEXT NOT NULL,
      label   TEXT,
      section TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      name    TEXT,
      email   TEXT NOT NULL,
      phone   TEXT,
      message TEXT,
      status  TEXT DEFAULT 'new',
      source  TEXT DEFAULT 'contact_form',
      notes   TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      path       TEXT NOT NULL,
      referrer   TEXT,
      user_agent TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS seo_settings (
      path        TEXT PRIMARY KEY,
      title       TEXT,
      description TEXT,
      keywords    TEXT,
      og_title    TEXT,
      og_description TEXT,
      og_image    TEXT,
      robots      TEXT DEFAULT 'index, follow',
      updated_at  TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed admin user
  const adminCount = (db.prepare("SELECT COUNT(*) as c FROM admin_users").get() as { c: number }).c;
  if (adminCount === 0) {
    db.prepare("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)").run(
      "admin@neonarchitect.ru",
      bcrypt.hashSync("admin123", 10)
    );
  }

  // Seed default theme
  const themeDefaults: Record<string, string> = {
    "theme.primary":   "#8ff5ff",
    "theme.secondary": "#ac89ff",
    "theme.tertiary":  "#f3ffca",
    "theme.surface":   "#0e0e0e",
    "theme.preset":    "default",
  };
  for (const [key, value] of Object.entries(themeDefaults)) {
    db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)").run(key, value);
  }

  // Seed default content
  const contentDefaults: { key: string; value: string; label: string; section: string }[] = [
    { key: "hero.label",         value: "Neon Architect",                                          label: "Hero — метка",       section: "hero" },
    { key: "hero.title1",        value: "ПРИВОДИМ",                                                label: "Hero — заголовок 1", section: "hero" },
    { key: "hero.title_accent",  value: "КЛИЕНТОВ",                                                label: "Hero — акцент",      section: "hero" },
    { key: "hero.title2",        value: "А НЕ ПРОСТО ТРАФИК",                                     label: "Hero — заголовок 2", section: "hero" },
    { key: "hero.subtitle",      value: "Архитектура высокоэффективного маркетинга для технологичных компаний. Масштабируем ROI через Data-driven решения и премиальный UX.", label: "Hero — подзаголовок", section: "hero" },
    { key: "hero.cta_primary",   value: "Оставить заявку",                                        label: "Hero — CTA основной",section: "hero" },
    { key: "hero.cta_secondary", value: "Наши кейсы →",                                           label: "Hero — CTA второй",  section: "hero" },
    { key: "services.label",     value: "Наши экспертизы",                                        label: "Услуги — метка",     section: "services" },
    { key: "services.title",     value: "ЭКОСИСТЕМА РОСТА",                                       label: "Услуги — заголовок", section: "services" },
    { key: "cases.label",        value: "Портфолио",                                              label: "Кейсы — метка",      section: "cases" },
    { key: "cases.title",        value: "КЕЙСЫ, КОТОРЫЕ ГОВОРЯТ",                                 label: "Кейсы — заголовок",  section: "cases" },
    { key: "how.label",          value: "Как мы работаем",                                        label: "Процесс — метка",    section: "how" },
    { key: "how.title",          value: "КАК МЫ СТРОИМ ВАШ УСПЕХ",                               label: "Процесс — заголовок",section: "how" },
    { key: "how.subtitle",       value: "Пять последовательных этапов, которые превращают маркетинговый хаос в предсказуемую машину роста.", label: "Процесс — описание", section: "how" },
    { key: "contact.label",      value: "Связаться",                                              label: "Контакт — метка",    section: "contact" },
    { key: "contact.title",      value: "ГОТОВЫ К ПРОРЫВУ?",                                      label: "Контакт — заголовок",section: "contact" },
    { key: "contact.subtitle",   value: "Оставьте заявку, и мы подготовим бесплатный аудит вашей текущей маркетинговой ситуации в течение 24 часов.", label: "Контакт — описание", section: "contact" },
    { key: "footer.tagline",     value: "Строим системы привлечения, а не разовые кампании.",     label: "Футер — слоган",     section: "footer" },
    { key: "nav.cta",            value: "Получить стратегию",                                     label: "Навбар — CTA",       section: "nav" },
  ];
  for (const row of contentDefaults) {
    db.prepare("INSERT OR IGNORE INTO content (key, value, label, section) VALUES (?, ?, ?, ?)").run(
      row.key, row.value, row.label, row.section
    );
  }

  // Seed default SEO
  db.prepare(`
    INSERT OR IGNORE INTO seo_settings (path, title, description, keywords) VALUES (?, ?, ?, ?)
  `).run(
    "/",
    "Neon Architect — Приводим клиентов, а не просто трафик",
    "Архитектура высокоэффективного маркетинга для технологичных компаний. Масштабируем ROI через Data-driven решения и премиальный UX.",
    "digital marketing, таргетированная реклама, контекстная реклама, SMM, CRM маркетинг"
  );
}

// ── Typed helpers ──────────────────────────────────────────────────

export function getSetting(key: string): string | null {
  const row = getDb().prepare("SELECT value FROM settings WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string) {
  getDb().prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))").run(key, value);
}

export function getAllSettings(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function getContent(key: string): string | null {
  const row = getDb().prepare("SELECT value FROM content WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function getAllContent(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM content").all() as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function setContent(key: string, value: string) {
  getDb().prepare("UPDATE content SET value = ?, updated_at = datetime('now') WHERE key = ?").run(value, key);
}

export function getAllContentMeta() {
  return getDb().prepare("SELECT key, value, label, section FROM content ORDER BY section, key").all() as {
    key: string; value: string; label: string; section: string;
  }[];
}

export interface Lead {
  id: number; name: string | null; email: string; phone: string | null;
  message: string | null; status: string; source: string; notes: string | null;
  created_at: string; updated_at: string;
}

export function getLeads(): Lead[] {
  return getDb().prepare("SELECT * FROM leads ORDER BY created_at DESC").all() as Lead[];
}

export function createLead(data: { name?: string; email: string; phone?: string; message?: string; source?: string }) {
  return getDb().prepare(
    "INSERT INTO leads (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)"
  ).run(data.name ?? null, data.email, data.phone ?? null, data.message ?? null, data.source ?? "contact_form");
}

export function updateLeadStatus(id: number, status: string, notes?: string) {
  getDb().prepare("UPDATE leads SET status = ?, notes = COALESCE(?, notes), updated_at = datetime('now') WHERE id = ?").run(status, notes ?? null, id);
}

export function trackPageView(path: string, referrer?: string, userAgent?: string) {
  getDb().prepare("INSERT INTO page_views (path, referrer, user_agent) VALUES (?, ?, ?)").run(path, referrer ?? null, userAgent ?? null);
}

export interface SeoSettings {
  path: string; title: string | null; description: string | null;
  keywords: string | null; og_title: string | null; og_description: string | null;
  og_image: string | null; robots: string; updated_at: string;
}

export function getSeoSettings(pagePath: string): SeoSettings | null {
  return getDb().prepare("SELECT * FROM seo_settings WHERE path = ?").get(pagePath) as SeoSettings | null;
}

export function setSeoSettings(pagePath: string, data: Partial<Omit<SeoSettings, "path" | "updated_at">>) {
  getDb().prepare(`
    INSERT INTO seo_settings (path, title, description, keywords, og_title, og_description, og_image, robots)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(path) DO UPDATE SET
      title = excluded.title, description = excluded.description,
      keywords = excluded.keywords, og_title = excluded.og_title,
      og_description = excluded.og_description, og_image = excluded.og_image,
      robots = excluded.robots, updated_at = datetime('now')
  `).run(pagePath, data.title ?? null, data.description ?? null, data.keywords ?? null,
         data.og_title ?? null, data.og_description ?? null, data.og_image ?? null,
         data.robots ?? "index, follow");
}

export function getAllSeoSettings(): SeoSettings[] {
  return getDb().prepare("SELECT * FROM seo_settings ORDER BY path").all() as SeoSettings[];
}

export function getAnalytics() {
  const db = getDb();
  const totalViews  = (db.prepare("SELECT COUNT(*) as c FROM page_views").get() as { c: number }).c;
  const todayViews  = (db.prepare("SELECT COUNT(*) as c FROM page_views WHERE date(created_at) = date('now')").get() as { c: number }).c;
  const weekViews   = (db.prepare("SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', '-7 days')").get() as { c: number }).c;
  const topPages    = db.prepare("SELECT path, COUNT(*) as views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 10").all() as { path: string; views: number }[];
  const daily7      = db.prepare(`
    SELECT date(created_at) as day, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', '-7 days')
    GROUP BY day ORDER BY day
  `).all() as { day: string; views: number }[];
  const totalLeads  = (db.prepare("SELECT COUNT(*) as c FROM leads").get() as { c: number }).c;
  const newLeads    = (db.prepare("SELECT COUNT(*) as c FROM leads WHERE status = 'new'").get() as { c: number }).c;
  return { totalViews, todayViews, weekViews, topPages, daily7, totalLeads, newLeads };
}

export function getAdminUser(email: string) {
  return getDb().prepare("SELECT * FROM admin_users WHERE email = ?").get(email) as
    { id: number; email: string; password_hash: string } | undefined;
}
