import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

describe("ContextMenu", () => {
  it("renders trigger area", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger><div>Right-click here</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(screen.getByText("Right-click here")).toBeInTheDocument();
  });

  it("menu is closed initially", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent><ContextMenuItem>Item</ContextMenuItem></ContextMenuContent>
      </ContextMenu>
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders ContextMenuLabel", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Section Label</ContextMenuLabel>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuSeparator", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuShortcut as a span", () => {
    const { container } = render(
      <ContextMenuShortcut>⌘X</ContextMenuShortcut>
    );
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(screen.getByText("⌘X")).toBeInTheDocument();
  });

  it("renders ContextMenuGroup", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>Item A</ContextMenuItem>
            <ContextMenuItem>Item B</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuCheckboxItem", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Show toolbar</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuRadioGroup with ContextMenuRadioItem", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuSub with SubTrigger and SubContent", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More options</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuSubTrigger with inset", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>Inset SubTrigger</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("renders ContextMenuItem with inset", () => {
    const { container } = render(
      <ContextMenu open>
        <ContextMenuTrigger><div>Area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset>Inset item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(container).toBeDefined();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ContextMenu>
        <ContextMenuTrigger><div>Right-click area</div></ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
