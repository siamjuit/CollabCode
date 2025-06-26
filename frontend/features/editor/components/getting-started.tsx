import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const GettingStarted = () => {
    return (
        <Card className="bg-gray-500/10 backdrop-blur-sm border-gray-500/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-400 space-y-2">
                <p>• Write your code in the editor</p>
                <p>• Add input in the stdin section if needed</p>
                <p>• Click &#34;Run Code&#34; to execute</p>
                <p>• Collaborate in real-time with other users</p>
            </CardContent>
        </Card>
    );
};

export default GettingStarted;
