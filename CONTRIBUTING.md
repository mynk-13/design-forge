# Contributing to DesignForge

Thank you for your interest in contributing to DesignForge. This guide covers everything you need to get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards. Please report unacceptable behaviour to the maintainers via GitHub.

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| pnpm | 9+ |
| Git | any recent |

### Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/design-forge.git
cd design-forge
pnpm install
```

### Verify Setup

```bash
pnpm turbo run build   # all packages + apps must build
pnpm turbo run lint    # zero lint errors expected
pnpm turbo run test    # 280+ unit tests must pass
```

---

## Development Setup

### Running Apps Locally

```bash
# Docs site (Next.js) — http://localhost:3000
pnpm --filter docs dev

# Storybook — http://localhost:6006
pnpm --filter storybook dev
```

### Working on a Specific Package

```bash
# Watch-build a package while developing
pnpm --filter @designforge/ui build --watch
```

### Environment Variables

The docs app requires API keys for the AI generator feature. Copy the example file and fill in your own keys:

```bash
cp apps/docs/.env.example apps/docs/.env.local
```

The AI generator will degrade gracefully if keys are absent — all other functionality works without them.

---

## Project Structure

```
design-forge/
├── apps/
│   ├── docs/          # Next.js 15 documentation site
│   └── storybook/     # Storybook 8 component explorer
├── packages/
│   ├── ui/            # @designforge/ui — 33 React components
│   ├── themes/        # @designforge/themes — design tokens + Tailwind plugin
│   ├── hooks/         # @designforge/hooks — 5 utility hooks
│   ├── icons/         # @designforge/icons — curated Lucide re-exports
│   └── ai/            # @designforge/ai — server-side AI utilities
└── .github/
    ├── workflows/     # CI/CD pipelines
    └── ISSUE_TEMPLATE/
```

---

## Making Changes

### Branch Naming

```
feat/<short-description>        # new component or feature
fix/<short-description>         # bug fix
docs/<short-description>        # documentation only
chore/<short-description>       # tooling, config, deps
refactor/<short-description>    # no behaviour change
test/<short-description>        # tests only
```

### Changesets (required for package changes)

Any change to a published package (`packages/ui`, `packages/themes`, `packages/hooks`, `packages/icons`, `packages/ai`) must include a changeset:

```bash
pnpm changeset
```

Select the affected packages, choose the bump type (`patch` / `minor` / `major`), and write a one-line summary of the change. Commit the generated `.changeset/*.md` file alongside your code changes.

> **Do not** bump `version` fields in `package.json` manually — Changesets handles this.

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative summary>
```

**Types:** `feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `perf`

**Scope** (optional): package or area — e.g. `ui`, `themes`, `hooks`, `docs`, `ci`

**Examples:**

```
feat(ui): add Tooltip component with keyboard support
fix(themes): correct --df-shadow-overlay HSL value
docs: add Tailwind setup guide to getting-started section
chore(ci): pin actions/checkout to SHA
test(hooks): add edge-case coverage for useLocalStorage SSR
```

---

## Pull Request Process

1. **Open a draft PR early** — the CI suite runs automatically on every push.
2. **Fill in the PR template** — describe what changed and how it was tested.
3. **All checks must pass** before requesting review: lint, type-check, unit tests, build, bundle-size gate, and E2E tests.
4. **One approving review** is required from a maintainer before merge.
5. PRs are merged via **squash merge** — your branch history will be squashed into a single commit on `main`.
6. Delete your branch after merge.

### What Makes a Good PR

- Focused — one logical change per PR. Large refactors should be discussed in an issue first.
- Includes tests — new components need unit tests + a Storybook story. Bug fixes need a regression test.
- Updates docs — if you change a public API, update the corresponding docs page and JSDoc.
- Passes accessibility — components must meet WCAG 2.1 AA. Run `axe-core` assertions in tests.

---

## Component Guidelines

New components in `packages/ui` must follow these standards:

### File Structure

```
packages/ui/src/components/<component-name>/
├── <ComponentName>.tsx        # component implementation
├── <ComponentName>.test.tsx   # Vitest + RTL unit tests
└── index.ts                   # named re-export
```

Export the component from `packages/ui/src/index.ts`.

### Implementation Rules

- **React 19** — use `ref` as a prop directly (no `forwardRef`).
- **Radix UI** primitives for interactive components wherever applicable.
- **CVA** (`class-variance-authority`) for variant logic.
- **`cn()`** (`clsx` + `tailwind-merge`) for className composition.
- **Tailwind CSS v3** utility classes only — no arbitrary inline styles.
- **Design tokens** — use `--df-*` CSS custom properties via the Tailwind plugin; do not hardcode colours or spacing values.
- **TypeScript strict** — `noImplicitAny`, no `as any` casts.
- **Accessibility** — keyboard navigation, ARIA roles, and focus management are non-negotiable.

### Storybook Story

Every component needs at least three stories: `Default`, a variant showcase, and an `Interactive` story with controls. Place the story file in `apps/storybook/stories/<ComponentName>.stories.tsx`.

---

## Testing Requirements

| Layer | Tool | Minimum |
|-------|------|---------|
| Unit tests | Vitest + React Testing Library | 1 test per component variant |
| Hook tests | Vitest (renderHook) | All exported hooks |
| E2E tests | Playwright | Critical user journeys |
| Accessibility | axe-core (in RTL tests) | All interactive components |
| Visual regression | Playwright screenshots | Storybook stories |

Run the full suite before opening a PR:

```bash
pnpm turbo run test        # unit tests
pnpm --filter docs exec playwright test   # E2E + visual regression
```

---

## Reporting Bugs

Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml) template. Include:

- A minimal reproduction (CodeSandbox or a reduced test case in the issue).
- The package version and browser/environment.
- Expected vs. actual behaviour.

Security vulnerabilities must **not** be reported as public GitHub issues. Follow the [Security Policy](./SECURITY.md) instead.

---

## Requesting Features

Use the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml) template. Before opening one, search existing issues and discussions — the idea may already be tracked or have been deliberately deferred.

---

## Questions?

Open a [GitHub Discussion](https://github.com/mynk-13/design-forge/discussions) for general questions. Reserve issues for confirmed bugs and actionable feature requests.

Thank you for contributing.
