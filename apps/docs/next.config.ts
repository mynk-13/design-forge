import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode for catching React issues early
  reactStrictMode: true,
  transpilePackages: ["@designforge/ui", "@designforge/themes", "@designforge/icons", "@designforge/hooks"],

  // Turbopack is used in dev (--turbopack flag in package.json)
  // Production builds use webpack

  // Phase 8: Add @next/mdx, bundle analyzer, etc.
};

export default nextConfig;
