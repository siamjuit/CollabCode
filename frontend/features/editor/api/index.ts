const API_BASE_URL = 'http://localhost:8080/api/room';

export const saveCodeToDatabase = async (roomId: string, code: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/update-room/${roomId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
    });

    if (!response.ok) {
        throw new Error('Failed to save code');
    }


    const {data} = await response.json();
    console.log(data)
    return data
};
