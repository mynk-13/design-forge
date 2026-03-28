import type { Meta, StoryObj } from "@storybook/react";
import { type ColumnDef, DataTable, SortableHeader } from "./DataTable";
import { Badge } from "../Badge/Badge";
import { Avatar, AvatarFallback } from "../Avatar/Avatar";

const meta: Meta = { title: "Data Display/DataTable", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

type User = { id: number; name: string; email: string; role: string; status: "active" | "inactive" };

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: ["Alice Smith", "Bob Jones", "Carol White", "David Lee", "Emma Clark"][i % 5] ?? `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer"][i % 3] ?? "Viewer",
  status: i % 3 === 0 ? "inactive" : "active",
}));

const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="sm"><AvatarFallback>{row.getValue<string>("name").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
        <span style={{ fontWeight: 500 }}>{row.getValue<string>("name")}</span>
      </div>
    ),
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: ({ column }) => <SortableHeader column={column}>Role</SortableHeader> },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return <Badge variant={status === "active" ? "success" : "secondary"}>{status}</Badge>;
    },
  },
];

export const Default: Story = {
  render: () => <DataTable columns={columns} data={users} searchKey="name" searchPlaceholder="Search users…" pageSize={8} />,
};

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} searchable={false} />,
};

export const NoPagination: Story = {
  render: () => <DataTable columns={columns} data={users.slice(0, 5)} pagination={false} searchable={false} />,
};
