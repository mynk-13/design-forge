# DesignForge — Actions Taken Log

> Chronological record of every task executed by the AI agent.  
> Covers: Phase 1 — Monorepo Foundation  
> Date: 2026-03-28  
> Agent: Claude (claude-4.6-sonnet-medium-thinking)

---

## Pre-Work: Document Ingestion

### Task: Read all three context files before touching anything

**Files read:**
| File | Lines | Purpose |
|---|---|---|
| `ANALYSIS_LOG.md` | 739 | Full project analysis — all design decisions, ADR summaries, tech stack, risk register |
| `PLAN_OF_ACTION.md` | 443 | 12-phase build roadmap with checkboxes and exit gates |
| `REQUIREMENTS.md` | 73 | Private credentials — API keys, npm token, GitHub repo URL |

**Key facts extracted before writing a single file:**
- React 19, Next.js 15, TypeScript 5 strict — locked in, non-negotiable
- Tailwind CSS **v3** (not v4) — ADR-008
- Radix UI **bundled** (not peer dep) — ADR-001
- `ref`-as-prop pattern — React 19 native, no `forwardRef`
- peerDependencies: `react >= 19.0.0`
- LLM chain: Anthropic → OpenAI → Gemini 2.0 Flash — ADR-003
- Bundle target: 100 KB gzipped for `@designforge/ui`
- No database, no GitHub OAuth in v1.0
- `@tanstack/react-table` + `@tanstack/react-virtual` confirmed
- `lucide-react` for icons — ADR-005
- Zustand v4 for playground state — ADR-007
- Storybook on `storybook.designforge.dev` — ADR-004

**Workspace state at start:**
```
e:\design-forge\
├── .gitignore          (exists)
├── ANALYSIS_LOG.md     (exists, gitignored)
├── PLAN_OF_ACTION.md   (exists, gitignored)
└── REQUIREMENTS.md     (exists, gitignored)
```
Git initialised, no commits yet. Node.js v23.0.0, pnpm 10.33.0 confirmed.

---

## Phase 1 — Monorepo Foundation

---

### Task 1.0: Create directory structure

**What was done:**  
Created the full directory skeleton in a single PowerShell `mkdir` command with `-Force` flag to avoid errors if any existed.

**Directories created:**
```
apps/
apps/docs/
apps/docs/app/
apps/storybook/
apps/storybook/.storybook/
apps/storybook/stories/
packages/
packages/ai/src/
packages/eslint-config/src/
packages/hooks/src/
packages/icons/src/
packages/themes/src/
packages/tsconfig/
packages/ui/src/
.github/workflows/
```

**Outcome:** All directories created successfully.

---

### Task 1.1: Root `package.json`

**What was done:**  
Created the monorepo root `package.json` with:
- `"private": true` — prevents accidental publish of the root
- `"packageManager": "pnpm@10.33.0"` — pins exact pnpm version; read by `pnpm/action-setup@v4` in CI automatically
- `"engines"` — enforces Node >= 20 and pnpm >= 10
- `"pnpm.onlyBuiltDependencies"` — pre-approves `esbuild`, `sharp`, `@tailwindcss/oxide` for post-install scripts (required in pnpm 10 security model)
- Root scripts: `build`, `dev`, `lint`, `type-check`, `test`, `format`, `format:check`, `clean`

**Root devDependencies declared:**
| Package | Version | Reason |
|---|---|---|
| `@designforge/eslint-config` | `workspace:*` | Root ESLint config imports from it |
| `@next/eslint-plugin-next` | `^15.2.3` | Root `eslint.config.mjs` applies Next.js rules to `apps/docs/**` |
| `@types/node` | `^22.13.14` | Node.js types for TypeScript |
| `eslint` | `^9.23.0` | ESLint 9 flat config |
| `prettier` | `^3.5.3` | Code formatter |
| `prettier-plugin-tailwindcss` | `^0.6.11` | Class sorting in Tailwind |
| `rimraf` | `^6.0.1` | Cross-platform `rm -rf` for clean scripts |
| `tsup` | `^8.4.0` | esbuild-based bundler for all packages |
| `turbo` | `^2.4.4` | Turborepo task orchestrator |
| `typescript` | `^5.8.2` | TypeScript compiler |

