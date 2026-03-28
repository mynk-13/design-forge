import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Phase 2: @designforge/themes Tailwind plugin replaces manual tokens
      colors: {
        primary: "hsl(var(--df-primary) / <alpha-value>)",
        background: "hsl(var(--df-background) / <alpha-value>)",
        foreground: "hsl(var(--df-foreground) / <alpha-value>)",
        destructive: "hsl(var(--df-destructive) / <alpha-value>)",
        border: "hsl(var(--df-border) / <alpha-value>)",
        ring: "hsl(var(--df-ring) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--df-muted) / <alpha-value>)",
          foreground: "hsl(var(--df-muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--df-accent) / <alpha-value>)",
          foreground: "hsl(var(--df-accent-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--df-radius-sm)",
        DEFAULT: "var(--df-radius)",
        lg: "var(--df-radius-lg)",
      },
      fontFamily: {
        sans: ["var(--df-font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--df-font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
