"use client"

import React, {useEffect, useRef, useState} from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import EditorSidebar from '@/features/editor/components/editor-sidebar';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import {redirect, useParams, useRouter, useSearchParams} from "next/navigation";
import {PanelLeftIcon} from "lucide-react";
import {initSocket} from "@/config/socket";
import {Socket} from "socket.io-client";
import {ACTION} from "@/lib/utils";
import {toast} from "sonner";

const EditorPage = () => {
    const params =  useParams();
    const roomId = params.roomId;
    const searchParams = useSearchParams();
    const router = useRouter();

    const currUsername = searchParams.get('username') || 'Anonymous';
    const roomName = searchParams.get('roomName') || `Room ${roomId}`;

    const [code, setCode] = useState(`// Welcome to the collaborative code editor!

function hello() {
  console.log("Hello, ${currUsername}!");
  console.log("You're now in room: ${roomId}");
}

hello();`);

    // Mock users for demonstration
    const [users, setUsers] = useState<any[]>([])

    const handleLeaveRoom = () => {
        router.push("/home")
    };

    const handleCopyRoomId = async () => {
        if (roomId) {
            await navigator.clipboard.writeText(roomId as string);
        }
    };

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {

        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleError(err))
            socketRef.current.on('connect_failed', (err) => handleError(err))

            const handleError = (e: Error) => {
                console.log(e);
                toast.error("Error joining room")
                router.push("/home")
            }

            socketRef.current.emit(ACTION.JOIN, {
                roomId: roomId as string,
                username: currUsername,
            });

            socketRef.current.on(ACTION.JOINED, ({ clients, username, socketId }) => {
                if( username  !== currUsername ){
                    toast.success(`${username} joined the room`)
                }

                console.log(clients)

                setUsers(clients)
            })
        }

        init();
    }, []);

    if( !currUsername ){
        toast.error("Username is required")
        redirect('/home')
    }

    return (
        <div>
            <SidebarProvider>
                <div className="flex w-full">
                    <EditorSidebar
                        roomName={roomName}
                        roomId={roomId as string || ''}
                        users={users}
                        onLeaveRoom={handleLeaveRoom}
                        onCopyRoomId={handleCopyRoomId}
                    />
                    <main className="flex-1 flex flex-col">
                        <header className="bg-black/40 border-b border-gray-700/50 p-4 flex items-center gap-4">
                            <SidebarTrigger className="text-white">
                                <PanelLeftIcon color="white" size={24} />
                            </SidebarTrigger>
                            <div className="flex-1">
                                <h1 className="text-xl font-bold text-white">{roomName}</h1>
                                <p className="text-sm text-gray-400">Room ID: {roomId as string}</p>
                            </div>
                        </header>

                        <div className="flex-1 p-4">
                            <div className="h-full bg-black/20 backdrop-blur-sm border border-gray-700/30 rounded-lg overflow-hidden">
                                <CodeMirror
                                    value={code}
                                    height="100%"
                                    theme={oneDark}
                                    extensions={[javascript({ jsx: true })]}
                                    onChange={(value) => setCode(value)}
                                    basicSetup={{
                                        lineNumbers: true,
                                        foldGutter: true,
                                        dropCursor: false,
                                        allowMultipleSelections: false,
                                        indentOnInput: true,
                                        bracketMatching: true,
                                        closeBrackets: true,
                                        autocompletion: true,
                                        highlightSelectionMatches: false,
                                    }}
                                    className="text-sm"
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default EditorPage;
