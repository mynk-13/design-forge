/**
 * Animation/transition tokens — durations and easing curves.
 * CSS variables: `--df-duration-{key}`, `--df-ease-{key}`
 */

export const durationTokens = {
  instant: "0ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

export const easingTokens = {
  DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
} as const;

export type DurationTokenKey = keyof typeof durationTokens;
export type EasingTokenKey = keyof typeof easingTokens;
