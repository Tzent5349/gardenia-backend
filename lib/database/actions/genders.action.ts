"use server"

import {createGenderParams, updateGenderPraams, deleteGenderParams} from "@/types";
import { handleError } from "@/lib/utils";
import  connectToDatabase  from "@/lib/database";
import Gender from "@/lib/database/models/gender.model";
import { revalidatePath } from "next/cache";

export const  createGender = async ({gender}:createGenderParams) =>{
    try {
        await connectToDatabase();
        const newGender = await Gender.create({
            name: gender.name
        });
        return JSON.parse(JSON.stringify(newGender));
    } catch (error) {
        handleError(error);
    }
}

export const getAllGender = async () =>{
    try {
        await connectToDatabase();
        const genders = await Gender.find();
        return JSON.parse(JSON.stringify(genders));
    } catch (error) {
        handleError(error);
    }
}

export const getGenderById = async (genderId:string) =>{
    try {
        await connectToDatabase();
        const gender = await Gender.findById(genderId)
        return JSON.parse(JSON.stringify(gender))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteGender ({genderId}:deleteGenderParams){
    try {
        await connectToDatabase ();

        await Gender.findByIdAndDelete(genderId)
    } catch (error) {
        handleError(error)
    }
}

export async function updateGender ({gender}:updateGenderPraams){
    try {
        await connectToDatabase ();
        const updateGender = await Gender.findByIdAndUpdate(
            gender._id,
            {...gender},
            {new:true}
        )
        return JSON.parse(JSON.stringify(updateGender))
    } catch (error) {
        handleError(error)
    }
}