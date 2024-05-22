"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IProduct } from "@/lib/database/models/product.model";
import { useParams, useRouter } from "next/navigation";
import { ProductDefaultValues } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Trash, Trash2Icon } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Dropdown from "@/components/shared/Dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  createProduct,
  updateProduct,
} from "@/lib/database/actions/products.action";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import { TrashIcon } from "@radix-ui/react-icons";
import { Togglesize } from "@/components/shared/SizeToggle";
import { handleError } from "@/lib/utils";

const ImageSchema = z.object({
  url: z.string(),
});

const HeroSchema = z.object({
  colorId: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  img: z.array(ImageSchema),
  sizeId: z.string().array(),
});

enum ProductStatusEnum {
  InStock = "InStock",
  OutOfStock = "OutOfStock",
  /*   Discounted = "discounted", */
}

const ProductSchema = z.object({
  name: z.string(),
  sku: z.string(),
  img: z.string(),
  genderId: z.string(),
  price: z.coerce.number(),
  unit: z.coerce.number(),
  ImgColorPrice: z.array(HeroSchema),
  parent: z.string(),
  children: z.string(),
  /*   discount: z.coerce.number(), */
  quantity: z.coerce.number(),
  brandId: z.string(),
  categoryId: z.string(),
  status: z.enum([
    ProductStatusEnum.InStock,
    ProductStatusEnum.OutOfStock,
    /*         StatusEnum.Discounted, */
  ]),
  productType: z.string(),
  description: z.string(),
  featured: z.boolean(),
  /*   offerDate: z.date(), */
});

type ProductData = z.infer<typeof ProductSchema>;

type ProductFormProps = {
  product?: IProduct;
  type: "Create" | "Update";
  productId?: string;
};

