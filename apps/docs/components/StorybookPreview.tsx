"use client";

import { useEffect, useRef, useState } from "react";

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
    const name = storyId.split("--")[0].split("-").pop()?.toLowerCase() ?? "";
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
 *  2. When the Storybook iframe loads, sends it a REQUEST_HEIGHT message.
 *  3. Storybook's preview.ts responds with the real document.scrollHeight.
 *  4. This component resizes the iframe to fit the story content exactly.
 *  5. MutationObserver in preview.ts also re-fires on dialog opens, dropdowns, etc.
 */
export function StorybookPreview({
  src,
  title = "Storybook Preview",
}: StorybookPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(() => getInitialHeight(src));

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

  return (
    <div className="not-prose my-6">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full rounded-lg border bg-background shadow-sm"
        style={{ height: `${height}px`, display: "block" }}
      />
    </div>
  );
}
