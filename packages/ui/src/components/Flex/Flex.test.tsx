import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders a div with flex class by default", () => {
    const { container } = render(<Flex>content</Flex>);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("applies direction=row by default", () => {
    const { container } = render(<Flex>content</Flex>);
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("applies direction=col", () => {
    const { container } = render(<Flex direction="col">content</Flex>);
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("applies align=center", () => {
    const { container } = render(<Flex align="center">content</Flex>);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("applies justify=between", () => {
    const { container } = render(<Flex justify="between">content</Flex>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("applies gap=4", () => {
    const { container } = render(<Flex gap="4">content</Flex>);
    expect(container.firstChild).toHaveClass("gap-4");
  });

  it("applies wrap=wrap", () => {
    const { container } = render(<Flex wrap="wrap">content</Flex>);
    expect(container.firstChild).toHaveClass("flex-wrap");
  });

  it("applies inline=true → inline-flex", () => {
    const { container } = render(<Flex inline>content</Flex>);
    expect(container.firstChild).toHaveClass("inline-flex");
  });

  it("merges consumer className", () => {
    const { container } = render(
      <Flex className="p-4 bg-background">content</Flex>
    );
    expect(container.firstChild).toHaveClass("flex", "p-4", "bg-background");
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Flex ref={(node) => { el = node; }}>content</Flex>);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Flex direction="col" gap="4">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
