import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "select" },
      options: [16 / 9, 4 / 3, 1, 3 / 4, 9 / 16, 2 / 1, 21 / 9],
      description: "Width / height ratio",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Constrains its child to a specified aspect ratio. Essential for responsive images, video embeds, and media placeholders.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, hsl(var(--df-primary) / 0.3), hsl(var(--df-primary) / 0.7))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "hsl(var(--df-primary))",
      fontWeight: 600,
      fontSize: "0.875rem",
    }}
  >
    {label}
  </div>
);

export const Widescreen: Story = {
  render: () => (
    <div style={{ maxWidth: "480px" }}>
      <AspectRatio ratio={16 / 9} className="rounded-lg">
        <Placeholder label="16:9 — Video / Hero" />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ maxWidth: "240px" }}>
      <AspectRatio ratio={1} className="rounded-full">
        <Placeholder label="1:1 — Avatar" />
      </AspectRatio>
    </div>
  ),
};

export const Classic: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <AspectRatio ratio={4 / 3} className="rounded-lg">
        <Placeholder label="4:3 — Classic Photo" />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div style={{ maxWidth: "200px" }}>
      <AspectRatio ratio={3 / 4} className="rounded-lg">
        <Placeholder label="3:4 — Portrait" />
      </AspectRatio>
    </div>
  ),
};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      {([
        { ratio: 16 / 9, label: "16:9" },
        { ratio: 4 / 3, label: "4:3" },
        { ratio: 1, label: "1:1" },
        { ratio: 9 / 16, label: "9:16" },
      ] as const).map(({ ratio, label }) => (
        <AspectRatio key={label} ratio={ratio} className="rounded-md">
          <Placeholder label={label} />
        </AspectRatio>
      ))}
    </div>
  ),
};
