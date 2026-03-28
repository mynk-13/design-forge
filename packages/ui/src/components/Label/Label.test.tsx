import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Label } from "./Label";

describe("Label", () => {
  it("renders a label element", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email").tagName).toBe("LABEL");
  });

  it("associates with a control via htmlFor", () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </div>
    );
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("merges className", () => {
    const { container } = render(<Label className="custom">Label</Label>);
    expect(container.firstChild).toHaveClass("custom", "text-sm");
  });

  it("forwards ref", () => {
    let el: HTMLLabelElement | null = null;
    render(<Label ref={(n) => { el = n; }}>Label</Label>);
    expect(el).toBeInstanceOf(HTMLLabelElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="name">Full name</Label>
        <input id="name" type="text" />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
