import type { Meta, StoryObj } from "@storybook/react";
import { Info, Settings, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta = {
  title: "Overlay/Tooltip",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More info">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Delete item</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Save document</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Save{" "}
          <kbd
            style={{
              pointerEvents: "none",
              display: "inline-flex",
              height: "1.25rem",
              alignItems: "center",
              gap: "0.25rem",
              borderRadius: "0.25rem",
              border: "1px solid hsl(var(--df-border))",
              background: "hsl(var(--df-muted))",
              padding: "0 0.375rem",
              fontSize: "0.625rem",
              fontWeight: 500,
            }}
          >
            ⌘S
          </kbd>
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span style={{ display: "inline-block" }}>
          <Button disabled style={{ pointerEvents: "none" }}>
            Disabled button
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is not available</p>
      </TooltipContent>
    </Tooltip>
  ),
};
