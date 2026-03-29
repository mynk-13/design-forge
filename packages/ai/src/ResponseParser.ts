/**
 * Parses raw LLM output from /api/generate.
 *
 * The LLM is instructed to return exactly one ```tsx code block.
 * This class extracts that block, validates it looks complete, and
 * infers the component name from the default export declaration.
 */
export class ResponseParser {
  /**
   * Extracts the first ```tsx (or ```ts / ```typescript) code block from
   * the raw LLM response text.
   *
   * @returns The extracted code string, or `null` if no block was found.
   */
  extractCode(raw: string): string | null {
    // Match ```tsx, ```ts, or ```typescript blocks (case-insensitive)
    const match = raw.match(/```(?:tsx?|typescript)\r?\n([\s\S]*?)```/i);
    return match?.[1]?.trim() ?? null;
  }

  /**
   * Returns `true` if the code looks complete — i.e. it contains a default
   * export. Streaming responses may be truncated; this guard prevents
   * showing half-rendered components in the preview.
   */
  isComplete(code: string): boolean {
    return /export\s+default\s+function\b/.test(code);
  }

  /**
   * Infers the component name from the first `export default function` declaration.
   *
   * @returns The component name string, or `"GeneratedComponent"` as a fallback.
   *
   * @example
   * parser.getComponentName("export default function SearchBar() {…}"); // "SearchBar"
   */
  getComponentName(code: string): string {
    const match = code.match(/export\s+default\s+function\s+([A-Z][A-Za-z0-9_]*)/);
    return match?.[1] ?? "GeneratedComponent";
  }

  /**
   * Checks whether the code imports only from the allowed DesignForge packages.
   * Returns a list of disallowed import paths found (empty = clean).
   */
  findDisallowedImports(code: string): string[] {
    const importLines = code.match(/^import\s+.+from\s+['"][^'"]+['"]/gm) ?? [];
    const allowed = [
      "@designforge/ui",
      "@designforge/hooks",
      "@designforge/icons",
      "react",
    ];

    const disallowed: string[] = [];
    for (const line of importLines) {
      const pathMatch = line.match(/from\s+['"]([^'"]+)['"]/);
      if (!pathMatch) continue;
      const importPath = pathMatch[1];
      if (importPath === undefined) continue;
      if (!allowed.some((a) => importPath === a || importPath.startsWith(`${a}/`))) {
        disallowed.push(importPath);
      }
    }
    return disallowed;
  }
}
