import React from 'react';
import {Home, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";

const EmptyCard = () => {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center text-center py-12">
            <div className="rounded-full bg-gray-800/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No rooms yet</h3>
            <p className="text-gray-500 mb-6">Create your first room to start collaborating</p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Room
            </Button>
        </div>
    );
};

export default EmptyCard;
