"use client";

import { useState } from 'react';
import Alert from "@/features/dashboard/components/alert";
import RoomCard from "@/features/dashboard/components/room-card";
import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import EmptyCard from "@/features/dashboard/components/empty-card";

export interface Room {
    id: string;
    name: string;
    language: string;
    createdAt: Date;
    participants: number;
}



export default function MyRoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([
        {
            id: '1',
            name: 'Frontend Masters Study Group',
            language: 'JavaScript',
            createdAt: new Date('2024-01-15T10:30:00'),
            participants: 8,
        },
        {
            id: '2',
            name: 'React Advanced Patterns',
            language: 'React',
            createdAt: new Date('2024-01-14T15:45:00'),
            participants: 12,
        },
        {
            id: '3',
            name: 'Algorithm Practice Session',
            language: 'Python',
            createdAt: new Date('2024-01-13T09:15:00'),
            participants: 6,
        },
        {
            id: '4',
            name: 'TypeScript Deep Dive',
            language: 'TypeScript',
            createdAt: new Date('2024-01-12T14:20:00'),
            participants: 10,
        },
        {
            id: '5',
            name: 'Backend Architecture Discussion',
            language: 'Node.js',
            createdAt: new Date('2024-01-11T16:00:00'),
            participants: 7,
        },
        {
            id: '6',
            name: 'Competitive Programming Club',
            language: 'C++',
            createdAt: new Date('2024-01-10T11:30:00'),
            participants: 15,
        },
    ]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

    const handleDeleteRoom = (room: Room) => {
        setRoomToDelete(room);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (roomToDelete) {
            setRooms(rooms.filter(room => room.id !== roomToDelete.id));
            setRoomToDelete(null);
        }
        setDeleteDialogOpen(false);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* App Bar */}
            <DashboardHeader />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {rooms.length === 0 ? (
                    <EmptyCard />
                ) : (
                    <div className="space-y-4">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} onClick={handleDeleteRoom} />
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
