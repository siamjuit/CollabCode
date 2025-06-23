import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, LogOut } from 'lucide-react';
import {toast} from "sonner";

interface User {
    id: number;
    username: string;
    avatar: string;
    isOnline: boolean;
}

interface EditorSidebarProps {
    roomName: string;
    roomId: string;
    users: User[];
    onLeaveRoom: () => void;
    onCopyRoomId: () => void;
}

const EditorSidebar = ({ roomName, roomId, users, onLeaveRoom, onCopyRoomId }: EditorSidebarProps) => {

    const handleCopyRoomId = async () => {
        try {
            onCopyRoomId();
            toast.success("Room ID copied to clipboard");
        } catch (err) {
            console.log(err);
            toast.error("Error copying room ID to clipboard. Please try again later.");
        }
    };

    const handleLeaveRoom = () => {
        toast.success("Room left successfully.");
        setTimeout(onLeaveRoom, 1000);
    };

    return (
        <Sidebar className="border-r border-gray-700/50 mt-20">
            <SidebarHeader className="border-b border-gray-700/50 p-4">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white truncate">{roomName}</h2>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 font-mono text-xs">
                            {roomId}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyRoomId}
                            className="text-gray-400 hover:text-white h-6 w-6 p-0"
                        >
                            <Copy className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-400">
                        Connected Users ({users.filter(u => u.isOnline).length})
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {users.map((user) => (
                                <SidebarMenuItem key={user.id}>
                                    <SidebarMenuButton className="flex items-center gap-3 px-3 py-2">
                                        <div className="relative">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={`text-xs font-medium ${
                                                    user.isOnline
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-gray-600 text-gray-300'
                                                }`}>
                                                    {user.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-sidebar ${
                                                user.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {user.username}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {user.isOnline ? 'Online' : 'Offline'}
                                            </p>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-700/50 p-4">
                <Button
                    onClick={handleLeaveRoom}
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave Room
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

export default EditorSidebar;
