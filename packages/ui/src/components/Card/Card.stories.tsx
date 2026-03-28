import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = { title: "Data Display/Card", component: Card, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: "380px" }}>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>A new design system built with React 19 and TypeScript.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: "0.875rem" }}>The project has reached Phase 3 with 7 layout components shipped and fully tested.</p>
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
    <Card style={{ width: "320px" }}>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <CardTitle>@designforge/ui</CardTitle>
          <Badge variant="success">Stable</Badge>
        </div>
        <CardDescription>React component library</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>33 accessible components with CVA variants and axe-core zero violations.</p>
      </CardContent>
    </Card>
  ),
};
