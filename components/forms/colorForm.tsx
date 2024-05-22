"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "../ui/input";
import * as z from "zod";
import { IColor } from "@/lib/database/models/color.model";

import {
  createColor,
  deleteColor,
  updateColor,
} from "@/lib/database/actions/colors.action";
import { handleError } from "@/lib/utils";
import { colorFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { ColorDefaultValues } from "@/constants";
import { AlertModal } from "../modals/alert-modal";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Trash } from "lucide-react";

type ColorFormProps = {
  color?: IColor;
  type: "Create" | "Update";
  colorId?: string;
};

const ColorForm = ({ type, color, colorId }: ColorFormProps) => {
  const initialValues =
    color && type === "Update"
      ? {
          ...color,
        }
      : ColorDefaultValues;

  const router = useRouter();
  const [colorValue, setColorValue] = useState(initialValues.value);

  const form = useForm<z.infer<typeof colorFormSchema>>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: initialValues,
  });

  const title = type === "Update" ? "Edit color" : "Create color";
  const description = type === "Update" ? "Edit a color." : "Add a new color";
  const toastMessage = type === "Update" ? "Color updated." : "Color created.";
  const action = type === "Update" ? "Save changes" : "Create";

  async function onSubmit(values: z.infer<typeof colorFormSchema>) {
    if (type === "Create") {
      try {
        const newColor = await createColor({
          color: { ...values },
        });

        if (newColor) {
          form.reset();
          router.push("/dashboard/colors");
        }
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }

    if (type === "Update") {
      if (!colorId) {
        router.back();
        return;
      }
      try {
        const updatedColor = await updateColor({
          color: { ...values, _id: colorId },
        });
        if (updatedColor) {
          router.push("/dashboard/colors");
        }
      } catch (error) {
        handleError(error);
      }
    }
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        placeholder="Color value"
                        {...field}/* 
                        value={colorValue}
                        onChange={(e) => setColorValue(e.target.value)} */
                      />
                      <div className="asdf">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <div
                              className="border p-4 rounded-full"
                              style={{ backgroundColor: field.value }}
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Select Color</AlertDialogTitle>
                              <AlertDialogDescription>
                                <HexColorPicker
                                  color={field.value}
                                  /* onChange={(newColor) =>
                                    setColorValue(newColor)
                                  } */
                                  onChange={field.onChange}
                                />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForm;
