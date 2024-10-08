import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs"
import { createUser } from "../service/user.service";
import { URequest, userInterface } from "../interfaces/user.interface";
import { createNewOrg } from "../service/org.service";
import jwt from "jsonwebtoken"
import Organisation from "../models/org.model";
import { ObjectId } from "mongodb";



export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
    const body:userInterface = req.body;

    // console.log(body.password)

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

    const user = await createUser({...body, password:hashPassword});

    const orgName = `${firstName}'s Organisation`;

    const userOrg = await createNewOrg({
        name: orgName,
        description: "This is a self auto created user organisation",
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

// 
export const loginUser = async (req:Request, res:Response, next:NextFunction) =>{
   try {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("Email and password cannot be empty!")
    }

    const user = await User.findOne ({email:email.toLowerCase()})
    if (!user){
        res.status(404);
        throw new Error("User not found, maybe try signing up")
    };

    if (user && (await bcrypt.compare(password, user.password as string))){
        const token = jwt.sign({
            _id:user.id,
            email: user.email
        },
        process.env.ACCESS_KEY as string,
        {expiresIn:"5h"}
    );
    res.status(400).json({
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: {
            userId: user.id,
            firstName: user.firstName,
            lastNmae: user.lastName,
            email: user.email,
            phone: user.phone,
          },
        },
      });
    }else{
        res.status(401);
        throw new Error("Unsuccessful login, password incorrect!"); 
    }
    
   } catch (error) {
        next(error)
   }
}

// Check Route 
export const checkAuth = async (req:URequest, res:Response) =>{
    res.status(200).json(req.user?._id)
};

// Get a user
export const getUser = async (req: URequest, res: Response, next:NextFunction) =>{
    const userId = req.user?._id
    const {id} = req.params

    try {

        // Checks if ID matches
        if (userId === id) {
             // 
            const organisations = await Organisation.find({userId}).populate('userId');

            const userInOrg = organisations.some(org =>org.userId.some((users : any) =>users.id === id))

            if (!userInOrg) {
                res.status(403);
                throw new Error("Access denied!")
            };

            const user = await User.findById(id);
            if (!user){
                res.status(404)
                throw new Error("User not found")
            };

            res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastNmae: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
            })

        }else{
            res.status(401);
            throw new Error("Not authorized")
        }        
        
    } catch (error) {
        next(error)
    }
}


