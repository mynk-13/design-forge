import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./Toast";
import { Button } from "../Button/Button";

const meta: Meta = { title: "Feedback/Toast", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
        <ToastAction altText="Undo this action">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast open variant="destructive">
        <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
        <ToastDescription>There was a problem with your request.</ToastDescription>
        <ToastAction altText="Try again">Try again</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <ToastProvider>
        <Button variant="outline">Show Toast</Button>
        <ToastViewport />
      </ToastProvider>
      <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
        (Use a useToast hook in production for imperative API)
      </p>
    </div>
  ),
};
