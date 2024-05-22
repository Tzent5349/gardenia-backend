import { boolean, z } from "zod";

import { colorFormSchema } from "@/lib/validator";



/* export type ColorDefaultValues = z.infer<typeof colorFormSchema> */

export const ColorDefaultValues = {
    name: "",
    value: ""
}

export const CategoryDefaultValues = {
    name: '',
    img: "",
    parent: "",
    children: [""],
    productType: "",
    description: "",
    /*     status: "", */

}

//Size params
export const SizeDefaultValues = {
    gender: "",
    value:[{
        footLength : "",
        EU:"",
        UK:"",
        US:"",
    }]
    
}


export const BrandDefaultValues = {
    name: "",
    logo: "",
    description: "",
    
}

export const ProductDefaultValues = {
    sku: "",
    img: "",
    name: "",
    price:0,
    unit: 0,
    ImgColorPrice: [{
        color:{
            _id:"",
            name:"",
            colorCode:"",
        },
        img: [{
            url:""
        }],
/*         sizes:[{
            availableSize: ""
        }] */
        sizes: [""],
        price:0,
        stock:0
    }],
    parent: "",
    children: "",
/*     discount: 0, */
    quantity: 0,
    brand:{_id: "", name: ""},
    category:{_id: "", name: ""},
/*     status:"", */
    reviews:[],
    productType:"",
    description:"",
/*     featured:boolean, */
/*     offerDate:{startDate:Date, endDate:Date} */
    createdAt:Date
}