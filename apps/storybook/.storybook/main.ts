import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Phase 3+: stories co-located with components in packages/ui
    // NOTE: paths are relative to .storybook/ directory, not the project root.
    // Three levels up: .storybook/ → storybook/ → apps/ → monorepo root
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  docs: {
    autodocs: "tag",
  },
  /**
   * Resolve @designforge/themes/styles.css directly from source.
   *
   * On Vercel, only the storybook project is built — @designforge/themes is not
   * pre-built, so dist/styles.css doesn't exist. Aliasing to the source CSS
   * works in all environments: Vite resolves @import directives in the source
   * file natively, so no dist build is required.
   */
  viteFinal: async (config) => {
    const existingAlias = Array.isArray(config.resolve?.alias)
      ? config.resolve.alias
      : Object.entries(config.resolve?.alias ?? {}).map(([find, replacement]) => ({
          find,
          replacement,
        }));

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          ...existingAlias,
          {
            find: "@designforge/themes/styles.css",
            replacement: path.resolve(
              __dirname,
              "../../../packages/themes/src/styles.css"
            ),
          },
        ],
      },
    };
  },
};

export default config;
