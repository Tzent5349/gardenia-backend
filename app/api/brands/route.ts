import { connectToDatabase } from "@/lib/database";
import { getAllBrand } from "@/lib/database/actions/brands.action";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        await connectToDatabase();
        const brands = await getAllBrand();
        return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}