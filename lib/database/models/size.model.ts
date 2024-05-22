import {Schema, Document, model, models} from "mongoose";

export interface ISize extends Document {
    _id:string;
    gender:string;
    value:{
        _id: string;
        footLength:string;
        EU:string;
        UK:string;
        US:string;
    }[]
    createdAt:Date;
}

const SizeSchema = new Schema({
    gender:{type: String},
      value: [{
        footLength: {
          type: String,
          required: true
        },
        EU: {
          type: String,
          required: true
        },
        US: {
          type: String,
          required: true
        },
        UK: {
          type: String,
          required: true
        },
        products:[{
          type: Schema.Types.ObjectId,
          ref: "products",
      }],
      }],
    createdAt:{
            type:Date,
            default:Date.now()
    }
})

const Size = models.Size || model("Size", SizeSchema);
export default Size;