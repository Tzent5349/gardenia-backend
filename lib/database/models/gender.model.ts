import { Schema, Document, models, model } from "mongoose";

export interface IGender extends Document {
    _id: string;
    name: string;
}

const GenderSchema = new Schema({
    name: {
        type: "string",
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    timestamps: true
}
)

const Gender = models.Gender || model("Gender", GenderSchema);
export default Gender;