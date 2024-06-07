import { getAllOrders } from "@/lib/database/actions/orders.action";
import connectToDatabase from "@/lib/database/connection";

export const getTotalRevenue = async () => {
    try {
        await connectToDatabase();
        const allOrders = await getAllOrders();
        const paidOrders = allOrders.filter((order: { isPaid: any; product: string | any[]; }) => order.isPaid && order.product && order.product.length > 0);

        const totalRevenue = paidOrders.reduce((total: any, order: { product: any[]; }) => {
            const orderTotal = order.product.reduce((orderSum: any, product: { price: any; }) => {
                return orderSum + product.price;
            }, 0);
            return total + orderTotal;
        }, 0);

        return totalRevenue;
    } catch (error) {
        console.error(error);
        return 0;  // Return 0 in case of error
    }
};
