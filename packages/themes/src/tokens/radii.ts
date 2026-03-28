/**
 * Border-radius tokens.
 * CSS variable: `--df-radius-{key}` (DEFAULT = `--df-radius`)
 */

export const radiiTokens = {
  none: "0px",
  sm: "0.25rem",
  DEFAULT: "0.5rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export type RadiiTokenKey = keyof typeof radiiTokens;
