import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Base layout primitive. Renders as `div` by default. Use `as` to change the underlying element.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Box content",
  },
  render: (args) => (
    <Box
      {...args}
      style={{ padding: "1rem", background: "hsl(var(--df-muted))", borderRadius: "var(--df-radius)" }}
    />
  ),
};

export const AsSection: Story = {
  args: { as: "section", children: "I am a <section> element" },
  render: (args) => (
    <Box
      {...args}
      style={{ padding: "1rem", border: "1px solid hsl(var(--df-border))", borderRadius: "var(--df-radius)" }}
    />
  ),
};

export const AsArticle: Story = {
  args: { as: "article", children: "I am an <article> element" },
  render: (args) => (
    <Box
      {...args}
      style={{ padding: "1rem", background: "hsl(var(--df-card))", borderRadius: "var(--df-radius)" }}
    />
  ),
};

export const Nested: Story = {
  render: () => (
    <Box style={{ padding: "1.5rem", background: "hsl(var(--df-muted))", borderRadius: "var(--df-radius)" }}>
      <Box style={{ padding: "1rem", background: "hsl(var(--df-background))", borderRadius: "var(--df-radius-sm)" }}>
        <Box style={{ padding: "0.5rem", background: "hsl(var(--df-accent))", borderRadius: "var(--df-radius-sm)" }}>
          Nested Box
        </Box>
      </Box>
    </Box>
  ),
};
