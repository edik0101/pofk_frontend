"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SimpleTable({
  data,
  columnsHeaders,
}: {
  data: Record<string, string | number | JSX.Element>[];
  columnsHeaders?: string[];
}) {
  const columns: ColumnDef<Record<string, string | number | JSX.Element>>[] =
    Object.keys(data[0]).map((key: string, i: number) => {
      return {
        accessorKey: key,
        header: columnsHeaders ? columnsHeaders[i] : "",
        cell: ({ row }) => {
          const value = row.original[key];
          return typeof value === "object" && React.isValidElement(value)
            ? value
            : String(value);
        },
      };
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table className="text-base">
      {columnsHeaders && (
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody className="">
        {table.getRowModel().rows.map((row, i) => (
          <TableRow
            key={row.id}
            className={`${i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"} h-[71px] border-y-2 border-white`}
          >
            {row.getVisibleCells().map((cell, ind) => (
              <TableCell
                key={cell.id}
                className={`${ind === 0 ? "rounded-l-xl pl-6" : ""} ${ind === row.getVisibleCells().length - 1 ? "rounded-r-xl" : ""}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
