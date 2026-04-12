# @designforge/ai

[![npm](https://img.shields.io/npm/v/@designforge/ai?color=6d28d9)](https://www.npmjs.com/package/@designforge/ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

Server-side AI utilities that power the DesignForge component generator. Provides the prompt assembly, response parsing, and validation pipeline used by the `/api/generate` and `/api/validate` Edge/Node.js routes.

> **Server-only.** This package contains no client-side code. Do not import it in browser bundles or React Server Components that run on the client.

## Installation

```bash
npm install @designforge/ai
```

No peer dependencies. Designed for use in Node.js 20+ and Vercel Edge runtime environments.

## API

### `PromptBuilder`

Assembles the structured system prompt sent to the LLM on every generation request. The prompt is split into 5 versioned sections (~1,800 tokens total): role definition, design token reference, component API conventions, accessibility requirements, and output format.

```ts
import { PromptBuilder } from '@designforge/ai'

const pb = new PromptBuilder()

// In your API route:
const systemPrompt = pb.build()  // → full prompt string
const version = pb.getVersion()  // → e.g. "1.0.0" (for logging)
```

| Method | Returns | Description |
|---|---|---|
| `build()` | `string` | Assembled system prompt |
| `getVersion()` | `string` | Prompt version string (for logging / cache-busting) |

---

### `ResponseParser`

Parses raw LLM output from the streaming generation response. Extracts the code block, validates completeness, infers the component name, and checks for disallowed imports.

```ts
import { ResponseParser } from '@designforge/ai'

const parser = new ResponseParser()

const code = parser.extractCode(rawLLMText)         // string | null
const ready = parser.isComplete(code)               // boolean
const name  = parser.getComponentName(code)         // "SearchBar" | "GeneratedComponent"
const bad   = parser.findDisallowedImports(code)    // string[] (empty = clean)
```

| Method | Signature | Description |
|---|---|---|
| `extractCode` | `(raw: string) => string \| null` | Extracts the first ` ```tsx ` block |
| `isComplete` | `(code: string) => boolean` | Returns `true` if code has a default export |
| `getComponentName` | `(code: string) => string` | Infers name from `export default function` |
| `findDisallowedImports` | `(code: string) => string[]` | Lists imports outside the allowed DesignForge packages |

---

### `ValidationPipeline`

Aggregates results from the 3-step validation pipeline (TypeScript → ESLint → axe-core) into a single structured result. Stateless — callers pass in step results and receive a summary.

```ts
import { ValidationPipeline, type ValidationStepResult } from '@designforge/ai'

const pipeline = new ValidationPipeline()

const steps: ValidationStepResult[] = [
  { step: 'typescript', passed: true,  errors: [], warnings: [] },
  { step: 'eslint',     passed: false, errors: ['no-unused-vars'], warnings: [] },
  { step: 'axe',        passed: true,  errors: [], warnings: [] },
]

const result = pipeline.aggregate(steps)
// result.passed  → false
// result.summary → "ESLint issues found — TypeScript ✓  ESLint ✗  Accessibility ✓"
```

**Types:**

```ts
interface ValidationStepResult {
  step:     'typescript' | 'eslint' | 'axe'
  passed:   boolean
  errors:   string[]
  warnings: string[]
}

interface ValidationResult {
  steps:   ValidationStepResult[]
  passed:  boolean   // true only if ALL steps passed
  summary: string    // human-readable summary for the UI badge
}
```

---

### `SYSTEM_PROMPT_VERSION`

Exported constant — the current system prompt version string. Used for logging, cache-busting, and debugging prompt drift.

```ts
import { SYSTEM_PROMPT_VERSION } from '@designforge/ai'

console.log(SYSTEM_PROMPT_VERSION) // e.g. "1.0.0"
```

## Architecture Note

The validation pipeline runs across three separate environments:

| Step | Where | Latency |
|---|---|---|
| TypeScript | Monaco language service (client) | Instant |
| ESLint | `/api/validate` Node.js route | ~1–2 s |
| axe-core | Sandboxed iframe postMessage | ~200–500 ms |

`ValidationPipeline.aggregate()` is called on the client to combine results received from all three sources.

## License

MIT © 2026 [Mayank](https://github.com/mynk-13) — see [LICENSE](../../LICENSE)
