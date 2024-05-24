import { z } from "zod";

import { colorFormSchema, ProductSchema } from "@/lib/validator";
import { CategoryFormSchema } from "@/lib/validator";



// Color Params
export type DeleteColorParams = {
    colorId: string;
}

export type CreateColorParams = {
    color: z.infer<typeof colorFormSchema>

}

export type UpdateColorParams = {
    color: {
        _id: string;
        name: string;
        value: string;
    }
}


// Category Params

enum StatusEnum {
    Show = "Show",
    Hide = "Hide",

}
export type CreateCategoryParams = {
    category: z.infer<typeof CategoryFormSchema>
}

export type UpdateCategoryParams = {
    category: {
        _id: string;
        name: string;
        img: string;
        parent: string;
        children: string[];
        productType: string;
        description: string;
        status: StatusEnum;
    }
}

export type DeleteCategoryParams = {
    categoryId: string;
}


// sizeParams
export type CreateSizeParams = {
    size: {
        gender: string;
        value: {
            footLength: string;
            EU: string;
            US: string;
            UK: string;
        }[];
    }
}

export type UpdateSizeParams = {
    size: {
        _id: string;
        gender: string;
        value: {
            footLength: string;
            EU: string;
            US: string;
            UK: string;
        }[];
    }
}

export type DeleteSizeParams = {
    sizeId: string;
}

// Brand Params
enum BrandStatusEnum {
    Active = "Active",
    Inactive = "Inactive",
}

export type CreateBrandParams = {
    brand: {
        name: string;
        logo: string;
        description: string;
        status: string;
    }
}

export type UpdateBrandParams = {
    brand: {
        _id: string;
        name: string;
        logo: string;
        description: string;
        status: BrandStatusEnum;
    }
}

export type deleteBrandParams = {
    brandId: string;
}


// Product Params

enum ProductStatusEnum {
    InStock = "InStock",
    OutOfStock = "OutOfStock",
}

export type createProductParams = {
    product: z.infer<typeof ProductSchema>
}

export type updateProductParams = {
    product: {
        _id: string;
        sku: string;
        price: number;
        img: string;
        genderId: string;
        name: string;
        unit: number;
        ImgColorPrice: {
            colorId: string
            img: {
                url: string
            }[];
            sizeId: string[]
            price: number;
            stock: number;
        }[],
        parent: string;
        children: string;
        /*         discount: number; */
        quantity: number;
        brandId: string;
        categoryId: string;
        status: ProductStatusEnum;
        /*         reviews:[] */
        productType: string;
        description: string;
        featured: boolean;
        /*         offerDate:Date; */
    }
}

export type deleteProductParams = {
    productId: string;
}

// Gender Params

export type createGenderParams = {
    gender: {
        name: string
    }
}

export type updateGenderPraams = {
    gender: {
        _id: string
        name: string
    }
}

export type deleteGenderParams = {
    genderId: string;
}

export type createUserParams = {
    user:{
        userId: string;
        fullName: string;
        email: string;
        userName: string;
    }
}

export type updateUserParams = {
    user: {
        _id:string
        userId:string;
        fullName: string;
        email: string;
        userName: string;
    }
}


export type createReviewParams = {
    review:{
        userId:string;
        productId:string;
        rating:number;
        comment:string;
    }
}

export type updateReviewParams = {
    review:{
        _id:string
        userId:string;
        productId:string;
        rating:number;
        comment:string;
    }
}

export type removeReviewParams = {
    reviewId:string;
}