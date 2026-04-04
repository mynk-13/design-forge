import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
    showIcon: { control: "boolean" },
  },
  args: { variant: "default", showIcon: true },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>Your session expires in 30 minutes. Save your work.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>Your subscription has been updated. Receipt sent to jane@example.com.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTitle>Deprecation notice</AlertTitle>
      <AlertDescription>
        This API will be removed in v2.0. Migrate to{" "}
        <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>/api/v2/generate</code>{" "}
        before January 2027.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Failed to process your request. Please try again or contact support.</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>New feature available</AlertTitle>
      <AlertDescription>The AI generator now supports TypeScript generics and custom design tokens.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Your session expires in 30 minutes.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This action may have unintended side effects.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to connect to the server. Check your network.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new version of the component library is available.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert showIcon={false}>
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>This alert renders without the leading icon.</AlertDescription>
      </Alert>
      <Alert variant="destructive" showIcon={false}>
        <AlertTitle>No icon — destructive</AlertTitle>
        <AlertDescription>Same layout, no icon prefix.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>Deployment successful — all 3 services updated.</AlertTitle>
    </Alert>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>This is the alert description — change the variant and showIcon controls above.</AlertDescription>
    </Alert>
  ),
  args: { variant: "default", showIcon: true },
};
