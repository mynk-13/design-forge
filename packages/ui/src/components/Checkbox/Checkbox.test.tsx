import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders with role=checkbox", () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox aria-label="Option" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
  });

  it("can be checked", async () => {
    render(<Checkbox aria-label="Option" />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange when toggled", async () => {
    const onChange = vi.fn();
    render(<Checkbox aria-label="Option" onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox aria-label="Option" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    let el: HTMLButtonElement | null = null;
    render(<Checkbox aria-label="Option" ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="cb">Accept terms and conditions</label>
        <Checkbox id="cb" />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
