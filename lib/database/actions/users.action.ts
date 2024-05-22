"use server"
import { handleError } from "@/lib/utils"
import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.model"
import { revalidatePath } from "next/cache"
import { createUserParams, updateUserParams } from "@/types"


export const createUser = async({user}:createUserParams)=>{
    try {
        await connectToDatabase();

        const newUser =  await User.create({userId:user.userId ,fullName:user.fullName, username:user.userName, email:user.email});
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
}

export const updateUser = async({user}:updateUserParams) =>{
    try {
        await connectToDatabase();
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {...user},
            {new:true}
        );
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error)
    }
}

export const getAllUser = async()=>{
    try {
        await connectToDatabase();
        const users = await User.find();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        handleError(error)
    }
}

export async function getUserById(userId:string){
    try {
        await connectToDatabase();
        const user = await User.findById(userId);
        if(!user) throw new Error("user not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error)
    }
}