import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label/Label";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Checkbox id="indeterminate" checked="indeterminate" />
      <Label htmlFor="indeterminate">Indeterminate (partial selection)</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Checkbox id="d1" disabled />
        <Label htmlFor="d1" style={{ opacity: 0.5 }}>Disabled unchecked</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Checkbox id="d2" disabled defaultChecked />
        <Label htmlFor="d2" style={{ opacity: 0.5 }}>Disabled checked</Label>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
      <legend style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.875rem" }}>
        Notifications
      </legend>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[
          { id: "email", label: "Email notifications" },
          { id: "sms", label: "SMS notifications" },
          { id: "push", label: "Push notifications" },
          { id: "weekly", label: "Weekly digest", disabled: true },
        ].map(({ id, label, disabled }) => (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Checkbox id={id} defaultChecked={id === "email"} disabled={disabled} />
            <Label htmlFor={id} style={disabled ? { opacity: 0.5 } : undefined}>
              {label}
            </Label>
          </div>
        ))}
      </div>
    </fieldset>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {[
        { id: "s1", label: "Unchecked" },
        { id: "s2", label: "Checked", defaultChecked: true },
        { id: "s3", label: "Indeterminate", checked: "indeterminate" as const },
        { id: "s4", label: "Disabled unchecked", disabled: true },
        { id: "s5", label: "Disabled checked", disabled: true, defaultChecked: true },
      ].map(({ id, label, ...props }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Checkbox id={id} {...props} />
          <Label htmlFor={id} style={props.disabled ? { opacity: 0.5 } : undefined}>
            {label}
          </Label>
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Checkbox id="playground" {...args} />
      <Label htmlFor="playground">Checkbox label</Label>
    </div>
  ),
  args: { disabled: false },
};
