import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = { title: "Data Display/Avatar", component: Avatar, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = { render: () => <Avatar><AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="GitHub user" /><AvatarFallback>GH</AvatarFallback></Avatar> };
export const WithFallback: Story = { render: () => <Avatar><AvatarImage src="broken-url.jpg" alt="User" /><AvatarFallback>JD</AvatarFallback></Avatar> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}><AvatarFallback>AB</AvatarFallback></Avatar>
      ))}
    </div>
  ),
};
