import { models, model, Document, Schema } from "mongoose";
import { EnumValues } from "zod";

export interface IBrand extends Document {
    _id: string;
    logo: string;
    name: string;
    description: string;
/*     products: [{ _id: string }]; */
    createdAt: Date;
}


const BrandSchema = new Schema({
    logo: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        unique: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["Active", "Inactive",],
        default: "Active",
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products",
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})

const Brand = models.Brand || model("Brand", BrandSchema);

export default Brand;