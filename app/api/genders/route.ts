import  connectToDatabase  from "@/lib/database/connection";
import { getAllGender } from "@/lib/database/actions/genders.action";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        await connectToDatabase();
        const genders = await getAllGender();
        return NextResponse.json(genders);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}