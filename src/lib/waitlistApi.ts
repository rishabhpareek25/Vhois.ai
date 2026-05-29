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

export async function submitWaitlist(payload: WaitlistPayload) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Submission failed");
  return data as { id: number; queuePosition: number; message: string };
}

export async function fetchWaitlistEntries(adminKey: string) {
  const res = await fetch("/api/waitlist", {
    headers: { "x-admin-key": adminKey },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch");
  return data.entries as WaitlistEntry[];
}

export async function fetchWaitlistStats(adminKey: string) {
  const res = await fetch("/api/waitlist/stats", {
    headers: { "x-admin-key": adminKey },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch stats");
  return data as { total: number; today: number; byRole: { role: string; count: number }[] };
}
