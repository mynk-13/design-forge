"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@designforge/ui";

const COMPONENTS = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Avatar", "Badge",
  "Banner", "Box", "Button", "Card", "Checkbox", "Container",
  "ContextMenu", "DataTable", "Dialog", "DropdownMenu", "Flex", "Grid",
  "HoverCard", "Input", "Label", "Popover", "Progress", "RadioGroup",
  "Select", "Separator", "Skeleton", "Slider", "Stack", "Switch",
  "Tabs", "Textarea", "Toast", "Tooltip",
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden w-9 h-9 shrink-0"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <MenuIcon className="h-5 w-5" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={close} />

          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-background border-r shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
              <span className="font-bold tracking-tight">DesignForge</span>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={close} aria-label="Close menu">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-2">
              {/* Getting Started */}
              <div className="mb-4">
                <p className="mb-1 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Getting Started
                </p>
                {[
                  { href: "/docs", label: "Introduction" },
                  { href: "/docs/installation", label: "Installation" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={`flex w-full items-center rounded-md px-2 py-1.5 text-sm ${
                      pathname === href
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Components */}
              <div className="mb-4">
                <p className="mb-1 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Components
                </p>
                {COMPONENTS.sort().map((component) => {
                  const href = `/docs/${component.toLowerCase()}`;
                  return (
                    <Link
                      key={component}
                      href={href}
                      onClick={close}
                      className={`flex w-full items-center rounded-md px-2 py-1.5 text-sm ${
                        pathname === href
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      {component}
                    </Link>
                  );
                })}
              </div>

              {/* Ecosystem */}
              <div className="mb-4">
                <p className="mb-1 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ecosystem Tools
                </p>
                {["Generator", "Playground", "Storybook"].map((tool) => {
                  const href = `/docs/${tool.toLowerCase()}`;
                  return (
                    <Link
                      key={tool}
                      href={href}
                      onClick={close}
                      className={`flex w-full items-center rounded-md px-2 py-1.5 text-sm ${
                        pathname === href
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      {tool}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
