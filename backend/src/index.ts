import express from 'express';
import http from "http";
import { Server } from "socket.io";
import {ACTION} from "./utils/actions";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const userSocketMap: Record<string, string> = {};

const getAllConnectedClients = (roomId: string) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    });
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on(ACTION.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
    })

});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
