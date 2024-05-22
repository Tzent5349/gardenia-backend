"use server"

import { CreateBrandParams, UpdateBrandParams, deleteBrandParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import Brand from "@/lib/database/models/brand.model";
import { revalidatePath } from "next/cache";
import { describe } from "node:test";

export const createBrand = async ({brand}: CreateBrandParams)=>{
    try{
        await connectToDatabase();

        const newBrand = await Brand.create({
            name: brand.name,
            logo: brand.logo,
            description: brand.description,
            status: brand.status
        });
        revalidatePath("/dashboard/brands");
        return JSON.parse(JSON.stringify(newBrand));
    } catch(err){
        handleError(err);
    }
}

export const getAllBrand = async () =>{
    try {
        await connectToDatabase();
        const brands = await Brand.find()
        return JSON.parse(JSON.stringify(brands))
        
    } catch (error) {
        handleError(error);
    }
}

export async function getBrandById (brandId: string){

    try {
        await connectToDatabase();
        const brand = await Brand.findById(brandId);
        if(!brand) throw new Error ("No such brand exists in database");
        return JSON.parse(JSON.stringify(brand));
    } catch (error) {
        handleError(error);
    }
}

export async function deleteBrand ({brandId}:deleteBrandParams){
    try {
        await connectToDatabase();
        const deleteBrand = await Brand.findByIdAndDelete(brandId);
        if(deleteBrand) revalidatePath("/dashboard/brands")
    } catch (error) {
        handleError(error);
    }
}

export async function updateBrand ({brand}: UpdateBrandParams){
    try {
        await connectToDatabase();
        const updatedBrand = await Brand.findByIdAndUpdate(
            brand._id,
            {...brand},
            {new:true}
        );
        revalidatePath("/dashboard/brands")
        return JSON.parse(JSON.stringify(updatedBrand));
        
    } catch (error) {
        handleError(error);
    }
}


export async function getBrandNameById (brandId:string){
    try {
        await connectToDatabase();
        const BrandNam = await Brand.findById(brandId);
        if(BrandNam){
            return JSON.parse(JSON.stringify(BrandNam.name));
        }
    } catch (error) {
        console.log(error);
    }
}