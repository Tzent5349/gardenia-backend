import { format } from "date-fns";
import { getAllProducts } from "@/lib/database/actions/products.action";

import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import {
  getCategoryById,
  getCategoryNameById,
} from "@/lib/database/actions/categories.action";
import { getBrandNameById } from "@/lib/database/actions/brands.action";
import { getColorById } from "@/lib/database/actions/colors.action";

const ProductsPage = async () => {
  const products = await getAllProducts();

  const formattedProductsPromises = products.map(async (item: any) => {
    // Retrieve category name for each product
    const categoryName = await getCategoryNameById(item.category);
    const brandName = await getBrandNameById(item.brand);
    
        // Mapping ImgColorPrice array to get color names
        const colorNamesPromises = item.ImgColorPrice.map(async (colorID:any) => {
          const color = await getColorById(colorID.color);
          return color ? color.value : ''; // Return color name or an empty string if color not found
        });
        const colorNames = await Promise.all(colorNamesPromises);
    

    // Format product object
    return {
      id: item._id,
      sku: item.sku,
      img: item.img,
      name: item.name,
      price: item.price,
      unit: item.unit,
      ImgColorPrice: item.ImgColorPrice,
      parent: item.parent,
      children: item.children,
      /*       discount: item.discount, */
      quantity: item.quantity,
      brand: brandName,
      category: categoryName, // Assign the fetched category name
      status: item.status,
      productType: item.productType,
      description: item.description,
      featured: item.featured,
      /*       offerDate: item.offerDate, */
      createdAt: format(item.createdAt, "do MMMM, yyyy"),
      colors: colorNames, // Assign the fetched color names
    };
  });

  const formattedProducts = await Promise.all(formattedProductsPromises);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
