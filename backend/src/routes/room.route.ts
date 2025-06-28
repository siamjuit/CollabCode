import express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import {createRoom, getRoomById, getRoomsByUser, updateRoom} from "../controllers/room.controller";

const roomRouter = express.Router();

roomRouter.post("/create-room", validateToken, createRoom);
roomRouter.patch('/update-room/:id', validateToken, updateRoom);
roomRouter.get('/:id', validateToken, getRoomById);
roomRouter.get("/user/:id", validateToken, getRoomsByUser);
roomRouter.delete("/:id", validateToken, deleteRoom);

export default roomRouter;
