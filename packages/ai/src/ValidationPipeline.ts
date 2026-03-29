/**
 * Structured result from a step in the ValidationPipeline.
 */
export interface ValidationStepResult {
  /** Which validation step this result is for. */
  step: "typescript" | "eslint" | "axe";
  /** Whether the step found no issues. */
  passed: boolean;
  /** Error messages (if any). */
  errors: string[];
  /** Warning messages (if any). */
  warnings: string[];
}

/** Aggregated result from all three validation steps. */
export interface ValidationResult {
  steps: ValidationStepResult[];
  /** Overall pass — true only if ALL steps passed. */
  passed: boolean;
  /** Human-readable summary for the UI badge. */
  summary: string;
}

/**
 * Orchestrates the 3-step validation pipeline (LLD §17.3):
 *
 *   Step 1 — TypeScript:  Monaco language service (client-side, instant)
 *   Step 2 — ESLint:      /api/validate route (server-side Node.js, ~1-2s)
 *   Step 3 — axe-core:    Sandboxed iframe postMessage (after render, ~200-500ms)
 *
 * This class runs on the client to aggregate results received from the Monaco
 * editor (step 1) and from the two API calls (steps 2 & 3).
 * It is intentionally stateless — callers pass in results and get a summary.
 */
export class ValidationPipeline {
  /**
   * Aggregates individual step results into a single ValidationResult.
   *
   * @param steps - Results from each completed validation step.
   * @returns Aggregated result with overall pass/fail and summary string.
   */
  aggregate(steps: ValidationStepResult[]): ValidationResult {
    const passed = steps.every((s) => s.passed);
    const failedSteps = steps.filter((s) => !s.passed).map((s) => s.step);

    let summary: string;
    if (passed) {
      summary = "All checks passed — TypeScript ✓  ESLint ✓  Accessibility ✓";
    } else {
      const labels: Record<string, string> = {
        typescript: "TypeScript",
        eslint: "ESLint",
        axe: "Accessibility",
      };
      summary = `Issues in: ${failedSteps.map((s) => labels[s] ?? s).join(", ")}`;
    }

    return { steps, passed, summary };
  }

  /**
   * Constructs a ValidationStepResult for the TypeScript step.
   * In practice, diagnostics come from Monaco's TS language service web worker.
   *
   * @param errors - TypeScript error messages (empty = clean).
   * @param warnings - TypeScript warning messages.
   */
  typescriptResult(errors: string[], warnings: string[] = []): ValidationStepResult {
    return {
      step: "typescript",
      passed: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Constructs a ValidationStepResult for the ESLint step.
   * Results come from the /api/validate route response.
   */
  eslintResult(errors: string[], warnings: string[] = []): ValidationStepResult {
    return {
      step: "eslint",
      passed: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Constructs a ValidationStepResult for the axe-core accessibility step.
   * Results come from the sandboxed iframe via postMessage (AXE_RESULTS message).
   */
  axeResult(violations: string[], incomplete: string[] = []): ValidationStepResult {
    return {
      step: "axe",
      passed: violations.length === 0,
      errors: violations,
      warnings: incomplete,
    };
  }
}
