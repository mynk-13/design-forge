/**
 * TypeScript type definitions for the DesignForge token system.
 */

export type ThemeMode = "light" | "dark";

export interface ColorTokens {
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  success: string;
  "success-foreground": string;
  warning: string;
  "warning-foreground": string;
  info: string;
  "info-foreground": string;
  border: string;
  input: string;
  ring: string;
}

export interface TypographyTokens {
  fontFamily: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
}

export interface AnimationTokens {
  duration: Record<string, string>;
  easing: Record<string, string>;
}

export interface DesignForgeTokens {
  colors: {
    light: ColorTokens;
    dark: Partial<ColorTokens>;
  };
  spacing: Record<string, string>;
  radii: Record<string, string>;
  typography: TypographyTokens;
  shadows: Record<string, string>;
  animations: AnimationTokens;
}
