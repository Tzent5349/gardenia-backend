import connectToDatabase from "@/lib/database/connection";
import { getColorById } from "@/lib/database/actions/colors.action";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    await connectToDatabase();

    const color = await getColorById(params.id);

    return new NextResponse(JSON.stringify(color));
  } catch (error) {
    console.error("Error fetching color:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
    );
  }
}
