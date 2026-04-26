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

export const columnsStaff = (
    changeStaff: (id: string, status: "active" | "inactive") => void
    ): ColumnDef<Staff, any>[] => [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "group", header: "Group" },
        { id: "actions", header: "Action",
            cell: ({ row }) => {
                const group = row.original;
                return (
                    <Button
                        variant={group.status === "active" ? "destructive" : "default"}
                        onClick={() => changeStaff(group.id,group.status === "active" ? "inactive" : "active")}
                    >
                        Deaktiver
                    </Button>
                )
            }
        }
]

export const columnsGroups = (
    changeGroup: (id: string, status: "active" | "inactive") => void
    ): ColumnDef<Group, any>[] => [
        { accessorKey: "group", header: "Group" },
        { id: "actions", header: "Action",
            cell: ({ row }) => {
                const group = row.original;
                return (
                    <Button
                        variant={group.status === "active" ? "destructive" : "default"}
                        onClick={() => changeGroup(group.id,group.status === "active" ? "inactive" : "active")}
                    >
                        Deaktiver
                    </Button>
                )
            }
        }
]