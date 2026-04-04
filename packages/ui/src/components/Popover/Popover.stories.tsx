import type { Meta, StoryObj } from "@storybook/react";
import { Settings, Calendar, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Switch } from "../Switch/Switch";
import { Label } from "../Label/Label";

const meta: Meta = {
  title: "Overlay/Popover",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>Dimensions</p>
          <Input label="Width" defaultValue="100px" />
          <Input label="Height" defaultValue="25px" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open settings">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>Appearance</p>
          {[
            { id: "compact", label: "Compact mode" },
            { id: "animations", label: "Enable animations", defaultChecked: true },
            { id: "sound", label: "Sound effects" },
          ].map(({ id, label, defaultChecked }) => (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label htmlFor={id} style={{ fontSize: "0.875rem" }}>{label}</Label>
              <Switch id={id} defaultChecked={defaultChecked} />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DatePickerStyle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 200, justifyContent: "flex-start" }}>
          <Calendar className="mr-2 h-4 w-4" />
          Pick a date
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ textAlign: "center", padding: "0.5rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>April 2026</p>
          <p style={{ fontSize: "0.75rem", color: "hsl(var(--df-muted-foreground))" }}>
            Calendar widget would render here
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const FilterPanel: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-3.5 w-3.5" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>Filter results</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["Active", "Pending", "Archived"].map((status) => (
              <label key={status} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked={status === "Active"} />
                {status}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid hsl(var(--df-border))" }}>
            <Button variant="ghost" size="sm">Reset</Button>
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <p style={{ fontSize: "0.875rem" }}>Popover on the {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
