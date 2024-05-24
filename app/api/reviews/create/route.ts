import { NextRequest, NextResponse } from 'next/server';
import { createReview } from '@/lib/database/actions/reviews.action';

export async function POST(req: NextRequest) {
    if (req.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204 });
    }

    try {
        if (req.method !== 'POST') {
            return new NextResponse('Method Not Allowed', { status: 405 });
        }

        const body = await req.json();
        const newReview = await createReview(body);
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Error creating review', details:" error.message" }, { status: 500 });
    }
}

export function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
