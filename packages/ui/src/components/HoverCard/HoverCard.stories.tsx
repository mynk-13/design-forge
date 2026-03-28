import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta: Meta = { title: "Overlay/HoverCard", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="/profile" style={{ fontWeight: 600, color: "hsl(var(--df-primary))", textDecoration: "underline", textUnderlineOffset: "4px" }}>
            @designforge
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p style={{ fontWeight: 700 }}>DesignForge</p>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
              Open-source React component design system with AI-powered generation.
            </p>
            <p style={{ fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>
              Joined March 2026
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
