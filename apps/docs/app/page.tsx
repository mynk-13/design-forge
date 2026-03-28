export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Phase 3 Complete
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          DesignForge
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Open-source React component design system
        </p>
        <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-green-600">✓</span>
            <span>Phase 1 — Monorepo foundation (Turborepo + pnpm)</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-green-600">✓</span>
            <span>Phase 2 — Theme system (60+ CSS tokens, Tailwind plugin)</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-green-600">✓</span>
            <span>Phase 3 — 7 layout components (Box, Flex, Grid, Container, Stack, Separator, AspectRatio)</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-muted-foreground/50">○</span>
            <span className="opacity-50">Phase 8 — Documentation site (this page) — coming soon</span>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          View components in{" "}
          <a
            href="https://designforge-storybook.vercel.app"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook →
          </a>
        </p>
      </div>
    </main>
  );
}
