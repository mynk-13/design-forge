# DesignForge

**An open-source React component design system built for production.**
33 accessible components · AI-powered code generator · Monaco playground · Full dark mode · Fully typed.

<div align="center">

[![CI](https://github.com/mynk-13/design-forge/actions/workflows/ci.yml/badge.svg)](https://github.com/mynk-13/design-forge/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@designforge/ui?label=%40designforge%2Fui&color=6d28d9)](https://www.npmjs.com/package/@designforge/ui)
[![npm](https://img.shields.io/npm/v/@designforge/themes?label=%40designforge%2Fthemes&color=6d28d9)](https://www.npmjs.com/package/@designforge/themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mynk-13/design-forge/pulls)
[![Bundle Size](https://img.shields.io/badge/bundle%20%40designforge%2Fui-10.8%20KB%20gzip-blue)](https://bundlephobia.com/package/@designforge/ui)

[**Docs**](https://designforge-docs.vercel.app) · [**Storybook**](https://designforge-storybook.vercel.app) · [**npm**](https://www.npmjs.com/org/designforge)

</div>

---

## What is DesignForge?

DesignForge is a full-stack design system built on **React 19**, **Next.js 15**, and **TypeScript 5 strict**. It ships as a set of scoped npm packages — covering components, tokens, hooks, icons, and server-side AI utilities — all in a single Turborepo monorepo.

The documentation site includes an **AI-powered component generator** (Anthropic / OpenAI / Gemini fallback chain) and a **Monaco editor playground** for live code editing and instant preview, both built on top of the same component primitives the packages export.

## Features

| Feature | Detail |
|---|---|
| **33 accessible components** | Layout, Form, Overlay, Data Display, Feedback — all zero axe-core violations |
| **Design token system** | 60+ CSS custom properties, light + dark presets, Tailwind v3 plugin |
| **AI code generator** | Streaming generation via Vercel AI SDK · 3-provider fallback chain |
| **Monaco playground** | Live JSX editing + iframe preview + LZ-string shareable links |
| **Full dark mode** | CSS-var driven — zero Flash Of Unstyled Content |
| **Tree-shakeable** | ESM + CJS builds · `@designforge/ui` = 10.8 KB gzip (full package) |
| **Fully typed** | TypeScript 5 strict · exported type declarations for all public APIs |
| **Tested** | 284+ unit tests · Playwright E2E · visual regression · axe-core audit |
| **CI/CD** | GitHub Actions · Changesets · npm provenance (SLSA Level 2) · Vercel deploy |

## Packages

| Package | Description | Size |
|---|---|---|
| [`@designforge/ui`](packages/ui/) | 33 React components built on Radix UI + CVA | 10.8 KB gzip |
| [`@designforge/themes`](packages/themes/) | 60+ design tokens, light/dark CSS presets, Tailwind plugin | ~2.1 KB gzip |
| [`@designforge/hooks`](packages/hooks/) | 5 production hooks: `useDebounce`, `useMediaQuery`, `useClipboard`, `useLocalStorage`, `useControllable` | — |
| [`@designforge/icons`](packages/icons/) | 57 curated Lucide icons with DesignForge defaults via `withDefaults()` HOF | — |
| [`@designforge/ai`](packages/ai/) | Server-side AI utilities: `PromptBuilder`, `ResponseParser`, `ValidationPipeline` | — |

## Quick Start

```bash
# 1. Install the component library and theme tokens
npm install @designforge/ui @designforge/themes

# 2. Import the global CSS (once, in your root layout)
import '@designforge/themes/styles.css'

# 3. (Optional) Add the Tailwind plugin to unlock df-* token utilities
# In tailwind.config.ts:
import { tailwindPlugin } from '@designforge/themes'
export default { plugins: [tailwindPlugin] }
```

```tsx
import { Button, Card, Badge } from '@designforge/ui'

export default function Example() {
  return (
    <Card className="p-6 max-w-sm">
      <Badge variant="secondary">New</Badge>
      <h2 className="mt-2 text-lg font-semibold">DesignForge</h2>
      <p className="text-muted-foreground mt-1">
        Accessible components, ready to use.
      </p>
      <Button className="mt-4">Get started</Button>
    </Card>
  )
}
```

For full setup instructions see the [Installation guide](https://designforge-docs.vercel.app/docs/installation).

## Component Library

33 components across 5 categories, all built with Radix UI primitives and CVA variant management:

| Category | Components |
|---|---|
| **Layout** (7) | `Box` · `Flex` · `Grid` · `Stack` · `Container` · `Separator` · `AspectRatio` |
| **Form** (9) | `Button` · `Input` · `Textarea` · `Checkbox` · `RadioGroup` · `Switch` · `Slider` · `Select` · `Label` |
| **Overlay** (7) | `Dialog` · `AlertDialog` · `DropdownMenu` · `ContextMenu` · `Popover` · `Tooltip` · `HoverCard` |
| **Data Display** (6) | `Badge` · `Avatar` · `Card` · `DataTable` · `Tabs` · `Accordion` |
| **Feedback** (4) | `Toast` · `Alert` · `Progress` · `Skeleton` · `Banner` |

Explore all components live on [Storybook](https://designforge-storybook.vercel.app).

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19, Next.js 15 (App Router) |
| **Language** | TypeScript 5 strict |
| **Styling** | Tailwind CSS v3, CSS custom properties |
| **Component primitives** | Radix UI |
| **Variant management** | CVA (class-variance-authority) |
| **Monorepo** | Turborepo + pnpm workspaces |
| **AI / Streaming** | Vercel AI SDK v6, Anthropic, OpenAI, Google Gemini |
| **Playground** | Monaco Editor, Sucrase, Zustand, LZ-string |
| **Testing** | Vitest, React Testing Library, Playwright, axe-core |
| **Storybook** | Storybook 8 |
| **Bundler** | tsup (ESM + CJS, `.d.ts`) |
| **Release** | Changesets, npm provenance (SLSA Level 2) |
| **Deployment** | Vercel |

## Documentation

| Resource | URL |
|---|---|
| Docs site | https://designforge-docs.vercel.app |
| Storybook | https://designforge-storybook.vercel.app |
| npm org | https://www.npmjs.com/org/designforge |

## Contributing

Contributions are welcome — bug reports, feature requests, and pull requests alike.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.
2. Check the [issue tracker](https://github.com/mynk-13/design-forge/issues) for open items.
3. Follow the [Code of Conduct](CODE_OF_CONDUCT.md).

For security vulnerabilities, use the [private advisory form](SECURITY.md) — do not open a public issue.

## License

MIT © 2026 [Mayank](https://github.com/mynk-13)
See [LICENSE](LICENSE) for details.
