import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

const meta: Meta<typeof Alert> = { title: "Feedback/Alert", component: Alert, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>Your session expires in 30 minutes. Save your work.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>Your subscription has been updated successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Deprecation notice</AlertTitle>
        <AlertDescription>This API will be removed in v2.0. Migrate to the new endpoint.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>Failed to process your request. Please try again.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>The AI generator now supports TypeScript generics.</AlertDescription>
      </Alert>
    </div>
  ),
};
