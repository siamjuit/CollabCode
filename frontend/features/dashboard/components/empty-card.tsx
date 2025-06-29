import React from 'react';
import {Home} from "lucide-react";

const EmptyCard = () => {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center text-center py-12">
            <div className="rounded-full bg-gray-800/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No rooms yet</h3>
            <p className="text-gray-500 mb-6">Create your first room to start collaborating</p>
        </div>
    );
};

export default EmptyCard;
