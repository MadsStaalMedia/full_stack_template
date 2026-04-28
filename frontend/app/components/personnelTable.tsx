import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel, type SortingState, type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { columnsStaff, type Staff } from "./columns";
import { usePersonnel, useGroups } from "~/services/apiService";
import { useMemo } from "react";
import { Button } from "@base-ui/react/button"
import { Input } from "@base-ui/react/input"



export function PersonnelTable() {
    const { data, loading, changeStaff, createStaff } = usePersonnel()
    const [error, setError] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const { options } = useGroups();
    const [form, setForm] = useState({ name: "", email: "", group: "", status: "active" as "active" | "inactive" });

    const filteredData = useMemo(
        () => data.filter((staff) => staff.status === "active"),
        [data]
    );

    const tableColumns = columnsStaff(changeStaff);

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

    if (data.some((data) => data.email === form.email)) {
        setError('Email er allerede i brug');
        return;
    } else if (form.group == "") {
        setError('Vælg en personalegruppe');
        return;
    }

    await createStaff(form);
    setForm({ name: "", email: "", group: "", status: "active" as "active" | "inactive" });
  }

    if (loading) return <div>Vent venligst...</div>
    if (error) return <div>Der er sket en fejl: {error}</div>

    return (
        <div>

            <h1 className="text-4xl font-bold mb-5">Personale</h1>

            <div className="border-b border-gray-200 pb-6 mb-6">
                
                <h2 className="text-2xl font-bold">Opret personale</h2>
            
                <form className="flex gap-2 my-4 mr-5" onSubmit={handleSubmit}>
                    <Input
                        className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
                        type="text"
                        minLength={1}
                        maxLength={80}
                        placeholder="Navn"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
            
                    <Input
                        className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
                        type="email"
                        required
                        minLength={1}
                        placeholder="Email"
                        maxLength={80}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
            
                    <select value={form.group} onChange={e => setForm({ ...form, group: e.target.value})} className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300">
                        <option>Vælg personallegruppe</option>
                        {options.length > 0 && options.map(opt => (
                            <option key={opt.id} value={opt.group}>{opt.group}</option>))}
                    </select>
            
                    {error && <span style={{ color: 'red' }}>{error}</span>}

                    <Button
                        className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
                        type="submit"
                        >
                        Tilføj
                    </Button>
                </form>
            
            </div>

            <h2 className="text-2xl font-bold">Personaleoversigt</h2>

            <div>

                <input
                    className="border border-gray-300 mt-2 px-2 py-1 outline-none focus:ring-1 focus:ring-black-300 text-sm"
                    placeholder="Søg navn..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={e => table.getColumn("name")?.setFilterValue(e.target.value)}
                />

                <input
                    className="border border-gray-300 mt-2 ml-5 px-2 py-1 outline-none focus:ring-1 focus:ring-black-300 text-sm"
                    placeholder="Søg email..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={e => table.getColumn("email")?.setFilterValue(e.target.value)}
                />

                <input
                    className="border border-gray-300 mt-2 ml-5 px-2 py-1 outline-none focus:ring-1 focus:ring-black-300 text-sm"
                    placeholder="Søg gruppe..."
                    value={(table.getColumn("gruppe")?.getFilterValue() as string) ?? ""}
                    onChange={e => table.getColumn("gruppe")?.setFilterValue(e.target.value)}
                />

            </div>

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
                        <TableCell colSpan={columnsStaff.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                

            </Table>

        </div>
    )
}