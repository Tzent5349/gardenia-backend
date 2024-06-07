import  connectToDatabase  from "@/lib/database/connection";
import { getReview } from "@/lib/database/actions/reviews.action";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        if (!params.id) {
            return new NextResponse("Review ID is required", { status: 400 });
        }
        await connectToDatabase();
        const review = await getReview(params.id);
        return new NextResponse(JSON.stringify(review), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error with reviews" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
}
