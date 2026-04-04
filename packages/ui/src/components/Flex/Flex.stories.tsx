import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";

const Item = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "0.5rem 1rem",
      background: "hsl(var(--df-primary) / 0.15)",
      borderRadius: "var(--df-radius-sm)",
      fontSize: "0.875rem",
      color: "hsl(var(--df-primary))",
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Flex> = {
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["row", "col", "row-reverse", "col-reverse"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12"] },
    inline: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Flexbox container with shorthand props for direction, alignment, justification, wrapping and gap.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  render: () => (
    <Flex gap="3">
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="col" gap="2">
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Flex>
  ),
};

export const Centered: Story = {
  render: () => (
    <Flex
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: "120px", border: "1px dashed hsl(var(--df-border))", borderRadius: "var(--df-radius)" }}
    >
      <Item>Centered A</Item>
      <Item>Centered B</Item>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      style={{ padding: "0.5rem", border: "1px solid hsl(var(--df-border))", borderRadius: "var(--df-radius)" }}
    >
      <Item>Left</Item>
      <Item>Right</Item>
    </Flex>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <Flex wrap="wrap" gap="2" style={{ maxWidth: "300px" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Item key={i}>Item {i + 1}</Item>
      ))}
    </Flex>
  ),
};

export const Playground: Story = {
  args: { direction: "row", gap: "3", align: "center", justify: "start" },
  render: (args) => (
    <Flex
      {...args}
      style={{ minHeight: "80px", padding: "1rem", border: "1px dashed hsl(var(--df-border))", borderRadius: "var(--df-radius)" }}
    >
      <Item>A</Item>
      <Item>B</Item>
      <Item>C</Item>
    </Flex>
  ),
};
