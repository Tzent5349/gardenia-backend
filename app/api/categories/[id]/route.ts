import  connectToDatabase  from "@/lib/database";
import { getCategoryById } from "@/lib/database/actions/categories.action";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("Category id is required", { status: 400 });
          }
        await connectToDatabase();
        const category = await getCategoryById(params.id);
        return new NextResponse(JSON.stringify(category),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                // Add other CORS headers as needed
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                // Add other CORS headers as needed
            },
        });
    }
}