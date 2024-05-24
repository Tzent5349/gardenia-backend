import { NextRequest, NextResponse } from 'next/server';
import { handleWishList } from '@/lib/database/actions/users.action';

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id');
    const productId = url.searchParams.get('productId');

    if (!userId || !productId) {
      return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
    }


    const updatedUser = await handleWishList(userId, productId);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const runtime =
  'edge'

