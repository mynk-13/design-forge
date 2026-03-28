import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

describe("Alert", () => {
  it("renders with role=status for default variant", () => {
    render(<Alert><AlertTitle>Info</AlertTitle></Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with role=alert for destructive variant", () => {
    render(<Alert variant="destructive"><AlertTitle>Error</AlertTitle></Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders with role=alert for warning variant", () => {
    render(<Alert variant="warning"><AlertTitle>Warning</AlertTitle></Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>This is an important message.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Heads up!")).toBeInTheDocument();
    expect(screen.getByText("This is an important message.")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Alert><AlertTitle>Information</AlertTitle><AlertDescription>Your session expires in 5 minutes.</AlertDescription></Alert>
        <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Failed to save changes.</AlertDescription></Alert>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
