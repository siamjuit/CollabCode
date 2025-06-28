import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Calendar, Code, MoreVertical, Trash2, Users} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {LANGUAGES} from "@/data";
import {formatDate} from "@/lib/utils";

interface Props{
    room :any,
    onClick: (room :any) => void
}

const languageColors: Record<string, string> = {
    'Bosque': 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    'C3': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
    'C': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'C++': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'C# (Mono)': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Java': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Nim': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Python 2.7': 'bg-green-600/20 text-green-300 border-green-600/30',
    'Python 3.10': 'bg-green-400/20 text-green-200 border-green-400/30',
};


const RoomCard = ({
    room,
    onClick
}: Props) => {
    return (
        <Card
            key={room.id}
            className="w-full bg-gray-900/40 border-gray-800/50 hover:border-gray-700/50 transition-all duration-200 hover:bg-gray-900/60 group cursor-pointer"
        >
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-6 flex-1">
                    {/* Room Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors mb-2">
                            {room.name}
                        </h3>
                        <div className="flex items-center space-x-4">
                            <Badge
                                variant="outline"
                                className={`${languageColors[LANGUAGES[room.language]] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'} text-sm`}
                            >
                                <Code className="h-3 w-3 mr-1" />
                                {LANGUAGES[room.language] || 'N/A'}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-400">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(room.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm"
                        >
                            <DropdownMenuItem
                                onClick={() => onClick(room)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Room
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
};

export default RoomCard;
