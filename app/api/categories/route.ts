import { connectToDatabase } from "@/lib/database";
import { getAllCategory, getShowCategoryServices} from "@/lib/database/actions/categories.action";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        await connectToDatabase();
        const categories = await getAllCategory();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}


