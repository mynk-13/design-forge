# @designforge/icons

[![npm](https://img.shields.io/npm/v/@designforge/icons?color=6d28d9)](https://www.npmjs.com/package/@designforge/icons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

57 curated [Lucide](https://lucide.dev) icons pre-configured with DesignForge defaults: **size 16**, **strokeWidth 1.5**, **color currentColor**. All defaults are overridable per-instance.

## Installation

```bash
npm install @designforge/icons
```

Peer dependency: `react >=19.0.0`

## Usage

```tsx
import { CheckIcon, AlertCircleIcon, Loader2Icon } from '@designforge/icons'

// Uses DesignForge defaults (size=16, strokeWidth=1.5)
<CheckIcon />

// Override any default per-instance
<AlertCircleIcon size={20} strokeWidth={2} color="red" />

// Inherit text colour from CSS (default behaviour)
<Loader2Icon className="animate-spin text-muted-foreground" />
```

## Icon Catalogue

### General UI
`CheckIcon` · `XIcon` · `ChevronDownIcon` · `ChevronUpIcon` · `ChevronLeftIcon` · `ChevronRightIcon` · `ChevronsUpDownIcon` · `CircleIcon` · `MinusIcon` · `PlusIcon`

### Navigation
`ArrowLeftIcon` · `ArrowRightIcon` · `ArrowUpIcon` · `ArrowDownIcon` · `ExternalLinkIcon`

### Actions
`CopyIcon` · `ClipboardCheckIcon` · `DownloadIcon` · `UploadIcon` · `Trash2Icon` · `PencilIcon` · `SaveIcon` · `RefreshCwIcon` · `Share2Icon` · `SearchIcon` · `FilterIcon`

### Status / Feedback
`InfoIcon` · `AlertCircleIcon` · `AlertTriangleIcon` · `CheckCircle2Icon` · `XCircleIcon` · `Loader2Icon`

### Layout
`MenuIcon` · `SidebarOpenIcon` · `SidebarCloseIcon` · `LayoutGridIcon` · `ListIcon`

### Media / Content
`EyeIcon` · `EyeOffIcon` · `Code2Icon` · `FileCode2Icon` · `PaletteIcon` · `Wand2Icon` · `SparklesIcon`

### Theme
`SunIcon` · `MoonIcon` · `MonitorIcon`

### Communication
`BellIcon` · `MailIcon`

### Misc
`StarIcon` · `HeartIcon` · `SettingsIcon` · `UserIcon` · `UsersIcon` · `LockIcon` · `UnlockIcon` · `KeyIcon`

## Props

Every icon accepts the full `IconProps` interface (extends Lucide's `LucideProps`):

```ts
interface IconProps {
  size?:        number | string  // default: 16
  strokeWidth?: number           // default: 1.5
  color?:       string           // default: 'currentColor'
  className?:   string
  // …all other SVG props
}
```

## Why not use lucide-react directly?

`@designforge/icons` applies consistent defaults across the entire library — smaller icons (`16px`) and a thinner stroke (`1.5`) that match the DesignForge visual language. Using this package ensures icons are visually consistent with all `@designforge/ui` components without per-instance configuration.

## License

MIT © 2026 [Mayank](https://github.com/mynk-13) — see [LICENSE](../../LICENSE)
