import { apiFetch, parseApiResponse } from "./apiClient";

export type CCValidationPayload = {
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  answers: Record<string, string | string[]>;
  pilotReadinessScore: number;
  auditCoveragePct: number;
};

export type CCValidationEntry = {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  answers: Record<string, string | string[]>;
  pilot_readiness_score: number;
  audit_coverage_pct: number;
  created_at: string;
};

export async function submitCCValidation(payload: CCValidationPayload) {
  const res = await apiFetch("/api/cc-validation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Submission failed");
  return data as { id: string; message: string };
}

export async function fetchCCValidationEntries(adminKey: string) {
  const res = await apiFetch("/api/cc-validation", {
    headers: { "x-admin-key": adminKey },
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Failed to fetch");
  const entries = (data.entries as Record<string, unknown>[]).map((row) => ({
    id: String(row.submission_id ?? row.id ?? ""),
    name: row.name as string,
    company: row.company as string,
    role: row.role as string,
    phone: row.phone as string,
    email: row.email as string,
    city: row.city as string,
    answers: row.answers as Record<string, string | string[]>,
    pilot_readiness_score: Number(row.pilot_readiness_score ?? 0),
    audit_coverage_pct: Number(row.audit_coverage_pct ?? 0),
    created_at: row.created_at as string,
  }));
  return entries as CCValidationEntry[];
}
