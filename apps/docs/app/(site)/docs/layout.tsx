import { DocsSidebar } from "../../../components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
      {/* Sidebar */}
      <aside className="fixed top-[57px] z-30 hidden h-[calc(100vh-57px)] w-[240px] shrink-0 md:sticky md:flex md:flex-col border-r border-[#E2E8F0] dark:border-[#222222] bg-white dark:bg-[#111111]">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <DocsSidebar />
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 px-8 py-10 lg:px-12 xl:px-16 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
