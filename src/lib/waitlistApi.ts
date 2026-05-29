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

/** Empty locally (Vite proxy). Set in Amplify: VITE_API_BASE_URL = API Gateway URL */
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}

async function parseApiResponse(res: Response) {
  const text = await res.text();
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "Waitlist API is not reachable. Deploy the backend (see docs/DEPLOY_API.md) and set VITE_API_BASE_URL in Amplify."
    );
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from waitlist API.");
  }
}

export async function submitWaitlist(payload: WaitlistPayload) {
  const res = await fetch(apiUrl("/api/waitlist"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Submission failed");
  return data as { id: number; queuePosition: number; message: string };
}

export async function fetchWaitlistEntries(adminKey: string) {
  const res = await fetch(apiUrl("/api/waitlist"), {
    headers: { "x-admin-key": adminKey },
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Failed to fetch");
  return data.entries as WaitlistEntry[];
}

export async function fetchWaitlistStats(adminKey: string) {
  const res = await fetch(apiUrl("/api/waitlist/stats"), {
    headers: { "x-admin-key": adminKey },
  });
  const data = await parseApiResponse(res);
  if (!res.ok) throw new Error((data.error as string) || "Failed to fetch stats");
  return data as { total: number; today: number; byRole: { role: string; count: number }[] };
}
