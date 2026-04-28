import { Button } from "./ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { usePersonnel, useGroups } from "~/services/apiService"

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
        { accessorKey: "name", header: "Navn" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "group", header: "Personalegruppe" },
        { id: "actions", header: "",
            enableSorting: false,
            enableColumnFilter: false,
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
    removeGroup: (id: string, staffData: Staff[]) => void,
    staffData: Staff[]
    ): ColumnDef<Group, any>[] => [
        { accessorKey: "group", header: "Gruppe" },
        { accessorKey: "count", 
            header: "Antal personale",
            cell: ({ row }) => {
            const group = row.original;
            const count = staffData.filter(
                staff => staff.group === group.group && staff.status === "active"
            ).length;
            return <span>{count}</span>;
        }},
        { id: "actions", header: "",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ row }) => {
                const group = row.original;
                return (
                    <Button
                        variant={group.status === "active" ? "destructive" : "default"}
                        onClick={() => removeGroup(group.id, staffData)}
                    >
                        Slet
                    </Button>
                )
            }
        }
]