**Outcome:** Created successfully.

---

### Task 1.2: `pnpm-workspace.yaml`

**What was done:**  
Created minimal workspace definition covering both directory groups:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Covers all 9 workspace members: `@designforge/{ui,themes,hooks,icons,ai,tsconfig,eslint-config}` + `docs` + `storybook`.

**Outcome:** Created successfully.

---

### Task 1.3: `turbo.json`

**What was done:**  
Created Turborepo v2 pipeline configuration using the `tasks` key (v2 syntax, not the v1 `pipeline` key).

**Task graph design decisions:**
| Task | `dependsOn` | Rationale |
|---|---|---|
| `build` | `["^build"]` | Packages must build their deps first (type declarations needed) |
| `dev` | `[]` (persistent) | No cache, runs forever |
| `lint` | `[]` | No deps — ESLint needs no pre-built artifacts |
| `type-check` | `["^build"]` | TypeScript needs `.d.ts` from workspace deps |
| `test` | `["build"]` | Tests run after the package itself is built |
| `clean` | `[]` (no cache) | Always re-runs |

**Outputs configured:**
- `dist/**` — tsup build output
- `.next/**`, `!.next/cache/**` — Next.js build output (cache excluded to avoid bloat)
- `storybook-static/**` — Storybook production build

**Outcome:** Created successfully.

---

### Task 1.4: `.prettierrc` and `.prettierignore`

**What was done:**  
Created `.prettierrc` with project-wide formatting rules:
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Notable choices:
- `"endOfLine": "lf"` — enforces Unix line endings on Windows (prevents CRLF in git diffs)
- `"printWidth": 100` — wider than default 80; reasonable for TypeScript with generics
- `prettier-plugin-tailwindcss` — auto-sorts Tailwind classes (activated in Phase 3+)

Created `.prettierignore` excluding: `dist`, `.next`, `storybook-static`, `coverage`, `pnpm-lock.yaml`, `next-env.d.ts`.

**Outcome:** Both files created successfully.

---

### Task 1.5: `eslint.config.mjs` (root)

**What was done:**  
Created the root ESLint flat config (ESLint 9). Used `.mjs` extension to force ESM mode without needing `"type": "module"` in the root `package.json` (which would affect all JS files at the root).

**Config structure:**
```
react config  ←  applies to ALL packages and apps
  +
Next.js rules  ←  scoped to apps/docs/** only via `files` glob
  +
global ignores  ←  node_modules, dist, .next, storybook-static, .turbo, coverage, next-env.d.ts
```

**Key design choice:** Next.js rules (`@next/eslint-plugin-next` core-web-vitals) are applied only where relevant (`apps/docs/**`), not across the whole monorepo. This avoids false positives in package code.

**Issue encountered and fixed:** First attempt used `"next-env.d.ts"` in ignores (without `**/`), which didn't ignore the file in subdirectories. ESLint flagged `apps/docs/next-env.d.ts` for `@typescript-eslint/triple-slash-reference` (Next.js uses triple-slash references in this auto-generated file). Fixed by using `"**/next-env.d.ts"`.

**Outcome:** Created, then fixed once.

---

### Task 1.6: `packages/tsconfig/`

**What was done:**  
Created the shared TypeScript configuration package. Three config files in a strict inheritance chain.

**`package.json`:**
- `"private": true` — internal tooling package, never published
- `exports` field maps `./base.json`, `./react.json`, `./nextjs.json` paths

**`base.json`** — TypeScript strict beyond `"strict": true`:
| Option | Value | Why |
|---|---|---|
| `target` | `ES2022` | Modern JS, supports top-level await |
| `moduleResolution` | `"bundler"` | Modern resolution (Vite/esbuild/tsup-aware) |
| `noUncheckedIndexedAccess` | `true` | Array/object access returns `T \| undefined` |
| `noUnusedLocals` | `true` | No dead variables |
| `noUnusedParameters` | `true` | No dead parameters |
| `exactOptionalPropertyTypes` | `true` | `undefined` must be explicit |
| `verbatimModuleSyntax` | `true` | Enforces `import type` for type-only imports |
| `isolatedModules` | `true` | Safe for transpile-only tools (esbuild, tsup) |

