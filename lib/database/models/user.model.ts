// lib/database/models/user.model.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';
import connectToDatabase from '..';

export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  shippingAddress?: string;
  reviews?: mongoose.Types.ObjectId[];
  wishList?: mongoose.Types.ObjectId[];
  cartHolder?: mongoose.Types.ObjectId[];
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
  shippingAddress: { type: String, default: '' },
  cartHolder: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

async function getUserModel() {
  await connectToDatabase();
  return models.User || model('User', UserSchema);
}

export default getUserModel;
