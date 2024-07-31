import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        lowercase: true
    },
    lastName: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique:true
    },
    password: {
        type: String,
        require: true,
    },
    phone: String,
    role:{
        type:String,
        enum: ['admin','user'],
        default: 'user'

    }
    
},
{
    timestamps : true
}
)

const User = mongoose.model("User", userSchema);

export default User