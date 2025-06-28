"use client"

import React from 'react';
import {Home} from "lucide-react";
import JoinRoomForm from "@/features/dashboard/components/join-room-form";
import CreateRoomForm from "@/features/dashboard/components/create-room-form";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {createRoom} from "@/features/dashboard/api";
import {useRouter} from "next/navigation";

const DashboardHeader = () => {

    const {token} = useAuth();
    const router = useRouter();

    const handleCreateRoom = async (roomData: { name: string; description: string; language: string }) => {
        await createRoom(
            roomData,
            token!
        )
        window.location.reload();
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
