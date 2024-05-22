import { connectToDatabase } from "@/lib/database";
import { getColorById } from "@/lib/database/actions/colors.action";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("Colors id is required", { status: 400 });
          }
        await connectToDatabase();
        const color = await getColorById(params.id);
        return NextResponse.json(color);
    } catch (error) {
        return NextResponse.json({error:error})
    }
}