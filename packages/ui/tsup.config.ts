import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  banner: {
    js: '"use client";',
  },
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom"],
  sourcemap: true,
  // Exclude test and story files from the published bundle
  ignoreWatch: ["**/*.test.tsx", "**/*.stories.tsx"],
});
