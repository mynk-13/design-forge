import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label/Label";

const meta: Meta<typeof RadioGroup> = { title: "Form/RadioGroup", component: RadioGroup, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="email" aria-label="Contact method">
      {[{ id: "email", label: "Email" }, { id: "sms", label: "SMS" }, { id: "push", label: "Push notification" }].map(({ id, label }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`s-${id}`} />
          <Label htmlFor={`s-${id}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="yes" aria-label="Response" style={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}>
      {[{ id: "yes", label: "Yes" }, { id: "no", label: "No" }, { id: "maybe", label: "Maybe" }].map(({ id, label }) => (
        <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RadioGroupItem value={id} id={`h-${id}`} />
          <Label htmlFor={`h-${id}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
