"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import Image from "next/image"

export type BrandColumn = {
  id: string
  name: string;
  logo: string;
  discription: string;
  status: string;
  createdAt: string;
}

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Logo",
    header: "Logo",
    cell: ({ row }) => (
      <Image src={row.original.logo} alt={row.original.name} width={80} height={20} style={{backgroundColor:"#fff"}} />
    )
  },
  {
    accessorKey: "Satus",
    header: "Status",
    cell: ({ row }) => row.original.status,
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
