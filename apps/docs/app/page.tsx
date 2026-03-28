export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          DesignForge
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Open-source React component design system
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Phase 1 — Monorepo foundation in place. Components coming in Phase 3.
        </p>
      </div>
    </main>
  );
}
