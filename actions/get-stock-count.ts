import { getAllProducts } from "@/lib/database/actions/products.action";
import connectToDatabase from "@/lib/database/connection";

export const getStockCount = async () => {
    try {
        await connectToDatabase();
        const products = await getAllProducts();
        const stockedProducts = products.filter((product: { status: string; }) => product.status === "InStock");
        return stockedProducts.length;
    } catch (error) {
        console.error(error);
        return 0;  // Return 0 in case of error
    }
};
