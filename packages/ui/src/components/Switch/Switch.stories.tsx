import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Label } from "../Label/Label";

const meta: Meta<typeof Switch> = { title: "Form/Switch", component: Switch, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-default" />
      <Label htmlFor="sw-default">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-checked" defaultChecked />
      <Label htmlFor="sw-checked">Notifications enabled</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Switch id="sw-d1" disabled />
        <Label htmlFor="sw-d1" style={{ opacity: 0.5 }}>Disabled off</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Switch id="sw-d2" disabled defaultChecked />
        <Label htmlFor="sw-d2" style={{ opacity: 0.5 }}>Disabled on</Label>
      </div>
    </div>
  ),
};
