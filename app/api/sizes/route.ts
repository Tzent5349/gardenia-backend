import  connectToDatabase  from "@/lib/database";
import { getAllSize, getAllSizesByProductGender } from "@/lib/database/actions/sizes.action";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";


export async function GET (){
    try {
        await connectToDatabase();
        const sizes = await getAllSize();
        return NextResponse.json(sizes);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}

/* export  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      try {
        await connectToDatabase();
        const { productGenderId } = req.query;
        const sizes = await getAllSizesByProductGender(productGenderId as string);
        res.status(200).json(sizes);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } */

/*   export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
      try {
        const { productGenderId } = req.query;
        
        // Fetch all sizes
        const sizes = await getAllSize();
  
        // Filter sizes based on the provided productGenderId
        const filteredSizes = sizes.filter(size => size.gender === productGenderId);
  
        res.status(200).json(filteredSizes);
      } catch (error) {
        console.error('Error fetching sizes by product gender:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
 */
