import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const Content = () => (
  <div style={{ background: "hsl(var(--df-primary) / 0.1)", padding: "1rem", borderRadius: "var(--df-radius)", textAlign: "center" }}>
    Container content — note the horizontal padding and max-width centering
  </div>
);

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container><Content /></Container>
  ),
};

export const Small: Story = {
  render: () => (
    <Container size="sm"><Content /></Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="lg"><Content /></Container>
  ),
};

export const Full: Story = {
  render: () => (
    <Container size="full"><Content /></Container>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
        <Container key={size} size={size}>
          <div
            style={{ background: "hsl(var(--df-muted))", padding: "0.5rem", borderRadius: "var(--df-radius-sm)", textAlign: "center", fontSize: "0.75rem" }}
          >
            size=&quot;{size}&quot;
          </div>
        </Container>
      ))}
    </div>
  ),
};
