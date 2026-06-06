import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  insertEntry,
  getAllEntries,
  getStats,
  getEntryByEmail,
  insertCCValidation,
  getAllCCValidations,
} from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "vhois-admin-dev";

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed =
      /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
      /^https:\/\/[\w-]+\.ngrok-free\.dev$/.test(origin) ||
      /^https:\/\/[\w.-]+\.amplifyapp\.com$/.test(origin) ||
      origin === "https://plunging-backing-margarita.ngrok-free.dev";
    callback(null, allowed);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "vhois-waitlist" });
});

app.post("/api/waitlist", (req, res) => {
  try {
    const { name, email, role, capabilities, company, useCase, signalStrength, frequencyHz } =
      req.body;

    if (!name?.trim() || !email?.includes("@") || !role || !useCase?.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!Array.isArray(capabilities) || capabilities.length === 0) {
      return res.status(400).json({ error: "Select at least one capability" });
    }

    const existing = getEntryByEmail(email.toLowerCase().trim());
    if (existing) {
      return res.json({
        id: existing.id,
        queuePosition: existing.queue_position,
        alreadyRegistered: true,
        message: "Already on the waitlist",
      });
    }

    const total = getStats().total;
    const queuePosition = 2400 + total + Math.floor(Math.random() * 120);

    const result = insertEntry({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      capabilities: JSON.stringify(capabilities),
      company: company?.trim() || null,
      use_case: useCase.trim(),
      signal_strength: signalStrength ?? 100,
      frequency_hz: frequencyHz ?? 440,
      queue_position: queuePosition,
    });

    res.status(201).json({
      id: result.lastInsertRowid,
      queuePosition,
      message: "Transmission received",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/waitlist", requireAdmin, (_req, res) => {
  res.json({ entries: getAllEntries() });
});

app.get("/api/waitlist/stats", requireAdmin, (_req, res) => {
  res.json(getStats());
});

app.post("/api/cc-validation", (req, res) => {
  try {
    const {
      name,
      company,
      role,
      phone,
      email,
      city,
      answers,
      pilotReadinessScore,
      auditCoveragePct,
    } = req.body;

    if (
      !name?.trim() ||
      !company?.trim() ||
      !role?.trim() ||
      !phone?.trim() ||
      !email?.includes("@") ||
      !city?.trim() ||
      !answers ||
      typeof answers !== "object"
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = insertCCValidation({
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      phone: phone.trim(),
      email: email.toLowerCase().trim(),
      city: city.trim(),
      answers: JSON.stringify(answers),
      pilot_readiness_score: pilotReadinessScore ?? 0,
      audit_coverage_pct: auditCoveragePct ?? 0,
    });

    res.status(201).json({
      id: String(result.lastInsertRowid),
      message: "Validation packet sealed",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/cc-validation", requireAdmin, (_req, res) => {
  res.json({ entries: getAllCCValidations() });
});

app.listen(PORT, () => {
  console.log(`Waitlist API running → http://localhost:${PORT}`);
});
