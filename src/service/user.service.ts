import { userInterface } from "../interfaces/user.interface"
import User from "../models/user.model"

export const createUser = async (data: userInterface) =>{
    return await User.create(data)
};
