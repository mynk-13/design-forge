/**
 * Shared CORS helpers for all /api/* routes.
 *
 * Allowed origin is read from SITE_ORIGIN (set in Vercel env vars for production).
 * Falls back to localhost:3000 for local development.
 */

const ORIGIN = process.env.SITE_ORIGIN ?? "http://localhost:3000";

export function corsHeaders(methods: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": ORIGIN,
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

/** Returns a 204 preflight response, or null if the request is not OPTIONS. */
export function handlePreflight(req: Request, methods: string): Response | null {
  if (req.method !== "OPTIONS") return null;
  return new Response(null, { status: 204, headers: corsHeaders(methods) });
}
