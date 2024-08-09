import { NextFunction, Response } from "express";
import { URequest } from "../interfaces/user.interface";
import Organisation from "../models/org.model"
import { ObjectId } from "mongodb";


export const getAllOrg =  async (req: URequest, res: Response, next:NextFunction) =>{
    try {
        const userId = req.user?._id;

        const getOrganisation = await Organisation.find({userId})

        if (getOrganisation){
            res.status(200).json({
                status: "success",
                message: "Organisation fetched successfully",
                organisations: {
                    data:getOrganisation
                }
            })
        }
    } catch (error) {
        next(error)
    }
}

// 
export const getOrgById =  async (req: URequest, res: Response, next:NextFunction) => {
    const id = req.params.orgId;
    const userId = req.user?._id

    console.log(id)
    console.log(userId)


   try {
    if (!id || !userId){
        res.status(400);
        throw new Error("Invalid ID formats")
    }
    const organisation = await Organisation.find({userId: userId}).populate('userId');

    if (organisation.length === 0){
        res.status(404);
        throw new Error ("No organisation found")
    }

    if(organisation){
        res.status(404).json({
            status: "success",
            message: "Retrieved successfully!",
            data: organisation.map(org => ({
                id :org.id,
                name: org.name,
                description: org.description,
                userId: org.userId.map(( user : any) =>({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }))
            }))
        })
        
    }else{
        res.status(404);
        throw new Error ("Organisation not found")
    }

   } catch (error) {
        next(error)
   }
};

export const addUserToOrg = async (req: URequest, res: Response, next:NextFunction) => {
    const id = req.params.orgId
    const reqUserId = req.user?._id

    try {
        
    if (!id || !reqUserId){
        res.status(400);
        throw new Error("Invalid ID formats");
    };

    const organisation = await Organisation.findById(id);
    if (!organisation) {
        res.status(400);
        throw new Error ("Organisation not found")
    }

   if ( organisation.userId.includes(new ObjectId(reqUserId))){
        res.status(400);
        throw new Error ("User already a member")
   };

   organisation.userId.push(new ObjectId (reqUserId));

   await organisation.save()

   res.status(200).json({
        status: "success",
        message: "User added to organisation successfully"
   })


        
    } catch (error) {
        next(error)
    }

} 