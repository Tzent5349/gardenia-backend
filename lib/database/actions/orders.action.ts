import { handleError } from '@/lib/utils';
import connectToDatabase from '@/lib/database/connection';
import Order from '../models/order.model';
import User from '../models/user.model';
import Sale from '../models/sale.model';
import { sendInvoice } from '@/lib/email/nodemailer';
import { generateInvoicePdf } from '@/lib/pdf/invoiceGenerator';
import { generateInvoiceTemplate } from '@/lib/email/templates/invoiceTemplate';
import { getProductById } from './products.action';
import { getColorById } from './colors.action';
import { getGenderById } from './genders.action';
import { getAllSize } from './sizes.action';
import fs from 'fs';

interface PurchasedItem {
  productId: string;
  quantity: number;
  imgColorPriceId: string;
  sizeId: string;
  colorId: string;
  price: number;
  genderId: string;
}

export const handleOrder = async (
  userId: string,
  shippingAddress: string,
  itemsPurchased: PurchasedItem[]
) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const orderItems = itemsPurchased.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      imgColorPriceId: item.imgColorPriceId,
      sizeId: item.sizeId,
      colorId: item.colorId,
      price: item.price,
      genderId: item.genderId,
    }));

    const fetchColorDetails = async (colorId: string) => {
      try {
        const colorDetails = await getColorById(colorId);
        return colorDetails;
      } catch (error) {
        console.error('Error fetching color details:', error);
        return null;
      }
    };

    const fetchGender = async (genderId: string) => {
      try {
        const gender = await getGenderById(genderId);
        return gender?.name;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchSizeDetails = async (sizeId: string, gender: any) => {
      try {
        const allSizes = await getAllSize();
        const genderSizes = allSizes.find(
          (size: any) => size.gender === gender
        );
        if (genderSizes) {
          const sizeDetails = genderSizes.value.find(
            (size: any) => size._id === sizeId
          );
          return sizeDetails;
        }
        return null;
      } catch (error) {
        console.error('Error fetching Sizes:', error);
        return null;
      }
    };

    const newOrder = new Order({
      userId: user._id,
      product: orderItems,
      shippingAddress,
    });

    await newOrder.save();

    user.purchaseHistory.push({ orderId: newOrder._id });
    user.cartHolder = [];
    await user.save();

    const detailedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await getProductById(item.productId);
        const colorDetails = await fetchColorDetails(item.colorId);
        const gender = await fetchGender(item.genderId);
        const sizeDetails = await fetchSizeDetails(item.sizeId, gender);

        return {
          orderId: newOrder._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          size: sizeDetails ? sizeDetails.EU : 'N/A',
          colorName: colorDetails?.name,
          colorValue: colorDetails?.value,
          gender,
          shippingAddress,
        };
      })
    );

    // Read the PNG file
 // Update the file path

    // Generate invoice PDF
    const pdfBuffer = await generateInvoicePdf(detailedOrderItems, user);

    // Generate invoice template
    const invoiceHtml = generateInvoiceTemplate(detailedOrderItems, user);

    // Convert Uint8Array to Buffer
    const buffer = Buffer.from(pdfBuffer);

    // Send invoice email with PDF attachment
    await sendInvoice(user.email, 'Your Order Invoice', invoiceHtml, buffer);

    return newOrder;
  } catch (error) {
    handleError(error);
    throw error;
  }
};


export const getAllOrders = async()=>{
    try {
      await connectToDatabase()
      const orders =  await Order.find()
      return JSON.parse(JSON.stringify(orders))
    } catch (error) {
      console.error(error);
    }
}