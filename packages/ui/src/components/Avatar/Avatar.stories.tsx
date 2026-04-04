import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  args: { size: "md" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="GitHub user" />
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="broken-url.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <Avatar size={size}>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <span style={{ fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {["Alice", "Bob", "Carol", "David", "Emma"].map((name, i) => (
        <Avatar
          key={name}
          size="md"
          style={{ marginLeft: i === 0 ? 0 : "-0.75rem", border: "2px solid hsl(var(--df-background))", zIndex: 5 - i }}
        >
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar
        size="md"
        style={{ marginLeft: "-0.75rem", border: "2px solid hsl(var(--df-background))" }}
      >
        <AvatarFallback style={{ fontSize: "0.625rem" }}>+3</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithNameAndRole: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {[
        { initials: "JD", name: "Jane Doe", role: "Product Designer" },
        { initials: "MK", name: "Mayank Kumar", role: "Senior Frontend Engineer" },
        { initials: "AW", name: "Anna White", role: "Engineering Manager" },
      ].map(({ initials, name, role }) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p style={{ fontWeight: 500, fontSize: "0.875rem" }}>{name}</p>
            <p style={{ fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>{role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  args: { size: "md" },
};
