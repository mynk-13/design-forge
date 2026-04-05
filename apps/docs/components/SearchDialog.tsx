"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  href: string;
}

/** Compact version renders an inline trigger button suited for the sidebar. */
export function SearchButton({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (compact) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          aria-label="Search documentation"
          className="flex w-full items-center gap-2 rounded-lg border border-[#E2E8F0] dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] px-3 py-2 text-sm text-[#8D8D8D] dark:text-[#6B6B6B] hover:border-[#C0C0C0] dark:hover:border-[#3E3E3E] transition-colors shadow-sm"
        >
          <SearchIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="hidden sm:flex items-center rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1.5 py-0.5 font-mono text-[10px] text-[#8D8D8D] dark:text-[#6B6B6B]">
            /
          </kbd>
        </button>
        {open && <SearchDialog onClose={() => setOpen(false)} />}
      </>
    );
  }

  // Original header search button (still used in mobile header if needed)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] px-3 py-1.5 text-sm text-[#8D8D8D] dark:text-[#6B6B6B] hover:border-[#C0C0C0] dark:hover:border-[#3E3E3E] transition-colors"
      >
        <SearchIcon className="h-3.5 w-3.5" />
        <span>Search docs...</span>
        <kbd className="hidden sm:flex items-center rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1.5 py-0.5 font-mono text-[10px]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then(setEntries)
      .catch(() => {});
  }, []);

  const results = query.trim()
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.description.toLowerCase().includes(query.toLowerCase())
      )
    : entries.slice(0, 8);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && results[selected]) {
        navigate(results[selected].href);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [results, selected, navigate, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm w-full cursor-default"
        onClick={onClose}
        aria-label="Close search"
        tabIndex={-1}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl border border-[#E2E8F0] dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] dark:border-[#2E2E2E] px-4 py-3">
          <SearchIcon className="h-4 w-4 shrink-0 text-[#8D8D8D]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#8D8D8D] text-[#11181C] dark:text-[#EDEDED]"
            aria-label="Search query"
          />
          <kbd
            className="hidden sm:flex items-center gap-1 rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1.5 py-0.5 font-mono text-[10px] text-[#8D8D8D]"
            aria-label="Press Escape to close"
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
          {results.length === 0 ? (
            <li className="py-6 text-center text-sm text-[#8D8D8D]">
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            results.map((entry, i) => (
              <li key={entry.slug} role="option" aria-selected={i === selected}>
                <button
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    i === selected
                      ? "bg-[#F0F7FF] dark:bg-[#0D2236] text-[#006ADC] dark:text-[#52A9FF]"
                      : "text-[#11181C] dark:text-[#EDEDED] hover:bg-[#F9FAFB] dark:hover:bg-[#252525]"
                  }`}
                  onClick={() => navigate(entry.href)}
                  onMouseEnter={() => setSelected(i)}
                >
                  <div className="font-medium">{entry.title}</div>
                  {entry.description && (
                    <div className="mt-0.5 text-xs text-[#60646C] dark:text-[#8D8D8D] line-clamp-1">
                      {entry.description}
                    </div>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-[#E2E8F0] dark:border-[#2E2E2E] px-4 py-2 text-xs text-[#8D8D8D]">
          <span className="flex items-center gap-1"><kbd className="rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1">↵</kbd> select</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-[#E2E8F0] dark:border-[#2E2E2E] bg-[#F9FAFB] dark:bg-[#252525] px-1">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
