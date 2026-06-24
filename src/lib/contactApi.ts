import { apiFetch, parseApiResponse } from "./apiClient";

export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  role?: string;
  useCase: string;
  message: string;
};

export async function submitContact(payload: ContactPayload) {
  const res = await apiFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse(res);
  if (!res.ok) {
    throw new Error((data.error as string) || "Failed to send message");
  }
  return data;
}
