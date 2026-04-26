import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel, type SortingState, type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { columnsGroups, type Group, type Staff } from "./columns";
import { useGroups, usePersonnel } from "~/services/apiService";
import { useMemo } from "react";


export function GroupTable() {
    const { options, loading, error, removeGroup } = useGroups();
    const { data: staffData } = usePersonnel();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const filteredData = useMemo(
        () => options.filter((group) => group.status === "active"),
        [options]
    );

    const tableColumns = columnsGroups(removeGroup, staffData);

    const table = useReactTable({
        data: filteredData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
        sorting,
        columnFilters,
    }
    })

    if (loading) return <div>Vent venligst...</div>

    return (
        <div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Search..."
                value={(table.getColumn("group")?.getFilterValue() as string) ?? ""}
                onChange={e => table.getColumn("group")?.setFilterValue(e.target.value)}
            />


            <Table>

                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead 
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            style={{ cursor: "pointer" }}
                            >
                            
                                <div>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                            
                                    {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : " ↕"}
                                </div>

                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columnsGroups.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                

            </Table>

        </div>
    )
}