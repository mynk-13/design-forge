"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchButton } from "./SearchDialog";

const COMPONENTS = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Avatar", "Badge", 
  "Banner", "Box", "Button", "Card", "Checkbox", "Container", 
  "ContextMenu", "DataTable", "Dialog", "DropdownMenu", "Flex", "Grid", 
  "HoverCard", "Input", "Label", "Popover", "Progress", "RadioGroup", 
  "Select", "Separator", "Skeleton", "Slider", "Stack", "Switch", 
  "Tabs", "Textarea", "Toast", "Tooltip"
];

function SidebarLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex w-full items-center rounded-full px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-[#006ADC] text-white font-medium dark:bg-[#0588F0] dark:text-white"
          : "text-[#60646C] hover:text-[#11181C] dark:text-[#8D8D8D] dark:hover:text-[#EDEDED]"
      }`}
    >
      {label}
    </Link>
  );
}

export function DocsSidebar() {
  return (
    <div className="flex flex-col gap-1">
      {/* Search inside sidebar */}
      <div className="mb-5">
        <SearchButton compact />
      </div>

      {/* Getting Started */}
      <div className="mb-5">
        <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
          Getting Started
        </p>
        <div className="flex flex-col gap-0.5">
          <SidebarLink href="/docs" label="Introduction" />
          <SidebarLink href="/docs/installation" label="Installation" />
        </div>
      </div>

      {/* Components */}
      <div className="mb-5">
        <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
          Components
        </p>
        <div className="flex flex-col gap-0.5">
          {COMPONENTS.sort().map((component) => (
            <SidebarLink
              key={component}
              href={`/docs/${component.toLowerCase()}`}
              label={component}
            />
          ))}
        </div>
      </div>

      {/* Ecosystem Tools */}
      <div className="mb-5">
        <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-wider text-[#11181C] dark:text-[#EDEDED]">
          Ecosystem Tools
        </p>
        <div className="flex flex-col gap-0.5">
          {["Generator", "Playground", "Storybook"].map((tool) => (
            <SidebarLink
              key={tool}
              href={`/docs/${tool.toLowerCase()}`}
              label={tool}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
