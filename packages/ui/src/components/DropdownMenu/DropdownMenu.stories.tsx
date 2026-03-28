import type { Meta, StoryObj } from "@storybook/react";
import { Cloud, CreditCard, Github, Keyboard, LifeBuoy, LogOut, Mail, MessageSquare, Plus, Settings, User, UserPlus } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./DropdownMenu";
import { Button } from "../Button/Button";

const meta: Meta = { title: "Overlay/DropdownMenu", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: "224px" }}>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span><DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span><DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span><DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><Keyboard className="mr-2 h-4 w-4" /><span>Keyboard shortcuts</span><DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger><UserPlus className="mr-2 h-4 w-4" /><span>Invite users</span></DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /><span>Email</span></DropdownMenuItem>
                <DropdownMenuItem><MessageSquare className="mr-2 h-4 w-4" /><span>Message</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Plus className="mr-2 h-4 w-4" /><span>More…</span></DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Github className="mr-2 h-4 w-4" /><span>GitHub</span></DropdownMenuItem>
        <DropdownMenuItem><LifeBuoy className="mr-2 h-4 w-4" /><span>Support</span></DropdownMenuItem>
        <DropdownMenuItem disabled><Cloud className="mr-2 h-4 w-4" /><span>API (disabled)</span></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span><DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">View options</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Show toolbar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show status bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={false}>Show activity bar</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
