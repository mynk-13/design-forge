import { create } from "zustand";

export type ConsoleEntry = {
  id: string;
  type: "log" | "warn" | "error" | "info";
  args: any[];
  timestamp: number;
};

export type ViewportSize = "mobile" | "tablet" | "desktop";
export type PlaygroundTheme = "light" | "dark";

interface PlaygroundState {
  code: string;
  viewport: ViewportSize;
  theme: PlaygroundTheme;
  isConsoleOpen: boolean;
  consoleEntries: ConsoleEntry[];

  setCode: (code: string) => void;
  setViewport: (size: ViewportSize) => void;
  setTheme: (theme: PlaygroundTheme) => void;
  toggleConsole: (open?: boolean) => void;
  addConsoleEntry: (entry: Omit<ConsoleEntry, "id" | "timestamp">) => void;
  clearConsole: () => void;
}

const DEFAULT_CODE = `import React from "react";
import { Button } from "@designforge/ui";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to DesignForge Playground</h1>
        <Button onClick={() => console.log("Button clicked!")}>
          Click me
        </Button>
      </div>
    </div>
  );
}
`;

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: DEFAULT_CODE,
  viewport: "desktop",
  theme: "light",
  isConsoleOpen: false,
  consoleEntries: [],

  setCode: (code) => set({ code }),
  setViewport: (viewport) => set({ viewport }),
  setTheme: (theme) => set({ theme }),
  toggleConsole: (open) => set((state) => ({ isConsoleOpen: open !== undefined ? open : !state.isConsoleOpen })),
  addConsoleEntry: (entry) => set((state) => ({
    consoleEntries: [
      ...state.consoleEntries,
      { ...entry, id: crypto.randomUUID(), timestamp: Date.now() }
    ].slice(-100) // Keep max 100 entries
  })),
  clearConsole: () => set({ consoleEntries: [] })
}));
