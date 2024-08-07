import { Request } from "express";

export interface userInterface {
    _id: string;
    firstName : string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword:string;
    phone: string;
    role: 'user' | 'admin'
}

export interface URequest extends Request{
    user?: userInterface
}