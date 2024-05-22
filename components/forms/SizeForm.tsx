"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { ISize } from "@/lib/database/models/size.model";
import { useRouter } from "next/navigation";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createSize,
  deleteSize,
  updateSize,
} from "@/lib/database/actions/sizes.action";
import { SizeDefaultValues } from "@/constants";
import { SizeFormSchema } from "@/lib/validator";
import { handleError } from "@/lib/utils";

type SizeFormProps = {
  size?: ISize;
  type: "Create" | "Update";
  sizeId?: string;
};

export const SizeForm = ({ size, type, sizeId }: SizeFormProps) => {
  const router = useRouter();

  const initialValues =
    size && type === "Update"
      ? {
          ...size,
        }
      : SizeDefaultValues;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const title = type === "Update" ? "Edit size" : "Create size";
  const description = type === "Update" ? "Edit a size." : "Add a new size";
  const toastMessage = type === "Update" ? "Size updated." : "Size created.";
  const action = type === "Update" ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof SizeFormSchema>>({
    resolver: zodResolver(SizeFormSchema),
    defaultValues: initialValues,
  });

  const { control } = form;

  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: "value",
  });

  const [addValueField, setAddValueField] = useState<number[]>([]);

/*   const addMoreValueField = (valueIndex: number) => {
    setAddValueField((prev) => {
      const updatedValueField = [...prev];

      updatedValueField[valueIndex] = (updatedValueField[valueIndex] || 0) + 1;
      return updatedValueField;
    });
  }; */
  const addMoreValueField = () => {
    setAddValueField((prev) => [...prev, 1]);
  };

  function appendValueField() {
    appendValue({
      footLength: "",
      EU: "",
      US: "",
      UK: "",
    });
  }

  async function onSubmit(values: z.infer<typeof SizeFormSchema>) {
    try {
      console.log(values);
            if (type === "Create") {
        await createSize({ size: { ...values } });
      } else if (type === "Update") {
        if (!sizeId) {
          router.back();
          return;
        }

        await updateSize({
          size: { ...values, _id: sizeId },
        });
      }
      toast.success(toastMessage);
      form.reset();
      router.push("/dashboard/sizes");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
    setOutput(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
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
              name="gender"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={size?.gender}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a size for:" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Children">Children</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {valueFields.map((value, valueIndex) => (
              <div className="" key={value.id}>
                <h1> Values </h1>


                    <div className="">
                      <FormField
                        control={form.control}
                        name={`value.${valueIndex}.footLength`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Foot Length</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Foot Length (mm)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`value.${valueIndex}.EU`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>EU value</FormLabel>
                            <FormControl>
                              <Input placeholder="EU Size value" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`value.${valueIndex}.US`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>US Value</FormLabel>
                            <FormControl>
                              <Input placeholder="US size value" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`value.${valueIndex}.UK`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UK Value</FormLabel>
                            <FormControl>
                              <Input placeholder="UK Size value" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

              </div>
            ))}
            <Button
              type="button"
              onClick={()=>appendValue({})}
            >
              Add more value Fields
            </Button>
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
