import { NextRequest, NextResponse } from 'next/server';
import { getSubmission } from '@/lib/judge0';

export async function GET(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const { token } = params;

        if (!token) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 400 }
            );
        }

        const config = {
            apiKey: process.env.JUDGE0_API_KEY!,
        };

        const result = await getSubmission(token, config);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error getting result:', error);
        return NextResponse.json(
            {
                message: 'Failed to get result',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
