import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback when image has no src", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies size=lg class", () => {
    const { container } = render(
      <Avatar size="lg"><AvatarFallback>AB</AvatarFallback></Avatar>
    );
    expect(container.firstChild).toHaveClass("h-14", "w-14");
  });

  it("applies size=sm class", () => {
    const { container } = render(
      <Avatar size="sm"><AvatarFallback>AB</AvatarFallback></Avatar>
    );
    expect(container.firstChild).toHaveClass("h-8", "w-8");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
