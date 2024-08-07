import jwt from "jsonwebtoken"
import User from "../models/user.model"
import { NextFunction, Request, Response } from "express"
import { URequest, userInterface } from "../interfaces/user.interface";


export const validateToken = async (req:URequest, res:Response, next:NextFunction) =>{

    const authHeader = req.headers ['authorization'];
    
    try {

    if (!authHeader && !authHeader?.startsWith('Bearer ')){

        res.status(400)
        throw new Error ("No token provided, authorization denied!")   
    };

    const token = authHeader.split(' ')[1]

    const decoded: userInterface | any = jwt.verify(token, process.env.ACCESS_KEY as string)
    
    const user = await User.findById(decoded._id );
    if(!user){
        res.status(400);
        throw new Error("User not found, authorization denied")
    }

    req.user  = decoded;
    next()

        
    } catch (error) {
        next(error)
    }
}