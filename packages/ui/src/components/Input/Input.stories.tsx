import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Lock, Search, User, Eye } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Email", type: "email", placeholder: "you@example.com" },
};

export const WithDescription: Story = {
  args: {
    label: "Username",
    description: "Lowercase letters and numbers only.",
    placeholder: "jane_doe",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters.",
    defaultValue: "123",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    leftIcon: <Search className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    rightIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    leftIcon: <Lock className="h-4 w-4" />,
    rightIcon: <Eye className="h-4 w-4" />,
    description: "Min 8 characters, 1 uppercase, 1 number.",
  },
};

export const Disabled: Story = {
  args: { label: "Read only field", defaultValue: "Cannot be changed", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 360 }}>
      <Input label="Default" placeholder="Type something…" />
      <Input label="With description" placeholder="jane_doe" description="Lowercase letters only." />
      <Input
        label="With error"
        type="email"
        defaultValue="not-an-email"
        error="Please enter a valid email address."
      />
      <Input label="Disabled" defaultValue="Cannot be changed" disabled />
      <Input
        label="With icons"
        placeholder="Search…"
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={<User className="h-4 w-4" />}
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    description: "",
    error: "",
    type: "text",
    disabled: false,
  },
};
