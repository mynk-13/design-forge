import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

describe("Popover", () => {
  it("renders trigger", () => {
    render(
      <Popover>
        <PopoverTrigger asChild><button>Open</button></PopoverTrigger>
        <PopoverContent>Content here</PopoverContent>
      </Popover>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("shows content when trigger is clicked", async () => {
    render(
      <Popover>
        <PopoverTrigger asChild><button>Open</button></PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger asChild><button>Filter options</button></PopoverTrigger>
        <PopoverContent>Filter controls</PopoverContent>
      </Popover>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
