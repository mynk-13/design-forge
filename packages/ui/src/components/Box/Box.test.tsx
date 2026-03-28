import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a div by default", () => {
    const { container } = render(<Box>content</Box>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as a custom element via `as` prop", () => {
    render(<Box as="section" data-testid="box">content</Box>);
    expect(screen.getByTestId("box").nodeName).toBe("SECTION");
  });

  it("renders as main element", () => {
    render(<Box as="main" data-testid="box">content</Box>);
    expect(screen.getByTestId("box").nodeName).toBe("MAIN");
  });

  it("merges className correctly", () => {
    const { container } = render(
      <Box className="custom-class p-4">content</Box>
    );
    expect(container.firstChild).toHaveClass("custom-class", "p-4");
  });

  it("resolves Tailwind class conflicts via tailwind-merge", () => {
    const { container } = render(
      <Box className="px-2 px-4">content</Box>
    );
    // tailwind-merge resolves: px-4 wins (last)
    expect(container.firstChild).toHaveClass("px-4");
    expect(container.firstChild).not.toHaveClass("px-2");
  });

  it("forwards ref to the DOM element", () => {
    let el: HTMLElement | null = null;
    render(<Box ref={(node) => { el = node; }}>content</Box>);
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it("spreads additional HTML attributes", () => {
    render(<Box data-testid="box" id="main-box" role="region">content</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveAttribute("id", "main-box");
    expect(el).toHaveAttribute("role", "region");
  });

  it("renders children correctly", () => {
    render(<Box><span>child</span></Box>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Box role="region" aria-label="content region">
        <p>Accessible content</p>
      </Box>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
