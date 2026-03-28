import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const TestTabs = () => (
  <Tabs defaultValue="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account"><p>Account settings content</p></TabsContent>
    <TabsContent value="password"><p>Password settings content</p></TabsContent>
  </Tabs>
);

describe("Tabs", () => {
  it("renders tab triggers", () => {
    render(<TestTabs />);
    expect(screen.getByRole("tab", { name: "Account" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Password" })).toBeInTheDocument();
  });

  it("shows active tab content", () => {
    render(<TestTabs />);
    expect(screen.getByText("Account settings content")).toBeVisible();
  });

  it("switches tab on click", async () => {
    render(<TestTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByText("Password settings content")).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TestTabs />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
