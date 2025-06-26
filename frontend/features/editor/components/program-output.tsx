import React from 'react';
import {SubmissionRequest, SubmissionResult} from "@/data";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface Props {
    result: SubmissionResult
}

const ProgramOutput = ({
                           result
}: Props) => {
    return (
        <Card className="bg-green-500/10 backdrop-blur-sm border-green-500/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-green-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Program Output
                </CardTitle>
            </CardHeader>
            <CardContent>
                <pre className="text-green-300 text-xs font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                    {result.stdout}
                </pre>
            </CardContent>
        </Card>
    );
};

export default ProgramOutput;
