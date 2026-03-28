import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = { title: "Form/Slider", component: Slider, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <div style={{ padding: "2rem" }}><Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" /></div> };
export const Range: Story = { render: () => <div style={{ padding: "2rem" }}><Slider defaultValue={[20, 80]} max={100} step={5} aria-label="Price range" /></div> };
export const Steps: Story = { render: () => <div style={{ padding: "2rem" }}><Slider defaultValue={[3]} min={1} max={5} step={1} aria-label="Rating" /></div> };
export const Disabled: Story = { render: () => <div style={{ padding: "2rem" }}><Slider defaultValue={[40]} disabled aria-label="Disabled slider" /></div> };
