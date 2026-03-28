import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./Toast";

const TestToast = ({ open = true }: { open?: boolean }) => (
  <ToastProvider>
    <Toast open={open}>
      <ToastTitle>Success</ToastTitle>
      <ToastDescription>Your changes have been saved.</ToastDescription>
    </Toast>
    <ToastViewport />
  </ToastProvider>
);

describe("Toast", () => {
  it("renders title and description when open", () => {
    render(<TestToast open />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
  });

  it("has no accessibility violations when visible", async () => {
    const { baseElement } = render(<TestToast open />);
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
