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

const EditorSidebar = ({ roomName, users, onLeaveRoom, onCopyRoomId }: EditorSidebarProps) => {

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
        <Sidebar className="bg-black/80 border-r border-gray-700/30 backdrop-blur-md mt-16 pb-16">
            <SidebarHeader className="border-b border-gray-700/30 p-4 bg-transparent bg-sidebar-accent-foreground">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate">{roomName}</h2>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-sidebar-accent-foreground">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-500 text-sm font-medium">
                        Connected Users ({users.filter(u => u.isOnline).length})
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {users.map((user) => (
                                <SidebarMenuItem key={user.id}>
                                    <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800/30 transition-colors">
                                        <div className="relative">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={`text-xs font-medium ${
                                                    user.isOnline
                                                        ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white'
                                                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400'
                                                }`}>
                                                    {user.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${
                                                user.isOnline ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-gray-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-200 truncate">
                                                {user.username}
                                            </p>
                                            <p className="text-xs text-gray-500">
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

            <SidebarFooter className="border-t border-gray-700/30 p-4 space-y-3 bg-sidebar-accent-foreground">
                <Button
                    onClick={handleCopyRoomId}
                    variant="outline"
                    className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border-gray-600/30 transition-colors cursor-pointer"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Room ID
                </Button>
                <Button
                    onClick={handleLeaveRoom}
                    variant="destructive"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/25 transition-all duration-200 cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave Room
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

export default EditorSidebar;
