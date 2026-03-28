/**
 * Color tokens — HSL channel values (no `hsl()` wrapper).
 * Usage in CSS: `color: hsl(var(--df-primary) / 0.5);`
 * Usage in Tailwind: `bg-primary`, `text-primary-foreground`, `bg-primary/50`
 */

export const lightColors = {
  // Brand
  primary: "245 58% 60%",
  "primary-foreground": "0 0% 100%",
  secondary: "245 20% 92%",
  "secondary-foreground": "245 47% 25%",

  // Surfaces
  background: "0 0% 100%",
  foreground: "222 47% 11%",
  card: "0 0% 100%",
  "card-foreground": "222 47% 11%",
  popover: "0 0% 100%",
  "popover-foreground": "222 47% 11%",

  // Neutral
  muted: "210 40% 96%",
  "muted-foreground": "215 16% 47%",
  accent: "245 20% 96%",
  "accent-foreground": "245 47% 25%",

  // Semantic
  destructive: "0 84% 60%",
  "destructive-foreground": "0 0% 100%",
  success: "142 76% 36%",
  "success-foreground": "0 0% 100%",
  warning: "38 92% 50%",
  "warning-foreground": "0 0% 100%",
  info: "199 89% 48%",
  "info-foreground": "0 0% 100%",

  // Chrome
  border: "214 32% 91%",
  input: "214 32% 91%",
  ring: "245 58% 60%",
} as const;

export const darkColors = {
  // Brand
  primary: "245 58% 65%",
  "primary-foreground": "0 0% 100%",
  secondary: "245 20% 20%",
  "secondary-foreground": "245 30% 80%",

  // Surfaces
  background: "222 47% 11%",
  foreground: "210 40% 98%",
  card: "222 47% 14%",
  "card-foreground": "210 40% 98%",
  popover: "222 47% 14%",
  "popover-foreground": "210 40% 98%",

  // Neutral
  muted: "217 33% 17%",
  "muted-foreground": "215 20% 65%",
  accent: "245 20% 20%",
  "accent-foreground": "245 30% 80%",

  // Semantic
  destructive: "0 72% 51%",
  "destructive-foreground": "0 0% 100%",
  success: "142 69% 58%",
  "success-foreground": "0 0% 100%",
  warning: "38 92% 50%",
  "warning-foreground": "0 0% 100%",
  info: "199 89% 48%",
  "info-foreground": "0 0% 100%",

  // Chrome
  border: "217 33% 17%",
  input: "217 33% 17%",
  ring: "245 58% 65%",
} as const;

export type ColorTokenKey = keyof typeof lightColors;
