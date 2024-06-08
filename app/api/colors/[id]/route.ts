import  connectToDatabase  from "@/lib/database/connection";
import { getColorById } from "@/lib/database/actions/colors.action";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("color id is required", { status: 400 });
          }
        await connectToDatabase();
        const color = await getColorById(params.id);
        return new NextResponse(JSON.stringify(color),{
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