**`react.json`** — extends base, adds:
- `"lib": ["ES2022", "DOM", "DOM.Iterable"]` — browser globals
- `"jsx": "react-jsx"` — React 17+ automatic JSX transform (no `import React` needed)

**`nextjs.json`** — extends react, adds:
- `"plugins": [{ "name": "next" }]` — Next.js TypeScript plugin for App Router
- `"jsx": "preserve"` — Next.js handles JSX transformation itself
- `"incremental": true` — faster rebuilds
- `"allowJs": true`, `"resolveJsonModule": true` — needed for Next.js internals

**Outcome:** All three files created successfully.

---

### Task 1.7: `packages/eslint-config/`

**What was done:**  
Created the shared ESLint configuration package. Uses `"type": "module"` in its `package.json` because the exported JS files use ESM `export` syntax.

**`package.json` — dependencies declared:**
| Package | Purpose |
|---|---|
| `@eslint/js` | ESLint recommended rules |
| `@next/eslint-plugin-next` | Next.js specific rules (used in `next.js` config) |
| `globals` | Browser/Node/ES2022 global variable definitions |
| `eslint-plugin-react` | React-specific lint rules |
| `eslint-plugin-react-hooks` | Rules of hooks enforcement |
| `eslint-plugin-jsx-a11y` | Accessibility lint rules for JSX |
| `typescript-eslint` | Combined TS ESLint parser + plugin (v8 new package) |

**`src/base.js`** — TypeScript-aware base config:
- Uses `tseslint.config()` helper from `typescript-eslint` (the modern combined package)
- Spreads `tseslint.configs.recommended`
- Custom rules: `no-console` (warn, allow warn/error), `no-unused-vars` (error with `^_` ignore pattern), `consistent-type-imports` (enforces `import type`), `no-explicit-any` (warn)
- Global ignores for `node_modules`, `dist`, `.next`, `storybook-static`, `.turbo`, `coverage`

**`src/react.js`** — React rules on top of base:
- `eslint-plugin-react` — React-specific rules
- `eslint-plugin-react-hooks` — hook rules (v5 with `recommended-latest` fallback to `recommended`)
- `eslint-plugin-jsx-a11y` — accessibility rules
- `react/react-in-jsx-scope: off` — not needed with React 17+ JSX transform
- `react/prop-types: off` — TypeScript handles this
- React version set to `"19.0.0"` explicitly (not `"detect"`) — avoids warning in non-React packages that don't install React

**`src/next.js`** — Next.js rules on top of react:
- Imports `@next/eslint-plugin-next`
- Spreads both `recommended` and `core-web-vitals` rule sets
- Used in root `eslint.config.mjs` scoped to `apps/docs/**`

**Issue encountered:** First version used `react.version: "detect"`. This caused a warning in `@designforge/ai` and `@designforge/themes` ("react package not installed, assuming latest") because those packages don't have React as a dependency. Fixed by hardcoding `"19.0.0"`.

**Outcome:** All three files created successfully. One fix applied.

---

### Task 1.8: Package skeletons — `ui`, `themes`, `hooks`, `icons`, `ai`

**What was done:**  
Created 5 package skeletons. Each follows the same structure:
```
packages/<name>/
├── package.json    (exports, peerDeps, scripts)
├── tsconfig.json   (extends @designforge/tsconfig)
├── tsup.config.ts  (ESM + CJS, dts, treeshake, splitting)
└── src/
    └── index.ts    (empty export: export {};)
```

**`package.json` design for all packages:**
- `"type": "module"` — ESM-first
- Dual exports: `types` **first** (so TypeScript resolves correctly), then `import`, then `require`
- `"main"` and `"module"` fields for backwards compatibility with older bundlers
- `"files": ["dist"]` — only ship the compiled output to npm

**`tsup.config.ts` configuration:**
```typescript
{
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],     // dual format
  dts: true,                  // TypeScript declarations
  splitting: true,            // shared chunks (important for Radix primitives)
  treeshake: true,            // dead code elimination
  clean: true,                // delete dist before each build
  sourcemap: true,            // for debugging
  external: ["react", "react-dom"]  // NOT bundled (peer deps)
}
```

