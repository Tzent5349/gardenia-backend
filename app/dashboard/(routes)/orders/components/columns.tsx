"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type OrderColumn = {
  id: string
  userName:string
  isPaid: boolean
  price: number
/*   createdAt: string; */
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "userName",
    header: "Name",
  },


  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
