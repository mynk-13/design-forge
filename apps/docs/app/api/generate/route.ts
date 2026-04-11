import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { PromptBuilder } from "@designforge/ai";
import {
  GENERATION_TIMEOUT_MS,
  MAX_PROMPT_LENGTH,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "../../../lib/ai-config";
import { streamText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { corsHeaders, handlePreflight } from "../../../lib/cors";

export const runtime = "edge";

// ─── In-memory rate limiter (sliding window, per IP) ─────────────────────────
// Note: Edge instances are not shared — this is per-instance rate limiting.
// A global Redis store (Vercel KV) will be added in v2.0 (ADR-009).
interface RateEntry {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateEntry>();

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const entry = rateLimitMap.get(ip) ?? { timestamps: [] };
  // Drop timestamps outside the sliding window
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.timestamps.length);
  const resetAt = entry.timestamps[0]
    ? entry.timestamps[0] + RATE_LIMIT_WINDOW_MS
    : now + RATE_LIMIT_WINDOW_MS;

  if (entry.timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, entry);
    return { allowed: false, remaining: 0, resetAt };
  }

  entry.timestamps.push(now);
  rateLimitMap.set(ip, entry);
  return { allowed: true, remaining: remaining - 1, resetAt };
}

// ─── Provider model instances (ADR-003 fallback chain) ───────────────────────
function getModel(provider: string) {
  switch (provider) {
    case "anthropic":
      return anthropic("claude-sonnet-4-20250514");
    case "openai":
      return openai("gpt-4o-mini");
    case "google":
      return google("gemini-2.0-flash");
    default:
      return anthropic("claude-sonnet-4-20250514");
  }
}

// ─── Request schema ───────────────────────────────────────────────────────────
interface GenerateRequest {
  prompt: string;
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
}

const VALID_ROLES = new Set(["user", "assistant"]);
const MAX_BODY_BYTES = 50_000; // 50 KB hard cap before JSON.parse
const MAX_MESSAGES = 40; // 20 conversation pairs
const MAX_MESSAGE_CONTENT = 4_000; // per-message character cap

// ─── CORS preflight ───────────────────────────────────────────────────────────
export function OPTIONS(req: NextRequest) {
  return handlePreflight(req, "POST, OPTIONS") ?? new Response(null, { status: 204 });
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const cors = corsHeaders("POST, OPTIONS");

  // 1. Reject oversized bodies before JSON.parse (prevents memory exhaustion)
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "PAYLOAD_TOO_LARGE", message: "Request body exceeds 50 KB limit." },
      { status: 413, headers: cors },
    );
  }

  // 2. Extract IP for rate limiting
  // Take the last (rightmost) x-forwarded-for entry to avoid spoofed prepended IPs.
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip =
    (forwardedFor ? forwardedFor.split(",").at(-1)?.trim() : undefined) ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // 3. Rate limit check
  const { allowed, remaining, resetAt } = checkRateLimit(ip);
  const rlHeaders = {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(resetAt),
  };

  if (!allowed) {
    return NextResponse.json(
      { error: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Try again later." },
      { status: 429, headers: { ...rlHeaders, ...cors } },
    );
  }

  // 4. Parse + validate body
  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return NextResponse.json(
      { error: "INVALID_REQUEST", message: "Request body must be valid JSON." },
      { status: 400, headers: { ...rlHeaders, ...cors } },
    );
  }

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json(
      { error: "EMPTY_PROMPT", message: "Prompt cannot be empty." },
      { status: 400, headers: { ...rlHeaders, ...cors } },
    );
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      {
        error: "PROMPT_TOO_LONG",
        message: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.`,
      },
      { status: 400, headers: { ...rlHeaders, ...cors } },
    );
  }

  // Validate messages array — runtime check prevents prompt injection via spoofed roles
  if (body.messages !== undefined) {
    if (!Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "INVALID_REQUEST", message: "messages must be an array." },
        { status: 400, headers: { ...rlHeaders, ...cors } },
      );
    }
    if (body.messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "INVALID_REQUEST", message: `messages array exceeds ${MAX_MESSAGES} entry limit.` },
        { status: 400, headers: { ...rlHeaders, ...cors } },
      );
    }
    for (const msg of body.messages) {
      if (typeof msg !== "object" || msg === null || Array.isArray(msg)) {
        return NextResponse.json(
          { error: "INVALID_REQUEST", message: "Each message must be an object." },
          { status: 400, headers: { ...rlHeaders, ...cors } },
        );
      }
      if (!VALID_ROLES.has((msg as Record<string, unknown>).role as string)) {
        return NextResponse.json(
          { error: "INVALID_REQUEST", message: 'Message role must be "user" or "assistant".' },
          { status: 400, headers: { ...rlHeaders, ...cors } },
        );
      }
      const content = (msg as Record<string, unknown>).content;
      if (typeof content !== "string") {
        return NextResponse.json(
          { error: "INVALID_REQUEST", message: "Message content must be a string." },
          { status: 400, headers: { ...rlHeaders, ...cors } },
        );
      }
      if (content.length > MAX_MESSAGE_CONTENT) {
        return NextResponse.json(
          { error: "INVALID_REQUEST", message: `Message content exceeds ${MAX_MESSAGE_CONTENT} character limit.` },
          { status: 400, headers: { ...rlHeaders, ...cors } },
        );
      }
    }
  }

  // 5. Build system prompt
  const pb = new PromptBuilder();
  const systemPrompt = pb.build();

  // 6. Assemble conversation history (max 10 pairs — FIFO truncation, FR-AI-012)
  const history = (body.messages ?? []).slice(-20); // 10 pairs × 2

  // 7. Attempt provider chain with 30s timeout (ADR-003)
  const providers = [
    process.env["AI_PROVIDER_PRIMARY"] ?? "anthropic",
    process.env["AI_PROVIDER_FALLBACK"] ?? "openai",
    process.env["AI_PROVIDER_TERTIARY"] ?? "google",
  ].filter(Boolean);

  for (const provider of providers) {
    // Skip providers with no API key configured
    const keyMap: Record<string, string | undefined> = {
      anthropic: process.env["ANTHROPIC_API_KEY"],
      openai: process.env["OPENAI_API_KEY"],
      google: process.env["GOOGLE_API_KEY"],
    };
    if (!keyMap[provider]) continue;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

      const result = streamText({
        model: getModel(provider),
        system: systemPrompt,
        messages: [
          ...history,
          { role: "user" as const, content: prompt },
        ],
        abortSignal: controller.signal,
        onFinish: () => clearTimeout(timeout),
      });

      // Return streaming SSE response — debug headers only in development
      const isDev = process.env.NODE_ENV !== "production";
      return result.toTextStreamResponse({
        headers: {
          ...rlHeaders,
          ...cors,
          ...(isDev && { "X-Provider": provider, "X-Prompt-Version": pb.getVersion() }),
        },
      });
    } catch (err) {
      // Timeout or 5xx — try next provider
      const isAbort = err instanceof Error && err.name === "AbortError";
      const isServerError =
        err instanceof Error &&
        (err.message.includes("5") || err.message.includes("overloaded"));
      if (!isAbort && !isServerError) {
        // Non-retryable error (e.g. auth) — fail fast
        return NextResponse.json(
          { error: "GENERATION_FAILED", message: "Generation failed." },
          { status: 500, headers: { ...rlHeaders, ...cors } },
        );
      }
      // Continue to next provider
    }
  }

  // All providers failed or no keys configured
  return NextResponse.json(
    { error: "GENERATION_FAILED", message: "All providers failed. Please try again." },
    { status: 500, headers: { ...rlHeaders, ...cors } },
  );
}
