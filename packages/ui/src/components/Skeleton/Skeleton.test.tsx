import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("is aria-hidden", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies animate-pulse", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("applies text variant", () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass("h-4", "w-full", "rounded");
  });

  it("applies circular variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Skeleton className="h-10 w-full" />
        <Skeleton variant="text" className="mt-2" />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
