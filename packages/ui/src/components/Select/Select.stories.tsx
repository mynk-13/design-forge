import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta: Meta = {
  title: "Form/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue placeholder="Select a fruit…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: 240 }}>
        <SelectValue placeholder="Select a timezone…" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (UTC-5)</SelectItem>
          <SelectItem value="cst">Central (UTC-6)</SelectItem>
          <SelectItem value="mst">Mountain (UTC-7)</SelectItem>
          <SelectItem value="pst">Pacific (UTC-8)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
          <SelectItem value="cet">Central European (UTC+1)</SelectItem>
          <SelectItem value="eet">Eastern European (UTC+2)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India (UTC+5:30)</SelectItem>
          <SelectItem value="jst">Japan (UTC+9)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithPreselectedValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue placeholder="Select a plan…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro — $9/mo</SelectItem>
        <SelectItem value="enterprise" disabled>Enterprise — Contact sales</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger style={{ width: 220 }}>
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const InForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 320 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }} htmlFor="country">Country</label>
        <Select>
          <SelectTrigger id="country" style={{ width: "100%" }}>
            <SelectValue placeholder="Select your country…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="in">India</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }} htmlFor="role">Role</label>
        <Select defaultValue="viewer">
          <SelectTrigger id="role" style={{ width: "100%" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
