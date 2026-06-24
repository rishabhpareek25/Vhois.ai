import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, "waitlist.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    capabilities TEXT NOT NULL,
    company TEXT,
    use_case TEXT NOT NULL,
    signal_strength INTEGER NOT NULL DEFAULT 0,
    frequency_hz INTEGER NOT NULL DEFAULT 440,
    queue_position INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist_entries(created_at DESC);

  CREATE TABLE IF NOT EXISTS cc_validation_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    answers TEXT NOT NULL,
    pilot_readiness_score INTEGER NOT NULL,
    audit_coverage_pct INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_cc_validation_created ON cc_validation_entries(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_cc_validation_email ON cc_validation_entries(email);

  CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    use_case TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_inquiries(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries(email);
`);

export function insertEntry(entry) {
  const stmt = db.prepare(`
    INSERT INTO waitlist_entries (name, email, role, capabilities, company, use_case, signal_strength, frequency_hz, queue_position)
    VALUES (@name, @email, @role, @capabilities, @company, @use_case, @signal_strength, @frequency_hz, @queue_position)
  `);
  return stmt.run(entry);
}

export function getAllEntries() {
  return db
    .prepare(`SELECT * FROM waitlist_entries ORDER BY created_at DESC`)
    .all()
    .map((row) => ({
      ...row,
      capabilities: JSON.parse(row.capabilities),
    }));
}

export function getStats() {
  const total = db.prepare(`SELECT COUNT(*) as count FROM waitlist_entries`).get().count;
  const today = db
    .prepare(`SELECT COUNT(*) as count FROM waitlist_entries WHERE date(created_at) = date('now')`)
    .get().count;
  const byRole = db
    .prepare(`SELECT role, COUNT(*) as count FROM waitlist_entries GROUP BY role`)
    .all();
  return { total, today, byRole };
}

export function getEntryByEmail(email) {
  const row = db.prepare(`SELECT * FROM waitlist_entries WHERE email = ?`).get(email);
  if (!row) return null;
  return { ...row, capabilities: JSON.parse(row.capabilities) };
}

export function insertCCValidation(entry) {
  const stmt = db.prepare(`
    INSERT INTO cc_validation_entries (
      name, company, role, phone, email, city, answers,
      pilot_readiness_score, audit_coverage_pct
    ) VALUES (
      @name, @company, @role, @phone, @email, @city, @answers,
      @pilot_readiness_score, @audit_coverage_pct
    )
  `);
  return stmt.run(entry);
}

export function getAllCCValidations() {
  return db
    .prepare(`SELECT * FROM cc_validation_entries ORDER BY created_at DESC`)
    .all()
    .map((row) => ({
      ...row,
      answers: JSON.parse(row.answers),
    }));
}

export function insertContactInquiry(entry) {
  const stmt = db.prepare(`
    INSERT INTO contact_inquiries (name, company, email, phone, role, use_case, message)
    VALUES (@name, @company, @email, @phone, @role, @use_case, @message)
  `);
  return stmt.run(entry);
}

export function getAllContactInquiries() {
  return db
    .prepare(`SELECT * FROM contact_inquiries ORDER BY created_at DESC`)
    .all();
}

export default db;
