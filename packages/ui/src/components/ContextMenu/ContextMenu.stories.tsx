import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "./ContextMenu";

const meta: Meta = { title: "Overlay/ContextMenu", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{ display: "flex", height: "150px", width: "300px", alignItems: "center", justifyContent: "center", border: "2px dashed hsl(var(--df-border))", borderRadius: "var(--df-radius)", fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: "224px" }}>
        <ContextMenuItem inset>Back<ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem inset disabled>Forward<ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem inset>Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show Bookmarks Bar<ContextMenuShortcut>⌘⇧B</ContextMenuShortcut></ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel inset>People</ContextMenuLabel>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
