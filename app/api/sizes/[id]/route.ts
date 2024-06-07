import  connectToDatabase  from "@/lib/database/connection";
import { getSizeById } from "@/lib/database/actions/sizes.action";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
){
    try {
        if (!params.id) {
            return new NextResponse("Size id is required", { status: 400 });
          }
        await connectToDatabase();
        const size = await getSizeById(params.id);
        return NextResponse.json(size);
    } catch (error) {
        return NextResponse.json({error:error})
    }
}