const ProductForm = ({ product, type, productId }: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [output, setOutput] = useState("");
  const [imgArray, setImgArray] = useState<number[]>([]);
  const [sizeArray, setSizeArray] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | undefined>("");

  const initialValues =
    product && type === "Update"
      ? {
          ...product,
          genderId:product.gender,
          brandId: product.brand,
          categoryId: product.category,
          ImgColorPrice: product.ImgColorPrice.map((imgColorPrice) => ({
            colorId: imgColorPrice.color,
            price: imgColorPrice.price,
            stock: imgColorPrice.stock,
            img: imgColorPrice.img.map((img) => ({ url: img.url })),
            sizeId: imgColorPrice.sizeId,
          })),
        }
      : ProductDefaultValues;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = type === "Update" ? "Edit product" : "Create product";
  const description =
    type === "Update" ? "Edit a product." : "Add a new product";
  const toastMessage =
    type === "Update" ? "Product updated." : "Product created.";
  const action = type === "Update" ? "Save changes" : "Create";

  const form = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, register } = form;

  const {
    fields: heroFields,
    append: appendHero,
    remove: removeHero,
  } = useFieldArray({
    control,
    name: "ImgColorPrice",
  });

  const [numImagesPerHero, setNumImagesPerHero] = useState<number[]>([]);

  const [numSizesPerHero, setNumSizesPerHero] = useState<number[]>([]);

  const addImageToHero = (heroIndex: number) => {
    setNumImagesPerHero((prev) => {
      const updatedNumImages = [...prev];

      updatedNumImages[heroIndex] = (updatedNumImages[heroIndex] || imgArray[heroIndex]||1) + 1;
      return updatedNumImages;
    });
  };

  const addSizeToHero = (heroIndex: number) => {
    setNumSizesPerHero((prev) => {
      const updatedNumSizes = [...prev];
      updatedNumSizes[heroIndex] = (updatedNumSizes[heroIndex] || sizeArray[heroIndex] || 1) + 1;
      return updatedNumSizes;
    });
  };

  const removeHeroAtIndex = (index: number) => {
    removeHero(index);
    setNumImagesPerHero((prev) => prev.filter((_, i) => i !== index));
    setNumSizesPerHero((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(()=>{
    if (type === "Update") {
      product?.ImgColorPrice.map((imgArr, idx) => {
        setImgArray((prevImg) => {
          // Create a new array with the updated size at the specified index
          const updatedImg = [...prevImg];
          updatedImg[idx] = imgArr.img.length; // Assign the length of sizes to the corresponding index
          return updatedImg;
        });
/*         setSizeArray((prevSizes) => {
          // Create a new array with the updated size at the specified index
          const updatedSizes = [...prevSizes];
          updatedSizes[idx] = imgArr.sizes.length; // Assign the length of sizes to the corresponding index
          return updatedSizes;
        }); */

      });
    }
  },[])

  const onSubmit: SubmitHandler<ProductData> = async (data) => {
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));
    setSelectedGender(data.genderId);
    try {
      if (type === "Update") {
        if (!productId) {
          router.back();
          return;
        }
        await updateProduct({ product: { ...data, _id: productId } });
      } else if (type === "Create") {
        await createProduct({ product: { ...data } });
      }
      router.refresh();
      router.push(`/dashboard/products`);
      toast.success(toastMessage);
    } catch (error) {
      handleError(error);
    }
  };

  const onDelete = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
{/*       {console.log(product)} */}
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
          className="space-y-8 w-full px-12"
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
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Sku/Id</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Sku"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Price"
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
                  <FormLabel>Product Img</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="genderId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Dropdown
                      type="gender"
                      onChangeHandler={(value)=>{
                        {field.onChange}
                        setSelectedGender(value);
                      }}
                      value={field.value}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div></div>

          <div className=" md:grid md:grid-cols-1 gap-8 px-10 ">          

            {heroFields.map((hero, heroIndex) => (
              <div key={hero.id} className="md:grid md:grid-cols-1 gap-8 px-10 bg-zinc-900 rounded-xl p-6">
                <div className="flex ml-auto">
                <Button
                  variant="destructive" size="sm"
                  type="button"
                  onClick={() => removeHeroAtIndex(heroIndex)}
                >
                  <TrashIcon className="h-4 w-4" />
                  
                </Button>
                </div>
                <h1> Product  { heroIndex >0 && `(${heroIndex+1}) `} Details </h1>
                <div className=" md:grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name={`ImgColorPrice.${heroIndex}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Price</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Product Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ImgColorPrice.${heroIndex}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Stock</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Product Stock"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Color ID */}
                <FormField
                  control={form.control}
                  name={`ImgColorPrice.${heroIndex}.colorId`}
                  render={({ field }) => (
                    <FormItem className="h-24 w-fit ">
                      <FormControl>
                        <Dropdown
                          type="color"
                          onChangeHandler={field.onChange}
                          value={field.value}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {Array.from({ length: numImagesPerHero[heroIndex] || hero.img?.length || 1 }).map(
                  (_, imageIndex) => (
                    <div key={imageIndex} className="">
                      <FormField
                        control={form.control}
                        name={`ImgColorPrice.${heroIndex}.img.${imageIndex}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <ImageUpload
                                value={field.value ? [field.value] : []}                               
                                onChange={(url) => field.onChange(url)}
                                onRemove={() => field.onChange("")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )}

                <Button type="button" onClick={() => addImageToHero(heroIndex)}>
                  Add More Image
                </Button>

{/*                 {Array.from({  length: numSizesPerHero[heroIndex] | hero.sizes?.length || 1 }).map(
                  (_, sizeIndex) => (
                    <div
                      key={sizeIndex}
                      className="md:grid md:grid-colds gap-8"
                    >
                      <FormField
                        control={form.control}
                        name={`ImgColorPrice.${heroIndex}.sizes.${sizeIndex}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Product available sizes for this color"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )} */}
{/*                 <Button type="button" onClick={() => addSizeToHero(heroIndex)}>
                  Add more Sizes
                </Button> */}
{/*                 <Button
                  type="button"
                  onClick={() => removeHeroAtIndex(heroIndex)}
                >
                  Remove Color
                </Button> */}

<FormField
                        control={form.control}
                        name={`ImgColorPrice.${heroIndex}.sizeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                            <Togglesize gender={selectedGender} onChangeHandler={field.onChange} value={field.value} />

                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              </div>
            ))}
                        <Button
              type="button"
              onClick={() => appendHero({})}
              className="md:grid md:grid-cols-2 gap-8"
            >
              Add more same product with different Colours
            </Button>
          </div>

          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Parent</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Children</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product children"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*         <div className="flex w-full gap-2 items-center">
          <label htmlFor="" className="font-semibold text-xl">
          Name
          </label>
          <input
          {...register("discount")}
          placeholder="Product discount"
          className="flex p-2 h-10 rounded bg-slate-700 text-white font-semibold w-2/3"
          />
        </div>  */}

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Quantity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* /// Brand Id */}
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Dropdown
                      type="brand"
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Category Id */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Dropdown
                      type="category"
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* status */}
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
                      <SelectItem value={"InStock"}>In Stock</SelectItem>
                      <SelectItem value={"OutOfStock"}>Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prodcut Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Descriotion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* featured boolean */}

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is this product featured?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "true");
                    }}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Is it featured?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Do you want this product to be featured
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* offer Date */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
              {console.log(selectedGender)}
      <pre>{output}</pre>
    </>
  );
};

export default ProductForm;
