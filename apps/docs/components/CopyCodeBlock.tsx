"use client";

import { useState, useRef } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CopyCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

/**
 * Wraps rehype-pretty-code <pre> blocks with a floating copy button.
 * Registered as the `pre` override in the MDX components map.
 *
 * The copy button appears on hover (desktop) and is always visible on touch.
 * It extracts the plain text from the <code> element inside the <pre>.
 */
export function CopyCodeBlock({ children, className, ...props }: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const code = preRef.current?.querySelector("code");
    const text = code?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="relative group not-prose my-6" data-copy-code-block>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        type="button"
        aria-label={copied ? "Copied!" : "Copy code"}
        onClick={handleCopy}
        className="
          absolute top-3 right-3
          rounded-md border bg-background p-1.5
          text-muted-foreground
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
          hover:bg-muted hover:text-foreground
          focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5 text-success" />
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