**Per-package specifics:**
| Package | peerDeps | tsconfig used | Notes |
|---|---|---|---|
| `@designforge/ui` | `react >=19`, `react-dom >=19` | `react.json` | Core component library |
| `@designforge/themes` | none | `base.json` | No React — pure CSS tokens + TS types |
| `@designforge/hooks` | `react >=19` | `react.json` | React hooks library |
| `@designforge/icons` | `react >=19` | `react.json` | lucide-react wrapper (Phase 5) |
| `@designforge/ai` | none | `base.json` | Server-side only AI pipeline (Phase 6) |

**Issue encountered and fixed:** Initial `exports` field order in all packages had `types` LAST:
```json
{ "import": "...", "require": "...", "types": "..." }
```
esbuild warned: `"The condition 'types' here will never be used as it comes after both 'import' and 'require'"`. Fixed all five packages to put `types` **first** — TypeScript resolves the `types` condition before `import`/`require`, and it should appear first in the map.

**Outcome:** All 5 packages created, one fix applied across all of them.

---

### Task 1.9: `apps/docs/` — Next.js 15 App Router skeleton

**What was done:**  
Scaffolded a minimal but production-correct Next.js 15 App Router application.

**Files created:**

**`package.json`:**
- `"next": "^15.2.3"`, `"react": "^19.0.0"`, `"react-dom": "^19.0.0"`
- Dev server uses `--turbopack` flag (Turbopack stable in Next.js 15)
- `"lint": "eslint ."` — uses ESLint CLI directly (see below)
- `"type-check": "tsc --noEmit"`

**`tsconfig.json`:**
- Extends `@designforge/tsconfig/nextjs.json`
- Adds `paths: { "@/*": ["./*"] }` for absolute imports
- Next.js auto-added `"noEmit": true` during first `next build` run — kept as correct

**`next.config.ts`:**
- `reactStrictMode: true` — catches React anti-patterns early
- Minimal for Phase 1; Phase 8 adds `@next/mdx`, bundle analyzer, etc.

**`tailwind.config.ts`:**
- Tailwind v3 content paths: `./app/**`, `./components/**`, `../../packages/ui/src/**`
- `darkMode: "class"` — class-based dark mode (toggled by adding `.dark` to `<html>`)
- All `--df-*` CSS variables stubbed in `theme.extend` for Phase 2 (Phase 2 replaces with the Tailwind plugin from `@designforge/themes`)

**`postcss.config.mjs`:**
- `tailwindcss` + `autoprefixer` — standard Tailwind v3 PostCSS pipeline

