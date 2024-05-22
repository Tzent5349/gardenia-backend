import { Schema, Document, model, models } from "mongoose";

export interface IColor extends Document {
    _id: string;
    name: string;
    value: string;
    createdAt: Date;

}

const ColorSchema = new Schema({
    name: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products",
    }],
    createdAt: { type: Date, default: Date.now() },

})

const Color = models.Color || model("Color", ColorSchema);

export default Color;