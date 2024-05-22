import * as z from "zod";


export const colorFormSchema = z.object({
    name: z.string().min(3, "name must be grater than 3 letters "),
    value: z.string()
})


export const CategoryFormSchema = z.object({
    name: z.string(),
    img:z.string(),
    parent:z.string(),
    children:z.string().array(),
    productType: z.string(),
    description: z.string(),
    status:z.string(),

})


export const SizeFormSchema = z.object({
    gender: z.string(),
    value: z.object({
      footLength:z.string(),
      EU:z.string(),
      UK:z.string(),
      US:z.string(),
    }).array()
})

/* enum StatusEnum {
    Show = "Show",
    Hide = "Hide",
  }
export const CategoryFormSchema = z.object({
    name: z.string(),
    img: z.string(),
    parent: z.string(),
    children: z.string().array(),
    productType: z.string(),
    description: z.string(),

  }); */


const ImageSchema = z.object({
    url: z.string(),
  });
  
  /* const SizeSchema = z.object({
    availableSize: z.string(),
  }); */
  
  const HeroSchema = z.object({
    /*   color: z.object({
      name: z.string(),
      colorCode: z.string(),
    }), */
    colorId: z.string(),
    price: z.coerce.number(),
    stock: z.coerce.number(),
    img: z.array(ImageSchema),
    /*   sizes: z.array(SizeSchema), */
/*     sizes: z.string().array(), */
    sizeId:z.string().array(),
  });
  
  enum ProductStatusEnum {
    InStock = "InStock",
    OutOfStock = "OutOfStock",
    /*   Discounted = "discounted", */
    /*      "out-of-stock",
        "discounted" */
  }
  
  export const ProductSchema = z.object({
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