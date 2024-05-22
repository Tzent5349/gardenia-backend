"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { ICategory } from "@/lib/database/models/category.model";
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
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/database/actions/categories.action";
import { CategoryDefaultValues } from "@/constants";
import ImageUpload from "../ImageUpload";

enum StatusEnum {
  Show = "Show",
  Hide = "Hide",
}

const formSchema = z.object({
  name: z.string(),
  img: z.string(),
  parent: z.string(),
  children: z.string().array(),
  productType: z.string(),
  description: z.string(),
  status: z.enum([StatusEnum.Show, StatusEnum.Hide]),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  category?: ICategory;
  type: "Create" | "Update";
  categoryId?: string;
};

export const CategoryForm = ({
  category,
  type,
  categoryId,
}: CategoryFormProps) => {
  const params = useParams();
  const router = useRouter();

  const initialValues =
    category && type === "Update"
      ? {
          ...category,
        }
      : CategoryDefaultValues;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdditionalChildren, setShowAdditionalChildren] = useState(false);

  const title = type === "Update" ? "Edit category" : "Create category";
  const description =
    type === "Update" ? "Edit a category." : "Add a new category";
  const toastMessage =
    type === "Update" ? "Category updated." : "Category created.";
  const action = type === "Update" ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (type === "Update") {
        if (!categoryId) {
          router.back();
          return;
        }
        await updateCategory({ category: { ...data, _id: categoryId } });
      } else if (type === "Create") {
        await createCategory({ category: { ...data } });
      }
      router.refresh();
      router.push(`/dashboard/categories`);
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
      await deleteCategory({ categoryId: `${params.categoryId}` });
      router.refresh();
      router.push(`/dashboard/categories`);
      toast.success("Category deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const toggleAdditionalChildren = () => {
    setShowAdditionalChildren(!showAdditionalChildren);
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                  <ImageUpload 
                      value={field.value ? [field.value] : []} 
/*                       disabled={loading}  */
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
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Parent</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Parent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*             <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Children</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Children"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="md:grid md:grid-cols-3 gap-8">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`children[${index}]`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={`Child ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                onClick={() => append("")}
                disabled={loading}
              >
                Add Child
              </Button>
            </div>

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
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Type"
                      {...field}
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
                      <SelectItem value="Show">Show</SelectItem>
                      <SelectItem value="Hide">Hide</SelectItem>
                    </SelectContent>
                  </Select>
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
