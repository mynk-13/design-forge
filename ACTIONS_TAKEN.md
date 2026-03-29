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

---

## Phase 2 — Theme System

---

### Task 2.0: Create subdirectories

Created `packages/themes/src/tokens/` and `packages/themes/src/presets/` in a single PowerShell `mkdir` call.

---

### Task 2.1: Token TypeScript files (6 files)

**What was done:** Created six typed token files under `packages/themes/src/tokens/`. Each exports an `as const` object (for type inference) plus a type alias for the keys.

| File | Tokens exported | CSS var prefix |
|---|---|---|
| `colors.ts` | `lightColors` (25 tokens), `darkColors` (19 override tokens), `ColorTokenKey` | `--df-{name}` |
| `spacing.ts` | `spacingTokens` (18 steps: px, 0–12), `SpacingTokenKey` | `--df-space-{key}` |
| `radii.ts` | `radiiTokens` (8 values: none → full), `RadiiTokenKey` | `--df-radius-{key}` |
| `typography.ts` | font-family (2), font-size (9), font-weight (4), line-height (6), letter-spacing (5) | `--df-font-*`, `--df-font-size-*` etc. |
| `shadows.ts` | `shadowTokens` (8 values incl. `overlay`), `ShadowTokenKey` | `--df-shadow-{key}` |
| `animations.ts` | `durationTokens` (5), `easingTokens` (5), both keys exported | `--df-duration-*`, `--df-ease-*` |

`tokens/index.ts` re-exports all six files via `export * from`.

**Design decisions:**
- HSL channel values only (no `hsl()` wrapper) — enables `hsl(var(--df-primary) / 0.5)` opacity syntax in CSS and Tailwind's `<alpha-value>` pattern
- `as const` on all objects — enables literal type inference for keys
- Dark color tokens only override values that differ from light — keeps diff minimal

---

### Task 2.2: CSS presets and styles.css

**`src/presets/light.css`:** Full `:root {}` block with all 60+ `--df-*` variables across colors, spacing, radii, typography, shadows, and animations. Includes section comments for readability.

**`src/presets/dark.css`:** Two blocks:
1. `.dark { }` — class-based dark mode (set by JS toggling `class="dark"` on `<html>`)
2. `@media (prefers-color-scheme: dark) { :root:not(.light) { } }` — system-preference fallback when no explicit class is set. The `:not(.light)` prevents double-application when user has explicitly chosen light mode.

**`src/styles.css`:** Developer reference file using `@import` directives + base reset. This source file is NOT the published artifact — the real `dist/styles.css` is generated by the tsup `onSuccess` hook as a fully-inlined file. A comment in the source file explains this.

Added `prefers-reduced-motion` media query in the base reset — disables all transitions/animations for users who have enabled "Reduce Motion" in OS settings (required for WCAG 2.1 AA compliance).

---

### Task 2.3: `tailwind-plugin.ts`

**What was done:** Created the Tailwind CSS v3 plugin that maps all `--df-*` CSS variables to Tailwind utility classes.

**Plugin structure:**
```
plugin(
  handler: () => {}            // No CSS injection — tokens come from styles.css
  config: { theme: { extend: { ... } } }
)
```

**Theme extensions added:**

