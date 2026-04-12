# @designforge/hooks

[![npm](https://img.shields.io/npm/v/@designforge/hooks?color=6d28d9)](https://www.npmjs.com/package/@designforge/hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

5 production-grade React hooks used throughout the DesignForge component library. SSR-safe, fully typed, zero dependencies beyond React.

## Installation

```bash
npm install @designforge/hooks
```

Peer dependency: `react >=19.0.0`

## Hooks

### `useDebounce`

Returns a debounced copy of `value` that only updates after `delay` ms of inactivity.

```tsx
import { useDebounce } from '@designforge/hooks'

function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery)
  }, [debouncedQuery])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

**Signature:** `useDebounce<T>(value: T, delay?: number): T`

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | `T` | — | Value to debounce |
| `delay` | `number` | `500` | Debounce delay in ms |

---

### `useMediaQuery`

Returns `true` when a CSS media query matches. SSR-safe (returns `false` on the server).

```tsx
import { useMediaQuery } from '@designforge/hooks'

function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'} />
}
```

**Signature:** `useMediaQuery(query: string): boolean`

---

### `useClipboard`

Copies text to the clipboard with transient `copied` state. Falls back to `execCommand` for older browsers.

```tsx
import { useClipboard } from '@designforge/hooks'

function CopyButton({ code }: { code: string }) {
  const { copied, copy } = useClipboard({ timeout: 1500 })

  return (
    <button onClick={() => copy(code)}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

**Signature:** `useClipboard(options?: UseClipboardOptions): UseClipboardReturn`

```ts
interface UseClipboardOptions {
  timeout?: number              // ms before `copied` resets (default: 2000)
  onCopy?: (text: string) => void
  onError?: (error: Error) => void
}

interface UseClipboardReturn {
  copied: boolean               // true for `timeout` ms after a successful copy
  copy: (text: string) => Promise<boolean>
  reset: () => void
}
```

---

### `useLocalStorage`

Reads and writes a typed value to `localStorage`. SSR-safe, syncs across tabs via the `storage` event.

```tsx
import { useLocalStorage } from '@designforge/hooks'

function ThemeSwitcher() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  )
}
```

**Signature:** `useLocalStorage<T>(key: string, initialValue: T): [T, setter, remover]`

| Return | Type | Description |
|---|---|---|
| `[0]` | `T` | Current stored value |
| `[1]` | `(value: T \| ((prev: T) => T)) => void` | Setter (functional updates supported) |
| `[2]` | `() => void` | Removes key from storage, resets to `initialValue` |

---

### `useControllable`

Manages state that works in both **controlled** (`value` + `onChange`) and **uncontrolled** (`defaultValue`) modes — the same pattern used internally by all DesignForge form components.

```tsx
import { useControllable } from '@designforge/hooks'

// Inside a custom form component:
function Toggle({ checked, defaultChecked, onCheckedChange }) {
  const [isChecked, setIsChecked] = useControllable({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  })

  return <button onClick={() => setIsChecked(!isChecked)} aria-pressed={isChecked} />
}
```

**Signature:** `useControllable<T>(params): [T | undefined, (next: T) => void]`

| Param | Description |
|---|---|
| `value` | Controlled value (consumer owns state) |
| `defaultValue` | Initial value for uncontrolled mode |
| `onChange` | Called with the new value in both modes |

## License

MIT © 2026 [Mayank](https://github.com/mynk-13) — see [LICENSE](../../LICENSE)
