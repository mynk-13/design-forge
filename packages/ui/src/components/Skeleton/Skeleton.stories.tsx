import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["text", "circular", "rectangular"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => <Skeleton variant="text" style={{ width: 200, height: 16 }} />,
};

export const Circular: Story = {
  render: () => <Skeleton variant="circular" style={{ width: 48, height: 48 }} />,
};

export const Rectangular: Story = {
  render: () => <Skeleton variant="rectangular" style={{ width: 300, height: 120 }} />,
};

export const CardLoader: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid hsl(var(--df-border))",
        borderRadius: "var(--df-radius)",
        width: 350,
      }}
    >
      <Skeleton variant="circular" style={{ width: 48, height: 48, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-3 w-1/2" />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: 320 }}>
      <Skeleton variant="text" className="h-5 w-full" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <Skeleton variant="text" className="h-4 w-4/6" />
    </div>
  ),
};

export const ArticleLoader: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 480 }}>
      {/* Hero image */}
      <Skeleton variant="rectangular" className="h-48 w-full" />
      {/* Title */}
      <Skeleton variant="text" className="h-7 w-3/4" />
      {/* Metadata row */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Skeleton variant="circular" style={{ width: 32, height: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <Skeleton variant="text" className="h-3 w-1/3" />
          <Skeleton variant="text" className="h-3 w-1/4" />
        </div>
      </div>
      {/* Body text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-5/6" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-3/4" />
      </div>
    </div>
  ),
};

export const DataTableLoader: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 560 }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr 1fr", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid hsl(var(--df-border))" }}>
        {["Name", "Email", "Role", "Status"].map((col) => (
          <Skeleton key={col} variant="text" className="h-3" style={{ width: "60%" }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr 1fr", gap: "1rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Skeleton variant="circular" style={{ width: 28, height: 28, flexShrink: 0 }} />
            <Skeleton variant="text" className="h-3 flex-1" />
          </div>
          <Skeleton variant="text" className="h-3 w-4/5" />
          <Skeleton variant="text" className="h-3 w-2/3" />
          <Skeleton variant="rectangular" className="h-5 w-14" style={{ borderRadius: 9999 }} />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => <Skeleton {...args} style={{ width: 200, height: 20 }} />,
  args: { variant: "text" },
};
