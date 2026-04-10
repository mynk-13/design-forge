"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { SearchButton } from "./SearchDialog";

const COMPONENTS = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Avatar", "Badge",
  "Banner", "Box", "Button", "Card", "Checkbox", "Container",
  "ContextMenu", "DataTable", "Dialog", "DropdownMenu", "Flex", "Grid",
  "HoverCard", "Input", "Label", "Popover", "Progress", "RadioGroup",
  "Select", "Separator", "Skeleton", "Slider", "Stack", "Switch",
  "Tabs", "Textarea", "Toast", "Tooltip",
];

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex w-full items-center rounded-full px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-[#006ADC] text-white font-medium dark:bg-[#0588F0]"
          : "text-[#60646C] hover:text-[#11181C] dark:text-[#8D8D8D] dark:hover:text-[#EDEDED]"
      }`}
    >
      {label}
    </Link>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[#60646C] dark:text-[#8D8D8D] hover:text-[#11181C] dark:hover:text-[#EDEDED] hover:bg-[#F1F5F9] dark:hover:bg-[#1A1A1A] transition-colors shrink-0"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <MenuIcon className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40 backdrop-blur-sm w-full cursor-default"
            onClick={close}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-[#111111] border-r border-[#E2E8F0] dark:border-[#222222] shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-[57px] border-b border-[#E2E8F0] dark:border-[#222222] shrink-0">
              <span className="font-bold tracking-tight text-[15px] text-[#11181C] dark:text-[#EDEDED]">DesignForge</span>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-md text-[#60646C] dark:text-[#8D8D8D] hover:text-[#11181C] dark:hover:text-[#EDEDED] hover:bg-[#F1F5F9] dark:hover:bg-[#1A1A1A] transition-colors"
                onClick={close}
                aria-label="Close menu"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-1">
              {/* Search */}
              <div className="mb-4">
                <SearchButton compact />
              </div>

              {/* Getting Started */}
              <div className="mb-4">
                <p className="mb-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
                  Getting Started
                </p>
                <div className="flex flex-col gap-0.5">
                  <MobileNavLink href="/docs" label="Introduction" onClick={close} />
                  <MobileNavLink href="/docs/installation" label="Installation" onClick={close} />
                </div>
              </div>

              {/* Components */}
              <div className="mb-4">
                <p className="mb-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
                  Components
                </p>
                <div className="flex flex-col gap-0.5">
                  {COMPONENTS.sort().map((component) => (
                    <MobileNavLink
                      key={component}
                      href={`/docs/${component === "DataTable" ? "data-table" : component.toLowerCase()}`}
                      label={component}
                      onClick={close}
                    />
                  ))}
                </div>
              </div>

              {/* Ecosystem */}
              <div className="mb-4">
                <p className="mb-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
                  Ecosystem Tools
                </p>
                <div className="flex flex-col gap-0.5">
                  {["Generator", "Playground", "Storybook"].map((tool) => (
                    <MobileNavLink
                      key={tool}
                      href={`/docs/${tool.toLowerCase()}`}
                      label={tool}
                      onClick={close}
                    />
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
