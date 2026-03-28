import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Trash2, Plus } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Form/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "destructive", "outline", "ghost", "link"] },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Button" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item"><Plus /></Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Button><Mail /> Send email</Button>
      <Button variant="destructive"><Trash2 /> Delete</Button>
      <Button variant="outline"><Plus /> Add item</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <Button loading>Saving...</Button>
      <Button loading variant="outline">Loading</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">Disabled outline</Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://designforge-storybook.vercel.app" target="_blank" rel="noreferrer">
        View Storybook →
      </a>
    </Button>
  ),
};
