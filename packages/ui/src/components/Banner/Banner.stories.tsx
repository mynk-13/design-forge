import type { Meta, StoryObj } from "@storybook/react";
import { Info, Megaphone, ShieldAlert, CheckCircle2, Zap } from "lucide-react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "warning", "destructive", "success"],
    },
    dismissible: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "default",
    dismissible: true,
    children: "Banner message",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Banner {...args}>
      {args.children}
    </Banner>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Banner variant="default" icon={<Megaphone className="h-4 w-4" />}>
        DesignForge v1.0 is now available — 33 components, AI generator, and full dark mode.
      </Banner>
      <Banner variant="info" icon={<Info className="h-4 w-4" />}>
        Scheduled maintenance on Sunday 2–4 AM UTC. Services may be briefly unavailable.
      </Banner>
      <Banner variant="warning">
        Your free tier quota resets in 3 days. Upgrade for unlimited usage.
      </Banner>
      <Banner variant="destructive" icon={<ShieldAlert className="h-4 w-4" />}>
        Critical security update required. Please update to v1.0.1 immediately.
      </Banner>
      <Banner variant="success" icon={<CheckCircle2 className="h-4 w-4" />}>
        All systems operational. No incidents reported.
      </Banner>
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

export const WithCTA: Story = {
  render: () => (
    <Banner variant="info" icon={<Zap className="h-4 w-4" />}>
      <span>
        New AI generator features available.{" "}
        <a
          href="#"
          style={{
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          Learn more →
        </a>
      </span>
    </Banner>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Banner variant="warning">
      We are deprecating the legacy <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>@designforge/legacy</code> package.
      All users must migrate to <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>@designforge/ui</code> before December 31, 2026.
      See the migration guide for step-by-step instructions.
    </Banner>
  ),
};

export const Playground: Story = {
  render: (args) => <Banner {...args}>{args.children}</Banner>,
  args: {
    variant: "default",
    dismissible: true,
    children: "This is a banner — change controls above.",
  },
};
