import ProductForm  from "@/components/forms/ProductForm";
import { getProductById } from "@/lib/database/actions/products.action";

type UpdateProductProps = {
  params: {
    id: string;
  };
};

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
  const product = await getProductById(id);

  return (
    <>
      <ProductForm type="Update" product={product} productId={product._id} />
    </>
  );
};

export default UpdateProduct;
