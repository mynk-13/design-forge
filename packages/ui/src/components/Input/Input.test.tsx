import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Email address" />);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("label is associated with input via htmlFor", () => {
    render(<Input label="Username" />);
    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
  });

  it("renders description when provided", () => {
    render(<Input description="We will never share your email" />);
    expect(screen.getByText("We will never share your email")).toBeInTheDocument();
  });

  it("renders error and sets aria-invalid", () => {
    render(<Input error="Email is required" />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("hides description when error is shown", () => {
    render(<Input description="Helper text" error="Error message" />);
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("connects input to error via aria-describedby", () => {
    render(<Input error="Required" />);
    const input = screen.getByRole("textbox");
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Required")).toHaveAttribute("id", errorId ?? "");
  });

  it("forwards ref", () => {
    let el: HTMLInputElement | null = null;
    render(<Input ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLInputElement);
  });

  it("has no accessibility violations (basic)", async () => {
    const { container } = render(<Input label="Search" type="search" placeholder="Search…" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (with error)", async () => {
    const { container } = render(
      <Input label="Email" type="email" error="Please enter a valid email" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
