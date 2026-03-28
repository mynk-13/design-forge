import plugin from "tailwindcss/plugin";
import { shadowTokens } from "./tokens/shadows";

/**
 * DesignForge Tailwind CSS v3 plugin.
 *
 * Extends the Tailwind theme to map all `--df-*` CSS variables to utility classes.
 * Requires `@designforge/themes/styles.css` to be imported in your app for the
 * CSS variables to be defined at runtime.
 *
 * Usage in tailwind.config.ts:
 *   import { tailwindPlugin } from "@designforge/themes";
 *   export default { plugins: [tailwindPlugin] }
 *
 * Enables:
 *   Colors:   bg-primary, text-foreground, border-border, ring-ring, bg-primary/50 …
 *   Radii:    rounded-sm, rounded, rounded-lg, rounded-full …
 *   Fonts:    font-sans, font-mono …
 *   Shadows:  shadow-sm, shadow-md, shadow-overlay …
 *   Timing:   duration-fast, duration-normal, ease-out …
 */
export const tailwindPlugin = plugin(
  () => {
    // CSS variables are provided by styles.css — nothing to inject here.
  },
  {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "hsl(var(--df-primary) / <alpha-value>)",
            foreground: "hsl(var(--df-primary-foreground) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--df-secondary) / <alpha-value>)",
            foreground: "hsl(var(--df-secondary-foreground) / <alpha-value>)",
          },
          background: "hsl(var(--df-background) / <alpha-value>)",
          foreground: "hsl(var(--df-foreground) / <alpha-value>)",
          card: {
            DEFAULT: "hsl(var(--df-card) / <alpha-value>)",
            foreground: "hsl(var(--df-card-foreground) / <alpha-value>)",
          },
          popover: {
            DEFAULT: "hsl(var(--df-popover) / <alpha-value>)",
            foreground: "hsl(var(--df-popover-foreground) / <alpha-value>)",
          },
          muted: {
            DEFAULT: "hsl(var(--df-muted) / <alpha-value>)",
            foreground: "hsl(var(--df-muted-foreground) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "hsl(var(--df-accent) / <alpha-value>)",
            foreground: "hsl(var(--df-accent-foreground) / <alpha-value>)",
          },
          destructive: {
            DEFAULT: "hsl(var(--df-destructive) / <alpha-value>)",
            foreground: "hsl(var(--df-destructive-foreground) / <alpha-value>)",
          },
          success: {
            DEFAULT: "hsl(var(--df-success) / <alpha-value>)",
            foreground: "hsl(var(--df-success-foreground) / <alpha-value>)",
          },
          warning: {
            DEFAULT: "hsl(var(--df-warning) / <alpha-value>)",
            foreground: "hsl(var(--df-warning-foreground) / <alpha-value>)",
          },
          info: {
            DEFAULT: "hsl(var(--df-info) / <alpha-value>)",
            foreground: "hsl(var(--df-info-foreground) / <alpha-value>)",
          },
          border: "hsl(var(--df-border) / <alpha-value>)",
          input: "hsl(var(--df-input) / <alpha-value>)",
          ring: "hsl(var(--df-ring) / <alpha-value>)",
        },
        borderRadius: {
          none: "var(--df-radius-none)",
          sm: "var(--df-radius-sm)",
          DEFAULT: "var(--df-radius)",
          md: "var(--df-radius-md)",
          lg: "var(--df-radius-lg)",
          xl: "var(--df-radius-xl)",
          "2xl": "var(--df-radius-2xl)",
          full: "var(--df-radius-full)",
        },
        fontFamily: {
          sans: ["var(--df-font-sans)", "system-ui", "sans-serif"],
          mono: ["var(--df-font-mono)", "monospace"],
        },
        fontSize: {
          xs: ["var(--df-font-size-xs)", { lineHeight: "1rem" }],
          sm: ["var(--df-font-size-sm)", { lineHeight: "1.25rem" }],
          base: ["var(--df-font-size-base)", { lineHeight: "1.5rem" }],
          lg: ["var(--df-font-size-lg)", { lineHeight: "1.75rem" }],
          xl: ["var(--df-font-size-xl)", { lineHeight: "1.75rem" }],
          "2xl": ["var(--df-font-size-2xl)", { lineHeight: "2rem" }],
          "3xl": ["var(--df-font-size-3xl)", { lineHeight: "2.25rem" }],
          "4xl": ["var(--df-font-size-4xl)", { lineHeight: "2.5rem" }],
          "5xl": ["var(--df-font-size-5xl)", { lineHeight: "1" }],
        },
        // Inline shadow values — CSS var references don't support Tailwind opacity modifiers
        boxShadow: {
          sm: shadowTokens.sm,
          DEFAULT: shadowTokens.DEFAULT,
          md: shadowTokens.md,
          lg: shadowTokens.lg,
          xl: shadowTokens.xl,
          "2xl": shadowTokens["2xl"],
          none: "none",
          overlay: shadowTokens.overlay,
        },
        transitionDuration: {
          instant: "var(--df-duration-instant)",
          fast: "var(--df-duration-fast)",
          normal: "var(--df-duration-normal)",
          slow: "var(--df-duration-slow)",
          slower: "var(--df-duration-slower)",
        },
        transitionTimingFunction: {
          DEFAULT: "var(--df-ease)",
          in: "var(--df-ease-in)",
          out: "var(--df-ease-out)",
          "in-out": "var(--df-ease-in-out)",
          bounce: "var(--df-ease-bounce)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "fade-out": {
            from: { opacity: "1" },
            to: { opacity: "0" },
          },
          "slide-in-from-top": {
            from: { transform: "translateY(-8px)", opacity: "0" },
            to: { transform: "translateY(0)", opacity: "1" },
          },
          "slide-in-from-bottom": {
            from: { transform: "translateY(8px)", opacity: "0" },
            to: { transform: "translateY(0)", opacity: "1" },
          },
          "slide-in-from-left": {
            from: { transform: "translateX(-8px)", opacity: "0" },
            to: { transform: "translateX(0)", opacity: "1" },
          },
          "slide-in-from-right": {
            from: { transform: "translateX(8px)", opacity: "0" },
            to: { transform: "translateX(0)", opacity: "1" },
          },
          "zoom-in": {
            from: { transform: "scale(0.95)", opacity: "0" },
            to: { transform: "scale(1)", opacity: "1" },
          },
          "zoom-out": {
            from: { transform: "scale(1)", opacity: "1" },
            to: { transform: "scale(0.95)", opacity: "0" },
          },
          "spin-slow": {
            to: { transform: "rotate(360deg)" },
          },
        },
        animation: {
          "accordion-down":
            "accordion-down var(--df-duration-normal) var(--df-ease-out)",
          "accordion-up":
            "accordion-up var(--df-duration-normal) var(--df-ease-out)",
          "fade-in": "fade-in var(--df-duration-fast) var(--df-ease-out)",
          "fade-out": "fade-out var(--df-duration-fast) var(--df-ease-in)",
          "slide-in-from-top":
            "slide-in-from-top var(--df-duration-normal) var(--df-ease-out)",
          "slide-in-from-bottom":
            "slide-in-from-bottom var(--df-duration-normal) var(--df-ease-out)",
          "slide-in-from-left":
            "slide-in-from-left var(--df-duration-normal) var(--df-ease-out)",
          "slide-in-from-right":
            "slide-in-from-right var(--df-duration-normal) var(--df-ease-out)",
          "zoom-in": "zoom-in var(--df-duration-fast) var(--df-ease-out)",
          "zoom-out": "zoom-out var(--df-duration-fast) var(--df-ease-in)",
          "spin-slow": "spin-slow 3s linear infinite",
        },
      },
    },
  },
);
