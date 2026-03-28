import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

describe("HoverCard", () => {
  it("renders trigger", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild><a href="/profile">@username</a></HoverCardTrigger>
        <HoverCardContent>Profile info</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <HoverCard>
        <HoverCardTrigger asChild><a href="/user">@jane_doe</a></HoverCardTrigger>
        <HoverCardContent>Jane Doe — Frontend Engineer</HoverCardContent>
      </HoverCard>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
