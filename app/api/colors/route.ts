import { connectToDatabase } from "@/lib/database";
import { getAllColor } from "@/lib/database/actions/colors.action";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        await connectToDatabase();
        const colors = await getAllColor();
        return NextResponse.json(colors);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}