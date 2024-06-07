import { handleError } from "@/lib/utils";
import connectToDatabase from "@/lib/database/connection";
import User from "@/lib/database/models/user.model";
import { getProductById } from "./products.action";
import { getColorById } from "./colors.action";
import { getSizeById } from "./sizes.action";

export const handleShoppingCart = async (userId: string, productId: string, imgColorPriceId: string, colorId: string, sizeId: string) => {
  /*   console.log(`hi ${imgColorPrice}`); */
  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // here i want to make return a  detailed product. when i get productId. i want to use that product by productId and then getImgColorPrice from ImgColorPrice array that matches the imgcolorPriceId and fetch color value from color, and return, colorValue, colorName. return same Img array inside of ImgColorPrice and get size  inside ImgColroPrice by fetching getSizeById  and retun all other product value

    // Check if the product ID and imgColorPrice are already in the shopping cart
    const existingCartItem = user.cartHolder.find((item: any) =>
      item.productId.toString() === productId && item.imgColorPrice === imgColorPriceId && item.sizeId === sizeId && item.colorId === colorId
    );

    if (!existingCartItem) {

      // If the product with the same imgColorPrice is not in the shopping cart, add it
      user.cartHolder.push({ productId: productId, quantity: 1, imgColorPrice: imgColorPriceId, colorId: colorId, sizeId: sizeId });
    } else {
      // If the product with the same imgColorPrice is already in the shopping cart, increase the quantity
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
};


export const handleAddQuantityButton = async (userId: string, cartId: string) => {

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the product ID and imgColorPrice are already in the shopping cart
    const existingCartItem = user.cartHolder.find((item: any) =>
      /*       console.log(item) */
      item._id.toString() === cartId
    );

    if (!existingCartItem) {

      // If the product with the same imgColorPrice is not in the shopping cart, add it
      return null;
    } else {
      // If the product with the same imgColorPrice is already in the shopping cart, increase the quantity
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

}

export const handleSubtractQuantityButton = async (userId: string, cartId: string) => {

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the cartt ID and imgColorPrice are already in the shopping cart
    const existingCartItem = user.cartHolder.find((item: any) =>
      /*       console.log(item) */
      item._id.toString() === cartId
    );

    if (!existingCartItem) {


      return null;
    } else {
      // If the product with the same cartId is already in the user cartHolder, decrease the quantity
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity--;
      } else {
        // delete the existing cartItem if the quantity is only 1
        user.cartHolder = user.cartHolder.filter((item: any) => item._id.toString() !== cartId);
      }
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

}


export const handlecartItemDelete = async (userId: string, cartId: string) => {

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the cartt ID and imgColorPrice are already in the shopping cart
    const existingCartItem = user.cartHolder.find((item: any) =>
      /*       console.log(item) */
      item._id.toString() === cartId
    );

    if (!existingCartItem) {


      return null;
    } else {
      // If the product with the same cartId is already in the user cartHolder, decrease the quantity
      if (existingCartItem.quantity > 1) {
     
        // delete the existing cartItem if the quantity 
        user.cartHolder = user.cartHolder.filter((item: any) => item._id.toString() !== cartId);
      }
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

}