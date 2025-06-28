import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./config";

export const generateToken = (userId: string) => {
    const token = jwt.sign({
        userId
    }, JWT_SECRET, {
        expiresIn: "1h"
    });

    return token;
}
