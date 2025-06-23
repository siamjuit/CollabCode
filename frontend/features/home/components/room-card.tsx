"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { v4 as uuidV4 } from 'uuid';
import { Copy, Users, Plus } from 'lucide-react';
import {toast} from "sonner";

type RoomMode = 'join' | 'create';

const RoomCard = () => {
    const [mode, setMode] = useState<RoomMode>('join');
    const [roomId, setRoomId] = useState('');
    const [generatedRoomId, setGeneratedRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');


    const handleCreateRoom = () => {
        if (!roomName.trim() || !username.trim()) {
            toast.error("All field are required");
            return;
        }

        const newRoomId = uuidV4();
        setGeneratedRoomId(newRoomId);

        toast.success("Room created successfully.");
    };

    const handleJoinRoom = () => {
        if (!roomId.trim() || !username.trim()) {
            toast("All field are required");
            return;
        }

        toast("Room joined successfully.");
    };

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(generatedRoomId);
            toast.error("Room id copied to clipboard");
        } catch (e) {
            console.log(e);
            toast.error("Error copying room id to clipboard");
        }
    };

    const resetForm = () => {
        setRoomId('');
        setRoomName('');
        setGeneratedRoomId('');
        setUsername('');
    };

    const handleModeChange = (newMode: RoomMode) => {
        setMode(newMode);
        resetForm();
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="bg-black/40 backdrop-blur-xl border-gray-700/50 shadow-2xl">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-2xl font-bold text-center text-white">
                        Room Manager
                    </CardTitle>
                    <CardDescription className="text-center text-gray-300">
                        {mode === 'join' ? 'Join an existing room' : 'Create a new room for collaboration'}
                    </CardDescription>

                    <div className="flex bg-gray-800/50 rounded-lg p-1 gap-1">
                        <Button
                            variant={mode === 'join' ? 'default' : 'ghost'}
                            className={`flex-1 h-10 transition-all duration-300 cursor-pointer ${
                                mode === 'join'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                            }`}
                            onClick={() => handleModeChange('join')}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Join Room
                        </Button>
                        <Button
                            variant={mode === 'create' ? 'default' : 'ghost'}
                            className={`flex-1 h-10 transition-all duration-300 cursor-pointer ${
                                mode === 'create'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                            }`}
                            onClick={() => handleModeChange('create')}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Room
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-200 font-medium">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Enter your username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                        />
                    </div>

                    {mode === 'join' ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="roomId" className="text-gray-200 font-medium">
                                    Room ID
                                </Label>
                                <Input
                                    id="roomId"
                                    placeholder="Enter room ID..."
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                                />
                            </div>

                            <Button
                                onClick={handleJoinRoom}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Join Room
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="roomName" className="text-gray-200 font-medium">
                                    Room Name
                                </Label>
                                <Input
                                    id="roomName"
                                    placeholder="Enter room name..."
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
                                />
                            </div>

                            {generatedRoomId && (
                                <div className="space-y-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                    <Label className="text-emerald-300 font-medium text-sm">
                                        Your Room ID
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 font-mono text-sm px-3 py-1"
                                        >
                                            {generatedRoomId}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={copyRoomId}
                                            className="text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 p-2"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-emerald-200 text-xs">
                                        Share this ID with others to let them join your room
                                    </p>
                                </div>
                            )}

                            <Button
                                onClick={handleCreateRoom}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Room
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default RoomCard;
