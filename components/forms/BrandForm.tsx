"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { IBrand } from "@/lib/database/models/brand.model";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createBrand,
  deleteBrand,
  updateBrand,
} from "@/lib/database/actions/brands.action";
import { BrandDefaultValues } from "@/constants";
import ImageUpload from "../ImageUpload";

enum BrandStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

const formSchema = z.object({
  name: z.string(),
  logo: z.string(),
  description: z.string(),
  status: z.enum([BrandStatusEnum.Active, BrandStatusEnum.Inactive]),
});

type BrandFormValues = z.infer<typeof formSchema>;

type BrandFormProps = {
  brand?: IBrand;
  type: "Create" | "Update";
  brandId?: string;
};

export const BrandForm = ({ brand, type, brandId }: BrandFormProps) => {
  const params = useParams();
  const router = useRouter();

  const initialValues =
    brand && type === "Update"
      ? {
          ...brand,
        }
      : BrandDefaultValues;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = type === "Update" ? "Edit brand" : "Create brand";
  const description = type === "Update" ? "Edit a brand" : "Add a new brand";
  const toastMessage = type === "Update" ? "Brand updated." : "Brand created.";
  const action = type === "Update" ? "Save changes" : "Create";

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data: BrandFormValues) => {
    try {
      setLoading(true);
      if (type === "Update") {
        if (!brandId) {
          router.back();
          return;
        }
        await updateBrand({ brand: { ...data, _id: brandId } });
      } else if (type === "Create") {
        await createBrand({ brand: { ...data } });
      }
      router.refresh();
      router.push(`/dashboard/brands`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      /* await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`); */
      await deleteBrand({ brandId:`${params.brandId}` });
      router.refresh();
      router.push(`/dashboard/brands`);
      toast.success("brand deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {type === "Update" && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Brand name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
                  <FormControl>
                  <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
