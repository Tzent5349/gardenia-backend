"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
/* import { ApiList } from "@/components/ui/api-list"; */

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Orders (${data.length})`} description="Manage Orders for your products" />
{/*         <Button onClick={() => router.push(`/dashboard/colors/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
{/*       <Heading title="API" description="API Calls for Colors" /> */}
      <Separator />
{/*       <ApiList entityName="colors" entityIdName="colorId" /> */}
    </>
  );
};
