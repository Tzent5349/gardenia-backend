"use server"

import { CreateCategoryParams, DeleteCategoryParams, UpdateCategoryParams, } from "@/types"
import { handleError } from "@/lib/utils"
import  connectToDatabase  from "@/lib/database"
import Category from "@/lib/database/models/category.model"
import { revalidatePath } from "next/cache"

export const createCategory = async ({ category }: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({
            name: category.name,
            img: category.img,
            parent: category.parent,
            children: category.children,
            productType: category.productType,
            description: category.description,
            status: category.status
        });
        revalidatePath("/dashboard/categories")
        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }
}

export const getAllCategory = async () => {
    try {

        await connectToDatabase();
        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));

    } catch (error) {
        handleError(error);
    }
}

export async function getCategoryById(categoryId: string) {
    try {
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        if (!category) throw new Error("No category found");

        return JSON.parse(JSON.stringify(category));

    } catch (error) {
        handleError(error);
    }
}

export async function deleteCategory({ categoryId }: DeleteCategoryParams) {
    try {
        await connectToDatabase();
        const deleteCategory = await Category.findByIdAndDelete(categoryId);
        if (deleteCategory) revalidatePath("/dashboard/categories")
    } catch (error) {
        handleError(error);
    }
}

export async function getCategoryNameById(categoryId: string) {
    try {
        await connectToDatabase();
        const catego = await Category.findById(categoryId);
        if (catego) {
            return JSON.parse(JSON.stringify(catego.name));
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateCategory({ category }: UpdateCategoryParams) {
    try {
        await connectToDatabase();
        const updatedCategory = await Category.findByIdAndUpdate(
            category._id,
            { ...category },
            { new: true }
        );
        revalidatePath("/dashboard/categories")
        return JSON.parse(JSON.stringify(updatedCategory));
    } catch (error) {
        handleError(error);
    }
}

export async function getAllProductsByCategory() {
    try {
        await connectToDatabase();

    } catch (error) {
        handleError(error);
    }
}

export const getShowCategoryServices = async () => {
    try {
        await connectToDatabase();
        const category = await Category.find({ status: 'Show' }).populate('products');
        return JSON.parse(JSON.stringify(category));

    } catch (error) {
        console.log(error);
    }
}

// get type of category service
exports.getCategoryTypeService = async (param: any) => {
    const categories = await Category.find({ productType: param }).populate('products');
    return categories;
}


export async function getCategoryByName(name:string):Promise<any> {
    const category = await Category.find({ name: name});
    return JSON.parse(JSON.stringify(category));
}