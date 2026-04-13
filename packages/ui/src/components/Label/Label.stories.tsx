import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Form/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  ),
};

export const WithRequired: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="name">
        Full name <span className="text-destructive">*</span>
      </Label>
      <input
        id="name"
        type="text"
        placeholder="Jane Doe"
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-70 cursor-not-allowed">
        Disabled field
      </Label>
      <input
        id="disabled-input"
        type="text"
        disabled
        placeholder="Not editable"
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  ),
};
