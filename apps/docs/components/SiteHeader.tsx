import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MobileSidebar } from "./MobileSidebar";

const storybookUrl =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "https://designforge-storybook.vercel.app";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] dark:border-[#222222] bg-white/90 dark:bg-[#111111]/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111111]/60">
      <div className="flex h-[57px] items-center gap-4 px-4 max-w-[1400px] mx-auto">
        {/* Mobile hamburger — shown only on small screens */}
        <MobileSidebar />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-6 md:mr-8">
          <span className="font-bold tracking-tight text-[15px] text-[#11181C] dark:text-[#EDEDED]">
            DesignForge
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-[#60646C] dark:text-[#8D8D8D]">
          <Link
            href="/docs"
            className="font-medium transition-colors hover:text-[#11181C] dark:hover:text-[#EDEDED]"
          >
            Docs
          </Link>
          <a
            href="/generator"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#11181C] dark:hover:text-[#EDEDED]"
          >
            AI Generator
          </a>
          <a
            href="/playground"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#11181C] dark:hover:text-[#EDEDED]"
          >
            Playground
          </a>
          <a
            href={storybookUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#ff4785] flex items-center gap-1"
          >
            Storybook
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className="opacity-60"
              aria-hidden="true"
            >
              <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4L7.29289 4L2.14645 9.14645C1.95118 9.34171 1.95118 9.65829 2.14645 9.85355C2.34171 10.0488 2.65829 10.0488 2.85355 9.85355L8 4.70711V8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5V3.5C9 3.22386 8.77614 3 8.5 3H3.5Z" fill="currentColor"/>
            </svg>
          </a>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href="https://github.com/mynk-13/design-forge"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-md text-[#60646C] dark:text-[#8D8D8D] hover:text-[#11181C] dark:hover:text-[#EDEDED] hover:bg-[#F1F5F9] dark:hover:bg-[#1A1A1A] transition-colors"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
