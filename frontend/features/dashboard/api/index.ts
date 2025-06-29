import {toast} from "sonner";

const API_BASE_URL = 'http://localhost:8080/api/room';

interface CreateRoomProps {
    name: string;
    description: string;
    language: string;
}

export const createRoom = async (roomData: CreateRoomProps, token: string) => {
    try{
        console.log(token)
        console.log(roomData)
        const response = await fetch(`${API_BASE_URL}/create-room`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: roomData.name,
                description: roomData.description,
                language: Number(roomData.language),
            }),
        });

        if( !response.ok ) {
            console.log(response)
            throw new Error(response.statusText)
        }

        const data = await response.json();
        toast.success("Room created successfully")
        return data;
    } catch (e) {
        console.log(e)
        toast.error("Error creating room")
    }
}

export const getUserRooms = async (token: string) => {
    try{
        const response = await fetch(`${API_BASE_URL}/user/rooms`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if( !response.ok ){
            console.log(response)
            toast.error("Error fetching rooms")
        }
        const {data} = await response.json();
        return data;
    } catch (e) {
        console.log(e)
        toast.error("Error fetching rooms");
        return []
    }
}

export const getRoomById = async (token: string, roomId: string) => {
    try{

        const response = await fetch(`${API_BASE_URL}/${roomId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if( !response.ok ){
            console.log(response);
            toast.error("Error fetching room");
            return;
        }

        const {data} = await response.json();

        return data;

    } catch (e) {
        toast.error("Error fetching room");
    }
}


export const joinRoom = async (roomId: string, userId: string, token: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update-room/${roomId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                members: {
                    action: "add",
                    userIds: [userId]
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User added to room members:', data);
        return data;
    } catch (error) {
        console.error('Error adding user to room:', error);
        toast.error("Failed to join room.")
    }
};
