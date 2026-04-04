import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      background: "hsl(var(--df-primary) / 0.1)",
      border: "1px solid hsl(var(--df-primary) / 0.3)",
      borderRadius: "var(--df-radius-sm)",
      textAlign: "center",
      fontSize: "0.875rem",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    cols: { control: "select", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    rows: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12"] },
    align: { control: "select", options: ["start", "center", "end", "stretch"] },
    justify: { control: "select", options: ["start", "center", "end", "stretch"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
  render: () => (
    <Grid cols={2} gap="4">
      {Array.from({ length: 4 }, (_, i) => <Cell key={i}>Cell {i + 1}</Cell>)}
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={3} gap="4">
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>Cell {i + 1}</Cell>)}
    </Grid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Grid cols={4} gap="3">
      {Array.from({ length: 8 }, (_, i) => <Cell key={i}>Cell {i + 1}</Cell>)}
    </Grid>
  ),
};

export const AsymmetricGap: Story = {
  render: () => (
    <Grid cols={3} gapX="8" gapY="2">
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>Cell {i + 1}</Cell>)}
    </Grid>
  ),
};

export const Playground: Story = {
  args: { cols: 3, gap: "4" },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>Cell {i + 1}</Cell>)}
    </Grid>
  ),
};
