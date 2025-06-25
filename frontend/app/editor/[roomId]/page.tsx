"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EditorSidebar from "@/features/editor/components/editor-sidebar";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation";
import { PanelLeftIcon } from "lucide-react";
import { initSocket } from "@/config/socket";
import { Socket } from "socket.io-client";
import { ACTION } from "@/lib/utils";
import { toast } from "sonner";
import { User } from "@/lib/types";

const EditorPage = () => {
    const params = useParams();
    const roomId = params.roomId as string;
    const searchParams = useSearchParams();
    const router = useRouter();

    const currUsername = searchParams.get("username") || "Anonymous";
    const roomName = searchParams.get("roomName") || `Room ${roomId}`;

    const [code, setCode] = useState(`// Welcome to the collaborative code editor!

function hello() {
  console.log("Hello!");
  console.log("You're now in room: ${roomId}");
}

hello();`);

    const [users, setUsers] = useState<User[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const hasInitialized = useRef(false);
    const isRemoteUpdate = useRef(false);

    const handleLeaveRoom = () => {
        socketRef.current?.emit('leave');
        router.push("/home");
    };

    const handleCopyRoomId = async () => {
        if (roomId) {
            await navigator.clipboard.writeText(roomId);
            toast.success("Room ID copied!");
        }
    };

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const init = async () => {
            const socket = await initSocket();
            socketRef.current = socket;

            const handleError = (e: Error) => {
                console.error(e);
                toast.error("Error joining room");
                router.push("/home");
            };

            socket.on("connect_error", handleError);
            socket.on("connect_failed", handleError);

            socket.emit(ACTION.JOIN, {
                roomId,
                username: currUsername,
            });

            socket.on(ACTION.JOINED, ({ clients, username }) => {
                if (username !== currUsername) {
                    toast.success(`${username} joined the room`);
                }
                setUsers(clients);
                socket.emit(ACTION.REQUEST_SYNC, {
                    roomId,
                    socketId: socket.id,
                });
            });

            socket.on(ACTION.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} disconnected`);
                setUsers((prevUsers) =>
                    prevUsers.filter((u) => u.socketId !== socketId)
                );
            });

            socket.on(ACTION.SYNC_CODE, ({ code: incomingCode }) => {
                if (incomingCode !== null) {
                    isRemoteUpdate.current = true;
                    setCode(incomingCode);
                }
            });

            socket.on(ACTION.CODE_CHANGE, ({ code: incomingCode }) => {
                if (incomingCode !== null) {
                    isRemoteUpdate.current = true;
                    setCode(incomingCode);
                }
            });
        };

        init();

        return () => {
            const socket = socketRef.current;
            if (socket) {
                socket.disconnect();
                socket.off("connect_error");
                socket.off("connect_failed");
                socket.off(ACTION.JOINED);
                socket.off(ACTION.DISCONNECTED);
                socket.off(ACTION.SYNC_CODE);
                socket.off(ACTION.CODE_CHANGE);
                socketRef.current = null;
            }
        };
    }, []);

    const handleCodeChange = (value: string) => {
        if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
        }

        setCode(value);

        socketRef.current?.emit(ACTION.CODE_CHANGE, {
            roomId,
            code: value,
        });
    };

    if (!currUsername) {
        toast.error("Username is required");
        redirect("/home");
    }

    return (
        <div>
            <SidebarProvider>
                <div className="flex w-full">
                    <EditorSidebar
                        roomName={roomName}
                        roomId={roomId}
                        users={users}
                        onLeaveRoom={handleLeaveRoom}
                        onCopyRoomId={handleCopyRoomId}
                    />
                    <main className="flex-1 flex flex-col">
                        <header className="bg-black/40 border-b border-gray-700/50 p-4 flex items-center gap-4">
                            <SidebarTrigger className="text-white cursor-pointer">
                                <PanelLeftIcon color="white" size={24} />
                            </SidebarTrigger>
                            <div className="flex-1">
                                <h1 className="text-xl font-bold text-white">{roomName}</h1>
                            </div>
                        </header>

                        <div className="flex-1 p-4">
                            <div className="h-full bg-black/20 backdrop-blur-sm border border-gray-700/30 rounded-lg overflow-hidden">
                                <CodeMirror
                                    value={code}
                                    height="100%"
                                    theme={oneDark}
                                    extensions={[javascript({ jsx: true })]}
                                    onChange={(value) => handleCodeChange(value)}
                                    basicSetup={{
                                        lineNumbers: true,
                                        foldGutter: true,
                                        dropCursor: true,
                                        allowMultipleSelections: true,
                                        indentOnInput: true,
                                        bracketMatching: true,
                                        closeBrackets: true,
                                        autocompletion: true,
                                        highlightSelectionMatches: true,
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
