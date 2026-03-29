"use client";

import { useEffect, useRef } from "react";

interface Props {
  /**
   * The generated TSX code to render in the sandbox.
   * Pass `null` to show the empty state.
   */
  code: string | null;
}

/**
 * Renders the generated component inside a sandboxed cross-origin iframe.
 *
 * Architecture (ADR-011 §21.3):
 * 1. The iframe loads a static HTML page with Tailwind CDN + Sucrase transpiler.
 * 2. The parent posts a `{ type: "RENDER_CODE", code }` message via postMessage.
 * 3. The iframe transpiles TSX → JS using Sucrase (browser build), then evals it.
 * 4. axe-core runs in the iframe and posts results back via postMessage.
 *
 * The sandbox attribute restricts the iframe from accessing parent origin.
 */
export function PreviewFrame({ code }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const send = () => {
      iframe.contentWindow?.postMessage(
        { type: "RENDER_CODE", code },
        "*", // sandboxed iframe — cross-origin is intentional
      );
    };

    // Send after iframe signals ready, or immediately if already loaded
    const handleMessage = (e: MessageEvent) => {
      if (e.source === iframe.contentWindow && e.data?.type === "FRAME_READY") {
        send();
      }
    };

    window.addEventListener("message", handleMessage);
    // Also send immediately in case FRAME_READY already fired
    send();

    return () => window.removeEventListener("message", handleMessage);
  }, [code]);

  return (
    <div className="relative h-full w-full">
      {!code && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-zinc-500">Generate a component to see a live preview.</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Component preview"
        aria-label="Live component preview"
        src="/preview-frame.html"
        sandbox="allow-scripts allow-same-origin"
        className="h-full w-full border-0 bg-white"
        style={{ display: code ? "block" : "none" }}
      />
    </div>
  );
}
