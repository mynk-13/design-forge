"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COMPONENTS = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Avatar", "Badge", 
  "Banner", "Box", "Button", "Card", "Checkbox", "Container", 
  "ContextMenu", "DataTable", "Dialog", "DropdownMenu", "Flex", "Grid", 
  "HoverCard", "Input", "Label", "Popover", "Progress", "RadioGroup", 
  "Select", "Separator", "Skeleton", "Slider", "Stack", "Switch", 
  "Tabs", "Textarea", "Toast", "Tooltip"
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
      <div className="w-full">
        <div className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Getting Started</h4>
          <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
            <Link
              href="/docs"
              className={`flex w-full items-center rounded-md border border-transparent px-2 py-1 ${
                pathname === "/docs" ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              Introduction
            </Link>
            <Link
              href="/docs/installation"
              className={`flex w-full items-center rounded-md border border-transparent px-2 py-1 ${
                pathname === "/docs/installation" ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              Installation
            </Link>
          </div>
        </div>
        <div className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Components</h4>
          <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
            {COMPONENTS.sort().map((component) => {
              const slug = component.toLowerCase();
              const href = `/docs/${slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={slug}
                  href={href}
                  className={`flex w-full items-center rounded-md border border-transparent px-2 py-1 ${
                    isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {component}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Ecosystem Tools</h4>
          <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
            {["Generator", "Playground", "Storybook"].map((tool) => {
              const slug = tool.toLowerCase();
              const href = `/docs/${slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={slug}
                  href={href}
                  className={`flex w-full items-center rounded-md border border-transparent px-2 py-1 ${
                    isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {tool}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
