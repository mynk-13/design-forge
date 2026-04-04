import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem 2rem", minWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: [50], "aria-label": "Volume" },
};

export const Range: Story = {
  args: { defaultValue: [20, 80], step: 5, "aria-label": "Price range" },
};

export const Steps: Story = {
  args: { defaultValue: [3], min: 1, max: 5, step: 1, "aria-label": "Rating (1–5)" },
};

export const Disabled: Story = {
  args: { defaultValue: [40], disabled: true, "aria-label": "Disabled slider" },
};

export const LabelledSliders: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 340 }}>
      {[
        { label: "Volume", value: [70], max: 100 },
        { label: "Brightness", value: [45], max: 100 },
        { label: "Font size", value: [16], min: 10, max: 32, step: 2 },
      ].map(({ label, value, min = 0, max, step = 1 }) => (
        <div key={label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            <span>{label}</span>
            <span style={{ color: "var(--df-muted-foreground)" }}>{value[0]}</span>
          </div>
          <Slider
            defaultValue={value}
            min={min}
            max={max}
            step={step}
            aria-label={label}
          />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: { defaultValue: [50], "aria-label": "Playground slider" },
};
