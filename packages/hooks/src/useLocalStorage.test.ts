import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Start with a clean localStorage for every test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns the initialValue when key is not in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("light");
  });

  it("returns the stored value when key already exists", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("dark");
  });

  it("writes to localStorage on setValue", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(JSON.parse(localStorage.getItem("count") ?? "null")).toBe(5);
  });

  it("supports functional updater (prev => next)", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("removeValue resets state to initialValue and removes key", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("custom");
    });
    expect(result.current[0]).toBe("custom");

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("key")).toBeNull();
  });

  it("works with object values", () => {
    const { result } = renderHook(() =>
      useLocalStorage("user", { name: "Alice", age: 30 }),
    );

    act(() => {
      result.current[1]({ name: "Bob", age: 25 });
    });

    expect(result.current[0]).toEqual({ name: "Bob", age: 25 });
  });

  it("works with boolean values", () => {
    const { result } = renderHook(() => useLocalStorage("open", false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it("works with array values", () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("tags", []));

    act(() => {
      result.current[1](["react", "typescript"]);
    });

    expect(result.current[0]).toEqual(["react", "typescript"]);
  });

  it("handles JSON.parse errors gracefully (returns initialValue)", () => {
    localStorage.setItem("bad", "not-json{{{{");
    const { result } = renderHook(() => useLocalStorage("bad", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("syncs state across tabs via the storage event", () => {
    const { result } = renderHook(() => useLocalStorage("shared", "initial"));

    act(() => {
      // Simulate another tab writing to localStorage
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "shared",
          newValue: JSON.stringify("from-other-tab"),
          oldValue: JSON.stringify("initial"),
          storageArea: localStorage,
        }),
      );
    });

    expect(result.current[0]).toBe("from-other-tab");
  });

  it("ignores storage events for different keys", () => {
    const { result } = renderHook(() => useLocalStorage("mykey", "original"));

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "otherkey",
          newValue: JSON.stringify("irrelevant"),
          storageArea: localStorage,
        }),
      );
    });

    expect(result.current[0]).toBe("original");
  });

  it("resets to initialValue when storage event sends newValue=null (key removed)", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("saved");
    });

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "key",
          newValue: null,
          storageArea: localStorage,
        }),
      );
    });

    expect(result.current[0]).toBe("default");
  });
});
