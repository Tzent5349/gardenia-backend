// lib/database/models/user.model.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';
import connectToDatabase from '../connection';

export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  shippingAddress?: string;
  /*   reviews?: mongoose.Types.ObjectId[];
    wishList?: mongoose.Types.ObjectId[];
    cartHolder?: mongoose.Types.ObjectId[]; */
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
  wishList: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  shippingAddress: { type: String, },
  cartHolder: [{
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: {
      type: Number,
      default: 1,
    },
    imgColorPrice: { type: String },
    sizeId: { type: String },
    colorId: { type: String },
  }],
  purchaseHistory: [{
    orderId: { type: Schema.Types.ObjectId, ref: 'order' },
  
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

/* async function getUserModel() {
  await connectToDatabase();
  return models.User || model('User', UserSchema);
} */
const User = models.User || model('User', UserSchema);

export default User;
