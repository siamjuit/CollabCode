// User interface for admin and members
interface RoomUser {
    _id: string;
    email: string;
}

export interface Room {
    _id: string;
    admin: RoomUser;
    name: string;
    description: string;
    language: number;
    members: RoomUser[];
    createdAt: string;
    updatedAt: string;
    code: string;
}


