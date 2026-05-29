export type WaitlistPayload = {
  name: string;
  email: string;
  role: string;
  capabilities: string[];
  company?: string;
  useCase: string;
  signalStrength: number;
  frequencyHz: number;
};

export type WaitlistEntry = {
  id: number;
  name: string;
  email: string;
  role: string;
  capabilities: string[];
  company: string | null;
  use_case: string;
  signal_strength: number;
  frequency_hz: number;
  queue_position: number;
  created_at: string;
};

/**
 * Production: set WAITLIST_API_URL in Amplify (proxy via _redirects) and/or
 * VITE_API_BASE_URL (direct API Gateway). Local dev: leave unset (Vite proxy).
 */
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
      "Waitlist API is not configured. Deploy the API and set WAITLIST_API_URL in Amplify (see docs/DEPLOY_API.md)."
    );
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from waitlist API.");
  }
}

async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(apiUrl(path), {
    ...init,
    redirect: "manual",
  });

  if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
    throw new Error(
      "API request was redirected. Set WAITLIST_API_URL in Amplify to your API Gateway URL and redeploy."
    );
  }

  return res;
}

export async function submitWaitlist(payload: WaitlistPayload) {
  const res = await apiFetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Submission failed");
  return data as { id: number; queuePosition: number; message: string };
}

export async function fetchWaitlistEntries(adminKey: string) {
  const res = await apiFetch("/api/waitlist", {
    headers: { "x-admin-key": adminKey },
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Failed to fetch");
  return data.entries as WaitlistEntry[];
}

export async function fetchWaitlistStats(adminKey: string) {
  const res = await apiFetch("/api/waitlist/stats", {
    headers: { "x-admin-key": adminKey },
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Failed to fetch stats");
  return data as { total: number; today: number; byRole: { role: string; count: number }[] };
}
