import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with role=slider", () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders two thumbs for range mode", () => {
    render(<Slider defaultValue={[20, 80]} aria-label="Price range" />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("reflects default value in aria-valuenow", () => {
    render(<Slider defaultValue={[42]} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "42");
  });

  it("forwards ref", () => {
    let el: HTMLSpanElement | null = null;
    render(<Slider defaultValue={[0]} aria-label="Vol" ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no accessibility violations", async () => {
    // Radix Slider forwards aria-label to each thumb element (role=slider)
    // aria-labelledby is NOT forwarded — use aria-label instead
    const { container } = render(
      <Slider defaultValue={[50]} aria-label="Volume" max={100} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
