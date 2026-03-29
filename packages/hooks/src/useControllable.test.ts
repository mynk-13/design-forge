import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllable } from "./useControllable";

describe("useControllable", () => {
  it("returns defaultValue in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: "hello" }),
    );
    expect(result.current[0]).toBe("hello");
  });

  it("returns undefined when no defaultValue or value is provided", () => {
    const { result } = renderHook(() => useControllable<string>({}));
    expect(result.current[0]).toBeUndefined();
  });

  it("updates internal state in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: "initial" }),
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
  });

  it("returns the controlled value in controlled mode", () => {
    const { result } = renderHook(() =>
      useControllable({ value: "controlled", defaultValue: "ignored" }),
    );
    expect(result.current[0]).toBe("controlled");
  });

  it("does not update internal state in controlled mode", () => {
    const { result } = renderHook(() =>
      useControllable({ value: "controlled" }),
    );

    act(() => {
      result.current[1]("new value");
    });

    // Still returns the controlled value — only the consumer controls it
    expect(result.current[0]).toBe("controlled");
  });

  it("calls onChange in uncontrolled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllable({ defaultValue: "start", onChange }),
    );

    act(() => {
      result.current[1]("end");
    });

    expect(onChange).toHaveBeenCalledWith("end");
  });

  it("calls onChange in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllable({ value: "controlled", onChange }),
    );

    act(() => {
      result.current[1]("new");
    });

    expect(onChange).toHaveBeenCalledWith("new");
  });

  it("works with boolean values", () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: false }),
    );

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it("works with numeric values", () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 0 }),
    );

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
  });

  it("does not call onChange when onChange is not provided", () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: "a" }),
    );

    // Should not throw
    expect(() => {
      act(() => {
        result.current[1]("b");
      });
    }).not.toThrow();
  });

  it("onChange reference updates without re-creating the setter", () => {
    const onChange1 = vi.fn();
    const onChange2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }) => useControllable({ defaultValue: "x", onChange: cb }),
      { initialProps: { cb: onChange1 } },
    );

    rerender({ cb: onChange2 });

    act(() => {
      result.current[1]("y");
    });

    expect(onChange1).not.toHaveBeenCalled();
    expect(onChange2).toHaveBeenCalledWith("y");
  });
});
