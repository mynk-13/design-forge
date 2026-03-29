import { useEffect, useState } from "react";

/**
 * Returns whether a CSS media query currently matches.
 * SSR-safe: returns `false` during server-side rendering (no `window`).
 *
 * @param query - A valid CSS media query string.
 * @returns `true` if the query matches, `false` otherwise.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  // SSR guard — `window` is not available in Node / Edge runtimes
  const getMatches = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers support addEventListener on MediaQueryList
    mediaQueryList.addEventListener("change", handleChange);

    // Sync in case the query changed between render and effect
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
