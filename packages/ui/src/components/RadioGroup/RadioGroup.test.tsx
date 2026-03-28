import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label/Label";

const TestRadioGroup = ({ onValueChange }: { onValueChange?: (v: string) => void }) => (
  <RadioGroup aria-label="Notification type" {...(onValueChange !== undefined ? { onValueChange } : {})}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <RadioGroupItem value="email" id="r-email" />
      <Label htmlFor="r-email">Email</Label>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <RadioGroupItem value="sms" id="r-sms" />
      <Label htmlFor="r-sms">SMS</Label>
    </div>
  </RadioGroup>
);

describe("RadioGroup", () => {
  it("renders radio buttons", () => {
    render(<TestRadioGroup />);
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("selects item on click", async () => {
    render(<TestRadioGroup />);
    await userEvent.click(screen.getByLabelText("Email"));
    expect(screen.getByLabelText("Email")).toBeChecked();
  });

  it("calls onValueChange when selection changes", async () => {
    const onChange = vi.fn();
    render(<TestRadioGroup onValueChange={onChange} />);
    await userEvent.click(screen.getByLabelText("SMS"));
    expect(onChange).toHaveBeenCalledWith("sms");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TestRadioGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
