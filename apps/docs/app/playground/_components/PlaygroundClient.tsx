"use client";

import { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { LayoutPanelLeftIcon, MoonIcon, PlaySquareIcon, ShareIcon, SunIcon, TerminalSquareIcon, TrashIcon } from "lucide-react";
import { usePlaygroundStore } from "../_store/usePlaygroundStore";
import { usePlaygroundURLSync } from "../_hooks/usePlaygroundURLSync";
import { useClipboard, useDebounce } from "@designforge/hooks";
import { Button } from "@designforge/ui";

const VIEWPORTS = {
  mobile: { width: "375px", height: "667px" },
  tablet: { width: "768px", height: "1024px" },
  desktop: { width: "100%", height: "100%" }
};

export function PlaygroundClient() {
  usePlaygroundURLSync();

  const store = usePlaygroundStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const monaco = useMonaco();
  const clipboard = useClipboard();
  const [isAxeRunning, setAxeRunning] = useState(false);

  // Debounce the code input to only trigger iframe updates after typing pauses
  const debouncedCode = useDebounce(store.code, 300);

  // Sync theme to document.documentElement and the iframe
  useEffect(() => {
    document.documentElement.classList.toggle("dark", store.theme === "dark");
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "THEME_UPDATE", theme: store.theme }, "*");
    }
  }, [store.theme]);

  // 1. Initialise Monaco ExtraLibs mapping for @designforge/ui Autocomplete
  useEffect(() => {
    if (!monaco) return;
    const ts = monaco.languages.typescript as any;

    fetch("/api/types").then(res => res.text()).then(types => {
      ts.typescriptDefaults.addExtraLib(
        `declare module "@designforge/ui" { ${types} }`,
        "file:///node_modules/@types/designforge-ui/index.d.ts"
      );
    }).catch(err => console.error("Failed to load types for monaco", err));

    // Also declare React to prevent TS2304 errors
    ts.typescriptDefaults.addExtraLib(
      `declare module "react" { export = React; export as namespace React; }
      declare namespace React {
        function useState<T>(init: T): [T, (val: T) => void];
        function useEffect(cb: () => void | (() => void), deps?: unknown[]): void;
        function useRef<T>(init: T): { current: T };
        const StrictMode: unknown;
      }`,
      "file:///node_modules/@types/react/index.d.ts"
    );

    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      module: ts.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
    });
  }, [monaco]);

  // 2. Post the debounced code payload to the sandboxed iframe for rendering
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "RENDER_CODE", code: debouncedCode }, "*");
    }
  }, [debouncedCode]);

  // 3. Listen to the iframe's patch logs and a11y axe-core returns
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === "FRAME_READY") {
        (e.source as Window)?.postMessage({ type: "THEME_UPDATE", theme: store.theme }, "*");
        (e.source as Window)?.postMessage({ type: "RENDER_CODE", code: store.code }, "*");
      } else if (e.data?.type === "CONSOLE") {
        store.addConsoleEntry({ type: e.data.level, args: e.data.args });
      } else if (e.data?.type === "AXE_RESULTS") {
        setAxeRunning(false);
        const { violations } = e.data.results;
        store.addConsoleEntry({ type: "info", args: [`Axe complete: ${violations?.length || 0} violations`] });
        if (violations?.length) {
          violations.forEach((v: { help: string; id: string }) => store.addConsoleEntry({ type: "warn", args: [`Axe: ${v.help} (${v.id})`] }));
        } else {
           store.addConsoleEntry({ type: "info", args: ["✅ Axe: 0 violations, perfect accessibility!"] });
        }
      }
    };
    window.addEventListener("message", handleMsg);
    return () => window.removeEventListener("message", handleMsg);
  }, [store]);

  const runAxeCheck = () => {
    if (iframeRef.current?.contentWindow) {
      setAxeRunning(true);
      store.addConsoleEntry({ type: "info", args: ["Running axe-core accessibility audit..."] });
      iframeRef.current.contentWindow.postMessage({ type: "RUN_AXE" }, "*");
    }
  };

  const viewportStyles = VIEWPORTS[store.viewport];

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Dynamic Toolbar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <LayoutPanelLeftIcon className="h-5 w-5 text-primary" />
          <h1 className="text-sm font-semibold tracking-tight">Playground</h1>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-md bg-muted p-1">
          <Button variant={store.viewport === "mobile" ? "default" : "ghost"} size="sm" className="h-7 cursor-pointer" onClick={() => store.setViewport("mobile")}>Mobile</Button>
          <Button variant={store.viewport === "tablet" ? "default" : "ghost"} size="sm" className="h-7 cursor-pointer" onClick={() => store.setViewport("tablet")}>Tablet</Button>
          <Button variant={store.viewport === "desktop" ? "default" : "ghost"} size="sm" className="h-7 cursor-pointer" onClick={() => store.setViewport("desktop")}>Full</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 cursor-pointer" onClick={runAxeCheck} disabled={isAxeRunning}>
            <PlaySquareIcon className="h-4 w-4" /> a11y Audit
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-2 cursor-pointer" onClick={(e) => {
               (e.currentTarget as HTMLButtonElement).innerText = "Copied!";
               clipboard.copy(window.location.href);
               setTimeout(() => (e.currentTarget as HTMLButtonElement).innerText = "Share URL", 2000);
            }}>
            <ShareIcon className="h-4 w-4" /> Share URL
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" aria-label={store.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={() => store.setTheme(store.theme === "dark" ? "light" : "dark")}>
            {store.theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Split Layout */}
      <PanelGroup orientation="horizontal" className="flex-1">
        {/* Editor Pane */}
        <Panel defaultSize={45} minSize={20} className="relative flex flex-col">
          <Editor
            theme={store.theme === "dark" ? "vs-dark" : "light"}
            language="typescript"
            value={store.code}
            onChange={(val) => store.setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              formatOnPaste: true
            }}
          />
        </Panel>

        <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors cursor-col-resize" />

        {/* Preview Frame & Console */}
        <Panel defaultSize={55} minSize={20} className="relative flex flex-col bg-muted/30 p-4">
          <div className="flex-1 overflow-auto rounded-lg border bg-background shadow-sm flex items-center justify-center relative">
            <iframe
              ref={iframeRef}
              src="/playground-frame.html"
              title="Playground Preview"
              sandbox="allow-scripts allow-same-origin"
              style={{ ...viewportStyles, transition: "width 0.2s, height 0.2s" }}
              className="border-none shadow-[0_0_12px_rgba(0,0,0,0.1)] rounded-md bg-transparent"
            />
          </div>

          {/* Collapsible Developer Console */}
          <div className={`mt-4 overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 flex flex-col ${store.isConsoleOpen ? "h-64" : "h-10"}`}>
            <div role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') store.toggleConsole(); }} className="flex h-10 w-full shrink-0 select-none items-center justify-between border-b bg-muted/50 px-3 py-2 cursor-pointer cursor-ns-resize outline-none focus-visible:bg-muted/80" onClick={() => store.toggleConsole()}>
              <div className="flex items-center gap-2">
                <TerminalSquareIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Console ({store.consoleEntries.length})</span>
              </div>
              <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-6 w-6 z-10" aria-label="Clear console" onClick={(e) => { e.stopPropagation(); store.clearConsole(); }}>
                   <TrashIcon className="h-3 w-3" />
                 </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
              {store.consoleEntries.map((c) => (
                <div key={c.id} className={`mb-1 flex gap-2 rounded px-2 py-1 ${c.type === "error" ? "bg-destructive/10 text-destructive font-semibold" : c.type === "warn" ? "bg-warning/10 text-orange-600" : c.type === "info" ? "text-blue-500" : "text-muted-foreground"}`}>
                  <span className="shrink-0 opacity-50">[{new Date(c.timestamp).toLocaleTimeString()}]</span>
                  <span className="whitespace-pre-wrap">{c.args.join(" ")}</span>
                </div>
              ))}
              {!store.consoleEntries.length && <div className="text-center text-muted-foreground p-4">No console outputs yet</div>}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
}
