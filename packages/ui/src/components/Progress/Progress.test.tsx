import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders with role=progressbar", () => {
    render(<Progress value={50} aria-label="Loading" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("reflects value in aria-valuenow", () => {
    render(<Progress value={75} aria-label="Upload" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("applies size=sm", () => {
    const { container } = render(<Progress value={50} size="sm" />);
    expect(container.firstChild).toHaveClass("h-1.5");
  });

  it("applies size=lg", () => {
    const { container } = render(<Progress value={50} size="lg" />);
    expect(container.firstChild).toHaveClass("h-4");
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Progress value={50} ref={(n) => { el = n; }} aria-label="Progress" />);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Progress value={60} aria-label="File upload progress" aria-valuetext="60% complete" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