**`app/globals.css`:**
- `@tailwind base/components/utilities` directives
- CSS variable stubs for both `:root` (light) and `.dark` (dark) — all `--df-*` tokens with the DesignForge brand values from ANALYSIS_LOG.md Section 15.4:
  - `--df-primary: 245 58% 60%` (#6C63FF — DesignForge Purple)
  - `--df-background: 0 0% 100%` / dark: `222 47% 11%`

**`app/layout.tsx`:**
- `suppressHydrationWarning` on `<html>` — required when using class-based dark mode (prevents React hydration mismatch from class toggled by JS)
- Nested `title` template: `"%s | DesignForge"`

**`app/page.tsx`:**
- Minimal placeholder — uses Tailwind classes referencing the CSS variable tokens

**Build result:**
```
Route (app)                     Size   First Load JS
┌ ○ /                          123 B        102 kB
└ ○ /_not-found                994 B        103 kB
○  (Static) prerendered as static content
```
Both routes are SSG (static), as expected.

**Issue encountered:** `next lint` was deprecated in Next.js 15.5 (`next lint` is being removed in Next.js 16). Changed the `lint` script from `next lint` to `eslint .`. This required `@next/eslint-plugin-next` to be available at the root — added it to root `package.json` and `packages/eslint-config/package.json`.

**Outcome:** Created successfully, one issue fixed.

---

### Task 1.10: `apps/storybook/` — Storybook 8 skeleton

**What was done:**  
Scaffolded a minimal Storybook 8 application using the React + Vite framework (`@storybook/react-vite`).

**Files created:**

**`package.json`:**
- `storybook@^8.6.12`, `@storybook/react-vite@^8.6.12`
- `@storybook/addon-essentials` — docs, controls, viewport, actions, backgrounds, toolbars
- `@storybook/addon-a11y` — axe-core per-story (important for Phase 9 accessibility enforcement)
- `vite@^6.2.5` — required by `@storybook/react-vite`
- `@storybook/blocks` — MDX documentation blocks

**`.storybook/main.ts`:**
```typescript
{
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Phase 3+: co-located stories in packages/ui/src/
    "../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: { name: "@storybook/react-vite" },
  typescript: { reactDocgen: "react-docgen-typescript" },
  docs: { autodocs: "tag" }
}
```
The `packages/ui/src/**` story path is already wired up so Phase 3 components automatically appear without any Storybook config changes.

**`.storybook/preview.ts`:**
- `a11y` parameters configured with WCAG 2.1 AA tag filter (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`)
- Light/dark background presets matching DesignForge HSL tokens

**`stories/Welcome.stories.tsx`:**
- Minimal branded welcome story (no external imports — self-contained inline styles)
- Shows Phase 1 monorepo status with DesignForge purple badge

**Build result:** Storybook built successfully, Welcome story rendered.  
Two expected warnings during build:
1. `WARN No story files found for the specified pattern: ../../packages/ui/src/**` — expected, no component stories yet
2. Vite chunk size warning for `axe-core` (~580KB) — expected, this is the accessibility testing library

**Outcome:** Created successfully.

---

### Task 1.11: `.github/workflows/ci.yml`

**What was done:**  
Created the Phase 1 CI skeleton — three-step pipeline running on every push and PR to `main`/`master`.

**Key CI design decisions:**
- `concurrency` with `cancel-in-progress: true` — saves CI minutes by cancelling superseded runs on the same branch
- `pnpm/action-setup@v4` — reads `packageManager` field from root `package.json` automatically (no version hardcoded in the workflow)
- `actions/setup-node@v4` with `cache: 'pnpm'` — caches the pnpm store between runs
- `--frozen-lockfile` — fails the build if `pnpm-lock.yaml` is out of sync (prevents "works on my machine" issues)

**Steps:**
```
1. checkout
2. pnpm/action-setup  ← reads packageManager from package.json
3. setup-node (Node 20, pnpm cache)
4. pnpm install --frozen-lockfile
5. pnpm turbo run lint
6. pnpm turbo run type-check
7. pnpm turbo run build
```

**Outcome:** Created successfully.

---

### Task 1.12: `pnpm install` — First run

**What was done:**  
Ran `pnpm install` from the workspace root. This resolved all 628 packages across 10 workspace members and created `pnpm-lock.yaml`.

**Issue encountered:** pnpm 10 security model requires explicit approval for packages that run post-install scripts. The following were blocked:
- `esbuild@0.25.12` (used by Vite in Storybook)
- `esbuild@0.27.4` (used by tsup)
- `sharp@0.34.5` (used by Next.js for image optimisation)

**Fix:** Added `"pnpm": { "onlyBuiltDependencies": ["esbuild", "sharp", "@tailwindcss/oxide"] }` to root `package.json`. Re-ran `pnpm install` to execute the post-install scripts.

**Final install result:**
```
Done in 3m 12.6s using pnpm v10.33.0
```

---

### Task 1.13: Verify Phase 1 exit gate

**Ran `pnpm turbo run build`:**
```
Tasks:  7 successful, 7 total
Time:   1m 58.711s

@designforge/ui      ✅  ESM + CJS + DTS built (68B each — empty skeleton)
@designforge/themes  ✅  ESM + CJS + DTS built
@designforge/hooks   ✅  ESM + CJS + DTS built
@designforge/icons   ✅  ESM + CJS + DTS built
@designforge/ai      ✅  ESM + CJS + DTS built
apps/docs            ✅  Next.js 15 SSG build — 4 pages
apps/storybook       ✅  Storybook 8 build — Welcome story
```

**Ran `pnpm turbo run lint`:**
```
Tasks:  7 successful, 7 total
Time:   51.019s
```

**Ran `pnpm turbo run type-check`:**
```
Tasks:  all successful
Cached: 9 cached (Turborepo cache working ✅)
```

**Combined `pnpm turbo run lint type-check`:**
```
Tasks:  15 successful, 15 total
Time:   11.225s  (cache hits for most tasks)
```

---

### Task 1.14: `PLAN_OF_ACTION.md` — Phase 1 checkboxes updated

**What was done:**  
Marked all 14 Phase 1 checkboxes as complete `[x]` and updated the status table:
```
Phase 1 — Monorepo Foundation | ✅ Complete
```

---

## Final Workspace Tree (Phase 1 complete)

```
e:\design-forge\
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── docs/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── storybook/
│       ├── .storybook/
│       │   ├── main.ts
│       │   └── preview.ts
│       ├── stories/
│       │   └── Welcome.stories.tsx
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ai/
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   ├── eslint-config/
│   │   ├── src/
│   │   │   ├── base.js
│   │   │   ├── react.js
│   │   │   └── next.js
│   │   └── package.json
│   ├── hooks/
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   ├── icons/
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   ├── themes/
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   ├── tsconfig/
│   │   ├── base.json
│   │   ├── react.json
│   │   ├── nextjs.json
│   │   └── package.json
│   └── ui/
│       ├── src/index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
├── .gitignore          (updated: added storybook-static, next-env.d.ts)
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml      (generated by pnpm install)
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Issues Encountered and Fixed

| # | Issue | Root Cause | Fix Applied |
|---|---|---|---|
| 1 | `pnpm install` blocked on post-install scripts | pnpm 10 security model requires explicit script approval | Added `pnpm.onlyBuiltDependencies` to root `package.json` |
| 2 | `types` export condition order warning (all 5 packages) | `types` listed after `import`/`require` in exports map | Reordered all package.json exports to put `types` first |
| 3 | `react version: "detect"` warning in non-React packages | `@designforge/ai` and `@designforge/themes` don't install React | Changed to explicit `"19.0.0"` in ESLint react config |
| 4 | `eslint` flagged `next-env.d.ts` triple-slash reference | Ignore pattern `"next-env.d.ts"` didn't match nested paths | Changed to `"**/next-env.d.ts"` with glob prefix |
| 5 | `next lint` deprecated in Next.js 15.5 | `next lint` being removed in Next.js 16 | Changed `lint` script to `eslint .`; added `@next/eslint-plugin-next` to root |

---

## Resolved Package Versions (actual, from pnpm-lock.yaml)

| Package | Requested | Resolved |
|---|---|---|
| `turbo` | `^2.4.4` | `2.8.21` |
| `typescript` | `^5.8.2` | `5.9.3` |
| `prettier` | `^3.5.3` | `3.8.1` |
| `tsup` | `^8.4.0` | `8.5.1` |
| `eslint` | `^9.23.0` | `9.39.4` |
| `next` | `^15.2.3` | `15.5.14` |
| `react` | `^19.0.0` | `19.1.0` |
| `@types/react` | `^19.1.0` | `19.2.14` |
| `storybook` | `^8.6.12` | `8.6.18` |
| `vite` | `^6.2.5` | `6.4.1` |

---

## Phase 1 Exit Gate — PASSED ✅

| Criterion | Result |
|---|---|
| `pnpm install` succeeds without errors | ✅ |
| `pnpm turbo run build` — all tasks pass | ✅ 7/7 |
| `pnpm turbo run lint` — all tasks pass | ✅ 7/7 |
| `pnpm turbo run type-check` — all tasks pass | ✅ all |
| `apps/docs` boots (Next.js build succeeds) | ✅ SSG, 4 routes |
| `apps/storybook` boots (Storybook build succeeds) | ✅ Welcome story |
| Turborepo cache working | ✅ (9 cache hits on second run) |

---

## What Phase 2 Builds On

Phase 2 (Theme System) will fill in `packages/themes/src/` with:
- `src/tokens/` — TypeScript token definitions for all `--df-*` CSS variables
- `src/presets/light.css` + `dark.css` — actual CSS custom property declarations
- `src/styles.css` — combined export
- `src/tailwind-plugin.ts` — maps `--df-*` tokens to Tailwind `theme()` values

Once Phase 2 is complete, `apps/docs/tailwind.config.ts` will replace its current manual CSS variable stubs with the `@designforge/themes` Tailwind plugin.

---

*Log maintained by AI agent. Last updated: 2026-03-28.*
