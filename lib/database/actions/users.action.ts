// lib/database/actions/user.action.ts
import { handleError } from "@/lib/utils";
import { createUserParams, updateUserParams } from "@/types";
import connectToDatabase from "@/lib/database";
import getUserModel from "@/lib/database/models/user.model";
import { IUser } from "@/lib/database/models/user.model";

export const createUser = async (user: IUser) => {
  try {
    await connectToDatabase();

    const User = await getUserModel();
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async ({ user }: updateUserParams) => {
  try {
    await connectToDatabase();

    const User = await getUserModel();
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...user },
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};


export const handleWishList = async (userId: string, productId: string) => {
  try {
    await connectToDatabase();
    const User = await getUserModel();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the product ID is already in the wishlist
    const index = user.wishList.indexOf(productId);

    if (index === -1) {
      // If the product is not in the wishlist, add it
      user.wishList.push(productId);
    } else {
      // If the product is already in the wishlist, remove it
      user.wishList.splice(index, 1);
    }

    // Save the updated user document
    const updatedUser = await user.save();

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error handling wishlist:', error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    await connectToDatabase();

    const User = await getUserModel();
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const User = await getUserModel();
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};
