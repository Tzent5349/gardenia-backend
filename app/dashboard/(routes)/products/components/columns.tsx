"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { getCategoryById, getCategoryNameById } from "@/lib/database/actions/categories.action";
import { useEffect, useState } from "react";
import Link from "next/link";

export type ProductColumn = {
  id: string;
  sku: string;
  img: string;
  name: string;
  unit: number;
  price:number;
  ImgColorPrice: [{
      colorId:string;
      img: {
          url:string
      }[];
      sizes:string[]
      price:number;
      stock:number;
  }],
  parent: string;
  children: string;
/*   discount: number; */
  quantity: number;
  brandId:string;
  category:string;
  status:string;
  reviews:[]
  productType:string;
  description:string;
  featured:boolean;
/*   offerDate:{startDate:Date, endDate:Date} */
  createdAt:string
  colors:string
}

export const columns: ColumnDef<ProductColumn>[] = [


  {
    accessorKey: "name",
    header: "Name",
    cell:({row}) =>(
      <Link href={`/dashboard/products/${row.original.id}/`} >
        {row.original.name}
      </Link>
    )
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "ImgColorPrice.[0].price",
    header: "Price",
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey :"colors",
    header : "Colors",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
{/*         {row.original.colors} */}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.colors}}  />

      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",

  },
  {
    accessorKey: "brand",
    header: "Brand",
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
