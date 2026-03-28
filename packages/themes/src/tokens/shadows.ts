/**
 * Box-shadow tokens.
 * CSS variable: `--df-shadow-{key}` (DEFAULT = `--df-shadow`)
 */

export const shadowTokens = {
  sm: "0 1px 2px 0 hsl(0 0% 0% / 0.05)",
  DEFAULT:
    "0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)",
  md: "0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1)",
  lg: "0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -4px hsl(0 0% 0% / 0.1)",
  xl: "0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.1)",
  "2xl": "0 25px 50px -12px hsl(0 0% 0% / 0.25)",
  none: "0 0 #0000",
  // Layered shadow for floating panels (dialogs, popovers)
  overlay:
    "0 0 0 1px hsl(0 0% 0% / 0.05), 0 10px 38px -10px hsl(0 0% 0% / 0.3), 0 10px 20px -15px hsl(0 0% 0% / 0.2)",
} as const;

export type ShadowTokenKey = keyof typeof shadowTokens;
