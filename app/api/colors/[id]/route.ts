import connectToDatabase from "@/lib/database";
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

    return new NextResponse(JSON.stringify(color), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add other CORS headers as needed
      },
    });
  } catch (error) {
    console.error("Error fetching color:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          // Add other CORS headers as needed
        },
      }
    );
  }
}
