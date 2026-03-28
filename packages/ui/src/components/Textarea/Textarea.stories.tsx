import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = { title: "Form/Textarea", component: Textarea, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Message", placeholder: "Type your message…" } };
export const WithDescription: Story = { args: { label: "Bio", description: "Tell us about yourself.", placeholder: "I'm a developer who loves…" } };
export const WithError: Story = { args: { label: "Comment", error: "Comment cannot be empty.", value: "" } };
export const WithCharacterCount: Story = { args: { label: "Tweet", showCount: true, maxLength: 280, placeholder: "What's happening?" } };
export const Disabled: Story = { args: { label: "Read-only notes", value: "These notes cannot be edited.", disabled: true } };
