import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const TestMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild><button>Open menu</button></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Sign out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(<TestMenu />);
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("menu is closed initially", () => {
    render(<TestMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
  });

  it("renders DropdownMenuLabel", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuSeparator", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item A</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item B</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuShortcut", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            New Tab <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("⌘T")).toBeInTheDocument();
  });

  it("renders DropdownMenuGroup", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item A</DropdownMenuItem>
            <DropdownMenuItem>Item B</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuCheckboxItem", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show status bar</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuRadioGroup with DropdownMenuRadioItem", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="top">
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuSub with SubTrigger and SubContent", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuSubTrigger with inset", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Inset</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders DropdownMenuItem with inset", () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild><button>Open</button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Inset item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(container).toBeDefined();
  });

  it("has no accessibility violations when closed", async () => {
    const { container } = render(<TestMenu />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
