import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import a11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import { base } from "./base.js";

/** @type {import('eslint').Linter.Config[]} */
export const react = [
  ...base,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": a11y,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: { version: "19.0.0" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...(reactHooks.configs["recommended-latest"]?.rules ??
        reactHooks.configs.recommended.rules),
      ...a11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "warn",
    },
  },
];
