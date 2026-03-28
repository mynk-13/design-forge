import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

const TestSelect = ({ label = "Choose option" }: { label?: string }) => (
  <Select>
    <SelectTrigger aria-label={label}>
      <SelectValue placeholder="Select…" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </SelectContent>
  </Select>
);

describe("Select", () => {
  it("renders the trigger button", () => {
    render(<TestSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<TestSelect />);
    expect(screen.getByText("Select…")).toBeInTheDocument();
  });

  it("trigger is a button", () => {
    render(<TestSelect />);
    expect(screen.getByRole("combobox").tagName).toBe("BUTTON");
  });

  it("has no accessibility violations (closed)", async () => {
    const { container } = render(<TestSelect label="Fruit selection" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
