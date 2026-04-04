import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label/Label";

const meta: Meta<typeof RadioGroup> = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    orientation: { control: "radio", options: ["vertical", "horizontal"] },
    defaultValue: { control: "text" },
  },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj<typeof meta>;

const notificationOptions = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "push", label: "Push notification" },
];

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="email" aria-label="Contact method" {...args}>
      {notificationOptions.map(({ id, label }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`v-${id}`} />
          <Label htmlFor={`v-${id}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      defaultValue="yes"
      aria-label="Response"
      style={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}
    >
      {[
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
        { id: "maybe", label: "Maybe" },
      ].map(({ id, label }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`h-${id}`} />
          <Label htmlFor={`h-${id}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="email" aria-label="Contact method (disabled)" disabled>
      {notificationOptions.map(({ id, label }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`d-${id}`} />
          <Label htmlFor={`d-${id}`} style={{ opacity: 0.5 }}>
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <RadioGroup defaultValue="personal" aria-label="Plan">
      {[
        { id: "personal", label: "Personal — Free" },
        { id: "pro", label: "Pro — $9/mo" },
        { id: "enterprise", label: "Enterprise — Contact sales", disabled: true },
      ].map(({ id, label, disabled }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`plan-${id}`} disabled={disabled} />
          <Label htmlFor={`plan-${id}`} style={disabled ? { opacity: 0.5 } : undefined}>
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1" aria-label="Options" {...args}>
      {["option1", "option2", "option3"].map((id) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`p-${id}`} />
          <Label htmlFor={`p-${id}`}>{id}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
  args: { disabled: false },
};
