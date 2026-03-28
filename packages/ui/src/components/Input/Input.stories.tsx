import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Lock, Search } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Email", type: "email", placeholder: "you@example.com" } };
export const WithDescription: Story = { args: { label: "Username", description: "Lowercase letters and numbers only.", placeholder: "jane_doe" } };
export const WithError: Story = { args: { label: "Password", type: "password", error: "Password must be at least 8 characters.", value: "123" } };
export const WithLeftIcon: Story = { args: { label: "Search", placeholder: "Search…", leftIcon: <Search className="h-4 w-4" /> } };
export const WithRightIcon: Story = { args: { label: "Email", type: "email", placeholder: "you@example.com", rightIcon: <Mail className="h-4 w-4" /> } };
export const Password: Story = { args: { label: "Password", type: "password", leftIcon: <Lock className="h-4 w-4" />, description: "Min 8 characters, 1 uppercase, 1 number." } };
export const Disabled: Story = { args: { label: "Read only field", value: "Cannot be changed", disabled: true } };
