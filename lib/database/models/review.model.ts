import { Schema, Document, models, model } from "mongoose";


export interface IReview extends Document {
    userId: string;
    productId: string;
    rating?: number
    comment?:string
}

const reviewSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"user" },
    productId:{ type: Schema.Types.ObjectId, ref:"product" },
    rating:{ type: Number, },
    comment:{ type: String,}
});

const Review = models.Review || model("Review", reviewSchema)

export default Review;