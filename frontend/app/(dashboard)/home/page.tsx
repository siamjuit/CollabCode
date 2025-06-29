"use client";

import {useEffect, useState} from 'react';
import Alert from "@/features/dashboard/components/alert";
import RoomCard from "@/features/dashboard/components/room-card";
import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import EmptyCard from "@/features/dashboard/components/empty-card";
import {getUserRooms} from "@/features/dashboard/api";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {Loader} from "lucide-react";
import {Room} from "@/features/dashboard/types";
import {toast} from "sonner";
import {redirect} from "next/navigation";


const  Page = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);

    const {token, isAuthenticated, user} = useAuth();

    const handleDeleteRoom = (room: Room) => {
        setRoomToDelete(room);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (roomToDelete) {
            setRooms(rooms.filter(room => room._id !== roomToDelete._id));
            setRoomToDelete(null);
        }
        setDeleteDialogOpen(false);
    };


    useEffect(() => {

        const fetchRooms = async () => {
            const rooms = await getUserRooms(token!);
            setRooms(rooms);
            setLoading(false);
        }

        fetchRooms();

    }, []);

    if( loading ){
        return (
            <div className={"flex min-h-screen justify-center items-center text-white"} >
                <Loader className={"animate-spin"} />
            </div>
        );
    }

    if( !isAuthenticated || !user || !token){
        toast.error("User not logged in");
        redirect("/sign-in")
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {rooms.length === 0 ? (
                    <EmptyCard />
                ) : (
                    <div className="space-y-4">
                        {rooms.map((room) => (
                            <RoomCard key={room._id} room={room} onClick={handleDeleteRoom} />
                        ))}
                    </div>
                )}
            </main>

            <Alert
                title={"Delete Room"}
                description={`Are you sure you want to delete ${roomToDelete?.name}? This action cannot be undone
                            and all room data will be permanently lost.`}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onClick={confirmDelete}
            />
        </div>
    );
}


export default Page;
