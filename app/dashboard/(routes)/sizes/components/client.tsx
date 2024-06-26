"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
/* import { ApiList } from "@/components/ui/api-list"; */

import { columns, SizeColumn } from "./columns";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sizes (${data.length})`} description="Manage Sizes for your products" />
        <Button onClick={() => router.push(`/dashboard/sizes/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
{/*       <Heading title="API" description="API Calls for Colors" /> */}
      <Separator />
{/*       <ApiList entityName="colors" entityIdName="colorId" /> */}
    </>
  );
};
