import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

// Factory that returns a mock MediaQueryList for a given query string
function createMockMediaQueryList(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];

  return {
    matches,
    media: "",
    onchange: null,
    addEventListener: vi.fn((_type: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: vi.fn((_type: string, cb: (e: MediaQueryListEvent) => void) => {
      const index = listeners.indexOf(cb);
      if (index > -1) listeners.splice(index, 1);
    }),
    dispatchEvent: vi.fn(),
    // Helper to simulate a media query change
    _trigger(newMatches: boolean) {
      this.matches = newMatches;
      listeners.forEach((cb) =>
        cb({ matches: newMatches } as MediaQueryListEvent),
      );
    },
  };
}

describe("useMediaQuery", () => {
  let mockMQL: ReturnType<typeof createMockMediaQueryList>;

  beforeEach(() => {
    mockMQL = createMockMediaQueryList(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when query does not match", () => {
    mockMQL = createMockMediaQueryList(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("returns true when query matches", () => {
    mockMQL = createMockMediaQueryList(true);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("updates when media query match changes", () => {
    mockMQL = createMockMediaQueryList(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => {
      mockMQL._trigger(true);
    });

    expect(result.current).toBe(true);
  });

  it("removes event listener on unmount", () => {
    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    unmount();
    expect(mockMQL.removeEventListener).toHaveBeenCalledOnce();
  });

  it("calls addEventListener after mount", () => {
    renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(mockMQL.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("re-subscribes when query string changes", () => {
    const { rerender } = renderHook(({ q }) => useMediaQuery(q), {
      initialProps: { q: "(max-width: 768px)" },
    });

    rerender({ q: "(prefers-color-scheme: dark)" });

    // Should have called addEventListener at least twice (initial + rerender)
    expect(mockMQL.addEventListener.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("works for prefers-reduced-motion query", () => {
    mockMQL = createMockMediaQueryList(true);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-reduced-motion: reduce)"),
    );
    expect(result.current).toBe(true);
  });

  it("works for prefers-color-scheme: dark", () => {
    mockMQL = createMockMediaQueryList(true);
    vi.spyOn(window, "matchMedia").mockReturnValue(
      mockMQL as unknown as MediaQueryList,
    );
    const { result } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)"),
    );
    expect(result.current).toBe(true);
  });
});
