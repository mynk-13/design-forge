import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const meta: Meta = { title: "Overlay/Popover", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>Dimensions</p>
          <Input label="Width" defaultValue="100px" />
          <Input label="Height" defaultValue="25px" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};
