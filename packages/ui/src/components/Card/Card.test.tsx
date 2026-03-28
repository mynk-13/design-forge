import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const FullCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Card description text</CardDescription>
    </CardHeader>
    <CardContent><p>Card body content</p></CardContent>
    <CardFooter><p>Card footer</p></CardFooter>
  </Card>
);

describe("Card", () => {
  it("renders all sub-components", () => {
    render(<FullCard />);
    expect(screen.getByText("Card title")).toBeInTheDocument();
    expect(screen.getByText("Card description text")).toBeInTheDocument();
    expect(screen.getByText("Card body content")).toBeInTheDocument();
    expect(screen.getByText("Card footer")).toBeInTheDocument();
  });

  it("applies base classes", () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass("rounded-lg", "border", "bg-card");
  });

  it("title renders as h3", () => {
    render(<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("forwards ref", () => {
    let el: HTMLDivElement | null = null;
    render(<Card ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FullCard />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
