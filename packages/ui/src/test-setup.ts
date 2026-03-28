import "@testing-library/jest-dom";
import { expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";

// Register toHaveNoViolations on Vitest's expect
expect.extend(axeMatchers);

// Polyfill ResizeObserver — used by Radix UI Slider internally (jsdom doesn't implement it)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
