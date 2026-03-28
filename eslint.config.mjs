import pluginNext from "@next/eslint-plugin-next";
import { react } from "@designforge/eslint-config/react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // React rules for all packages and apps
  ...react,

  // Next.js-specific rules scoped to the docs app only
  {
    files: ["apps/docs/**/*.{ts,tsx,js,jsx,mjs}"],
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/storybook-static/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/next-env.d.ts",
    ],
  },
];
