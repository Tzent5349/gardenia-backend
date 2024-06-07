import  connectToDatabase  from "@/lib/database/connection";
import { getAllProducts, getSimilarProduct } from "@/lib/database/actions/products.action";
import Product from "@/lib/database/models/product.model";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET (){

        const products = await getAllProducts();
        return NextResponse.json(products);

}

/* export async function getProductByTypes (req:any) { */
/*     const type = req.params.type; */
/*     const query = req.query;
    let products; */

/*        await connectToDatabase() */
/*        if (query.featured === "true"){
        products = await Product.find({
            featured: true,
          }).populate("reviews");
       } else if (query.featureds === "false"){
        products = await Product.find({
            featured: false,
        }).populate("reviews");
       }


    return products;

}
 */
