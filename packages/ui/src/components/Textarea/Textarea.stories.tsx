import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    showCount: { control: "boolean" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
    maxLength: { control: "number" },
  },
  args: {
    label: "Message",
    placeholder: "Write your message here…",
    disabled: false,
    showCount: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Bio", placeholder: "Tell us about yourself…" },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    description: "A brief description of yourself. Max 200 characters.",
    placeholder: "Tell us about yourself…",
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    error: "Message must be at least 10 characters.",
    defaultValue: "Hi",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Tweet",
    placeholder: "What's happening?",
    showCount: true,
    maxLength: 280,
  },
};

export const CharacterCountNearLimit: Story = {
  args: {
    label: "Tweet",
    showCount: true,
    maxLength: 280,
    defaultValue:
      "This is a sample tweet that is getting close to the character limit. It shows the counter working as expected when you have substantial content in the textarea field that you are composing.",
  },
};

export const Disabled: Story = {
  args: { label: "Notes", defaultValue: "This field cannot be edited.", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 400 }}>
      <Textarea label="Default" placeholder="Write your message here…" />
      <Textarea
        label="With description"
        description="A short bio. Shown on your public profile."
        placeholder="Tell us about yourself…"
      />
      <Textarea
        label="With error"
        error="Message must be at least 10 characters."
        defaultValue="Hi"
      />
      <Textarea
        label="With character count"
        placeholder="What's happening?"
        showCount
        maxLength={280}
      />
      <Textarea label="Disabled" defaultValue="Cannot be edited." disabled />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message here…",
    description: "",
    error: "",
    showCount: false,
    disabled: false,
  },
};
