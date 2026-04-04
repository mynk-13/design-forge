import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { value: 60, size: "md" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60, "aria-label": "Upload progress" },
};

export const Complete: Story = {
  args: { value: 100, "aria-label": "Complete" },
};

export const Empty: Story = {
  args: { value: 0, "aria-label": "Not started" },
};

export const Indeterminate: Story = {
  args: { value: undefined, "aria-label": "Loading…" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: 320 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.375rem", color: "hsl(var(--df-muted-foreground))" }}>
            <span>size=&quot;{size}&quot;</span>
            <span>60%</span>
          </div>
          <Progress value={60} size={size} aria-label={`${size} progress`} />
        </div>
      ))}
    </div>
  ),
};

export const MultipleSteps: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360 }}>
      {[
        { label: "Upload files", value: 100 },
        { label: "Process data", value: 75 },
        { label: "Generate report", value: 30 },
        { label: "Send notification", value: 0 },
      ].map(({ label, value }) => (
        <div key={label}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
            <span>{label}</span>
            <span style={{ color: "hsl(var(--df-muted-foreground))" }}>{value}%</span>
          </div>
          <Progress value={value} aria-label={label} />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: { value: 60, size: "md", "aria-label": "Playground progress" },
};
