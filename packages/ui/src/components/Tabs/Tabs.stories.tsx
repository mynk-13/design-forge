import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card/Card";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Badge } from "../Badge/Badge";

const meta: Meta = {
  title: "Data Display/Tabs",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: 400 }}>
      <TabsList style={{ width: "100%" }}>
        <TabsTrigger value="account" style={{ flex: 1 }}>Account</TabsTrigger>
        <TabsTrigger value="password" style={{ flex: 1 }}>Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Input label="Name" defaultValue="Jane Doe" />
            <Input label="Username" defaultValue="@jane_doe" />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Input label="Current password" type="password" />
            <Input label="New password" type="password" />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div style={{ padding: "1rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.875rem" }}>
            Welcome to your project overview. Here you can see a summary of recent activity.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant="success">Active</Badge>
            <Badge variant="secondary">33 components</Badge>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div style={{ padding: "1rem 0" }}>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
            Analytics data will appear here once your project has traffic.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div style={{ padding: "1rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Input label="Project name" defaultValue="DesignForge" />
          <Input label="Slug" defaultValue="design-forge" />
          <Button size="sm">Update settings</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available" style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="premium">Premium</TabsTrigger>
        <TabsTrigger value="enterprise" disabled>Enterprise</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <p style={{ padding: "1rem 0", fontSize: "0.875rem" }}>Free plan features are shown here.</p>
      </TabsContent>
      <TabsContent value="premium">
        <p style={{ padding: "1rem 0", fontSize: "0.875rem" }}>Premium plan features are shown here.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const CodePreview: Story = {
  render: () => (
    <Tabs defaultValue="preview" style={{ width: 480 }}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          style={{
            padding: "2rem",
            border: "1px solid hsl(var(--df-border))",
            borderRadius: "0 0 var(--df-radius) var(--df-radius)",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <pre
          style={{
            padding: "1rem",
            background: "hsl(var(--df-muted))",
            borderRadius: "0 0 var(--df-radius) var(--df-radius)",
            fontSize: "0.8125rem",
            overflowX: "auto",
            margin: 0,
          }}
        >
          {`<Button>Default</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>`}
        </pre>
      </TabsContent>
    </Tabs>
  ),
};
