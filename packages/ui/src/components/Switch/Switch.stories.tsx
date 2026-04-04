import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Label } from "../Label/Label";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-default" {...args} />
      <Label htmlFor="sw-default">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-on" defaultChecked />
      <Label htmlFor="sw-on">Notifications enabled</Label>
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

export const SettingsGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 320 }}>
      {[
        { id: "emails", label: "Email notifications", description: "Receive emails about activity.", defaultChecked: true },
        { id: "push", label: "Push notifications", description: "Get push alerts on mobile." },
        { id: "sms", label: "SMS alerts", description: "Receive texts for critical events.", defaultChecked: true },
        { id: "marketing", label: "Marketing emails", description: "Product updates and offers.", disabled: true },
      ].map(({ id, label, description, defaultChecked, disabled }) => (
        <div key={id} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <Label htmlFor={id} style={disabled ? { opacity: 0.5 } : undefined}>{label}</Label>
            <p style={{ fontSize: "0.75rem", color: "var(--df-muted-foreground)", margin: "0.25rem 0 0" }}>
              {description}
            </p>
          </div>
          <Switch id={id} defaultChecked={defaultChecked} disabled={disabled} />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch id="sw-play" {...args} />
      <Label htmlFor="sw-play">Toggle feature</Label>
    </div>
  ),
  args: { disabled: false, defaultChecked: false },
};
