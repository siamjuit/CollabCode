import { Request, Response } from "express";
import {createRoomSchema, updateRoomSchema} from "../utils/schema";
import {Room} from "../models/room.model";
import mongoose from "mongoose";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const verify = createRoomSchema.safeParse(req.body);

        if (!verify.success) {
            res.status(400).json({
                success: false,
                message: `All fields are required`,
                data: null
            });
            return;
        }

        const { name, description, language } = verify.data;

        const room = await Room.create({
            name,
            description: description ?? "",
            language: language,
            admin: req.userId,
            members: [req.userId]
        });

        res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: room
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    try{

        const { roomId } = req.params;

        const verify = updateRoomSchema.safeParse(req.body);

        if (!verify.success) {
            res.status(400).json({
                success: false,
                message: verify.error.errors[0].message,
                data: null
            });
            return;
        }

        const { members, ...roomUpdates } = verify.data;

        if( Object.keys(roomUpdates).length > 0 ){
            await Room.findByIdAndUpdate(roomId, roomUpdates);
        }

        if( members ){
            let operation;
            const { action, userIds } = members;

            switch (action) {
                case "add":
                    operation = { $addToSet: { members: { $each: userIds } } }
                    break;

                case "remove":
                    operation = { $pull: { members: { $in: userIds } } }
                    break;

                case "set":
                    operation = { $set: { members: userIds } };
                    break;
            }

            await Room.findByIdAndUpdate(roomId, operation);

        }

        const updatedRoom = await Room.findById(roomId).populate("members", "name email");

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            data: updatedRoom
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
}

export const getUserRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find({
            $or: [
                { admin: req.userId },
                { members: req.userId }
            ]
        }).populate('admin', 'username email')
            .populate('members', 'username email');

        res.status(200).json({
            success: true,
            message: "Rooms fetched successfully",
            data: rooms
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try{

        const { roomId } = req.params;

        if( !roomId ){
            res.status(400).json({
                success: false,
                message: `Room id is required`,
                data: null
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(roomId)) {
             res.status(400).json({
                success: false,
                message: "Invalid room ID format",
                data: null
             });
             return;
        }

        const room = await Room.findById(roomId);

        if( !room ){
            res.status(400).json({
                success: false,
                message: "Room not found",
                data: null
            });
            return;
        }

        await room.populate("members", "name email")
        await room.populate("admin", "name email");

        res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            data: room
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
}

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
             res.status(400).json({
                success: false,
                message: "Room ID is required",
                data: null
             });
             return;
        }

        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            res.status(400).json({
                success: false,
                message: "Invalid room ID format",
                data: null
            });
            return;
        }

        const room = await Room.findById(roomId);

        if (!room) {
             res.status(404).json({
                success: false,
                message: "Room not found",
                data: null
            });
            return;
        }

        if (req.userId !== room.admin.toString()) {
             res.status(403).json({
                success: false,
                message: "Only room admins can delete the room",
                data: null
            });
            return;
        }

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        res.status(200).json({
            success: true,
            message: "Room deleted successfully",
            data: {
                roomId: deletedRoom!._id!,
                name: deletedRoom!.name
            }
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
};

