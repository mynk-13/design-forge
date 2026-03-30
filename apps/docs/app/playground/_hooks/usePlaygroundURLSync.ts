import { useEffect } from "react";
import LZString from "lz-string";
import { usePlaygroundStore, type ViewportSize, type PlaygroundTheme } from "../_store/usePlaygroundStore";
import { useDebounce } from "@designforge/hooks";

interface UrlState {
  c?: string; // code
  v?: ViewportSize;
  t?: PlaygroundTheme;
}

export function usePlaygroundURLSync() {
  const { code, viewport, theme, setCode, setViewport, setTheme } = usePlaygroundStore();

  // Load from URL on initial mount
  useEffect(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const jsonStr = LZString.decompressFromEncodedURIComponent(hash);
      if (!jsonStr) return;
      
      const parsed = JSON.parse(jsonStr) as UrlState;
      if (typeof parsed.c === "string" && parsed.c.trim().length > 0) setCode(parsed.c);
      if (["mobile", "tablet", "desktop"].includes(parsed.v as string)) setViewport(parsed.v as ViewportSize);
      if (["light", "dark"].includes(parsed.t as string)) setTheme(parsed.t as PlaygroundTheme);
    } catch (err) {
      console.error("Failed to restore playground state from URL", err);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounce the state we care saving so we don't spam the history / URL
  const stateToSave = { c: code, v: viewport, t: theme };
  const debouncedState = useDebounce(stateToSave, 5000); // 5s debounce

  // Save to URL
  useEffect(() => {
    // Skip empty states during initial render mounting delays
    if (!debouncedState.c) return;

    try {
      const jsonStr = JSON.stringify(debouncedState);
      const encoded = LZString.compressToEncodedURIComponent(jsonStr);
      window.history.replaceState(null, "", `#${encoded}`);
    } catch (err) {
      console.warn("Failed to serialize playground state to URL", err);
    }
  }, [debouncedState]);
}
