import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = { title: "Feedback/Progress", component: Progress, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = { render: () => <Progress value={60} aria-label="Upload progress" style={{ width: "320px" }} /> };
export const Complete: Story = { render: () => <Progress value={100} aria-label="Complete" style={{ width: "320px" }} /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "320px" }}>
      <Progress value={60} size="sm" aria-label="Small" />
      <Progress value={60} size="md" aria-label="Medium" />
      <Progress value={60} size="lg" aria-label="Large" />
    </div>
  ),
};
