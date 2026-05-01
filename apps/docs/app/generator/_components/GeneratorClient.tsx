"use client";

import { useClipboard } from "@designforge/hooks";
import {
  ClipboardCheckIcon,
  CopyIcon,
  DownloadIcon,
  Loader2Icon,
  SparklesIcon,
  XCircleIcon,
  XIcon,
} from "@designforge/icons";
import type { BeforeMount } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ValidationBadge } from "./ValidationBadge";
import { PreviewFrame } from "./PreviewFrame";

// Monaco is ~2 MB — lazy-load so it doesn't block the initial paint
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
      <Loader2Icon size={20} className="animate-spin text-zinc-500" />
    </div>
  ),
});

const MAX_PROMPT = 1000;

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function GeneratorClient() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("// Your component will appear here...");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { copied, copy } = useClipboard({ timeout: 2000 });

  // Stream a generation request using fetch + ReadableStream
  const handleSubmit = useCallback(async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) return;

    setPrompt("");
    setError(null);
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantId = crypto.randomUUID();

    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);

    abortRef.current = new AbortController();

    try {
      // Keep max 10 pairs (20 messages) in history — FIFO
      const history = [...messages, userMsg].slice(-20).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, messages: history.slice(0, -1) }),
        signal: abortRef.current.signal,
      });

      // Capture rate-limit headers
      const remaining = res.headers.get("x-ratelimit-remaining");
      if (remaining !== null) setRateLimitRemaining(Number(remaining));

      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        throw new Error(data.message ?? `Request failed (${res.status})`);
      }

      if (!res.body) throw new Error("No response body");

      // Consume the text stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Update assistant message content live
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m,
          ),
        );
      }

      // Extract code block from the completed response
      const match = accumulated.match(/```(?:tsx?|typescript)\r?\n([\s\S]*?)```/i);
      if (match?.[1]) setCode(match[1].trim());

    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // User cancelled — remove the empty assistant bubble
        setMessages((prev) => prev.filter((m) => m.id !== assistantId || m.content));
        return;
      }
      const msg = err instanceof Error ? err.message : "Generation failed.";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [prompt, isLoading, messages]);

  // Ctrl+Enter / Cmd+Enter to submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void handleSubmit();
      }
    },
    [handleSubmit],
  );

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [prompt]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // Reset conversation
  const handleReset = useCallback(() => {
    if (!window.confirm("Clear the entire conversation and start fresh?")) return;
    abortRef.current?.abort();
    setMessages([]);
    setCode("// Your component will appear here...");
    setPrompt("");
    setError(null);
  }, []);

  // Download generated component
  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GeneratedComponent.tsx";
    a.click();
    URL.revokeObjectURL(url);
  }, [code]);

  const hasCode = code !== "// Your component will appear here...";
  const charCount = prompt.length;
  const charPercent = (charCount / MAX_PROMPT) * 100;

  // ── Monaco: register @designforge/* type stubs before editor mounts ─────────
  const handleEditorBeforeMount: BeforeMount = (monaco) => {
    // Suppress TS2307 "Cannot find module" — workspace packages not on npmRegistry
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [
        2307, // Cannot find module 'X'
        2305, // Module 'X' has no exported member 'Y'
      ],
    });

    // Compiler options — match project tsconfig
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowJs: true,
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
    });

    // Type stubs so intellisense works for @designforge/* imports
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      DESIGNFORGE_TYPE_STUBS,
      "file:///node_modules/@designforge/types/index.d.ts",
    );
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
        <div className="flex items-center gap-2.5">
          <SparklesIcon size={18} className="text-violet-400" />
          <span className="font-semibold tracking-tight text-white">AI Component Generator</span>
          <span className="rounded-full bg-violet-900/50 px-2 py-0.5 text-xs text-violet-300">
            Beta
          </span>
        </div>

        <div className="flex items-center gap-3">
          {rateLimitRemaining !== null && (
            <span className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-300">{rateLimitRemaining}</span>
              /20 remaining
            </span>
          )}
          <button
            onClick={handleReset}
            disabled={messages.length === 0}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40"
            aria-label="Reset conversation"
          >
            <XIcon size={12} />
            Reset
          </button>
        </div>
      </header>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Chat sidebar */}
        <aside className="flex w-80 shrink-0 flex-col border-r border-zinc-800">
          <div className="flex flex-1 flex-col-reverse gap-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="rounded-xl bg-violet-900/30 p-3">
                  <SparklesIcon size={24} className="text-violet-400" />
                </div>
                <p className="text-sm font-medium text-zinc-300">Describe your component</p>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Be specific about layout, interactions, and data. The AI will follow
                  DesignForge&apos;s conventions automatically.
                </p>
                <div className="mt-2 flex flex-col gap-1.5 text-left">
                  {EXAMPLE_PROMPTS.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setPrompt(ex)}
                      className="rounded-lg border border-zinc-800 px-3 py-2 text-left text-xs text-zinc-400 transition hover:border-violet-700 hover:bg-violet-950/30 hover:text-zinc-200"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {[...messages].reverse().map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {m.role === "assistant"
                    ? m.content
                      ? "Component generated ✓"
                      : <span className="flex items-center gap-1"><Loader2Icon size={10} className="animate-spin" /> Generating…</span>
                    : m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt input */}
          <div className="border-t border-zinc-800 p-4">
            {error && (
              <div className="mb-3 flex items-start gap-2 rounded-lg bg-red-950/50 px-3 py-2 text-xs text-red-400">
                <XCircleIcon size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="relative">
              <textarea
                ref={textareaRef}
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT))}
                onKeyDown={handleKeyDown}
                placeholder="A user profile card with avatar, name, role badge, and a Follow button..."
                rows={3}
                aria-label="Component description"
                aria-describedby="prompt-hint"
                disabled={isLoading}
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-xs leading-relaxed text-zinc-100 placeholder-zinc-600 transition focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/30 disabled:opacity-50"
                style={{ maxHeight: "140px", overflowY: "auto" }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span id="prompt-hint" className="text-xs text-zinc-600">
                <span
                  className={
                    charPercent > 90
                      ? "text-red-400"
                      : charPercent > 70
                        ? "text-amber-400"
                        : ""
                  }
                >
                  {charCount}
                </span>
                /{MAX_PROMPT}
              </span>

              <button
                id="generate-btn"
                onClick={() => void handleSubmit()}
                disabled={isLoading || !prompt.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={isLoading ? "Generating component…" : "Generate component"}
              >
                {isLoading ? (
                  <Loader2Icon size={12} className="animate-spin" />
                ) : (
                  <SparklesIcon size={12} />
                )}
                {isLoading ? "Generating…" : "Generate"}
                <span className="ml-1 hidden text-violet-300 sm:inline">⌘↵</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Editor + Preview panel */}
        <main className="flex min-w-0 flex-1 flex-col" id="editor-area">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-4">
            <div className="flex" role="tablist" aria-label="Editor tabs">
              {(["editor", "preview"] as const).map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-4 py-3 text-xs font-medium capitalize transition ${
                    activeTab === tab
                      ? "border-violet-500 text-violet-400"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1.5">
              <ValidationBadge code={hasCode ? code : null} />

              <button
                onClick={() => void copy(code)}
                disabled={!hasCode}
                className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <ClipboardCheckIcon size={13} className="text-green-400" />
                ) : (
                  <CopyIcon size={13} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={handleDownload}
                disabled={!hasCode}
                className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40"
                aria-label="Download component as .tsx file"
              >
                <DownloadIcon size={13} />
                .tsx
              </button>
            </div>
          </div>

          {/* Editor panel */}
          <div
            id="panel-editor"
            role="tabpanel"
            aria-labelledby="tab-editor"
            hidden={activeTab !== "editor"}
            className="min-h-0 flex-1"
          >
            <MonacoEditor
              height="100%"
              language="typescript"
              theme="vs-dark"
              path="file:///GeneratedComponent.tsx"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              beforeMount={handleEditorBeforeMount}
              options={{
                fontSize: 13,
                lineHeight: 22,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                folding: false,
                renderLineHighlight: "none",
                tabSize: 2,
              }}
            />
          </div>

          {/* Preview panel */}
          <div
            id="panel-preview"
            role="tabpanel"
            aria-labelledby="tab-preview"
            hidden={activeTab !== "preview"}
            className="min-h-0 flex-1"
          >
            <PreviewFrame code={hasCode ? code : null} />
          </div>
        </main>
      </div>
    </div>
  );
}

const EXAMPLE_PROMPTS = [
  "A search bar with debounced input, loading spinner, and clear button",
  "A pricing card with tier name, price, feature list, and CTA button",
  "A notification bell with unread count badge and dropdown list",
];

// ── @designforge/* type stubs injected into Monaco's TypeScript service ───────
// These make the editor treat all @designforge imports as valid with proper
// component types, eliminating TS2307 "Cannot find module" squiggles.
const DESIGNFORGE_TYPE_STUBS = `
declare module "react" {
  export = React;
  export as namespace React;
  namespace React {
    type FC<P = {}> = (props: P & { children?: ReactNode }) => ReactElement | null;
    type ComponentType<P = {}> = FC<P>;
    type ReactNode = ReactElement | string | number | boolean | null | undefined;
    interface ReactElement { type: any; props: any; key: any; }
    function useState<T>(init: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void];
    function useEffect(fn: () => void | (() => void), deps?: any[]): void;
    function useRef<T>(init: T): { current: T };
    function useCallback<T extends Function>(fn: T, deps: any[]): T;
    function useMemo<T>(fn: () => T, deps: any[]): T;
    function useReducer<S, A>(r: (s: S, a: A) => S, init: S): [S, (a: A) => void];
    function useContext<T>(ctx: Context<T>): T;
    interface Context<T> { Provider: ComponentType<{ value: T; children?: ReactNode }>; }
    function createContext<T>(defaultValue: T): Context<T>;
    type HTMLAttributes<T> = Record<string, any>;
    type ButtonHTMLAttributes<T> = Record<string, any>;
    type InputHTMLAttributes<T> = Record<string, any>;
    type TextareaHTMLAttributes<T> = Record<string, any>;
    type SelectHTMLAttributes<T> = Record<string, any>;
    type SVGAttributes<T> = Record<string, any>;
    type Ref<T> = { current: T | null } | ((instance: T | null) => void) | null;
    type CSSProperties = Record<string, string | number>;
  }
}

declare module "@designforge/ui" {
  import type * as React from "react";
  type C = React.FC<any>;
  export const Button: C; export const Input: C; export const Textarea: C;
  export const Label: C; export const Select: C; export const SelectTrigger: C;
  export const SelectContent: C; export const SelectItem: C; export const SelectValue: C;
  export const SelectGroup: C; export const Checkbox: C; export const RadioGroup: C;
  export const RadioGroupItem: C; export const Switch: C; export const Slider: C;
  export const Card: C; export const CardHeader: C; export const CardTitle: C;
  export const CardDescription: C; export const CardContent: C; export const CardFooter: C;
  export const Badge: C; export const Avatar: C; export const AvatarImage: C;
  export const AvatarFallback: C; export const Skeleton: C; export const Progress: C;
  export const Separator: C; export const AspectRatio: C;
  export const Box: C; export const Flex: C; export const Grid: C;
  export const Stack: C; export const Container: C;
  export const Dialog: C; export const DialogTrigger: C; export const DialogContent: C;
  export const DialogHeader: C; export const DialogTitle: C; export const DialogDescription: C;
  export const DialogFooter: C; export const DialogClose: C;
  export const AlertDialog: C; export const AlertDialogTrigger: C; export const AlertDialogContent: C;
  export const AlertDialogHeader: C; export const AlertDialogTitle: C;
  export const AlertDialogDescription: C; export const AlertDialogFooter: C;
  export const AlertDialogAction: C; export const AlertDialogCancel: C;
  export const Popover: C; export const PopoverTrigger: C; export const PopoverContent: C;
  export const Tooltip: C; export const TooltipTrigger: C; export const TooltipContent: C;
  export const TooltipProvider: C;
  export const DropdownMenu: C; export const DropdownMenuTrigger: C;
  export const DropdownMenuContent: C; export const DropdownMenuItem: C;
  export const DropdownMenuSeparator: C; export const DropdownMenuLabel: C;
  export const ContextMenu: C; export const HoverCard: C;
  export const Tabs: C; export const TabsList: C; export const TabsTrigger: C; export const TabsContent: C;
  export const Accordion: C; export const AccordionItem: C;
  export const AccordionTrigger: C; export const AccordionContent: C;
  export const Alert: C; export const AlertTitle: C; export const AlertDescription: C;
  export const Banner: C; export const Toast: C; export const ToastProvider: C;
  export const DataTable: C;
  export function cn(...args: any[]): string;
  export function useToast(): { toast: (opts: any) => void };
}

declare module "@designforge/hooks" {
  export function useDebounce<T>(value: T, delay?: number): T;
  export function useMediaQuery(query: string): boolean;
  export function useClipboard(options?: { timeout?: number }): {
    copied: boolean;
    copy: (text: string) => Promise<void>;
    reset: () => void;
  };
  export function useLocalStorage<T>(
    key: string,
    initialValue: T
  ): [T, (value: T | ((prev: T) => T)) => void, () => void];
  export function useControllable<T>(options: {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
  }): [T, (value: T) => void];
}

declare module "@designforge/icons" {
  import type * as React from "react";
  export interface IconProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
    strokeWidth?: number;
    color?: string;
    className?: string;
  }
  type I = React.FC<IconProps>;
  export const CheckIcon: I; export const XIcon: I; export const ChevronDownIcon: I;
  export const ChevronUpIcon: I; export const ChevronRightIcon: I; export const ChevronLeftIcon: I;
  export const SearchIcon: I; export const PlusIcon: I; export const MinusIcon: I;
  export const MenuIcon: I; export const XCircleIcon: I; export const AlertCircleIcon: I;
  export const InfoIcon: I; export const CheckCircle2Icon: I; export const Loader2Icon: I;
  export const SparklesIcon: I; export const StarIcon: I; export const HeartIcon: I;
  export const BookmarkIcon: I; export const ShareIcon: I; export const ExternalLinkIcon: I;
  export const ArrowRightIcon: I; export const ArrowLeftIcon: I;
  export const ArrowUpIcon: I; export const ArrowDownIcon: I;
  export const HomeIcon: I; export const UserIcon: I; export const SettingsIcon: I;
  export const BellIcon: I; export const CopyIcon: I; export const ClipboardCheckIcon: I;
  export const TrashIcon: I; export const PencilIcon: I; export const EditIcon: I;
  export const DownloadIcon: I; export const UploadIcon: I; export const FilterIcon: I;
  export const SortAscIcon: I; export const SortDescIcon: I;
  export const GridIcon: I; export const ListIcon: I; export const LayoutIcon: I;
  export const SidebarIcon: I; export const SunIcon: I; export const MoonIcon: I;
  export const MailIcon: I; export const MessageSquareIcon: I;
  export const PhoneIcon: I; export const GlobeIcon: I;
  export const LockIcon: I; export const UnlockIcon: I;
  export const EyeIcon: I; export const EyeOffIcon: I;
}
`;
