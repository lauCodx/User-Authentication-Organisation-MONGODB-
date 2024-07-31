import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs"
import { createUser } from "../service/user.service";
import { userInterface } from "../interfaces/user.interface";
import { createNewOrg } from "../service/org.service";

export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
    const body:userInterface = req.body;

    console.log(body.password)

    const { firstName, lastName, email,  password, confirmPassword, phone, role} = body;


    if (!body){
        res.status(422);
        throw new Error("Fields can not be empty!")
    };


    if (password !== confirmPassword){
        res.status(400);
        throw new Error("Password does not match!")
    };


    const CheckUser = await User.findOne({email:email.toLocaleLowerCase()});

    if (CheckUser){
        res.status(400);
        throw new Error("User already exist!")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await createUser({...body, password:hashPassword, role:role});

    const orgName = `${firstName}'s Organisation`;

    const userOrg = await createNewOrg({
        name: orgName,
        description: "This is the first organisation",
        userId: user.id
    })

    if (userOrg){
        console.log('User Organisation was created successfully')
    }else{
        console.log("Error creating User Organisation")
    }

    if (user){
        res.status(201).json({
            status: "success",
            message: "Registration successful",
            data:{
                user:{
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            }
        })
    }else{
        res.status(400);
        throw new Error("Registration unsuccessfull!")
    }

    
   } catch (error) {
    next(error)

   }
};