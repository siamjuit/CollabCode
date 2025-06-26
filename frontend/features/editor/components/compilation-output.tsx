import React from 'react';
import {SubmissionResult} from "@/data";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

interface Props {
    result: SubmissionResult
}

const CompilationOutput = ({
    result
}: Props) => {
    return (
        <Card className="bg-yellow-500/10 backdrop-blur-sm border-yellow-500/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-yellow-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Compilation Output
                </CardTitle>
            </CardHeader>
            <CardContent>
                <pre className="text-yellow-300 text-xs font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                    {result.compile_output}
                </pre>
            </CardContent>
        </Card>
    );
};

export default CompilationOutput;
