import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const TestAccordion = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. Uses Radix UI with WAI-ARIA accordion pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>Yes. Uses Tailwind CSS and DesignForge tokens.</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe("Accordion", () => {
  it("renders all triggers", () => {
    render(<TestAccordion />);
    expect(screen.getByText("Is it accessible?")).toBeInTheDocument();
    expect(screen.getByText("Is it styled?")).toBeInTheDocument();
  });

  it("trigger has aria-expanded=false initially", () => {
    render(<TestAccordion />);
    // jsdom has no CSS so toBeVisible() can't detect Radix state-based hiding.
    // Check aria-expanded on the trigger button instead.
    const trigger = screen.getByText("Is it accessible?").closest("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("expands on trigger click", async () => {
    render(<TestAccordion />);
    await userEvent.click(screen.getByText("Is it accessible?"));
    expect(screen.getByText("Yes. Uses Radix UI with WAI-ARIA accordion pattern.")).toBeVisible();
  });

  it("triggers are buttons", () => {
    render(<TestAccordion />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TestAccordion />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
