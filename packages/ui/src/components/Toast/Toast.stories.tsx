import type { Meta, StoryObj } from "@storybook/react";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";

const meta: Meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 120, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

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

export const TitleOnly: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <ToastTitle>File saved successfully.</ToastTitle>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <ToastTitle>Deployment started</ToastTitle>
          <ToastDescription>
            Your changes are being deployed to production. This may take a few minutes.
          </ToastDescription>
        </div>
        <ToastAction altText="View deployment logs">View logs</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", maxWidth: 420 }}>
        <Toast open style={{ position: "relative", transform: "none" }}>
          <ToastTitle>Default toast</ToastTitle>
          <ToastDescription>Your action was completed successfully.</ToastDescription>
          <ToastClose />
        </Toast>
        <Toast open variant="destructive" style={{ position: "relative", transform: "none" }}>
          <ToastTitle>Destructive toast</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
          <ToastAction altText="Retry">Retry</ToastAction>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};
