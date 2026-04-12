# @designforge/themes

[![npm](https://img.shields.io/npm/v/@designforge/themes?color=6d28d9)](https://www.npmjs.com/package/@designforge/themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

Design token system for DesignForge. Ships 60+ CSS custom properties for light and dark themes, plus a **Tailwind CSS v3 plugin** that maps every token to a utility class.

## Installation

```bash
npm install @designforge/themes
```

Peer dependency: `tailwindcss ^3.0.0` (only required if you use the Tailwind plugin).

## Setup

### 1. Import the stylesheet

Import once at your application root (e.g. Next.js `app/layout.tsx`):

```ts
import '@designforge/themes/styles.css'
```

This injects all `--df-*` CSS custom properties for both light (`:root`) and dark (`.dark` / `prefers-color-scheme: dark`) themes.

### 2. (Optional) Add the Tailwind plugin

```ts
// tailwind.config.ts
import { tailwindPlugin } from '@designforge/themes'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  plugins: [tailwindPlugin],
} satisfies Config
```

The plugin maps all `--df-*` tokens to Tailwind utilities:

```tsx
<div className="bg-primary text-primary-foreground rounded-md shadow-md" />
<div className="duration-fast ease-smooth" />
```

## Token Reference

### Colors (25 light / 19 dark overrides)

| Token | Utility class | Description |
|---|---|---|
| `--df-background` | `bg-background` | Page background |
| `--df-foreground` | `text-foreground` | Default text |
| `--df-primary` | `bg-primary` / `text-primary` | Brand primary |
| `--df-primary-foreground` | `text-primary-foreground` | Text on primary |
| `--df-secondary` | `bg-secondary` | Secondary surface |
| `--df-muted` | `bg-muted` | Muted background |
| `--df-muted-foreground` | `text-muted-foreground` | Muted text |
| `--df-accent` | `bg-accent` | Accent highlight |
| `--df-destructive` | `bg-destructive` | Error / danger |
| `--df-border` | `border-border` | Default border |
| `--df-input` | `border-input` | Form input border |
| `--df-ring` | `ring-ring` | Focus ring |
| `--df-card` | `bg-card` | Card surface |
| `--df-popover` | `bg-popover` | Popover surface |

### Spacing

18-step scale from `--df-space-px` (1px) through `--df-space-12` (3rem).

### Border Radius

| Token | Value |
|---|---|
| `--df-radius-none` | 0 |
| `--df-radius-sm` | 0.125rem |
| `--df-radius-md` | 0.375rem |
| `--df-radius-lg` | 0.5rem |
| `--df-radius-xl` | 0.75rem |
| `--df-radius-2xl` | 1rem |
| `--df-radius-3xl` | 1.5rem |
| `--df-radius-full` | 9999px |

### Typography

- **Font families:** `--df-font-sans`, `--df-font-mono`
- **Font sizes:** 9-step scale (`--df-text-xs` → `--df-text-5xl`)
- **Font weights:** thin (100) → bold (700)
- **Line heights:** none → loose
- **Letter spacing:** tighter → widest

### Shadows

8 levels: `--df-shadow-sm` → `--df-shadow-overlay`

### Animations

5 durations (`--df-duration-fast` → `--df-duration-slow`) · 5 easing curves · 10 keyframe animations (`fadeIn`, `slideIn*`, `scaleIn`, `spin`, `pulse`)

## Exports

```ts
import { tailwindPlugin }              from '@designforge/themes'
import type { DesignForgeTokens,
              ColorTokens,
              TypographyTokens,
              AnimationTokens,
              ThemeMode }              from '@designforge/themes'

// Separate CSS imports
import '@designforge/themes/styles.css'          // all tokens (recommended)
import '@designforge/themes/presets/light.css'   // light only
import '@designforge/themes/presets/dark.css'    // dark overrides only
```

## Bundle Size

~2.1 KB gzip for `dist/styles.css` (all 60+ tokens, both themes).

## License

MIT © 2026 [Mayank](https://github.com/mynk-13) — see [LICENSE](../../LICENSE)
