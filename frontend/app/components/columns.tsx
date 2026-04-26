import { Button } from "./ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { usePersonnel } from "~/services/apiService"

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

export const columns = (
    changeStaff: (id: string, status: "active" | "inactive") => void
    ): ColumnDef<Staff, any>[] => [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "group", header: "Group" },
        { accessorKey: "status", header: "Status"},
        { id: "actions", header: "Action",
            cell: ({ row }) => {
                const group = row.original;
                return (
                    <Button
                        variant={group.status === "active" ? "destructive" : "default"}
                        onClick={() => changeStaff(group.id,group.status === "active" ? "inactive" : "active")}
                    />
                )
            }
        }
]