"use server"
import { handleError } from "@/lib/utils"
import  connectToDatabase  from "@/lib/database/connection"
import Review, { IReview } from "@/lib/database/models/review.model"
import { revalidatePath } from "next/cache"
import { createReviewParams } from "@/types"
import Product from "../models/product.model"


  
/*   export const createReview = async (review: IReview) => {
    try {
      // Find the product by its ID
      const product = await Product.findById(review.productId);
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      // Create the review
      const newReview = await Review.create(review);
  
      // Append the review to the product's reviews array
      product.reviews.push(newReview._id);
  
      // Save the updated product
      await product.save();
  
      // Return the updated product with the new review
      return product;
    } catch (error) {
      console.error('Error creating review:', error);
      handleError(error);
      throw new Error('Failed to create review');
    }
  };
 */

  export const createReview = async (data: any) => {
    const { userId, productId, rating, comment } = data;
  
    if (!userId || !productId || rating == null || !comment) {
      throw new Error('Missing required fields');
    }
  
    try {
      await connectToDatabase();
      const newReview = new Review({
        userId,
        productId,
        rating,
        comment,
        createdAt: new Date(),
      });
  
      await newReview.save();
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      throw new Error('Error creating review');
    }
  };

export const getReview = async (productId: string) => {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Find all reviews for the given product ID
      const reviews = await Review.find({ productId });
  
      // Return the fetched reviews
      return JSON.parse(JSON.stringify(reviews));
    } catch (error) {
      // Handle any errors that occur
      console.error('Error fetching reviews:', error);
      handleError(error);
      throw new Error('Failed to fetch reviews');
    }
  };




