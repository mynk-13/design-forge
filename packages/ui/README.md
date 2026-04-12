# @designforge/ui

[![npm](https://img.shields.io/npm/v/@designforge/ui?color=6d28d9)](https://www.npmjs.com/package/@designforge/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Bundle Size](https://img.shields.io/badge/bundle-10.8%20KB%20gzip-blue)](https://bundlephobia.com/package/@designforge/ui)

33 accessible React components built on **Radix UI** primitives with **CVA** variant management. Zero axe-core violations. Fully typed. Tree-shakeable ESM + CJS.

## Installation

```bash
npm install @designforge/ui @designforge/themes
```

> `@designforge/themes` provides the CSS custom properties that all components depend on.

## Setup

```tsx
// 1. Import the design tokens (once, in your root layout)
import '@designforge/themes/styles.css'

// 2. Use components
import { Button, Card, Badge } from '@designforge/ui'

export default function Page() {
  return (
    <Card className="p-6 max-w-sm">
      <Badge variant="secondary">New</Badge>
      <p className="mt-2 text-muted-foreground">Ready to ship.</p>
      <Button className="mt-4" size="sm">Get started</Button>
    </Card>
  )
}
```

## Components

### Layout

| Component | Description |
|---|---|
| `Box` | Polymorphic base container with `as` prop |
| `Flex` | Flexbox container — `direction`, `align`, `justify`, `wrap`, `gap` variants |
| `Grid` | CSS grid — `cols`, `rows`, `gap`, `align`, `flow` variants |
| `Stack` | Vertical / horizontal stack (Flex abstraction) |
| `Container` | Max-width centered wrapper — 6 size variants |
| `Separator` | Radix `Separator` — horizontal / vertical, `decorative` prop |
| `AspectRatio` | Radix `AspectRatio` — enforces a fixed width/height ratio |

### Form

| Component | Description |
|---|---|
| `Button` | Primary action — `variant` (default, destructive, outline, secondary, ghost, link) · `size` (default, sm, lg, icon) |
| `Input` | Styled text input — forwards all HTML input attributes |
| `Textarea` | Styled textarea — auto-resizes on content change |
| `Checkbox` | Radix `Checkbox` — controlled + uncontrolled |
| `RadioGroup` / `RadioGroupItem` | Radix `RadioGroup` |
| `Switch` | Radix `Switch` — on/off toggle |
| `Slider` | Radix `Slider` — range input with min/max/step |
| `Select` + sub-parts | Radix `Select` — trigger, content, item, group, label, separator |
| `Label` | Radix `Label` — associates with form controls via `htmlFor` |

### Overlay

| Component | Description |
|---|---|
| `Dialog` + sub-parts | Radix `Dialog` — modal with trigger, content, header, footer |
| `AlertDialog` + sub-parts | Radix `AlertDialog` — destructive confirmation modal |
| `Popover` + sub-parts | Radix `Popover` — anchored floating panel |
| `Tooltip` + `TooltipProvider` | Radix `Tooltip` — hover tooltip |
| `DropdownMenu` + sub-parts | Radix `DropdownMenu` — full-featured dropdown with sub-menus |
| `ContextMenu` + sub-parts | Radix `ContextMenu` — right-click context menu |
| `HoverCard` + sub-parts | Radix `HoverCard` — hover-triggered card preview |

### Data Display

| Component | Description |
|---|---|
| `Badge` | Inline status label — `variant` (default, secondary, destructive, outline) |
| `Avatar` / `AvatarImage` / `AvatarFallback` | Radix `Avatar` — image with fallback initials |
| `Card` + sub-parts | Content card — header, title, description, content, footer |
| `Accordion` + sub-parts | Radix `Accordion` — collapsible item list |
| `Tabs` + sub-parts | Radix `Tabs` — tabbed content panels |
| `DataTable` | `@tanstack/react-table` + `@tanstack/react-virtual` — sorting, virtualised rows |

### Feedback

| Component | Description |
|---|---|
| `Toast` + sub-parts | Radix `Toast` — transient notification |
| `Alert` + `AlertTitle` + `AlertDescription` | Static alert — `variant` (default, destructive) |
| `Progress` | Radix `Progress` — determinate progress bar |
| `Skeleton` | Loading placeholder — `variant` (default, circular, text) |
| `Banner` | Full-width announcement — `variant` (info, success, warning, destructive) |

## Utilities

```ts
import { cn } from '@designforge/ui'

// Merges Tailwind classes (clsx + tailwind-merge)
cn('px-4 py-2', condition && 'bg-primary', 'px-2') // → 'py-2 bg-primary px-2'
```

## Peer Dependencies

| Package | Version |
|---|---|
| `react` | `>=19.0.0` |
| `react-dom` | `>=19.0.0` |

## Requirements

- React 19+
- Tailwind CSS v3 (for utility classes used in component styles)
- `@designforge/themes` CSS imported at the root of your app

## License

MIT © 2026 [Mayank](https://github.com/mynk-13) — see [LICENSE](../../LICENSE)
