import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders with role=banner", () => {
    render(<Banner>Maintenance window tonight.</Banner>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Banner>Important notice here</Banner>);
    expect(screen.getByText("Important notice here")).toBeInTheDocument();
  });

  it("shows dismiss button when dismissible=true", () => {
    render(<Banner>Notice</Banner>);
    expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
  });

  it("hides when dismiss button is clicked", async () => {
    render(<Banner>Notice</Banner>);
    await userEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  it("does not show dismiss button when dismissible=false", () => {
    render(<Banner dismissible={false}>Persistent banner</Banner>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("persists dismiss to localStorage when storageKey provided", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<Banner storageKey="test-banner">Notice</Banner>);
    await userEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(setItem).toHaveBeenCalledWith("banner-dismissed-test-banner", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Banner>New version available. <a href="/changelog">See what&apos;s new →</a></Banner>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
