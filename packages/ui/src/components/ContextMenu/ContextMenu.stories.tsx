import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

const meta: Meta = {
  title: "Overlay/ContextMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const TriggerArea = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      height: 150,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed hsl(var(--df-border))",
      borderRadius: "var(--df-radius)",
      fontSize: "0.875rem",
      color: "hsl(var(--df-muted-foreground))",
      userSelect: "none",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Right-click here</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 224 }}>
        <ContextMenuItem inset>
          Back<ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar<ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel inset>Developer</ContextMenuLabel>
        <ContextMenuItem inset>
          Inspect Element<ContextMenuShortcut>⌥⌘I</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const FileMenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          style={{
            display: "flex",
            height: 120,
            width: 280,
            alignItems: "center",
            justifyContent: "center",
            background: "hsl(var(--df-muted))",
            borderRadius: "var(--df-radius)",
            fontSize: "0.875rem",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          📄 report-2026-Q1.pdf
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 200 }}>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Open with…</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Cut<ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste<ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Documents</ContextMenuItem>
            <ContextMenuItem>Downloads</ContextMenuItem>
            <ContextMenuItem>Desktop</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem style={{ color: "hsl(var(--df-destructive))" }}>
          Delete<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithRadioItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Right-click to change theme</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Theme</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="system">
          <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
