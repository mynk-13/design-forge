import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { Avatar, AvatarFallback } from "../Avatar/Avatar";
import { Progress } from "../Progress/Progress";

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 380 }}>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>
          A new design system built with React 19 and TypeScript.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: "0.875rem" }}>
          The project has reached Phase 9 with 33 components shipped and fully tested.
        </p>
      </CardContent>
      <CardFooter style={{ gap: "0.5rem" }}>
        <Button size="sm">View project</Button>
        <Button size="sm" variant="outline">Share</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <CardTitle>@designforge/ui</CardTitle>
          <Badge variant="success">Stable</Badge>
        </div>
        <CardDescription>React component library</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
          33 accessible components with CVA variants and axe-core zero violations.
        </p>
      </CardContent>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  render: () => (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar size="lg">
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Mayank Kumar</CardTitle>
            <CardDescription>Senior Frontend Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: "0.875rem" }}>Building DesignForge — open-source React design system with AI-powered generation.</p>
      </CardContent>
      <CardFooter style={{ gap: "0.5rem" }}>
        <Button size="sm" variant="outline" style={{ flex: 1 }}>Message</Button>
        <Button size="sm" style={{ flex: 1 }}>Follow</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      {[
        { title: "Total Components", value: "33", change: "+5 this phase", variant: "success" as const },
        { title: "Test Coverage", value: "94%", change: "+2% this week", variant: "success" as const },
        { title: "Bundle Size", value: "68 KB", change: "Under 100KB limit", variant: "default" as const },
        { title: "Open Issues", value: "3", change: "-2 since yesterday", variant: "secondary" as const },
      ].map(({ title, value, change, variant }) => (
        <Card key={title} style={{ minWidth: 150 }}>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardDescription>{title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{value}</p>
            <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
              <Badge variant={variant} style={{ fontSize: "0.625rem" }}>{change}</Badge>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const WithProgress: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <CardHeader>
        <CardTitle>DesignForge Phases</CardTitle>
        <CardDescription>Build progress — 9 of 12 phases complete</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { label: "Components", value: 100 },
            { label: "Documentation", value: 100 },
            { label: "Storybook", value: 80 },
            { label: "Testing", value: 0 },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
                <span>{label}</span>
                <span style={{ color: "hsl(var(--df-muted-foreground))" }}>{value}%</span>
              </div>
              <Progress value={value} size="sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card style={{ width: 280 }}>
      <CardContent style={{ paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.875rem" }}>
          A minimal card with no header or footer. Just content.
        </p>
      </CardContent>
    </Card>
  ),
};
