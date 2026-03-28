import type { Meta, StoryObj } from "@storybook/react";
import { Info } from "lucide-react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = { title: "Feedback/Banner", component: Banner, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Banner variant="default">🎉 DesignForge v1.0 is now available!</Banner>
      <Banner variant="info" icon={<Info className="h-4 w-4" />}>Scheduled maintenance on Sunday 2–4 AM UTC.</Banner>
      <Banner variant="warning">⚠️ Your free tier quota resets in 3 days.</Banner>
      <Banner variant="destructive">🚨 Critical security update required. Please update immediately.</Banner>
      <Banner variant="success">✅ All systems operational.</Banner>
    </div>
  ),
};

export const NonDismissible: Story = {
  render: () => (
    <Banner dismissible={false} variant="warning">
      You are viewing a preview environment. Data may be reset at any time.
    </Banner>
  ),
};
