import "@testing-library/jest-dom";
import { expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";

// Register toHaveNoViolations on Vitest's expect
expect.extend(axeMatchers);
