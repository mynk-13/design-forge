import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Container } from "./Container";

describe("Container", () => {
  it("renders a div with centering classes", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass("mx-auto", "w-full");
  });

  it("applies default size=xl (max-w-screen-xl)", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass("max-w-screen-xl");
  });

  it("applies size=sm", () => {
    const { container } = render(<Container size="sm">content</Container>);
    expect(container.firstChild).toHaveClass("max-w-screen-sm");
  });

  it("applies size=lg", () => {
    const { container } = render(<Container size="lg">content</Container>);
    expect(container.firstChild).toHaveClass("max-w-screen-lg");
  });

  it("applies size=2xl", () => {
    const { container } = render(<Container size="2xl">content</Container>);
    expect(container.firstChild).toHaveClass("max-w-screen-2xl");
  });

  it("applies size=full (no max-width cap)", () => {
    const { container } = render(<Container size="full">content</Container>);
    expect(container.firstChild).toHaveClass("max-w-full");
  });

  it("includes responsive horizontal padding", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass("px-4");
  });

  it("merges consumer className", () => {
    const { container } = render(
      <Container className="py-8">content</Container>
    );
    expect(container.firstChild).toHaveClass("mx-auto", "py-8");
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Container ref={(node) => { el = node; }}>content</Container>);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Container>
        <main><h1>Page Title</h1></main>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
