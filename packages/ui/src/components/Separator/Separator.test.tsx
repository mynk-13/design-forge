import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders with role=separator by default (non-decorative)", () => {
    const { getByRole } = render(<Separator />);
    expect(getByRole("separator")).toBeInTheDocument();
  });

  it("renders with role=none when decorative=true", () => {
    const { queryByRole, container } = render(<Separator decorative />);
    expect(queryByRole("separator")).not.toBeInTheDocument();
    // decorative renders as div without role
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies horizontal classes by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("h-px", "w-full");
  });

  it("applies vertical classes when orientation=vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("h-full", "w-px");
  });

  it("always has bg-border class", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("bg-border");
  });

  it("merges consumer className", () => {
    const { container } = render(
      <Separator className="my-4" />
    );
    expect(container.firstChild).toHaveClass("my-4", "h-px");
  });

  it("does not explicitly set aria-orientation for horizontal (implicit per ARIA spec)", () => {
    const { getByRole } = render(<Separator />);
    // Radix correctly omits aria-orientation for horizontal — it is the implicit default
    // per WAI-ARIA spec for role=separator
    expect(getByRole("separator")).not.toHaveAttribute("aria-orientation");
  });

  it("sets aria-orientation=vertical", () => {
    const { getByRole } = render(<Separator orientation="vertical" />);
    expect(getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Separator ref={(node) => { el = node; }} />);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations (non-decorative)", async () => {
    const { container } = render(
      <div>
        <p>Above separator</p>
        <Separator />
        <p>Below separator</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations (decorative)", async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Separator decorative />
        <p>Below</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
