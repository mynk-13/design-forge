import { useCallback, useRef, useState } from "react";

/**
 * Manages state that can operate in both controlled and uncontrolled modes —
 * the same pattern used internally by all DesignForge form components.
 *
 * - **Uncontrolled**: pass only `defaultValue`. The hook owns the state.
 * - **Controlled**: pass `value` (and optionally `onChange`). The consumer owns
 *   the state; the hook forwards changes via `onChange`.
 *
 * This mirrors the mental model of native HTML form elements (e.g. `<input>`
 * accepts either `value + onChange` or `defaultValue`).
 *
 * @param params.value - Controlled value (consumer-owned).
 * @param params.defaultValue - Initial uncontrolled value.
 * @param params.onChange - Change callback invoked in both modes.
 * @returns `[resolvedValue, setResolvedValue]` — controlled-value-aware state tuple.
 *
 * @example
 * // Inside a form component:
 * const [checked, setChecked] = useControllable({
 *   value: props.checked,
 *   defaultValue: props.defaultChecked ?? false,
 *   onChange: props.onCheckedChange,
 * });
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined;

  // Uncontrolled internal state — only read/written when !isControlled
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);

  // Keep a stable ref to `onChange` so the setter doesn't re-create on every render
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      // Always call onChange so the consumer can react regardless of control mode
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  const resolvedValue = isControlled ? value : uncontrolledValue;

  return [resolvedValue, setValue];
}
