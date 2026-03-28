import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a button element", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("border", "bg-background");
  });

  it("applies destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("applies ghost variant", () => {
    render(<Button variant="ghost">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
  });

  it("applies link variant", () => {
    render(<Button variant="link">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-primary", "underline-offset-4");
  });

  it("applies size=sm", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-9", "px-3", "text-xs");
  });

  it("applies size=lg", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-11", "px-8");
  });

  it("applies size=icon", () => {
    render(<Button size="icon" aria-label="Close">×</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10", "w-10");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled and shows spinner when loading", () => {
    render(<Button loading>Saving</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as anchor with asChild", () => {
    render(
      <Button asChild>
        <a href="/home">Go home</a>
      </Button>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveClass("bg-primary");
  });

  it("forwards ref", () => {
    let el: HTMLButtonElement | null = null;
    render(<Button ref={(n) => { el = n; }}>Click</Button>);
    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Button>Submit form</Button>
        <Button variant="outline">Cancel</Button>
        <Button disabled>Unavailable</Button>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
