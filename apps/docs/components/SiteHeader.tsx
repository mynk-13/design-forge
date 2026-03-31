import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon } from "lucide-react";
import { Button } from "@designforge/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold inline-block tracking-tight text-lg shadow-[0_0_24px_rgba(0,0,0,0.1)] dark:shadow-[0_0_24px_rgba(255,255,255,0.1)] px-1 rounded">
              DesignForge
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Docs
            </Link>
            <Link
              href="/generator"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              AI Generator
            </Link>
            <Link
              href="/playground"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Playground
            </Link>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#ff4785] text-foreground/60 flex items-center gap-1"
            >
              Storybook ↗
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/mynk-13/design-forge" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="w-9 h-9" aria-label="GitHub">
              <GithubIcon className="h-4 w-4" />
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
