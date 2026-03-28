import { tailwindPlugin } from "@designforge/themes";
import type { Config } from "tailwindcss";

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
