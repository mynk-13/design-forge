import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "./AlertDialog";

const TestAlertDialog = ({ open }: { open?: boolean }) => (
  <AlertDialog {...(open !== undefined ? { open } : {})}>
    <AlertDialogTrigger asChild><button>Delete</button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogContent>
  </AlertDialog>
);

describe("AlertDialog", () => {
  it("does not show when closed", () => {
    render(<TestAlertDialog />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("shows when open", () => {
    render(<TestAlertDialog open />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(<TestAlertDialog />);
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("cancel button closes the dialog", async () => {
    render(<TestAlertDialog />);
    await userEvent.click(screen.getByText("Delete"));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const { baseElement } = render(<TestAlertDialog open />);
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
