import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import {
  GENERATION_TIMEOUT_MS,
  MAX_PROMPT_LENGTH,
  PromptBuilder,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "@designforge/ai";
import { streamText } from "ai";
import { type NextRequest, NextResponse } from "next/server";

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

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Extract IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // 2. Rate limit check
  const { allowed, remaining, resetAt } = checkRateLimit(ip);
  const rlHeaders = {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(resetAt),
  };

  if (!allowed) {
    return NextResponse.json(
      { error: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Try again later." },
      { status: 429, headers: rlHeaders },
    );
  }

  // 3. Parse + validate body
  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return NextResponse.json(
      { error: "INVALID_REQUEST", message: "Request body must be valid JSON." },
      { status: 400, headers: rlHeaders },
    );
  }

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json(
      { error: "EMPTY_PROMPT", message: "Prompt cannot be empty." },
      { status: 400, headers: rlHeaders },
    );
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      {
        error: "PROMPT_TOO_LONG",
        message: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.`,
      },
      { status: 400, headers: rlHeaders },
    );
  }

  // 4. Build system prompt
  const pb = new PromptBuilder();
  const systemPrompt = pb.build();

  // 5. Assemble conversation history (max 10 pairs — FIFO truncation, FR-AI-012)
  const history = (body.messages ?? []).slice(-20); // 10 pairs × 2

  // 6. Attempt provider chain with 30s timeout (ADR-003)
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

      // Return streaming SSE response with rate-limit headers
      return result.toTextStreamResponse({
        headers: {
          ...rlHeaders,
          "X-Provider": provider,
          "X-Prompt-Version": pb.getVersion(),
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
          { status: 500, headers: rlHeaders },
        );
      }
      // Continue to next provider
    }
  }

  // All providers failed or no keys configured
  return NextResponse.json(
    { error: "GENERATION_FAILED", message: "All providers failed. Please try again." },
    { status: 500, headers: rlHeaders },
  );
}
