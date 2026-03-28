import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders a div with grid class", () => {
    const { container } = render(<Grid>content</Grid>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("applies cols=3", () => {
    const { container } = render(<Grid cols={3}>content</Grid>);
    expect(container.firstChild).toHaveClass("grid-cols-3");
  });

  it("applies cols=12", () => {
    const { container } = render(<Grid cols={12}>content</Grid>);
    expect(container.firstChild).toHaveClass("grid-cols-12");
  });

  it("applies rows=2", () => {
    const { container } = render(<Grid rows={2}>content</Grid>);
    expect(container.firstChild).toHaveClass("grid-rows-2");
  });

  it("applies gap=4", () => {
    const { container } = render(<Grid gap="4">content</Grid>);
    expect(container.firstChild).toHaveClass("gap-4");
  });

  it("applies gapX and gapY independently", () => {
    const { container } = render(<Grid gapX="6" gapY="2">content</Grid>);
    expect(container.firstChild).toHaveClass("gap-x-6", "gap-y-2");
  });

  it("applies align=center", () => {
    const { container } = render(<Grid align="center">content</Grid>);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("applies flow=col-dense", () => {
    const { container } = render(<Grid flow="col-dense">content</Grid>);
    expect(container.firstChild).toHaveClass("grid-flow-col-dense");
  });

  it("merges consumer className", () => {
    const { container } = render(
      <Grid cols={2} className="p-6">content</Grid>
    );
    expect(container.firstChild).toHaveClass("grid", "grid-cols-2", "p-6");
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Grid ref={(node) => { el = node; }}>content</Grid>);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid cols={3} gap="4">
        <div>Cell 1</div>
        <div>Cell 2</div>
        <div>Cell 3</div>
      </Grid>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
