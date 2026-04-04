import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { SearchButton } from "./SearchDialog";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@designforge/ui";

const storybookUrl =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "https://designforge-storybook.vercel.app";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 px-4 max-w-7xl mx-auto">
        {/* Mobile hamburger — shown only on small screens */}
        <MobileSidebar />

        {/* Logo + nav */}
        <div className="flex items-center gap-6 md:gap-8 mr-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold inline-block tracking-tight text-lg shadow-[0_0_24px_rgba(0,0,0,0.1)] dark:shadow-[0_0_24px_rgba(255,255,255,0.1)] px-1 rounded">
              DesignForge
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
              href={storybookUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#ff4785] text-foreground/60 flex items-center gap-1"
            >
              Storybook ↗
            </a>
          </nav>
        </div>

        {/* Search — grows to fill available space */}
        <div className="flex-1">
          <SearchButton />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a href="https://github.com/mynk-13/design-forge" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="w-9 h-9" aria-label="GitHub">
              {/* GitHub mark SVG */}
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
