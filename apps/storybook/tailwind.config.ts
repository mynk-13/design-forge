import type { Config } from "tailwindcss";
/**
 * Import the plugin from package source so Vercel builds work without a
 * pre-built @designforge/themes dist (PostCSS loads this config via jiti).
 */
import { tailwindPlugin } from "../../packages/themes/src/tailwind-plugin";

/**
 * Tailwind for Storybook canvas iframe.
 * Must scan @designforge/ui sources so co-located stories pick up utilities.
 */
const config: Config = {
  content: [
    "./stories/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [tailwindPlugin],
};

export default config;
