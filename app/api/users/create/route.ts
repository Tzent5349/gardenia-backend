import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/database/actions/users.action';
import { withCors } from '@/lib/middleware/withCors';

async function handler(req: NextRequest, res: NextResponse) {
  try {
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }

    // Parse the request body
    const body = await req.json();

    // Call the createUser function
    const newUser = await createUser(body);

    // Return a success response
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    // Return an error response
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

export const POST = withCors(handler);

// Handle CORS preflight request
export const OPTIONS = withCors(async () => new NextResponse(null, { status: 204 }));
