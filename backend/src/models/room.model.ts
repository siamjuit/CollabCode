import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    code: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

export const Room = mongoose.model("Room", roomSchema);
