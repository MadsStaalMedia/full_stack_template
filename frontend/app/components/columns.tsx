import type { ColumnDef } from "@tanstack/react-table"

export type Staff = {
    id: string
    name: string
    email: string
    group: string
    status: "active" | "inactive"
}

export type Group = {
    id: string
    group: string
    status: "active" | "inactive"
}

export const columns: ColumnDef<Staff>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "group", header: "Group" },
    { accessorKey: "status", header: "Status" },
]