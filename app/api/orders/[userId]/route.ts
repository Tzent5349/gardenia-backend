// pages/api/orders.ts

import { NextRequest, NextResponse } from 'next/server';
import { handleOrder } from '@/lib/database/actions/orders.action';

export async function POST(req: NextRequest, { params }: { params: { userId: any } }) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend URL for better security
  res.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res;
  }

  try {
    const { userId } = params;
    const { shippingAddress, cartItems } = await req.json(); // Assuming items is an array of purchased items

/*     console.log(shippingAddress, cartItems) */

    if (!userId || !shippingAddress || !Array.isArray(cartItems)) {
      return NextResponse.json({ error: 'User ID, shipping address, and items array are required' }, { status: 400 });
    }

    // Call the function to handle the order
    const newOrder = await handleOrder(userId, shippingAddress, cartItems);

    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { userId: any } }) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend URL for better security
  res.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res;
  }

  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Call the function to handle the GET request (modify this as per your logic)
    /* const data = await someGetDataFunction(userId);

    return NextResponse.json(data, { status: 200 }); */
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
