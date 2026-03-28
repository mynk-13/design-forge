import { tailwindPlugin } from "@designforge/themes";
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
      // All color, radius, font, shadow, and animation tokens are provided
      // by the @designforge/themes tailwindPlugin below.
    },
  },
  plugins: [tailwindPlugin],
};

export default config;
