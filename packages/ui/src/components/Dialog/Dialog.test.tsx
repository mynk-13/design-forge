import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";

const TestDialog = ({ open }: { open?: boolean }) => (
  <Dialog {...(open !== undefined ? { open } : {})}>
    <DialogTrigger asChild>
      <button>Open dialog</button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>Are you sure you want to proceed?</DialogDescription>
    </DialogContent>
  </Dialog>
);

describe("Dialog", () => {
  it("does not show content when closed", () => {
    render(<TestDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(<TestDialog open />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows title and description when open", () => {
    render(<TestDialog open />);
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on close button click", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const { container, baseElement } = render(<TestDialog open />);
    expect(await axe(baseElement ?? container)).toHaveNoViolations();
  });
});
