import { useCallback, useEffect, useState } from "react";

/**
 * Reads and writes a value to `localStorage` under the given `key`.
 * SSR-safe: falls back to `initialValue` when `window` is unavailable.
 * Type-safe: serialises/deserialises via JSON.
 *
 * @param key - The `localStorage` key to use.
 * @param initialValue - Default value used when the key is absent or on the server.
 * @returns `[storedValue, setValue, removeValue]` — tuple mirroring `useState`.
 *
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Lazy initialiser — runs once, SSR-safe
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;

    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      // JSON.parse failure or SecurityError (e.g. private browsing restrictions)
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch {
            // Quota exceeded or SecurityError — silent fail, state still updates
          }
        }

        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // SecurityError — silent fail
      }
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Sync state if the key changes (e.g. user switches accounts).
  // readValue is intentionally omitted: including it would cause an infinite
  // loop when initialValue is a non-primitive (new reference each render).
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Sync across tabs via the `storage` event.
  // initialValue intentionally omitted — same object-identity reason as above.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key !== key) return;
      if (event.newValue === null) {
        setStoredValue(initialValue);
      } else {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch {
          // Ignore malformed values from other tabs
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [key]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [storedValue, setValue, removeValue];
}
