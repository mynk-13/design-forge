/**
 * Typography tokens — font families, sizes, weights, line heights, letter spacing.
 * CSS variables: `--df-font-{key}`, `--df-font-size-{key}`, etc.
 */

export const fontFamilyTokens = {
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, "Courier New", monospace',
} as const;

export const fontSizeTokens = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
} as const;

export const fontWeightTokens = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeightTokens = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

export const letterSpacingTokens = {
  tight: "-0.05em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

export type FontFamilyTokenKey = keyof typeof fontFamilyTokens;
export type FontSizeTokenKey = keyof typeof fontSizeTokens;
export type FontWeightTokenKey = keyof typeof fontWeightTokens;
export type LineHeightTokenKey = keyof typeof lineHeightTokens;
export type LetterSpacingTokenKey = keyof typeof letterSpacingTokens;
