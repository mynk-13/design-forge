import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  treeshake: true,
  clean: true,
  sourcemap: true,
  external: ["tailwindcss"],
  async onSuccess() {
    // Copy individual preset files (consumers can import a single theme)
    mkdirSync("dist/presets", { recursive: true });
    copyFileSync("src/presets/light.css", "dist/presets/light.css");
    copyFileSync("src/presets/dark.css", "dist/presets/dark.css");

    // Build a fully-inlined dist/styles.css (no @import dependencies).
    // This ensures compatibility with any CSS toolchain.
    const light = readFileSync("src/presets/light.css", "utf-8");
    const dark = readFileSync("src/presets/dark.css", "utf-8");
    const baseReset = `/* ── Base reset ───────────────────────────────────────── */

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  border-color: hsl(var(--df-border));
}

body {
  background-color: hsl(var(--df-background));
  color: hsl(var(--df-foreground));
  font-family: var(--df-font-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

    writeFileSync(
      "dist/styles.css",
      [
        "/* @designforge/themes — import this once in your app root */",
        "/* https://github.com/mynk-13/design-forge */",
        "",
        light,
        "",
        dark,
        "",
        baseReset,
        "",
      ].join("\n"),
    );

    console.log("✓ CSS files → dist/styles.css + dist/presets/");
  },
});
