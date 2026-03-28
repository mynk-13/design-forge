import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta = { title: "Overlay/Tooltip", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
        <TooltipContent><p>This is a helpful tooltip</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Positions: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ display: "flex", gap: "1rem", padding: "3rem", justifyContent: "center" }}>
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild><Button variant="outline" size="sm">{side}</Button></TooltipTrigger>
            <TooltipContent side={side}><p>Tooltip on {side}</p></TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};
