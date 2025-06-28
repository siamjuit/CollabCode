import React from 'react';
import {Home} from "lucide-react";
import {JoinRoomForm} from "@/features/dashboard/components/join-room-form";
import {CreateRoomForm} from "@/features/dashboard/components/create-room-form";

const DashboardHeader = () => {

    const handleCreateRoom = (roomData: { name: string; description?: string; language: string }) => {
    };

    const handleJoinRoom = (roomId: string) => {

    };

    return (
        <header className="border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <Home className="h-6 w-6 text-white" />
                        <h1 className="text-xl font-semibold text-white">My Rooms</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <JoinRoomForm onJoinRoom={handleJoinRoom} />
                        <CreateRoomForm onCreateRoom={handleCreateRoom} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
