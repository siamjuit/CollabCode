import { Request, Response } from "express";
import {User} from "../models/user.model";
import {createUserSchema} from "../utils/schema";

export const register = async ( req: Request, res: Response ) => {
    try{

        const verify = createUserSchema.safeParse(req.body);

        if( !verify.success ) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            });
            return;
        }

        const { email, password, username } = verify.data;

        const user = await User.findOne({
            email: verify.data.email
        });

        if( user ) {
            res.status(400).json({
                success: false,
                message: "User with email " +  email + " already exists",
                data: null
            });
            return;
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e,
            data: null
        });
    }
}

export const login = async ( req: Request, res: Response ) => {}
