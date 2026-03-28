import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal or vertical visual divider. Uses `role=\"separator\"` for semantic separation, or `role=\"none\"` when `decorative={true}`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <p style={{ marginBottom: "0.75rem" }}>Content above</p>
      <Separator />
      <p style={{ marginTop: "0.75rem" }}>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <span>Left</span>
      <Separator orientation="vertical" className="h-5" />
      <span>Right</span>
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <p style={{ marginBottom: "0.75rem" }}>Decorative — no ARIA role</p>
      <Separator decorative className="my-2" />
      <p style={{ marginTop: "0.75rem" }}>Purely visual</p>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem",
        border: "1px solid hsl(var(--df-border))",
        borderRadius: "var(--df-radius)",
      }}
    >
      <a href="/home" style={{ fontSize: "0.875rem" }}>Home</a>
      <Separator orientation="vertical" decorative className="h-4" />
      <a href="/docs" style={{ fontSize: "0.875rem" }}>Docs</a>
      <Separator orientation="vertical" decorative className="h-4" />
      <a href="/blog" style={{ fontSize: "0.875rem" }}>Blog</a>
    </nav>
  ),
};
