// backend/api/users/[id]/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleWishList } from '@/lib/database/actions/users.action';

type UserProductParams = {
  params: {
    id: string;
    productId: string;
  };
}

/* export async function POST(req: NextRequest, { params }: UserProductParams) {
  try {
    if (!params.id || !params.productId) {
      return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
    }

    console.log(`User ID: ${params.id}, Product ID: ${params.productId}`);
    
    // Make sure the request body is parsed if needed
    const body = await req.json();
    console.log('Request body:', body);

    const updatedUser = await handleWishList(params.id, params.productId);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
 */



export async function GET(req: Request,
    {params}:UserProductParams) {
    try {
  
      if (!params.id || !params.productId) {
        return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
      }
  
      const updatedUser = await handleWishList(params.id, params.productId);
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error('Error handling POST request:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }