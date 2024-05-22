import {Schema, model, models, Document} from "mongoose"

export interface ICategory extends Document {
    _id:string;
    name:string;
    img:string;
    parent:string;
    children: string[];
    productType:string;
    description:string;
    createdAt:Date;
    
}


const CategorySchema = new Schema ({
    name:{
        type: "string",
        required: true,
    },
    img:{
        type:String,
        required:false,
    },
    parent:{
        type:String,
/*         required: true, */
        unique: true,
    },
    children: [{type:String}],
    productType:{
        type:String,
/*         required:true, */
        lowercase:true,
    },
    description:{
        type:String,
        required: false,
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "products",
    }],
    status:{
        type:String,
        enum:["Show", "Hide"],
        default: "Show",
    },
    createdAt:{
        type:Date, 
        default:Date.now()
    },

},{
    timestamps: true
})

const Category = models.Category || model("Category", CategorySchema)


export default Category;