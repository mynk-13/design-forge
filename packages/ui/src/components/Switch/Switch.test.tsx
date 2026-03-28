import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with role=switch", () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Switch aria-label="Enable" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles on click", async () => {
    render(<Switch aria-label="Enable" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange", async () => {
    const onChange = vi.fn();
    render(<Switch aria-label="Enable" onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop set", () => {
    render(<Switch aria-label="Enable" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("forwards ref", () => {
    let el: HTMLButtonElement | null = null;
    render(<Switch aria-label="Enable" ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Switch id="sw" />
        <label htmlFor="sw">Dark mode</label>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
