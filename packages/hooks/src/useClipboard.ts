import { useCallback, useRef, useState } from "react";

export interface UseClipboardOptions {
  /** How long (ms) the `copied` state stays `true` before resetting. Default: 2000. */
  timeout?: number;
  /** Called when text is successfully copied to the clipboard. */
  onCopy?: (text: string) => void;
  /** Called when copying fails (e.g. clipboard API denied). */
  onError?: (error: Error) => void;
}

export interface UseClipboardReturn {
  /** Whether text was recently copied (resets after `timeout`). */
  copied: boolean;
  /** Copy the given text to the clipboard. Returns `true` on success. */
  copy: (text: string) => Promise<boolean>;
  /** Manually reset the `copied` state to `false`. */
  reset: () => void;
}

/**
 * Provides clipboard copy functionality with transient success state.
 *
 * Uses the Clipboard API (`navigator.clipboard.writeText`) with a graceful
 * fallback to `document.execCommand("copy")` for older browsers.
 *
 * @param options - Optional configuration for timeout and lifecycle callbacks.
 * @returns `{ copied, copy, reset }`
 *
 * @example
 * const { copied, copy } = useClipboard({ timeout: 1500 });
 * <button onClick={() => copy("Hello!")}>{copied ? "Copied!" : "Copy"}</button>
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000, onCopy, onError } = options;

  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setCopied(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Clear any pending reset timer so we can start a new one
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Legacy fallback (non-secure context or old browser)
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const success = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (!success) throw new Error("execCommand copy failed");
        }

        setCopied(true);
        onCopy?.(text);

        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, timeout);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        onError?.(error);
        return false;
      }
    },
    [timeout, onCopy, onError],
  );

  return { copied, copy, reset };
}
