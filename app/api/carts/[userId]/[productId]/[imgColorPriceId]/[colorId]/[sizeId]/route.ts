import { handleShoppingCart } from '@/lib/database/actions/carts.action';
import { NextRequest, NextResponse } from 'next/server';


type UserProductParams = {
  params: {
    userId: string;
    productId: string;
    imgColorPriceId: string;
    colorId: string;
    sizeId:string;
  };
}

export async function GET(req: NextRequest, { params }: UserProductParams) {
  try {
    const { userId, productId,imgColorPriceId, colorId,sizeId } = params;
/*     console.log(imgColorPriceId); */
    if (!userId || !productId) {
      return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
    }

   
/*     console.log(`User ID: ${userId}, Product ID: ${productId}`); */

    // Call the function to handle the shopping cart
    const updatedUser = await handleShoppingCart(userId, productId, imgColorPriceId, colorId, sizeId);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}