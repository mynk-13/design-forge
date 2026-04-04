import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success"],
    },
    children: { control: "text" },
  },
  args: { variant: "default", children: "Badge" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="default">Published</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontWeight: 600 }}>@designforge/ui</span>
        <Badge>v1.0</Badge>
        <Badge variant="success">Stable</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>AI Generator</span>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>DatePicker</span>
        <Badge variant="destructive">Removed in v1</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>TypeScript</span>
        <Badge variant="outline">5.x</Badge>
      </div>
    </div>
  ),
};

export const WithCounts: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem" }}>
        Notifications <Badge>12</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem" }}>
        Errors <Badge variant="destructive">3</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem" }}>
        PRs <Badge variant="secondary">7</Badge>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: { variant: "default", children: "Badge label" },
};
