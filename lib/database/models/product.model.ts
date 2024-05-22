import { Schema, Document, models, model } from "mongoose";

export interface IProduct extends Document{
    _id: string;
    sku: string;
    img: string;
    name: string;
    price:number;
    unit: number;
    gender:{
        _id:string,
        name:string
    },
    ImgColorPrice: {
        color: {
            _id: string
            name: string
            colorCode: string
        };
        img: {
            url:string
        }[];
/*         sizes:{
            availableSize: string;
        }[]; */
/*         sizes:string[] */
        sizeId:{
            value:{
                footLength:string;
                EU:string;
                UK:string;
                US:string;
                _id:string;
            }[]
        }[]
        price:number;
        stock:number;
    }[],
    parent: string;
    children: string;
/*     discount: number; */
    quantity: number;
    brand:{_id: string, name: string};
    category:{_id: string, name: string};
    status:string;
    reviews:[]
    productType:string;
    description:string;
    featured:boolean;
/*     offerDate:{startDate:Date, endDate:Date} */
    createdAt:Date
}


const productSchema = new Schema({
    sku: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: true,

    },price:{
        type:Number,
    },
    gender:{
        type: Schema.Types.ObjectId,
        ref:"genders"
    },
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: Number,
        required: true,
    },
    ImgColorPrice: [{
        color: {
            type: Schema.Types.ObjectId,
            ref: "colors",
        },
        img: [{
            url:{type: String,}
        }],
        sizeId: [{
            type: Schema.Types.ObjectId,
            ref: "sizes",
        }],
        price:{
            type:Number,
        },
        stock:{
            type:Number,
        },

    }],
    parent: {
        type: String,
/*         required: true, */
    },
    children: {
        type: String,
/*         required: true, */
    },
/*     discount: {
        type: Number,
    }, */
    quantity: {
        type: Number,
        required: true,
    },
    brand: {
/*         name: {
            type: String,
            required: true,
        }, */
       
            type: Schema.Types.ObjectId,
            ref: "brands",

    },
    category: {
/*         name: {
            type: String,
            required: true,
        }, */

            type: Schema.Types.ObjectId,
            ref: "categories",
/*             required: true, */

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["InStock", "OutOfStock", "discounted"],
            message: "status cant be {VALUE}"
        },
        default: "in-stock",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
    productType: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    additionalInformation: [{}],
/*     tags: [String], */
/*     offerDate: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date,
        },
    }, */
    featured: {
        type: Boolean,
        deafult: false,
    },
    sellCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

}, {
    timestamps: true,
})

const Product =  models.Product || model("Product", productSchema);

export default Product;