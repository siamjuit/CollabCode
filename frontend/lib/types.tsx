export interface User {
    username: string;
    socketId: string;
    client: [
        {
            socketId: string;
            username: string;
        }
    ]
}
