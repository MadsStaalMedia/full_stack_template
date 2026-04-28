import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel, type SortingState, type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { columnsGroups, type Group, type Staff } from "./columns";
import { useGroups, usePersonnel } from "~/services/apiService";
import { useMemo } from "react";
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"


export function GroupTable() {
    const { options, loading, removeGroup, createGroup } = useGroups();
    const [form, setForm] = useState({ group: "", status: "active" as "active" | "inactive" });
    const [error, setError] = useState('');
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    if (options.some((options) => options.group === form.group)) {
        setError('Gruppen findes allerede');
        return;
    };

        await createGroup(form)
        setForm({ group: "", status: "active" as "active" | "inactive"  })
    };

    if (loading) return <div>Vent venligst...</div>
    if (error) return <div>An error has occurred: {error}</div>

    return (
        <div>

            <h1 className="text-4xl font-bold mb-5">Personalegrupper</h1>

            <div className="border-b border-gray-200 pb-6 mb-6">
            
                <h2 className="text-2xl font-bold">Opret personalegruppe</h2>
                
                <form className="flex gap-2 my-4" onSubmit={handleSubmit}>
                    <Input
                        className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
                        required
                        minLength={1}
                        placeholder="Gruppe"
                        value={form.group}
                        onChange={(e) => setForm({ ...form, group: e.target.value })}
                    />
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <Button
                        className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
                        type="submit"
                    >
                        Tilføj
                    </Button>
                </form>
            
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2 className="text-2xl font-bold">Personalegruppeoversigt</h2>

            <input
                className="border border-gray-300 px-2 py-1 outline-none focus:ring-1 focus:ring-black-300 text-sm"
                placeholder="Søg..."
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
                                    {header.column.getCanSort() && (
                                        header.column.getIsSorted() === "asc" ? " ↑" 
                                        : header.column.getIsSorted() === "desc" ? " ↓" 
                                        : " ↕"
                                    )}
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
                            className="even:bg-white odd:bg-gray-100"
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