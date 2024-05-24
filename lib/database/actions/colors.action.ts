"use server"

import { CreateColorParams, DeleteColorParams, UpdateColorParams } from "@/types"
import { handleError } from "@/lib/utils"
import  connectToDatabase  from "@/lib/database"
import Color from "@/lib/database/models/color.model"
import { revalidatePath } from "next/cache"

export const createColor = async ({color}: CreateColorParams) => {
try {
    await connectToDatabase();

    const newColor = await Color.create({name: color.name, value:color.value});
    revalidatePath("/dashboard/colors")
    return JSON.parse(JSON.stringify(newColor));
} catch (error) {
    handleError(error);
}
}

export const getAllColor = async () => {
    try {
        
        await connectToDatabase();
        const colors = await Color.find();
        return JSON.parse(JSON.stringify(colors));

    } catch (error) {
        handleError(error);
    }
}

export async function  getColorById  (colorId:string){
    try {
        await connectToDatabase();
        const color = await Color.findById(colorId);
        if(!color) throw new Error("No color found");
            
        return JSON.parse(JSON.stringify(color));
        
    } catch (error) {
        handleError(error);
    }
}

export async function deleteColor ({colorId}:DeleteColorParams){
    try {
        await connectToDatabase();
        const deleteColor = await Color.findByIdAndDelete(colorId);
        if(deleteColor) revalidatePath("/dashboard/colors")
    } catch (error) {
        handleError(error);
    }
}

export async function updateColor ({color}:UpdateColorParams){
    try {
        await connectToDatabase();
        const updatedColor = await Color.findByIdAndUpdate(
            color._id,
            {...color},
            {new:true}
        );
        revalidatePath("/dashboard/color")
        return JSON.parse(JSON.stringify(updatedColor));
    } catch (error) {
        handleError(error);
    }
}