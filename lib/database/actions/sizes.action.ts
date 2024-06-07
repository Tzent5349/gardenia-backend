"use server"

import { CreateSizeParams, UpdateSizeParams, DeleteSizeParams } from "@/types"
import { handleError } from "@/lib/utils";
import  connectToDatabase  from "@/lib/database/connection";
import Size from "@/lib/database/models/size.model";
import { revalidatePath } from "next/cache";
import { getGenderById } from "./genders.action";

export const createSize = async ({ size }: CreateSizeParams) => {
    try {
        await connectToDatabase();

        const newSize = await Size.create({
            ...size,
            value: size.value.map(size => ({
                
                footLength: size.footLength,
                EU:size.EU,
                US:size.US,
                UK:size.UK,
            }))
        });
        revalidatePath("/dashboard/sizes");
        return JSON.parse(newSize);

    } catch (error) {
        handleError(error);
    }
}


export const getAllSize = async () => {
    try {

        await connectToDatabase();
        const sizes = await Size.find();
        return JSON.parse(JSON.stringify(sizes));

    } catch (error) {
        handleError(error);
    }
}

export async function getSizeById(sizeId: string) {
    try {
        await connectToDatabase();
        const size = await Size.findById(sizeId);
        if (!size) throw new Error("No Size found");

        return JSON.parse(JSON.stringify(size));

    } catch (error) {
        handleError(error);
    }
}

export async function deleteSize({ sizeId }: DeleteSizeParams) {
    try {
        await connectToDatabase();
        const deleteSize = await Size.findByIdAndDelete(sizeId);
        if (deleteSize) revalidatePath("/dashboard/Sizes")
    } catch (error) {
        handleError(error);
    }
}

export async function updateSize({ size }: UpdateSizeParams) {
    try {
        await connectToDatabase();
        const updatedSize = await Size.findByIdAndUpdate(
            size._id,
            { ...size,
                value: size.value.map(size => ({
                    footLength: size.footLength,
                    EU:size.EU,
                    US:size.US,
                    UK:size.UK,
                }))

             },
            { new: true }
        );
        revalidatePath("/dashboard/sizes")
        return JSON.parse(JSON.stringify(updateSize));
    } catch (error) {
        handleError(error);
    }
}

export const getAllSizesByProductGender = async (productGenderId: string) => {
    try {
      // Fetch all sizes
      const sizes = await Size.find();
  
      // Fetch gender data based on the product's genderId
      const productGender = await getGenderById(productGenderId);
      const productGenderValue = productGender.name; // Assuming name is the gender value
        console.log(productGenderValue)
      // Filter sizes based on the mapped gender value
      const filteredSizes = sizes.filter((size) => size.gender === productGenderValue);
  
      return filteredSizes;
    } catch (error) {
      throw new Error("Error fetching sizes by product gender");
    }
  };
  