import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { createUser } from "../service/user.service";
import { userInterface } from "../interfaces/user.interface";

const registerUser = async (req: Request, res: Response) => {
    const body:userInterface = req.body;

    if (!body){
        res.status(422);
        throw new Error("Field must not be empty!")
    };

    if (body.password !== body.confirmPassword){
        res.status(400);
        throw new Error("Password does not match!")
    };

    const CheckUser = await User.findOne({email:body.email.toLowerCase()});

    if (CheckUser){
        res.status(400);
        throw new Error("User already exist!")
    }

    const hashPassword = await bcrypt.hash(body.password, 10)

    const user = await createUser({...body, password:hashPassword});

    if (user){
        res.status(201).json({
            
        })
    }

};