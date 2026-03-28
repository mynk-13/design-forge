import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label and associates it", () => {
    render(<Textarea label="Message" />);
    const label = screen.getByText("Message");
    const ta = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", ta.getAttribute("id"));
  });

  it("renders description", () => {
    render(<Textarea description="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("shows error and sets aria-invalid", () => {
    render(<Textarea error="Message is required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("shows character count when showCount=true", () => {
    render(<Textarea showCount maxLength={200} value="Hello" onChange={() => undefined} />);
    expect(screen.getByText("5/200")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    let el: HTMLTextAreaElement | null = null;
    render(<Textarea ref={(n) => { el = n; }} />);
    expect(el).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Textarea label="Feedback" description="Tell us what you think." placeholder="Your feedback…" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
