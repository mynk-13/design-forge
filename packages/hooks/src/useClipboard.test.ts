import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useClipboard } from "./useClipboard";

describe("useClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock the Clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("initialises with copied=false", () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copied).toBe(false);
  });

  it("sets copied=true after a successful copy", async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy("hello world");
    });

    expect(result.current.copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello world");
  });

  it("resets copied to false after the default timeout (2000ms)", async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy("text");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it("resets copied after a custom timeout", async () => {
    const { result } = renderHook(() => useClipboard({ timeout: 500 }));

    await act(async () => {
      await result.current.copy("text");
    });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.copied).toBe(false);
  });

  it("calls onCopy callback with the copied text", async () => {
    const onCopy = vi.fn();
    const { result } = renderHook(() => useClipboard({ onCopy }));

    await act(async () => {
      await result.current.copy("test text");
    });

    expect(onCopy).toHaveBeenCalledWith("test text");
  });

  it("calls onError callback when clipboard write fails", async () => {
    const error = new Error("Clipboard denied");
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(error);
    const onError = vi.fn();
    const { result } = renderHook(() => useClipboard({ onError }));

    await act(async () => {
      await result.current.copy("text");
    });

    expect(onError).toHaveBeenCalledWith(error);
    expect(result.current.copied).toBe(false);
  });

  it("returns true from copy() on success", async () => {
    const { result } = renderHook(() => useClipboard());
    let success = false;

    await act(async () => {
      success = await result.current.copy("text");
    });

    expect(success).toBe(true);
  });

  it("returns false from copy() on failure", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
      new Error("denied"),
    );
    const { result } = renderHook(() => useClipboard());
    let success = true;

    await act(async () => {
      success = await result.current.copy("text");
    });

    expect(success).toBe(false);
  });

  it("manual reset() clears the copied state immediately", async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy("text");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);
  });

  it("restarting copy() before timeout resets the timer", async () => {
    const { result } = renderHook(() => useClipboard({ timeout: 1000 }));

    await act(async () => {
      await result.current.copy("first");
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });

    await act(async () => {
      await result.current.copy("second");
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });

    // Timer restarted — should still be copied
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.copied).toBe(false);
  });
});
