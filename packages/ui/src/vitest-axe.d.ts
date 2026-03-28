/**
 * Type augmentation for vitest-axe — adds toHaveNoViolations to Vitest's expect.
 * vitest-axe@0.1.0 does not automatically augment Vitest types,
 * so we declare the matcher here.
 */

import type { AxeResults } from "axe-core";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<R = any> {
    toHaveNoViolations(): R;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): AxeResults;
  }
}
