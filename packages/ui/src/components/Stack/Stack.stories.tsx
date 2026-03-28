import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const Item = ({ label }: { label: string }) => (
  <div
    style={{
      padding: "0.75rem 1.25rem",
      background: "hsl(var(--df-card))",
      border: "1px solid hsl(var(--df-border))",
      borderRadius: "var(--df-radius)",
      fontSize: "0.875rem",
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One-dimensional stack layout — vertical by default with a sensible default gap. Simpler API than Flex for linear content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <Stack gap="3">
      <Item label="First card" />
      <Item label="Second card" />
      <Item label="Third card" />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" gap="3" align="center">
      <Item label="Left" />
      <Item label="Center" />
      <Item label="Right" />
    </Stack>
  ),
};

export const LargeGap: Story = {
  render: () => (
    <Stack gap="8">
      <Item label="Section A" />
      <Item label="Section B" />
      <Item label="Section C" />
    </Stack>
  ),
};

export const ZeroGap: Story = {
  render: () => (
    <Stack gap="0">
      <div style={{ padding: "0.5rem", background: "hsl(var(--df-primary))", color: "white" }}>
        Stacked flush
      </div>
      <div style={{ padding: "0.5rem", background: "hsl(var(--df-primary) / 0.7)", color: "white" }}>
        No gap between
      </div>
      <div style={{ padding: "0.5rem", background: "hsl(var(--df-primary) / 0.4)", color: "white" }}>
        Items
      </div>
    </Stack>
  ),
};
