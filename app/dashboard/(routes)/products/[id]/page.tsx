import { getProductById } from "@/lib/database/actions/products.action";
import { format } from "util";

type ProductDeatilProps = {
  params: {
    id: string;
  };
};

const PorductDetail = async ({ params: { id } }: ProductDeatilProps) => {
  const Product = await getProductById(id);

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={Product.img} alt={Product.name} className="w-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{Product.name}</h1>
            <p className="text-lg mb-4">Price: ${Product.price}</p>
            <p className="text-lg mb-4">
              Status:{" "}
              {Product.status === "OutOfStock" ? "Out of Stock" : "In Stock"}
            </p>
            <p className="text-lg mb-4">Description: {Product.description}</p>
            <p className="text-lg mb-4">Brand: {Product.brand}</p>
            <p className="text-lg mb-4">Category: {Product.category}</p>
            <p className="text-lg mb-4">Product Type: {Product.ProductType}</p>
            <p className="text-lg mb-4">Quantity: {Product.quantity}</p>
            <p className="text-lg mb-4">
              Created At: {format(new Date(Product.createdAt), "do MMMM, yyyy")}
            </p>
          </div>
        </div>
{        <pre className="flex">{JSON.stringify(Product)}</pre>}
      </div>
    </>
  );
};

export default PorductDetail;
