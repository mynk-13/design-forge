import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = { title: "Feedback/Skeleton", component: Skeleton, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const CardLoader: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid hsl(var(--df-border))", borderRadius: "var(--df-radius)", width: "350px" }}>
      <Skeleton variant="circular" className="h-12 w-12 shrink-0" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-3 w-1/2" />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "320px" }}>
      <Skeleton variant="text" className="h-5 w-full" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <Skeleton variant="text" className="h-4 w-4/6" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => <Skeleton variant="circular" className="h-14 w-14" />,
};
