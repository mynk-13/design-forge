"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "next-themes";

// In local development this is http://localhost:6006 (local Storybook server).
// In production set NEXT_PUBLIC_STORYBOOK_URL on the hosting platform; if it is
// not set the docs site falls back to the deployed Storybook so live previews
// work without a local server.
const IS_DEV = process.env.NODE_ENV === "development";
const STORYBOOK_BASE = process.env.NEXT_PUBLIC_STORYBOOK_URL?.replace(/\/$/, "")
  ?? (IS_DEV ? "http://localhost:6006" : "https://designforge-storybook.vercel.app");

/** Rewrite localhost URLs to the correct Storybook base for the current env. */
function resolveStorybookSrc(src: string): string {
  return src.replace(/^https?:\/\/localhost:\d+/, STORYBOOK_BASE);
}

/**
 * Append ?theme=<light|dark> and ?globals=theme:<light|dark> to the src so
 * that preview.ts can apply the correct class BEFORE the first React render —
 * eliminating the postMessage timing race that caused white backgrounds on
 * navigation and return.
 *
 * Both params are set: ?theme= is read by the bootstrap block in preview.ts,
 * ?globals= is consumed by Storybook's globalTypes system so the toolbar
 * reflects the current selection when the iframe is opened standalone.
 */
function buildThemedSrc(src: string, theme: string): string {
  try {
    const url = new URL(src);
    url.searchParams.set("theme", theme);
    // Storybook globals format: key:value — the colon is preserved by
    // URLSearchParams.get() when Storybook reads it, so this is safe.
    url.searchParams.set("globals", `theme:${theme}`);
    return url.toString();
  } catch {
    return src;
  }
}

// ── Initial height estimates ──────────────────────────────────────────────────
// Shown immediately while the story loads, preventing a jarring 0→N height
// jump. Once the Storybook iframe posts its real scrollHeight via postMessage,
// the iframe is resized to the exact content height automatically.
const INITIAL_HEIGHTS: Record<string, number> = {
  // Layout
  box: 280, flex: 320, grid: 360, container: 280, stack: 320,
  separator: 180, aspectratio: 520,
  // Form
  label: 200, button: 300, checkbox: 300, switch: 240, slider: 280,
  radiogroup: 340, input: 340, textarea: 360, select: 500,
  // Overlay (open state must fit)
  tooltip: 360, hovercard: 500, popover: 520,
  dialog: 580, alertdialog: 580, dropdownmenu: 560, contextmenu: 560,
  // Data display
  avatar: 260, badge: 220, card: 440, accordion: 520, tabs: 460, datatable: 700,
  // Feedback
  toast: 360, progress: 240, skeleton: 320, alert: 300, banner: 240,
};

const DEFAULT_INITIAL = 400;

/** Extract component name from a Storybook story ID URL param.
 *  "form-button--default"            → "button"
 *  "data-display-datatable--default" → "datatable"
 *  "layout-aspectratio--widescreen"  → "aspectratio"
 */
function getInitialHeight(src: string): number {
  try {
    const url = new URL(src);
    const storyId = url.searchParams.get("id") ?? "";
    const name = (storyId.split("--")[0] ?? "").split("-").pop()?.toLowerCase() ?? "";
    return INITIAL_HEIGHTS[name] ?? DEFAULT_INITIAL;
  } catch {
    return DEFAULT_INITIAL;
  }
}

interface StorybookPreviewProps {
  src: string;
  title?: string;
  // All other MDX iframe props are accepted but intentionally ignored —
  // we control styling and height ourselves.
  [key: string]: unknown;
}

/**
 * Drop-in replacement for raw <iframe> tags inside MDX component docs.
 *
 * Registered as the `iframe` override in the MDX components map so every
 * component doc gets automatic height — no MDX file changes needed.
 *
 * How it works:
 *  1. Renders with a reasonable initial height estimate immediately (no 0-height flash).
 *  2. Theme is encoded in the iframe URL (?theme= & ?globals=) so preview.ts
 *     applies the correct .dark class BEFORE the first story render.
 *  3. postMessage THEME_CHANGE handles real-time toggle (no navigation needed).
 *  4. MutationObserver in preview.ts also re-fires on dialog opens, dropdowns, etc.
 */
export function StorybookPreview({
  src,
  title = "Storybook Preview",
}: StorybookPreviewProps) {
  const resolvedSrc = resolveStorybookSrc(src);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(() => getInitialHeight(resolvedSrc));
  const [errored, setErrored] = useState(false);
  const { resolvedTheme } = useTheme();

  // Build a stable themed src. Including resolvedTheme in deps causes the
  // iframe to reload when the user toggles dark/light — acceptable because
  // the URL-encoded theme means the correct class is on <html> instantly,
  // with no postMessage race. The height estimate is preserved across reloads.
  const themedSrc = useMemo(
    () => buildThemedSrc(resolvedSrc, resolvedTheme ?? "light"),
    [resolvedSrc, resolvedTheme]
  );

  useEffect(() => {
    // Listen for height reports from the Storybook preview iframe
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "STORYBOOK_IFRAME_HEIGHT" &&
        event.source === iframeRef.current?.contentWindow
      ) {
        // +48 px safety buffer so the last pixel of content is never clipped
        setHeight(Math.max(Number(event.data.height) + 48, 200));
      }
    };

    window.addEventListener("message", handleMessage);

    // Ask the iframe for its current height.
    // Called immediately because SSR embeds the iframe src in the initial HTML,
    // so the browser loads the Storybook frame BEFORE React hydrates this page.
    // By the time useEffect runs the frame has already loaded and fired its own
    // load event — which nobody was listening to yet. Posting REQUEST_HEIGHT now
    // reaches a fully-running Storybook preview that responds instantly.
    const requestHeight = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "REQUEST_HEIGHT" },
        "*"
      );
    };

    requestHeight(); // handles already-loaded iframe (the common SSR case)

    // Also covers future reloads (e.g. hot-reload, manual refresh of the frame)
    const iframe = iframeRef.current;
    iframe?.addEventListener("load", requestHeight);

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe?.removeEventListener("load", requestHeight);
    };
  }, []);

  // Real-time theme sync via postMessage — covers the case where the user
  // toggles dark/light mode and the iframe src hasn't changed (same component).
  // When themedSrc changes (navigation or theme toggle), the iframe reloads and
  // the URL-encoded theme handles it; postMessage is a belt-and-suspenders backup.
  useEffect(() => {
    const theme = resolvedTheme ?? "light";
    const sendTheme = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "THEME_CHANGE", theme },
        "*"
      );
    };
    sendTheme();

    const iframe = iframeRef.current;
    iframe?.addEventListener("load", sendTheme);
    return () => {
      iframe?.removeEventListener("load", sendTheme);
    };
  }, [resolvedTheme]);

  if (errored) {
    return (
      <div className="not-prose my-6 flex items-center justify-center rounded-lg border bg-muted text-muted-foreground text-sm" style={{ height: "200px" }}>
        Live preview unavailable
      </div>
    );
  }

  return (
    <div className="not-prose my-6">
      <iframe
        ref={iframeRef}
        src={themedSrc}
        title={title}
        className="w-full rounded-lg border bg-background shadow-sm"
        style={{ height: `${height}px`, display: "block" }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
