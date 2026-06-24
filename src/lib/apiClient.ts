const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

/** Local Vite dev with no VITE_API_BASE_URL → requests go through /api proxy to :3001 */
export const IS_LOCAL_PROXY_DEV = import.meta.env.DEV && !API_BASE;

function apiUnreachableMessage() {
  if (IS_LOCAL_PROXY_DEV) {
    return "API server is not running. Use npm run dev:all (starts frontend + API), or run npm run server in another terminal.";
  }
  return "Waitlist API is not configured. Deploy the API and set WAITLIST_API_URL in Amplify (see docs/DEPLOY_API.md).";
}

export function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export async function parseApiResponse(res: Response) {
  const text = await res.text();
  const contentType = res.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error(apiUnreachableMessage());
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from API.");
  }
}

export async function apiFetch(path: string, init?: RequestInit) {
  let res: Response;
  try {
    res = await fetch(apiUrl(path), { ...init, redirect: "manual" });
  } catch {
    throw new Error(apiUnreachableMessage());
  }

  if ([301, 302, 307, 308].includes(res.status)) {
    throw new Error(
      IS_LOCAL_PROXY_DEV
        ? "API request was redirected. Unset VITE_API_BASE_URL for local proxy, or point it at http://localhost:3001."
        : "API request was redirected. Set WAITLIST_API_URL in Amplify to your API Gateway URL and redeploy."
    );
  }

  return res;
}