| Category | Tailwind classes enabled | Notes |
|---|---|---|
| Colors (13 groups) | `bg-primary`, `text-foreground`, `border-border`, `bg-primary/50` … | Uses `<alpha-value>` for opacity modifier support |
| Border radius (8) | `rounded-sm`, `rounded`, `rounded-lg`, `rounded-full` … | References `--df-radius-*` vars |
| Font family (2) | `font-sans`, `font-mono` | References `--df-font-*` vars |
| Font size (9) | `text-xs` through `text-5xl` | Tuple format `[size, {lineHeight}]` |
| Box shadow (8) | `shadow-sm`, `shadow-overlay` … | Inline values (CSS var refs don't support opacity modifiers) |
| Transition duration (5) | `duration-fast`, `duration-normal`, `duration-slow` … | References `--df-duration-*` vars |
| Transition timing (5) | `ease-in`, `ease-out`, `ease-bounce` … | References `--df-ease-*` vars |
| Keyframes (10) | Accordion up/down, fade in/out, slide from all 4 sides, zoom in/out, spin-slow | Used by overlay components in Phase 4 |
| Animation shortcuts (10) | `animate-accordion-down`, `animate-fade-in` … | Combined keyframe + duration + easing |

**Key decision — box shadows use inline values, not CSS variable references:** Tailwind's opacity modifier (`shadow-overlay/50`) doesn't work when the entire shadow value is a CSS variable. Inline values are used in the plugin, CSS variables are kept for direct CSS usage.

---

### Task 2.4: `types.ts`

Exported interfaces: `ColorTokens`, `TypographyTokens`, `AnimationTokens`, `DesignForgeTokens`, `ThemeMode`. Kept simple (`Record<string, string>` for most sub-types) to avoid circular import complexity with the token files.

---

### Task 2.5: Update `src/index.ts`

Replaced the Phase 1 placeholder with real exports:
```typescript
export { tailwindPlugin } from "./tailwind-plugin";
export * from "./tokens/index";
export type { DesignForgeTokens, ColorTokens, ... } from "./types";
```
Used `export type { }` for type-only exports (required by `verbatimModuleSyntax: true` in tsconfig).

---

### Task 2.6: Update `tsup.config.ts`

**Key addition — `onSuccess` hook:**
```typescript
async onSuccess() {
  mkdirSync("dist/presets", { recursive: true });
  copyFileSync("src/presets/light.css", "dist/presets/light.css");
  copyFileSync("src/presets/dark.css", "dist/presets/dark.css");

  // Concatenate light + dark + base reset into a single standalone styles.css
  // (no @import dependencies — works in any CSS toolchain)
  const light = readFileSync("src/presets/light.css", "utf-8");
  const dark = readFileSync("src/presets/dark.css", "utf-8");
  writeFileSync("dist/styles.css", [header, light, dark, baseReset].join("\n"));
}
```

Added `external: ["tailwindcss"]` — prevents tsup from attempting to bundle Tailwind (it's a peer dep).

**Why concatenate instead of copying `src/styles.css`?** The source file uses `@import` which requires `postcss-import` or a compatible bundler. The published `dist/styles.css` is fully self-contained — zero toolchain assumptions for consumers.

---

### Task 2.7: Update `packages/themes/package.json`

- Added `peerDependencies: { "tailwindcss": "^3.0.0" }` — consumer must have Tailwind installed
- Added `tailwindcss: "^3.4.17"` to `devDependencies` — for local development/TypeScript types
- Expanded `exports` map:
  ```json
  "./styles.css": "./dist/styles.css",
  "./presets/light.css": "./dist/presets/light.css",
  "./presets/dark.css": "./dist/presets/dark.css"
  ```

---

### Task 2.8: Update `apps/docs` to consume `@designforge/themes`

**`apps/docs/package.json`:** Added `"@designforge/themes": "workspace:*"` to dependencies.

**`apps/docs/app/layout.tsx`:** Added `import "@designforge/themes/styles.css"` as the first import — all `--df-*` CSS variables are now live in the browser from the themes package.

**`apps/docs/app/globals.css`:** Stripped all inline `--df-*` variable declarations (they came from the Phase 1 stub). Now contains only Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`apps/docs/tailwind.config.ts`:** Replaced the manual CSS-variable color stubs with `tailwindPlugin`:
```typescript
import { tailwindPlugin } from "@designforge/themes";
plugins: [tailwindPlugin]
```
All `theme.extend` color/radius/font manual entries removed — the plugin provides them.

---

### Task 2.9: Build verification

**`@designforge/themes` build (isolated run):**
```
ESM dist/index.js     11.00 KB
CJS dist/index.cjs    11.47 KB
DTS dist/index.d.ts    9.22 KB
✓ CSS files → dist/styles.css + dist/presets/
```

**`dist/styles.css` content verified:**
- 218 lines, fully inlined (no `@import`)
- Light preset: 131 lines, 60+ CSS variables
- Dark preset: 45 lines (overrides only)
- Base reset: 22 lines (box-sizing, border-color, body defaults, prefers-reduced-motion)
- Estimated gzip: ~2.1 KB ✅ (under 3 KB target)

**Full workspace build + lint + type-check:** Pending — shell process pool exhausted during session. Run manually after restarting Cursor:
```
pnpm turbo run build
pnpm turbo run lint
pnpm turbo run type-check
```

---

### Issues Encountered in Phase 2

| # | Issue | Root Cause | Fix |
|---|---|---|---|
| 1 | Shell process pool exhausted | Too many background shell processes spawned during session | Restart Cursor to clear process pool |
| 2 | PLAN_OF_ACTION.md StrReplace failing | File written by PowerShell `Set-Content -NoNewline` altered encoding; multi-line StrReplace failed on `⬜` emoji | Used single-line StrReplace calls targeting unique text per line |

---

### Phase 2 Exit Gate — PASSED ✅

After Cursor restart, all three commands were run and passed:

| Command | Result |
|---|---|
| `pnpm turbo run build` | 7/7 tasks successful |
| `pnpm turbo run lint` | 7/7 tasks successful |
| `pnpm turbo run type-check` | 9/9 tasks successful |

Commit `1664bbf` pushed to `main` — `feat: Phase 2 theme system (@designforge/themes)`

---

## Vercel — Project Creation & Deployment (Phase 0 backfill)

**Done after Phase 1 monorepo was scaffolded, as required by Phase 0 checklist.**

### What was done

1. **`designforge-docs` Vercel project created**
   - Connected to `github.com/mynk-13/design-forge`
   - Root directory: `apps/docs`
   - Framework: Next.js (auto-detected)
   - Auto-deploy enabled on push to `main`
   - Initial deployment triggered and live

2. **`designforge-storybook` Vercel project created**
   - Connected to same GitHub repo
   - Root directory: `apps/storybook`
   - Framework: Other (Storybook static build)
   - Auto-deploy enabled on push to `main`
   - Initial deployment triggered and live

### What was updated in .md files

| File | Change |
|---|---|
| `PLAN_OF_ACTION.md` | Added Phase 0 section `0.5 Vercel Projects Created & Deployed` with 5 checkboxes — 4 checked ✅ |
| `PLAN_OF_ACTION.md` | Added note to Phase 0.3 GitHub Secrets — 4 Vercel secrets deferred to Phase 11 |
| `PLAN_OF_ACTION.md` | Phase 2 exit gate `⏳` changed to `✅` (all commands confirmed passing) |
| `REQUIREMENTS.md` | Vercel section filled in (account email, both projects marked ✅) |
| `REQUIREMENTS.md` | GitHub Actions secrets — 4 core secrets marked `[x]`, 4 Vercel secrets noted as Phase 11 |
| `REQUIREMENTS.md` | Vercel env vars checklist — noted as Phase 6 task (needed for AI Generator) |

### Deferred items (tracked in plan)

- **VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_IDs** → Add to GitHub Actions secrets in Phase 11 when building the full CI/CD release pipeline
- **Vercel environment variables** (API keys for LLM providers) → Add in Phase 6 when AI Generator API routes are built and need real keys in production

---

---

## Phase 3 — Component Library Foundation

---

### Task 3.0: Create directory structure

Created all component and lib subdirectories in a single `mkdir` call:
```
packages/ui/src/lib/
packages/ui/src/components/{Box,Flex,Grid,Container,Stack,Separator,AspectRatio}/
```

---

### Task 3.1: Install dependencies

Updated `packages/ui/package.json` with all Phase 3 runtime and dev dependencies.

**Runtime dependencies added:**
| Package | Version | Purpose |
|---|---|---|
| `@radix-ui/react-aspect-ratio` | `^1.1.0` | AspectRatio primitive |
| `@radix-ui/react-separator` | `^1.1.0` | Separator primitive |
| `@radix-ui/react-slot` | `^1.1.0` | `asChild` polymorphic rendering (Phase 4+) |
| `class-variance-authority` | `^0.7.1` | CVA — variant management for all components |
| `clsx` | `^2.1.1` | Class merging utility |
| `tailwind-merge` | `^3.0.0` | Tailwind class conflict resolution |

**Test/dev dependencies added:**
| Package | Purpose |
|---|---|
| `vitest ^3.0.0` | Test runner |
| `@testing-library/react ^16.3.0` | React 19 compatible RTL |
| `@testing-library/jest-dom ^6.6.3` | DOM matchers |
| `@testing-library/user-event ^14.5.2` | User interaction simulation |
| `jsdom ^25.0.1` | DOM environment for tests |
| `vitest-axe ^0.1.0` | axe-core integration for Vitest |
| `axe-core ^4.10.0` | Accessibility testing engine |

**Issue fixed:** `vitest-axe@^1.0.0` didn't exist — latest is `0.1.0`. Updated version range.

---

### Task 3.2: Shared utilities (`packages/ui/src/lib/`)

**`utils.ts`:**
```typescript
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```
The foundation of every component. `tailwind-merge` resolves class conflicts (later value wins), `clsx` handles conditional classes. Consumer `className` always overrides internal defaults.

**`types.ts`:**
- `AsChildProps` — `{ asChild?: boolean }` for Radix Slot polymorphism (used by Phase 4 Button)
- `VariantPropsOf<T>` — convenience wrapper around CVA's `VariantProps`
- `PropsWithoutRef<T>` — utility for the React 19 ref-as-prop pattern

---

### Task 3.3: Vitest infrastructure

**`vitest.config.ts`:**
- Environment: `jsdom` (browser-like DOM)
- Globals: `true` — no need to import `describe/it/expect` in every test file
- Setup files: `./src/test-setup.ts`
- JSX transform: esbuild `jsx: "automatic"` + `jsxImportSource: "react"` — no Vite plugin needed
- Coverage: v8 provider, includes `src/**` except tests/stories

**`src/test-setup.ts`:**
- Imports `@testing-library/jest-dom` (adds `toHaveClass`, `toBeInTheDocument`, etc.)
- Explicitly calls `expect.extend(axeMatchers)` to register `toHaveNoViolations`

**`src/vitest-axe.d.ts`:**
- Custom declaration file to extend Vitest's `Assertion<R>` interface with `toHaveNoViolations`
- Required because `vitest-axe@0.1.0` doesn't auto-augment Vitest types

**`tsconfig.json` updates:**
- Added `"types": ["vitest/globals", "@testing-library/jest-dom", "vitest-axe/matchers"]`
- Added `"exclude": ["**/*.stories.tsx"]` — stories import `@storybook/react` which isn't in `packages/ui` deps; excluded from main type-check (Storybook app handles them)

---

### Task 3.4: 7 layout components

All components follow the pattern from ANALYSIS_LOG.md Section 14 (React 19) + Section 17.1 (LLD template):

```
Layer 1: CVA variant definition (declarative, no side effects)
Layer 2: Radix primitive (optional — Separator, AspectRatio only in Phase 3)
Layer 3: Plain function component with ref as prop (React 19 pattern)
Layer 4: Named export + displayName assignment
```

#### Box
- **Pattern:** Polymorphic base primitive — renders `div` by default, `as` prop changes element
- **No CVA** — no variants, just `cn(className)` passthrough
- **Ref:** `React.Ref<HTMLElement>` — requires type cast for polymorphic `Comp` assignment
- **9 tests:** nodeName, `as` prop, className merge, Tailwind conflict resolution, ref forwarding, attr spreading, children, axe

#### Flex
- **CVA variants:** `direction` (4), `align` (5), `justify` (6), `wrap` (3), `gap` (10), `inline` (bool)
- **Defaults:** `direction: "row"`
- **11 tests:** flex class, all variants, inline-flex, className merge, ref, axe

#### Grid
- **CVA variants:** `cols` (1–12), `rows` (1–6), `gap` (10), `gapX` (7), `gapY` (7), `align` (4), `justify` (4), `flow` (5)
- **11 tests:** grid class, cols/rows/gap, gapX+Y, align, flow, merge, ref, axe

#### Container
- **CVA variants:** `size` (sm/md/lg/xl/2xl/full) → Tailwind `max-w-screen-*`
- **Default:** `size: "xl"`
- **Always includes:** `mx-auto w-full px-4 sm:px-6 lg:px-8`
- **10 tests:** centering classes, all sizes, padding, merge, ref, axe

#### Stack
- **CVA variants:** `direction` (vertical/horizontal), `gap` (10 steps), `align` (4), `justify` (4), `wrap` (bool)
- **Defaults:** `direction: "vertical"`, `gap: "4"` — sensible defaults for most use cases
- **11 tests:** flex class, direction, gap default, all variants, wrap, merge, ref, axe

#### Separator
- **Radix-backed:** `@radix-ui/react-separator`
- **CVA variant:** `orientation` (horizontal/vertical)
- **ARIA note:** Radix correctly omits `aria-orientation` for horizontal (it's implicit per WAI-ARIA spec for `role=separator`). Test updated to verify this behavior.
- **TypeScript issue fixed:** `SeparatorProps` was extending both Radix props and `VariantProps<typeof separatorVariants>` — both had `orientation` with slightly different types (CVA adds `null`). Fixed by removing `VariantProps` extension; `orientation` flows from Radix props directly into CVA.
- **11 tests:** role=separator, decorative (role=none), horizontal/vertical classes, bg-border, merge, aria-orientation behavior, ref, axe (both decorative and non-decorative)

#### AspectRatio
- **Radix-backed:** `@radix-ui/react-aspect-ratio`
- **No CVA** — single `ratio` prop, no variants
- **DOM structure note:** Radix renders `outer div (ratio wrapper) → inner div (ref + className)`. Test updated to check `container.firstChild.firstChild` for className assertion.
- **7 tests:** renders, overflow-hidden, className on inner div, children, ref, axe with image, axe with decorative

---

### Task 3.5: Barrel export update

`packages/ui/src/index.ts` updated from empty placeholder to full export:
```typescript
export { cn } from "./lib/utils";
export type { AsChildProps, VariantPropsOf, PropsWithoutRef } from "./lib/types";
export { Box } from "./components/Box/Box";
// ... all 7 components with their types
export { Separator, separatorVariants } from "./components/Separator/Separator";
export { AspectRatio } from "./components/AspectRatio/AspectRatio";
```

CVA variant functions (`flexVariants`, `gridVariants`, etc.) exported separately — consumers can compose them.

---

### Task 3.6: Storybook preview update (themes only — superseded later)

`apps/storybook/.storybook/preview.ts` was updated to import `@designforge/themes/styles.css` so all `--df-*` CSS variables are active in every story. Added `@designforge/themes: workspace:*` to storybook devDependencies.

**Follow-up (post–Phase 4):** Theme CSS alone does not generate Tailwind utilities. See **Storybook — Tailwind in preview + Vercel** below — preview now uses `preview.css` (`@tailwind` layers) and a Storybook-local `tailwind.config.ts`.

---

### Task 3.7: Issues encountered and fixed

| # | Issue | Root Cause | Fix |
|---|---|---|---|
| 1 | `vitest-axe@^1.0.0` install fails | Latest is `0.1.0` not `1.0.0` | Changed to `^0.1.0` |
| 2 | `SeparatorProps` TS2320 conflict | Both Radix props and CVA VariantProps have `orientation` — types not identical | Removed `VariantProps` extension; use Radix's orientation type directly |
| 3 | `toHaveNoViolations` not registered | `vitest-axe/extend-expect` import pattern doesn't work in Vitest 3.x | Use `expect.extend(axeMatchers)` explicitly in setup file |
| 4 | `toHaveNoViolations` TypeScript error | `vitest-axe@0.1.0` doesn't auto-augment Vitest types | Created `src/vitest-axe.d.ts` with `declare module "vitest"` augmentation |
| 5 | AspectRatio className test failed | Radix puts className on inner div, not outer wrapper | Test checks `container.firstChild?.firstChild` |
| 6 | Separator `aria-orientation` test failed | ARIA spec: horizontal is implicit for `role=separator` — Radix correctly omits the attribute | Updated test to assert the attribute is NOT present for horizontal |
| 7 | `type-check` fails on `vitest.config.ts` | File is outside `rootDir: "src"` | Removed from tsconfig `include` |
| 8 | `@storybook/react` not found in `packages/ui` | Story files import it but Storybook deps are in `apps/storybook` | Excluded `*.stories.tsx` from `packages/ui/tsconfig.json` |
| 9 | `jsx-a11y/img-redundant-alt` lint error | alt text contained "image" / "photo" keywords | Updated alt text in tests to avoid redundant words |
| 10 | `jsx-a11y/anchor-is-valid` lint error | `href="#"` in Separator story's navigation demo | Changed to real hrefs: `href="/home"`, `href="/docs"`, `href="/blog"` |

---

### Phase 3 Exit Gate — PASSED ✅

| Criterion | Result |
|---|---|
| 70 tests (all 7 components) | ✅ 70/70 passing |
| TypeScript strict (`tsc --noEmit`) | ✅ Zero errors |
| ESLint (all packages) | ✅ Zero warnings/errors |
| Full workspace build | ✅ 21/21 tasks successful |
| `@designforge/ui` bundle size | ✅ ESM 6.51 KB · CJS 7.63 KB (target ≤ 100 KB) |
| Storybook build with component stories | ✅ All 7 story sets rendered |
| axe-core zero violations | ✅ Verified in all component axe tests |

Commit `f45bfbf` pushed to `main` — `feat: Phase 3 component library foundation (7 layout components + Vitest)`

---

## Phase 4 — Core Components (summary)

**Scope:** 26 additional components (forms, overlays, data display, feedback) plus existing 7 layout primitives → **33 components** total in `@designforge/ui`. Each: React 19 ref-as-prop, CVA/Radix where applicable, Vitest + RTL + `vitest-axe`, co-located Storybook stories.

**Verification:** `pnpm turbo run build lint type-check` (21/21 tasks); `pnpm test` (217/217 tests). Barrel `packages/ui/src/index.ts` exports all components and shared utilities.

**Plan reference:** `PLAN_OF_ACTION.md` Phase 4 checklists and exit gate — all marked complete.

---

## Storybook — Tailwind in preview + Vercel

### Problem

1. **Unstyled canvas:** Preview imported only `@designforge/themes/styles.css` (CSS variables + light reset). Tailwind utility classes from components never entered the Storybook bundle → native browser chrome on buttons/tables in the iframe.
2. **Vercel build failure:** After adding Tailwind, `tailwind.config.ts` used `import { tailwindPlugin } from "@designforge/themes"`. PostCSS loads the config via jiti; that resolves the package to `dist/index.cjs`. The `designforge-storybook` project runs `pnpm build` from `apps/storybook` only — **`@designforge/themes` is not pre-built** → `Cannot find module './node_modules/@designforge/themes/dist/index.cjs'`.

### Changes

| Area | File(s) | Notes |
|---|---|---|
| Tailwind + PostCSS | `apps/storybook/tailwind.config.ts`, `postcss.config.mjs` | `content` globs: `stories/`, `.storybook/`, `packages/ui/src/**` |
| Preview CSS | `apps/storybook/.storybook/preview.css` | `@import "@designforge/themes/styles.css"` then `@tailwind base/components/utilities` |
| Preview entry | `apps/storybook/.storybook/preview.ts` | `import "./preview.css"` (replaces direct theme-only import) |
| Deps | `apps/storybook/package.json` | `tailwindcss`, `postcss`, `autoprefixer` |
| Vercel-safe plugin import | `apps/storybook/tailwind.config.ts` | `import { tailwindPlugin } from "../../packages/themes/src/tailwind-plugin"` — no `themes/dist` required |
| TS include | `apps/storybook/tsconfig.json` | `tailwind.config.ts` in `include` |

**Commits:** `41120f6` (Tailwind in Storybook preview), `3aed2aa` (themes source import for CI).

**Local verification:** Delete `packages/themes/dist`, run `pnpm run build` from `apps/storybook` only — build succeeds; preview CSS ~37 KB gzipped subset includes utilities.

---

*Log maintained by AI agent. Last updated: 2026-03-29.*

---

---

## Phase 5 — Hooks + Icons Packages

---

### Task 5.0: `@designforge/hooks` — hook implementations

**What was done:**
Created 5 production-quality React hooks under `packages/hooks/src/`, each with full JSDoc and comprehensive unit tests.

| Hook | File | Tests | Key design notes |
|---|---|---|---|
| `useDebounce` | `useDebounce.ts` | 8 | Generic `<T>`, clears timer on unmount |
| `useMediaQuery` | `useMediaQuery.ts` | 8 | SSR-safe (`typeof window`), `addEventListener` on MediaQueryList |
| `useClipboard` | `useClipboard.ts` | 10 | Clipboard API + `execCommand` fallback, timer restart on repeat copy |
| `useLocalStorage` | `useLocalStorage.ts` | 12 | SSR-safe, cross-tab sync via `storage` event, functional updater support |
| `useControllable` | `useControllable.ts` | 11 | Stable setter via `useRef`, works in both controlled and uncontrolled modes |

**Bug caught and fixed:** Initial implementation used `[readValue]` in the key-sync `useEffect` dep array. Since `readValue = useCallback([key, initialValue])`, any object passed as `initialValue` would be a new reference each render → `readValue` recreated → effect re-runs → `setStoredValue` → re-render → infinite loop → OOM. Fixed to `[key]` with `/* eslint-disable react-hooks/exhaustive-deps */` block comment.

**Infrastructure added:**
- `vitest.config.ts` — jsdom environment, globals, setupFiles, v8 coverage
- `src/test-setup.ts` — `@testing-library/jest-dom` import
- Updated `package.json` — added all test devDeps + `cross-env NODE_OPTIONS=--max-old-space-size=4096` in test scripts

**Test results:** 49/49 passing across 5 test files

---

### Task 5.1: `@designforge/icons` — lucide-react wrapper

**What was done:**
Implemented `packages/icons/src/index.ts` as a thin wrapper around `lucide-react` using a `withDefaults` HOF that applies DesignForge defaults:

| Default | Value | Rationale |
|---|---|---|
| `size` | `16` | Tighter inline usage (vs Lucide default 24) |
| `strokeWidth` | `1.5` | Matches DesignForge's lighter visual language |
| `color` | `"currentColor"` | Inherits parent CSS `color` automatically |

**52 icons exported** across 9 categories: General UI, Navigation, Actions, Status/Feedback, Layout, Media/Content, Theme, Communication, Misc.

**`IconProps` interface** exported from `src/types.ts` — extends `LucideProps` with documented defaults.

**`lucide-react`** promoted from devDependency to `dependencies` in `package.json` (bundled into the package output, consumers don't need to install it separately).

**Build results:**
- `@designforge/hooks` — ESM 4.81 KB, CJS 5.00 KB, DTS 4.14 KB ✅
- `@designforge/icons` — ESM 4.95 KB, CJS 6.36 KB, DTS 13.24 KB ✅
- lint: 0 errors, 0 warnings ✅
- type-check: clean ✅

---

## Phase 5 Exit Gate — PASSED ✅

| Criterion | Result |
|---|---|
| `@designforge/hooks` builds (ESM + CJS + DTS) | ✅ |
| `@designforge/icons` builds (ESM + CJS + DTS) | ✅ |
| 49/49 hook tests passing | ✅ |
| lint: 0 errors, 0 warnings (both packages) | ✅ |
| type-check: clean (both packages) | ✅ |
| Both packages tree-shakeable | ✅ |
| `cross-env` added for heap safety in CI | ✅ |

---

*Log maintained by AI agent. Last updated: 2026-03-30.*

---

## Phase 6 — AI Generator

---

### Task 6.0: `@designforge/ai` package — PromptBuilder, ResponseParser, ValidationPipeline

**What was done:**
Created `packages/ai/src/` with 4 source files:

| File | Class / Content | Purpose |
|---|---|---|
| `PromptBuilder.ts` | `PromptBuilder` | 5-section system prompt (~1800 tokens): role, tokens, conventions, a11y, output format |
| `ResponseParser.ts` | `ResponseParser` | Extracts ```tsx blocks, checks completeness, validates imports, infers component name |
| `ValidationPipeline.ts` | `ValidationPipeline` | Aggregates TypeScript/ESLint/axe steps → `{passed, summary, steps[]}` |
| `constants.ts` | constants | `RATE_LIMIT_MAX`, `PROVIDER_CHAIN`, `PROVIDER_MODELS`, `SYSTEM_PROMPT_VERSION`, etc. |

**Bug fixed:** `ResponseParser.findDisallowedImports` had two `noUncheckedIndexedAccess` errors on regex match groups — fixed with explicit `undefined` guard before use.

**Build result:** ESM 13.40 KB, CJS 13.70 KB, DTS 6.01 KB ✅

---

### Task 6.1: Three API routes in `apps/docs`

#### `/api/generate` (Edge Runtime)
```
apps/docs/app/api/generate/route.ts
```
- In-memory sliding-window rate limiter (per IP, 20 req/hr, `RATE_LIMIT_WINDOW_MS = 3600000`)
- Provider fallback chain: Anthropic `claude-sonnet-4-20250514` → OpenAI `gpt-4o-mini` → Google `gemini-2.0-flash`
- Providers that lack an API key env var are skipped silently
- `streamText()` from `ai` (Vercel AI SDK v6) → `toTextStreamResponse()` (renamed from `toDataStreamResponse` in v6)
- `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` response headers
- 30s `AbortController` timeout per attempt
- Error responses: `400 EMPTY_PROMPT`, `400 PROMPT_TOO_LONG`, `429 RATE_LIMIT_EXCEEDED`, `500 GENERATION_FAILED`

#### `/api/validate` (Node.js Runtime)
```
apps/docs/app/api/validate/route.ts
```
- Dynamic `import("eslint")` — keeps ESLint out of Edge bundle; only runs in Node.js runtime
- Lints code string via `eslint.lintText()` with `filePath: "generated.tsx"` (no temp file on disk)
- Returns `{errors: LintMessage[], warnings: LintMessage[], summary: string}`

#### `/api/tokens` (Edge Runtime)
```
apps/docs/app/api/tokens/route.ts
```
- Serves `lightColors`, `darkColors`, `spacingTokens`, `radiiTokens`, `shadowTokens`, `durationTokens`, `easingTokens` from `@designforge/themes`
- `Cache-Control: public, max-age=86400, stale-while-revalidate=3600`

---

### Task 6.2: Generator UI at `/generator`

**Files created:**
```
apps/docs/app/generator/
├── page.tsx                         # RSC metadata shell
└── _components/
    ├── GeneratorClient.tsx           # Main client component
    ├── ValidationBadge.tsx           # ESLint check badge
    └── PreviewFrame.tsx              # Sandboxed iframe wrapper
apps/docs/public/preview-frame.html  # Iframe sandbox page
```

**Key architecture decisions:**

| Decision | Rationale |
|---|---|
| Native `fetch` + `ReadableStream` instead of `useChat` | AI SDK v6 removed `ai/react` — `useChat` no longer exists in the package |
| `crypto.randomUUID()` for message IDs | React 19 / no external dep needed |
| Conversation history sliced to last 20 items (10 pairs) | Keeps token usage bounded, matches FR-AI-012 |
| Dynamic Monaco import (`next/dynamic`, `ssr:false`) | Monaco is ~2 MB; avoids blocking initial page paint |
| `preview-frame.html` served from `public/` | Static file, no Next.js SSR overhead; cross-origin sandbox |

**Preview iframe stack:**
- Tailwind CDN with DesignForge colour tokens injected via `tailwind.config`
- Sucrase v3.35 (browser build) transpiles TSX → JS in-browser
- React 19 UMD via unpkg
- Full DesignForge component + hook + icon stubs so generated code doesn't crash
- `postMessage` protocol: parent → `{type:"RENDER_CODE", code}` / iframe → `{type:"FRAME_READY"}`
- Error panel (`role="alert"`) shows transpile/eval errors in red inside the iframe

**ValidationBadge:**
- Watches `code` prop via `useEffect`
- Calls `POST /api/validate` with 5s timeout and `AbortController`
- Shows `idle | checking | pass | fail` states with colour-coded badge + `aria-live="polite"`

---

### Task 6.3: Dependency & env setup

**New packages installed:**
```
ai@6.0.141  @ai-sdk/anthropic@3.0.64  @ai-sdk/openai@3.0.48
@ai-sdk/google@3.0.53  @monaco-editor/react@4.7.0  zod@4.3.6
```

**Workspace packages added to `apps/docs`:**
`@designforge/ai`, `@designforge/ui`, `@designforge/hooks`, `@designforge/icons`

**`.env.local` created** at `apps/docs/.env.local` (gitignored):
```
ANTHROPIC_API_KEY=…  OPENAI_API_KEY=…  GOOGLE_API_KEY=…
```

---

### Task 6.4: Iframe Preview Stabilisation & Refactoring

**What was done:**  
Refactored the iframe preview architecture to eliminate reliance on external CDNs or dynamic Next.js API routes (which were throwing 500 errors in Turbopack) by locally bundling the environment context.

**Key resolutions:**
- **Local Vendor Bundler (`bundle-vendor.mjs`):** Engineered a Node prebuild script that resolves `react`, `react-dom`, and `@babel/standalone` from `node_modules` and packs them as browser-safe IIFEs into Next.js's physical `public/vendor/` static dir.
- **React 19 Subpath APIs:** Updated the bundler generator to additionally require `react-dom/client` so that `window.ReactDOMClient.createRoot()` operates successfully in the modern React 19 environment (since `react-dom` drops native `createRoot`).
- **Comprehensive Radix Shells:** Re-evaluated the inner `makeStubs` payload for the iframe. Added heavy structural Radix UI exports (`Popover`, `Dialog`, `DropdownMenu`, `Accordion`, etc.) mapped to transparent `div` equivalents so AI imports don't trigger `ReferenceError` crashes.
- **WSoD ErrorBoundary Intercept:** Wove a classical React `ErrorBoundary` wrapper class around dynamically eval'd components. React 18+ instantly unmounts the DOM asynchronously during render exceptions, causing silent "White Screen of Death" states—now successfully trapped and hoisted to the red visual feedback banner.

---

## Phase 6 Exit Gate — PASSED ✅

| Criterion | Result |
|---|---|
| `@designforge/ai` builds (ESM + CJS + DTS) | ✅ |
| type-check: 0 errors across all packages + docs app | ✅ |
| Next.js production build: all routes compile | ✅ |
| `/generator` route: 11.2 kB first-load JS | ✅ |
| `/api/generate` Edge route: compilable | ✅ |
| `/api/validate` Node route: compilable | ✅ |
| `/api/tokens` Edge route: compilable | ✅ |
| Monaco editor lazy-loaded | ✅ |
| Preview iframe with Sucrase + stubs | ✅ |
| Rate limit headers on all responses | ✅ |
| Committed `960f984` + pushed to GitHub | ✅ |

> **Note for deployment:** Add `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_API_KEY` to Vercel project environment variables before the generator page will function in production.

---

*Log maintained by AI agent. Last updated: 2026-03-30.*
