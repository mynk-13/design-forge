import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";

const meta: Meta = {
  title: "Overlay/HoverCard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="/profile"
            style={{
              fontWeight: 600,
              color: "hsl(var(--df-primary))",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
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

export const UserProfile: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="/user/mayank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Avatar size="sm">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <span style={{ fontWeight: 500 }}>@mynk-13</span>
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/mynk-13.png" alt="mynk-13" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <p style={{ fontWeight: 700 }}>Mayank</p>
              <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>@mynk-13</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                Building DesignForge — open-source React design system.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>
                  <MapPin className="h-3 w-3" /> India
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>
                  <CalendarDays className="h-3 w-3" /> Joined March 2026
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const RepositoryCard: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="/repo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "hsl(var(--df-primary))",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            <LinkIcon className="h-3.5 w-3.5" />
            mynk-13/design-forge
          </a>
        </HoverCardTrigger>
        <HoverCardContent style={{ width: "320px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <p style={{ fontWeight: 700, fontSize: "0.875rem" }}>design-forge</p>
              <Badge variant="outline" style={{ fontSize: "0.625rem" }}>Public</Badge>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "hsl(var(--df-muted-foreground))" }}>
              Portfolio-grade open-source React design system with 33 components, AI generator, and
              Monaco playground.
            </p>
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>
              <span>⭐ 128</span>
              <span>🍴 24</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3178C6", display: "inline-block" }} />
                TypeScript
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", padding: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger asChild>
            <a
              href="#"
              style={{
                fontWeight: 500,
                color: "hsl(var(--df-primary))",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Hover ({side})
            </a>
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <p style={{ fontSize: "0.875rem" }}>Card appears on the {side}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};
