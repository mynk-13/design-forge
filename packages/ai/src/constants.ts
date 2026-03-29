/**
 * @designforge/ai — System prompt version tag.
 *
 * Bump this when the system prompt content changes materially so consumers can
 * detect prompt version in logs / generation_history records.
 */
export const SYSTEM_PROMPT_VERSION = "1.0.0";

/**
 * Maximum number of conversation history pairs kept before FIFO truncation.
 * Each pair = 1 user message + 1 assistant message.
 */
export const MAX_HISTORY_PAIRS = 10;

/** Maximum prompt length in characters (enforced by /api/generate). */
export const MAX_PROMPT_LENGTH = 1000;

/** Timeout for a single generation request in milliseconds. */
export const GENERATION_TIMEOUT_MS = 30_000;

/** Rate limit — max requests per sliding hour window (anonymous, per IP). */
export const RATE_LIMIT_MAX = 20;

/** Rate limit sliding window duration in milliseconds (1 hour). */
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/** LLM provider identifiers used in ADR-003 fallback chain. */
export type LLMProvider = "anthropic" | "openai" | "google";

/** Ordered fallback chain: Anthropic → OpenAI → Google Gemini (ADR-003). */
export const PROVIDER_CHAIN: LLMProvider[] = ["anthropic", "openai", "google"];

/** Model IDs for each provider (ADR-003). */
export const PROVIDER_MODELS: Record<LLMProvider, string> = {
  anthropic: "claude-sonnet-4-20250514",
  openai: "gpt-4o-mini",
  google: "gemini-2.0-flash",
};
