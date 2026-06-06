const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

async function parseApiResponse(res: Response) {
  const text = await res.text();
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "Validation API is not configured. Deploy the API and set WAITLIST_API_URL in Amplify."
    );
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from validation API.");
  }
}

async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(apiUrl(path), { ...init, redirect: "manual" });
  if ([301, 302, 307, 308].includes(res.status)) {
    throw new Error("API request was redirected. Check WAITLIST_API_URL in Amplify.");
  }
  return res;
}

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
