"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EditorSidebar from "@/features/editor/components/editor-sidebar";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation";
import {Loader, PanelLeftIcon, Play} from "lucide-react";
import { initSocket } from "@/config/socket";
import { Socket } from "socket.io-client";
import { ACTION } from "@/lib/utils";
import { toast } from "sonner";
import { User } from "@/lib/types";
import {useCodeExecution} from "@/hooks/use-code-execution";
import {LANGUAGES} from "@/data";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Textarea} from "@/components/ui/textarea";
import ExecutionStatus from "@/features/editor/components/execution-status";
import ProgramOutput from "@/features/editor/components/program-output";
import ErrorOutput from "@/features/editor/components/error-output";
import CompilationOutput from "@/features/editor/components/compilation-output";
import GettingStarted from "@/features/editor/components/getting-started";
import {useAuth} from "@/features/auth/hooks/use-auth";

const EditorPage = () => {
    const params = useParams();
    const roomId = params.roomId as string;
    const searchParams = useSearchParams();
    const router = useRouter();

    const currUsername = searchParams.get("username") || "Anonymous";

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
    const [stdin, setStdin] = useState('');
    const [languageId, setLanguageId] = useState(LANGUAGES.JAVASCRIPT);

    const { submitAndPoll, reset, result, executeCode, error, loading } = useCodeExecution();

    const { isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await executeCode({
            source_code: code,
            language_id: languageId,
            stdin,
        });

        await submitAndPoll({
            source_code: code,
            language_id: languageId,
            stdin,
        });

    };


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

    if( !isAuthenticated ){
        toast.error("User not looged in.");
        redirect("/sign-in")
    }

    if (!currUsername) {
        toast.error("Username is required");
        redirect("/home");
    }

    return (
        <div>
            <SidebarProvider>
                <div className="flex w-full">
                    <EditorSidebar
                        roomId={roomId}
                        users={users}
                        onLeaveRoom={handleLeaveRoom}
                        onCopyRoomId={handleCopyRoomId}
                    />
                    <main className="flex-1 flex flex-col">
                        <header className="bg-black/40 border-b border-gray-700/50 p-4 flex items-center gap-4">
                            <SidebarTrigger className="text-white hover:bg-gray-700/50 p-2 rounded-md transition-colors">
                                <PanelLeftIcon color="white" size={24} />
                            </SidebarTrigger>
                            <div className="flex flex-1 justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-400">Collaborative coding environment</p>
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 cursor-pointer"
                                >
                                    {loading ? (
                                        <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Play className="w-4 h-4" />
                                    )}
                                    Run Code
                                </Button>
                            </div>
                        </header>

                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                            <div className="lg:col-span-2 space-y-4">
                                <Card className="bg-black/20 backdrop-blur-sm border-gray-700/30">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white">Code Editor</CardTitle>
                                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                                                Python
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="rounded-lg overflow-hidden">
                                            <CodeMirror
                                                value={code}
                                                height="400px"
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
                                    </CardContent>
                                </Card>

                                <Card className="bg-black/20 backdrop-blur-sm border-gray-700/30">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-white text-sm">Program Input (stdin)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            value={stdin}
                                            onChange={(e) => setStdin(e.target.value)}
                                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-mono text-sm resize-none"
                                            rows={4}
                                            placeholder="Enter input for your program here..."
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-4">
                                {loading && (
                                    <Card className="bg-yellow-500/10 backdrop-blur-sm border-yellow-500/30">
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Loader className="w-4 h-4 animate-spin text-yellow-400" />
                                                <span className="text-yellow-400 text-sm">Executing code...</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {error && (
                                    <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/30">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-red-400 text-sm flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                Execution Error
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <pre className="text-red-300 text-xs font-mono whitespace-pre-wrap break-words">
                                                {error}
                                            </pre>
                                        </CardContent>
                                    </Card>
                                )}

                                {result && (
                                    <>
                                        <ExecutionStatus result={result} />

                                        {result.stdout && (
                                            <ProgramOutput result={result} />
                                        )}

                                        {result.stderr && (
                                            <ErrorOutput result={result} />
                                        )}

                                        {result.compile_output && (
                                            <CompilationOutput result={result} />
                                        )}
                                    </>
                                )}

                                {!result && !error && !loading && (
                                    <GettingStarted />
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default EditorPage;
