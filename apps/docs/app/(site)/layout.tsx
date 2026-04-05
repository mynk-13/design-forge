import { SiteHeader } from "../../components/SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9FAFB] dark:bg-[#111111] text-[#11181C] dark:text-[#EDEDED]">
      <SiteHeader />
      <main className="flex-1 flex">{children}</main>
      <footer className="border-t border-[#E2E8F0] dark:border-[#222222] bg-white dark:bg-[#111111]">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-between gap-4 py-5 px-4 md:h-14 md:flex-row md:py-0">
          <p className="text-center text-sm text-[#60646C] dark:text-[#8D8D8D] md:text-left">
            Built by Mayank. The source code is available on{" "}
            <a
              href="https://github.com/mynk-13/design-forge"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-[#11181C] dark:hover:text-[#EDEDED] transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
