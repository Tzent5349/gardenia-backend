import { connectToDatabase } from "@/lib/database";
import { getProductById, getSimilarProduct } from "@/lib/database/actions/products.action";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

/* export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("Product id is required", { status: 400 });
          }
        await connectToDatabase();
        const product = await getProductById(params.id);
        const similarProduct = getSimilarProduct (params.id)

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({error:error})
    }
} */

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("Product id is required", { status: 400 });
          }
        await connectToDatabase();
        const product = await getProductById(params.id);
        const similarProducts = await getSimilarProduct(params.id);
        
        // Combine product details and similar products into a single object
        const responseData = { product, similarProducts };

        // Return the combined data as JSON
        return new NextResponse(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
    }
}

/* export async function getSimilarProducts  (    req: Request,
    { params }: { params: { id: string } })  {
    try {
        if(!params){
            return new NextResponse("Product id is required", { status: 400 });
        }
        await connectToDatabase();
        const similarProduct = getSimilarProduct (params.id)
        return NextResponse.json(similarProduct);
    } catch (error) {
        handleError(error);
    }

} */