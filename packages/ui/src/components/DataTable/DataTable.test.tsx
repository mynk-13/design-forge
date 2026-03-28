import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { type ColumnDef, DataTable } from "./DataTable";

type Person = { name: string; email: string; status: string };

const columns: ColumnDef<Person, string>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data: Person[] = [
  { name: "Alice Smith", email: "alice@example.com", status: "Active" },
  { name: "Bob Jones", email: "bob@example.com", status: "Inactive" },
  { name: "Carol White", email: "carol@example.com", status: "Active" },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Jones")).toBeInTheDocument();
    expect(screen.getByText("Carol White")).toBeInTheDocument();
  });

  it("shows empty state when data is empty", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders pagination controls when pagination=true", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
  });

  it("does not render pagination when pagination=false", () => {
    render(<DataTable columns={columns} data={data} pagination={false} />);
    expect(screen.queryByLabelText("Next page")).not.toBeInTheDocument();
  });

  it("renders search input when searchable=true", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DataTable columns={columns} data={data} searchable={false} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
