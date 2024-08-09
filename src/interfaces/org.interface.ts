import mongoose from "mongoose";

export interface orgInterface {
    
    name: string;
    description: string;
    userId: mongoose.Types.ObjectId[];
}