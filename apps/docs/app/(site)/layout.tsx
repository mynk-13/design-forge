import { SiteHeader } from "../../components/SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="py-6 md:px-8 md:py-0 border-t bg-muted/20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-7xl mx-auto px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Mayank. The source code is available on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
}
