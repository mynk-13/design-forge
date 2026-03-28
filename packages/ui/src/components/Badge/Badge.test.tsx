import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant (bg-primary)", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("applies secondary variant", () => {
    const { container } = render(<Badge variant="secondary">Beta</Badge>);
    expect(container.firstChild).toHaveClass("bg-secondary");
  });

  it("applies destructive variant", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("applies outline variant", () => {
    const { container } = render(<Badge variant="outline">Draft</Badge>);
    expect(container.firstChild).toHaveClass("text-foreground");
  });

  it("merges consumer className", () => {
    const { container } = render(<Badge className="custom">Tag</Badge>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Badge>Published</Badge>
        <Badge variant="destructive">Deprecated</Badge>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
