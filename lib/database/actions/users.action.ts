// lib/database/actions/user.action.ts
import { handleError } from "@/lib/utils";
import { createUserParams, updateUserParams } from "@/types";
import connectToDatabase from "@/lib/database/connection";
import getUserModel from "@/lib/database/models/user.model";
import User, { IUser } from "@/lib/database/models/user.model";
import mongoose from "mongoose";
import { connect } from "http2";

export const createUser = async (user: IUser) => {
  try {
    await connectToDatabase();

    /*     const User = await getUserModel(); */
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

    /*     const User = await getUserModel(); */
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


/* export const handleWishList = async (userId: string, productId: string) => {
  console.log("hai" + userId , productId)
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
}; */

/* export const handleShoppingCart = async (userId: string, productId: string) => {
  console.log( "hi " +userId, productId);
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the User model
    const User = await getUserModel();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the product ID is already in the shopping cart
    const existingCartItem = user.shoppingCart.find((item:any) => item.productId === productId);

    if (!existingCartItem) {
      // If the product is not in the shopping cart, add it
      user.shoppingCart.push({ productId, quantity: 1 });
    } else {
      // If the product is already in the shopping cart, increase the quantity
      existingCartItem.quantity++;
    }

    // Save the updated user document
    const updatedUser = await user.save();

    // Return the updated user object
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    // Handle errors
    console.error('Error handling shopping cart:', error);
    throw error;
  }
}; */





export const getAllUser = async () => {
  try {
    await connectToDatabase();

    /*     const User = await getUserModel(); */
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    /*     const User = await getUserModel(); */
    const user = await User.findById(userId);
/*     console.log(JSON.parse(JSON.stringify(user)) + "this is from getById"); */
    if (!user) throw new Error("user not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const handleWishList = async (userId: string, productId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let update;
    if (user.wishList.includes(productId)) {
      // Remove the product from the wishlist
      update = { $pull: { wishList: productId } };
    } else {
      // Add the product to the wishlist
      update = { $addToSet: { wishList: productId } };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      { new: true }
    );
    // Return the updated user object
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error handling wishlist:', error);
    throw error;
  }
};

/* const userDetail = await getUserById(userId)


console.log("this is userdetail: " + userDetail);
if (!userDetail) {
  throw new Error('User not found');
}

// Check if the product ID is already in the wishlist
const index = userDetail.wishList.indexOf(productId);

if (index === -1) {
  // If the product is not in the wishlist, add it
  userDetail.wishList.push(productId);
} else {
  // If the product is already in the wishlist, remove it
  userDetail.wishList.splice(index, 1);
}

// Save the updated user document
const updatedUser = await userDetail.save();

return JSON.parse(JSON.stringify(updatedUser));
*/

