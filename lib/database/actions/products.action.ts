"use server"

import { createProductParams, updateProductParams, deleteProductParams } from "@/types";
import { handleError } from "@/lib/utils";
import  connectToDatabase  from "@/lib/database";
import Product from "@/lib/database/models/product.model";
import { revalidatePath } from "next/cache";
import Category from "../models/category.model";
import Color from "../models/color.model";
import Brand from "../models/brand.model";
import Size from "../models/size.model";
import Gender from "../models/gender.model";
import { getCategoryById } from "./categories.action";

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: "i" } })
}

const getColorByName = async (name: string) => {
    return Color.findOne({ name: { $regex: name, $options: "i" } })
}

const getBrandByName = async (name: string) => {

    return Brand.findOne({ name: { $regex: name, $options: "i" } })
}


const populateProduct = (query: any) => {
    return query
        .populate({ path: "category", model: Category, select: "_id name" })
        .populate({ path: "color", model: Color, select: "_id" })
        .populate({ path: "brand", model: Brand, select: "_id" })
        .populate({ path: "gender", model: Gender, select: "_id" })
}


export const createProduct = async ({ product }: createProductParams) => {
    try {
        await connectToDatabase();

        // Create the product with the extracted data
        const newProduct = await Product.create({
            ...product,
            gender: product.genderId,
            category: product.categoryId,
            brand: product.brandId,
            ImgColorPrice: product.ImgColorPrice.map(imgColorPrice => ({
                color: imgColorPrice.colorId,
                img: imgColorPrice.img.map(img => ({ url: img.url })),
                sizeId: imgColorPrice.sizeId,
                price: imgColorPrice.price,
                stock: imgColorPrice.stock,
            }))


        });

        for (const imgColorPrice of product.ImgColorPrice) {
            await Color.updateOne(
                { _id: imgColorPrice.colorId },
                { $push: { products: newProduct._id } }
            );

            /*             await Size.updateOne(
                            {_id: imgColorPrice.sizes},
                            { $push: { products: newProduct._id } }
                        ) */
            /*             await Size.updateMany(
                            { _id: imgColorPrice.sizeId },
                            { $push: { products: newProduct._id } }
                        ) */
            // Loop through each sizeId in the product
            for (const sizeId of imgColorPrice.sizeId) {
                // Update the Size model to push the productId into the products array
                await Size.updateOne(
                    { _id: sizeId },
                    { $push: { products: newProduct._id } }
                );
            }
        }

        await Category.updateOne(
            { _id: product.categoryId },
            { $push: { products: newProduct._id } }
        )
        await Brand.updateOne(
            { _id: product.brandId },
            { $push: { products: newProduct._id } }
        )

        await Gender.updateOne(
            { _id: product.genderId },
            { $push: { products: newProduct._id } }
        )

        revalidatePath("/dashboard/products");
        return JSON.parse(JSON.stringify(newProduct));

    } catch (err) {
        handleError(err);
    }

}

export const getAllProducts = async () => {
    try {
        await connectToDatabase();
        const products = await Product.find();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        handleError(error);
    }
}

export async function getProductById(productId: string) {
    try {
        await connectToDatabase();
        const product = await Product.findById(productId,

        );
        if (!productId) throw new Error("Product not found ")
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        handleError(error);
    }
}

export async function deleteProduct({ productId }: deleteProductParams) {
    try {
        await connectToDatabase();
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (deletedProduct) revalidatePath("/dashboard/products"); console
    } catch (error) {
        handleError(error);
    }
}

export async function updateProduct({ product }: updateProductParams) {
    try {
        await connectToDatabase();
        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            {
                ...product,
                gender: product.genderId,
                category: product.categoryId,
                brand: product.brandId,
                ImgColorPrice: product.ImgColorPrice.map(imgColorPrice => ({
                    color: imgColorPrice.colorId,
                    img: imgColorPrice.img.map(img => ({ url: img.url })),
                    sizeId: imgColorPrice.sizeId,
                    price: imgColorPrice.price,
                    stock: imgColorPrice.stock
                }))
            },
            { new: true }
        );
        const category = await Category.findOne({ _id: product.categoryId });
        const productExists = category.products.includes(product._id);

        const brand = await Brand.findOne({ _id: product.brandId });
        const brandProductExists = brand.products.includes(product._id);

        const gender = await Gender.findOne({ _id: product.genderId });
        const genderProductExists = gender.products.includes(product._id);
        // Update the category to include the updated product
        if (!productExists) {
            await Category.updateOne(
                { _id: product.categoryId },
                { $push: { products: product._id } }
            );
        }

        if (!brandProductExists) {
            await Brand.updateOne(
                { _id: product.brandId },
                { $push: { products: product._id } }
            )

        }

        if (!genderProductExists) {
            await Gender.updateOne(
                { _id: product.genderId },
                { $push: { products: product._id } }
            )


        }

        for (const imgColorPrice of product.ImgColorPrice) {
            /*             await Color.updateOne(
                            { _id: imgColorPrice.colorId },
                            { $push: { products: product._id } }
                        );
             */
            // Loop through each sizeId in the product
            for (const sizeId of imgColorPrice.sizeId) {
                // Update the Size model to push the productId into the products array
                /*                 for(const sizeId of sizeIds) { */
                console.log(sizeId);
                await Size.updateOne(
                    { _id: sizeId },
                    { $push: { products: product._id } }
                );
            }
            /*             } */

        }



        revalidatePath("/dashboard/products");
        return JSON.parse(JSON.stringify(updatedProduct));
    } catch (error) {
        handleError(error);
    }
}

export async function getProductByTypes() {
    await connectToDatabase();
    try {

    } catch (error) {
        handleError(error);
    }
}

export async function getSimilarProduct(productId: string) {
    try {
        // Connect to the database
        await connectToDatabase();
        
        // Find the product by ID
        const product = await Product.findById(productId);
        
        // If product not found, throw an error
        if (!product) {
            throw new Error("Product not found");
        }


        // Get the category ID of the product
        const categoryId = product.category;

        // Find similar products based on the category
        const similarProducts = await Product.find({ category: categoryId, _id: { $ne: productId } });

        // Return similar products
        return similarProducts;
    } catch (error) {
        // Handle errors
        handleError(error);
        // In case of an error, you might want to return an empty array or null
        return [];
    }
}
