/* // lib/database/models/user.model.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';
import connectToDatabase from '../connection';

export interface IOrder extends Document {
    userId: string;
    productId: [];
    quantity: number;
    imgColorPrice: string;
    sizeId: string;
    colorId: string;
    shippingAddress: string;
}

const OrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    product: [{ productId: { type: Schema.Types.ObjectId, ref: 'product' } },
    {
        quantity: {
            type: Number,
        },
        imgColorPrice: { type: String },
        sizeId: { type: String },
        colorId: { type: String },
    }
    ],

    shippingAddress: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now() },
    quantity: {
        type: Number,
    },


});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
 */


import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    product: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price:number;
        imgColorPrice: string;
        sizeId: string;
        colorId: string;
    }[];
    shippingAddress: string;
    isPaid: boolean;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    product: [{
        productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        imgColorPriceId: { type: String, required: true },
        sizeId: { type: String, required: true },
        colorId: { type: String, required: true },
        genderId:{type: String, required: true}
    }],
    shippingAddress: { type: String, default: '' },
    isPaid:{ type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
