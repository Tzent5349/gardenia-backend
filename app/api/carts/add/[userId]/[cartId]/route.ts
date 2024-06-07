import { handleAddQuantityButton, handleShoppingCart } from '@/lib/database/actions/carts.action';
import { NextRequest, NextResponse } from 'next/server';


type UserProductParams = {
  params: {
    userId: string;
    cartId: string;

  };
}

export async function GET(req: NextRequest, { params }: UserProductParams) {
  try {
    const { userId, cartId } = params;
    console.log(userId, cartId);
    if (!userId || !cartId) {
      return NextResponse.json({ error: 'User ID and CartId ID are required' }, { status: 400 });
    }

   
/*     console.log(`User ID: ${userId}, Product ID: ${productId}`); */

    // Call the function to handle the shopping cart
    const updatedUser = await handleAddQuantityButton(userId, cartId);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}