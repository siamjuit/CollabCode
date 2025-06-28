import express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import {createRoom, deleteRoom, getRoomById, getUserRooms, updateRoom} from "../controllers/room.controller";

const roomRouter = express.Router();

roomRouter.post("/create-room", validateToken, createRoom);
roomRouter.patch('/update-room/:roomId', validateToken, updateRoom);
roomRouter.get('/:roomId', validateToken, getRoomById);
roomRouter.get("/user-room", validateToken, getUserRooms);
roomRouter.delete("/:roomId", validateToken, deleteRoom);

export default roomRouter;
