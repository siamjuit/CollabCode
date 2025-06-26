import { NextRequest, NextResponse } from 'next/server';
import { executeCode } from '@/lib/judge0';
import {SubmissionRequest} from "@/data";

export async function POST(request: NextRequest) {
    try {
        const body: SubmissionRequest = await request.json();
        const { source_code, language_id, stdin } = body;

        if (!source_code || !language_id) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const cleanSourceCode = source_code.trim();
        const base64SourceCode = btoa(unescape(encodeURIComponent(cleanSourceCode)));

        const config = {
            apiKey: process.env.JUDGE0_API_KEY!,
        };

        const result = await executeCode({
            source_code: base64SourceCode,
            language_id,
            stdin: stdin || '',
        }, config);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error executing code:', error);
        return NextResponse.json(
            {
                message: 'Failed to execute code',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
