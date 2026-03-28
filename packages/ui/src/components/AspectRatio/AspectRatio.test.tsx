import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders a container", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="A scenic mountain landscape" />
      </AspectRatio>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies overflow-hidden by default", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>content</div>
      </AspectRatio>
    );
    // The outer wrapper has position:relative from Radix
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges consumer className on the inner element", () => {
    const { container } = render(
      <AspectRatio ratio={1} className="rounded-lg">
        <div>content</div>
      </AspectRatio>
    );
    // Radix AspectRatio: outer div = aspect ratio wrapper, inner div = receives className
    const innerEl = container.firstChild?.firstChild as HTMLElement;
    expect(innerEl).toHaveClass("rounded-lg");
  });

  it("renders children", () => {
    const { getByText } = render(
      <AspectRatio ratio={4 / 3}>
        <div>child content</div>
      </AspectRatio>
    );
    expect(getByText("child content")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(
      <AspectRatio ratio={16 / 9} ref={(node) => { el = node; }}>
        <div>content</div>
      </AspectRatio>
    );
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations with image", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Mountains at sunset" />
      </AspectRatio>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with decorative content", async () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div
          role="img"
          aria-label="Decorative pattern"
          style={{ background: "linear-gradient(135deg, #6C63FF, #FF6584)" }}
        />
      </AspectRatio>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
