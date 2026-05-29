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

export default db;
