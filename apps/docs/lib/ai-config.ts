/**
 * Deployment-specific configuration for the AI generation API route.
 * These values are intentionally local to the docs app — they govern
 * runtime enforcement (rate limiting, timeouts) and are not part of the
 * public @designforge/ai package surface.
 */

/** Maximum prompt length in characters enforced by /api/generate. */
export const MAX_PROMPT_LENGTH = 1_000;

/** Timeout for a single generation request in milliseconds (30 s). */
export const GENERATION_TIMEOUT_MS = 30_000;

/** Maximum requests allowed per sliding window (per IP, anonymous). */
export const RATE_LIMIT_MAX = 20;

/** Sliding window duration in milliseconds (1 hour). */
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
