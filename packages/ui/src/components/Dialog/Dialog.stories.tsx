import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select/Select";
import { Badge } from "../Badge/Badge";

const meta: Meta = {
  title: "Overlay/Dialog",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input label="Name" defaultValue="Jane Doe" />
          <Input label="Email" type="email" defaultValue="jane@example.com" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all
            data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Add a new project to your workspace. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input label="Project name" placeholder="My awesome project" />
          <Input label="Repository URL" placeholder="https://github.com/…" type="url" />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label htmlFor="visibility-select" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Visibility</label>
            <Select defaultValue="private">
              <SelectTrigger id="visibility-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const InformationOnly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Release notes — v1.0.0{" "}
            <Badge variant="success" style={{ marginLeft: "0.5rem" }}>Latest</Badge>
          </DialogTitle>
          <DialogDescription>
            What&apos;s new in DesignForge v1.0.0
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
          <div>
            <p style={{ fontWeight: 600 }}>New features</p>
            <ul style={{ margin: "0.5rem 0 0 1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <li>33 production-ready components</li>
              <li>AI component generator</li>
              <li>Monaco playground with URL sharing</li>
              <li>Full dark mode support</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>Bug fixes</p>
            <ul style={{ margin: "0.5rem 0 0 1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <li>Fixed focus trap in Dialog on mobile Safari</li>
              <li>Improved keyboard navigation in DataTable</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms of service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read these terms carefully before using DesignForge.
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            overflowY: "auto",
            maxHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "0.875rem",
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>
              <p style={{ fontWeight: 600 }}>Section {i + 1}</p>
              <p style={{ color: "hsl(var(--df-muted-foreground))", lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
