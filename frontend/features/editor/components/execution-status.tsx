import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {SubmissionResult} from "@/data";

interface Props{
    result: SubmissionResult
}

const ExecutionStatus = ({
    result
}: Props) => {
    return (
        <Card className="bg-blue-500/10 backdrop-blur-sm border-blue-500/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-blue-400 text-sm">Execution Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Status:</span>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                        {result.status.description}
                    </Badge>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{result.time}s</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Memory:</span>
                    <span className="text-white">{result.memory} KB</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExecutionStatus;
