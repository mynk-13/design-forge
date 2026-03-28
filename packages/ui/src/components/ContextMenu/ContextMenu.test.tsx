import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ContextMenu";

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
