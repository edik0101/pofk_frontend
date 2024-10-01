"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Item = {
  activity: string;
  paymentsTypes: string;
  paymentsDetails: string;
  sept23: number;
  q3: number;
  oct23: number;
  nov23: number;
};

const data: Item[] = [
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Поступления в месяц (со всеми списаниями)",
    sept23: 887630.45,
    q3: 228633.95,
    oct23: 215672.49,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Выручка от продаж",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Неучтенные доходы",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Прочие доходы",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Платежи",
    paymentsDetails: "Административные расходы",
    sept23: 0,
    q3: -160.66,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Платежи",
    paymentsDetails: "Коммерческие расходы",
    sept23: 0,
    q3: -160.66,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Платежи",
    paymentsDetails: "Прочие расходы",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Операционная деятельность",
    paymentsTypes: "Платежи",
    paymentsDetails: "Денежный поток от ОД",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
  {
    activity: "Инвестиционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Инвестиционные поступления",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: -160.66,
  },
  {
    activity: "Инвестиционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: -160.66,
  },
  {
    activity: "Инвестиционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Инвестиционные платежи",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: -160.66,
  },
  {
    activity: "Инвестиционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: -160.66,
  },
  {
    activity: "Инвестиционная деятельность",
    paymentsTypes: "Поступления",
    paymentsDetails: "Денежный поток от ИД",
    sept23: 0,
    q3: 228633.95,
    oct23: 0,
    nov23: 215650.32,
  },
];

const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "activity",
    header: "",
  },
  {
    accessorKey: "paymentsTypes",
    header: "",
  },
  {
    accessorKey: "paymentsDetails",
    header: "2023",
  },
  {
    accessorKey: "sept23",
    header: "Сент.2023",
  },
  {
    accessorKey: "q3",
    header: "3 квартал",
  },
  {
    accessorKey: "oct23",
    header: "Окт.2023",
  },
  {
    accessorKey: "nov23",
    header: "Нояб.2023",
  },
];

export default function TanstackMergedCellsTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderMergedRows = () => {
    const rows = table.getRowModel().rows;
    const mergedRows: JSX.Element[] = [];
    let currentActivity = "";
    let currentPaymentsType = "";
    let activityRowSpan = 0;
    let paymentsTypeRowSpan = 0;

    rows.forEach((row, index) => {
      const cells = row.getVisibleCells();
      const rowElements: JSX.Element[] = [];

      cells.forEach((cell, cellIndex) => {
        if (cellIndex === 0) {
          if (cell.getValue() !== currentActivity) {
            currentActivity = cell.getValue() as string;
            activityRowSpan = data.filter(
              (item) => item.activity === currentActivity,
            ).length;
            rowElements.push(
              <TableCell
                key={cell.id}
                rowSpan={activityRowSpan}
                className="w-5"
              >
                <div className="w-5 origin-top-right translate-y-full -rotate-90 transform text-wrap align-middle leading-none">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </TableCell>,
            );
          }
        } else if (cellIndex === 1) {
          if (
            cell.getValue() !== currentPaymentsType ||
            currentActivity !== rows[index - 1].getValue("activity")
          ) {
            currentPaymentsType = cell.getValue() as string;
            paymentsTypeRowSpan = data.filter(
              (item) =>
                item.paymentsTypes === currentPaymentsType &&
                item.activity === currentActivity,
            ).length;
            rowElements.push(
              <TableCell
                key={cell.id}
                rowSpan={paymentsTypeRowSpan}
                className="w-3 p-0"
              >
                <div className="w-3 translate-y-full rotate-[-90deg] text-wrap align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </TableCell>,
            );
          }
        } else {
          rowElements.push(
            <TableCell
              key={cell.id}
              className={`w-20 ${(cell.getValue() as number) < 0 && "text-red-500"}`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>,
          );
        }
      });

      mergedRows.push(
        <TableRow
          key={row.id}
          className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
        >
          {rowElements}
        </TableRow>,
      );
    });

    return mergedRows;
  };

  return (
    <div className="mt-4">
      <Table className="border bg-white">
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
        <TableBody>{renderMergedRows()}</TableBody>
      </Table>
    </div>
  );
}
