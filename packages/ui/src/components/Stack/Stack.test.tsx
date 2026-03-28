import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders a div with flex class", () => {
    const { container } = render(<Stack>content</Stack>);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("defaults to vertical direction (flex-col)", () => {
    const { container } = render(<Stack>content</Stack>);
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("defaults to gap=4", () => {
    const { container } = render(<Stack>content</Stack>);
    expect(container.firstChild).toHaveClass("gap-4");
  });

  it("applies direction=horizontal (flex-row)", () => {
    const { container } = render(
      <Stack direction="horizontal">content</Stack>
    );
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("applies custom gap", () => {
    const { container } = render(<Stack gap="8">content</Stack>);
    expect(container.firstChild).toHaveClass("gap-8");
  });

  it("applies align=center", () => {
    const { container } = render(<Stack align="center">content</Stack>);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("applies justify=between", () => {
    const { container } = render(<Stack justify="between">content</Stack>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("applies wrap=true", () => {
    const { container } = render(<Stack wrap>content</Stack>);
    expect(container.firstChild).toHaveClass("flex-wrap");
  });

  it("merges consumer className", () => {
    const { container } = render(
      <Stack className="p-4 rounded-lg">content</Stack>
    );
    expect(container.firstChild).toHaveClass("p-4", "rounded-lg");
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Stack ref={(node) => { el = node; }}>content</Stack>);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack gap="4">
        <p>Item one</p>
        <p>Item two</p>
        <p>Item three</p>
      </Stack>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
