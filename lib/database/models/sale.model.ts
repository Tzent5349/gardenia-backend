import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ISale extends Document {
    userId: mongoose.Types.ObjectId;
    product: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
        imgColorPrice: string;
        sizeId: string;
        colorId: string;
    }[];
    shippingAddress: string;
    createdAt: Date;
}

const SaleSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    product: [{
        productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        imgColorPriceId: { type: String, required: true },
        sizeId: { type: String, required: true },
        colorId: { type: String, required: true },
        genderId: { type: String, required: true }
    }],
    shippingAddress: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const Sale = models.Sale || model<ISale>('Sale', SaleSchema);

export default Sale;
